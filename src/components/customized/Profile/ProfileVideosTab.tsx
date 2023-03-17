import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Animated,
  FlatList,
} from "react-native";
import { ForwardedRef, forwardRef, useCallback, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

type IProps = {
  userId: string;
  sharedProps: any;
  panHandlers: any;
  onScroll: any;
};

const ProfileVideosTab = forwardRef(
  (props: IProps, ref: ForwardedRef<FlatList>) => {
    const { userId, sharedProps, panHandlers, onScroll } = props;
    const [videos] = useState(Array(20).fill(0));
    const { width, height } = useWindowDimensions();
    const isFocused = useIsFocused();

    const renderPost = useCallback(({ item, index }: any) => {
      return (
        <View
          style={{
            marginLeft: index % 3 ? 1.25 : 0,
            marginBottom: 1.25,
            backgroundColor: "white",
            width: width / 3,
            height: width / 3,
          }}
        >
          <View
            style={{
              backgroundColor: "red",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>{index}</Text>
          </View>
        </View>
      );
    }, []);

    return (
      <Animated.FlatList
        ref={ref}
        {...sharedProps}
        {...panHandlers}
        onScroll={isFocused ? onScroll : null}
        data={videos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPost}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        scrollToOverflowEnabled={true}
      />
    );
  }
);

export default ProfileVideosTab;

const styles = StyleSheet.create({});
