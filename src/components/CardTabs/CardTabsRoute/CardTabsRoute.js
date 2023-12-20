import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Accounts } from "../CardTabsScreen/Accounts/Accounts";
import Cards from "../CardTabsScreen/Cards/Cards";
import Crypto from "../CardTabsScreen/Crypto/Crypto";

const Tab = createMaterialTopTabNavigator();

const CardTabsRoute = () => {
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );

  // const tabBarStyle = {
  //   backgroundColor: isDarkModeEnabled ? "#191a1d" : "#f8f3ff",
  // };

  // const tabBarActiveTintColor = isDarkModeEnabled ? "#6e34fb" : "#191a1d";

  // const tabBarInactiveTintColor = isDarkModeEnabled ? "#fff" : "#767676";

  const tabBarStyle = {
    backgroundColor: "#191a1d",
  };

  const tabBarActiveTintColor = "#5d00e6";
  const tabBarInactiveTintColor = "#fff";

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabel: ({ color }) => (
            <View>
              <Text style={{ color, fontWeight: "600" }}>{route.name}</Text>
            </View>
          ),
          swipeEnabled: false,
          tabBarStyle: tabBarStyle,
          tabBarIndicatorStyle: { height: 0 },
          tabBarActiveTintColor: tabBarActiveTintColor,
          tabBarInactiveTintColor: tabBarInactiveTintColor,
        })}
        initialRouteName="Tabs"
      >
        <Tab.Screen name="Крипто" component={Crypto} />
        <Tab.Screen name="Карты" component={Cards} />
        {/* <Tab.Screen name="Аккаунты" component={Accounts} /> */}
      </Tab.Navigator>
    </View>
  );
};

export default CardTabsRoute;
