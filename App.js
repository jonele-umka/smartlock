// import React, { useEffect } from "react";
// import Navigator from "./src/navigation";
// // import { toggleDarkMode } from "./src/Store/DarkTheme/themeAction";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Provider } from "react-redux";
// import store from "./src/Store/store";
// import Toast from "react-native-toast-message";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import * as Localization from "expo-localization";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { StatusBar, Text as RNText, View, StyleSheet } from "react-native";
// import NotificationWebSocket from "./WebSocket/notificationWebSocket";
// import * as Notifications from "expo-notifications";
// import Constants from "expo-constants";
// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
// SplashScreen.preventAutoHideAsync();
// const CustomText = ({ style, children, ...props }) => {
//   return (
//     <RNText style={[{ fontFamily: "Inter-Black" }, style]} {...props}>
//       {children}
//     </RNText>
//   );
// };
// const App = () => {
//   const [fontsLoaded, fontError] = useFonts({
//     PierSans: require("./src/assets/Fonts/PierSans-FreeForPersonalUse/PierSans-Regular.otf"),
//   });

//   const onLayoutRootView = useCallback(async () => {
//     if (fontsLoaded || fontError) {
//       await SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded, fontError]);

//   if (!fontsLoaded && !fontError) {
//     return null;
//   }
//   useEffect(() => {
//     AsyncStorage.getItem("language").then((storedLanguage) => {
//       if (storedLanguage) {
//         Localization.locale = storedLanguage;
//       } else {
//         Localization.locale = "ru";
//       }
//     });
//     // Запрос разрешений на уведомления
//     const registerForPushNotifications = async () => {
//       let token;
//       const { status: existingStatus } =
//         await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;
//       if (existingStatus !== "granted") {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }
//       if (finalStatus !== "granted") {
//         alert("Не удалось получить разрешение на отправку уведомлений!");
//         return;
//       }
//       // Получение токена для уведомлений
//       try {
//         const projectId =
//           Constants?.expoConfig?.extra?.eas?.projectId ??
//           Constants?.easConfig?.projectId;
//         if (!projectId) {
//           throw new Error("Идентификатор проекта не найден");
//         }
//         token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
//         console.log(token);
//       } catch (error) {
//         console.error("Ошибка при получении токена уведомлений:", error);
//         token = null;
//       }
//     };

//     registerForPushNotifications();
//   }, []);

//   return (
//     <Provider store={store}>
//       <SafeAreaProvider>
//         <StatusBar />
//         <Navigator />
//         <NotificationWebSocket />
//         <Toast />
//       </SafeAreaProvider>
//     </Provider>
//   );
// };

// export default App;
import React, { useEffect, useCallback } from "react";
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

SplashScreen.preventAutoHideAsync();

const App = () => {
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
    AsyncStorage.getItem("language").then((storedLanguage) => {
      if (storedLanguage) {
        Localization.locale = storedLanguage;
      } else {
        Localization.locale = "ru";
      }
    });

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
        console.log(token);
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
        <StatusBar />
        <Navigator />
        <NotificationWebSocket />
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
