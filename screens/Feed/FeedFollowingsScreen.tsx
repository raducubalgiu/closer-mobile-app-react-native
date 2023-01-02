import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider } from "@rneui/themed";
import { HeaderFeed } from "../../components/customized";

export const FeedFollowingsScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <HeaderFeed indexLabel={1} />
      <Divider color="#ddd" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
