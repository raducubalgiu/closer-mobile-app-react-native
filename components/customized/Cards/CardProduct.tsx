import { StyleSheet, Text } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { SECOND_ROLE, THIRD_ROLE } from "@env";
import { Stack, Protected } from "../../core";
import theme from "../../../assets/styles/theme";
import { trimFunc } from "../../../utils";
import { useAuth, useDuration } from "../../../hooks";
import { BookmarkButton } from "../Buttons/BookmarkButton";
import { BookButton } from "../Buttons/BookButton";
import { UserListItemSimple } from "../ListItems/UserListItemSimple";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../models/navigation/rootStackParams";

const { black, grey0, primary } = theme.lightColors;

export const CardProduct = ({
  product,
  ownerInfo = false,
  onDeleteProduct,
  onEditProduct,
}) => {
  const { user: userContext } = useAuth();
  const { t } = useTranslation();
  const { name, duration, description, price } = product || {};
  const { option, service, user } = product || {};
  const currDuration = duration ? useDuration(duration) : "";
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToCalendar = () =>
    navigation.navigate("CalendarBig", {
      product,
      service,
    });

  const goToOwner = () => {
    navigation.navigate("ProfileGeneral", { ...user });
  };

  return (
    <Stack sx={styles.card} align="start">
      <Stack direction="row" align="start">
        <Stack align="start" sx={styles.descriptionCont}>
          <Stack direction="row" align="start" sx={{ width: "100%" }}>
            <Stack align="start" sx={{ flex: 1 }}>
              <Text style={styles.name}>{name} </Text>
              <Text style={styles.option}>{option?.name}</Text>
            </Stack>
            <Protected
              roles={[SECOND_ROLE, THIRD_ROLE]}
              userRole={userContext.role}
            >
              <BookButton onPress={goToCalendar} />
            </Protected>
          </Stack>
          <Stack sx={{ marginVertical: 5 }}>
            <Text style={styles.description}>{trimFunc(description, 80)}</Text>
          </Stack>
          <Text style={styles.price}>
            {price} {t("ron")}
          </Text>
        </Stack>
      </Stack>
      {ownerInfo && (
        <UserListItemSimple
          name={user?.name}
          profession={user?.profession.name}
          avatar={user?.avatar}
          onGoToUser={goToOwner}
          sx={{ marginTop: 15 }}
        />
      )}
      <Protected roles={[SECOND_ROLE, THIRD_ROLE]} userRole={userContext.role}>
        <Stack align="end" sx={styles.bookmark}>
          <BookmarkButton
            type="products"
            typeId={product?._id}
            onBookmarksCount={() => {}}
          />
        </Stack>
      </Protected>
    </Stack>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    backgroundColor: "white",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginHorizontal: 10,
  },
  name: {
    fontSize: 17,
    color: black,
    fontWeight: "600",
    marginBottom: 2.5,
  },
  option: {
    color: primary,
    fontSize: 15,
    fontWeight: "700",
    marginRight: 10,
  },
  descriptionCont: { marginRight: 5, flex: 1 },
  description: {
    color: grey0,
    marginTop: 5,
    fontSize: 14,
  },
  price: {
    fontSize: 16,
    color: black,
    fontWeight: "700",
    marginTop: 5,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: primary,
  },
  buttonText: {
    color: black,
  },
  bookmark: {
    width: "100%",
    marginTop: 10,
  },
});