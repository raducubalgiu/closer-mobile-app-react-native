import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Stack } from "../../core";
import theme from "../../../assets/styles/theme";
import CardCompleteProfile from "../Cards/CardCompleteProfile";
import { useAuth } from "../../../context/auth";
import { useNavigation } from "@react-navigation/native";

const CompleteProfile = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  // const [steps, setSteps] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.BASE_ENDPOINT}/users/${user?._id}/get-order`)
  //     .then((res) => {
  //       const {
  //         name,
  //         biography,
  //         avatar,
  //         businessType,
  //         location,
  //         services,
  //         products,
  //       } = res.data.order;
  //       setSteps([
  //         name,
  //         biography,
  //         avatar,
  //         businessType,
  //         location,
  //         services,
  //         products,
  //       ]);
  //     })
  //     .catch((err) => console.log(err));
  // }, [user?._id]);

  // console.log(steps);

  const STEPS = [
    {
      title: "Adauga tipul afacerii",
      description: "Este necesar sa stim care este tipul business-ului tau",
      iconName: "navigation",
      iconType: "feather",
      completed: false,
      navigation: "AddBusinessType",
    },
    {
      title: "Adauga locatia",
      description: "Introdu locatia si incepe sa primesti clienti",
      iconName: "navigation",
      iconType: "feather",
      completed: false,
      navigation: "AddLocation",
    },
    {
      title: "Adauga serviciile",
      description: "Ce servicii oferi clientilor?",
      iconName: "bulb1",
      iconType: "antdesign",
      completed: false,
      navigation: "AddServices",
    },
    {
      title: "Adauga produsele",
      description: "Adauga produsele aferente fiecarui serviciu oferit",
      iconName: "rocket1",
      iconType: "antdesign",
      completed: false,
      navigation: "AddProducts",
    },
    {
      title: "Include-ti numele",
      description: "Cum ar trebui sa iti spuna oamenii?",
      iconName: "user",
      iconType: "antdesign",
      completed: true,
      navigation: "EditName",
    },
    {
      title: "Adauga-ti biografia",
      description: "Ce ne spui despre tine?",
      iconName: "form",
      iconType: "antdesign",
      completed: false,
      navigation: "EditBio",
    },
    {
      title: "Adauga fotografia de profil",
      description: "Ce fotografie te reprezinta?",
      iconName: "camerao",
      iconType: "antdesign",
      completed: true,
      navigation: "EditAvatar",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completeaza-ti profilul</Text>
      <Stack
        direction="row"
        justify="start"
        sx={{ marginTop: 5, marginBottom: 15 }}
      >
        <Text style={styles.counter}>0 / 7</Text>
        <Text style={styles.status}> FINALIZATE</Text>
      </Stack>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        {STEPS.map((step, i) => (
          <CardCompleteProfile
            key={i}
            onPress={() => navigation.navigate(step?.navigation)}
            iconName={step.iconName}
            iconType={step.iconType}
            withBadge={step.completed}
            title={step.title}
            description={step.description}
            completed={step.completed}
            actionTitle={step.completed ? "Editeaza" : "Adauga"}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CompleteProfile;

const styles = StyleSheet.create({
  container: { paddingVertical: 15, paddingLeft: 15, flex: 1 },
  title: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.black,
    fontSize: 15,
  },
  counter: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.black,
    fontSize: 12.5,
  },
  status: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.primary,
    fontSize: 12,
  },
});
