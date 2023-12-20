import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../Store/DarkTheme/themeAction";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Platform,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";

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
                backgroundColor: "#5d00e6",
                borderRadius: 50,
                padding: 10,
              },
              // isDarkModeEnabled && { backgroundColor: "#fff" },
            ]}
          >
            {icon === "pin" ? (
              <Image
                source={require("../assets/pin.png")}
                style={{ width: 20, height: 20 }}
              />
            ) : (
              <Icon name={icon} size={20} color={"#fff"} />
            )}
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
  }, []); // Пустой массив зависимостей гарантирует, что эффект запустится только один раз при монтировании

  // redux
  const dispatch = useDispatch();
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );

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
      // style={
      //   [isDarkModeEnabled && { backgroundColor: "#383838" }]
      // }
      >
        <ScrollView>
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
              Client Demo
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

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              marginBottom: 10,
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

              <Text style={{ color: "#fff" }}>Вход по биометрии</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#5d00e6" }}
              thumbColor={isEnabled && "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View
            style={[
              styles.linksContainer,
              // isDarkModeEnabled
              //   ? { backgroundColor: "#191a1d" }
              //   : { backgroundColor: "#fff" },
            ]}
          >
            <Link
              title={"Сменить пин код"}
              onClick={() => {
                navigation.navigate("CorrectPinCode");
              }}
              icon={"pin"}
            />

            <Link title={"Сменить пароль"} onClick={() => null} icon={"lock"} />

            <Link
              title={"Помощь"}
              onClick={() => null}
              icon={"email-fast-outline"}
            />
            <Link
              title={"Выйти"}
              textColor={"#cc4949"}
              onClick={() => null}
              icon={"logout"}
            />
          </View>
        </ScrollView>
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
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
});

export default SettingsScreen;
