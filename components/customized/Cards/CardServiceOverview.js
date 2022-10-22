import { StyleSheet, Text } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { Stack } from "../../core";
import { displayCount } from "../../../utils";
import theme from "../../../assets/styles/theme";
import { BookmarkButton } from "../Buttons/BookmarkButton";

const { grey0 } = theme.lightColors;

export const CardServiceOverview = ({ name, postsCount, serviceId }) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" align="start" justify="start" sx={styles.container}>
      <Stack sx={styles.icon}>
        <Icon name="tag" type="feather" size={30} />
      </Stack>
      <Stack align="start" justify="between" sx={{ marginLeft: 15, flex: 1 }}>
        <Stack align="start" justify="start" sx={{ flex: 1 }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.counter}>
            {displayCount(postsCount, t("post"), t("posts"), t("ofPosts"))}
          </Text>
        </Stack>
        <BookmarkButton
          type="services"
          typeId={serviceId}
          onBookmarksCount={null}
        />
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, marginBottom: 10 },
  name: { fontWeight: "600", fontSize: 17 },
  icon: {
    paddingVertical: 40,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  counter: {
    color: grey0,
    fontSize: 15,
    textTransform: "lowercase",
  },
});
