import { SafeAreaView, Text, ScrollView, Platform } from "react-native";
import React from "react";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";

const ReservationScreen = () => {
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <ScrollView
      style={{ paddingVertical: 20, flex: 1, backgroundColor: "#fff" }}
    >
      <SafeAreaWrapper
        style={{
          flex: 1,
          paddingHorizontal: 10,
          paddingBottom: 40,
        }}
      >
        <Text
          style={{
            color: "#000",
            fontSize: 30,
            textAlign: "center",
            marginBottom: 25,
          }}
        >
          Ваши брони
        </Text>
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default ReservationScreen;
