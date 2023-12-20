import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Vibration,
  ActivityIndicator,
  Animated,
} from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CorrectPinCode = () => {
  const navigation = useNavigation();
  const [pinCode, setPinCode] = useState("");
  const [pinError, setPinError] = useState("");
  const [pinText, setPinText] = useState("Введите новый PIN");
  const [isLoading, setIsLoading] = useState(false);
  const [pinStep, setPinStep] = useState(1);
  const [firstPinCode, setFirstPinCode] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

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
        setPinText("Подтвердите новый PIN");
      } else if (pinStep === 2 && pinCode.length === 4) {
        const newPinCode = pinCode;
        if (newPinCode === firstPinCode) {
          setIsCorrect(true);
          navigation.navigate("Главная страница");
          await AsyncStorage.setItem("pinCode", newPinCode);
        } else {
          console.log("Пин-коды не совпадают. Повторите ввод.");
          setPinError("Пин-коды не совпадают. Повторите ввод.");

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

  // logout
  const handleExit = () => {
    console.log("Выход");
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
              <TouchableOpacity style={styles.zeroButton} onPress={handleExit}>
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

export default CorrectPinCode;
