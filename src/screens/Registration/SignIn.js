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
import Feather from "react-native-vector-icons/Feather";

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

  const onSubmit = async (userData) => {
    try {
      const data = await dispatch(loginUser(userData));

      if (data && data?.access_token) {
        await AsyncStorage.setItem("token", data?.access_token);
        navigation.navigate("Главная страница");
      }
    } catch (errors) {
      setError(errors.message);
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
            {errors.email && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {i18n.t("enterEmail")}
              </Text>
            )}
            {error === "user does not exist" && (
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
                borderBottomColor: errors.password || error ? "red" : "#000",
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
                  name="password"
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
  );
};

export default SignIn;
