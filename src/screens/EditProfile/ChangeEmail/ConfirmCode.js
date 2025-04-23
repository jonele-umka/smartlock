import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";

import i18n from "../../../../i18n/i18n";
import { useNavigation } from "@react-navigation/core";

import CustomText from "../../../components/CustomText/CustomText";
import SafeAreaWrapper from "../../../components/SafeAreaWrapper/SafeAreaWrapper";

const ConfirmCode = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = process.env.API_URL;
  const token = useSelector((state) => state.auth.token);

  const inputs = useRef([]);

  const onSubmit = async (data) => {
    const code = Object.values(data).join("");
    setLoading(true);
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
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "Войти" }],
        });
      } else {
        setLoading(false);
        const errorResponse = await response.json();

        setError(errorResponse.error.Message || "Произошла ошибка");
      }
    } catch (error) {
      setLoading(false);
      console.error("Ошибка при подтверждении изменения email:", error);
      setError(error.message);
    }
  };

  return (
    <SafeAreaWrapper style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
        <CustomText
          style={{
            fontSize: 18,
            marginBottom: 30,
            fontWeight: "600",
          }}
        >
          {i18n.t("enterCodeEmail")}
        </CustomText>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[...Array(6)].map((_, index) => (
            <Controller
              key={index}
              control={control}
              name={`code${index}`}
              rules={{
                required: i18n.t("required"),
                pattern: {
                  value: /^[0-9]$/,
                  message: i18n.t("required"),
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
            {i18n.t("inCorrectPassword")}
          </CustomText>
        )}

        {/* {error === "invalid activation code" && (
          <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
            {i18n.t("inСorrectCode")}
          </CustomText>
        )} */}
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
              marginTop: 30,
              textAlign: "center",
              borderRadius: 10,
              backgroundColor: "#4B5DFF",
              paddingVertical: 15,
            }}
          >
            <CustomText
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              {i18n.t("send")}
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaWrapper>
  );
};

export default ConfirmCode;
