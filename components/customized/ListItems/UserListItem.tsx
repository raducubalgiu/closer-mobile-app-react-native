import { StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Stack, CustomAvatar, Checkmark } from "../../core";
import { FollowButton } from "../Buttons/FollowButton";
import theme from "../../../assets/styles/theme";
import { useAuth } from "../../../hooks/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../models/navigation/rootStackParams";

const { grey0, black } = theme.lightColors;

export const UserListItem = ({ user, isFollow, sx = {} }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user: userContext } = useAuth();
  const { avatar, _id, username, name, checkmark } = user;

  const goToUser = (userId: string) => {
    navigation.push("ProfileGeneral", {
      userId,
      username,
      avatar,
      name,
      checkmark,
      service: null,
      option: null,
    });
  };

  return (
    <Stack direction="row" sx={{ ...styles.container, ...sx }}>
      <Pressable style={styles.goToUser} onPress={() => goToUser(_id)}>
        <CustomAvatar avatar={avatar} withBadge={false} />
        <Stack align="start" sx={{ marginLeft: 10 }}>
          <Stack direction="row">
            <Text style={styles.username}>{username}</Text>
            {checkmark && <Checkmark sx={{ marginLeft: 5 }} size={8} />}
          </Stack>
          <Text style={styles.name}>{name}</Text>
        </Stack>
      </Pressable>
      {_id !== userContext?._id && (
        <FollowButton isFollow={isFollow} followeeId={_id} />
      )}
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20, paddingHorizontal: 15 },
  username: {
    fontSize: 15,
    color: black,
    fontWeight: "600",
  },
  name: {
    color: grey0,
    marginTop: 2.5,
  },
  goToUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  btnText: {
    color: black,
    fontSize: 13,
  },
  followers: {
    color: grey0,
    marginTop: 2.5,
    fontSize: 13.5,
  },
});