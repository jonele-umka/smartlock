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
import { loginUser } from "../../Store/SignIn/SignInAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import i18n from "../../components/i18n/i18n";

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );
  const [error, setError] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const togglePasswordVisibility = () => {
    setIsPasswordHidden((prev) => !prev);
  };
  const loading = useSelector((state) => state.signIn.loading);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const goToCreateAccount = () => {
    navigation.navigate("Email");
  };

  // submit
  // const onSubmit = (userData) => {
  //   console.log(userData);
  //   dispatch(loginUser(userData)).then(() => navigation.navigate("Главная"));
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

  const onSubmit = async (userData) => {
    try {
      // Выполняем вход
      const data = await dispatch(loginUser(userData));

      if (data && data?.data && data?.data?.access_token) {
        // Сохраняем токен
        await AsyncStorage.setItem("token", data?.data?.access_token);

        // Проверяем наличие пин-кода
        const pinCode = await AsyncStorage.getItem("pinCode");

        if (pinCode) {
          // Если пин-код существует, перенаправляем на главную страницу
          navigation.navigate("Главная страница");
        } else {
          // Если пин-кода нет, перенаправляем на страницу создания пин-кода
          navigation.navigate("Создать пин-код");
        }
      } else {
        setError("Некорректные данные");
      }
    } catch (error) {
      setError(error.message);
    }
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
          { flex: 1 },
          // isDarkModeEnabled && { backgroundColor: "#191a1d" },
        ]}
      >
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}
        >
          <Image
            style={{ width: "100%", height: 80, marginBottom: 50 }}
            source={require("../../assets/CRYPTONLogo.png")}
          />
          {/* <Text
            style={{
              fontSize: 20,
              maxWidth: "60%",
              alignSelf: "center",
              marginBottom: 20,
              textAlign: "center",
              color: "#fff",
            }}
          >
            С возвращением, по вам скучали!
          </Text> */}

          <View
            style={{
              marginBottom: 10,
            }}
          >
            <View style={{ marginBottom: 25 }}>
              <Text
                style={
                  { color: "#fff", marginBottom: 10 }
                  //   [
                  //   isDarkModeEnabled ? { color: "#fff" } : { color: "#000" },
                  // ]
                }
              >
                Email
              </Text>
              <Controller
                control={control}
                name="UserName"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput
                    placeholder={i18n.t("enterEmail")}
                    placeholderTextColor="#9c9c9c"
                    onChangeText={(value) => {
                      field.onChange(value);
                      setError("");
                    }}
                    value={field.value}
                    style={{
                      color: "#fff",
                      fontSize: 14,
                      backgroundColor: "rgba(255,255,255,0.2)",
                      paddingHorizontal: Platform.OS === "android" ? 10 : 15,
                      paddingVertical: Platform.OS === "android" ? 10 : 15,
                      borderRadius: 10,
                      borderWidth: errors.UserName || error ? 1 : 0,
                      borderColor: errors.UserName || error ? "red" : "#272727",
                      // borderWidth: 1,
                      // borderColor: error ? "red" : "#f3f3f3",
                      // shadowColor: "#000",
                      // shadowOffset: {
                      //   width: 0,
                      //   height: 2,
                      // },
                      // shadowOpacity: 0.1,
                      // shadowRadius: 8.84,
                      // elevation: 5,
                    }}
                  />
                )}
              />
              {errors.UserName && (
                <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                  {i18n.t("enterEmail")}
                </Text>
              )}
              {error && (
                <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                  {error}
                </Text>
              )}
            </View>
            <View>
              <Text
                style={
                  { color: "#fff", marginBottom: 10 }
                  //   [
                  //   isDarkModeEnabled ? { color: "#fff" } : { color: "#000" },
                  // ]
                }
              >
                {i18n.t("password")}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 10,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  paddingRight: 10,
                  borderRadius: 10,
                  borderWidth: errors.UserPassword || error ? 1 : 0,
                  borderColor: errors.UserPassword || error ? "red" : "#272727",
                }}
              >
                <Controller
                  control={control}
                  name="UserPassword"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextInput
                      type="Пароль"
                      placeholder={i18n.t("enterPassword")}
                      placeholderTextColor="#9c9c9c"
                      onChangeText={(value) => {
                        field.onChange(value);
                        setError("");
                      }}
                      value={field.value}
                      secureTextEntry={isPasswordHidden}
                      style={{
                        flex: 1,
                        color: "#fff",
                        fontSize: 14,
                        paddingHorizontal: Platform.OS === "android" ? 10 : 15,
                        paddingVertical: Platform.OS === "android" ? 10 : 15,
                        borderRadius: 10,

                        // borderWidth: 1,
                        // borderColor: error ? "red" : "#f3f3f3",
                        // shadowColor: "#000",
                        // shadowOffset: {
                        //   width: 0,
                        //   height: 2,
                        // },
                        // shadowOpacity: 0.1,
                        // shadowRadius: 8.84,
                        // elevation: 5,
                      }}
                    />
                  )}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  {isPasswordHidden ? (
                    <Ionicons
                      name="eye-outline"
                      style={{ color: "#fff", fontSize: 25 }}
                    />
                  ) : (
                    <Ionicons
                      name="eye-off-outline"
                      style={{ color: "#fff", fontSize: 25 }}
                    />
                  )}
                </TouchableOpacity>
              </View>
              {errors.UserPassword && (
                <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                  {i18n.t("enterPassword")}
                </Text>
              )}
              {error && (
                <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                  {error}
                </Text>
              )}
            </View>
          </View>

          <View>
            <Text
              style={{
                fontSize: 14,
                color: "#fff",
                alignSelf: "flex-end",
              }}
            >
              {i18n.t("forgotPassword")}
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator
              size="large"
              style={{ marginTop: 30, marginBottom: 20 }}
              color={"#fff"}
            />
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                padding: 15,
                backgroundColor: "#5d00e6",
                marginTop: 30,
                marginBottom: 20,
                borderRadius: 10,
                shadowColor: "#5d00e6",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                elevation: 5,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                {i18n.t("signIn")}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity>
            <Text
              style={[
                {
                  // fontFamily: Font["poppins-semiBold"],
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 14,
                },
                // isDarkModeEnabled && {
                //   color: "#fff",
                // },
              ]}
              onPress={goToCreateAccount}
            >
              {i18n.t("createAccount")}
            </Text>
          </TouchableOpacity>

          {/* <View
            style={{
              marginVertical: 30,
            }}
          >
            <Text
              style={{
                // fontFamily: Font["poppins-semiBold"],
                color: "#fff",
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Или продолжить с
            </Text>

            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#5d00e6",
                  borderRadius: 10,
                  marginHorizontal: 10,
                }}
              >
                <Icon
                  name="google"
                  style={
                    { color: "#fff" }
                    // isDarkModeEnabled ? { color: "#fff" } : { color: "#000" }
                  }
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#5d00e6",
                  borderRadius: 10,
                  marginHorizontal: 10,
                }}
              >
                <Icon
                  name="apple"
                  style={
                    { color: "#fff" }
                    // isDarkModeEnabled ? { color: "#fff" } : { color: "#000" }
                  }
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#5d00e6",
                  borderRadius: 10,
                  marginHorizontal: 10,
                }}
              >
                <Icon
                  name="facebook"
                  style={
                    { color: "#fff" }
                    // isDarkModeEnabled ? { color: "#fff" } : { color: "#000" }
                  }
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View> */}
        </View>
      </SafeAreaWrapper>
    </LinearGradient>
  );
};

export default SignIn;
