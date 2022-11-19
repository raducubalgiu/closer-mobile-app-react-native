import { StyleSheet, Text, Pressable } from "react-native";
import { Stack } from "../../core";
import theme from "../../../assets/styles/theme";
import { Icon } from "@rneui/themed";

const { black, grey0 } = theme.lightColors;

export const SearchPopularHeading = ({
  heading,
  onSeeAll = undefined,
  collection,
  seeAll = false,
}) => {
  return (
    <>
      {collection?.length > 0 && (
        <Pressable onPress={onSeeAll}>
          <Stack direction="row" sx={styles.container}>
            <Text style={styles.heading}>{heading}</Text>
            {seeAll && (
              <Icon name="keyboard-arrow-right" color={black} size={20} />
            )}
          </Stack>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 20, paddingHorizontal: 15 },
  heading: { color: black, fontSize: 16, fontWeight: "600" },
  seeAll: { color: grey0, fontSize: 13 },
});
