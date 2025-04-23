import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
  ScrollView,
} from "react-native";

import { useNavigation } from "@react-navigation/core";
import i18n from "../../../../i18n/i18n";
import Feather from "react-native-vector-icons/Feather";
import CustomText from "../../../components/CustomText/CustomText";

const ChangeEmail = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.token);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.API_URL;

  const onSubmit = async (email) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/change_email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: email.Email }),
      });

      if (response.ok) {
        setLoading(false);
        // const result = await response.json();
        navigation.navigate("Подтверждение кода");
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.error || "Произошла ошибка");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Ошибка при изменении email:", error);
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
      <CustomText
        style={{
          fontSize: 18,
          marginBottom: 30,
          fontWeight: 600,
        }}
      >
        {i18n.t("changeEmail")}
      </CustomText>
      <View>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 5,
              paddingRight: 10,
              paddingVertical: 10,
              borderWidth: 1,
              paddingHorizontal: 10,
              borderRadius: 10,
              borderColor: errors.Email ? "red" : "#dee2f1",
            }}
          >
            <Feather name="mail" style={{ color: "#616992", fontSize: 20 }} />
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
                <TextInput
                  placeholder={i18n.t("enterEmail")}
                  placeholderTextColor="#616992"
                  onChangeText={(value) => {
                    const trimmedValue = value.trim();
                    const formattedValue =
                      trimmedValue.charAt(0).toLowerCase() +
                      trimmedValue.slice(1);
                    field.onChange(formattedValue);
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
            marginTop: 30,
            paddingVertical: 15,
            textAlign: "center",
            borderRadius: 10,
            backgroundColor: "#4B5DFF",
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
      {error == 400 && (
        <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
          {i18n.t("validEmail")}
        </CustomText>
      )}
    </ScrollView>
  );
};

export default ChangeEmail;
