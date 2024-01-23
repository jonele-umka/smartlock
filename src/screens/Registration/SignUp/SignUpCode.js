import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { verifyCode } from "../../../Store/SignIn/SignInAction";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import i18n from "../../../components/i18n/i18n";

import { useNavigation, useRoute } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";

const SignUpCode = () => {
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useSelector((state) => state.signIn.loading);
  const [error, setError] = useState("");

  const route = useRoute();
  const { email } = route.params;
  const onSubmit = async (data) => {
    try {
      await dispatch(verifyCode(data.code));
      navigation.navigate("Регистрация", { email: email });
    } catch (error) {
      setError(error.message);
    }
  };

  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <LinearGradient
      style={[
        { flex: 1 },
        // isDarkModeEnabled && { backgroundColor: "#191a1d" },
      ]}
      start={{ x: 2.4, y: 1.1 }}
      end={{ x: 0, y: 0 }}
      colors={["#241270", "#140A4F", "#000"]}
    >
      <SafeAreaWrapper
        style={[
          { flex: 1 },
          isDarkModeEnabled && { backgroundColor: "#191a1d" },
        ]}
      >
        <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
          <Text
            style={[
              {
                fontSize: 20,
                textAlign: "center",
                marginBottom: 30,
                paddingTop: 10,
                color: "#fff",
              },
              // isDarkModeEnabled ? { color: "#fff" } : { color: "#191a1d" },
            ]}
          >
            {i18n.t("enterACode")}
          </Text>
          <Controller
            control={control}
            rules={{
              required: i18n.t("fillInTheField"),
              pattern: {
                required: true,
                pattern: /^[0-9]{6}$/,
                maxLength: 6,
                // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: i18n.t("pleaseEnterAValidCode"),
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  setError("");
                }}
                placeholder={i18n.t("enterACode")}
                placeholderTextColor={"#9c9c9c"}
                maxLength={6}
                keyboardType={"numeric"}
                style={{
                  color: "#fff",
                  fontSize: 16,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderRadius: 10,
                  borderWidth: errors.code || error == 400 ? 1 : 0,
                  borderColor:
                    errors.code || error == 400
                      ? "red"
                      : "rgba(255,255,255,0.05)",
                }}
              />
            )}
            name="code"
          />
          {errors.code && (
            <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
              {errors.code.message}
            </Text>
          )}
          {error == 400 && (
            <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
              {i18n.t("inСorrectCode")}
            </Text>
          )}
          {/* {error === "exception:wrong-verification-code" && error && (
          <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
            Неверный код
          </Text>
        )} */}
          {loading ? (
            <ActivityIndicator
              size="large"
              style={{ marginTop: 30 }}
              color={"#fff"}
            />
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              style={{
                marginTop: 20,
                padding: 15,
                backgroundColor: "#5d00e6",
                borderRadius: 10,
                shadowColor: "#5d00e6",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                elevation: 5,
              }}
            >
              <Text
                style={{ color: "#fff", textAlign: "center", fontSize: 20 }}
              >
                {i18n.t("next")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaWrapper>
    </LinearGradient>
  );
};

export default SignUpCode;
