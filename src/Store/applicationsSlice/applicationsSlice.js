import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchApplications = createAsyncThunk(
  "applications/fetchApplications",
  async (status, { getState }) => {
    const API_URL = process.env.API_URL;
    const { token } = getState().auth;
    const response = await fetch(
      `${API_URL}/booking/get-all?status=${status}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
    const data = await response.json();

    return data.Data;
  }
);

const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    data: {
      pending: [],
      active: [],
      rejected: [],
    },
    status: "idle",
    error: null,
  },
  reducers: {
    updateApplicationList: (state, action) => {
      const { status, applications } = action.payload;
      state.data[status] = applications;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.status = "succeeded";
        const status = action.meta.arg; // статус из вызова
        state.data[status] = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateApplicationList } = applicationSlice.actions;
export default applicationSlice.reducer;
