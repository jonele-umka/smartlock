import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavBar from "./NavBar";

import SignIn from "../screens/Registration/SignIn";
import SignUpEmail from "../screens/Registration/SignUp/SignUpEmail";
import SignUpCode from "../screens/Registration/SignUp/SignUpCode";

import ChangePassword from "../screens/ChangePassword/ChangePassword";
import SearchResults from "../screens/SearchResults/SearchResults";
import ObjectDetailsScreen from "../screens/Objects/ObjectDetailsScreen/ObjectDetails";
import AllReviewsScreen from "../screens/Reviews/AllReviewsScreen";

import Landlord from "../screens/Owner/Landlord/Landlord";

import ConfirmationScreen from "../screens/ConfirmationScreen/ConfirmationScreen";
import Settings from "../screens/Settings/Settings";
import EditProfile from "../screens/EditProfile/EditProfile";
import MyObjectsScreen from "../screens/Objects/MyObjectList/MyObjectsList";
import Payments from "../screens/Payments/Payments";

import AddCard from "../screens/AddCard/AddCard";
import LockScreen from "../screens/LockScreen/LockScreen";
import EditLock from "../screens/LockScreen/EditLock/EditLock";
import ForgotPassword from "../screens/Registration/ForgotPassword/ForgotPassword";
import { loginUser } from "../Store/authSlice/authSlice";
import VerifyCodeForgotPassword from "../screens/Registration/ForgotPassword/VerifyCodeForgotPassword";
import CreateNewPassword from "../screens/Registration/ForgotPassword/CreateNewPassword";
import CameraScreen from "../screens/CameraScreen/CameraScreen";
import NotificationScreen from "../screens/Notification/NotificationScreen";
import DetailsNotification from "../screens/Notification/DetailsNotification/DetailsNotification";
import Owner from "../screens/Owner/Owner";
import EditOwner from "../screens/Owner/EditOwner/EditOwner";
import Applications from "../screens/Owner/Applications/Applications";
import ChangeEmail from "../screens/EditProfile/ChangeEmail/ChangeEmail";
import ConfirmCode from "../screens/EditProfile/ChangeEmail/ConfirmCode";
import BecomeOwner from "../screens/Owner/MyObjects/BecomeOwner/BecomeOwner";
import MoreDetailsApplications from "../screens/Owner/MoreDetailsApplications/MoreDetailsApplications";
import EditObject from "../screens/Objects/ObjectDetailsScreen/EditObject";
import LockDetails from "../screens/LockScreen/LockDetails/LockDetails";

const Stack = createStackNavigator();

const Navigator = () => {
  const dispatch = useDispatch();
  const [initialRoute, setInitialRoute] = useState("Главная страница");

  useEffect(() => {
    const checkLoginAndNavigate = async () => {
      try {
        const Email = await AsyncStorage.getItem("login");
        const Password = await AsyncStorage.getItem("password");
        const userData = { Email, Password };

        if (userData.Email && userData.Password) {
          dispatch(loginUser(userData))
            .unwrap()
            .then(() => {
              setInitialRoute("Главная страница");
            })
            .catch((error) => {
              console.error("Ошибка при входе:", error);
              setInitialRoute("Войти");
            });
        } else {
          setInitialRoute("Главная страница");
        }
      } catch (error) {
        console.error("Ошибка при чтении из AsyncStorage", error);
        setInitialRoute("Войти");
      }
    };

    checkLoginAndNavigate();
  }, [dispatch]);

  if (initialRoute === "loading") {
    return null;
  }

  return (
    <NavigationContainer>
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
        <Stack.Screen name="Регистрация" component={SignUpEmail} />
        <Stack.Screen name="Код подтверждения" component={SignUpCode} />
        <Stack.Screen name="Сменить пароль" component={ChangePassword} />
        <Stack.Screen name="Результаты поиска" component={SearchResults} />
        <Stack.Screen name="Детали объекта" component={ObjectDetailsScreen} />
        <Stack.Screen name="Все отзывы" component={AllReviewsScreen} />
        {/* <Stack.Screen name="Все вопросы" component={AllQuestionsScreen} /> */}
        <Stack.Screen name="Сдать жильё" component={Landlord} />
        <Stack.Screen
          name="Подтверждение брони"
          component={ConfirmationScreen}
        />
        <Stack.Screen name="Настройки" component={Settings} />
        <Stack.Screen name="Редактировать профиль" component={EditProfile} />
        <Stack.Screen name="Управление объектами" component={MyObjectsScreen} />
        <Stack.Screen name="Платежи" component={Payments} />
        <Stack.Screen name="Добавить карту" component={AddCard} />
        <Stack.Screen name="Замок" component={LockScreen} />
        <Stack.Screen name="Редактировать замок" component={EditLock} />
        <Stack.Screen name="Забыли пароль" component={ForgotPassword} />
        <Stack.Screen
          name="Проверка Кода Забыли Пароль?"
          component={VerifyCodeForgotPassword}
        />
        <Stack.Screen
          name="Создать Новый Пароль"
          component={CreateNewPassword}
        />
        <Stack.Screen name="Камера" component={CameraScreen} />
        <Stack.Screen name="Уведомления" component={NotificationScreen} />
        <Stack.Screen
          name="Детали уведомления"
          component={DetailsNotification}
        />
        <Stack.Screen name="Владелец" component={Owner} />
        <Stack.Screen
          name="Редактировать данные владельца"
          component={EditOwner}
        />
        <Stack.Screen name="Заявки" component={Applications} />
        <Stack.Screen name="Изменить почту" component={ChangeEmail} />
        <Stack.Screen name="Подтверждение кода" component={ConfirmCode} />
        <Stack.Screen name="Стать владельцем" component={BecomeOwner} />
        <Stack.Screen
          name="Подробнее о Заявке"
          component={MoreDetailsApplications}
        />
        <Stack.Screen name="Редактировать объект" component={EditObject} />
        <Stack.Screen name="Детали замка" component={LockDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
