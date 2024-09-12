import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { formatDate } from "../../components/FormatDate/FormatDate";
import { useNavigation } from "@react-navigation/core";
import CustomText from "../CustomText/CustomText";
const Notification = ({ notification, markNotificationAsRead }) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          markNotificationAsRead(notification.ID);

          if (notification.Notification.Title.startsWith("Новая заявка")) {
            navigation.navigate("Заявки", {
              text: notification.Notification.Text,
            });
          } else {
            navigation.navigate("Детали уведомления", {
              text: notification.Notification.Text,
            });
          }
        }}
        style={{
          padding: 16,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#f0f0f0",
        }}
      >
        {!notification.IsRead && (
          <View
            style={{
              backgroundColor: "green",
              width: 10,
              height: 10,
              borderRadius: 10,
            }}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 10,
          }}
        >
          <Image
            source={require("../../assets/notification.png")}
            style={{ width: 40, height: 40 }}
          />
          <View style={{ flex: 1 }}>
            <CustomText
              style={{
                fontSize: 20,
                fontWeight: 500,
                marginBottom: 5,
              }}
            >
              {notification.Notification.Title}
            </CustomText>
            <CustomText style={{ fontSize: 16 }}>
              {notification.Notification.Text}
            </CustomText>
            <CustomText
              style={{
                alignSelf: "flex-end",
                marginTop: 10,
                fontSize: 14,
              }}
            >
              {formatDate(notification.CreatedAt)}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Notification;
