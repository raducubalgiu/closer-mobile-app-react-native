import { StyleSheet, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/themed";
import { Stack, CustomAvatar, Button } from "../../core";
import theme from "../../../assets/styles/theme";
import { useAuth, usePatch } from "../../../hooks";
import { MessDateItem } from "./MessDateItem";

const width = Dimensions.get("window").width;
const { black, error } = theme.lightColors;

export const MessReceivedItem = ({
  avatar,
  item,
  displayAvatar,
  displayDate,
  date,
}) => {
  const { message, _id, liked, createdAt } = item;
  const [isLiked, setIsLiked] = useState(liked);
  const { user } = useAuth();

  const { mutate } = usePatch({
    uri: `/users/${user?._id}/messages/${_id}`,
  });

  const handleLike = () => {
    setIsLiked((isLiked) => !isLiked);
    mutate({ userId: user?._id, messageId: _id });
  };

  return (
    <Stack align="start" justify="start" sx={{ marginBottom: 5 }}>
      {displayDate && <MessDateItem date={date} />}
      <Stack direction="row">
        <Stack direction="row" align="start" justify="start" sx={{ flex: 1 }}>
          {displayAvatar && (
            <Stack sx={{ width: 30 }}>
              <CustomAvatar avatar={avatar} size={30} iconSize={15} />
            </Stack>
          )}
          {!displayAvatar && <Stack sx={{ width: 30 }}></Stack>}
          <Stack sx={styles.message}>
            <Text style={styles.messageText}>{message?.text}</Text>
          </Stack>
        </Stack>
        <Button onPress={handleLike} sx={styles.like}>
          <Icon
            name={isLiked ? "heart" : "hearto"}
            type="antdesign"
            color={isLiked ? error : "#ddd"}
            size={20}
          />
        </Button>
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  message: {
    borderRadius: 25,
    marginLeft: 10,
    paddingVertical: 12.5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: width / 4,
  },
  messageText: {
    color: black,
    fontSize: 15,
  },
  like: { padding: 5 },
});
