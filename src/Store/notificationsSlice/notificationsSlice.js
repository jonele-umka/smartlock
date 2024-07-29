// notificationsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_URL = process.env.API_URL;

const initialState = {
  notifications: [],
  status: "idle",
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotification",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/notification/user_notification`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const responseDataError = await response.json();
        const errorMessage =
          responseDataError.error?.Error || "Произошла ошибка";
        return rejectWithValue(errorMessage);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default notificationsSlice.reducer;
