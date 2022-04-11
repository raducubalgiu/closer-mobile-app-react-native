import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Divider, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import HeaderReusable from "../../../components/customized/Headers/HeaderReusable";

const DiscountsProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderReusable
        firstBox={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" type="material" size={20} />
          </TouchableOpacity>
        }
        secondBox={
          <Text style={{ fontFamily: "Exo-Medium", fontSize: 17 }}>
            Discounturi
          </Text>
        }
        thirdBox={<Icon name="arrow-back-ios" type="material" color="white" />}
      />
      <Divider />
      <View style={styles.container}></View>
    </SafeAreaView>
  );
};

export default DiscountsProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    padding: 10,
  },
});