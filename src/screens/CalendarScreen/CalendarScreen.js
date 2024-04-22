import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import CalendarsFrom from "../../components/Calendars/CalendarsFrom";
import CalendarsTo from "../../components/Calendars/CalendarsTo";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
const CalendarScreen = () => {
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;
  const navigation = useNavigation();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff", paddingVertical: 20 }}
    >
      <SafeAreaWrapper style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, textAlign: "center", fontWeight: 500 }}>
          Укажите дату въезда и выезда
        </Text>
        <View style={{ flexDirection: "column", rowGap: 10, marginBottom: 10 }}>
          <CalendarsFrom />
          <CalendarsTo />
        </View>

        <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Подтверждение брони")}
            style={{
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              marginTop: 30,
            }}
          >
            <LinearGradient
              colors={["#02AAB0", "#00CDAC"]}
              style={{
                paddingVertical: 15,
                textAlign: "center",
                borderRadius: 10,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                Выбрать
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default CalendarScreen;
