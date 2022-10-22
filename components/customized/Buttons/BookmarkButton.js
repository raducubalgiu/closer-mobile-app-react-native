import { StyleSheet, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import { Stack } from "../../core";
import {
  useAuth,
  useHttpDelete,
  useHttpGet,
  useHttpPost,
} from "../../../hooks";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const BookmarkButton = ({ type, typeId, onBookmarksCount }) => {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const { t } = useTranslation();
  const endoints = `/users/${user?._id}/${type}/${typeId}/bookmarks`;

  useHttpGet(endoints, (data) => setBookmarked(data.status));
  const { makePost } = useHttpPost(endoints);
  const { makeDelete } = useHttpDelete(endoints);

  const handleBookmark = () => {
    if (!bookmarked) {
      setBookmarked(true);
      onBookmarksCount && onBookmarksCount(1);
      makePost();
    } else {
      setBookmarked(false);
      onBookmarksCount && onBookmarksCount(-1);
      makeDelete();
    }
  };

  return (
    <Pressable style={styles.button} onPress={handleBookmark}>
      <Stack direction="row">
        <Icon
          name={bookmarked ? "bookmark" : "bookmark-o"}
          type="font-awesome"
          color={black}
          size={17.5}
        />
        <Text style={styles.buttonText}>
          {bookmarked ? t("addedToBookmarks") : t("addToBookmarks")}
        </Text>
      </Stack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 5,
    paddingHorizontal: 12.5,
    borderRadius: 5,
  },
  buttonText: { color: black, fontWeight: "600", marginLeft: 10 },
});