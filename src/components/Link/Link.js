import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomText from "../CustomText/CustomText";

const Link = ({ title, onPress, icon, disabled = false }) => {
  switch (icon) {
    case "pin":
      iconComponent = (
        <Image
          source={require("../../assets/pin.png")}
          style={{ width: 20, height: 20 }}
        />
      );
      break;
    case "currency-exchange":
      iconComponent = (
        <Image
          source={require("../../assets/currency.png")}
          style={{ width: 20, height: 20 }}
        />
      );

      break;
    default:
      iconComponent = <Icon name={icon} size={20} color={"#fff"} />;
      break;
  }
  return (
    <TouchableOpacity
      style={{ paddingVertical: 15 }}
      onPress={onPress}
      disabled={disabled}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomText
          style={{
            fontSize: 16,
          }}
        >
          {title}
        </CustomText>

        <Icon name={"chevron-right"} size={20} color={"#1C2863"} />
      </View>
    </TouchableOpacity>
  );
};
export default Link;
