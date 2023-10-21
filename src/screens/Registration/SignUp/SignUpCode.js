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
import Toast from "react-native-toast-message";

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
    <SafeAreaWrapper
      style={[
        { flex: 1, backgroundColor: "#191a1d" },
        isDarkModeEnabled && { backgroundColor: "#191a1d" },
      ]}
    >
      <View style={{ padding: 20 }}>
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
          Введите код
        </Text>
        <Controller
          control={control}
          rules={{
            required: "Заполните поле",
            pattern: {
              required: true,
              pattern: /^[0-9]{6}$/,
              maxLength: 6,
              // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Пожалуйста, введите действительный код",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={(text) => {
                onChange(text);
                setError("");
              }}
              placeholder="Введите код"
              placeholderTextColor="grey"
              maxLength={6}
              keyboardType={"numeric"}
              style={{
                color: "#fff",
                fontSize: 14,
                height: 50,
                paddingHorizontal: 10,
                backgroundColor: "#272727",
                borderRadius: 10,
                borderWidth: errors.code || error == 400 ? 1 : 0,
                borderColor: errors.code || error == 400 ? "red" : "#272727",
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
            Неверный код
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
            color={"#0268EC"}
          />
        ) : (
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
            style={{
              marginTop: 20,
              padding: 15,
              backgroundColor: "#0268EC",
              borderRadius: 10,
              shadowColor: "#0268EC",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 5,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center", fontSize: 20 }}>
              Далее
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaWrapper>
  );
};

export default SignUpCode;
