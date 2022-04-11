import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Colors } from "../../../assets/styles/Colors";
import { Stack } from "../../core";

const CardPriceItem = (props) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" align="start" sx={styles.personServices}>
      <View style={styles.serviceDetailsContainer}>
        <Text style={styles.serviceName}>{props.serviceTitle}</Text>
        <Text style={styles.serviceGender}>{props.gender}</Text>
        <Text style={styles.serviceDescription}>
          {props.serviceDescription}
        </Text>
      </View>
      <View styles={styles.servicePriceContainer}>
        <Text style={styles.servicePrice}>{props.servicePrice} Lei</Text>
        <TouchableOpacity style={styles.bookNowButton}>
          <Text style={styles.bookButtonText}>{t("book")}</Text>
        </TouchableOpacity>
      </View>
    </Stack>
  );
};

export default CardPriceItem;

const styles = StyleSheet.create({
  personServices: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  serviceDetailsContainer: {
    flex: 1,
    paddingVertical: 5,
  },
  serviceName: {
    fontFamily: "Exo-Bold",
    fontSize: 16.5,
  },
  serviceGender: {
    fontFamily: "Exo-SemiBold",
    color: Colors.yellowRatings,
  },
  serviceDescription: {
    fontFamily: "Exo-Medium",
    color: Colors.textLight,
    marginTop: 5,
  },
  servicePrice: {
    fontFamily: "Exo-Bold",
    fontSize: 16,
  },
  bookNowButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: Colors.yellowRatings,
    borderRadius: 50,
  },
  bookButtonText: {
    fontFamily: "Exo-Bold",
  },
});