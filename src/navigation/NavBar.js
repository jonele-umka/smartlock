import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import i18n from "../../i18n/i18n";

import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ReservationScreen from "../screens/ReservationScreen";
import MapScreen from "../screens/MapScreen";

const Tab = createBottomTabNavigator();

const NavBar = () => {
  const language = useSelector((state) => state.language.language);
  i18n.locale = language;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#594BFF",
        tabBarInactiveTintColor: "rgba(97, 105, 146, 0.8)",
        tabBarStyle: {
          backgroundColor: "#EFF2F6",
          borderTopWidth: 0,
          paddingVertical: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case i18n.t("home"):
              iconName = focused ? "home" : "home-outline";
              break;
            case i18n.t("reservation"):
              return (
                <Image
                  source={
                    focused
                      ? require("../assets/booking.png")
                      : require("../assets/booking-outline.png")
                  }
                  style={{ width: size, height: size, tintColor: color }}
                />
              );
            case i18n.t("map"):
              iconName = focused ? "map" : "map-outline";
              break;
            case i18n.t("favorites"):
              iconName = focused ? "star" : "star-outline";
              break;
            case i18n.t("profile"):
              return (
                <Image
                  source={
                    focused
                      ? require("../assets/user.png")
                      : require("../assets/user-outline.png")
                  }
                  style={{ width: size, height: size, tintColor: color }}
                />
              );
            default:
              iconName = "help-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={i18n.t("home")} component={HomeScreen} />
      <Tab.Screen name={i18n.t("reservation")} component={ReservationScreen} />
      <Tab.Screen name={i18n.t("map")} component={MapScreen} />
      <Tab.Screen name={i18n.t("favorites")} component={FavoritesScreen} />
      <Tab.Screen name={i18n.t("profile")} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default NavBar;
