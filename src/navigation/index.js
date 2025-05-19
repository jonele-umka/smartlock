import React, { useState, useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavBar from "./NavBar";

import SignIn from "../screens/Registration/SignIn";
import SignUpEmail from "../screens/Registration/SignUp/SignUpEmail";
import SignUpCode from "../screens/Registration/SignUp/SignUpCode";

import ChangePassword from "../screens/ChangePassword/ChangePassword";
// import SearchResults from "../screens/SearchResults/SearchResults";
import ObjectDetails from "../screens/Objects/ObjectDetails/ObjectDetails";
import AllReviewsScreen from "../screens/Reviews/AllReviewsScreen";

import Landlord from "../screens/Owner/Landlord/Landlord";

import ConfirmationScreen from "../screens/ConfirmationScreen/ConfirmationScreen";
import Settings from "../screens/Settings/Settings";
import EditProfile from "../screens/EditProfile/EditProfile";
import MyObjectsScreen from "../screens/Objects/MyObjectList/MyObjectsList";

import LockScreen from "../screens/LockScreen/LockScreen";
import EditLock from "../screens/LockScreen/EditLock/EditLock";
import ForgotPassword from "../screens/Registration/ForgotPassword/ForgotPassword";
import { loginGoogle, loginUser } from "../Store/authSlice/authSlice";
import CodeForgotPassword from "../screens/Registration/ForgotPassword/CodeForgotPassword";
import CreateNewPassword from "../screens/Registration/ForgotPassword/CreateNewPassword";
import CameraScreen from "../screens/CameraScreen/CameraScreen";
import NotificationScreen from "../screens/Notification/NotificationScreen";
import DetailsNotification from "../screens/Notification/DetailsNotification/DetailsNotification";
import Owner from "../screens/Owner/Owner";
import DataOwner from "../screens/Owner/DataOwner/DataOwner";
import Applications from "../screens/Owner/Applications/Applications";
import ChangeEmail from "../screens/EditProfile/ChangeEmail/ChangeEmail";
import ConfirmCode from "../screens/EditProfile/ChangeEmail/ConfirmCode";
import MoreDetailsApplications from "../screens/Owner/MoreDetailsApplications/MoreDetailsApplications";
import LockDetails from "../screens/LockScreen/LockDetails/LockDetails";
import Consideration from "../screens/Owner/Consideration/Consideration";
import { useNavigation } from "@react-navigation/core";
import i18n from "../../i18n/i18n";
import Support from "../screens/Support/Support";
 

const Stack = createStackNavigator();

const Navigator = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [initialRoute, setInitialRoute] = useState("Главная страница");

  // useEffect(() => {
  //   const checkLoginAndNavigate = async () => {
  //     try {
  //       const Email = await AsyncStorage.getItem("login");
  //       const Password = await AsyncStorage.getItem("password");
  //       const userData = { Email, Password };

  //       if (userData.Email && userData.Password) {
  //         dispatch(loginUser(userData))
  //           .unwrap()
  //           .then(() => {
  //             setInitialRoute("Главная страница");
  //           })
  //           .catch((error) => {
  //             console.error("Ошибка при входе:", error);
  //             setInitialRoute("Войти");
  //           });
  //       } else {
  //         setInitialRoute("Главная страница");
  //       }
  //     } catch (error) {
  //       console.error("Ошибка при чтении из AsyncStorage", error);
  //       setInitialRoute("Войти");
  //     }
  //   };

  //   checkLoginAndNavigate();
  // }, [dispatch]);

  useEffect(() => {
    const checkLoginAndNavigate = async () => {
      try {
        const authType = await AsyncStorage.getItem("authType");

        if (authType === "local") {
          const Email = await AsyncStorage.getItem("login");
          const Password = await AsyncStorage.getItem("password");
          const userData = { Email, Password };

          if (Email && Password) {
            dispatch(loginUser(userData))
              .unwrap()
              .then(() => setInitialRoute("Главная страница"))
              .catch(() => setInitialRoute("Войти"));
          } else {
            setInitialRoute("Войти");
          }
        } else if (authType === "google") {
          const googleAccessToken = await AsyncStorage.getItem(
            "googleAccessToken"
          );

          if (googleAccessToken) {
            dispatch(loginGoogle({ tokenGoogle: googleAccessToken }))
              .unwrap()
              .then(() => setInitialRoute("Главная страница"))
              .catch(() => setInitialRoute("Войти"));
          } else {
            setInitialRoute("Войти");
          }
        } else {
          setInitialRoute("Войти");
        }
      } catch (error) {
        console.error("Ошибка при чтении из AsyncStorage", error);
        setInitialRoute("Войти");
      }
    };

    checkLoginAndNavigate();
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const token = await AsyncStorage.getItem("token");

      if (!token) return;

      try {
        const response = await fetch(
          `${process.env.API_URL}/api/auth/profile`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 401 || response.status === 403) {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("login");
          await AsyncStorage.removeItem("password");
          navigation.navigate("Войти");
        }
      } catch (error) {
        console.error("Ошибка при проверке токена:", error);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch, navigation]);

  if (initialRoute === "loading") {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="Главная страница"
        component={NavBar}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Войти"
        component={SignIn}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Регистрация"
        component={SignUpEmail}
        options={() => ({ title: i18n.t("register") })}
      />
      <Stack.Screen
        name="Код подтверждения"
        component={SignUpCode}
        options={() => ({ title: i18n.t("codeConfirm") })}
      />
      <Stack.Screen
        name="Сменить пароль"
        component={ChangePassword}
        options={() => ({ title: i18n.t("changePassword") })}
      />
      <Stack.Screen
        name="Код забыли пароль"
        component={CodeForgotPassword}
        options={() => ({ title: i18n.t("codeForgotPassword") })}
      />
      <Stack.Screen
        name="Детали объекта"
        component={ObjectDetails}
        options={() => ({ title: i18n.t("detailsObject") })}
      />
      <Stack.Screen
        name="Все отзывы"
        component={AllReviewsScreen}
        options={() => ({ title: i18n.t("allReviews") })}
      />
      <Stack.Screen
        name="Мой объект"
        component={Landlord}
        options={() => ({ title: i18n.t("myObject") })}
      />
      <Stack.Screen
        name="Подтверждение брони"
        component={ConfirmationScreen}
        options={() => ({ title: i18n.t("confirmReserv") })}
      />
      <Stack.Screen
        name="Настройки"
        component={Settings}
        options={() => ({ title: i18n.t("settings") })}
      />
      <Stack.Screen
        name="Редактировать профиль"
        component={EditProfile}
        options={() => ({ title: i18n.t("editProfile") })}
      />
      <Stack.Screen
        name="Управление объектами"
        component={MyObjectsScreen}
        options={() => ({ title: i18n.t("objectManagement") })}
      />
      <Stack.Screen
        name="Замок"
        component={LockScreen}
        options={() => ({ title: i18n.t("lock") })}
      />
      <Stack.Screen
        name="Редактировать замок"
        component={EditLock}
        options={() => ({ title: i18n.t("edit_lock") })}
      />
      <Stack.Screen
        name="Забыли пароль"
        component={ForgotPassword}
        options={() => ({ title: i18n.t("forgotYourPassword") })}
      />
      <Stack.Screen
        name="Создать новый пароль"
        component={CreateNewPassword}
        options={() => ({ title: i18n.t("create_new_password") })}
      />
      <Stack.Screen
        name="Камера"
        component={CameraScreen}
        options={() => ({ title: i18n.t("camera") })}
      />
      <Stack.Screen
        name="Уведомления"
        component={NotificationScreen}
        options={() => ({ title: i18n.t("notifications") })}
      />
      <Stack.Screen
        name="Детали уведомления"
        component={DetailsNotification}
        options={() => ({ title: i18n.t("notificationDetails") })}
      />
      <Stack.Screen
        name="Владелец"
        component={Owner}
        options={() => ({ title: i18n.t("owner") })}
      />
      <Stack.Screen
        name="Данные владельца"
        component={DataOwner}
        options={() => ({ title: i18n.t("dataOwner") })}
      />
      <Stack.Screen
        name="Заявки"
        component={Applications}
        options={() => ({ title: i18n.t("applications") })}
      />
      <Stack.Screen
        name="Изменить почту"
        component={ChangeEmail}
        options={() => ({ title: i18n.t("changeEmail") })}
      />
      <Stack.Screen
        name="Подтверждение кода"
        component={ConfirmCode}
        options={() => ({ title: i18n.t("confirmCode") })}
      />
      <Stack.Screen
        name="Заявка на подтверждение"
        component={Consideration}
        options={() => ({
          title: i18n.t("consideration"),
          headerShown: false,
          gestureEnabled: false,
        })}
      />
      <Stack.Screen
        name="Подробнее о заявке"
        component={MoreDetailsApplications}
        options={() => ({ title: i18n.t("moreApplication") })}
      />
      <Stack.Screen
        name="Детали замка"
        component={LockDetails}
        options={() => ({ title: i18n.t("lock_details") })}
      />
      <Stack.Screen
        name="Поддержка"
        component={Support}
        options={() => ({ title: i18n.t("support") })}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
