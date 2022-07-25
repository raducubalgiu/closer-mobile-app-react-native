import { StyleSheet, View, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { CardFollowers } from "../../Cards/CardFollowers";
import { SearchBarInput } from "../../../core";
import { useHttpGet } from "../../../../hooks";

export const FollowersTab = ({ userId }) => {
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  const { data: followers } = useHttpGet(`/users/${userId}/follows/followers`);

  const updateSearch = (text) => setSearch(text);

  const renderPerson = useCallback(({ item }) => {
    const { avatar, username, name, _id } = item.userId;

    return (
      <CardFollowers
        avatar={avatar}
        username={username}
        name={name}
        followeeId={_id}
      />
    );
  }, []);

  const header = useCallback(
    () => (
      <SearchBarInput
        showCancel={false}
        placeholder={t("search")}
        value={search}
        updateValue={updateSearch}
        height={60}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item) => item?._id, []);

  return (
    <View style={styles.screen}>
      {followers?.length > 0 && (
        <FlatList
          ListHeaderComponent={header}
          data={followers}
          keyExtractor={keyExtractor}
          renderItem={renderPerson}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
});
