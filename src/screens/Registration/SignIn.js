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
  Button,
} from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Google from "expo-auth-session/providers/google";
import Feather from "react-native-vector-icons/Feather";
import i18n from "../../components/i18n/i18n";
import { loginUser } from "../../Store/authSlice/authSlice";
import * as Linking from "expo-linking";
 
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
  // const isDarkModeEnabled = useSelector(
  //   (state) => state.theme.isDarkModeEnabled
  // );

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

        <TouchableOpacity style={{ marginBottom: 30 }}>
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
        {/* <Button title="url" onPress={() => AsyncStorage.setItem("@user")} />
        {!userInfo ? (
          <TouchableOpacity
            onPress={() => {
              promptAsync();
            }}
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
        ) : (
          <View style={{ borderWidth: 1, borderRadius: 15, padding: 15 }}>
            {userInfo?.picture && (
              <Image
                source={{ uri: userInfo?.picture }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            )}

            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Email: {userInfo.email}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Verified: {userInfo.verified_email ? "yes" : "no"}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Name: {userInfo.name}
            </Text>
          </View>
        )} */}
      </View>
    </SafeAreaWrapper>
  );
};

export default SignIn;
