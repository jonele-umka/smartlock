import React, { useState, useEffect, useRef } from "react";
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
import i18n from "../../../components/i18n/i18n";
import { useNavigation, useRoute } from "@react-navigation/core";
import { resendCode, verifyCode } from "../../../Store/authSlice/authSlice";
import { LinearGradient } from "expo-linear-gradient";

const ConfirmCode = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const route = useRoute();
  const API_URL = process.env.API_URL;
  const token = useSelector((state) => state.auth.token);

  const inputs = useRef([]);

  const onSubmit = async (data) => {
    const code = Object.values(data).join("");
    console.log("code", code);
    try {
      const response = await fetch(
        `${API_URL}/api/auth/confirm_change_email/${code}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        navigation.navigate("Редактировать профиль");
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.error || "Произошла ошибка");
      }
    } catch (error) {
      console.error("Ошибка при подтверждении изменения email:", error);
      setError(error.message);
    }
  };

  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <SafeAreaWrapper style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
        <Text
          style={{
            fontSize: 40,
            marginBottom: 30,
            color: "#000",
            fontWeight: "600",
          }}
        >
          {i18n.t("enterACode")}
        </Text>
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
                    borderColor: errors[`code${index}`] ? "red" : "#000",
                    textAlign: "center",
                    fontSize: 18,
                    color: "#000",
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
          <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
            {errors.code.message}
          </Text>
        )}
        {error === "exception:wrong-verification-code" && (
          <Text style={{ color: "red", fontSize: 12, marginTop: 15 }}>
            {i18n.t("invalidPassword")}
          </Text>
        )}

        {error === "invalid activation code" && (
          <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
            {i18n.t("inСorrectCode")}
          </Text>
        )}
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginTop: 40 }}
            color={"#02AAB0"}
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
              marginTop: 30,
            }}
          >
            <LinearGradient
              colors={["#02AAB0", "#00CDAC"]}
              style={{
                paddingVertical: 15,
                textAlign: "center",
                borderRadius: 10,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                Отправить
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaWrapper>
  );
};

export default ConfirmCode;
