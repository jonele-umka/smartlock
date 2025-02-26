import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Image,
} from "react-native";

import i18n from "../../../components/i18n/i18n";
import { useNavigation } from "@react-navigation/core";
import { verifyCode } from "../../../Store/authSlice/authSlice";

import CustomText from "../../../components/CustomText/CustomText";
import SafeAreaWrapper from "../../../components/SafeAreaWrapper/SafeAreaWrapper";
import { ScrollView } from "react-native";

const SignUpCode = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useSelector((state) => state.auth.loading);
  const [error, setError] = useState("");
  const [canResend, setCanResend] = useState(true);
  const [timer, setTimer] = useState(60);
  // const route = useRoute();
  // const { email } = route.params;

  const inputs = useRef([]);

  useEffect(() => {
    let interval;
    if (!canResend) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 60;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [canResend]);

  const resend = async () => {
    try {
      // await dispatch(resendCode(email));
      setCanResend(false);
    } catch (error) {
      console.error("Ошибка при повторной отправке кода:", error);
      setError(error.message);
    }
  };

  const onSubmit = async (data) => {
    const code = Object.values(data).join("");

    try {
      const response = await dispatch(verifyCode(code));

      if (response.type === "auth/verifyCode/fulfilled") {
        navigation.navigate("Войти");
      } else {
        setError(response.payload);
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      setError(error.message);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <SafeAreaWrapper>
        <Image
          source={require("../../../assets/apkIcons/logo.png")}
          style={{
            marginBottom: 80,
            alignSelf: "center",
            objectFit: "contain",
          }}
        />
        <CustomText
          style={{
            fontSize: 30,
            marginBottom: 20,
            fontWeight: 600,
          }}
        >
          {i18n.t("enterACode")}
        </CustomText>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[...Array(6)].map((_, index) => (
            <Controller
              key={index}
              control={control}
              name={`code${index}`}
              rules={{
                required: i18n.t("fillInTheField"),
                pattern: {
                  value: /^[0-9]$/,
                  message: i18n.t("pleaseEnterAValidCode"),
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  ref={(el) => (inputs.current[index] = el)}
                  style={{
                    width: 40,
                    height: 40,
                    borderBottomWidth: 1,
                    borderColor: errors[`code${index}`] ? "red" : "#dee2f1",
                    textAlign: "center",
                    fontSize: 18,
                    color: "#1C2863",
                  }}
                  keyboardType="numeric"
                  maxLength={1}
                  onBlur={onBlur}
                  onChangeText={(val) => {
                    onChange(val);
                    setError("");
                    if (val) {
                      if (index < 5) {
                        inputs.current[index + 1].focus();
                      }
                    } else if (index > 0) {
                      inputs.current[index - 1].focus();
                    }
                  }}
                  value={value}
                />
              )}
            />
          ))}
        </View>
        {errors.code && (
          <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
            {errors.code.message}
          </CustomText>
        )}
        {error === "exception:wrong-verification-code" && (
          <CustomText style={{ color: "red", fontSize: 12, marginTop: 15 }}>
            Неправильный пароль
          </CustomText>
        )}
        {canResend ? (
          <TouchableOpacity onPress={resend}>
            <CustomText
              style={{ color: "#007bff", fontSize: 18, marginTop: 20 }}
            >
              Отправить код повторно
            </CustomText>
          </TouchableOpacity>
        ) : (
          <CustomText style={{ color: "#1C2863", marginTop: 20 }}>
            Повторная отправка кода возможна через {timer} секунд
          </CustomText>
        )}
        {error === "invalid activation code" && (
          <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
            Неверный код
          </CustomText>
        )}
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
              Зарегистрироваться
            </CustomText>
          </TouchableOpacity>
        )}
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default SignUpCode;
