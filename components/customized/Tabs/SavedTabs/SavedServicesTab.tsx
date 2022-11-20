import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { ServiceListItem } from "../../ListItems/ServiceListItem";
import { useGetPaginate } from "../../../../hooks";
import { Service } from "../../../../models/service";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../models/navigation/rootStackParams";

export const SavedServicesTab = ({ user }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
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
    model: "services",
    uri: `/users/${user?._id}/services/bookmarks`,
    limit: "25",
    enabled: isFocused,
  });

  const renderService = useCallback(({ item }) => {
    const { _id, name, postsCount } = item.service;
    return (
      <ServiceListItem
        name={name}
        postsCount={postsCount}
        onPress={() =>
          navigation.navigate("Service", { service: { _id, name, postsCount } })
        }
      />
    );
  }, []);

  const keyExtractor = useCallback((item: Service) => item?._id, []);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner sx={{ paddingVertical: 20 }} />;
    } else {
      return null;
    }
  };

  const { pages } = data || {};

  const noFoundMessage = !isLoading &&
    !isFetchingNextPage &&
    pages[0]?.results?.length === 0 && (
      <NoFoundMessage
        title={t("services")}
        description={t("noFoundSavedServices")}
      />
    );

  return (
    <>
      {isFetching && isLoading && !isFetchingNextPage && <Spinner />}
      <FlashList
        ListHeaderComponent={noFoundMessage}
        contentContainerStyle={{ paddingVertical: 15 }}
        data={pages?.map((page) => page.results).flat()}
        keyExtractor={keyExtractor}
        renderItem={renderService}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        estimatedItemSize={65}
      />
    </>
  );
};
