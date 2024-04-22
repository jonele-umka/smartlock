import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

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
import i18n from "../../components/i18n/i18n";
import { LinearGradient } from "expo-linear-gradient";
import { API_URL } from "../../constants";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;
  const dispatch = useDispatch();
  const navigation = useNavigation();
<<<<<<< HEAD
  // const loading = useSelector((state) => state.signIn.loading);
  // const token = useSelector((state) => state.signIn.token);
=======
  const loading = useSelector((state) => state.signIn.loading);
  const token = useSelector((state) => state.signIn.token);
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
  const [confirmError, setConfirmError] = useState("");
  const [oldError, setOldError] = useState("");

  const handleChangePassword = async () => {
    try {
      const OldPassword = getValues("OldPassword");
      const NewPassword = getValues("NewPassword");
      const NewPasswordConfirm = getValues("NewPasswordConfirm");
      const storedPassword = await AsyncStorage.getItem("password");

      if (OldPassword !== storedPassword) {
        setOldError("Неверный старый пароль");
        return;
      }
      if (NewPassword !== NewPasswordConfirm) {
        setConfirmError("Пароли не совпадают");
        return;
      }

      const response = await fetch(`${API_URL}/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          OldPassword,
          NewPassword,
          NewPasswordConfirm,
        }),
      });

      if (response.ok) {
        await AsyncStorage.setItem("password", NewPasswordConfirm);
        Toast.show({
          type: "success",
          position: "top",
          text2: i18n.t("youHaveSuccessfullyChangedYourPassword"),
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
        navigation.navigate("Главная страница");
      } else {
        console.log("Ошибка", "Не удалось изменить пароль.");
      }
    } catch (error) {
      console.error("Не удалось изменить пароль.", error);
    }
  };

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
          <View style={{ marginBottom: 40 }}>
            <Text
              style={[
                {
                  marginBottom: 10,
                  color: "#fff",
                },
                // isDarkModeEnabled ? { color: "#fff" } : { color: "#191a1d" },
              ]}
            >
              {i18n.t("oldPassword")}
            </Text>
            <Controller
              control={control}
              rules={{
                required: i18n.t("fillInTheField"),
                minLength: {
                  value: 8,
                  message: i18n.t("passwordMinLength"),
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholderTextColor={"#9c9c9c"}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                    setOldError("");
                  }}
                  placeholder="********"
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    backgroundColor: "rgba(255,255,255,0.05)",
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    borderRadius: 10,
                    borderWidth: errors.OldPassword || oldError ? 1 : 0,
                    borderColor:
                      errors.OldPassword || oldError
                        ? "red"
                        : "rgba(255,255,255,0.05)",
                  }}
                />
              )}
              name="OldPassword"
            />
            {errors.OldPassword && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {errors.OldPassword.message}
              </Text>
            )}
            {oldError && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {oldError}
              </Text>
            )}
          </View>
          <View style={{ marginBottom: 40 }}>
            <Text
              style={[
                {
                  marginBottom: 10,
                  color: "#fff",
                },
                // isDarkModeEnabled ? { color: "#fff" } : { color: "#191a1d" },
              ]}
            >
              {i18n.t("newPassword")}
            </Text>
            <Controller
              control={control}
              rules={{
                required: i18n.t("fillInTheField"),
                minLength: {
                  value: 8,
                  message: i18n.t("passwordMinLength"),
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholderTextColor={"#9c9c9c"}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                  }}
                  placeholder="********"
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    backgroundColor: "rgba(255,255,255,0.05)",
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    borderRadius: 10,
                    borderWidth: errors.NewPassword ? 1 : 0,
                    borderColor: errors.NewPassword
                      ? "red"
                      : "rgba(255,255,255,0.05)",
                  }}
                />
              )}
              name="NewPassword"
            />
            {errors.NewPassword && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {errors.NewPassword.message}
              </Text>
            )}
          </View>
          <View>
            <Text
              style={[
                {
                  marginBottom: 10,
                  color: "#fff",
                },
                // isDarkModeEnabled ? { color: "#fff" } : { color: "#191a1d" },
              ]}
            >
              {i18n.t("confirmPassword")}
            </Text>
            <Controller
              control={control}
              rules={{
                required: i18n.t("fillInTheField"),
                minLength: {
                  value: 8,
                  message: i18n.t("passwordMinLength"),
                },
                validate: (value) =>
                  value === getValues("NewPassword") || "Пароли не совпадают",
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholderTextColor={"#9c9c9c"}
                  value={value}
                  onChangeText={(text) => {
                    setConfirmError("");
                    onChange(text);
                  }}
                  placeholder="********"
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    backgroundColor: "rgba(255,255,255,0.05)",
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    borderRadius: 10,
                    borderWidth:
                      errors.NewPasswordConfirm || confirmError ? 1 : 0,
                    borderColor:
                      errors.NewPasswordConfirm || confirmError
                        ? "red"
                        : "rgba(255,255,255,0.05)",
                  }}
                />
              )}
              name="NewPasswordConfirm"
            />
            {errors.NewPasswordConfirm && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {errors.NewPasswordConfirm.message}
              </Text>
            )}
            {confirmError && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {confirmError}
              </Text>
            )}
          </View>
          {loading ? (
            <ActivityIndicator
              size="large"
              style={{ marginTop: 60 }}
              color={"#fff"}
            />
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(handleChangePassword)}
              disabled={loading}
              style={{
                marginTop: 50,
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

export default ChangePassword;
