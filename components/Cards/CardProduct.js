import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../assets/styles/Colors";
import OutlinedButton from "../Buttons/OutlinedButton";

const CardProduct = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardLayout}>
        <View>
          <Text style={styles.name}>
            {props.name} - {props.option}
          </Text>
          <Text style={styles.description}>{props.description}</Text>
          <Text style={styles.price}>{props.price} RON</Text>
        </View>
        <OutlinedButton title="Rezerva" />
      </View>
    </View>
  );
};

export default CardProduct;

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    padding: 15,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cardLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  name: {
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
    marginBottom: 1,
  },
  description: {
    fontFamily: "Exo-Regular",
    color: Colors.textLight,
  },
  price: {
    fontFamily: "Exo-Bold",
    marginTop: 10,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  buttonText: {
    color: Colors.textDark,
    fontFamily: "Exo-Medium",
  },
});
