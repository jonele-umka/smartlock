import { TOGGLE_DARK_MODE } from "./themeTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const toggleDarkMode = (isEnabled) => {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_DARK_MODE, payload: isEnabled });

    try {
      await AsyncStorage.removeItem("isDarkModeEnabled");
      await AsyncStorage.setItem(
        "isDarkModeEnabled",
        JSON.stringify(isEnabled)
      );
      // console.log("Состояние темной темы сохранено в AsyncStorage.");
    } catch (error) {
      console.log("Ошибка при сохранении состояния темной темы: ", error);
    }
  };
};
