import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { useForm, Controller } from "react-hook-form";
import {
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";

import Feather from "react-native-vector-icons/Feather";

import i18n from "../../components/i18n/i18n";
import { loginGoogle, loginUser } from "../../Store/authSlice/authSlice";

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const isDarkModeEnabled = useSelector(
  //   (state) => state.theme.isDarkModeEnabled
  // );
  const [error, setError] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const togglePasswordVisibility = () => {
    setIsPasswordHidden((prev) => !prev);
  };
  const loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  // const goToCreateAccount = () => {
  //   navigation.navigate("Email");
  // };

  // const onSubmit = async (userData) => {
  //   try {
  //     await dispatch(loginUser(userData));
  //     navigation.navigate("Главная");
  //   } catch (error) {
  //     setError(error);
  //   }
  // };
  // const onSubmit = async (userData) => {
  //   try {
  //     const data = await dispatch(loginUser(userData));

  //     if (data && data?.data && data?.data?.access_token) {
  //       await AsyncStorage.setItem("token", data?.data?.access_token);
  //       navigation.navigate("Главная страница");
  //     } else {
  //       console.error("Ошибка при входе");
  //     }
  //   } catch (error) {
  //     console.error("Ошибка при входе:", error);
  //   }
  // };
  console.log(loading)
  const googleAuth = async () => {
    await dispatch(loginGoogle());
  };
  const onSubmit = async (userData) => {
    console.log(userData);
    try {
      const response = await dispatch(loginUser(userData));

      if (response.type === "auth/loginUser/fulfilled") {
        navigation.navigate("Главная страница");
      } else {
        setError(response.payload);
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      setError(error.message);
    }
  };

  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <SafeAreaWrapper
      style={[
        { flex: 1, justifyContent: "center", backgroundColor: "#fff" },
        // isDarkModeEnabled && { backgroundColor: "#191a1d" },
      ]}
    >
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}
      >
        <Text
          style={{
            fontSize: 40,
            marginBottom: 30,
            color: "#000",
            fontWeight: 600,
          }}
        >
          {i18n.t("signInScreen")}
        </Text>

        <View
          style={{
            marginBottom: 10,
          }}
        >
          <View style={{ marginBottom: 30 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
                borderBottomWidth: 0.5,
                borderBottomColor: "#000",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderBottomColor:
                  errors.email || error === "record not found" ? "red" : "#000",
              }}
            >
              <Feather name="user" style={{ color: "#b8b8b8", fontSize: 20 }} />
              <Controller
                control={control}
                name="Email"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput
                    placeholder={i18n.t("enterEmail")}
                    placeholderTextColor="#b8b8b8"
                    onChangeText={(value) => {
                      field.onChange(value);
                      setError("");
                    }}
                    value={field.value}
                    style={{
                      flex: 1,
                      color: "#000",
                      fontSize: 14,
                    }}
                  />
                )}
              />
            </View>
            {errors.Email && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {i18n.t("enterEmail")}
              </Text>
            )}
            {error === "record not found" && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {i18n.t("userDoesNotExist")}
              </Text>
            )}
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                columnGap: 10,
                borderBottomWidth: 0.5,
                borderBottomColor: "#000",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderBottomColor:
                  errors.password ||
                  error ===
                    "crypto/bcrypt: hashedPassword is not the hash of the given password"
                    ? "red"
                    : "#000",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",

                  columnGap: 5,
                }}
              >
                <Feather
                  name="lock"
                  style={{ color: "#b8b8b8", fontSize: 20 }}
                />
                <Controller
                  control={control}
                  name="Password"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextInput
                      type="Пароль"
                      placeholder={i18n.t("enterPassword")}
                      placeholderTextColor="#b8b8b8"
                      onChangeText={(value) => {
                        field.onChange(value);
                        setError("");
                      }}
                      value={field.value}
                      secureTextEntry={isPasswordHidden}
                      style={{
                        color: "#000",
                        fontSize: 14,

                        flex: 0.9,
                      }}
                    />
                  )}
                />
              </View>

              <TouchableOpacity onPress={togglePasswordVisibility}>
                {isPasswordHidden ? (
                  <Ionicons
                    name="eye-outline"
                    style={{ color: "#000", fontSize: 25 }}
                  />
                ) : (
                  <Ionicons
                    name="eye-off-outline"
                    style={{ color: "#000", fontSize: 25 }}
                  />
                )}
              </TouchableOpacity>
            </View>
            {errors.Password && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {i18n.t("enterPassword")}
              </Text>
            )}
            {error ===
              "crypto/bcrypt: hashedPassword is not the hash of the given password" && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {i18n.t("invalidPassword")}
              </Text>
            )}
          </View>
        </View>

        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Забыл пароль")}>
            <Text
              style={{
                fontSize: 14,
                color: "#000",
                alignSelf: "flex-end",
              }}
            >
              {i18n.t("forgotPassword")}
            </Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginTop: 40, marginBottom: 30 }}
            color={"#000"}
          />
        ) : (
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={{
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              marginVertical: 30,
            }}
          >
            <LinearGradient
              colors={["#02AAB0", "#00CDAC"]}
              style={{
                paddingVertical: 15,
                textAlign: "center",
                borderRadius: 10,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                Войти
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        <TouchableOpacity
        //  style={{ marginBottom: 30 }}
        >
          <Text
            style={[
              {
                // fontFamily: Font["poppins-semiBold"],
                color: "#000",
                textAlign: "center",
                fontSize: 16,
              },
              // isDarkModeEnabled && {
              //   color: "#fff",
              // },
            ]}
            onPress={() => navigation.navigate("Email")}
          >
            {i18n.t("createAccount")}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "#000" }} />
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              fontSize: 14,
              marginHorizontal: 10,
            }}
          >
            Или
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#000" }} />
        </View>
        <TouchableOpacity
          onPress={googleAuth}
          style={{
            paddingVertical: 13,
            paddingHorizontal: 10,
            backgroundColor: "#fff",
            borderRadius: 10,
            marginHorizontal: 10,
            shadowColor: "#000",
            alignSelf: "center",
            marginTop: 30,
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/google.png")}
              style={{ width: 20, height: 20 }}
            />

            <Text style={{ fontSize: 18 }}>Продолжить с Google </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
};

export default SignIn;
