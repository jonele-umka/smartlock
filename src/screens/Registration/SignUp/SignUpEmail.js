import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail } from "../../../Store/SignIn/SignInAction";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/core";
import i18n from "../../../components/i18n/i18n";
<<<<<<< HEAD
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
=======
import { LinearGradient } from "expo-linear-gradient";
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086

const SignUpEmail = () => {
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const loading = useSelector((state) => state.signIn.loading);
  const [error, setError] = useState("");
  const onSubmit = async (data) => {
    try {
      await dispatch(sendEmail(data));
      // navigation.navigate("Код", { email: data.email });
    } catch (errors) {
      setError(errors.message);
    }
  };

  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <LinearGradient
      style={[
<<<<<<< HEAD
        { flex: 1, backgroundColor: "#fff" },
=======
        { flex: 1 },
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
        // isDarkModeEnabled && { backgroundColor: "#191a1d" },
      ]}
      start={{ x: 2.4, y: 1.1 }}
      end={{ x: 0, y: 0 }}
      colors={["#241270", "#140A4F", "#000"]}
    >
<<<<<<< HEAD
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
          {i18n.t("enterEmail")}
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
                paddingRight: 10,
                paddingVertical: 10,
                borderBottomColor:
                  errors.email || error === "user already exists"
                    ? "red"
                    : "#000",
              }}
            >
              <Feather name="mail" style={{ color: "#b8b8b8", fontSize: 20 }} />
              <Controller
                control={control}
                name="email"
                rules={{
                  required: i18n.t("fillInThisField"),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: i18n.t("pleaseEnterAValidEmailAddress"),
                  },
                }}
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
                {errors.email.message}
              </Text>
            )}
            {error === "user already exists" && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {error}
              </Text>
            )}
          </View>
          <View style={{ marginBottom: 30 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
                borderBottomWidth: 0.5,
                borderBottomColor: "#000",
                paddingRight: 10,
                paddingVertical: 10,
                borderBottomColor: errors.password ? "red" : "#000",
              }}
            >
              <Feather name="lock" style={{ color: "#b8b8b8", fontSize: 20 }} />
              <Controller
                control={control}
                name="password"
                rules={{
                  required: i18n.t("fillInTheField"),
                  minLength: {
                    value: 8,
                    message: i18n.t("passwordMinEight"),
                  },
                  pattern: {
                    value: /^[^\sа-яА-Я]+$/i,
                    message: i18n.t("enterInLatin"),
                  },
                }}
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
                    style={{
                      color: "#000",
                      fontSize: 14,
                      flex: 1,
                    }}
                  />
                )}
              />
            </View>
            {errors.password && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {errors.password.message}
              </Text>
            )}
            {/* {error && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {error}
              </Text>
            )} */}
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
                borderBottomWidth: 0.5,
                borderBottomColor: "#000",
                paddingRight: 10,
                paddingVertical: 10,
                borderBottomColor:
                  errors.password_confirm || error === "passwords do not match"
                    ? "red"
                    : "#000",
              }}
            >
              <Feather name="lock" style={{ color: "#b8b8b8", fontSize: 20 }} />
              <Controller
                control={control}
                name="password_confirm"
                rules={{
                  required: i18n.t("fillInTheField"),
                  minLength: {
                    value: 8,
                    message: i18n.t("passwordMinEight"),
                  },
                  pattern: {
                    value: /^[^\sа-яА-Я]+$/i,
                    message: i18n.t("enterInLatin"),
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    type="Пароль"
                    placeholder={i18n.t("confirmPassword")}
                    placeholderTextColor="#b8b8b8"
                    onChangeText={(value) => {
                      field.onChange(value);
                      setError("");
                    }}
                    value={field.value}
                    style={{
                      color: "#000",
                      fontSize: 14,
                      flex: 1,
                    }}
                  />
                )}
              />
            </View>
            {errors.password_confirm && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {errors.password_confirm.message}
              </Text>
            )}
            {error === "passwords do not match" && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {error}
              </Text>
            )}
          </View>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginTop: 40 }}
            color={"#000"}
          />
        ) : (
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
            style={{
              marginTop: 30,
              padding: 15,
              backgroundColor: "#000",
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 10,
=======
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
          <Text
            style={[
              {
                fontSize: 20,
                textAlign: "center",
                marginBottom: 30,
                paddingTop: 10,
                color: "#fff",
              },
              // isDarkModeEnabled ? { color: "#fff" } : { color: "#191a1d" },
            ]}
          >
            {i18n.t("enterEmail")}
          </Text>
          <Controller
            control={control}
            rules={{
              required: i18n.t("fillInTheField"),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: i18n.t("pleaseEnterAValidEmailAddress"),
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
              },
            }}
<<<<<<< HEAD
          >
            <Text style={{ color: "#fff", textAlign: "center", fontSize: 20 }}>
              {i18n.t("next")}
=======
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholderTextColor={"#9c9c9c"}
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  setError("");
                }}
                placeholder={i18n.t("enterEmail")}
                style={{
                  color: "#fff",
                  fontSize: 16,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderRadius: 10,
                  borderWidth: errors.email || error == 400 ? 1 : 0,
                  borderColor:
                    errors.email || error == 400
                      ? "red"
                      : "rgba(255,255,255,0.05)",
                }}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
              {errors.email.message}
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
            </Text>
          )}
          {error == 400 && (
            <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
              {i18n.t("invalidEmail")}
            </Text>
          )}
          {loading ? (
            <ActivityIndicator
              size="large"
              style={{ marginTop: 30 }}
              color={"#fff"}
            />
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              style={{
                marginTop: 20,
                padding: 15,
                backgroundColor: "#5d00e6",
                borderRadius: 10,
                shadowColor: "#5d00e6",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 10,
              }}
            >
              <Text
                style={{ color: "#fff", textAlign: "center", fontSize: 20 }}
              >
                {i18n.t("next")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaWrapper>
    </LinearGradient>
  );
};

export default SignUpEmail;
