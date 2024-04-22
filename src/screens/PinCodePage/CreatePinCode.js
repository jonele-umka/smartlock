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
  Platform,
} from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import { Dialog } from "@rneui/themed";
import i18n from "../../components/i18n/i18n";

const CreatePinCode = () => {
  const navigation = useNavigation();
  const [pinCode, setPinCode] = useState("");
  const [pinError, setPinError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pinStep, setPinStep] = useState(1);
  const [firstPinCode, setFirstPinCode] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [modal, setModal] = useState(false);
  const [pinText, setPinText] = useState(i18n.t("enterNewPIN"));

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

  // biometric
  const toggleModal = () => {
    setModal(!modal);
  };
  const askForBiometrics = async () => {
    try {
      const hasBiometricHardware = await LocalAuthentication.hasHardwareAsync();
      if (hasBiometricHardware) {
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (isEnrolled) {
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: i18n.t("addAFingerprintToLogin"),
          });
          if (result.success) {
            saveBiometricPreference();
            navigation.navigate("Главная страница");
          } else {
            console.log(
              "Пользователь отказался от добавления отпечатка пальца"
            );
          }
        } else {
          console.log("У вас нет зарегистрированных отпечатков пальцев");
        }
      } else {
        console.log("Ваше устройство не поддерживает биометрию");
      }
    } catch (error) {
      console.error("Ошибка при работе с биометрией:", error);
    }
  };

  const saveBiometricPreference = async () => {
    try {
      await AsyncStorage.setItem("biometricEnabled", "true");
    } catch (error) {
      console.error("Ошибка при сохранении предпочтений по биометрии:", error);
    }
  };

  // pin
  useEffect(() => {
    const savePinCode = async () => {
      try {
        if (isCorrect) {
          await AsyncStorage.setItem("pinCode", pinCode);
        }
      } catch (error) {
        console.error("Ошибка при сохранении пин-кода:", error);
      }
    };

    savePinCode();
  }, [pinCode, isCorrect, navigation]);

  const handlePinPress = (digit) => {
    if (pinCode.length < 4) {
      setPinCode((prevPinCode) => prevPinCode + digit);
    }
  };

  useEffect(() => {
    const handleAsyncAction = async () => {
      if (pinStep === 1 && pinCode.length === 4) {
        setFirstPinCode(pinCode);
        setPinStep(2);
        setPinCode("");
        setPinText(i18n.t("confirmTheNewPIN"));
      } else if (pinStep === 2 && pinCode.length === 4) {
        const newPinCode = pinCode;

        if (newPinCode === firstPinCode) {
          setIsCorrect(true);
          await AsyncStorage.setItem("pinCode", newPinCode);

          // Проверяем поддержку биометрии
          const hasBiometricHardware =
            await LocalAuthentication.hasHardwareAsync();

          // Если поддерживается биометрия, и пользователь выбрал добавить отпечаток пальца
          if (Platform.OS === "android" && hasBiometricHardware) {
            toggleModal();
          } else {
            // В противном случае, переходим сразу на главную страницу
            navigation.navigate("Главная страница");
          }
        } else {
          setPinError(i18n.t("PINCodesDoNotMatch"));

          Vibration.vibrate();
          setIsLoading(false);
          handlePress();
          setTimeout(() => {
            setPinError("");
            setPinCode((prevPinCode) => prevPinCode.slice(0, -1));
            setIsCorrect(false);
          }, 1000);
        }
      }
    };

    handleAsyncAction();
  }, [pinCode, pinStep]);

  // backspace
  const handleBackspace = () => {
    if (pinCode.length > 0) {
      setPinCode(pinCode.slice(0, -1));
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
          pinError && pinCode.length === 4 && styles.wrongDot,
          isCorrect && styles.correctDot,
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
        <Dialog isVisible={modal}>
          <Dialog.Title title={i18n.t("wantToAddAFingerprint")} />
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
                navigation.navigate("Главная страница");
              }}
            >
              <Text style={{ fontSize: 18 }}>{i18n.t("no")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                toggleModal();
                askForBiometrics();
              }}
            >
              <Text style={{ fontSize: 18 }}>{i18n.t("add")}</Text>
            </TouchableOpacity>
          </View>
        </Dialog>
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
                color: "#fff",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              {pinText}
            </Text>
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
              <View style={styles.zeroButton}></View>
              <TouchableOpacity
                key={0}
                style={styles.digitButton}
                onPress={() => handlePinPress("0")}
              >
                <Text style={styles.digitButtonText}>0</Text>
              </TouchableOpacity>
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

export default CreatePinCode;
