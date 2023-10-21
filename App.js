import React from "react";
import Navigator from "./src/navigation";
// import { toggleDarkMode } from "./src/Store/DarkTheme/themeAction";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import store from "./src/Store/store";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GluestackUIProvider } from "@gluestack-ui/themed";
const App = () => {
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
      <GluestackUIProvider>
        <SafeAreaProvider>
          <Navigator />
          <Toast />
        </SafeAreaProvider>
      </GluestackUIProvider>
    </Provider>
  );
};

export default App;
