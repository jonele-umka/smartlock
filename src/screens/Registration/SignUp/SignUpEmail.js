import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail } from "../../../Store/authSlice/authSlice";
import {
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/core";
import i18n from "../../../components/i18n/i18n";

import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "../../../components/CustomText/CustomText";
import SafeAreaWrapper from "../../../components/SafeAreaWrapper/SafeAreaWrapper";

const SignUpEmail = () => {
  //   const isDarkModeEnabled = useSelector(
  //     (state) => state.theme.isDarkModeEnabled
  //   );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useSelector((state) => state.auth.loading);
  const [error, setError] = useState("");

  const onSubmit = async (email) => {
    try {
      const response = await dispatch(sendEmail(email));

      if (response.type === "auth/sendEmail/fulfilled") {
        navigation.navigate("Код подтверждения", { email: email.Email });
      } else {
        setError(response.payload);
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      setError(error.message);
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
            fontSize: 30,
            marginBottom: 20,
            color: "#1C2863",
            fontWeight: 600,
          }}
        >
          {i18n.t("enterEmail")}
        </CustomText>
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
                borderWidth: 0.5,
                borderColor: "#dee2f1",
                paddingHorizontal: 10,
                borderRadius: 10,
                paddingVertical: 10,
                borderColor: errors.Email ? "red" : "#dee2f1",
              }}
            >
              <Feather name="mail" style={{ color: "#616992", fontSize: 20 }} />
              <Controller
                control={control}
                name="Email"
                rules={{
                  required: i18n.t("fillInTheField"),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: i18n.t("pleaseEnterAValidEmailAddress"),
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    placeholder={i18n.t("enterEmail")}
                    placeholderTextColor="#616992"
                    onChangeText={(value) => {
                      field.onChange(value);
                      setError("");
                    }}
                    value={field.value}
                    style={{
                      flex: 1,
                      color: "#1C2863",
                      fontSize: 14,
                    }}
                  />
                )}
              />
            </View>
            {errors.Email && (
              <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {errors.Email.message}
              </CustomText>
            )}
          </View>
          <View style={{ marginBottom: 30 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
                borderWidth: 0.5,
                borderColor: "#dee2f1",
                paddingHorizontal: 10,
                borderRadius: 10,
                paddingVertical: 10,
                borderColor: errors.Password ? "red" : "#dee2f1",
              }}
            >
              <Feather name="lock" style={{ color: "#616992", fontSize: 20 }} />
              <Controller
                control={control}
                name="Password"
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
                    placeholderTextColor="#616992"
                    onChangeText={(value) => {
                      field.onChange(value);
                      setError("");
                    }}
                    value={field.value}
                    style={{
                      color: "#1C2863",
                      fontSize: 14,
                      flex: 1,
                    }}
                  />
                )}
              />
            </View>
            {errors.Password && (
              <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {errors.Password.message}
              </CustomText>
            )}
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
                borderWidth: 0.5,
                borderColor: "#dee2f1",
                paddingHorizontal: 10,
                borderRadius: 10,
                paddingVertical: 10,
                borderColor: errors.PasswordConfirm ? "red" : "#dee2f1",
              }}
            >
              <Feather name="lock" style={{ color: "#616992", fontSize: 20 }} />
              <Controller
                control={control}
                name="PasswordConfirm"
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
                    placeholderTextColor="#616992"
                    onChangeText={(value) => {
                      field.onChange(value);
                      setError("");
                    }}
                    value={field.value}
                    style={{
                      color: "#1C2863",
                      fontSize: 14,
                      flex: 1,
                    }}
                  />
                )}
              />
            </View>
            {errors.PasswordConfirm && (
              <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {errors.PasswordConfirm.message}
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
            onPress={handleSubmit(onSubmit)}
            style={{
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              marginVertical: 30,
              backgroundColor: "#4B5DFF",
              paddingVertical: 15,
              textAlign: "center",
              borderRadius: 10,
            }}
          >
            <CustomText
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              Войти
            </CustomText>
          </TouchableOpacity>
        )}
        {error == 400 && (
          <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
            {i18n.t("invalidEmail")}
          </CustomText>
        )}
      </View>
    </SafeAreaWrapper>
  );
};

export default SignUpEmail;
