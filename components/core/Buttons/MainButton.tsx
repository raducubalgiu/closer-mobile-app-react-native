import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import theme from "../../../assets/styles/theme";

const { black, primary } = theme.lightColors;

export const MainButton = ({
  title,
  loading,
  size,
  variant,
  fullWidth,
  radius,
  sx = {},
  btnText,
  bgColor = "white",
  txtColor,
  ...props
}) => {
  let padding;
  let backgroundColor;
  let color;
  let borderWidth;
  let borderColor;
  let fontSize;

  switch (size) {
    case "sm":
      padding = { paddingVertical: 7.5, paddingHorizontal: 10 };
      break;
    case "md":
      padding = { paddingVertical: 10, paddingHorizontal: 20 };
      fontSize = 14;
      break;
    case "lg":
      padding = { paddingVertical: 15, paddingHorizontal: 32.5 };
      fontSize = 15;
      break;
    default:
      padding = { paddingVertical: 10, paddingHorizontal: 20 };
      fontSize = 14;
  }

  switch (variant) {
    case "outlined":
      backgroundColor = bgColor ? bgColor : "white";
      color = txtColor ? txtColor : black;
      borderWidth = 2;
      borderColor = bgColor ? bgColor : primary;
      break;
    case "contain":
      backgroundColor = bgColor ? bgColor : primary;
      color = txtColor ? txtColor : "white";
      borderColor = bgColor ? bgColor : "white";
      break;
    default:
      borderColor = bgColor ? bgColor : primary;
      backgroundColor = bgColor ? bgColor : primary;
      color = txtColor ? txtColor : "white";
  }

  const styles = StyleSheet.create({
    button: {
      backgroundColor,
      borderRadius: radius ? radius : 5,
      borderWidth,
      borderColor,
      ...padding,
      ...sx,
      width: fullWidth && "100%",
      marginVertical: 10,
    },
    text: {
      textAlign: "center",
      fontWeight: "600",
      fontSize,
      color,
      ...btnText,
    },
  });

  return (
    <TouchableOpacity {...props} activeOpacity={1} style={styles.button}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
