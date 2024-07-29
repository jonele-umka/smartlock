import { View, Image, TouchableOpacity, Text } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import { Badge } from "@rneui/base";
import { useSelector } from "react-redux";
import CustomText from "../CustomText/CustomText";
const Header = () => {
  const navigation = useNavigation();
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const unreadNotifications = notifications.filter(
    (notification) => !notification.IsRead
  );

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
      }}
    >
      <CustomText style={{ fontSize: 35, fontWeight: 600 }}>
        Smartlock
      </CustomText>
      <TouchableOpacity
        style={{
          backgroundColor: "#001510",
          padding: 5,
          borderRadius: 50,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
        }}
        onPress={() => navigation.navigate("Уведомления")}
      >
        <Ionicons
          name="notifications-outline"
          style={[
            { fontSize: 25, color: "#fff", position: "relative" },
            // isDarkModeEnabled && { color: "#fff" },
          ]}
        />
        <Badge
          status="primary"
          value={
            unreadNotifications.length > 100
              ? "99+"
              : unreadNotifications.length
          }
          containerStyle={{ position: "absolute", top: 0, left: 15 }}
        />
      </TouchableOpacity>

      {/* <Avatar bgColor="#241270" size="sm" borderRadius="$full">
              </Avatar> */}
    </View>
  );
};

export default Header;
