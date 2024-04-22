import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail } from "../../../Store/SignIn/SignInAction";
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
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

const SignUpEmail = () => {
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
  const onSubmit = async (data) => {
    try {
      await dispatch(sendEmail(data));
      // navigation.navigate("Код", { email: data.email });
    } catch (errors) {
      setError(errors.message);
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
          <View style={{ marginBottom: 30 }}>
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
                name="email"
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
            {error === "user already exists" && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {error}
              </Text>
            )}
          </View>
          <View style={{ marginBottom: 30 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
                borderBottomWidth: 0.5,
                borderBottomColor: "#000",
                paddingRight: 10,
                paddingVertical: 10,
                borderBottomColor: errors.password ? "red" : "#000",
              }}
            >
              <Feather name="lock" style={{ color: "#b8b8b8", fontSize: 20 }} />
              <Controller
                control={control}
                name="password"
                rules={{
                  required: i18n.t("fillInTheField"),
                  minLength: {
                    value: 8,
                    message: i18n.t("passwordMinEight"),
                  },
                  pattern: {
                    value: /^[^\sа-яА-Я]+$/i,
                    message: i18n.t("enterInLatin"),
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    type="Пароль"
                    placeholder={i18n.t("enterPassword")}
                    placeholderTextColor="#b8b8b8"
                    onChangeText={(value) => {
                      field.onChange(value);
                      setError("");
                    }}
                    value={field.value}
                    style={{
                      color: "#000",
                      fontSize: 14,
                      flex: 1,
                    }}
                  />
                )}
              />
            </View>
            {errors.password && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {errors.password.message}
              </Text>
            )}
            {/* {error && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {error}
              </Text>
            )} */}
          </View>
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
                  errors.password_confirm || error === "passwords do not match"
                    ? "red"
                    : "#000",
              }}
            >
              <Feather name="lock" style={{ color: "#b8b8b8", fontSize: 20 }} />
              <Controller
                control={control}
                name="password_confirm"
                rules={{
                  required: i18n.t("fillInTheField"),
                  minLength: {
                    value: 8,
                    message: i18n.t("passwordMinEight"),
                  },
                  pattern: {
                    value: /^[^\sа-яА-Я]+$/i,
                    message: i18n.t("enterInLatin"),
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    type="Пароль"
                    placeholder={i18n.t("confirmPassword")}
                    placeholderTextColor="#b8b8b8"
                    onChangeText={(value) => {
                      field.onChange(value);
                      setError("");
                    }}
                    value={field.value}
                    style={{
                      color: "#000",
                      fontSize: 14,
                      flex: 1,
                    }}
                  />
                )}
              />
            </View>
            {errors.password_confirm && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {errors.password_confirm.message}
              </Text>
            )}
            {error === "passwords do not match" && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {error}
              </Text>
            )}
          </View>
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
  );
};

export default SignUpEmail;
