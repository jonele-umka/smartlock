import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.API_URL;

// Асинхронные действия для получения данных
export const fetchAmenities = createAsyncThunk(
  "fetch/amenities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/dictionary/facilities/get_all`);
      if (!response.ok) {
        throw new Error("Ошибка загрузки удобств");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRules = createAsyncThunk(
  "fetch/rules",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/dictionary/rules/get_all`);
      if (!response.ok) {
        throw new Error("Ошибка загрузки правил");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "fetch/category",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/dictionary/categories/get_all`);
      if (!response.ok) {
        throw new Error("Ошибка загрузки категорий");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCheckInOut = createAsyncThunk(
  "fetch/check_in_out",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/dictionary/check_in_out`);
      if (!response.ok) {
        throw new Error("Ошибка загрузки времени регистрации/выселения");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Создание слайса
const dictionarySlice = createSlice({
  name: "dictionary",
  initialState: {
    amenities: [],
    rules: [],
    categories: [],
    checkInOut: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Запрос удобств
      .addCase(fetchAmenities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAmenities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.amenities = action.payload;
      })
      .addCase(fetchAmenities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Запрос правил
      .addCase(fetchRules.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRules.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rules = action.payload;
      })
      .addCase(fetchRules.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Запрос категорий
      .addCase(fetchCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Запрос времени регистрации/выселения
      .addCase(fetchCheckInOut.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCheckInOut.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.checkInOut = action.payload;
      })
      .addCase(fetchCheckInOut.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default dictionarySlice.reducer;
