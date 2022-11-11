import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Header, SearchBarInput, Heading, Spinner } from "../components/core";
import { useAuth, useGet } from "../hooks";
import { UserListItemSimple } from "../components/customized";

export const MessageNewScreen = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const followingsEndpoint = `/users/${user?._id}/followings?page=1&limit=20`;
  const searchEndpoint = `/users/${user?._id}/followings/search?search=${search}`;

  const { data, isLoading, isFetching } = useGet({
    model: search.length > 0 ? "search" : "followings",
    uri: search.length > 0 ? searchEndpoint : followingsEndpoint,
  });

  const renderPerson = useCallback(
    ({ item }) => {
      const { avatar, username, checkmark, name } = item.user;

      return (
        <UserListItemSimple
          avatar={avatar}
          profession={username}
          checkmark={checkmark}
          name={name}
          onGoToUser={() => navigation.navigate("MessageItem", { item })}
        />
      );
    },
    [search]
  );

  const keyExtractor = useCallback((item) => item?.user._id, []);

  const updateSearch = (text) => {
    setSearch(text);
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header title={t("newMessage")} />
      </SafeAreaView>
      <View style={styles.searchbar}>
        <SearchBarInput
          placeholder={t("search")}
          value={search}
          onChangeText={updateSearch}
        />
      </View>
      {isLoading && isFetching && <Spinner />}
      <FlatList
        ListHeaderComponent={<Heading title={t("following")} />}
        data={data?.results}
        renderItem={renderPerson}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  searchbar: { height: 50, marginHorizontal: 15 },
});
