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
<<<<<<< HEAD
import Feather from "react-native-vector-icons/Feather";

=======
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
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
  // const loading = useSelector((state) => state.signIn.loading);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  // const goToCreateAccount = () => {
  //   navigation.navigate("Email");
  // };

<<<<<<< HEAD
=======
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

>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
  const onSubmit = async (userData) => {
    try {
      // Выполняем вход
      const data = await dispatch(loginUser(userData));

<<<<<<< HEAD
      if (data && data?.access_token) {
        await AsyncStorage.setItem("token", data?.access_token);
        navigation.navigate("Главная страница");
      }
    } catch (errors) {
      setError(errors.message);
=======
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
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
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
<<<<<<< HEAD
            fontSize: 40,
            marginBottom: 30,
            color: "#000",
            fontWeight: 600,
=======
            paddingHorizontal: 10,
            paddingVertical: 20,
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
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
                borderBottomColor: errors.email || error ? "red" : "#000",
              }}
            >
              <Feather name="user" style={{ color: "#b8b8b8", fontSize: 20 }} />
              <Controller
                control={control}
                name="email"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput
                    placeholder={i18n.t("enterEmail")}
<<<<<<< HEAD
                    placeholderTextColor="#b8b8b8"
=======
                    placeholderTextColor="#9c9c9c"
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
                    onChangeText={(value) => {
                      field.onChange(value);
                      setError("");
                    }}
                    value={field.value}
                    style={{
                      flex: 1,
                      color: "#000",
                      fontSize: 14,
<<<<<<< HEAD
=======
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
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
                    }}
                  />
                )}
              />
<<<<<<< HEAD
            </View>
            {errors.email && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {i18n.t("enterEmail")}
              </Text>
            )}
            {error === "user does not exist" && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {i18n.t("userDoesNotExist")}
=======
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
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
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
                borderBottomColor: errors.password || error ? "red" : "#000",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
<<<<<<< HEAD
                  columnGap: 5,
=======
                  columnGap: 10,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  paddingRight: 10,
                  borderRadius: 10,
                  borderWidth: errors.UserPassword || error ? 1 : 0,
                  borderColor: errors.UserPassword || error ? "red" : "#272727",
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
                }}
              >
                <Feather
                  name="lock"
                  style={{ color: "#b8b8b8", fontSize: 20 }}
                />
                <Controller
                  control={control}
                  name="password"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextInput
                      type="Пароль"
                      placeholder={i18n.t("enterPassword")}
<<<<<<< HEAD
                      placeholderTextColor="#b8b8b8"
=======
                      placeholderTextColor="#9c9c9c"
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
                      onChangeText={(value) => {
                        field.onChange(value);
                        setError("");
                      }}
                      value={field.value}
                      secureTextEntry={isPasswordHidden}
                      style={{
                        color: "#000",
                        fontSize: 14,
<<<<<<< HEAD
                        flex: 0.9,
=======
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
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
                      }}
                    />
                  )}
                />
              </View>
<<<<<<< HEAD
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
=======
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
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
            </View>
            {errors.password && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {i18n.t("enterPassword")}
              </Text>
            )}
            {error === "invalid password" && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {i18n.t("invalidPassword")}
              </Text>
            )}
          </View>
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              color: "#000",
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
            color={"#000"}
          />
        ) : (
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={{
              padding: 15,
              backgroundColor: "#000",
              marginTop: 30,
              marginBottom: 30,
              borderRadius: 20,
              shadowColor: "#000",
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
<<<<<<< HEAD
                textAlign: "center",
                fontSize: 20,
              }}
            >
              {i18n.t("signIn")}
=======
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
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
            </Text>
          </TouchableOpacity>
        )}

<<<<<<< HEAD
        <TouchableOpacity>
          <Text
            style={[
              {
                // fontFamily: Font["poppins-semiBold"],
                color: "#000",
                textAlign: "center",
                fontSize: 14,
              },
              // isDarkModeEnabled && {
              //   color: "#fff",
              // },
            ]}
            // onPress={goToCreateAccount}
          >
            {i18n.t("createAccount")}
          </Text>
        </TouchableOpacity>

        {/* <View
=======
          {/* <View
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
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
<<<<<<< HEAD
      </View>
    </SafeAreaWrapper>
=======
        </View>
      </SafeAreaWrapper>
    </LinearGradient>
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
  );
};

export default SignIn;
