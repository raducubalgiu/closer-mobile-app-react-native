import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "react-native-elements";
import { useAuth } from "../context/auth";
import "../i18next";

import { Colors } from "../assets/styles/Colors";
import HomeScreen from "../screens/HomeScreen";
import AuthScreen from "../screens/User/AuthScreen";
import ProfileScreen from "../screens/User/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import FiltersDateScreen from "../screens/FilterDateScreen";
import FiltersServiceScreen from "../screens/FiltersServiceScreen";
import ServicesNavigation from "../screens/ServicesNavigationScreen";
import ServicesScreen from "../screens/ServicesScreen";
import SearchEverything from "../screens/SearchEverything";
import MessagesScreen from "../screens/MessagesScreen";
import ServiceItemScreen from "../screens/ServiceItemScreen";
import SocialScreen from "../screens/SocialScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="StackBase" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="AllServices" component={ServicesNavigation} />
      <Stack.Screen name="FiltersDate" component={FiltersDateScreen} />
      <Stack.Screen name="FiltersService" component={FiltersServiceScreen} />
      <Stack.Screen name="Services" component={ServicesScreen} />
      <Stack.Screen name="ServiceItem" component={ServiceItemScreen} />
    </Stack.Navigator>
  );
};

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
};

const UserStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const CloserNavigation = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            let iconType;

            if (route.name === "Home") {
              iconType = "ionicon";
              iconName = focused ? "home-sharp" : "home-outline";
            } else if (route.name === "SearchEverything") {
              iconType = "ionicon";
              iconName = focused ? "ios-search" : "search-outline";
            } else if (route.name === "Social") {
              iconType = "material";
              iconName = focused
                ? "local-fire-department"
                : "local-fire-department";
            } else if (route.name === "Messages") {
              iconType = "ionicon";
              iconName = focused ? "chatbubble-sharp" : "chatbubble-outline";
            } else if (route.name === "User") {
              iconType = "ionicon";
              iconName = focused ? "person" : "person-outline";
            }

            // You can return any component that you like here!
            return <Icon name={iconName} type={iconType} color={color} />;
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: "gray",
          headerShown: false,
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={StackNavigator}
          options={{ tabBarLabel: "Acasa" }}
        />
        <Tab.Screen
          name="SearchEverything"
          component={SearchEverything}
          options={{ tabBarLabel: "Exploreaza" }}
        />
        <Tab.Screen name="Social" component={SocialScreen} />
        <Tab.Screen
          name="Messages"
          component={MessagesScreen}
          options={{ tabBarLabel: "Mesaje" }}
        />
        {user ? (
          <Tab.Screen
            name="User"
            component={UserStackNavigator}
            options={{ tabBarLabel: "Profil" }}
          />
        ) : (
          <Tab.Screen
            name="User"
            component={AuthStackNavigator}
            options={{ tabBarLabel: "Profil" }}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default CloserNavigation;
