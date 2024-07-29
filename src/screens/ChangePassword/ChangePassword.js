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
  Platform,
} from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/core";
import i18n from "../../components/i18n/i18n";
import { LinearGradient } from "expo-linear-gradient";
// import { API_URL } from "../../constants";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "react-native-vector-icons/Feather";
const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const API_URL = process.env.API_URL;
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const [confirmError, setConfirmError] = useState("");
  const [oldError, setOldError] = useState("");

  const handleChangePassword = async () => {
    setLoading(true);
    try {
      const CurrentPassword = getValues("CurrentPassword");
      const NewPassword = getValues("NewPassword");
      const NewPasswordConfirm = getValues("NewPasswordConfirm");
      const storedPassword = await AsyncStorage.getItem("password");

      if (CurrentPassword !== storedPassword) {
        setOldError("Неверный старый пароль");
        return;
      }
      if (NewPassword !== NewPasswordConfirm) {
        setConfirmError("Пароли не совпадают");
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/change_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          CurrentPassword,
          NewPassword,
          NewPasswordConfirm,
        }),
      });

      if (response.ok) {
        setLoading(false);

        // await AsyncStorage.removeItem("password");
        await AsyncStorage.setItem("password", NewPasswordConfirm);
        // Toast.show({
        //   type: "success",
        //   position: "top",
        //   text2: i18n.t("youHaveSuccessfullyChangedYourPassword"),
        //   visibilityTime: 3000,
        //   autoHide: true,
        //   topOffset: 30,
        // });
        navigation.navigate("Главная страница");
      } else {
        setLoading(false);

        console.log("Ошибка", "Не удалось изменить пароль.");
      }
    } catch (error) {
      setLoading(false);

      console.error("Не удалось изменить пароль.", error);
    }
  };

  return (
    <SafeAreaWrapper
      style={[
        { flex: 1, backgroundColor: "#fff" },
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
          Сменить пароль
        </Text>

        <View
          style={{
            marginBottom: 10,
          }}
        >
          <View style={{ marginBottom: 30 }}>
            <Text style={{ marginBottom: 15, fontWeight: 500, fontSize: 16 }}>
              Старый пароль
            </Text>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: "#000",
                paddingRight: 10,
                paddingBottom: 10,
                borderBottomColor:
                  errors.password_confirm === "passwords do not match"
                    ? "red"
                    : "#000",
              }}
            >
              <Controller
                control={control}
                name="CurrentPassword"
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
                    placeholder={"********"}
                    placeholderTextColor="#b8b8b8"
                    onChangeText={(value) => {
                      field.onChange(value);
                      setOldError("");
                    }}
                    value={field.value}
                    style={{
                      color: "#000",
                      fontSize: 14,
                    }}
                  />
                )}
              />
            </View>
            {errors.CurrentPassword && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {errors.CurrentPassword.message}
              </Text>
            )}
            {oldError && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {oldError}
              </Text>
            )}
          </View>
          <View style={{ marginBottom: 30 }}>
            <Text style={{ marginBottom: 15, fontWeight: 500, fontSize: 16 }}>
              Новый пароль
            </Text>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: "#000",
                paddingRight: 10,
                paddingBottom: 10,
                borderBottomColor:
                  errors.password_confirm === "passwords do not match"
                    ? "red"
                    : "#000",
              }}
            >
              <Controller
                control={control}
                name="NewPassword"
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
                    placeholder={"********"}
                    placeholderTextColor="#b8b8b8"
                    onChangeText={(value) => {
                      field.onChange(value);
                      //   setError("");
                    }}
                    value={field.value}
                    style={{
                      color: "#000",
                      fontSize: 14,
                    }}
                  />
                )}
              />
            </View>
            {errors.NewPassword && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {errors.NewPassword.message}
              </Text>
            )}
          </View>
          <View>
            <Text style={{ marginBottom: 15, fontWeight: 500, fontSize: 16 }}>
              Подтверждение пароля
            </Text>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: "#000",
                paddingRight: 10,
                paddingBottom: 10,
                borderBottomColor:
                  errors.password_confirm === "passwords do not match"
                    ? "red"
                    : "#000",
              }}
            >
              <Controller
                control={control}
                name="NewPasswordConfirm"
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
                    placeholder={"********"}
                    placeholderTextColor="#b8b8b8"
                    onChangeText={(value) => {
                      field.onChange(value);
                      setConfirmError("");
                    }}
                    value={field.value}
                    style={{
                      color: "#000",
                      fontSize: 14,
                    }}
                  />
                )}
              />
            </View>
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
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginTop: 40, marginBottom: 30 }}
            color={"#000"}
          />
        ) : (
          <TouchableOpacity
            onPress={handleSubmit(handleChangePassword)}
            disabled={loading}
            style={{
              marginTop: 30,
              padding: 15,
              backgroundColor: "#000",
              borderRadius: 10,
              shadowColor: "#000",
              marginBottom: 30,
              shadowOffset: {
                width: 0,
                height: 10,
              },
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center", fontSize: 20 }}>
              {i18n.t("next")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaWrapper>
  );
};

export default ChangePassword;
