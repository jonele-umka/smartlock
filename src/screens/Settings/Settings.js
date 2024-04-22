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
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );
  let iconComponent;

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
  // const [hasFingerprint, setHasFingerprint] = useState(false);
  // const [image, setImage] = useState(null);
  // const createImageFromBlob = async (blob) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       resolve(reader.result);
  //     };
  //     reader.onerror = reject;
  //     reader.readAsDataURL(blob);
  //   });
  // };
  // useEffect(() => {
  //   const fetchAvatar = async () => {
  //     try {
  //       const response = await fetch(`${API_URL}/individuals/avatar`, {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (response.ok) {
  //         const blob = await response.blob();
  //         const imageUrl = await createImageFromBlob(blob);
  //         setImage(imageUrl);
  //       } else {
  //         console.error(
  //           "Failed to fetch avatar. Server returned:",
  //           response.status,
  //           response.statusText
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error fetching avatar", error);
  //     }
  //   };

  //   fetchAvatar();
  // }, []);

  // const pickImage = async () => {
  //   try {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.All,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });

  //     if (!result.canceled) {
  //       setImage(result.assets[0].uri);
  //       // uploadImage(result.assets[0].uri);
  //     }
  //   } catch (error) {
  //     console.error("Ошибка при выборе изображения", error);
  //   }
  // };

  // const uploadImage = async (uri) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("avatar", {
  //       uri,
  //       name: "image.jpg",
  //       type: "image/jpg",
  //     });

  //     const response = await fetch(`${API_URL}/individuals/upload`, {
  //       method: "POST",
  //       body: formData,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.ok) {
  //       console.log("Image uploaded successfully");
  //     } else {
  //       console.error(
  //         "Failed to upload image. Server returned:",
  //         response.status,
  //         response.statusText
  //       );

  //       // Добавьте вывод тела ответа, если нужно
  //       const responseBody = await response.text();
  //       console.error("Response body:", responseBody);
  //     }
  //   } catch (error) {
  //     console.error("Error uploading image", error);
  //   }
  // };

  const toggleModal = () => {
    setModal(!modal);
  };

  // useEffect(() => {
  //   const checkBiometricAvailability = async () => {
  //     const supported = await LocalAuthentication.hasHardwareAsync();
  //     if (supported) {
  //       setHasFingerprint(true);
  //     }
  //   };
  //   checkBiometricAvailability();
  // }, []);
  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch(`${API_URL}/logout`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ refresh_token }),
  //     });

  //     if (response.ok) {
  //       const responseBody = await response.text();
  //       console.log("Response Body:", responseBody);

  //       navigation.navigate("Войти");
  //       await AsyncStorage.removeItem("login");
  //       await AsyncStorage.removeItem("password");
  //       await AsyncStorage.removeItem("pinCode");
  //       await AsyncStorage.removeItem("biometricEnabled");
  //     } else {
  //       console.log("Ошибка при выходе:", response.status, response.statusText);

  //       const errorBody = await response.text();
  //       console.log("Error Body:", errorBody);
  //     }
  //   } catch (error) {
  //     console.log("Error during logout:", error);
  //   }
  // };

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
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );

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
            title={i18n.t("changePassword")}
            // onClick={() => {
            //   navigation.navigate("Смена пароля");
            // }}
            icon={"lock"}
          />
          <Link
            title={"Публичность профиля"}
            // onClick={() => navigation.navigate("Сдать жилье")}
            icon={"home"}
          />

          <Link
            title={i18n.t("notifications")}
            // onClick={() => navigation.navigate("Помощь")}
            icon={"email-fast-outline"}
          />
          <Link
            title={"Удаление аккаунта"}
            // onClick={() => navigation.navigate("Сдать жилье")}
            icon={"home"}
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
