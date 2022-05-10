import { StyleSheet } from "react-native";
import { SearchBar } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

const SearchBarInput = (props) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <SearchBar
      onCancel={() => navigation.goBack()}
      cancelButtonTitle={t("cancel")}
      cancelButtonProps={
        props.showCancel === false
          ? {
              color: "gray",
              display: "none",
              buttonTextStyle: styles.cancelBtnText,
            }
          : { color: "gray", buttonTextStyle: styles.cancelBtnText }
      }
      platform={"ios"}
      containerStyle={styles.containerStyle}
      inputContainerStyle={styles.inputContainerStyle}
      inputStyle={styles.inputStyle}
      placeholderTextColor={styles.placeholderColor}
      searchIcon={styles.searchIcon}
      placeholder={props.placeholder}
      autoFocus={props.autoFocus}
      value={props.value}
      onChangeText={props.updateValue}
    />
  );
};

export default SearchBarInput;

const styles = StyleSheet.create({
  containerStyle: {
    borderStyle: "dotted",
    height: 67.5,
  },
  inputContainerStyle: {
    backgroundColor: "#f1f1f1",
    flex: 1,
    borderRadius: 0,
    marginLeft: 0,
  },
  inputStyle: {
    fontSize: 15,
    color: theme.lightColors.grey0,
    fontFamily: "Exo-Regular",
  },
  cancelBtnText: {
    fontSize: 13.5,
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.black,
    backgroundColor: "white",
    padding: 10,
  },
  searchIcon: { color: theme.lightColors.black },
  placeholderColor: { color: theme.lightColors.grey0 },
});