// import { API_URL } from "../../constants";
// import { LOAD_FAVORITES, SET_LOADING } from "./FavoritesTypes";

// export const loadFavorites = (data) => {
//   return {
//     type: LOAD_FAVORITES,
//     payload: data,
//   };
// };

// export const setLoading = (loading) => {
//   return {
//     type: SET_LOADING,
//     payload: loading,
//   };
// };

// export const fetchFavorites = (token) => async (dispatch) => {
//   try {
//     dispatch(setLoading(true));

//     const response = await fetch(`${API_URL}/transfer-template`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();

//       dispatch(loadFavorites(data));
//     } else {
//       console.error("Ошибка при выполнении GET-запроса:", response.statusText);
//     }
//   } catch (error) {
//     console.error("Ошибка при  загрузке:", error);
//   } finally {
//     dispatch(setLoading(false));
//   }
// };
// // FavoritesActions.js

// // ... (импорт необходимых ваших зависимостей и констант)

// export const deleteFavorite = (id, token) => async (dispatch) => {
//   try {
//     const response = await fetch(
//       `http://coffee.microret.com:8088/transfer-template/${id}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       const errorMessage = await response.json();
//       throw new Error(JSON.stringify(errorMessage));
//     }

//     console.log(`Элемент с ID ${id} успешно удален.`);

//     dispatch(fetchFavorites(token));
//   } catch (error) {
//     console.error("Ошибка при удалении элемента:", error);
//   }
// };
