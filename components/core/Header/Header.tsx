import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon, Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../assets/styles/theme";
import { Stack } from "../Stack/Stack";
import { IconBackButton } from "../IconButton/IconBackButton";

const { black, grey0 } = theme.lightColors;

export const Header = ({
  hideBtnLeft = false,
  title = "",
  actionBtn = null,
  divider = false,
}) => {
  const navigation = useNavigation();
  const handleBack = () => navigation.goBack();

  return (
    <View>
      <Stack direction="row" sx={styles.container}>
        <TouchableOpacity onPress={!hideBtnLeft ? () => handleBack : null}>
          <IconBackButton color={!hideBtnLeft ? black : "white"} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        {actionBtn && actionBtn}
        {!actionBtn && <Icon name="arrow-back-ios" color="white" />}
      </Stack>
      {divider && <Divider color="#ddd" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10, paddingHorizontal: 15 },
  title: {
    fontSize: 16,
    color: black,
    marginRight: 10,
    fontWeight: "700",
  },
  description: {
    color: grey0,
    fontSize: 15,
  },
});
