import { StyleSheet, Text } from "react-native";
import { Stack, Checkmark, CustomAvatar, Button } from "../../core";
import React from "react";
import theme from "../../../assets/styles/theme";
import { trimFunc } from "../../../utils";

const { black, grey0 } = theme.lightColors;

export const MessageListItem = ({
  avatar,
  checkmark,
  name,
  message,
  date,
  onPress,
}) => {
  return (
    <Button onPress={onPress}>
      <Stack direction="row" justify="start" sx={styles.container}>
        <CustomAvatar avatar={avatar} size={50} />
        <Stack direction="row" sx={{ flex: 1 }} align="start">
          <Stack align="start" sx={{ marginLeft: 10 }}>
            <Stack direction="row">
              <Text style={styles.name}>{name}</Text>
              {checkmark && <Checkmark size={8} />}
            </Stack>
            <Text style={styles.message}>{trimFunc(message, 30)}</Text>
          </Stack>
          <Text style={styles.date}>{date}</Text>
        </Stack>
      </Stack>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flex: 1,
  },
  name: {
    color: black,
    fontSize: 15.5,
    marginRight: 5,
    fontWeight: "600",
  },
  message: {
    color: grey0,
    marginTop: 2.5,
  },
  date: {
    color: grey0,
    marginLeft: 10,
    fontSize: 13,
  },
});