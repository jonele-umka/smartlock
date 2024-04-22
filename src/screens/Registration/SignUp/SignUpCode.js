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
import Feather from "react-native-vector-icons/Feather";

import { useNavigation, useRoute } from "@react-navigation/core";

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
    <SafeAreaWrapper
      style={[
        { flex: 1, backgroundColor: "#fff" },
        // isDarkModeEnabled && { backgroundColor: "#191a1d" },
      ]}
    >
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
            rules={{
              required: i18n.t("fillInTheField"),
              pattern: {
                required: true,
                pattern: /^[0-9]{6}$/,
                maxLength: 6,
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

          {errors.code && (
            <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
              {errors.code.message}
            </Text>
          )}
          {error === "invalid activation code" && (
            <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
              {i18n.t("inСorrectCode")}
            </Text>
          )}
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

export default SignUpCode;
