import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import { Colors } from "../../assets/styles/Colors";

const MenuITemBetween = (props) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "Exo-Medium", color: Colors.textDark }}>
        {props.label}
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{props.resultText}</Text>
        <Icon name="keyboard-arrow-right" size={17} />
      </TouchableOpacity>
    </View>
  );
};

export default MenuITemBetween;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
  button: { flexDirection: "row", alignItems: "center" },
  buttonText: {
    fontFamily: "Exo-Medium",
    marginRight: 10,
    fontSize: 13,
    color: Colors.textLight,
  },
});
