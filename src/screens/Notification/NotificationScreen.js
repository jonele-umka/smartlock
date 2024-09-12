import React, { useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import { fetchNotifications } from "../../Store/notificationsSlice/notificationsSlice";
import SafeAreaWrapper from "../../components/SafeAreaWrapper/SafeAreaWrapper";

import CustomText from "../../components/CustomText/CustomText";
import Notification from "../../components/Notification/Notification";

const NotificationScreen = () => {
  const dispatch = useDispatch();

  const API_URL = process.env.API_URL;

  const status = useSelector((state) => state.notifications.status);
  const token = useSelector((state) => state.auth.token);
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  // Загружаем уведомления при монтировании компонента
  useEffect(() => {
    dispatch(fetchNotifications(token));
  }, [dispatch, token]);

  // Обновляем уведомления при возвращении на экран
  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchNotifications(token));
    }, [dispatch, token])
  );

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

  if (status === "loading") {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#4B5DFF" />
      </View>
    );
  }

  if (status === "failed") {
    return (
      <SafeAreaWrapper
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ fontSize: 16 }}>Нет уведомлений</Text>
      </SafeAreaWrapper>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
      <SafeAreaWrapper style={{ flex: 1 }}>
        <CustomText
          style={{
            fontSize: 30,
            marginBottom: 20,
            fontWeight: 600,
          }}
        >
          Уведомления
        </CustomText>
        <View style={{ flexDirection: "column", rowGap: 20 }}>
          {notifications &&
            notifications.length > 0 &&
            notifications
              .slice()
              .reverse()
              .map((notification) => (
                <Notification
                  key={notification.ID}
                  notification={notification}
                  markNotificationAsRead={markNotificationAsRead}
                />
              ))}
        </View>
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default NotificationScreen;
