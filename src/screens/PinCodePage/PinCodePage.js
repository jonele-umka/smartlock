import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Vibration,
  ActivityIndicator,
  Image,
  Animated,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { loginUser } from "../../Store/SignIn/SignInAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import Ionicons from "react-native-vector-icons/Ionicons";
import i18n from "../../components/i18n/i18n";
import { API_URL } from "../../constants";

const PinCodePage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [pinCode, setPinCode] = useState("");
  const [pinError, setPinError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
<<<<<<< HEAD
  // const token = useSelector((state) => state.signIn.token);
  // const refresh_token = useSelector((state) => state.signIn.refreshToken);
=======
  const token = useSelector((state) => state.signIn.token);
  const refresh_token = useSelector((state) => state.signIn.refreshToken);
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086

  const [storedPinCode, setStoredPinCode] = useState(null);
  const [biometryType, setBiometryType] = useState(null);
  const [hasFingerprint, setHasFingerprint] = useState(false);

  // biometric
  useEffect(() => {
    checkBiometricAvailability();
    fetchStoredPinCode();
    fetchBiometricPreference();

    const fetchBiometricStart = async () => {
      const biometricEnabled = await AsyncStorage.getItem("biometricEnabled");
      if (biometricEnabled) {
        handleBiometryLogin();
      }
    };
    fetchBiometricStart();
  }, []);

  const fetchStoredPinCode = async () => {
    try {
      const storedPin = await AsyncStorage.getItem("pinCode");
      setStoredPinCode(storedPin);
    } catch (error) {
      console.error("Ошибка при получении пин-кода из AsyncStorage:", error);
    }
  };
  const fetchBiometricPreference = async () => {
    try {
      const biometricEnabled = await AsyncStorage.getItem("biometricEnabled");

      // Проверяем, включена ли биометрия
      if (biometricEnabled === "true") {
        setHasFingerprint(true);
      } else {
        setHasFingerprint(false);
      }
    } catch (error) {
      console.error("Ошибка при чтении предпочтений по биометрии:", error);
    }
  };

  const checkBiometricAvailability = async () => {
    const supported = await LocalAuthentication.hasHardwareAsync();
    if (supported) {
      const biometryType =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      setBiometryType(biometryType);
    }
  };

  const handleBiometryLogin = async () => {
    try {
      const { success } = await LocalAuthentication.authenticateAsync({
        promptMessage: i18n.t("pleaseСonfirmYourFingerprint"),
      });

      if (success) {
        const storedLogin = await AsyncStorage.getItem("login");
        const storedPassword = await AsyncStorage.getItem("password");

        const userData = {
          UserName: storedLogin,
          UserPassword: storedPassword,
        };

        setIsLoading(true);

        await dispatch(loginUser(userData));

        setIsLoading(false);

        navigation.navigate("Главная страница");
      }
      // } else {
      //   setPinError("Неправильный отпечаток пальца");
      //   Vibration.vibrate();
      //   setIsLoading(false);
      //   handlePress();
      //   setTimeout(() => {
      //     setPinError("");
      //     setPinCode("");
      //   }, 1000);
      // }
    } catch (error) {
      console.error(error);
    }
  };

  // animation vibrate
  const [animation] = useState(new Animated.Value(0));

  const handlePress = () => {
    Animated.spring(animation, {
      toValue: 1,
      friction: 1,
      useNativeDriver: false,
    }).start(() => {
      animation.setValue(0);
    });
  };

  const vibrateStyle = {
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, -5, 0],
        }),
      },
    ],
  };
  // pin
  const handlePinPress = async (digit) => {
    if (storedPinCode && pinCode.length < 4) {
      const newPinCode = pinCode + digit;
      setPinCode(newPinCode);
    }

    if (pinCode.length + 1 === 4) {
      const storedLogin = await AsyncStorage.getItem("login");
      const storedPassword = await AsyncStorage.getItem("password");

      const userData = {
        UserName: storedLogin,
        UserPassword: storedPassword,
      };
      setIsLoading(true);

      if (parseInt(pinCode + digit) === parseInt(storedPinCode)) {
        await dispatch(loginUser(userData));
        setIsLoading(false);
        navigation.navigate("Главная страница");
      } else {
        setPinError(i18n.t("wrongPin"));
        Vibration.vibrate();
        setIsLoading(false);
        handlePress();
        setTimeout(() => {
          setPinError("");
          setPinCode("");
        }, 1000);
      }
    }
  };

  // backspace
  const handleBackspace = () => {
    if (pinCode.length > 0) {
      setPinCode(pinCode.slice(0, -1));
    }
  };

  // logout
  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ refresh_token }),
      });

      if (response.ok) {
        const responseBody = await response.text();
        console.log("Response Body:", responseBody);

<<<<<<< HEAD
        // navigation.navigate("Войти");
=======
        navigation.navigate("Войти");
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
        await AsyncStorage.removeItem("login");
        await AsyncStorage.removeItem("password");
      } else {
        console.log("Ошибка при выходе:", response.status, response.statusText);

        const errorBody = await response.text();
        console.log("Error Body:", errorBody);
      }
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };
  // dots
  const renderDots = () => {
    const dots = Array.from({ length: 4 });

    return dots.map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          pinCode.length > index && styles.activeDot,
          pinCode.length === 4 &&
            (pinCode !== storedPinCode.toString()
              ? styles.wrongDot
              : styles.correctDot),
        ]}
      />
    ));
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
      <SafeAreaWrapper
        style={[
          { flex: 1, padding: 10 },
          // isDarkModeEnabled && { backgroundColor: "#191a1d" },
        ]}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: 250, height: 60 }}
            source={require("../../assets/CRYPTONLogo.png")}
          />
        </View>

        <View style={styles.container}>
          <View>
            <Text
              style={{
                fontSize: 20,
                color: "red",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              {pinError}
            </Text>
          </View>

          {isLoading ? (
            <ActivityIndicator
              style={{ marginBottom: 100 }}
              size="large"
              color="#fff"
            />
          ) : (
            <Animated.View style={[styles.dotsContainer, vibrateStyle]}>
              {renderDots()}
            </Animated.View>
          )}

          <View style={styles.digitContainer}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
              <TouchableOpacity
                key={digit}
                style={styles.digitButton}
                onPress={() => handlePinPress(digit.toString())}
              >
                <Text style={styles.digitButtonText}>{digit}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.zeroContainer}>
              <TouchableOpacity
                style={styles.zeroButton}
                onPress={handleLogout}
              >
                <MaterialIcons
                  name="logout"
                  style={{ color: "#fff", fontSize: 30 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                key={0}
                style={styles.digitButton}
                onPress={() => handlePinPress("0")}
              >
                <Text style={styles.digitButtonText}>0</Text>
              </TouchableOpacity>
              {hasFingerprint &&
              pinCode.length < 1 &&
              Platform.OS === "android" ? (
                <TouchableOpacity
                  onPress={handleBiometryLogin}
                  style={styles.zeroButton}
                >
                  <Ionicons
                    name="finger-print-outline"
                    style={{ color: "#fff", fontSize: 30 }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.zeroButton}
                  onPress={() => {
                    handleBackspace();
                    setPinError("");
                  }}
                >
                  <Feather
                    name="delete"
                    style={{ color: "#fff", fontSize: 30 }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </SafeAreaWrapper>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    columnGap: 10,
    marginBottom: 100,
    justifyContent: "center",
  },
  dot: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 10,
    width: 20,
    height: 20,
  },
  activeDot: {
    backgroundColor: "white",
  },
  wrongDot: {
    backgroundColor: "crimson",
  },
  correctDot: {
    backgroundColor: "limegreen",
  },
  pinCodeText: {
    fontSize: 24,
    marginBottom: 20,
    color: "#fff",
  },
  digitContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 20,
    rowGap: 20,
  },
  digitButton: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 100,
  },
  digitButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  zeroContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
  },
  zeroButton: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderWidth: 2,
    borderColor: "#f81ba2",
    borderRadius: 4,
    overflow: "hidden",
  },
  innerButton: {
    backgroundColor: "#f81ba2",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PinCodePage;
