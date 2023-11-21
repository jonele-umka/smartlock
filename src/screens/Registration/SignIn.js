import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { useForm, Controller } from "react-hook-form";
import {
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { loginUser } from "../../Store/SignIn/SignInAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );

  const loading = useSelector((state) => state.signIn.loading);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const goToCreateAccount = () => {
    navigation.navigate("Email");
  };
  // submit
  // const onSubmit = (userData) => {
  //   console.log(userData);
  //   dispatch(loginUser(userData)).then(() => navigation.navigate("Главная"));
  // };

  // const onSubmit = async (userData) => {
  //   try {
  //     await dispatch(loginUser(userData));
  //     navigation.navigate("Главная");
  //   } catch (error) {
  //     setError(error);
  //   }
  // };
  const onSubmit = async (userData) => {
    try {
      const data = await dispatch(loginUser(userData));

      if (data && data?.data && data?.data?.access_token) {
        await AsyncStorage.setItem("token", data.data.access_token);
        navigation.navigate("Главная");
      } else {
        console.error("Ошибка при входе");
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
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
          // isDarkModeEnabled && { backgroundColor: "#191a1d" },
        ]}
      >
        <View
          style={{
            padding: 20,
          }}
        >
          <Image
            style={{ width: "100%", height: 80, marginBottom: 50 }}
            source={require("../../assets/CRYPTONLogo.png")}
          />
          {/* <Text
            style={{
              fontSize: 20,
              maxWidth: "60%",
              alignSelf: "center",
              marginBottom: 20,
              textAlign: "center",
              color: "#fff",
            }}
          >
            С возвращением, по вам скучали!
          </Text> */}

          <View
            style={{
              marginBottom: 10,
            }}
          >
            <View style={{ marginBottom: 25 }}>
              <Text
                style={
                  { color: "#fff" }
                  //   [
                  //   isDarkModeEnabled ? { color: "#fff" } : { color: "#000" },
                  // ]
                }
              >
                Email
              </Text>
              <Controller
                control={control}
                name="UserName"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput
                    placeholder="Введите Email"
                    placeholderTextColor="#9c9c9c"
                    onChangeText={field.onChange}
                    value={field.value}
                    style={{
                      marginTop: 10,
                      color: "#fff",
                      fontSize: 14,
                      height: 50,
                     backgroundColor: "rgba(255,255,255,0.2)",
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      borderWidth: errors.UserName ? 1 : 0,
                      borderColor: errors.UserName ? "red" : "#272727",
                      // borderWidth: 1,
                      // borderColor: error ? "red" : "#f3f3f3",
                      // shadowColor: "#000",
                      // shadowOffset: {
                      //   width: 0,
                      //   height: 2,
                      // },
                      // shadowOpacity: 0.1,
                      // shadowRadius: 8.84,
                      // elevation: 5,
                    }}
                  />
                )}
              />
              {errors.UserName && (
                <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                  Введите Email
                </Text>
              )}
            </View>
            <View>
              <Text
                style={
                  { color: "#fff" }
                  //   [
                  //   isDarkModeEnabled ? { color: "#fff" } : { color: "#000" },
                  // ]
                }
              >
                Пароль
              </Text>
              <Controller
                control={control}
                name="UserPassword"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput
                    type="Пароль"
                    placeholder="Введите пароль"
                    placeholderTextColor="#9c9c9c"
                    onChangeText={field.onChange}
                    value={field.value}
                    style={{
                      marginTop: 10,
                      color: "#fff",
                      fontSize: 14,
                      height: 50,
                     backgroundColor: "rgba(255,255,255,0.2)",
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      borderWidth: errors.UserPassword ? 1 : 0,
                      borderColor: errors.UserPassword ? "red" : "#272727",
                      // borderWidth: 1,
                      // borderColor: error ? "red" : "#f3f3f3",
                      // shadowColor: "#000",
                      // shadowOffset: {
                      //   width: 0,
                      //   height: 2,
                      // },
                      // shadowOpacity: 0.1,
                      // shadowRadius: 8.84,
                      // elevation: 5,
                    }}
                  />
                )}
              />
              {errors.UserPassword && (
                <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                  Введите пароль
                </Text>
              )}
            </View>
          </View>

          <View>
            <Text
              style={{
                // fontFamily: Font["poppins-semiBold"],
                fontSize: 14,
                color: "#fff",
                alignSelf: "flex-end",
              }}
            >
              Забыли пароль ?
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator
              size="large"
              style={{ marginTop: 30, marginBottom: 20 }}
              color={"#0268EC"}
            />
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                padding: 15,
                backgroundColor: "#5d00e6",
                marginTop: 30,
                marginBottom: 20,
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
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                Войти
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity>
            <Text
              style={[
                {
                  // fontFamily: Font["poppins-semiBold"],
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 14,
                },
                // isDarkModeEnabled && {
                //   color: "#fff",
                // },
              ]}
              onPress={goToCreateAccount}
            >
              Создать новый аккаунт
            </Text>
          </TouchableOpacity>

          <View
            style={{
              marginVertical: 30,
            }}
          >
            <Text
              style={{
                // fontFamily: Font["poppins-semiBold"],
                color: "#fff",
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Или продолжить с
            </Text>

            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#5d00e6",
                  borderRadius: 10,
                  marginHorizontal: 10,
                }}
              >
                <Icon
                  name="google"
                  style={
                    { color: "#fff" }
                    // isDarkModeEnabled ? { color: "#fff" } : { color: "#000" }
                  }
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#5d00e6",
                  borderRadius: 10,
                  marginHorizontal: 10,
                }}
              >
                <Icon
                  name="apple"
                  style={
                    { color: "#fff" }
                    // isDarkModeEnabled ? { color: "#fff" } : { color: "#000" }
                  }
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#5d00e6",
                  borderRadius: 10,
                  marginHorizontal: 10,
                }}
              >
                <Icon
                  name="facebook"
                  style={
                    { color: "#fff" }
                    // isDarkModeEnabled ? { color: "#fff" } : { color: "#000" }
                  }
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaWrapper>
    </LinearGradient>
  );
};

export default SignIn;
