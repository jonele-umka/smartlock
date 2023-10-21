import {
  ADD_TO_FAVORITES,
  LOAD_FAVORITES_FROM_STORAGE,
  REMOVE_FROM_FAVORITES,
} from "./FavoritesTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addToFavorites = (transaction) => {
  return async (dispatch) => {
    try {
      // Добавляем транзакцию в избранное в Redux Store
      dispatch({
        type: ADD_TO_FAVORITES,
        payload: transaction,
      });

      // Получаем текущий список избранных транзакций из AsyncStorage
      const existingFavorites = await AsyncStorage.getItem("favorites");
      const favorites = existingFavorites ? JSON.parse(existingFavorites) : [];

      // Добавляем новую транзакцию в список избранных
      favorites.push(transaction);

      // Сохраняем обновленный список в AsyncStorage
      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error(error);
    }
  };
};

export const loadFavoritesFromStorage = () => {
  return async (dispatch) => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites) {
        const favoritesArray = JSON.parse(favorites);
        dispatch({
          type: LOAD_FAVORITES_FROM_STORAGE,
          payload: favoritesArray,
        });
      }
    } catch (error) {
      console.error("Error loading favorites from AsyncStorage:", error);
    }
  };
};
export const removeFromFavorites = (favorite) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: REMOVE_FROM_FAVORITES,
        payload: favorite,
      });

      // Получаем текущий список избранных транзакций из AsyncStorage
      const existingFavorites = await AsyncStorage.getItem("favorites");
      const favorites = existingFavorites ? JSON.parse(existingFavorites) : [];

      // Удаляем транзакцию из списка избранных
      const updatedFavorites = favorites.filter(
        (item) => item.id !== favorite.id
      );

      // Сохраняем обновленный список в AsyncStorage
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error(error);
    }
  };
};
