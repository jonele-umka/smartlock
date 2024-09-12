import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.API_URL;

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/favorites/get-all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const responseDataError = await response.json();
        console.log(responseDataError);
        const errorMessage =
          responseDataError.error.Message || "Произошла ошибка";
        return rejectWithValue(errorMessage);
      }
      const data = await response.json();
      return data.Data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/favorites/create/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const responseDataError = await response.json();
        console.log(responseDataError);
        const errorMessage =
          responseDataError.error.Message || "Произошла ошибка";
        return rejectWithValue(errorMessage);
      }
      const data = await response.json();
      console.log("add", id);
      return data.AccommodationID;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async ({ id, token }, { rejectWithValue }) => {
    console.log("id", id);

    try {
      const response = await fetch(`${API_URL}/favorites/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const responseDataError = await response.json();

        const errorMessage =
          responseDataError.error.Message || "Произошла ошибка";

        return rejectWithValue(errorMessage);
      }
    
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [], // Убедитесь, что это массив
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchFavorites
      .addCase(fetchFavorites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // addFavorite
      .addCase(addFavorite.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favorites.push(action.payload);
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // removeFavorite
      .addCase(removeFavorite.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Проверяем, что favorites - это массив, перед вызовом filter
        if (Array.isArray(state.favorites)) {
          state.favorites = state.favorites.filter(
            (item) => item.ID !== action.payload
          );
        }
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default favoritesSlice.reducer;
