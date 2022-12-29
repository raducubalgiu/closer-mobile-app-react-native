import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { Header, Button, Stack } from "../components/core";
import { useAuth, usePost } from "../hooks";
import theme from "../assets/styles/theme";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import dayjs from "dayjs";
import { RootStackParams } from "../models/navigation/rootStackParams";
import { showToast } from "../utils";

const { width } = Dimensions.get("window");
const { black, grey0 } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "ScheduleConfirm">;

export const ScheduleConfirmScreen = ({ route }: IProps) => {
  const { user: customerId } = useAuth();
  const { serviceId, product, slot } = route.params;
  const { start, end, hour } = slot;
  const { ownerId, name, price, option, duration, description, locationId } =
    product;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();

  const { mutate, isLoading, isSuccess } = usePost({
    uri: "/schedules",
    onSuccess: () => navigation.navigate("Schedules"),
    onError: () => showToast({ message: t("somethingWentWrong") }),
  });

  const handleBook = () => {
    mutate({
      start,
      end,
      ownerId: ownerId.id,
      customerId: customerId?.id,
      serviceId,
      locationId,
      product: {
        name,
        description,
        price,
        option,
        duration,
      },
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("checkBookingDetails")} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Stack align="start">
          <Stack align="start" direction="row" sx={{ marginBottom: 50 }}>
            <Icon
              name="calendar"
              type="feather"
              size={20}
              color={black}
              style={styles.icon}
            />
            <Stack align="start" sx={{ marginLeft: 15, flex: 1 }}>
              <Text style={styles.heading}>
                {dayjs(start).format("DD-MM-YYYY")} - {hour}
              </Text>
              <Text style={styles.description}>{ownerId?.name}</Text>
            </Stack>
          </Stack>
          <Stack align="start" direction="row" sx={{ marginBottom: 50 }}>
            <Icon
              name="shopping-bag"
              type="feather"
              size={20}
              color={black}
              style={styles.icon}
            />
            <Stack align="start" sx={{ marginLeft: 15, flex: 1 }}>
              <Text style={styles.heading}>{product.name}</Text>
              <Text style={styles.description}>
                {`Categorie: ${option.name || option}`}
              </Text>
              <Text style={styles.duration}>Durata: {duration} min</Text>
              <Text style={styles.description}>{description}</Text>
            </Stack>
          </Stack>
          <Stack align="start" direction="row" sx={{ marginBottom: 50 }}>
            <Icon
              name="credit-card"
              type="feather"
              size={20}
              color={black}
              style={styles.icon}
            />
            <Stack align="start" sx={{ marginLeft: 15, flex: 1 }}>
              <Text style={styles.heading}>{t("payment")}</Text>
              <Text style={styles.description}>{t("paymentDetails")}</Text>
              <Text style={styles.price}>{price} LEI</Text>
            </Stack>
          </Stack>
        </Stack>
      </ScrollView>
      <Button
        size="lg"
        radius={25}
        title={t("confirmBooking")}
        loading={isLoading && !isSuccess}
        onPress={handleBook}
        sxBtn={{ marginHorizontal: 15 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingTop: 40,
    flex: 1,
  },
  heading: {
    color: black,
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 50,
  },
  description: {
    marginTop: 5,
    color: grey0,
    fontSize: 16,
  },
  duration: { marginTop: 5, color: grey0, fontSize: 16 },
  price: {
    marginTop: 15,
    color: black,
    fontSize: 27.5,
    fontWeight: "700",
  },
});
