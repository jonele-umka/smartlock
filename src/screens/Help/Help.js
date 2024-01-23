import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Linking,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import i18n from "../../components/i18n/i18n";

const Help = () => {
  const handleMailPress = () => {
    const url = "info@microret.com";
    const gmail = `mailto:${url}`;
    Linking.openURL(gmail);
  };

  const handleInstagramPress = () => {
    const url =
      "https://www.instagram.com/microret_kg?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
    Linking.openURL(url);
  };

  const handleTelegramPress = () => {
    const telegramUsername = "kamaski";
    const telegramURL = `https://t.me/${telegramUsername}`;
    Linking.openURL(telegramURL);
  };

  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;
  return (
    <LinearGradient
      style={[
        { flex: 1 },
        // isDarkModeEnabled && { backgroundColor: "#191a1d" },
      ]}
      start={{ x: 2.4, y: 1.1 }}
      end={{ x: 0, y: 0 }}
      colors={["#241270", "#140A4F", "#000"]}
    >
      <ScrollView style={{ paddingVertical: 20 }}>
        <SafeAreaWrapper
          style={[
            { flex: 1, paddingHorizontal: 10 },
            // isDarkModeEnabled && { backgroundColor: "#191a1d" },
          ]}
        >
          <View style={{ marginBottom: 30 }}>
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                fontWeight: 500,
                marginBottom: 15,
              }}
            >
              {i18n.t("technicalSupportAndContacts")}
            </Text>
            <Text style={{ fontSize: 14, color: "#fff" }}>
              {i18n.t("ourTeamIsAlways")}
            </Text>
          </View>
          <View style={{ marginBottom: 30 }}>
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
                marginBottom: 10,
                fontWeight: 500,
              }}
            >
              {i18n.t("emailSupport")}
            </Text>
            <View
              style={{
                flexDirection: "row",
                columnGap: 10,
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: 14, color: "#fff" }}>- Email:</Text>
              <TouchableOpacity onPress={handleMailPress}>
                <Text
                  style={{ color: "#5293c4", textDecorationLine: "underline" }}
                >
                  info@microret.com
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 14, color: "#fff" }}>
              - {i18n.t("responseTime")}
            </Text>
          </View>
          <View style={{ marginBottom: 30 }}>
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
                marginBottom: 10,
                fontWeight: 500,
              }}
            >
              {i18n.t("phoneSupport")}
            </Text>
            <Text style={{ fontSize: 14, color: "#fff", marginBottom: 5 }}>
              - {i18n.t("phoneNumber")}: +996 708 342 008
            </Text>

            <Text style={{ fontSize: 14, color: "#fff" }}>
              - {i18n.t("operatingHours")}
            </Text>
          </View>

          <View style={{ marginBottom: 30 }}>
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
                marginBottom: 10,
                fontWeight: 500,
              }}
            >
              {i18n.t("socialMedia")}
            </Text>

            <View
              style={{
                flexDirection: "row",
                columnGap: 10,
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: 14, color: "#fff" }}>- Instagram:</Text>
              <TouchableOpacity onPress={handleInstagramPress}>
                <Text
                  style={{ color: "#5293c4", textDecorationLine: "underline" }}
                >
                  @microret_kg
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                columnGap: 10,
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: 14, color: "#fff" }}>- Telegram:</Text>
              <TouchableOpacity onPress={handleTelegramPress}>
                <Text
                  style={{ color: "#5293c4", textDecorationLine: "underline" }}
                >
                  @kamaski
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginBottom: 30 }}>
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
                marginBottom: 10,
                fontWeight: 500,
              }}
            >
              {i18n.t("officeAddress")}
            </Text>

            <Text style={{ fontSize: 14, color: "#fff", marginBottom: 5 }}>
              - {i18n.t("republicOfKyrgyzstan")}
            </Text>
          </View>
        </SafeAreaWrapper>
      </ScrollView>
    </LinearGradient>
  );
};

export default Help;
