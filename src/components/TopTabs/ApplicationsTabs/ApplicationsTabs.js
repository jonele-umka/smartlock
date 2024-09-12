// ApplicationsTabs.js
import React from "react";
import { SafeAreaView, ScrollView, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ApplicationList from "../Application/ApplicationList";
import CustomText from "../../CustomText/CustomText";

const FirstRoute = () => (
  <ScrollView
    style={{ flex: 1, backgroundColor: "#fff" }}
    contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }}
  >
    <SafeAreaView style={{ flex: 1 }}>
      <ApplicationList status="pending" />
    </SafeAreaView>
  </ScrollView>
);

const SecondRoute = () => (
  <ScrollView
    style={{ flex: 1, backgroundColor: "#fff" }}
    contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }}
  >
    <SafeAreaView style={{ flex: 1 }}>
      <ApplicationList status="active" />
    </SafeAreaView>
  </ScrollView>
);

const ThirdRoute = () => (
  <ScrollView
    style={{ flex: 1, backgroundColor: "#fff" }}
    contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }}
  >
    <SafeAreaView style={{ flex: 1 }}>
      <ApplicationList status="rejected" />
    </SafeAreaView>
  </ScrollView>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

export default function ApplicationsTabs() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Входящие" },
    { key: "second", title: "В процессе" },
    { key: "third", title: "Отклонён" },
  ]);
  // Кастомный рендер TabBar
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{ backgroundColor: "#fff" }}
      indicatorStyle={{ backgroundColor: "#4B5DFF" }}
      activeColor="#1C2863"
      inactiveColor="#1C2863"
    />
  );
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}
