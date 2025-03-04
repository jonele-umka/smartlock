import React, { useEffect, useCallback, useState } from "react";
import Navigator from "./src/navigation";
import { Provider } from "react-redux";
import store from "./src/Store/store";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "react-native";
import NotificationWebSocket from "./WebSocket/notificationWebSocket";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  fetchAmenities,
  fetchCategory,
  fetchRules,
} from "./src/Store/dictionarySlice/dictionarySlice";
import i18n from "./src/components/i18n/i18n";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [language, setLanguage] = useState("ru"); // Добавляем useState для хранения языка

  const [fontsLoaded, fontError] = useFonts({
    "IBMPlexSans-Regular": require("./src/assets/Fonts/IBM_Plex_Sans/IBMPlexSans-Regular.ttf"),
    "IBMPlexSans-Medium": require("./src/assets/Fonts/IBM_Plex_Sans/IBMPlexSans-Medium.ttf"),
    "IBMPlexSans-Semibold": require("./src/assets/Fonts/IBM_Plex_Sans/IBMPlexSans-SemiBold.ttf"),
    "IBMPlexSans-Bold": require("./src/assets/Fonts/IBM_Plex_Sans/IBMPlexSans-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("language");
        const selectedLanguage = storedLanguage || "ru";

        Localization.locale = selectedLanguage; // Устанавливаем язык для expo-localization
        i18n.locale = selectedLanguage; // Устанавливаем язык для i18n
        setLanguage(selectedLanguage); // Обновляем useState

        // Загружаем данные после установки языка
        store.dispatch(fetchAmenities());
        store.dispatch(fetchRules());
        store.dispatch(fetchCategory());
      } catch (error) {
        console.error("Ошибка при загрузке языка:", error);
      }
    };

    loadLanguage();

    const registerForPushNotifications = async () => {
      let token;
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Не удалось получить разрешение на отправку уведомлений!");
        return;
      }
      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error("Идентификатор проекта не найден");
        }
        token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      } catch (error) {
        console.error("Ошибка при получении токена уведомлений:", error);
        token = null;
      }
    };

    registerForPushNotifications();

    if (fontsLoaded || fontError) {
      onLayoutRootView();
    }
  }, [fontsLoaded, fontError, onLayoutRootView]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="light" translucent={true} />
        <Navigator />
        <NotificationWebSocket />
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
