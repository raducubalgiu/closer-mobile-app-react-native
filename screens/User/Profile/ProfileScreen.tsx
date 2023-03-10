import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  FlatListProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import TabBar from "../../../Test/src/components/TabBar";
import useScrollSync from "../../../Test/src/hooks/useScrollSync";
import { ScrollPair } from "../../../Test/src/types/ScrollPair";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HeaderConfig } from "../../../Test/src/types/HeaderConfig";
import {
  HeaderProfile,
  PostOptionsSheet,
  ProfileMenuSheet,
} from "../../../components/customized";
import ProfileOverview from "../../../components/customized/ProfileOverview/ProfileOverview";
import { useAuth } from "../../../hooks";
import { ProfileIconButton } from "../../../components/customized";
import { Button } from "../../../components/core";
import PostsProfileTab from "../../../components/customized/Tabs/ProfileTabs/PostsProfileTab";
import VideosProfileTab from "../../../components/customized/Tabs/ProfileTabs/VideosProfileTab";
import { Post } from "../../../models";
import SheetModal from "../../../components/core/SheetModal/SheetModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const TAB_BAR_HEIGHT = 42.5;
const HEADER_HEIGHT = 240;

const Tab = createMaterialTopTabNavigator();

const Profile: FC = () => {
  const { user } = useAuth();
  const { top } = useSafeAreaInsets();

  const { height, width } = useWindowDimensions();

  const settingsRef = useRef<BottomSheetModal>(null);
  const addPostRef = useRef<BottomSheetModal>(null);
  const postsRef = useRef<FlatList>(null);
  const videosRef = useRef<FlatList>(null);

  const snapPoints = useMemo(() => [1, 200], []);

  const [tabIndex, setTabIndex] = useState(0);

  const headerConfig = useMemo<HeaderConfig>(
    () => ({
      heightCollapsed: -TAB_BAR_HEIGHT,
      heightExpanded: HEADER_HEIGHT,
    }),
    [HEADER_HEIGHT, TAB_BAR_HEIGHT]
  );

  const { heightCollapsed, heightExpanded } = headerConfig;

  const headerDiff = heightExpanded - heightCollapsed;

  const postsScrollValue = useSharedValue(0);
  const videosScrollValue = useSharedValue(0);

  const postsScrollHandler = useAnimatedScrollHandler(
    (event) => (postsScrollValue.value = event.contentOffset.y)
  );

  const videosScrollHandler = useAnimatedScrollHandler(
    (event) => (videosScrollValue.value = event.contentOffset.y)
  );

  const scrollPairs = useMemo<ScrollPair[]>(
    () => [
      { list: postsRef, position: postsScrollValue },
      { list: videosRef, position: videosScrollValue },
    ],
    [postsRef, postsScrollValue, videosRef, videosScrollValue]
  );

  const { sync } = useScrollSync(scrollPairs, headerConfig);

  const сurrentScrollValue = useDerivedValue(
    () => (tabIndex === 0 ? postsScrollValue.value : videosScrollValue.value),
    [tabIndex, postsScrollValue, videosScrollValue]
  );

  const translateY = useDerivedValue(
    () => -Math.min(сurrentScrollValue.value, headerDiff)
  );

  const tabBarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const contentContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT + top,
    }),
    [HEADER_HEIGHT, TAB_BAR_HEIGHT, top]
  );

  const sharedProps = useMemo<Partial<FlatListProps<Post>>>(
    () => ({
      contentContainerStyle,
      onMomentumScrollEnd: sync,
      onScrollEndDrag: sync,
      scrollEventThrottle: 12,
    }),
    [contentContainerStyle, sync]
  );

  const renderPosts = useCallback(
    () => (
      <PostsProfileTab
        ref={postsRef}
        userId={user?.id}
        onScroll={postsScrollHandler}
        {...sharedProps}
      />
    ),
    [postsRef, postsScrollHandler, sharedProps, user]
  );

  const renderVideos = useCallback(
    () => (
      <VideosProfileTab
        ref={videosRef}
        userId={user?.id}
        onScroll={videosScrollHandler}
        {...sharedProps}
      />
    ),
    [videosRef, videosScrollHandler, sharedProps, user]
  );

  const tabBarStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      styles.tabBarContainer,
      { top: HEADER_HEIGHT + TAB_BAR_HEIGHT },
      tabBarAnimatedStyle,
    ],
    [HEADER_HEIGHT, TAB_BAR_HEIGHT, tabBarAnimatedStyle]
  );

  const renderTabBar = useCallback<
    (props: MaterialTopTabBarProps) => React.ReactElement
  >(
    (props) => (
      <Animated.View style={tabBarStyle}>
        <TabBar onIndexChange={setTabIndex} {...props} />
      </Animated.View>
    ),
    [tabBarStyle, setTabIndex]
  );

  const headerContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [styles.headerContainer, headerAnimatedStyle],

    [headerAnimatedStyle]
  );

  return (
    <View style={styles.container}>
      <HeaderProfile
        username="raducubalgiu"
        checkmark={true}
        onGoToFindFriends={() => {}}
        onOpenPostOptions={() => addPostRef.current?.present()}
        onOpenSettings={() => settingsRef.current?.present()}
      />
      <View style={{ flex: 1 }}>
        <Animated.View style={headerContainerStyle}>
          <ProfileOverview
            name={user?.name}
            username={user?.username}
            avatar={user?.avatar}
            user={user}
          >
            <Button
              title="Editeaza Profilul"
              onPress={() => {}}
              variant="outlined"
              sxBtn={{ width: 150 }}
            />
            <ProfileIconButton name="bookmark" onPress={() => {}} />
            <ProfileIconButton name="instagram" onPress={() => {}} />
            <ProfileIconButton name="youtube" onPress={() => {}} />
          </ProfileOverview>
        </Animated.View>
        <Tab.Navigator
          initialLayout={{ width, height }}
          tabBar={renderTabBar}
          sceneContainerStyle={{ backgroundColor: "white" }}
          screenOptions={{ lazy: true }}
        >
          <Tab.Screen name="Posts">{renderPosts}</Tab.Screen>
          <Tab.Screen name="Videos">{renderVideos}</Tab.Screen>
        </Tab.Navigator>
      </View>
      <SheetModal
        ref={settingsRef}
        snapPoints={snapPoints}
        animationConfig={{ duration: 150 }}
      >
        <ProfileMenuSheet onCloseSheet={() => settingsRef.current?.close()} />
      </SheetModal>
      <SheetModal
        ref={addPostRef}
        snapPoints={snapPoints}
        animationConfig={{ duration: 150 }}
      >
        <PostOptionsSheet />
      </SheetModal>
    </View>
  );
};

export default memo(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  tabBarContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
    zIndex: 1,
    backgroundColor: "white",
    height: TAB_BAR_HEIGHT,
    justifyContent: "center",
  },
  headerContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
    zIndex: 1,
    height: HEADER_HEIGHT,
  },
});
