import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavBar from "./NavBar";

import SignIn from "../screens/Registration/SignIn";
import SignUpEmail from "../screens/Registration/SignUp/SignUpEmail";
import SignUpCode from "../screens/Registration/SignUp/SignUpCode";

// import { AddFavorites } from "../screens/AddFavorites/AddFavorites";
// import CreatePinCode from "../screens/PinCodePage/CreatePinCode";

import i18n from "../components/i18n/i18n";
import ChangePassword from "../screens/ChangePassword/ChangePassword";
// import Help from "../screens/Help/Help";
import SearchResults from "../screens/SearchResults/SearchResults";
import HotelDetailsScreen from "../screens/HotelDetailsScreen/HotelDetailsScreen";
import AllReviewsScreen from "../screens/Reviews/AllReviewsScreen";
import AllConditions from "../screens/AllConditions/AllConditions";
import AllQuestionsScreen from "../screens/QuestionsScreen/AllQuestionsScreen";
import AllVariantHotels from "../screens/AllVariantHotels/AllVariantHotels";
import Landlord from "../screens/Landlord/Landlord";
import CalendarScreen from "../screens/CalendarScreen/CalendarScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen/ConfirmationScreen";
import Settings from "../screens/Settings/Settings";
import Profile from "../screens/Profile/Profile";
import ControlObject from "../screens/MyObjects/MyObjects";
import Payments from "../screens/Payments/Payments";
import HotelsScreen from "../components/Objects/Objects";
import EditObjects from "../screens/MyObjects/EditObjects";
import AddCard from "../screens/AddCard/AddCard";
import LockScreen from "../screens/LockScreen/LockScreen";
import EditLock from "../screens/LockScreen/EditLock/EditLock";
import ForgotPassword from "../screens/Registration/ForgotPassword/ForgotPassword";
import { loginUser } from "../Store/authSlice/authSlice";
import VerifyCode from "../screens/Registration/ForgotPassword/VerifyCode";
import CreateNewPassword from "../screens/Registration/ForgotPassword/CreateNewPassword";

const Stack = createStackNavigator();

const Navigator = () => {
  const dispatch = useDispatch();
  const [initialRoute, setInitialRoute] = useState("Войти");

  useEffect(() => {
    const checkLoginAndNavigate = async () => {
      try {
        const Email = await AsyncStorage.getItem("login");
        const Password = await AsyncStorage.getItem("password");
        const userData = { Email, Password };

        if (userData.Email && userData.Password) {
          // Если есть сохраненные логин и пароль, отправляем запрос на сервер для входа
          dispatch(loginUser(userData))
            .then(() => {
              // После успешного входа устанавливаем начальный маршрут на главную страницу
              setInitialRoute("Главная страница");
            })
            .catch((error) => {
              console.error("Ошибка при входе:", error);
              // Если произошла ошибка при входе, устанавливаем начальный маршрут на страницу входа
              setInitialRoute("Войти");
            });
        } else {
          // Если нет сохраненных логина и пароля, устанавливаем начальный маршрут на страницу Войтиа
          setInitialRoute("Войти");
        }
      } catch (error) {
        console.error("Ошибка при чтении из AsyncStorage", error);
        // В случае ошибки также устанавливаем начальный маршрут на страницу Войтиа
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
          name="Результаты поиска"
          component={SearchResults}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Данные об отеле"
          component={HotelDetailsScreen}
          options={{
            headerShown: true, // Показать заголовок
            headerTransparent: true, // Прозрачный фон заголовка
            headerTintColor: "#fff", // Цвет текста заголовка
            title: "", // Заголовок
          }}
        />
        <Stack.Screen name="Объекты" component={HotelsScreen} />
        <Stack.Screen name="Все отзывы" component={AllReviewsScreen} />
        <Stack.Screen name="Все условия" component={AllConditions} />
        <Stack.Screen name="Все вопросы" component={AllQuestionsScreen} />
        <Stack.Screen name="Все варианты" component={AllVariantHotels} />
        <Stack.Screen name="Сдать жильё" component={Landlord} />
        <Stack.Screen name="Настройки" component={Settings} />
        <Stack.Screen name="Редактировать профиль" component={Profile} />
        <Stack.Screen name="Управление объектами" component={ControlObject} />
        <Stack.Screen name="Платежи и выплаты" component={Payments} />
        <Stack.Screen name="Просмотр объекта" component={EditObjects} />
        <Stack.Screen name="Даты поездки" component={CalendarScreen} />
        <Stack.Screen name="Добавить карту" component={AddCard} />
        <Stack.Screen name="Замок номера" component={LockScreen} />
        <Stack.Screen name="Редактировать пин" component={EditLock} />
        <Stack.Screen name="Подтвердить код" component={VerifyCode} />
        <Stack.Screen
          name="Создать новый пароль"
          component={CreateNewPassword}
        />

        <Stack.Screen
          name="Подтверждение брони"
          component={ConfirmationScreen}
        />
        <Stack.Screen
          name="Редакировать профиль"
          component={ConfirmationScreen}
        />
        {/* <Stack.Screen
          name="Создать пин-код"
          component={CreatePinCode}
          options={{ headerShown: false, gestureEnabled: false }}
        /> */}
        <Stack.Screen
          name="Войти"
          component={SignIn}
          options={{ headerShown: false, title: i18n.t("signInScreen") }}
        />
        <Stack.Screen name="Забыл пароль" component={ForgotPassword} />
        <Stack.Screen
          name="Email"
          component={SignUpEmail}
          options={{ title: i18n.t("signUpEmailScreen") }}
        />
        <Stack.Screen
          name="Код"
          component={SignUpCode}
          options={{ title: i18n.t("signUpCodeScreen") }}
        />

        <Stack.Screen
          name="Смена пароля"
          component={ChangePassword}
          options={"Смена пароля"}
        />
        {/* <Stack.Screen
 
          name="Смена пароля"
          component={ChangePassword}
          options={{ title: i18n.t("changePassword") }}
        />
       
 
        <Stack.Screen
          name="Помощь"
          component={Help}
          options={{ title: i18n.t("help") }}
        />
     

        {/* <Stack.Screen
          name="Уведомления"
          component={Notification}
          options={{ title: i18n.t("notificationScreen") }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
