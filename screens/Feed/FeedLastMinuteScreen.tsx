import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
} from "react-native";
import { useCallback, useRef } from "react";
import { useScrollToTop } from "@react-navigation/native";
import { HeaderFeed, NoFoundMessage } from "../../components/customized";
import CardPost from "../../components/customized/Cards/CardPost/CardPost";
import { Post } from "../../models";
import {
  useGetPaginate,
  usePaginateActions,
  useRefreshByUser,
} from "../../hooks";
import { useTranslation } from "react-i18next";

export const FeedLastMinuteScreen = () => {
  const ref = useRef<FlatList>(null);
  useScrollToTop(ref);
  const { t } = useTranslation();

  const options = useGetPaginate({
    model: "lastMinutePosts",
    uri: `/posts/get-all-posts`,
    queries: "postType=photo&orientation=random",
    limit: "10",
  });

  const { isLoading, isFetchingNextPage } = options;
  const { data: posts, showSpinner, loadMore } = usePaginateActions(options);

  const renderPost = useCallback(({ item }: ListRenderItemInfo<Post>) => {
    return <CardPost post={item} onShowDetails={() => {}} />;
  }, []);

  const keyExtractor = useCallback((item: Post) => item.id, []);

  const { refreshing, refetchByUser } = useRefreshByUser(options?.refetch);
  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  let header;
  if (!isLoading && !isFetchingNextPage && posts?.length === 0) {
    header = (
      <NoFoundMessage title={t("posts")} description={t("noFoundPosts")} />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderFeed indexLabel={2} />
      <FlatList
        ref={ref}
        ListHeaderComponent={header}
        refreshControl={refreshControl}
        data={posts}
        renderItem={renderPost}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
