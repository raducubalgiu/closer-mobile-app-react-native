import { StyleSheet, Platform } from "react-native";
import { SearchBar } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";

const { grey0, black } = theme.lightColors;

export const SearchBarInput = ({
  cancelButtonTitle,
  height,
  showCancel,
  ...props
}) => {
  return (
    <SearchBar
      {...props}
      cancelButtonTitle={cancelButtonTitle}
      cancelButtonProps={
        showCancel === false
          ? {
              color: "gray",
              display: "none",
              buttonTextStyle: styles.cancelBtnText,
            }
          : { color: "gray", buttonTextStyle: styles.cancelBtnText }
      }
      platform={Platform.OS === "ios" ? "ios" : "android"}
      containerStyle={{
        ...styles.containerStyle,
        height: height ? height : 65,
      }}
      inputContainerStyle={styles.inputContainerStyle}
      inputStyle={styles.inputStyle}
      placeholderTextColor={styles.placeholderColor}
      searchIcon={styles.searchIcon}
      clearIcon={{ color: theme.lightColors.divider }}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderStyle: "dotted",
    flex: 1,
  },
  inputContainerStyle: {
    backgroundColor: "#f1f1f1",
    flex: 1,
    borderRadius: 2.5,
    marginLeft: 0,
  },
  inputStyle: {
    fontSize: 15,
    color: grey0,
    fontFamily: "Exo-Regular",
  },
  cancelBtnText: {
    fontSize: 13.5,
    fontFamily: "Exo-Bold",
    color: black,
    backgroundColor: "white",
    padding: 10,
  },
  searchIcon: { color: black },
  placeholderColor: { color: grey0 },
});
