import React from "react";
import { useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import OverviewScreen from "../screens/OverviewScreen";
import PaymentsScreen from "../screens/PaymentsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { signIn, overview, payments, favorites, settings } from "../constants";

const Tab = createBottomTabNavigator();

const NavBar = () => {
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );
  return (
    <Tab.Navigator
      initialRouteName={signIn}
      screenOptions={({ route }) => ({
        headerShown: false,
        // tabBarShowLabel: tr,
        tabBarActiveTintColor: "#5d00e6",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: [
          // isDarkModeEnabled
          //   ? { backgroundColor: "#191a1d" }
          //   : { backgroundColor: "#f8f3ff" },
          { borderTopWidth: 0, paddingTop: 10, backgroundColor: "#000" },
        ],

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === overview) {
            iconName = focused ? "grid" : "grid-outline";
          } else if (rn === payments) {
            iconName = focused ? "cash" : "cash-outline";
          } else if (rn === favorites) {
            iconName = focused ? "star" : "star-outline";
          } else if (rn === settings) {
            iconName = focused ? "settings" : "settings-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={overview} component={OverviewScreen} />
      <Tab.Screen name={payments} component={PaymentsScreen} />
      <Tab.Screen name={favorites} component={FavoritesScreen} />
      <Tab.Screen name={settings} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default NavBar;
