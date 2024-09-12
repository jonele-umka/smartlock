import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.API_URL;

export const fetchReservation = createAsyncThunk(
  "reservation/fetchReservation",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/booking/get-my-bookings`, {
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

const reservationSlice = createSlice({
  name: "reservation",
  initialState: {
    reservation: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchReservation
      .addCase(fetchReservation.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchReservation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reservation = action.payload;
      })
      .addCase(fetchReservation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default reservationSlice.reducer;
