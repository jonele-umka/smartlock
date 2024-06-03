import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
const PinLockScreen = () => {
  const navigation = useNavigation();
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;
  const handleUnlock = async () => {
    try {
      // Отправка POST-запроса с использованием fetch
      const response = await fetch(
        "https://server.microret.com/lock/unlock/1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Если запрос выполнен успешно
        console.log("Запрос успешно выполнен");
      } else {
        // Если возникла ошибка при выполнении запроса
        console.error("Ошибка при выполнении запроса:", response.status);
      }
    } catch (error) {
      // Обработка ошибки
      console.error("Ошибка при отправке запроса:", error);
    }
  };
  const handleLock = async () => {
    try {
      // Отправка POST-запроса с использованием fetch
      const response = await fetch(
        "https://server.microret.com/lock/lock/1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Если запрос выполнен успешно
        console.log("Запрос успешно выполнен закрыт");
      } else {
        // Если возникла ошибка при выполнении запроса
        console.error("Ошибка при выполнении запроса:", response.status);
      }
    } catch (error) {
      // Обработка ошибки
      console.error("Ошибка при отправке запроса:", error);
    }
  };
  return (
    <SafeAreaWrapper
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Редактировать пин")}
          style={{
            borderRadius: 10,
            backgroundColor: "#f0f0f0",
            paddingVertical: 15,
            paddingHorizontal: 10,
            marginBottom: 50,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              columnGap: 5,
            }}
          >
            <Text style={{ fontSize: 16 }}>Редактировать пин</Text>
            <Icon
              name={"chevron-right"}
              size={18}
              color={"#000"}
              style={{ paddingTop: 3 }}
            />
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={handleUnlock}
            style={{
              flexDirection: "column",
              alignItems: "center",
              rowGap: 20,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              Открыть
            </Text>
            <Image
              style={{ width: 180, height: 180 }}
              source={require("../../assets/unlock.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLock}
            style={{
              flexDirection: "column",
              alignItems: "center",
              rowGap: 20,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              Закрыть
            </Text>
            <Image
              style={{ width: 180, height: 180 }}
              source={require("../../assets/lock.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default PinLockScreen;
