import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.API_URL;

// Асинхронный thunk для получения всех данных
export const fetchAccommodations = createAsyncThunk(
  "accommodations/fetchAccommodations",
  async () => {
    const response = await fetch(`${API_URL}/accommodation/get-all`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.Data;
  }
);

export const fetchMyAccommodations = createAsyncThunk(
  "accommodations/fetchMyAccommodations",
  async (token) => {
    const response = await fetch(`${API_URL}/accommodation/my-accommodations`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  }
);

// Создаем слайс
const accommodationsSlice = createSlice({
  name: "accommodations",
  initialState: {
    accommodations: [],
    myAccommodations: [],
    status: "idle",
    myStatus: "idle",
    error: null,
    myError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccommodations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAccommodations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accommodations = action.payload;
      })
      .addCase(fetchAccommodations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMyAccommodations.pending, (state) => {
        state.myStatus = "loading";
      })
      .addCase(fetchMyAccommodations.fulfilled, (state, action) => {
        state.myStatus = "succeeded";
        state.myAccommodations = action.payload;
      })
      .addCase(fetchMyAccommodations.rejected, (state, action) => {
        state.myStatus = "failed";
        state.myError = action.error.message; // Исправлено
      });
  },
});

export default accommodationsSlice.reducer;
