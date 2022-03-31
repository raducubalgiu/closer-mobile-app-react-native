import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../assets/styles/Colors";
import HeaderReusable from "../../../components/customized/Headers/HeaderReusable";

const EditFieldScreen = (props) => {
  const navigation = useNavigation();

  const updateField = (text) => {
    // Validation Here
    props.updateField(text);
  };

  return (
    <>
      <HeaderReusable
        firstBox={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancel}>Anuleaza</Text>
          </TouchableOpacity>
        }
        secondBox={<Text style={styles.field}>{props.field}</Text>}
        thirdBox={
          <TouchableOpacity onPress={props.onSave}>
            <Text style={styles.save}>Salveaza</Text>
          </TouchableOpacity>
        }
      />
      <Divider />
      <View style={{ marginVertical: 10 }}>
        <SearchBar
          placeholder={`${props.field}...`}
          onChangeText={updateField}
          value={props.value}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          searchIcon={""}
          lightTheme={true}
          autoFocus={true}
          cancelButtonTitle=""
          showCancel={false}
        />
      </View>
      <Text
        style={
          props.value.length < 40
            ? styles.strokeLength
            : { ...styles.strokeLength, color: "red" }
        }
      >
        {props.value.length} / {props.fieldLength}
      </Text>
    </>
  );
};

export default EditFieldScreen;

const styles = StyleSheet.create({
  cancel: {
    fontFamily: "Exo-Medium",
    color: Colors.textLight,
    fontSize: 15,
  },
  field: { fontFamily: "Exo-SemiBold", fontSize: 17 },
  save: {
    fontFamily: "Exo-Bold",
    color: Colors.primary,
    fontSize: 16,
  },
  containerStyle: {
    backgroundColor: "transparent",
    padding: 0,
    borderStyle: "dashed",
  },
  inputContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  input: {
    fontFamily: "Exo-Medium",
    fontSize: 15,
  },
  strokeLength: {
    paddingHorizontal: 10,
    fontFamily: "Exo-Medium",
    color: Colors.primary,
  },
});
