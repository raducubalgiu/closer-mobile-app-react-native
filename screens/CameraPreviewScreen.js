import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import { Stack, Button, CustomAvatar } from "../components/core";
import { CloseIconButton, DownloadIconButton } from "../components/customized";
import * as MediaLibrary from "expo-media-library";
import theme from "../assets/styles/theme";
import { useNavigation } from "@react-navigation/native";

const { black } = theme.lightColors;

export const CameraPreviewScreen = ({ route }) => {
  const { photo, avatar } = route.params;
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleClosePreview = () => navigation.goBack();
  const handleDownload = () => MediaLibrary.saveToLibraryAsync(photo.uri);
  const handleSendPhoto = () => {};

  return (
    <>
      <Image style={styles.preview} source={{ uri: photo.uri }} />
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Stack direction="row" sx={{ margin: 20 }}>
            <CloseIconButton onPress={handleClosePreview} size={32.5} />
            <DownloadIconButton onPress={handleDownload} size={30} />
          </Stack>
          <Button style={styles.sendBtn} onPress={handleSendPhoto}>
            <Stack direction="row" sx={styles.sendCont}>
              <CustomAvatar avatar={avatar} size={30} iconSize={15} />
              <Text style={styles.sendTxt}>{t("send")}</Text>
            </Stack>
          </Button>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  safeArea: { justifyContent: "space-between", height: "100%" },
  sendBtn: {
    margin: 20,
    alignItems: "flex-end",
  },
  sendCont: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 50,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  sendTxt: {
    paddingHorizontal: 10,
    color: black,
    fontWeight: "600",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});