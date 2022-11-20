import { StyleSheet, Text, View, Pressable } from "react-native";
import { ButtonLink, Checkmark } from "../../core";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../assets/styles/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../models/navigation/rootStackParams";

const { grey0, black } = theme.lightColors;

export const DisplayText = ({
  text = "",
  maxWords = 200,
  username = null,
  checkmark = false,
  goToUserAllInfo,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  let wordsArr = text.split(" ");
  const [cutText, setCutText] = useState(wordsArr.length > maxWords);

  const slicedArr = cutText ? wordsArr.slice(0, maxWords) : wordsArr;

  const goToUser = (uName: string) => {
    navigation.push("ProfileGeneral", {
      userId: null,
      username: uName,
      avatar: null,
      name: null,
      checkmark: null,
      service: null,
      option: null,
    });
  };

  const goToHashtag = (hashtag: string) =>
    navigation.push("Hashtag", { name: hashtag });

  const handleText = useCallback(() => {
    const displayText = [];

    for (let i = 0; i < slicedArr.length; i++) {
      let word = slicedArr[i];

      switch (true) {
        case word.startsWith("@"):
          displayText.push(
            <ButtonLink
              key={i}
              word={`${slicedArr[i]} `}
              onPress={() => goToUser(slicedArr[i].split("@")[1])}
            />
          );
          break;
        case word.startsWith("#"):
          displayText.push(
            <ButtonLink
              key={i}
              word={`${slicedArr[i]} `}
              onPress={() => goToHashtag(slicedArr[i].split("#")[1])}
            />
          );
          break;
        default:
          displayText.push(<Text key={i}>{`${slicedArr[i]} `}</Text>);
      }
    }

    return displayText.map((el) => el);
  }, [slicedArr]);

  return (
    <View style={styles.container}>
      {username && (
        <Pressable onPress={goToUserAllInfo}>
          <Text style={styles.username}>{username} </Text>
        </Pressable>
      )}
      {checkmark && <Checkmark size={7.5} sx={styles.checkmark} />}
      {handleText()}
      {cutText && (
        <Pressable onPress={() => setCutText((cutText) => !cutText)}>
          <Text style={styles.seeMore}>...mai mult</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  username: {
    color: black,
    fontWeight: "500",
    fontSize: 15,
  },
  seeMore: {
    color: grey0,
    fontWeight: "500",
  },
  checkmark: { marginHorizontal: 5 },
});
