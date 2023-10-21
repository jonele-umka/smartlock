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
import Toast from "react-native-toast-message";

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
  const loading = useSelector((state) => state.signIn.loading);
  const [error, setError] = useState("");
  const onSubmit = async (data) => {
    try {
      await dispatch(sendEmail(data.email));
      navigation.navigate("Код", { email: data.email });
    } catch (error) {
      setError(error);
    }
  };

  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <SafeAreaWrapper
      style={[
        { flex: 1, backgroundColor: "#191a1d" },
        // isDarkModeEnabled && { backgroundColor: "#191a1d" },
      ]}
    >
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: Platform.OS === "android" ? 0 : 20,
        }}
      >
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
          Введите свой Email
        </Text>
        <Controller
          control={control}
          rules={{
            required: "Заполните поле",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message:
                "Пожалуйста, введите действительный адрес электронной почты",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={(text) => {
                onChange(text);
                setError("");
              }}
              placeholderTextColor="grey"
              placeholder="Введите Email"
              style={{
                color: "#fff",
                fontSize: 14,
                height: 50,
                backgroundColor: "#272727",
                paddingHorizontal: 10,
                borderRadius: 10,
                borderWidth: errors.email || error == 400 ? 1 : 0,
                borderColor: errors.email || error == 400 ? "red" : "#272727",
              }}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
            {errors.email.message}
          </Text>
        )}
        {error == 400 && (
          <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
            Неверный Email
          </Text>
        )}
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

export default SignUpEmail;
