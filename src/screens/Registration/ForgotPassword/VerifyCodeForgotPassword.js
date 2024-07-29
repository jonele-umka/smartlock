// import React, { useState, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   SafeAreaView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   View,
// } from "react-native";
// import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
// import i18n from "../../../components/i18n/i18n";
// import { useNavigation, useRoute } from "@react-navigation/core";
// import { resendCode, verifyCode } from "../../../Store/authSlice/authSlice";

// const VerifyCodeForgotPassword = () => {
//   const { control, handleSubmit, formState: { errors } } = useForm();
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const loading = useSelector((state) => state.auth.loading);
//   const [error, setError] = useState("");
//   const [canResend, setCanResend] = useState(true);
//   const [timer, setTimer] = useState(60);
//   const route = useRoute();
//   const { email } = route.params;

//   useEffect(() => {
//     let interval;
//     if (!canResend) {
//       interval = setInterval(() => {
//         setTimer((prevTimer) => {
//           if (prevTimer <= 1) {
//             clearInterval(interval);
//             setCanResend(true);
//             return 60;
//           }
//           return prevTimer - 1;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [canResend]);

//   const resend = async () => {
//     try {
//       await dispatch(resendCode(email));
//       setCanResend(false);
//     } catch (error) {
//       console.error("Ошибка при повторной отправке кода:", error);
//       setError(error.message);
//     }
//   };

//   const onSubmit = async (code) => {
//     try {
//       const response = await dispatch(verifyCode(code));

//       if (response.type === "auth/verifyCode/fulfilled") {
//         navigation.navigate("Войти");
//       } else {
//         setError(response.payload);
//       }
//     } catch (error) {
//       console.error("Ошибка при входе:", error);
//       setError(error.message);
//     }
//   };

//   const SafeAreaWrapper = Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

//   return (
//     <SafeAreaWrapper style={{ flex: 1, backgroundColor: "#fff" }}>
//       <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
//         <Text style={{ fontSize: 40, marginBottom: 30, color: "#000", fontWeight: "600" }}>
//           {i18n.t("enterACode")}
//         </Text>
//         <View>
//           <Controller
//             control={control}
//             name="code"
//             rules={{
//               required: i18n.t("fillInTheField"),
//               pattern: {
//                 value: /^[0-9]{6}$/,
//                 message: i18n.t("pleaseEnterAValidCode"),
//               },
//             }}
//             render={({ field }) => (
//               <TextInput
//                 placeholder={i18n.t("enterACode")}
//                 placeholderTextColor="#b8b8b8"
//                 onChangeText={(value) => {
//                   field.onChange(value);
//                   setError("");
//                 }}
//                 keyboardType={"numeric"}
//                 maxLength={6}
//                 value={field.value}
//                 style={{
//                   color: "#000",
//                   fontSize: 14,
//                   borderBottomWidth: 0.5,
//                   borderBottomColor: errors.code ? "red" : "#000",
//                   paddingRight: 10,
//                   paddingVertical: 10,
//                 }}
//               />
//             )}
//           />
//           {errors.code && (
//             <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
//               {errors.code.message}
//             </Text>
//           )}
//           {canResend ? (
//             <TouchableOpacity onPress={resend}>
//               <Text style={{ color: "#007bff", fontSize: 18, marginTop: 10 }}>
//                 Отправить код повторно
//               </Text>
//             </TouchableOpacity>
//           ) : (
//             <Text style={{ color: "#000", marginTop: 10 }}>
//               Повторная отправка кода возможна через {timer} секунд
//             </Text>
//           )}
//           {error === "invalid activation code" && (
//             <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
//               {i18n.t("inСorrectCode")}
//             </Text>
//           )}
//         </View>
//         {loading ? (
//           <ActivityIndicator size="large" style={{ marginTop: 40 }} color={"#000"} />
//         ) : (
//           <TouchableOpacity
//             onPress={handleSubmit(onSubmit)}
//             disabled={loading}
//             style={{
//               marginTop: 30,
//               padding: 15,
//               backgroundColor: "#000",
//               borderRadius: 10,
//               shadowColor: "#000",
//               shadowOffset: {
//                 width: 0,
//                 height: 10,
//               },
//               shadowOpacity: 0.3,
//               shadowRadius: 10,
//             }}
//           >
//             <Text style={{ color: "#fff", textAlign: "center", fontSize: 20 }}>
//               {i18n.t("next")}
//             </Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </SafeAreaWrapper>
//   );
// };

// export default VerifyCodeForgotPassword;
import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
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
import i18n from "../../../components/i18n/i18n";
import { useNavigation, useRoute } from "@react-navigation/core";

import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";

const VerifyCodeForgotPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const route = useRoute();
  const { email } = route.params;

  const API_URL = process.env.API_URL;

  const inputs = useRef([]);

  const onSubmit = async (data) => {
    const code = Object.values(data).join("");

    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/api/auth/verify_forgot_password/${code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const responseDataError = await response.json();
        const errorMessage =
          responseDataError.error.Message || "Произошла ошибка";
        console.log("g", errorMessage);
        setError(errorMessage);
        setLoading(false);

        Toast.show({
          type: "error",
          position: "top",
          text2: errorMessage,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
        console.log("errorMessage", responseDataError);
      }
      const responseData = await response.json();
      navigation.navigate("Создать новый пароль", { email: email });
      setLoading(false);

      return responseData;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <SafeAreaWrapper style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
        <Text
          style={{
            fontSize: 40,
            marginBottom: 30,
            color: "#000",
            fontWeight: "600",
          }}
        >
          {i18n.t("enterACode")}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[...Array(6)].map((_, index) => (
            <Controller
              key={index}
              control={control}
              name={`code${index}`}
              rules={{
                required: i18n.t("fillInTheField"),
                pattern: {
                  value: /^[0-9]$/,
                  message: i18n.t("pleaseEnterAValidCode"),
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  ref={(el) => (inputs.current[index] = el)}
                  style={{
                    width: 40,
                    height: 40,
                    borderBottomWidth: 1,
                    borderColor: errors[`code${index}`] ? "red" : "#000",
                    textAlign: "center",
                    fontSize: 18,
                    color: "#000",
                  }}
                  keyboardType="numeric"
                  maxLength={1}
                  onBlur={onBlur}
                  onChangeText={(val) => {
                    onChange(val);
                    setError("");
                    if (val) {
                      if (index < 5) {
                        inputs.current[index + 1].focus();
                      }
                    } else if (index > 0) {
                      inputs.current[index - 1].focus();
                    }
                  }}
                  value={value}
                />
              )}
            />
          ))}
        </View>
        {errors.code && (
          <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
            {errors.code.message}
          </Text>
        )}

        {error === "exception:wrong-verification-code" && (
          <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
            {i18n.t("inСorrectCode")}
          </Text>
        )}
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
      </View>
    </SafeAreaWrapper>
  );
};

export default VerifyCodeForgotPassword;
