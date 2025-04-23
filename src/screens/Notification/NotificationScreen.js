import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import { fetchNotifications } from "../../Store/notificationsSlice/notificationsSlice";
import SafeAreaWrapper from "../../components/SafeAreaWrapper/SafeAreaWrapper";

import CustomText from "../../components/CustomText/CustomText";
import Notification from "../../components/Notification/Notification";
import i18n from "../../../i18n/i18n";
import Toast from "react-native-toast-message";

const NotificationScreen = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const API_URL = process.env.API_URL;

  const status = useSelector((state) => state.notifications.status);
  const token = useSelector((state) => state.auth.token);
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications(token));
  }, [dispatch, token]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchNotifications(token));
    }, [dispatch, token])
  );

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchNotifications(token));
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };
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
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Ошибка",
          text2: `Не удалось пометить уведомление с ID ${notificationId} как прочитанное.`,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
      }
    } catch (error) {
      console.error(i18n.t("errorServer"), error);
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
        <Text style={{ fontSize: 16 }}>{i18n.t("noNotifications")}</Text>
      </SafeAreaWrapper>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: "#fff", flex: 1 }}
      contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <CustomText
        style={{
          fontSize: 30,
          marginBottom: 20,
          fontWeight: 600,
        }}
      >
        {i18n.t("notifications")}
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
    </ScrollView>
  );
};

export default NotificationScreen;
