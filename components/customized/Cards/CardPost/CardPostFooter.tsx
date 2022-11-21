import { StyleSheet, Text, Pressable } from "react-native";
import React, { memo, useState } from "react";
import { Icon } from "@rneui/themed";
import { Stack, CustomAvatar } from "../../../core";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import theme from "../../../../assets/styles/theme";
import { useAuth } from "../../../../hooks";
import { DisplayText } from "../../DisplayText/DisplayText";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../models/navigation/rootStackParams";

const { grey0, black } = theme.lightColors;

const CardPostFooter = ({
  postId,
  creatorId,
  description,
  username,
  name,
  date,
  avatar,
  commentsCount,
}) => {
  const [comments, setComments] = useState(commentsCount);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();
  const { user } = useAuth();

  const goToComments = (focus: boolean) =>
    navigation.navigate("Comments", {
      postId,
      creatorId,
      description,
      username,
      name,
      date,
      avatar,
      focus,
    });

  let displayText;
  if (description) {
    displayText = (
      <DisplayText
        text={description}
        maxWords={10}
        goToUserAllInfo={() => {}}
      />
    );
  }

  return (
    <>
      <Stack align="start" sx={{ paddingHorizontal: 15, paddingTop: 10 }}>
        {displayText}
      </Stack>
      {comments > 0 && (
        <Pressable
          style={styles.commentsContainer}
          onPress={() => goToComments(false)}
        >
          <Stack direction="row" justify="start">
            <Text style={styles.comments}>
              {comments > 1
                ? `Vezi toate cele ${comments} comentarii`
                : `${t("seeOneComment")}`}
            </Text>
            <Icon
              name="down"
              type="antdesign"
              size={14}
              style={{ marginLeft: 5 }}
              color={grey0}
            />
          </Stack>
        </Pressable>
      )}
      <Pressable
        style={
          comments > 0 || description
            ? { paddingHorizontal: 15, marginTop: 10 }
            : { paddingHorizontal: 15 }
        }
        onPress={() => goToComments(true)}
      >
        <Stack direction="row" justify="start">
          <CustomAvatar size={22.5} iconSize={10} avatar={user?.avatar} />
          <Text style={styles.addCommText}>{t("addComment")}</Text>
        </Stack>
      </Pressable>
      <Text style={styles.date}>{date}</Text>
    </>
  );
};

export default memo(CardPostFooter);

const styles = StyleSheet.create({
  description: {
    flex: 1,
    paddingHorizontal: 10,
    color: black,
  },
  commentsContainer: { paddingHorizontal: 15, marginTop: 5 },
  comments: { color: grey0, fontSize: 13 },
  date: {
    color: grey0,
    fontSize: 13,
    marginTop: 7.5,
    marginHorizontal: 15,
  },
  addCommText: {
    color: grey0,
    marginLeft: 5,
    borderWidth: 0.5,
    borderColor: "#ddd",
    paddingVertical: 6,
    paddingHorizontal: 10,
    flex: 1,
    borderRadius: 15,
    fontSize: 13,
  },
  distanceText: {
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 5,
    color: black,
  },
});