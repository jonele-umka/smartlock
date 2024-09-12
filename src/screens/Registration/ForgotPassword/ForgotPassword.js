import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import {
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/core";
import i18n from "../../../components/i18n/i18n";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import SafeAreaWrapper from "../../../components/SafeAreaWrapper/SafeAreaWrapper";
import CustomText from "../../../components/CustomText/CustomText";

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
            color: "#000",
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
                borderColor: errors.email ? "red" : "#dee2f1",
              }}
            >
              <Feather name="mail" style={{ color: "#616992", fontSize: 20 }} />
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
                    placeholderTextColor="#616992"
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
              <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {errors.email.message}
              </CustomText>
            )}
            {error == 400 && (
              <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                Некорректные данные
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
              backgroundColor: "#252525",
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
      </View>
    </SafeAreaWrapper>
  );
};

export default ForgotPassword;
