import { useState, useRef, useMemo, useCallback } from "react";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import { Divider } from "react-native-elements";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { DUMMY_RECOMMENDED } from "../../dummy-data/dummyRecomended";
import CardRecommended from "../Cards/CardRecommended";
import { useTranslation } from "react-i18next";
import { Colors } from "../../assets/styles/Colors";

const BottomSheetRecommend = (props) => {
  const { t } = useTranslation();
  const sheetRef = useRef(null);
  const [sheetStep, setSheetStep] = useState(0);
  const height = Dimensions.get("window").height;

  const snapPoints = useMemo(() => [height / 2, height / 1.2], []);

  const handleSheetChange = useCallback((index) => {
    setSheetStep(index);
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={sheetStep[0]}
        appearsOnIndex={sheetStep[1]}
      />
    ),
    []
  );

  return (
    <BottomSheet
      style={styles.bottomSheet}
      backdropComponent={renderBackdrop}
      ref={sheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      handleIndicatorStyle={{
        backgroundColor: "#ddd",
        width: 45,
        height: 5,
      }}
    >
      <BottomSheetView>
        <View>
          <Text style={styles.sheetHeading}>{t("nearYou")}</Text>
          <Divider
            width={2}
            color="#f1f1f1"
            style={{ paddingBottom: 5, marginBottom: 5 }}
          />
          <FlatList
            data={DUMMY_RECOMMENDED}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardRecommended
                id={item._id}
                name={item.name}
                image={item.image}
                title={item.title}
                address={item.address}
                distance={item.distance}
                ratingsAverage={item.ratingsAverage}
                ratingsQuantity={item.ratingsQuantity}
                availableSeats={item.availableSeats}
              />
            )}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BottomSheetRecommend;

const styles = StyleSheet.create({
  sheetHeading: {
    paddingVertical: 5,
    paddingLeft: 15,
    color: Colors.textDark,
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
  },
  bottomSheet: {
    shadowColor: "#c9c5c5",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,

    elevation: 11,
  },
});
