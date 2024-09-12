import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import notificationsReducer from "./notificationsSlice/notificationsSlice";
import accommodationSlice from "./accommodationSlice/accommodationSlice";
import favoritesSlice from "./favoritesSlice/favoritesSlice";
import searchSlice from "./searchSlice/searchSlice";
import applicationsSlice from "./applicationsSlice/applicationsSlice";
import reservationSlice from "./reservationSlice/reservationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationsReducer,
    accommodation: accommodationSlice,
    favorites: favoritesSlice,
    search: searchSlice,
    applications: applicationsSlice,
    reservation: reservationSlice,
  },
});

export default store;
