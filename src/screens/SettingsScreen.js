import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
// import { toggleDarkMode } from "../Store/DarkTheme/themeAction";
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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import * as Localization from "expo-localization";
import i18n from "../components/i18n/i18n";
import ActionSheet from "react-native-actions-sheet";
import { Dialog } from "@rneui/themed";
import { API_URL } from "../constants";

// link
const Link = ({ title, onClick, icon, disabled = false }) => {
  // const isDarkModeEnabled = useSelector(
  //   (state) => state.theme.isDarkModeEnabled
  // );
  let iconComponent;

  switch (icon) {
    case "pin":
      iconComponent = (
        <Image
          source={require("../assets/pin.png")}
          style={{ width: 20, height: 20 }}
        />
      );
      break;
    case "currency-exchange":
      iconComponent = (
        <Image
          source={require("../assets/currency.png")}
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
        <View
          style={{ flexDirection: "row", alignItems: "center", columnGap: 15 }}
        >
          <View
            style={[
              {
                backgroundColor: "#5d00e6",
                borderRadius: 50,
                padding: 10,
              },
              // isDarkModeEnabled && { backgroundColor: "#fff" },
            ]}
          >
            {iconComponent}
          </View>
          <View>
            <Text
              style={
                {
                  color: "#fff",
                }
                //   [
                //   isDarkModeEnabled ? { color: "#fff" } : { color: "#191a1d" },
                // ]
              }
            >
              {title}
            </Text>
          </View>
        </View>
        <View>
          <Icon name={"chevron-right"} size={20} color={"#5d00e6"} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SettingsScreen = () => {
  const navigation = useNavigation();
  // language
  const actionSheetRef = useRef();
  const token = useSelector((state) => state.signIn.token);
  const userName = useSelector((state) => state.signIn.userName);
  const refresh_token = useSelector((state) => state.signIn.refreshToken);
  const [language, setLanguage] = useState(Localization.locale);
  const [modal, setModal] = useState(false);
  const [hasFingerprint, setHasFingerprint] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const checkBiometricAvailability = async () => {
      const supported = await LocalAuthentication.hasHardwareAsync();
      if (supported) {
        setHasFingerprint(true);
      }
    };
    checkBiometricAvailability();
  }, []);

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

  // switch biometric
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = async () => {
    // Если включаем, то запрашиваем отпечаток
    if (!isEnabled) {
      try {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage:
            "Подтвердите отпечатком пальца для включения входа по биометрии",
        });

        if (result.success) {
          // Если отпечаток подтвержден, меняем состояние и сохраняем в AsyncStorage
          const newIsEnabled = !isEnabled;
          setIsEnabled(newIsEnabled);

          AsyncStorage.setItem(
            "biometricEnabled",
            newIsEnabled ? "true" : "false"
          )
            .then(() => {
              console.log("Информация о входе по биометрии сохранена");
            })
            .catch((error) => {
              console.error(
                "Ошибка при сохранении предпочтений по биометрии:",
                error
              );
            });
        } else {
          console.log("Пользователь отказался от входа по биометрии");
        }
      } catch (error) {
        console.error("Ошибка при запросе отпечатка пальца:", error);
      }
    } else {
      // Если выключаем, меняем состояние и сохраняем в AsyncStorage
      const newIsEnabled = !isEnabled;
      setIsEnabled(newIsEnabled);

      AsyncStorage.setItem("biometricEnabled", newIsEnabled ? "true" : "false")
        .then(() => {
          console.log("Информация о входе по биометрии сохранена");
        })
        .catch((error) => {
          console.error(
            "Ошибка при сохранении предпочтений по биометрии:",
            error
          );
        });
    }
  };
  useEffect(() => {
    const checkBiometricPreference = async () => {
      try {
        const biometricEnabled = await AsyncStorage.getItem("biometricEnabled");

        if (biometricEnabled === "true") {
          setIsEnabled(true);
        } else {
          setIsEnabled(false);
        }
      } catch (error) {
        console.error("Ошибка при чтении предпочтений по биометрии:", error);
      }
    };

    checkBiometricPreference();
  }, []);

  // redux
  // const isDarkModeEnabled = useSelector(
  //   (state) => state.theme.isDarkModeEnabled
  // );

  // button
  // const translateXValue = useRef(
  //   new Animated.Value(isDarkModeEnabled ? 40 : 0)
  // ).current;

  // const handleToggle = () => {
  //   dispatch(toggleDarkMode(!isDarkModeEnabled));

  //   Animated.timing(translateXValue, {
  //     toValue: isDarkModeEnabled ? 0 : 20,
  //     duration: 200,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // const animatedStyle = {
  //   transform: [{ translateX: translateXValue }],
  // };
  // useEffect(() => {
  //   const currencyData = {
  //     selectedWallet: (
  //       <View
  //         style={{
  //           flexDirection: "row",
  //           justifyContent: "space-between",
  //           alignItems: "center",
  //           width: "100%",
  //         }}
  //       >
  //         <ImageBackground
  //           imageStyle={{ borderRadius: 5 }}
  //           source={card}
  //           style={{
  //             width: 50,
  //             height: 30,
  //             display: "flex",
  //             alignItems: "flex-end",
  //             justifyContent: "center",
  //             padding: 3,
  //           }}
  //         >
  //           <Text style={{ color: "#fff", fontSize: 12 }}>
  //             ... {item.WalletSubAccount.AccountNumber.slice(-4)}
  //           </Text>
  //         </ImageBackground>

  //         <View>
  //           <Text
  //             style={{
  //               color: "#fff",
  //             }}
  //           >{`${item.WalletSubAccount.Balance} ${
  //             currencySymbols[item.WalletSubAccount.Currency.CurrencyCode]
  //           }`}</Text>
  //         </View>
  //       </View>
  //     ),
  //     value: item.WalletSubAccount.AccountNumber,
  //   };

  //   setWallet(currencyData);
  // }, [token]);
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
      <SafeAreaWrapper
        style={{ flex: 1, paddingVertical: 20 }}
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
              }}
            >
              <Text style={{ fontSize: 18 }}>{i18n.t("yes")}</Text>
            </TouchableOpacity>
          </View>
        </Dialog>
        <View style={{ flex: 1 }}>
          <View
            style={[
              styles.profile,
              // isDarkModeEnabled && { backgroundColor: "#383838" },
            ]}
          >
            <Image
              source={{
                uri: "https://sm.ign.com/ign_ap/cover/a/avatar-gen/avatar-generations_hugw.jpg",
              }}
              style={styles.avatar}
            />

            <Text
              style={[
                styles.name,
                // isDarkModeEnabled && { color: "#fff" }
              ]}
            >
              {userName}
            </Text>
          </View>

          {/* <View
          style={[
            styles.toggleButtonContainer,
            isDarkModeEnabled && { backgroundColor: "#191a1d" },
          ]}
        >
          <View style={styles.toggleButtonContent}>
            <View
              style={[
                styles.toggleIconContainer,
                isDarkModeEnabled && { backgroundColor: "#fff" },
              ]}
            >
              <Dark name="ios-moon" size={20} color={"#5d00e6"} />
            </View>
            <Text
              style={[
                styles.toggleButtonText,
                isDarkModeEnabled && { color: "#fff" },
              ]}
            >
              {isDarkModeEnabled ? "Disable Dark Mode" : "Enable Dark Mode"}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.toggle, isDarkModeEnabled && styles.toggleOn]}
            activeOpacity={1}
            onPress={handleToggle}
          >
            <Animated.View style={[styles.toggleHandle, animatedStyle]} />
          </TouchableOpacity>
        </View> */}
          {Platform.OS === "android" && hasFingerprint && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 10,
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  columnGap: 15,
                }}
              >
                <View
                  style={[
                    {
                      backgroundColor: "#5d00e6",
                      borderRadius: 50,
                      padding: 10,
                    },
                    // isDarkModeEnabled && { backgroundColor: "#fff" },
                  ]}
                >
                  <Ionicons
                    name="finger-print-outline"
                    style={{ color: "#fff", fontSize: 20 }}
                  />
                </View>

                <Text style={{ color: "#fff" }}>
                  {i18n.t("biometricLogin")}
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: "#5d00e6" }}
                thumbColor={isEnabled && "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          )}
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  columnGap: 15,
                }}
              >
                <View
                  style={[
                    {
                      backgroundColor: "#5d00e6",
                      borderRadius: 50,
                      padding: 10,
                    },
                    // isDarkModeEnabled && { backgroundColor: "#fff" },
                  ]}
                >
                  <Ionicons
                    name="language"
                    style={{ color: "#fff", fontSize: 20 }}
                  />
                </View>

                <Text style={{ color: "#fff" }}>{i18n.t("language")}</Text>
              </View>
              <Icon name={"chevron-right"} size={20} color={"#5d00e6"} />
            </View>
          </TouchableOpacity>

          <ActionSheet ref={actionSheetRef}>
            <View
              style={{
                flexDirection: "column",
                rowGap: 20,
                paddingHorizontal: 10,
                paddingVertical: 20,
                backgroundColor: "#140A4F",
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
                    source={require("../assets/Country/united-kingdom.png")}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 10,
                    }}
                  >
                    <Text style={{ color: "#fff" }}>English</Text>
                    {language === "en" && (
                      <Ionicons
                        name="checkmark"
                        style={{ color: "#fff", fontSize: 20 }}
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
                    source={require("../assets/Country/russia.png")}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 10,
                    }}
                  >
                    <Text style={{ color: "#fff" }}>Русский</Text>
                    {language === "ru" && (
                      <Ionicons
                        name="checkmark"
                        style={{ color: "#fff", fontSize: 20 }}
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
              title={i18n.t("changePINCode")}
              onClick={() => {
                navigation.navigate("Сменить пин-код");
              }}
              icon={"pin"}
            />
            <Link
              title={i18n.t("exchangeRates")}
              onClick={() => navigation.navigate("Курс валют")}
              icon={"currency-exchange"}
            />
            <Link
              title={i18n.t("changePassword")}
              onClick={() => {
                navigation.navigate("Смена пароля");
              }}
              icon={"lock"}
            />

            <Link
              title={i18n.t("help")}
              onClick={() => navigation.navigate("Помощь")}
              icon={"email-fast-outline"}
            />
            <Link
              title={i18n.t("logOut")}
              textColor={"#cc4949"}
              onClick={toggleModal}
              icon={"logout"}
            />
          </View>
        </View>
      </SafeAreaWrapper>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  profile: {
    height: Dimensions.get("window").height * 0.3,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
    marginBottom: 30,
  },
  avatar: {
    borderRadius: 80,
    width: 150,
    height: 150,
  },
  name: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  linksContainer: {
    flex: 1,
  },
  // toggleButtonContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   paddingVertical: 10,
  // },
  // toggleButtonContent: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   columnGap: 15,
  // },
  // toggleIconContainer: {
  //   backgroundColor: "#191a1d",
  //   borderRadius: 50,
  //   padding: 10,
  // },
  // toggleButtonText: {
  //   fontSize: 16,
  // },
  // toggle: {
  //   width: 50,
  //   height: 30,
  //   backgroundColor: "#e1e1e1",
  //   borderRadius: 50,
  //   position: "relative",
  // },
  // toggleOn: {
  //   backgroundColor: "#5d00e6",
  // },
  // toggleHandle: {
  //   width: 24,
  //   height: 24,
  //   backgroundColor: "#fff",
  //   borderRadius: 46,
  //   position: "absolute",
  //   top: 3,
  //   left: 3,
  //   elevation: 2,
  // },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default SettingsScreen;
