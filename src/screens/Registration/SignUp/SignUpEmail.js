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
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import i18n from "../../../components/i18n/i18n";
import Feather from "react-native-vector-icons/Feather";
import CustomText from "../../../components/CustomText/CustomText";
import SafeAreaWrapper from "../../../components/SafeAreaWrapper/SafeAreaWrapper";
import { registrationFields } from "../../../assets/data/Fields";
import { ScrollView } from "react-native";

const SignUpEmail = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useSelector((state) => state.auth.loading);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Состояние для отображения пароля
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Состояние для отображения пароля подтверждения

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(sendEmail(data));
      if (response.type === "auth/sendEmail/fulfilled") {
        navigation.navigate("Код подтверждения", { email: data.Email });
      } else {
        setError(response.payload);
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      setError(error.message);
    }
  };

  return (
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
      <SafeAreaWrapper>
        <Image
          source={require("../../../assets/apkIcons/logo.png")}
          style={{
            marginBottom: 80,
            alignSelf: "center",
            objectFit: "contain",
          }}
        />

        {registrationFields.map((field) => (
          <View key={field.name} style={{ marginBottom: 20 }}>
            <CustomText>{field.label}</CustomText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 0.5,
                borderColor: errors[field.name] ? "red" : "#dee2f1",
                paddingHorizontal: 10,
                borderRadius: 50,
                paddingVertical: 10,
                marginTop: 12,
                gap: 5,
              }}
            >
              <Feather
                name={field.icon}
                style={{ color: "#616992", fontSize: 20 }}
              />
              <Controller
                control={control}
                name={field.name}
                rules={field.rules}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder={field.placeholder}
                    placeholderTextColor="#616992"
                    onChangeText={(text) => {
                      onChange(text);
                      setError("");
                    }}
                    value={value}
                    style={{ flex: 1, color: "#1C2863", fontSize: 14 }}
                    // secureTextEntry={
                    //   (field.name === "Password" && !showPassword) ||
                    //   (field.name === "PasswordConfirm" && !showConfirmPassword)
                    // }
                  />
                )}
              />
              {field.name === "Password" && (
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Feather
                    name={showPassword ? "eye" : "eye-off"}
                    style={{ color: "#616992", fontSize: 20 }}
                  />
                </TouchableOpacity>
              )}
              {field.name === "PasswordConfirm" && (
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Feather
                    name={showConfirmPassword ? "eye" : "eye-off"}
                    style={{ color: "#616992", fontSize: 20 }}
                  />
                </TouchableOpacity>
              )}
            </View>
            {errors[field.name] && (
              <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {errors[field.name].message}
              </CustomText>
            )}
          </View>
        ))}
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
              Зарегистрироваться
            </CustomText>
          </TouchableOpacity>
        )}
        {error && (
          <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
            {i18n.t("invalidEmail")}
          </CustomText>
        )}
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default SignUpEmail;
