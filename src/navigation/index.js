import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavBar from "./NavBar";
<<<<<<< HEAD
// import SignIn from "../screens/Registration/SignIn";
// import SignUpEmail from "../screens/Registration/SignUp/SignUpEmail";
// import SignUpCode from "../screens/Registration/SignUp/SignUpCode";

// import { AddFavorites } from "../screens/AddFavorites/AddFavorites";

import PinCodePage from "../screens/PinCodePage/PinCodePage";
import { loginSuccess } from "../Store/SignIn/SignInAction";
// import CreatePinCode from "../screens/PinCodePage/CreatePinCode";

import i18n from "../components/i18n/i18n";
// import ChangePassword from "../screens/ChangePassword/ChangePassword";
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
import HotelsScreen from "../screens/HotelsScreen/HotelsScreen";
import EditObjects from "../screens/MyObjects/EditObjects";
import AddCard from "../screens/AddCard/AddCard";
import LockScreen from "../screens/LockScreen/LockScreen";
import EditLock from "../screens/LockScreen/EditLock/EditLock";
=======
import SignIn from "../screens/Registration/SignIn";
import SignUpEmail from "../screens/Registration/SignUp/SignUpEmail";
import SignUpCode from "../screens/Registration/SignUp/SignUpCode";
import SignUpForm from "../screens/Registration/SignUp/SignUpForm";
import { TransferCrypto } from "../screens/TransferCrypto/TransferCrypto";
import SuccessScreen from "../screens/TransferCrypto/SuccessTransfer/SuccessTransfer";
import TransactionsScreen from "../components/TransactionTabs/TransactionTabsRoute/TransactionTabsRoute";
import ConfirmationUser from "../screens/TransferCrypto/СonfirmationUser/ConfirmationUser";
import { AddFavorites } from "../screens/AddFavorites/AddFavorites";
import CardDetails from "../components/Crypto/CardDetails";
import AnalyticsPage from "../components/Analytics/AnalyticsPage";
import Notification from "../screens/Notification/Notification";

import PinCodePage from "../screens/PinCodePage/PinCodePage";
import { loginSuccess } from "../Store/SignIn/SignInAction";
import CreatePinCode from "../screens/PinCodePage/CreatePinCode";
import CorrectPinCode from "../screens/PinCodePage/CorrectPinCode";
import i18n from "../components/i18n/i18n";
import ChangePassword from "../screens/ChangePassword/ChangePassword";
import Help from "../screens/Help/Help";
import ExchangeRates from "../screens/ExchangeRates/ExchangeRates";
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
const Stack = createStackNavigator();

const Navigator = () => {
  const dispatch = useDispatch();
  const [initialRoute, setInitialRoute] = useState("loading");

  useEffect(() => {
    const checkLoginAndNavigate = async () => {
      try {
        const storedLogin = await AsyncStorage.getItem("login");
        const storedPassword = await AsyncStorage.getItem("password");

        if (storedLogin && storedPassword) {
          dispatch(loginSuccess());
          setInitialRoute("Главная страница");
        } else {
          setInitialRoute("Главная страница");
        }
      } catch (error) {
        console.error("Ошибка при чтении из AsyncStorage", error);
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
<<<<<<< HEAD
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
        <Stack.Screen name="Сдать жилье" component={Landlord} />
        <Stack.Screen name="Настройки" component={Settings} />
        <Stack.Screen name="Редактировать профиль" component={Profile} />
        <Stack.Screen name="Управление объектами" component={ControlObject} />
        <Stack.Screen name="Платежи и выплаты" component={Payments} />
        <Stack.Screen name="Просмотр объекта" component={EditObjects} />
        <Stack.Screen name="Даты поездки" component={CalendarScreen} />
        <Stack.Screen name="Добавить карту" component={AddCard} />
        <Stack.Screen name="Замок номера" component={LockScreen} />
        <Stack.Screen name="Редактировать пин" component={EditLock} />
=======
          name="Pin"
          component={PinCodePage}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Создать пин-код"
          component={CreatePinCode}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Курс валют"
          component={ExchangeRates}
          options={{ title: i18n.t("exchangeRates") }}
        />
        <Stack.Screen
          name="Сменить пин-код"
          component={CorrectPinCode}
          options={{ title: i18n.t("correctPinCodeScreen") }}
        />
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
        <Stack.Screen
          name="Подтверждение брони"
          component={ConfirmationScreen}
        />
        <Stack.Screen
<<<<<<< HEAD
          name="Редакировать профиль"
          component={ConfirmationScreen}
        />
        <Stack.Screen
          name="Pin"
          component={PinCodePage}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        {/* <Stack.Screen
          name="Создать пин-код"
          component={CreatePinCode}
          options={{ headerShown: false, gestureEnabled: false }}
        /> */}

        {/* <Stack.Screen
          name="Войти"
          component={SignIn}
          options={{ headerShown: false, title: i18n.t("signInScreen") }}
        /> */}
        {/* <Stack.Screen
          name="Смена пароля"
          component={ChangePassword}
          options={{ title: i18n.t("changePassword") }}
        /> */}
        {/* <Stack.Screen
=======
          name="Смена пароля"
          component={ChangePassword}
          options={{ title: i18n.t("changePassword") }}
        />
        <Stack.Screen
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
          name="Email"
          component={SignUpEmail}
          options={{ title: i18n.t("signUpEmailScreen") }}
        />
<<<<<<< HEAD
        <Stack.Screen
          name="Помощь"
          component={Help}
          options={{ title: i18n.t("help") }}
        />
        <Stack.Screen
          name="Код"
          component={SignUpCode}
          options={{ title: i18n.t("signUpCodeScreen") }}
        /> */}
=======
        <Stack.Screen
          name="Помощь"
          component={Help}
          options={{ title: i18n.t("help") }}
        />
        <Stack.Screen
          name="Код"
          component={SignUpCode}
          options={{ title: i18n.t("signUpCodeScreen") }}
        />
        <Stack.Screen
          name="Регистрация"
          component={SignUpForm}
          options={{ title: i18n.t("signUpFormScreen") }}
        />

        <Stack.Screen
          name="Успешный перевод"
          component={SuccessScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Создать шаблон"
          component={AddFavorites}
          options={{ title: i18n.t("addFavoritesScreen") }}
        />
        <Stack.Screen
          name="Подтверждение перевода"
          component={ConfirmationUser}
          options={{ title: i18n.t("confirmationUserScreen") }}
        />

        <Stack.Screen
          name="Перевести"
          component={TransferCrypto}
          options={{ title: i18n.t("transferCryptoScreen") }}
        />
        <Stack.Screen
          name="Детали карты"
          component={CardDetails}
          options={{ title: i18n.t("cardDetailsScreen") }}
        />
        <Stack.Screen
          name="Все расходы"
          component={AnalyticsPage}
          options={{ title: i18n.t("analyticsPageScreen") }}
        />
        <Stack.Screen
          name="Уведомления"
          component={Notification}
          options={{ title: i18n.t("notificationScreen") }}
        />
        <Stack.Screen
          name="История переводов"
          component={TransactionsScreen}
          options={{ title: i18n.t("transactionsScreen") }}
        />

        {/* <Stack.Screen
            name="Внешние переводы"
            component={TransferCryptoExternal}
          /> */}
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086

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
