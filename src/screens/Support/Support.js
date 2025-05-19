import { TouchableOpacity, View, Linking } from "react-native";
import React from "react";
import i18n from "../../../i18n/i18n";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomText from "../../components/CustomText/CustomText";
import SafeAreaWrapper from "../../components/SafeAreaWrapper/SafeAreaWrapper";
const Link = ({ title, onPress, icon, disabled = false }) => (
  <TouchableOpacity
    style={{
      paddingVertical: 15,
      paddingHorizontal: 10,
      backgroundColor: "#f8f8f8",
      borderRadius: 10,
    }}
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
      <View
        style={{ flexDirection: "row", alignItems: "center", columnGap: 15 }}
      >
        <Icon name={icon} />
        <CustomText style={{ fontWeight: "500" }}>{title}</CustomText>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color="#1C2863" />
    </View>
  </TouchableOpacity>
);
const Icon = ({ name }) =>
  name === "web" ? (
    <MaterialCommunityIcons name="web" size={20} color="#4B5DFF" />
  ) : (
    <Ionicons name={name} size={20} color="#4B5DFF" />
  );
const Support = () => {
  const links = [
    {
      title: i18n.t("phoneNumber"),
      onPress: () => Linking.openURL("tel:+996704314314"),
      icon: "call-outline",
    },
    {
      title: "WhatsApp",
      onPress: () => Linking.openURL("https://wa.me/996704314314"),
      icon: "logo-whatsapp",
    },
    {
      title: i18n.t("email"),
      onPress: () => Linking.openURL("mailto:info@togolock.kg"),
      icon: "mail-outline",
    },
    {
      title: i18n.t("web"),
      onPress: () => Linking.openURL("https://togolock.net/"),
      icon: "web",
    },
  ].filter(Boolean);

  return (
    <SafeAreaWrapper>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ flexDirection: "column", gap: 20 }}>
          {links.map((link, index) => (
            <Link
              key={index}
              title={link.title}
              onPress={link.onPress}
              icon={link.icon}
              isLast={index === links.length - 2}
            />
          ))}
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default Support;
