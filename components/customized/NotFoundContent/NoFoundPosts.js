import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack } from "../../core";
import theme from "../../../assets/styles/theme";

const NoFoundPosts = (props) => {
  return (
    <Stack align="center" justify="center" sx={styles.container}>
      <Text style={styles.title}>Adauga prima ta postare</Text>
      <Text style={styles.description}>
        Creeaza prima ta postare si iesi in fata oamenilor
      </Text>
      <TouchableOpacity onPress={props.onPress}>
        <Text style={styles.btnText}>Adauga o postare</Text>
      </TouchableOpacity>
    </Stack>
  );
};

export default NoFoundPosts;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  title: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.black,
    marginBottom: 5,
  },
  description: {
    fontFamily: "Exo-Regular",
    color: theme.lightColors.grey0,
    marginBottom: 15,
    textAlign: "center",
  },
  btnText: { fontFamily: "Exo-SemiBold", color: theme.lightColors.primary },
});
