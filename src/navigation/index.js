import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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
import Chat from "../screens/Chat/Chat";
// import { useSelector } from "react-redux";
const Stack = createStackNavigator();

const Navigator = () => {
  // const token = useSelector((state) => state.signIn.token);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Main"
            component={NavBar}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Войти"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Email"
            component={SignUpEmail}
            options={{
              headerStyle: {
                backgroundColor: "#191a1d",
              },
              headerTintColor: "#ffffff",
            }}
          />
          <Stack.Screen name="Код" component={SignUpCode} />
          <Stack.Screen name="Регистрация" component={SignUpForm} />

          <Stack.Screen name="SuccessTransfer" component={SuccessScreen} />
          <Stack.Screen name="Создать шаблон" component={AddFavorites} />
          <Stack.Screen
            name="Подтверждение перевода"
            component={ConfirmationUser}
          />

          <Stack.Screen name="Перевести" component={TransferCryptoInternal} />
          <Stack.Screen name="Детали карты" component={CardDetails} />
          <Stack.Screen name="Все расходы" component={AnalyticsPage} />
          <Stack.Screen name="Уведомления" component={Chat} />

          {/* <Stack.Screen
            name="Внешние переводы"
            component={TransferCryptoExternal}
          /> */}
          <Stack.Screen
            name="История переводов"
            component={TransactionsScreen}
          />

          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigator;
