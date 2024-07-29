import React from "react";
import { View, Text, SafeAreaView, Platform, ScrollView } from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/core";

const DetailsNotification = () => {
  const route = useRoute();
  const { text } = route.params;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text>{text}</Text>
      </SafeAreaView>
    </ScrollView>
  );
};

export default DetailsNotification;
