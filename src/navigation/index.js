import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeScreen from "../screens/WelcomeScreen";
import NavBar from "./NavBar";
import SignIn from "../screens/Registration/SignIn";
import SignUpEmail from "../screens/Registration/SignUp/SignUpEmail";
import SignUpCode from "../screens/Registration/SignUp/SignUpCode";
import SignUpForm from "../screens/Registration/SignUp/SignUpForm";
import { TransferCryptoInternal } from "../screens/TransferCrypto/TransferCryptoInternal";
import SuccessScreen from "../screens/TransferCrypto/SuccessTransfer/SuccessTransfer";
import TransactionsScreen from "../screens/TransactionsScreen";
import ConfirmationUser from "../screens/TransferCrypto/СonfirmationUser/ConfirmationUser";
import { AddFavorites } from "../screens/AddFavorites/AddFavorites";
import CardDetails from "../components/CardTabs/CardTabsScreen/Crypto/CardDetails";
import AnalyticsPage from "../components/Analytics/AnalyticsPage";
import Notification from "../screens/Notification/Notification";

import PinCodePage from "../screens/PinCodePage/PinCodePage";
import { loginSuccess } from "../Store/SignIn/SignInAction";
import CreatePinCode from "../screens/PinCodePage/CreatePinCode";
import CorrectPinCode from "../screens/PinCodePage/CorrectPinCode";
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pin"
          component={PinCodePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreatePin"
          component={CreatePinCode}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="CorrectPinCode" component={CorrectPinCode} />
        <Stack.Screen
          name="Войти"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Email"
          component={SignUpEmail}
          // options={{
          //   headerStyle: {
          //     backgroundColor: "#191a1d",
          //   },
          //   headerTintColor: "#ffffff",
          // }}
        />
        <Stack.Screen name="Код" component={SignUpCode} />
        <Stack.Screen name="Регистрация" component={SignUpForm} />

        <Stack.Screen
          name="SuccessTransfer"
          component={SuccessScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Создать шаблон" component={AddFavorites} />
        <Stack.Screen
          name="Подтверждение перевода"
          component={ConfirmationUser}
        />

        <Stack.Screen name="Перевести" component={TransferCryptoInternal} />
        <Stack.Screen name="Детали карты" component={CardDetails} />
        <Stack.Screen name="Все расходы" component={AnalyticsPage} />
        <Stack.Screen name="Уведомления" component={Notification} />
        <Stack.Screen name="История переводов" component={TransactionsScreen} />

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
