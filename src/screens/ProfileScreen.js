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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import * as Localization from "expo-localization";
import i18n from "../components/i18n/i18n";
import { Dialog } from "@rneui/themed";
import { API_URL } from "../constants";
import * as ImagePicker from "expo-image-picker";
// link
const Link = ({ title, onClick, icon, disabled = false }) => {
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );

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
                backgroundColor: "#00CDAC",
                borderRadius: 50,
                padding: 10,
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
            <Text
              style={
                {
                  color: "#000",
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
          <MaterialCommunityIcons
            name={"chevron-right"}
            size={20}
            color={"#00CDAC"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  // language
  // const actionSheetRef = useRef();
  // const token = useSelector((state) => state.signIn.token);
  // const userName = useSelector((state) => state.signIn.userName);
  // const refresh_token = useSelector((state) => state.signIn.refreshToken);
  // const [language, setLanguage] = useState(Localization.locale);
  const [modal, setModal] = useState(false);
  // const [hasFingerprint, setHasFingerprint] = useState(false);
  const [image, setImage] = useState(null);
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

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        // uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Ошибка при выборе изображения", error);
    }
  };

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
      <View style={{ paddingVertical: 20, flex: 1 }}>
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
                handleLogout();
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
            <TouchableOpacity
              onPress={pickImage}
              style={{
                position: "relative",
              }}
            >
              <Image
                source={
                  image
                    ? { uri: image }
                    : {
                        uri: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
                      }
                }
                style={styles.avatar}
              />
              <AntDesign
                name="pluscircle"
                style={{
                  color: "#00CDAC",
                  fontSize: 40,
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                }}
              />
            </TouchableOpacity>

            <Text
              style={[
                styles.name,
                // isDarkModeEnabled && { color: "#fff" }
              ]}
            >
              User
            </Text>
          </View>

          <View
            style={[
              styles.linksContainer,
              // isDarkModeEnabled
              //   ? { backgroundColor: "#191a1d" }
              //   : { backgroundColor: "#fff" },
            ]}
          >
            {/* <Link
            title={i18n.t("changePINCode")}
            onClick={() => {
              navigation.navigate("Сменить пин-код");
            }}
            icon={"pin"}
          /> */}
            <Link
              title={"Редактировать профиль"}
              onClick={() => {
                navigation.navigate("Редактировать профиль");
              }}
              icon={"person"}
            />

            <Link
              title={"Управление объектами"}
              onClick={() => navigation.navigate("Управление объектами")}
              icon={"home"}
            />
            <Link
              title={"Платежи и выплаты"}
              // onClick={() => navigation.navigate("Платежи и выплаты")}
              icon={"cash"}
            />
            <Link
              title={i18n.t("help")}
              // onClick={() => navigation.navigate("Помощь")}
              icon={"help"}
            />

            <Link
              title={i18n.t("logOut")}
              textColor={"#cc4949"}
              icon={"logout"}
            />
          </View>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};
const styles = StyleSheet.create({
  profile: {
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
    color: "#000",
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

export default ProfileScreen;
