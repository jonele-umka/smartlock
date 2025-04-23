import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../../i18n/i18n";
import * as Localization from "expo-localization";

// Асинхронная загрузка языка из AsyncStorage
export const loadLanguage = createAsyncThunk(
  "language/loadLanguage",
  async () => {
    const storedLanguage = await AsyncStorage.getItem("language");
    return storedLanguage || Localization.locale;
  }
);

const initialState = {
  language: Localization.locale,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      i18n.setLocale(action.payload);
      AsyncStorage.setItem("language", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadLanguage.fulfilled, (state, action) => {
      state.language = action.payload;
      i18n.setLocale(action.payload);
    });
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
