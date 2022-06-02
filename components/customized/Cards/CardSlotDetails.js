import { StyleSheet, Text } from "react-native";
import { Button, Stack, CustomAvatar } from "../../core";
import React from "react";
import theme from "../../../assets/styles/theme";
import { useTranslation } from "react-i18next";

const { black, grey0 } = theme.lightColors;

export const CardSlotDetails = ({
  startHour,
  channel,
  avatar,
  customer,
  product,
  price,
  service,
}) => {
  const { t } = useTranslation();
  const getBgColor = (channel) => {
    if (channel === "closer") {
      return "#fff5cc";
    } else if (channel === "owner") {
      return "#ccf2ff";
    } else {
      return "#c6ecc6";
    }
  };

  return (
    <Button>
      <Stack
        direction="row"
        align="start"
        justify="start"
        sx={styles.container}
      >
        <Text style={styles.startHour}>{startHour}</Text>
        <Stack
          align="start"
          sx={{ ...styles.slotDetails, backgroundColor: getBgColor(channel) }}
        >
          <Stack align="start" direction="row">
            <CustomAvatar avatar={avatar} size={22.5} iconSize={12.5} />
            <Stack align="start" sx={{ marginLeft: 10, flex: 1 }}>
              <Text style={styles.customer}>{customer}</Text>
              <Stack align="start">
                <Text style={{ fontFamily: "Exo-Bold", color: black }}>
                  {service}
                </Text>
                <Text style={styles.product}>{product}</Text>
              </Stack>
              <Stack direction="row" sx={{ marginTop: 15 }}>
                <Text style={styles.priceLabel}>{t("price")} -</Text>
                <Text style={styles.priceNo}>
                  {price} {t("ron")}
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingTop: 25,
  },
  startHour: {
    color: black,
    fontSize: 14,
    fontFamily: "Exo-SemiBold",
  },
  slotDetails: {
    marginLeft: 15,
    flex: 1,
    padding: 10,
  },
  customer: {
    fontFamily: "Exo-SemiBold",
    color: black,
    fontSize: 16.5,
    marginBottom: 5,
  },
  product: {
    fontFamily: "Exo-Medium",
    color: black,
    fontSize: 16,
  },
  option: {
    color: black,
    fontFamily: "Exo-Medium",
    fontSize: 13,
  },
  priceLabel: {
    color: black,
    fontSize: 15,
    fontFamily: "Exo-SemiBold",
  },
  priceNo: {
    fontFamily: "Exo-SemiBold",
    color: black,
    fontSize: 14.5,
    marginLeft: 5,
  },
});
