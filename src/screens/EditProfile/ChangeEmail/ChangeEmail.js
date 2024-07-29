import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail } from "../../../Store/authSlice/authSlice";
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
import i18n from "../../../components/i18n/i18n";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";

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
        const result = await response.json();
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
                borderBottomColor: errors.Email ? "red" : "#000",
              }}
            >
              <Feather name="mail" style={{ color: "#b8b8b8", fontSize: 20 }} />
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
            {errors.Email && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {errors.Email.message}
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
        {error == 400 && (
          <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
            {i18n.t("invalidEmail")}
          </Text>
        )}
      </View>
    </SafeAreaWrapper>
  );
};

export default ChangeEmail;
