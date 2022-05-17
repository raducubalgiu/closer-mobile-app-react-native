import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import theme from "../../../assets/styles/theme";

export const Feedback = ({ feedback, setFeedback }) => {
  useEffect(() => {
    if (feedback.visible) {
      setTimeout(
        () => setFeedback({ visible: false, message: feedback.message }),
        1500
      );
    }
  }, [feedback]);

  return (
    <>
      {feedback.visible && (
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.message}>{feedback.message}</Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { zIndex: 1000 },
  box: {
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: theme.lightColors.grey1,
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    opacity: 0.95,
  },
  message: { color: "white" },
});