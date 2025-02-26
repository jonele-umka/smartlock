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
import CustomInput from "../../components/CustomInput/CustomInput";

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
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}
    >
      <CustomText style={{ fontSize: 40, marginBottom: 30, fontWeight: "600" }}>
        Сменить пароль
      </CustomText>

      {/** Старый пароль */}
      <View style={{ marginBottom: 20 }}>
        <CustomText
          style={{ marginBottom: 15, fontWeight: "500", fontSize: 16 }}
        >
          Старый пароль
        </CustomText>
        <Controller
          control={control}
          name="CurrentPassword"
          rules={{
            required: "Заполните поле",
            minLength: { value: 8, message: "Минимум 8 символов" },
            pattern: {
              value: /^[^\sа-яА-Я]+$/i,
              message: "Введите на латинице",
            },
          }}
          render={({ field }) => (
            <CustomInput
              placeholder="********"
              secureTextEntry
              onChange={(value) => {
                field.onChange(value);
                setOldError("");
              }}
              value={field.value}
            />
          )}
        />
        {errors.CurrentPassword && (
          <CustomText style={{ color: "red", fontSize: 12 }}>
            {errors.CurrentPassword.message}
          </CustomText>
        )}
        {oldError && (
          <CustomText style={{ color: "red", fontSize: 12 }}>
            {oldError}
          </CustomText>
        )}
      </View>

      {/** Новый пароль */}
      <View style={{ marginBottom: 20 }}>
        <CustomText
          style={{ marginBottom: 15, fontWeight: "500", fontSize: 16 }}
        >
          Новый пароль
        </CustomText>
        <Controller
          control={control}
          name="NewPassword"
          rules={{
            required: "Заполните поле",
            minLength: { value: 8, message: "Минимум 8 символов" },
            pattern: {
              value: /^[^\sа-яА-Я]+$/i,
              message: "Введите на латинице",
            },
          }}
          render={({ field }) => (
            <CustomInput
              placeholder="********"
              secureTextEntry
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
        {errors.NewPassword && (
          <CustomText style={{ color: "red", fontSize: 12 }}>
            {errors.NewPassword.message}
          </CustomText>
        )}
      </View>

      {/** Подтверждение пароля */}
      <View>
        <CustomText
          style={{ marginBottom: 15, fontWeight: "500", fontSize: 16 }}
        >
          Подтверждение пароля
        </CustomText>
        <Controller
          control={control}
          name="NewPasswordConfirm"
          rules={{
            required: "Заполните поле",
            minLength: { value: 8, message: "Минимум 8 символов" },
            pattern: {
              value: /^[^\sа-яА-Я]+$/i,
              message: "Введите на латинице",
            },
          }}
          render={({ field }) => (
            <CustomInput
              placeholder="********"
              secureTextEntry
              onChange={(value) => {
                field.onChange(value);
                setConfirmError("");
              }}
              value={field.value}
            />
          )}
        />
        {errors.NewPasswordConfirm && (
          <CustomText style={{ color: "red", fontSize: 12 }}>
            {errors.NewPasswordConfirm.message}
          </CustomText>
        )}
        {confirmError && (
          <CustomText style={{ color: "red", fontSize: 12 }}>
            {confirmError}
          </CustomText>
        )}
      </View>

      {/** Кнопка */}
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
            backgroundColor: "#4B5DFF",
          }}
        >
          <CustomText
            style={{ color: "#fff", textAlign: "center", fontSize: 20 }}
          >
            Далее
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ChangePassword;
