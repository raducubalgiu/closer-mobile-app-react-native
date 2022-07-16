import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider } from "@rneui/themed";
import { Stack, CustomAvatar, Button } from "../../core";
import moment from "moment";
import theme from "../../../assets/styles/theme";
import { useTranslation } from "react-i18next";

const { black, grey0, error, success, primary } = theme.lightColors;

export const CardScheduleOverview = ({
  avatar,
  owner,
  service,
  price,
  status,
  scheduleStart,
  onPress,
  newSched,
}) => {
  const { t } = useTranslation();
  let statusColor =
    status === "canceled" ? { color: error } : { color: success };

  return (
    <Button onPress={onPress} sx={{ paddingBottom: 10 }}>
      {newSched && (
        <Stack align="start">
          <Stack sx={styles.newCont}>
            <Text style={styles.new}>NOU</Text>
          </Stack>
        </Stack>
      )}
      <Stack direction="row" align="start">
        <Stack direction="row">
          <Stack align="start" sx={{ marginLeft: 10 }}>
            <Text style={styles.service}>{service}</Text>
            <Text style={styles.date}>
              {moment(scheduleStart).utc().format("lll")}
            </Text>
            <Stack direction="row" sx={{ marginTop: 10 }}>
              <CustomAvatar avatar={avatar} size={30} iconSize={15} />
              <Text style={styles.owner}>{owner}</Text>
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Text style={styles.price}>{price} RON</Text>
          <Text style={{ ...styles.status, ...statusColor }}>
            {status === "accepted" ? t("accepted") : t("canceled")}
          </Text>
        </Stack>
      </Stack>
      <Divider color="#ddd" style={{ paddingTop: 25 }} />
    </Button>
  );
};

const styles = StyleSheet.create({
  owner: {
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
    color: black,
    marginLeft: 10,
  },
  service: {
    fontFamily: "Exo-SemiBold",
    color: black,
    fontSize: 15,
    textTransform: "uppercase",
  },
  date: {
    color: grey0,
    fontSize: 14.5,
  },
  price: {
    fontFamily: "Exo-Bold",
    fontSize: 15.5,
    color: black,
    marginBottom: 5,
  },
  status: {
    color: grey0,
    fontSize: 12,
    textTransform: "uppercase",
    fontFamily: "Exo-Medium",
  },
  newCont: {
    marginLeft: 5,
    marginBottom: 10,
    backgroundColor: primary,
    borderRadius: 10,
  },
  new: {
    fontFamily: "Exo-Medium",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
  },
});