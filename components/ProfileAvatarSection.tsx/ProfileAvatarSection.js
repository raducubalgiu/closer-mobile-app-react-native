import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, Icon } from "react-native-elements";
import { Colors } from "../../assets/styles/Colors";
import ContainedButton from "../Buttons/ContainedButton";
import OutlinedButton from "../Buttons/OutlinedButton";

const ProfileAvatarSection = (props) => {
  return (
    <View style={styles.container}>
      <Avatar
        size={90}
        rounded
        source={{ uri: `${props.user.avatar}` }}
        title="Bj"
        containerStyle={{ backgroundColor: "grey" }}
      >
        <Avatar.Accessory size={18} backgroundColor={Colors.primary} />
      </Avatar>
      <Text style={styles.name}>{props.user.name}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.job}>{props.user.job}</Text>
        <Icon
          type="antdesign"
          name="star"
          color={Colors.primary}
          size={16}
          style={{ marginLeft: 7.5 }}
        />
        <Text style={styles.ratingsAverage}>4.5</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.statsNumber}>{props.user.ratingsCount}</Text>
          <Text style={styles.statsText}>Ratinguri</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.statsNumber}>{props.user.followersCount}</Text>
          <Text style={styles.statsText}>Urmaritori</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.statsNumber}>{props.user.followingCount}</Text>
          <Text style={styles.statsText}>Urmaresti</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <View>
          <ContainedButton title="Urmareste" />
        </View>
        <View style={{ marginLeft: 10 }}>
          <OutlinedButton title="Mesaj" />
        </View>
      </View>
    </View>
  );
};

export default ProfileAvatarSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
  },
  name: {
    fontFamily: "Exo-SemiBold",
    color: Colors.textDark,
    fontSize: 17.5,
    marginTop: 5,
    marginBottom: 5,
  },
  job: {
    fontFamily: "Exo-SemiBold",
    color: Colors.primary,
    marginLeft: 5,
    fontSize: 14,
  },
  ratingsAverage: { fontFamily: "Exo-SemiBold", marginLeft: 2.5 },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 60,
    marginTop: 20,
    marginBottom: 20,
  },
  statsText: {
    fontFamily: "Exo-Medium",
    color: Colors.textDark,
    fontSize: 13,
    marginTop: 5,
  },
  statsNumber: { fontFamily: "Exo-Bold", fontSize: 14 },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});
