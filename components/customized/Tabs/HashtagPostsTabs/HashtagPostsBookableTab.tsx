import { Animated, ListRenderItemInfo } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useGetPaginate } from "../../../../hooks";
import GridImageListItem from "../../ListItems/PostGrid/GridImageListItem";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { Spinner } from "../../../core";
import { Post } from "../../../../models/post";

type IProps = { name: string; onScroll: () => void };

export const HashtagPostsBookableTab = ({ name, onScroll }: IProps) => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useGetPaginate({
    model: "hBookable",
    uri: `/hashtags/${name}/posts/bookable`,
    limit: "30",
    enabled: isFocused,
  });

  const renderPosts = useCallback(
    ({ item, index }: ListRenderItemInfo<any>) => (
      <GridImageListItem
        onPress={() => {}}
        index={index}
        image={item?.images[0]?.url}
        bookable={item.bookable}
        fixed={null}
        postType={item.postType}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: Post) => item.id, []);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner sx={{ paddingVertical: 150 }} />;
    } else {
      return null;
    }
  };

  const { pages } = data || {};
  const posts = pages?.map((page) => page.results).flat();

  let header;
  if (!isLoading && !isFetchingNextPage && posts?.length === 0) {
    return (
      <NoFoundMessage title={t("posts")} description={t("noFoundPosts")} />
    );
  }

  return (
    <>
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <Animated.FlatList
        ListHeaderComponent={header}
        numColumns={3}
        data={posts}
        keyExtractor={keyExtractor}
        renderItem={renderPosts}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        onScroll={onScroll}
        contentContainerStyle={{ paddingBottom: 15 }}
      />
    </>
  );
};
