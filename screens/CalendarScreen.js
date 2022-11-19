import {
  SafeAreaView,
  StyleSheet,
  Text,
  RefreshControl,
  Pressable,
  View,
} from "react-native";
import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { Header, Stack } from "../components/core";
import { NoFoundMessage } from "../components/customized";
import { Icon } from "@rneui/themed";
import theme from "../assets/styles/theme";
import { Agenda } from "react-native-calendars";
import { useGet, useRefreshByUser } from "../hooks";

const { primary, grey0 } = theme.lightColors;

export const CalendarScreen = ({ route }) => {
  const { product, service } = route.params;
  const { user } = product;
  const navigation = useNavigation();
  const now = dayjs().format("YYYY-MM-DD");
  const [day, setDay] = useState(now);
  const [knob, setKnob] = useState(false);

  const { data: slots, refetch } = useGet({
    model: "slots",
    uri: `/users/${user?._id}/schedules/slots?day=${day}`,
  });

  const goToConfirm = (slot) => {
    navigation.navigate("ScheduleConfirm", {
      service,
      product,
      slot,
    });
  };

  const renderSlot = (slot) => {
    return (
      <Pressable onPress={() => goToConfirm(slot)}>
        <Stack direction="row" justify="start" sx={styles.slot}>
          <Text style={styles.slotText}>{slot?.hour}</Text>
        </Stack>
      </Pressable>
    );
  };

  const handleDayPress = useCallback(
    (day) => {
      setDay(day.dateString);
      refetch();
    },
    [refetch]
  );

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  const noFoundData = (
    <NoFoundMessage
      title="Nu mai sunt locuri"
      description="Se pare ca nu mai sunt locuri pentru ziua selectata"
      iconName="calendar-clock"
      iconType="material-community"
      iconSize={60}
    />
  );

  const showKnob = (
    <>
      {knob && <Icon name="keyboard-arrow-up" color={grey0} size={30} />}
      {!knob && <Icon name="keyboard-arrow-down" color={grey0} size={30} />}
    </>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={product?.name}
        description={dayjs(day).format("D MMMM")}
        divider
      />
      <Agenda
        items={slots}
        renderItem={renderSlot}
        onDayPress={(day) => handleDayPress(day)}
        renderDay={() => {}}
        firstDay={1}
        onCalendarToggled={(k) => setKnob(k)}
        selected={day}
        minDate={now}
        maxDate={dayjs(now).add(3, "months").format("YYYY-MM-DD")}
        pastScrollRange={3}
        futureScrollRange={3}
        renderEmptyDate={() => <View />}
        renderEmptyData={() => noFoundData}
        renderKnob={() => showKnob}
        rowHasChanged={(r1, r2) => r1.text !== r2.text}
        showClosingKnob={true}
        disabledByDefault={false}
        showOnlySelectedDayItems={true}
        refreshing={refreshing}
        onRefresh={refetchByUser}
        refreshControl={refreshControl}
        theme={styles.agenda}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  slot: {
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: "#f1f1f1",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  slotText: {
    fontSize: 13,
  },
  agenda: {
    agendaDayTextColor: "yellow",
    agendaDayNumColor: "green",
    agendaTodayColor: "red",
    agendaKnobColor: "blue",
    selectedDayBackgroundColor: primary,
    textDayFontSize: 14,
    textDayFontWeight: "500",
    agendaKnobColor: "red",
    agendaTodayColor: "red",
    backgroundColor: "white",
    nowIndicatorKnob: "red",
    todayTextColor: primary,
  },
});
