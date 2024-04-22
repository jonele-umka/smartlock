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
<<<<<<< HEAD
import Feather from "react-native-vector-icons/Feather";
=======
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086

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
  // const loading = useSelector((state) => state.signIn.loading);
  const [error, setError] = useState("");
  const route = useRoute();
  const { email } = route.params;

  const onSubmit = async (codeVerify) => {
    const code = codeVerify.code;

    try {
      await dispatch(verifyCode(email, code));
      // navigation.navigate("Войти");
    } catch (errors) {
      setError(errors.message);
    }
  };

  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <LinearGradient
      style={[
<<<<<<< HEAD
        { flex: 1, backgroundColor: "#fff" },
=======
        { flex: 1 },
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
        // isDarkModeEnabled && { backgroundColor: "#191a1d" },
      ]}
      start={{ x: 2.4, y: 1.1 }}
      end={{ x: 0, y: 0 }}
      colors={["#241270", "#140A4F", "#000"]}
    >
<<<<<<< HEAD
      <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
        <Text
          style={{
            fontSize: 40,
            marginBottom: 30,
            color: "#000",
            fontWeight: 600,
          }}
        >
          {i18n.t("enterACode")}
        </Text>

        <View>
          <Controller
            control={control}
            name="code"
=======
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
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
            rules={{
              required: i18n.t("fillInTheField"),
              pattern: {
                required: true,
                pattern: /^[0-9]{6}$/,
                maxLength: 6,
<<<<<<< HEAD
                message: i18n.t("pleaseEnterAValidCode"),
              },
            }}
            render={({ field }) => (
              <TextInput
                placeholder={i18n.t("enterACode")}
                placeholderTextColor="#b8b8b8"
                onChangeText={(value) => {
                  field.onChange(value);
                  setError("");
                }}
                keyboardType={"numeric"}
                maxLength={6}
                value={field.value}
                style={{
                  color: "#000",
                  fontSize: 14,
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#000",
                  paddingRight: 10,
                  paddingVertical: 10,
                  borderBottomColor: errors.code ? "red" : "#000",
                }}
              />
            )}
          />

=======
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
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
          {errors.code && (
            <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
              {errors.code.message}
            </Text>
          )}
<<<<<<< HEAD
          {error === "invalid activation code" && (
=======
          {error == 400 && (
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
            <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
              {i18n.t("inСorrectCode")}
            </Text>
          )}
<<<<<<< HEAD
        </View>
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginTop: 40 }}
            color={"#000"}
          />
        ) : (
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
            style={{
              marginTop: 30,
              padding: 15,
              backgroundColor: "#000",
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.3,
              shadowRadius: 10,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center", fontSize: 20 }}>
              {i18n.t("next")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaWrapper>
=======
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
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
  );
};

export default SignUpCode;
