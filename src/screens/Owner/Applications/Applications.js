import { View, Text } from "react-native";
import React from "react";
import { TabView, SceneMap } from "react-native-tab-view";
import ApplicationsTabs from "../../../components/TopTabs/ApplicationsTabs/ApplicationsTabs";
const Applications = () => {
  return (
    <View style={{ flex: 1 }}>
      <ApplicationsTabs />
    </View>
  );
};

export default Applications;
