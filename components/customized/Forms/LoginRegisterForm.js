import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Divider } from "@rneui/themed";
import { FormInput, MainButton, Stack, Button } from "../../core";
import theme from "../../../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { AuthProviders } from "./AuthProviders";

const defaultValues = {
  email: "",
  password: "",
};

export const LoginRegisterForm = ({
  onSubmit,
  heading,
  statusText,
  statusBtn,
  statusAction,
  loading,
}) => {
  const [disabled, setDisabled] = useState(true);
  const methods = useForm({ defaultValues });
  const { handleSubmit, watch } = methods;
  const { t } = useTranslation();
  const emailInput = watch("email");
  const passwordInput = watch("password");

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (emailInput !== "" && passwordInput !== "") {
        setDisabled(false);
      }
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailInput, passwordInput]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      <FormProvider {...methods}>
        <FormInput
          sx={styles.inputEmail}
          placeholder={t("email")}
          name="email"
        />
        <FormInput
          sx={styles.inputPass}
          placeholder={t("password")}
          name="password"
          secureTextEntry={true}
        />
        <MainButton
          size="lg"
          radius={10}
          title={heading}
          loading={loading}
          onPress={handleSubmit(onSubmit)}
          disabled={disabled}
        />
      </FormProvider>

      <Stack align="start">
        <Stack direction="row">
          <Text style={styles.statusText}>{statusText}</Text>
          <Button onPress={statusAction}>
            <Text style={styles.statusBtn}>{statusBtn}</Text>
          </Button>
        </Stack>
      </Stack>
      <Divider style={styles.divider} />
      <AuthProviders />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  heading: {
    fontFamily: "Exo-SemiBold",
    fontSize: 25,
    color: theme.lightColors.black,
    marginTop: 30,
    marginBottom: 25,
  },
  statusText: { fontFamily: "Exo-Regular", marginRight: 5 },
  statusBtn: { fontFamily: "Exo-SemiBold" },
  inputEmail: {
    marginBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
    padding: 17.5,
  },
  inputPass: { borderTopLeftRadius: 0, borderTopRightRadius: 0, padding: 17.5 },
  divider: { marginTop: 20, marginBottom: 35 },
});
