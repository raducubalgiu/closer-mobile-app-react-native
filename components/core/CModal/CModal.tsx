import { Icon, Divider } from "@rneui/themed";
import {
  Dimensions,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  SafeAreaView,
  Pressable,
} from "react-native";
import Modal from "react-native-modal";
import { Stack } from "../Stack/Stack";
import theme from "../../../assets/styles/theme";

const { width, height } = Dimensions.get("window");
const { black } = theme.lightColors;

export const CModal = ({
  children,
  size,
  onCloseModal,
  visible,
  headerTitle = "",
  footer,
  header = true,
  sx = {},
}) => {
  const backdrop = (
    <TouchableWithoutFeedback onPress={onCloseModal}>
      <View style={{ flex: 1, backgroundColor: "black" }} />
    </TouchableWithoutFeedback>
  );

  let mVertical;
  let mHorizontal;

  switch (size) {
    case "sm":
      mVertical = height / 3;
      break;
    case "md":
      mVertical = height / 4;
      break;
    case "lg":
      mVertical = height / 5;
      break;
    case "xl":
      mVertical = height / 7;
      break;
    case "full":
      mVertical = 0;
      mHorizontal = 0;
      break;
    default:
      mVertical = height / 5;
  }

  return (
    <Modal
      isVisible={visible}
      deviceWidth={width}
      deviceHeight={height}
      style={{
        marginVertical: mVertical,
        marginHorizontal: mHorizontal,
        ...sx,
      }}
      customBackdrop={backdrop}
      propagateSwipe
      animationInTiming={200}
      animationOutTiming={200}
    >
      <SafeAreaView style={styles.container}>
        {header && (
          <>
            <Stack direction="row" sx={styles.header}>
              <Icon name="close" color="white" />
              <Text style={styles.headerTitle}>{headerTitle}</Text>
              <Pressable onPress={onCloseModal}>
                <Icon name="close" />
              </Pressable>
            </Stack>
            <Divider />
          </>
        )}
        <View style={styles.body}>{children}</View>
        <View style={styles.footer}>{footer}</View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
  },
  header: {
    padding: 15,
  },
  headerTitle: {
    fontSize: 16,
    color: black,
    fontWeight: "600",
  },
  body: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});
