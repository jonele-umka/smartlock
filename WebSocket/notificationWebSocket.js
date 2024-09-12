import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Notifications from "expo-notifications";

const NotificationWebSocket = () => {
  const WS_URL = process.env.WS_URL;

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  const token = useSelector((state) => state.auth.token);

  const [ws, setWs] = useState(null);
  useEffect(() => {
    if (token) {
      const newWs = new WebSocket(
        `${WS_URL}/notification/get_new_notification?token=${token}`
      );

      newWs.onopen = () => {
        console.log("WebSocket открыт");
        newWs.send("something");
      };

      newWs.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (Array.isArray(data) && data.length > 0 && data[0].Notification) {
            const notification = data[0].Notification;
            const title = notification.Title;
            const text = notification.Text;

            Notifications.scheduleNotificationAsync({
              content: {
                title: title,
                body: text,
              },
              trigger: null,
            });
          } else {
            console.log("Некорректные данные:", data);
          }
        } catch (error) {
          console.error("Ошибка парсинга JSON:", error);
        }
      };

      newWs.onerror = (error) => {
        console.error("Произошла ошибка:", error);
      };

      newWs.onclose = () => {
        console.log("WebSocket закрыт");
      };

      setWs(newWs);
    }

    // Очистка при размонтировании компонента
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [token]); // Зависимость от токена

  return null;
};

export default NotificationWebSocket;
