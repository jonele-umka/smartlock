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

// Асинхронный thunk для получения данных о "моих объектах"
export const fetchMyAccommodations = createAsyncThunk(
  "accommodations/fetchMyAccommodations",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/accommodation/my-accommodations`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const responseDataError = await response.json();
        const errorMessage =
          responseDataError.error.Message || "Произошла ошибка";
        console.log(errorMessage);
        return rejectWithValue(errorMessage);
      }

      const data = await response.json();
      return data.Data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
        state.myError = action.payload;
      });
  },
});

export default accommodationsSlice.reducer;
