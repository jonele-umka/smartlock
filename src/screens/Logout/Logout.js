import React from "react";
import { Platform, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
// import { logoutUser } from "../../Store/SignIn/SignInAction";
import { useNavigation } from "@react-navigation/core";

const Logout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // const handleLogout = async () => {
  //   try {
  //     await dispatch(logoutUser());
  //     // Перейдите на страницу SignIn после успешного выхода
  //     navigation.navigate("SignIn");
  //   } catch (error) {
  //     // Обработка ошибок, если выход не удался
  //     console.error("Ошибка выхода:", error);
  //   }
  // };
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <SafeAreaWrapper>
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: "#5d00e6",
          marginTop: 30,
          shadowColor: "#5d00e6",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.3,
          shadowRadius: 10,
        }}
        // onPress={handleLogout}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#fff",
            fontSize: 16,
          }}
        >
          Выйти
        </Text>
      </TouchableOpacity>
    </SafeAreaWrapper>
  );
};

export default Logout;
