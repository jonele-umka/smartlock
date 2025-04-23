import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { TouchableOpacity, ActivityIndicator, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import i18n from "../../../../i18n/i18n";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "../../../components/CustomText/CustomText";
import CustomInput from "../../../components/CustomInput/CustomInput";

const CreateNewPassword = () => {
  const route = useRoute();
  const { email } = route?.params;
  // const email = "iji";
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      Email: email,
    },
  });
  console.log(email);
  const API_URL = process.env.API_URL;

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [confirmError, setConfirmError] = useState("");

  const handleChangePassword = async () => {
    try {
      const Email = getValues("Email");
      const NewPassword = getValues("NewPassword");
      const NewPasswordConfirm = getValues("NewPasswordConfirm");
      setLoading(true);

      if (NewPassword !== NewPasswordConfirm) {
        setConfirmError(i18n.t("passwordsDontMatch"));
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/create_new_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Email,
          NewPassword,
          NewPasswordConfirm,
        }),
      });

      if (response.ok) {
        await AsyncStorage.setItem("password", NewPasswordConfirm);
        setLoading(false);

        Toast.show({
          type: "success",
          position: "bottom",
          text2: i18n.t("editPassword"),
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });

        reset();
        navigation.reset({
          index: 0,
          routes: [{ name: "Войти" }],
        });
      } else {
        setLoading(false);
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
      <CustomText style={{ fontSize: 18, marginBottom: 30, fontWeight: "600" }}>
        {i18n.t("enterNewPassword")}
      </CustomText>

      <View style={{ marginBottom: 20 }}>
        <CustomText
          style={{ marginBottom: 15, fontWeight: "500", fontSize: 16 }}
        >
          {i18n.t("email")}
        </CustomText>
        <Controller
          control={control}
          name="Email"
          rules={{
            required: i18n.t("required"),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: i18n.t("validEmail"),
            },
          }}
          render={({ field }) => (
            <CustomInput
              placeholder={i18n.t("enterEmail")}
              onChange={(value) => {
                field.onChange(value);
                setOldError("");
              }}
              value={field.value}
            />
          )}
        />
        {errors.Email && (
          <CustomText style={{ color: "red", fontSize: 12 }}>
            {errors.Email.message}
          </CustomText>
        )}
      </View>

      <View style={{ marginBottom: 20 }}>
        <CustomText
          style={{ marginBottom: 15, fontWeight: "500", fontSize: 16 }}
        >
          {i18n.t("newPassword")}
        </CustomText>
        <Controller
          control={control}
          name="NewPassword"
          rules={{
            required: i18n.t("required"),
            minLength: { value: 8, message: i18n.t("minPassword") },
            pattern: {
              value: /^[^\sа-яА-Я]+$/i,
              message: i18n.t("enterLatin"),
            },
          }}
          render={({ field }) => (
            <CustomInput
              placeholder="********"
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
        {errors.NewPassword && (
          <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
            {errors.NewPassword.message}
          </CustomText>
        )}
      </View>

      <View>
        <CustomText
          style={{ marginBottom: 15, fontWeight: "500", fontSize: 16 }}
        >
          {i18n.t("confirmNewPassword")}
        </CustomText>
        <Controller
          control={control}
          name="NewPasswordConfirm"
          rules={{
            required: i18n.t("required"),
            minLength: { value: 8, message: i18n.t("minPassword") },
            pattern: {
              value: /^[^\sа-яА-Я]+$/i,
              message: i18n.t("enterLatin"),
            },
          }}
          render={({ field }) => (
            <CustomInput
              placeholder="********"
              onChange={(value) => {
                field.onChange(value);
                setConfirmError("");
              }}
              value={field.value}
            />
          )}
        />
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
            {i18n.t("send")}
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CreateNewPassword;
