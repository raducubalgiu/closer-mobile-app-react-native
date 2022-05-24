import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { MainButton } from "../Buttons/MainButton";
import React, { useEffect, useState } from "react";
import theme from "../../../assets/styles/theme";
import { Icon } from "@rneui/themed";

const InputCheck = (props) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const { inputName, endpoint } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      inputName: "",
    },
  });
  const input = watch(inputName);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setLoading(true);
      axios
        .post(endpoint, {
          username: input,
        })
        .then((res) => {
          setLoading(false);
          setStatus(res.data.status);
        })
        .catch((err) => console.log(err));
    }, 1000);

    return () => {
      clearTimeout(identifier);
    };
  }, [input]);

  let showStatus;

  if (input === undefined) {
    showStatus = <Text></Text>;
  } else if (!loading && input !== "") {
    showStatus = (
      <Icon
        name={status === "success" ? "check" : "info-with-circle"}
        type="entypo"
        size={18}
        color={status === "success" ? "green" : "red"}
      />
    );
  } else if (loading && input !== "") {
    showStatus = <ActivityIndicator size="small" />;
  } else {
    showStatus = <Text></Text>;
  }

  const onSubmit = (data) => {
    if (status === "success") props.onSubmit(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputCheck}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Nume de utilizator"
              placeholderTextColor={theme.lightColors.grey0}
            />
          )}
          name={inputName}
        />
        <View style={{ padding: 10 }}>{showStatus}</View>
      </View>
      {errors.username && (
        <Text style={styles.error}>Acest camp este obligatoriu.</Text>
      )}
      <MainButton
        onPress={handleSubmit(onSubmit)}
        title="Continuare"
        disabled={!input ? true : false}
      />
    </View>
  );
};

export default InputCheck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputCheck: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  input: { flex: 1, padding: 15 },
  error: {
    color: theme.lightColors.error,
    fontFamily: "Exo-Regular",
    marginLeft: 10,
    marginTop: 5,
    fontSize: 13,
  },
});
