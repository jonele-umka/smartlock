import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useForm, Controller } from "react-hook-form";
import {
  Image,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";

import Ionicons from "react-native-vector-icons/Ionicons";
import * as Google from "expo-auth-session/providers/google";
import Feather from "react-native-vector-icons/Feather";
import i18n from "../../components/i18n/i18n";
import { loginUser } from "../../Store/authSlice/authSlice";
import * as Linking from "expo-linking";
import CustomText from "../../components/CustomText/CustomText";
import SafeAreaWrapper from "../../components/SafeAreaWrapper/SafeAreaWrapper";

WebBrowser.maybeCompleteAuthSession();
const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const navigation = useNavigation();
  const route = useRoute();
  const [error, setError] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const togglePasswordVisibility = () => {
    setIsPasswordHidden((prev) => !prev);
  };
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const e = () => {
    Linking.openURL("exp://");
  };

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   clientId:
  //     "490567224593-a6av57bn9betj1ajnnoe1noo77tgbc3q.apps.googleusercontent.com",
  //   redirectUri: "http://127.0.0.1:8081",
  // });

  // useEffect(() => {
  //   handleEffect();
  // }, [response]);
  // async function handleEffect() {
  //   const user = await getLocalUser();
  //   if (!user) {
  //     if (response?.type === "success") {
  //       setToken(response.authentication.accessToken);
  //       getUserInfo(response.authentication.accessToken);
  //       console.log("Access Token: ", response.authentication.accessToken);
  //     }
  //   } else {
  //     setUserInfo(user);

  //     // Linking.openURL("exp://");
  //     console.log("loaded locally");
  //   }
  // }
  // console.log(response?.type);

  // const getLocalUser = async () => {
  //   const data = await AsyncStorage.getItem("@user");
  //   console.log(data);
  //   if (!data) return null;
  //   return JSON.parse(data);
  // };

  // const getUserInfo = async (token) => {
  //   if (!token) return;
  //   try {
  //     const response = await fetch(
  //       "https://www.googleapis.com/userinfo/v2/me",
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch user info");
  //     }

  //     const user = await response.json();

  //     await AsyncStorage.setItem("@user", JSON.stringify(user));
  //     setUserInfo(user);
  //   } catch (error) {
  //     console.error("Error fetching user info:", error);
  //   }
  // };

  const onSubmit = async (userData) => {
    console.log(userData);
    try {
      const response = await dispatch(loginUser(userData));

      if (response.type === "auth/loginUser/fulfilled") {
        const returnScreen = route.params?.returnScreen || "Главная страница";
        navigation.navigate(returnScreen);
      } else {
        setError(response.payload);
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      setError(error.message);
    }
  };

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
        <CustomText
          style={{
            fontSize: 40,
            marginBottom: 30,

            fontWeight: 600,
          }}
        >
          {i18n.t("signInScreen")}
        </CustomText>

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
                columnGap: 10,
                borderWidth: 1,
                borderColor: "#dee2f1",
                paddingHorizontal: 10,
                borderRadius: 10,
                paddingVertical: 10,
                borderColor:
                  errors.email || error === "record not found"
                    ? "red"
                    : "#dee2f1",
              }}
            >
              <Feather name="user" style={{ color: "#616992", fontSize: 20 }} />
              <Controller
                control={control}
                name="Email"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput
                    placeholder={i18n.t("enterEmail")}
                    placeholderTextColor="#616992"
                    onChangeText={(value) => {
                      field.onChange(value);
                      setError("");
                    }}
                    value={field.value}
                    style={{
                      flex: 1,
                      color: "#1C2863",
                      fontSize: 14,
                    }}
                  />
                )}
              />
            </View>
            {errors.Email && (
              <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {i18n.t("enterEmail")}
              </CustomText>
            )}
            {error === "record not found" && (
              <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {i18n.t("userDoesNotExist")}
              </CustomText>
            )}
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                columnGap: 10,
                borderWidth: 1,
                borderColor: "#dee2f1",
                paddingHorizontal: 10,
                borderRadius: 10,
                paddingVertical: 10,
                borderColor:
                  errors.password ||
                  error ===
                    "crypto/bcrypt: hashedPassword is not the hash of the given password"
                    ? "red"
                    : "#dee2f1",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 10,
                }}
              >
                <Feather
                  name="lock"
                  style={{ color: "#616992", fontSize: 20 }}
                />
                <Controller
                  control={control}
                  name="Password"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextInput
                      type="Пароль"
                      placeholder={i18n.t("enterPassword")}
                      placeholderTextColor="#616992"
                      onChangeText={(value) => {
                        field.onChange(value);
                        setError("");
                      }}
                      value={field.value}
                      secureTextEntry={isPasswordHidden}
                      style={{
                        fontSize: 14,
                        color: "#1C2863",
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
                    style={{ color: "#616992", fontSize: 25 }}
                  />
                ) : (
                  <Ionicons
                    name="eye-off-outline"
                    style={{ color: "#616992", fontSize: 25 }}
                  />
                )}
              </TouchableOpacity>
            </View>
            {errors.Password && (
              <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {i18n.t("enterPassword")}
              </CustomText>
            )}
            {error ===
              "crypto/bcrypt: hashedPassword is not the hash of the given password" && (
              <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {i18n.t("invalidPassword")}
              </CustomText>
            )}
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Забыли пароль")}
          >
            <CustomText
              style={{
                fontSize: 14,
                color: "#1C2863",
                alignSelf: "flex-end",
              }}
            >
              {i18n.t("forgotPassword")}
            </CustomText>
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginTop: 40, marginBottom: 30 }}
            color={"#4B5DFF"}
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
              backgroundColor: "#4B5DFF",
              paddingVertical: 15,
              textAlign: "center",
              borderRadius: 10,
            }}
          >
            <CustomText
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              Войти
            </CustomText>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate("Регистрация")}
          style={{ marginBottom: 30 }}
        >
          <CustomText
            style={[
              {
                textAlign: "center",
                fontSize: 16,
              },
              // isDarkModeEnabled && {
              //   color: "#fff",
              // },
            ]}
          >
            {i18n.t("createAccount")}
          </CustomText>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "#000" }} />
          <CustomText
            style={{
              color: "#1C2863",
              textAlign: "center",
              fontSize: 14,
              marginHorizontal: 10,
            }}
          >
            Или
          </CustomText>
          <View style={{ flex: 1, height: 1, backgroundColor: "#000" }} />
        </View>
        <TouchableOpacity
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

            <CustomText style={{ fontSize: 18 }}>
              Продолжить с Google{" "}
            </CustomText>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
};

export default SignIn;
