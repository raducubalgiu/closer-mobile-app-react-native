import { StyleSheet, Text, View } from "react-native";
import { AirbnbRating } from "@rneui/themed";
import { find } from "lodash";
import { ListItem, Stack } from "../../core";
import theme from "../../../assets/styles/theme";

const { primary, black, grey0 } = theme.lightColors || {};

const RatingItem = ({
  count,
  defRating,
  percentage,
}: {
  count: number;
  defRating: number;
  percentage: string;
}) => {
  const styles = StyleSheet.create({
    barContainer: {
      flex: 1,
      backgroundColor: "#ddd",
      width: "100%",
      height: 10,
      marginHorizontal: 15,
    },
    barProgress: {
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: primary,
      width: percentage,
      height: 10,
    },
    reviewCount: { color: grey0, fontWeight: "600" },
  });

  return (
    <ListItem between>
      <AirbnbRating
        count={5}
        defaultRating={defRating}
        isDisabled={true}
        showRating={false}
        selectedColor={primary}
        size={15}
      />
      <View style={styles.barContainer}>
        <View style={styles.barProgress} />
      </View>
      <Stack align="center" justify="center" sx={{ width: 20, height: 20 }}>
        <Text style={styles.reviewCount}>{count}</Text>
      </Stack>
    </ListItem>
  );
};

type IProps = { summary: any; ratingsQuantity: number };

export const CardReviewSummary = ({ summary, ratingsQuantity = 0 }: IProps) => {
  const getPercentage = (quantity: number, count: number) => {
    return `${(count / quantity) * 100}%`;
  };
  const displayCount = (summary: any, defRating: number) => {
    const el = find(summary, { _id: defRating });
    if (el) {
      return el.totalRatings;
    } else {
      return 0;
    }
  };

  return (
    <Stack direction="row" justify="start" sx={styles.container}>
      <Stack sx={styles.ratingAvg}>
        <Text style={styles.ratingAvgTxt}>4.5</Text>
      </Stack>
      <Stack sx={{ flex: 1 }}>
        <RatingItem
          defRating={5}
          count={displayCount(summary, 5)}
          percentage={getPercentage(ratingsQuantity, displayCount(summary, 5))}
        />
        <RatingItem
          defRating={4}
          count={displayCount(summary, 4)}
          percentage={getPercentage(ratingsQuantity, displayCount(summary, 4))}
        />
        <RatingItem
          defRating={3}
          count={displayCount(summary, 3)}
          percentage={getPercentage(ratingsQuantity, displayCount(summary, 3))}
        />
        <RatingItem
          defRating={2}
          count={displayCount(summary, 2)}
          percentage={getPercentage(ratingsQuantity, displayCount(summary, 2))}
        />
        <RatingItem
          defRating={1}
          count={displayCount(summary, 1)}
          percentage={getPercentage(ratingsQuantity, displayCount(summary, 1))}
        />
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 2.5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  ratingAvg: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 15,
    padding: 10,
  },
  ratingAvgTxt: { color: black, fontSize: 16, fontWeight: "700" },
});