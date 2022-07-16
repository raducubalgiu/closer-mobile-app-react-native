import { StyleSheet, Dimensions, View, Text } from "react-native";
import React from "react";
import { Image, Icon } from "@rneui/themed";
import { Button } from "../../core";
import theme from "../../../assets/styles/theme";

const { width, height } = Dimensions.get("window");

export const CardPostImage = ({
  index,
  image,
  bookable,
  fixed,
  postType,
  onPress,
}) => {
  let borderBox;

  if (index % 3 !== 0) {
    borderBox = { paddingLeft: 2 };
  } else {
    borderBox = { paddingLeft: 0 };
  }

  return (
    <Button sx={{ ...styles.box, ...borderBox }} onPress={onPress}>
      <Image
        source={{
          uri: `${image}`,
        }}
        containerStyle={styles.image}
      />
      {bookable && (
        <View style={styles.bookable}>
          <Icon
            name="shopping"
            type="material-community"
            color="white"
            size={20}
            style={{ marginLeft: 5 }}
          />
        </View>
      )}
      {fixed && (
        <View style={styles.fixed}>
          <Text style={styles.fixedText}>Fixat</Text>
        </View>
      )}
      {fixed && postType === "video" && (
        <View style={styles.type}>
          <Icon
            name="video"
            type="feather"
            color="white"
            size={20}
            style={{ marginLeft: 5 }}
          />
        </View>
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  box: {
    width: width / 3,
    height: width / 3,
    marginBottom: 2,
  },
  image: {
    flex: 1,
  },
  bookable: {
    position: "absolute",
    zIndex: 10000,
    top: 5,
    right: 5,
  },
  fixed: {
    position: "absolute",
    zIndex: 10000,
    bottom: 5,
    left: 5,
    backgroundColor: "white",
    opacity: 0.8,
    paddingHorizontal: 10,
  },
  fixedText: {
    fontFamily: "Exo-SemiBold",
    fontSize: 12,
    color: theme.lightColors.black,
  },
  type: {
    position: "absolute",
    zIndex: 10000,
    bottom: 5,
    left: 5,
  },
});