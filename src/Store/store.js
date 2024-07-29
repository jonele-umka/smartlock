import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import notificationsReducer from "./notificationsSlice/notificationsSlice";
import accommodationSlice from "./accommodationSlice/accommodationSlice";
import favoritesSlice from "./favoritesSlice/favoritesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationsReducer,
    accommodation: accommodationSlice,
    favorites: favoritesSlice,
  },
});

export default store;
