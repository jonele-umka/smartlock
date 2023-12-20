import React, { useEffect } from "react";
import Navigator from "./src/navigation";
// import { toggleDarkMode } from "./src/Store/DarkTheme/themeAction";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import store from "./src/Store/store";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
// import { GluestackUIProvider } from "@gluestack-ui/themed";
const App = () => {
  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      Notifications.setNotificationChannelAsync("default", {
        name: "Default Channel",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });

      try {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          console.log("Failed to get push token for push notification!");
          return;
        }

        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("Expo Push Token:", token);

        // Отправьте токен на сервер, чтобы связать его с пользователем
      } catch (error) {
        console.error("Error during push token retrieval:", error);
      }
    };

    registerForPushNotificationsAsync();
  }, []);

  // ...

  // useEffect(() => {
  //   AsyncStorage.getItem("isDarkModeEnabled")
  //     .then((value) => {
  //       if (value !== null) {
  //         const isDarkMode = JSON.parse(value);
  //         store.dispatch(toggleDarkMode(isDarkMode));
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "Ошибка при чтении состояния темной темы из AsyncStorage: ",
  //         error
  //       );
  //     });
  // }, []);

  return (
    <Provider store={store}>
      {/* <GluestackUIProvider> */}
      <SafeAreaProvider>
        <Navigator />
        <Toast />
      </SafeAreaProvider>
      {/* </GluestackUIProvider> */}
    </Provider>
  );
};

export default App;
