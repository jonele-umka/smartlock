import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import ApplicationList from "../Application/ApplicationList";
import i18n from "../../i18n/i18n";

export default function ApplicationsTabs() {
  const [activeTab, setActiveTab] = useState("first");

  const renderTabContent = () => {
    switch (activeTab) {
      case "first":
        return <ApplicationList status="pending" />;
      case "second":
        return <ApplicationList status="active" />;
      case "third":
        return <ApplicationList status="rejected" />;
      default:
        return <ApplicationList status="pending" />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "#ddd",
        }}
      >
        <TouchableOpacity
          style={{
            padding: 15,
            flex: 1,
            backgroundColor: activeTab === "first" ? "#4B5DFF" : "transparent",
            alignItems: "center",
          }}
          onPress={() => setActiveTab("first")}
        >
          <Text style={{ color: activeTab === "first" ? "#fff" : "#000" }}>
            {i18n.t("incoming")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 15,
            flex: 1,
            backgroundColor: activeTab === "second" ? "#4B5DFF" : "transparent",
            alignItems: "center",
          }}
          onPress={() => setActiveTab("second")}
        >
          <Text style={{ color: activeTab === "second" ? "#fff" : "#000" }}>
            {i18n.t("inProcess")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 15,
            flex: 1,
            backgroundColor: activeTab === "third" ? "#4B5DFF" : "transparent",
            alignItems: "center",
          }}
          onPress={() => setActiveTab("third")}
        >
          <Text style={{ color: activeTab === "third" ? "#fff" : "#000" }}>
            {i18n.t("rejected")}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }}
      >
        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
}
