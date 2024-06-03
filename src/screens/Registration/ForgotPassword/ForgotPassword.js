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
import i18n from "../../../components/i18n/i18n";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";

const ForgotPassword = () => {
  //   const isDarkModeEnabled = useSelector(
  //     (state) => state.theme.isDarkModeEnabled
  //   );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = process.env.API_URL;

  const onSubmit = async (email) => {
    console.log(email.Email);
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/auth/forgot_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      });

      if (!response.ok) {
        const responseDataError = await response.json();
        const errorMessage = responseDataError.error.Code || "Произошла ошибка";
        setError(errorMessage);
        setLoading(false);
      }
      const responseData = await response.json();
      navigation.navigate("Подтвердить код", { email: email.Email });
      setLoading(false);

      return responseData;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <SafeAreaWrapper
      style={[
        { flex: 1, backgroundColor: "#fff" },

        // isDarkModeEnabled && { backgroundColor: "#191a1d" },
      ]}
      start={{ x: 2.4, y: 1.1 }}
      end={{ x: 0, y: 0 }}
      colors={["#241270", "#140A4F", "#000"]}
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
          {i18n.t("enterEmail")}
        </Text>
        <View
          style={{
            marginBottom: 10,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
                borderBottomWidth: 0.5,
                borderBottomColor: "#000",
                paddingRight: 10,
                paddingVertical: 10,
                borderBottomColor:
                  errors.email || error === "user already exists"
                    ? "red"
                    : "#000",
              }}
            >
              <Feather name="mail" style={{ color: "#b8b8b8", fontSize: 20 }} />
              <Controller
                control={control}
                name="Email"
                rules={{
                  required: i18n.t("fillInThisField"),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: i18n.t("pleaseEnterAValidEmailAddress"),
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    placeholder={i18n.t("enterEmail")}
                    placeholderTextColor="#b8b8b8"
                    onChangeText={(value) => {
                      field.onChange(value);
                      setError("");
                    }}
                    value={field.value}
                    style={{
                      flex: 1,
                      color: "#000",
                      fontSize: 14,
                    }}
                  />
                )}
              />
            </View>
            {errors.email && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {errors.email.message}
              </Text>
            )}
            {error == 400 && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                Некорректные данные
              </Text>
            )}
          </View>
        </View>

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

export default ForgotPassword;
