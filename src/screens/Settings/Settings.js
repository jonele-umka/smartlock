import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  Switch,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import * as Localization from "expo-localization";
import i18n from "../../components/i18n/i18n";
import ActionSheet from "react-native-actions-sheet";
import { Dialog } from "@rneui/themed";
import { API_URL } from "../../constants";
import * as ImagePicker from "expo-image-picker";
// link
const Link = ({ title, onClick, icon, disabled = false }) => {
  // const isDarkModeEnabled = useSelector(
  //   (state) => state.theme.isDarkModeEnabled
  // );

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
    <TouchableOpacity onPress={onClick} disabled={disabled}>
      <View
        style={[
          styles.linkContainer,
          // isDarkModeEnabled && {
          //   backgroundColor: "#191a1d",
          // },
        ]}
      >
        <View>
          <Text
            style={
              {
                color: "#000",
                fontSize: 16,
              }
              //   [
              //   isDarkModeEnabled ? { color: "#fff" } : { color: "#191a1d" },
              // ]
            }
          >
            {title}
          </Text>
        </View>
        <View>
          <Icon name={"chevron-right"} size={20} color={"#00CDAC"} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Settings = () => {
  const navigation = useNavigation();
  // language
  const actionSheetRef = useRef();
  // const token = useSelector((state) => state.signIn.token);
  // const userName = useSelector((state) => state.signIn.userName);
  // const refresh_token = useSelector((state) => state.signIn.refreshToken);
  const [language, setLanguage] = useState(Localization.locale);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const changeLanguage = async (newLanguage) => {
    Localization.locale = newLanguage;

    try {
      await AsyncStorage.setItem("language", newLanguage);
      setLanguage(newLanguage);
      actionSheetRef.current?.hide();
    } catch (error) {
      console.error("Ошибка при сохранении языка в AsyncStorage:", error);
    }
  };

  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <SafeAreaWrapper
      style={{ flex: 1, backgroundColor: "#fff" }}
      // style={
      //   [isDarkModeEnabled && { backgroundColor: "#383838" }]
      // }
    >
      <Dialog isVisible={modal}>
        <Dialog.Title title={i18n.t("areYouSureYouWantToLogOut")} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              toggleModal();
            }}
          >
            <Text style={{ fontSize: 18 }}>{i18n.t("no")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleModal();
              // handleLogout();
            }}
          >
            <Text style={{ fontSize: 18 }}>{i18n.t("yes")}</Text>
          </TouchableOpacity>
        </View>
      </Dialog>
      <View style={{ flex: 1, paddingVertical: 20 }}>
        {/* {Platform.OS === "android" &&
         hasFingerprint
         && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10,
              marginBottom: 10
            }}
          >
            <Text style={{ color: "#000", fontSize: 16 }}>
              {i18n.t("biometricLogin")}
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#00CDAC" }}
              thumbColor={isEnabled && "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        )} */}
        <TouchableOpacity
          style={{ marginBottom: 10 }}
          onPress={() => actionSheetRef.current?.show()}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ color: "#000", fontSize: 16 }}>
              {i18n.t("language")}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {language === "en" ? (
                <Text style={{ color: "grey" }}>English</Text>
              ) : (
                <Text style={{ color: "grey" }}>Русский</Text>
              )}

              <Icon name={"chevron-right"} size={20} color={"#00CDAC"} />
            </View>
          </View>
        </TouchableOpacity>

        <ActionSheet ref={actionSheetRef}>
          <View
            style={{
              flexDirection: "column",
              rowGap: 20,
              paddingHorizontal: 10,
              paddingVertical: 20,
              backgroundColor: "#fff",
            }}
          >
            <TouchableOpacity onPress={() => changeLanguage("en")}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../../assets/Country/united-kingdom.png")}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 10,
                  }}
                >
                  <Text style={{ color: "#000" }}>English</Text>
                  {language === "en" && (
                    <Ionicons
                      name="checkmark"
                      style={{ color: "#000", fontSize: 20 }}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLanguage("ru")}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../../assets/Country/russia.png")}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 10,
                  }}
                >
                  <Text style={{ color: "#000" }}>Русский</Text>
                  {language === "ru" && (
                    <Ionicons
                      name="checkmark"
                      style={{ color: "#000", fontSize: 20 }}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ActionSheet>
        <View
          style={[
            styles.linksContainer,
            // isDarkModeEnabled
            //   ? { backgroundColor: "#191a1d" }
            //   : { backgroundColor: "#fff" },
          ]}
        >
          <Link
            title={"Изменить Email"}
            onClick={() => {
              navigation.navigate("Изменить почту");
            }}
            icon={"lock"}
          />
          <Link
            title={i18n.t("changePassword")}
            onClick={() => {
              navigation.navigate("Смена пароля");
            }}
          />
          <Link
            title={"Публичность профиля"}
            // onClick={() => navigation.navigate("Сдать жилье")}
          />

          <Link
            title={i18n.t("notifications")}
            // onClick={() => navigation.navigate("Помощь")}
          />
          <Link
            title={"Удаление аккаунта"}
            // onClick={() => navigation.navigate("Сдать жилье")}
          />
        </View>
      </View>
    </SafeAreaWrapper>
  );
};
const styles = StyleSheet.create({
  linksContainer: {
    flex: 1,
  },

  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
});

export default Settings;
