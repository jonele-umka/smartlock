import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail } from "../../../Store/authSlice/authSlice";
import {
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import i18n from "../../../../i18n/i18n";
import Feather from "react-native-vector-icons/Feather";
import CustomText from "../../../components/CustomText/CustomText";
import { ScrollView } from "react-native";
import Toast from "react-native-toast-message";

const SignUpEmail = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useSelector((state) => state.auth.loading);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(sendEmail(data));
      if (response.type === "auth/sendEmail/fulfilled") {
        navigation.navigate("Код подтверждения", { email: data.Email });
        reset();
        setError("");
      } else {
        Toast.show({
          type: "error",
          position: "bottom",
          text2: response.payload,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
        setError(response.payload);
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      setError(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: "#fff" }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("../../../assets/apkIcons/logo.png")}
          style={{
            marginBottom: 80,
            alignSelf: "center",
            objectFit: "contain",
          }}
        />

        {/* Email Field */}
        <View style={{ marginBottom: 20 }}>
          <CustomText>{i18n.t("email")}</CustomText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 0.5,
              borderColor: errors.Email ? "red" : "#dee2f1",
              paddingHorizontal: 10,
              borderRadius: 50,
              paddingVertical: 10,
              marginTop: 12,
              gap: 5,
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
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder={i18n.t("enterEmail")}
                  placeholderTextColor="#616992"
                  onChangeText={(text) => {
                    let formattedText = text.trim();
                    formattedText =
                      formattedText.charAt(0).toLowerCase() +
                      formattedText.slice(1);
                    onChange(formattedText);
                    setError("");
                  }}
                  value={value}
                  style={{ flex: 1, color: "#1C2863", fontSize: 14 }}
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

        {/* Nickname Field */}
        <View style={{ marginBottom: 20 }}>
          <CustomText>{i18n.t("nickname")}</CustomText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 0.5,
              borderColor: errors.Nickname ? "red" : "#dee2f1",
              paddingHorizontal: 10,
              borderRadius: 50,
              paddingVertical: 10,
              marginTop: 12,
              gap: 5,
            }}
          >
            <Feather name="user" style={{ color: "#616992", fontSize: 20 }} />
            <Controller
              control={control}
              name="Nickname"
              rules={{
                required: i18n.t("required"),
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder={i18n.t("enterNickname")}
                  placeholderTextColor="#616992"
                  onChangeText={onChange}
                  value={value}
                  style={{ flex: 1, color: "#1C2863", fontSize: 14 }}
                />
              )}
            />
          </View>
          {errors.Nickname && (
            <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
              {errors.Nickname.message}
            </CustomText>
          )}
        </View>

        {/* Password Field */}
        <View style={{ marginBottom: 20 }}>
          <CustomText>{i18n.t("password")}</CustomText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 0.5,
              borderColor: errors.Password ? "red" : "#dee2f1",
              paddingHorizontal: 10,
              borderRadius: 50,
              paddingVertical: 10,
              marginTop: 12,
              gap: 5,
            }}
          >
            <Feather name="lock" style={{ color: "#616992", fontSize: 20 }} />
            <Controller
              control={control}
              name="Password"
              rules={{
                required: i18n.t("required"),
                minLength: { value: 8, message: i18n.t("minPassword") },
                pattern: {
                  value: /^[^\sа-яА-Я]+$/i,
                  message: i18n.t("enterLatin"),
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder={i18n.t("enterPassword")}
                  placeholderTextColor="#616992"
                  secureTextEntry={!showPassword}
                  onChangeText={onChange}
                  value={value}
                  style={{ flex: 1, color: "#1C2863", fontSize: 14 }}
                />
              )}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                style={{ color: "#616992", fontSize: 20 }}
              />
            </TouchableOpacity>
          </View>
          {errors.Password && (
            <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
              {errors.Password.message}
            </CustomText>
          )}
        </View>

        {/* PasswordConfirm Field */}
        <View style={{ marginBottom: 20 }}>
          <CustomText>{i18n.t("confirmYourPassword")}</CustomText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 0.5,
              borderColor: errors.PasswordConfirm ? "red" : "#dee2f1",
              paddingHorizontal: 10,
              borderRadius: 50,
              paddingVertical: 10,
              marginTop: 12,
              gap: 5,
            }}
          >
            <Feather name="lock" style={{ color: "#616992", fontSize: 20 }} />
            <Controller
              control={control}
              name="PasswordConfirm"
              rules={{
                required: i18n.t("required"),
                minLength: { value: 8, message: i18n.t("minPassword") },
                pattern: {
                  value: /^[^\sа-яА-Я]+$/i,
                  message: i18n.t("enterLatin"),
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder={i18n.t("confirmYourPassword")}
                  placeholderTextColor="#616992"
                  secureTextEntry={!showConfirmPassword}
                  onChangeText={onChange}
                  value={value}
                  style={{ flex: 1, color: "#1C2863", fontSize: 14 }}
                />
              )}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Feather
                name={showConfirmPassword ? "eye" : "eye-off"}
                style={{ color: "#616992", fontSize: 20 }}
              />
            </TouchableOpacity>
          </View>
          {errors.PasswordConfirm && (
            <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
              {errors.PasswordConfirm.message}
            </CustomText>
          )}
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
              backgroundColor: "#4B5DFF",
              paddingVertical: 15,
              textAlign: "center",
              borderRadius: 10,
            }}
          >
            <CustomText
              style={{ color: "#fff", textAlign: "center", fontSize: 20 }}
            >
              {i18n.t("register")}
            </CustomText>
          </TouchableOpacity>
        )}

        {error === "exception:password no match with password confirmation" && (
          <CustomText
            style={{
              color: "red",
              fontSize: 12,
              marginTop: 7,
              textAlign: "center",
            }}
          >
            {i18n.t("passwordsDontMatch")}
          </CustomText>
        )}
        {error === "User with this email already exists" && (
          <CustomText
            style={{
              color: "red",
              fontSize: 12,
              marginTop: 7,
              textAlign: "center",
            }}
          >
            {i18n.t("userExist")}
          </CustomText>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpEmail;
