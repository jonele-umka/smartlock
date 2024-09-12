import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/core";

const MoreDetailsApplications = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { text } = route.params;
  return (
    <ScrollView style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text>{text}</Text>
      </SafeAreaView>
    </ScrollView>
  );
};

export default MoreDetailsApplications;
