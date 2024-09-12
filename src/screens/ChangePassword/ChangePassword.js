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

import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "../../components/CustomText/CustomText";
import SafeAreaWrapper from "../../components/SafeAreaWrapper/SafeAreaWrapper";

const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const API_URL = process.env.API_URL;

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
        <CustomText
          style={{
            fontSize: 40,
            marginBottom: 30,
            fontWeight: 600,
          }}
        >
          Сменить пароль
        </CustomText>

        <View
          style={{
            marginBottom: 10,
          }}
        >
          <View style={{ marginBottom: 20 }}>
            <CustomText
              style={{ marginBottom: 15, fontWeight: 500, fontSize: 16 }}
            >
              Старый пароль
            </CustomText>
            <View>
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
                    placeholderTextColor="#616992"
                    onChangeText={(value) => {
                      field.onChange(value);
                      setOldError("");
                    }}
                    value={field.value}
                    style={{
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      borderColor:
                        errors.password_confirm === "passwords do not match"
                          ? "red"
                          : "#dee2f1",
                      color: "#1C2863",
                      fontSize: 14,
                    }}
                  />
                )}
              />
            </View>
            {errors.CurrentPassword && (
              <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {errors.CurrentPassword.message}
              </CustomText>
            )}
            {oldError && (
              <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {oldError}
              </CustomText>
            )}
          </View>
          <View style={{ marginBottom: 20 }}>
            <CustomText
              style={{ marginBottom: 15, fontWeight: 500, fontSize: 16 }}
            >
              Новый пароль
            </CustomText>
            <View>
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
                    placeholderTextColor="#616992"
                    onChangeText={(value) => {
                      field.onChange(value);
                      //   setError("");
                    }}
                    value={field.value}
                    style={{
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      borderColor:
                        errors.password_confirm === "passwords do not match"
                          ? "red"
                          : "#dee2f1",
                      color: "#1C2863",
                      fontSize: 14,
                    }}
                  />
                )}
              />
            </View>
            {errors.NewPassword && (
              <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {errors.NewPassword.message}
              </CustomText>
            )}
          </View>
          <View>
            <CustomText
              style={{ marginBottom: 15, fontWeight: 500, fontSize: 16 }}
            >
              Подтверждение пароля
            </CustomText>
            <View>
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
                    placeholderTextColor="#616992"
                    onChangeText={(value) => {
                      field.onChange(value);
                      setConfirmError("");
                    }}
                    value={field.value}
                    style={{
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      borderColor:
                        errors.password_confirm === "passwords do not match"
                          ? "red"
                          : "#dee2f1",
                      color: "#1C2863",
                      fontSize: 14,
                    }}
                  />
                )}
              />
            </View>
            {errors.NewPasswordConfirm && (
              <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {errors.NewPasswordConfirm.message}
              </CustomText>
            )}
            {confirmError && (
              <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {confirmError}
              </CustomText>
            )}
          </View>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginTop: 40 }}
            color={"#4B5DFF"}
          />
        ) : (
          <TouchableOpacity
            onPress={handleSubmit(handleChangePassword)}
            disabled={loading}
            style={{
              marginTop: 30,
              padding: 15,
              borderRadius: 10,
              shadowColor: "#000",
              marginBottom: 30,
              backgroundColor: "#4B5DFF",
            }}
          >
            <CustomText
              style={{ color: "#fff", textAlign: "center", fontSize: 20 }}
            >
              {i18n.t("next")}
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaWrapper>
  );
};

export default ChangePassword;
