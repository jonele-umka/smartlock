import {
  ADD_TO_FAVORITES,
  LOAD_FAVORITES_FROM_STORAGE,
  REMOVE_FROM_FAVORITES,
} from "./FavoritesTypes";

const initialState = {
  favorites: [],
};

const FavoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case LOAD_FAVORITES_FROM_STORAGE:
      return {
        ...state,
        favorites: action.payload,
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default FavoritesReducer;
