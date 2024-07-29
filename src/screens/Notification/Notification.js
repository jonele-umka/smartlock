import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";

import { fetchNotifications } from "../../Store/notificationsSlice/notificationsSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const API_URL = process.env.API_URL;

  const status = useSelector((state) => state.notifications.status);
  const error = useSelector((state) => state.notifications.error);
  const token = useSelector((state) => state.auth.token);
  const notification = useSelector(
    (state) => state.notifications.notifications
  );
  // запрос уведомлений
  useEffect(() => {
    dispatch(fetchNotifications(token));
  }, [dispatch, token]);

  const markNotificationAsRead = async (notificationId) => {
    try {
      const response = await fetch(
        `${API_URL}/notification/read/${notificationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        dispatch(fetchNotifications(token));
      } else {
        console.error(
          `Не удалось пометить уведомление с ID ${notificationId} как прочитанное.`
        );
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса PATCH:", error);
    }
  };

  // если загрузка или неуспешно
  if (status === "loading") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (status === "failed") {
    return (
      <SafeAreaView style={{ flex: 1, paddingVertical: 10 }}>
        <Text style={{ fontSize: 16, color: "red" }}>{error}</Text>
      </SafeAreaView>
    );
  }
  // формат даты
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  };
  return (
    <ScrollView style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 30,
            marginBottom: 20,
            color: "#000",
            fontWeight: 600,
          }}
        >
          Уведомления
        </Text>
        <View style={{ flexDirection: "column", rowGap: 20 }}>
          {notification.map((notification) => (
            <View key={notification.ID}>
              <TouchableOpacity
                onPress={() => {
                  markNotificationAsRead(notification.ID);
                  navigation.navigate("Просмотр уведомлений", {
                    text: notification.Notification.Text,
                  });
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 10,
                  padding: 16,
                  borderRadius: 10,
                  backgroundColor: "#fff",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                }}
              >
                <Image
                  source={require("../../assets/notification.png")}
                  style={{ width: 40, height: 40 }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontSize: 20, fontWeight: 500, marginBottom: 5 }}
                  >
                    {notification.Notification.Title}
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    {notification.Notification.Text}
                  </Text>
                  <Text
                    style={{
                      alignSelf: "flex-end",
                      color: "#000",
                      marginTop: 10,
                      fontSize: 14,
                    }}
                  >
                    {formatDate(notification.CreatedAt)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
  //   if (loading) {
  //     return (
  //       <LinearGradient
  //         style={[
  //           { flex: 1 },
  //           // isDarkModeEnabled && { backgroundColor: "#191a1d" },
  //         ]}
  //         start={{ x: 2.4, y: 1.1 }}
  //         end={{ x: 0, y: 0 }}
  //         colors={["#241270", "#140A4F", "#000"]}
  //       >
  //         <View
  //           style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  //         >
  //           <ActivityIndicator
  //             size="large"
  //             style={{ marginTop: 30 }}
  //             color={"#fff"}
  //           />
  //         </View>
  //       </LinearGradient>
  //     );
  //   } else {

  //   }
};

export default Notification;
