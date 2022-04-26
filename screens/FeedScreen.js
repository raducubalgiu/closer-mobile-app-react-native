import {
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  Animated,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Divider } from "react-native-elements";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import CardPost from "../components/customized/Cards/CardPost";
import { Colors } from "../assets/styles/Colors";
import axios from "axios";
import { usePosts } from "../hooks/usePosts";
import { useAuth } from "../context/auth";
import { IconButton, Stack } from "../components/core";
import FeedLabelButton from "../components/customized/Buttons/FeedLabelButton";

const FeedScreen = () => {
  const { postsState, dispatchPosts } = usePosts();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [followingsPosts, setFollowingsPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAllPosts = useCallback(() => {
    setLoading(true);
    axios
      .get(`${process.env.BASE_ENDPOINT}/posts`)
      .then((res) => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const fetchFollowings = () => {
    setLoading(true);
    axios
      .get(`${process.env.BASE_POINT}/users/${user?._id}/get-followings-posts`)
      .then((res) => {
        setFollowingsPosts(res.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Stack justify="start">
        <ScrollView
          horizontal
          style={styles.listHoriz}
          showsHorizontalScrollIndicator={false}
        >
          <Stack direction="row">
            <IconButton
              iconName="search"
              iconType="feather"
              sx={{ marginRight: 24 }}
            />
            <IconButton iconName="video" iconType="feather" />
            <Divider orientation="vertical" style={{ marginHorizontal: 15 }} />
            <FeedLabelButton
              onPress={() => {
                dispatchPosts({ type: "FETCH_ALL" });
                fetchAllPosts();
              }}
              isActive={postsState.activeAll}
              text="Toate"
            />
            <FeedLabelButton
              onPress={() => {
                dispatchPosts({ type: "FETCH_FOLLOWINGS" });
                fetchFollowings();
              }}
              isActive={postsState.activeFollowings}
              text="Urmaresti"
            />
            <FeedLabelButton
              onPress={() => {
                dispatchPosts({ type: "FETCH_LAST_MINUTE" });
              }}
              isActive={postsState.activeLastMinute}
              text="Oferte Last Minute"
            />
          </Stack>
        </ScrollView>
      </Stack>
      <Animated.FlatList
        ListHeaderComponent={
          loading && <ActivityIndicator style={styles.spinner} />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ marginTop: 5 }}
        data={postsState.activeAll ? posts : followingsPosts}
        nestedScrollEnabled={true}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CardPost
            avatar={item?.user?.avatar[0]?.url}
            username={item?.user?.username}
            job={item?.user?.job}
            date={moment(item.createdAt).startOf("hour").fromNow()}
            image={item?.images[0]?.url}
            description={item?.description}
            likesCount={item?.likesCount}
            commentsCount={item?.commentsCount}
            bookable={item?.bookable}
            checkmark={item?.checkmark}
            isBookmark={false}
            postId={item?._id}
            userId={item?.user?._id}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  screen: { backgroundColor: "white", flex: 1 },
  exploreText: {
    fontFamily: "Exo-Medium",
    color: Colors.textDark,
    marginLeft: 5,
  },
  contentContainerStyle: { marginTop: 50 },
  welcome: {
    fontFamily: "Exo-SemiBold",
    fontSize: 21,
    marginBottom: 2.5,
  },
  bookmark: { padding: 5, marginLeft: 10 },
  description: {
    fontFamily: "Exo-Regular",
    color: Colors.textLight,
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontFamily: "Exo-SemiBold",
    fontSize: 18,
    color: Colors.textDark,
    paddingLeft: 10,
    marginTop: 30,
  },
  spinner: { marginVertical: 20 },
  listHoriz: {
    marginVertical: 7.5,
    paddingHorizontal: 12.5,
  },
});
