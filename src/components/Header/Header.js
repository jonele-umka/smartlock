import { View, Image, TouchableOpacity, Text } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
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
      <CustomText style={{ fontSize: 35 }}>Smartlock</CustomText>
      <TouchableOpacity onPress={() => navigation.navigate("Уведомления")}>
        <AntDesign
          name="bells"
          style={[
            { fontSize: 25, color: "#4B5DFF", position: "relative" },
            // isDarkModeEnabled && { color: "#fff" },
          ]}
        />
        <Badge
          badgeStyle={{ backgroundColor: "#4B5DFF" }}
          status="primary"
          value={
            unreadNotifications.length > 100
              ? "99+"
              : unreadNotifications.length
          }
          containerStyle={{ position: "absolute", top: -5, left: 10 }}
        />
      </TouchableOpacity>

      {/* <Avatar bgColor="#241270" size="sm" borderRadius="$full">
              </Avatar> */}
    </View>
  );
};

export default Header;
