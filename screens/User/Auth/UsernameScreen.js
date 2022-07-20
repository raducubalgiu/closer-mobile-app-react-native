import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import React, { useState } from "react";
import { t } from "i18next";
import theme from "../../../assets/styles/theme";
import { useAuth } from "../../../hooks/auth";
import InputCheck from "../../../components/core/Inputs/InputCheck";
import { Feedback } from "../../../components/core";

const UsernameScreen = (props) => {
  const { idTokenResult } = props.route.params;
  const { displayName, photoURL } = idTokenResult;
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const { setUser } = useAuth();

  const handleSubmit = async (data) => {
    try {
      const userResult = await axios.post(
        `${process.env.BASE_ENDPOINT}/users/create-or-update-user`,
        {
          username: data.username,
          name: displayName ? displayName : data.username,
          avatar: photoURL ? photoURL : [],
          role: props.route.params.role,
          business: props.route.params.business,
        },
        {
          headers: {
            Authorization: "Bearer " + idTokenResult?.token,
          },
        }
      );

      setUser({
        ...userResult.data,
        counter: {
          ratingsAverage: 4.5,
          ratingsQuantity: 0,
          followersCount: 0,
          followingCount: 0,
        },
        token: idTokenResult?.token,
      });
    } catch (err) {
      setFeedback({ visible: true, message: t("somethingWentWrong") });
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      <View style={styles.container}>
        <Text style={styles.title}>{t("createAUsername")}</Text>
        <Text style={styles.description}>{t("pickAUsername")}</Text>
      </View>
      <InputCheck
        endpoint={`${process.env.BASE_ENDPOINT}/users/check-username`}
        inputName="username"
        onSubmit={handleSubmit}
      />
    </SafeAreaView>
  );
};

export default UsernameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    marginTop: 50,
  },
  title: {
    fontFamily: "Exo-Medium",
    fontSize: 23,
    textAlign: "center",
    marginHorizontal: 30,
  },
  description: {
    fontFamily: "Exo-Regular",
    textAlign: "center",
    marginVertical: 15,
    marginHorizontal: 10,
    color: theme.lightColors.grey0,
    fontSize: 15,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    fontFamily: "Exo-Regular",
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
  },
});
