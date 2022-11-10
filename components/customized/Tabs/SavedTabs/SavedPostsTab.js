import { FlatList } from "react-native";
import React, { useCallback } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { CardPostImage } from "../../Cards/CardPostImage";
import { useGetPaginate } from "../../../../hooks";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";

export const SavedPostsTab = ({ user }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    isPreviousData,
  } = useGetPaginate({
    model: "posts",
    uri: `/users/${user?._id}/posts/bookmarks`,
    limit: "21",
    enabled: !isPreviousData && isFocused,
  });

  const renderPosts = useCallback(({ item, index }) => {
    const { post } = item;
    const { bookable, postType } = post || {};
    const { user } = item;

    return (
      <CardPostImage
        onPress={() =>
          navigation.navigate("AllBookmarks", {
            postId: post?._id,
            userId: user?._id,
          })
        }
        index={index}
        image={post?.images[0]?.url}
        bookable={bookable}
        fixed={null}
        postType={postType}
      />
    );
  }, []);

  const keyExtractor = useCallback((item) => item._id, []);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner />;
    } else {
      return null;
    }
  };

  const { pages } = data || {};

  const noFoundMessage = !isLoading &&
    !isFetchingNextPage &&
    pages[0]?.results?.length === 0 && (
      <NoFoundMessage title={t("posts")} description={t("noFoundSavedPosts")} />
    );

  return (
    <>
      {isFetching && isLoading && !isFetchingNextPage && <Spinner />}
      <FlatList
        ListHeaderComponent={noFoundMessage}
        data={pages?.map((page) => page.results).flat()}
        keyExtractor={keyExtractor}
        numColumns={3}
        renderItem={renderPosts}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
      />
    </>
  );
};
