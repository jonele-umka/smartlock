import React from "react";
import { useSelector } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Text, View, StyleSheet } from "react-native";

import Incoming from "../TransactionTabsScreen/Incoming";
import Outgoing from "../TransactionTabsScreen/Outgoing";
import { LinearGradient } from "expo-linear-gradient";

const Tab = createMaterialTopTabNavigator();

function OutgoingScreen() {
  return (
    <LinearGradient
      style={[
        { flex: 1 },
        // isDarkModeEnabled && { backgroundColor: "#191a1d" },
      ]}
      start={{ x: 2.4, y: 1.1 }}
      end={{ x: 0, y: 0 }}
      colors={["#241270", "#140A4F", "#000"]}
    >
      <View style={styles.container}>
        <Outgoing />
      </View>
    </LinearGradient>
  );
}
function IncomingScreen() {
  return (
    <LinearGradient
      style={[
        { flex: 1 },
        // isDarkModeEnabled && { backgroundColor: "#191a1d" },
      ]}
      start={{ x: 2.4, y: 1.1 }}
      end={{ x: 0, y: 0 }}
      colors={["#241270", "#140A4F", "#000"]}
    >
      <View style={styles.container}>
        <Incoming />
      </View>
    </LinearGradient>
  );
}

function TransactionTabsRoute() {
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );

  // const tabBarStyle = {
  //   backgroundColor: isDarkModeEnabled ? "#191a1d" : "#f8f3ff",
  // };

  // const tabBarActiveTintColor = isDarkModeEnabled ? "#0268EC" : "#191a1d";

  // const tabBarInactiveTintColor = isDarkModeEnabled ? "#fff" : "#767676";

  const tabBarStyle = {
    backgroundColor: "#000",
  };

  const tabBarActiveTintColor = "#fff";
  const tabBarInactiveTintColor = "#9c9c9c";

  return (
    <Tab.Navigator
      initialRouteName="Tabs"
      screenOptions={{
        tabBarStyle: {
          paddingBottom: 3,
          paddingTop: 3,
        },
        tabBarStyle,
        tabBarIndicatorStyle: {
          backgroundColor: "#fff",
        },

        tabBarActiveTintColor: tabBarActiveTintColor,
        tabBarInactiveTintColor: tabBarInactiveTintColor,
      }}
    >
      <Tab.Screen
        name="Outgoing"
        component={OutgoingScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <View>
              <Text style={{ color, fontWeight: 600 }}>Отправленные</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Incoming"
        component={IncomingScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <View>
              <Text style={{ color, fontWeight: 600 }}>Полученные</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TransactionTabsRoute;
