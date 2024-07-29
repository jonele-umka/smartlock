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
import ObjectDetailsScreen from "../screens/Objects/ObjectDetailsScreen/ObjectDetailsScreen";
import AllReviewsScreen from "../screens/Reviews/AllReviewsScreen";
import AllConditions from "../screens/AllConditions/AllConditions";
import AllQuestionsScreen from "../screens/QuestionsScreen/AllQuestionsScreen";
import AllVariantHotels from "../screens/AllVariantHotels/AllVariantHotels";
import Landlord from "../screens/Owner/Landlord/Landlord";
import CalendarScreen from "../screens/CalendarScreen/CalendarScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen/ConfirmationScreen";
import Settings from "../screens/Settings/Settings";
import EditProfile from "../screens/EditProfile/EditProfile";
import MyObjectsScreen from "../screens/Objects/MyObjectScreen/MyObjectsScreen";
import Payments from "../screens/Payments/Payments";
import Objects from "../components/ObjectsComponent/Objects";
// import EditObjects from "../screens/Owner/MyObjects/EditObjects";
import AddCard from "../screens/AddCard/AddCard";
import LockScreen from "../screens/LockScreen/LockScreen";
import EditLock from "../screens/LockScreen/EditLock/EditLock";
import ForgotPassword from "../screens/Registration/ForgotPassword/ForgotPassword";
import { loginUser } from "../Store/authSlice/authSlice";
import VerifyCodeForgotPassword from "../screens/Registration/ForgotPassword/VerifyCodeForgotPassword";
import CreateNewPassword from "../screens/Registration/ForgotPassword/CreateNewPassword";
import CameraScreen from "../screens/CameraScreen/CameraScreen";
import Notification from "../screens/Notification/Notification";
import DetailsNotification from "../screens/Notification/DetailsNotification/DetailsNotification";
import Owner from "../screens/Owner/Owner";
import EditOwner from "../screens/Owner/EditOwner/EditOwner";
import Applications from "../screens/Owner/Applications/Applications";
import ChangeEmail from "../screens/EditProfile/ChangeEmail/ChangeEmail";
import ConfirmCode from "../screens/EditProfile/ChangeEmail/ConfirmCode";
import BecomeOwner from "../screens/Owner/MyObjects/BecomeOwner/BecomeOwner";
import MoreDetailsApplications from "../screens/Owner/MoreDetailsApplications/MoreDetailsApplications";
import EditObject from "../screens/Objects/EditObject/EditObject";

const Stack = createStackNavigator();

const Navigator = () => {
  const dispatch = useDispatch();
  const [initialRoute, setInitialRoute] = useState("loading");

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
              if (
                error ===
                "crypto/bcrypt: hashedPassword is not the hash of the given password"
              ) {
                setInitialRoute("Войти");
              } else {
                setInitialRoute("Войти");
              }
            });
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
        <Stack.Screen name="Результаты поиска" component={SearchResults} />
        <Stack.Screen
          name="Данные об отеле"
          component={ObjectDetailsScreen}
          options={{
            headerShown: true, // Показать заголовок
            headerTransparent: true, // Прозрачный фон заголовка
            headerTintColor: "#fff", // Цвет текста заголовка
            title: "", // Заголовок
          }}
        />
        <Stack.Screen name="Объекты" component={Objects} />
        <Stack.Screen name="Все отзывы" component={AllReviewsScreen} />
        <Stack.Screen name="Все условия" component={AllConditions} />
        <Stack.Screen name="Все вопросы" component={AllQuestionsScreen} />
        <Stack.Screen name="Все варианты" component={AllVariantHotels} />
        <Stack.Screen name="Сдать жильё" component={Landlord} />
        <Stack.Screen name="Настройки" component={Settings} />
        <Stack.Screen name="Редактировать профиль" component={EditProfile} />
        <Stack.Screen name="Управление объектами" component={MyObjectsScreen} />
        <Stack.Screen name="Платежи и выплаты" component={Payments} />
        {/* <Stack.Screen name="Просмотр объекта" component={EditObjects} /> */}
        <Stack.Screen name="Даты поездки" component={CalendarScreen} />
        <Stack.Screen name="Добавить карту" component={AddCard} />
        <Stack.Screen name="Замок номера" component={LockScreen} />
        <Stack.Screen name="Редактировать пин" component={EditLock} />
        <Stack.Screen
          name="Подтвердить код"
          component={VerifyCodeForgotPassword}
        />
        <Stack.Screen name="Владелец" component={Owner} />
        <Stack.Screen name="Заявки" component={Applications} />
        <Stack.Screen name="Изменить почту" component={ChangeEmail} />
        <Stack.Screen name="Подтверждение кода" component={ConfirmCode} />
        <Stack.Screen name="Стать владельцем" component={BecomeOwner} />

        <Stack.Screen
          name="Редактировать данные владельца"
          component={EditOwner}
        />

        <Stack.Screen
          name="Создать новый пароль"
          component={CreateNewPassword}
        />

        <Stack.Screen
          name="Подтверждение брони"
          component={ConfirmationScreen}
        />
        <Stack.Screen
          name="Просмотр уведомлений"
          component={DetailsNotification}
        />
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
          name="Камера"
          component={CameraScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Смена пароля"
          component={ChangePassword}
          options={"Смена пароля"}
        />
        <Stack.Screen
          name="Редактировать объект"
          component={EditObject}
          options={{ title: i18n.t("changePassword") }}
        />

        {/*
        <Stack.Screen
          name="Помощь"
          component={Help}
          options={{ title: i18n.t("help") }}
      />*/}
        <Stack.Screen
          name="Просмотр заявки"
          component={MoreDetailsApplications}
        />
        <Stack.Screen
          name="Уведомления"
          component={Notification}
          options={{ title: i18n.t("notificationScreen") }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
