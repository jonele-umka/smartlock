import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavBar from "./NavBar";
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
          setInitialRoute("Pin");
        } else {
          setInitialRoute("Войти");
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
        <Stack.Screen
          name="Войти"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Смена пароля"
          component={ChangePassword}
          options={{ title: i18n.t("changePassword") }}
        />
        <Stack.Screen
          name="Email"
          component={SignUpEmail}
          options={{ title: i18n.t("signUpEmailScreen") }}
        />
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

        {/* <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
