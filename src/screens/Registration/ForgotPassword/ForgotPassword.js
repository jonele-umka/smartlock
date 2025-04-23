import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import {
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/core";
import i18n from "../../../../i18n/i18n";
import Feather from "react-native-vector-icons/Feather";
import SafeAreaWrapper from "../../../components/SafeAreaWrapper/SafeAreaWrapper";
import CustomText from "../../../components/CustomText/CustomText";

const ForgotPassword = () => {
  //   const isDarkModeEnabled = useSelector(
  //     (state) => state.theme.isDarkModeEnabled
  //   );
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = process.env.API_URL;

  const onSubmit = async (email) => {
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
        console.log(responseDataError);
        const errorMessage = responseDataError.error.Code || "Произошла ошибка";
        setError(errorMessage);
        setLoading(false);
      }
      const responseData = await response.json();
      navigation.navigate("Код забыли пароль", { email: email.Email });
      setLoading(false);
      reset();
      return responseData;
    } catch (error) {
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
            fontSize: 18,
            marginBottom: 20,

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
                borderColor: errors.Email ? "red" : "#dee2f1",
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
                      color: "#000",
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
            {error == 400 && (
              <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {i18n.t("invalidData")}
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
      </View>
    </SafeAreaWrapper>
  );
};

export default ForgotPassword;
