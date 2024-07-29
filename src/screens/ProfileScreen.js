import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  ScrollView,
  RefreshControl,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import * as Localization from "expo-localization";
import i18n from "../components/i18n/i18n";
import { Dialog } from "@rneui/themed";

import * as ImagePicker from "expo-image-picker";
import { logoutUser } from "../Store/authSlice/authSlice";
import PickImage from "../components/PickImage/PickImage";
import CustomText from "../components/CustomText/CustomText";
import { LinearGradient } from "expo-linear-gradient";
// link
const Link = ({ title, onPress, icon, disabled = false, isLast = false }) => {
  // const isDarkModeEnabled = useSelector(
  //   (state) => state.theme.isDarkModeEnabled
  // );

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 15,
          }}
        >
          <View
            style={[
              {
                backgroundColor: "#00CDAC",
                borderRadius: 10,
                padding: 8,
              },
              // isDarkModeEnabled && { backgroundColor: "#fff" },
            ]}
          >
            {icon === "logout" ? (
              <MaterialCommunityIcons
                name={"logout"}
                size={20}
                color={"#fff"}
              />
            ) : (
              <Ionicons name={icon} size={20} color={"#fff"} />
            )}
          </View>
          <View>
            <CustomText
              style={
                {
                  color: "#000",
                  fontWeight: 500,
                }
                //   [
                //   isDarkModeEnabled ? { color: "#fff" } : { color: "#191a1d" },
                // ]
              }
            >
              {title}
            </CustomText>
          </View>
        </View>
        <View>
          <MaterialCommunityIcons
            name={"chevron-right"}
            size={20}
            color={"#00CDAC"}
          />
        </View>
      </View>
      {!isLast && (
        <View
          style={{
            height: 1,
            backgroundColor: "#e0e0e0", // Adjust color as needed
            marginTop: 15,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const API_URL = process.env.API_URL;
  const [avatarImage, setAvatarImage] = useState(null);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const owner = useSelector((state) => state.auth.owner);
  const avatar = userProfile.Avatar;
  const loadProfileData = () => {
    const timestamp = new Date().getTime();
    if (avatar) {
      setAvatarImage(`${API_URL}/${avatar}?timestamp=${timestamp}`);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfileData();
    }, [avatar])
  );
  // language
  // const actionSheetRef = useRef();
  // const token = useSelector((state) => state.signIn.token);
  // const userName = useSelector((state) => state.signIn.userName);
  // const refresh_token = useSelector((state) => state.signIn.refreshToken);
  // const [language, setLanguage] = useState(Localization.locale);
  // const [hasFingerprint, setHasFingerprint] = useState(false);
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleLogout = async () => {
    try {
      const response = await dispatch(logoutUser());

      if (response.type === "auth/logout/fulfilled") {
        navigation.navigate("Войти");
      } else {
        console.log("Не удалось выйти");
      }
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };
  // const changeLanguage = async (newLanguage) => {
  //   Localization.locale = newLanguage;

  //   try {
  //     await AsyncStorage.setItem("language", newLanguage);
  //     setLanguage(newLanguage);
  //     actionSheetRef.current?.hide();
  //   } catch (error) {
  //     console.error("Ошибка при сохранении языка в AsyncStorage:", error);
  //   }
  // };

  // switch biometric
  // const [isEnabled, setIsEnabled] = useState(false);

  // const toggleSwitch = async () => {
  //   // Если включаем, то запрашиваем отпечаток
  //   if (!isEnabled) {
  //     try {
  //       const result = await LocalAuthentication.authenticateAsync({
  //         promptMessage:
  //           "Подтвердите отпечатком пальца для включения входа по биометрии",
  //       });

  //       if (result.success) {
  //         // Если отпечаток подтвержден, меняем состояние и сохраняем в AsyncStorage
  //         const newIsEnabled = !isEnabled;
  //         setIsEnabled(newIsEnabled);

  //         AsyncStorage.setItem(
  //           "biometricEnabled",
  //           newIsEnabled ? "true" : "false"
  //         )
  //           .then(() => {
  //             console.log("Информация о входе по биометрии сохранена");
  //           })
  //           .catch((error) => {
  //             console.error(
  //               "Ошибка при сохранении предпочтений по биометрии:",
  //               error
  //             );
  //           });
  //       } else {
  //         console.log("Пользователь отказался от входа по биометрии");
  //       }
  //     } catch (error) {
  //       console.error("Ошибка при запросе отпечатка пальца:", error);
  //     }
  //   } else {
  //     // Если выключаем, меняем состояние и сохраняем в AsyncStorage
  //     const newIsEnabled = !isEnabled;
  //     setIsEnabled(newIsEnabled);

  //     AsyncStorage.setItem("biometricEnabled", newIsEnabled ? "true" : "false")
  //       .then(() => {
  //         console.log("Информация о входе по биометрии сохранена");
  //       })
  //       .catch((error) => {
  //         console.error(
  //           "Ошибка при сохранении предпочтений по биометрии:",
  //           error
  //         );
  //       });
  //   }
  // };

  // useEffect(() => {
  //   const checkBiometricPreference = async () => {
  //     try {
  //       const biometricEnabled = await AsyncStorage.getItem("biometricEnabled");

  //       if (biometricEnabled === "true") {
  //         setIsEnabled(true);
  //       } else {
  //         setIsEnabled(false);
  //       }
  //     } catch (error) {
  //       console.error("Ошибка при чтении предпочтений по биометрии:", error);
  //     }
  //   };

  //   checkBiometricPreference();
  // }, []);

  // redux
  // const isDarkModeEnabled = useSelector(
  //   (state) => state.theme.isDarkModeEnabled
  // );
  const links = [
    {
      title: "Настройки",
      onPress: () => navigation.navigate("Настройки"),
      icon: "settings",
    },
    {
      title: "Платежи и выплаты",
      onPress: () => navigation.navigate("Платежи и выплаты"),
      icon: "cash",
    },
    {
      title: i18n.t("help"),
      onPress: () => navigation.navigate("Помощь"),
      icon: "help",
    },
    { title: i18n.t("logOut"), onClick: toggleModal, icon: "logout" },
  ];
  if (owner === "owner") {
    links.unshift({
      title: "Владелец",
      onPress: () => navigation.navigate("Владелец"),
      icon: "person",
    });
  }
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaWrapper>
        <LinearGradient
          colors={["#00bf8f", "#001510"]}
          style={{ marginBottom: 20 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={{ paddingVertical: 20, flex: 1, paddingHorizontal: 10 }}>
            {/* <CustomText
              style={{
                fontSize: 30,
                marginBottom: 20,
                color: "#fff",
                fontWeight: 500,
                paddingHorizontal: 10,
              }}
            >
              Ещё
            </CustomText> */}

            <TouchableOpacity
              style={{
                paddingVertical: 10,
                borderRadius: 20,
              }}
              onPress={() => {
                navigation.navigate("Редактировать профиль");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 20,
                  }}
                >
                  {userProfile.Avatar ? (
                    <Image
                      source={{
                        uri:
                          avatarImage ||
                          "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
                      }}
                      style={{
                        borderRadius: 50,
                        width: 70,
                        height: 70,
                      }}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
                      }}
                      style={{
                        borderRadius: 50,
                        width: 70,
                        height: 70,
                      }}
                    />
                  )}
                  <View>
                    {userProfile.Nickname ? (
                      <CustomText
                        style={
                          {
                            color: "#fff",
                            fontWeight: 500,
                            fontSize: 25,
                          }
                          //   [
                          //   isDarkModeEnabled ? { color: "#fff" } : { color: "#191a1d" },
                          // ]
                        }
                      >
                        {userProfile.Nickname}
                      </CustomText>
                    ) : (
                      <CustomText
                        style={
                          {
                            color: "#fff",
                            fontWeight: 500,
                            fontSize: 25,
                          }
                          //   [
                          //   isDarkModeEnabled ? { color: "#fff" } : { color: "#191a1d" },
                          // ]
                        }
                      >
                        User
                      </CustomText>
                    )}
                    {userProfile.Biography ? (
                      <CustomText style={{ color: "#fff", marginBottom: 10 }}>
                        {userProfile.Biography}
                      </CustomText>
                    ) : (
                      <CustomText style={{ color: "#fff" }}>
                        Description
                      </CustomText>
                    )}
                  </View>
                </View>
                <View>
                  <MaterialCommunityIcons
                    name={"chevron-right"}
                    size={20}
                    color={"#fff"}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View
          style={{ flexDirection: "column", rowGap: 15, paddingHorizontal: 10 }}
        >
          {links.map((link, index) => (
            <Link
              key={index}
              title={link.title}
              onPress={link.onPress}
              icon={link.icon}
              isLast={index === links.length - 1}
            />
          ))}
        </View>
      </SafeAreaWrapper>
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
            <CustomText style={{ fontSize: 18 }}>{i18n.t("no")}</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleModal();
              handleLogout();
            }}
          >
            <CustomText style={{ fontSize: 18 }}>{i18n.t("yes")}</CustomText>
          </TouchableOpacity>
        </View>
      </Dialog>
    </ScrollView>
  );
};

export default ProfileScreen;
