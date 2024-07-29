// rootReducer.js
import { combineReducers } from "redux";
import themeReducer from "./DarkTheme/themeReducer";
import signInReducer from "./SignIn/SignInReducer";
import transactionsReducer from "./Transactions/transactionsReducer";
import favoritesReducer from "./favoritesSlice/FavoritesReducer";

const rootReducer = combineReducers({
  theme: themeReducer,
  signIn: signInReducer,
  transactions: transactionsReducer,
  favorites: favoritesReducer,
});

export default rootReducer;
