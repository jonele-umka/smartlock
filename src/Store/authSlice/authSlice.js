import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const API_URL = process.env.API_URL;

// Асинхронные действия (thunks)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const responseDataError = await response.json();
        const errorMessage =
          responseDataError.error.Error || "Произошла ошибка";
        return rejectWithValue(errorMessage);
      }

      const data = await response.json();
      const token = data?.token;
      const login = userData?.Email;
      const password = userData?.Password;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("login", login);
      await AsyncStorage.setItem("password", password);

      return token;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendEmail = createAsyncThunk(
  "auth/sendEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      });

      if (!response.ok) {
        const responseDataError = await response.json();
        const errorMessage =
          responseDataError.error.Message || "Произошла ошибка";

        // Toast.show({
        //   type: "error",
        //   position: "top",
        //   text2: errorMessage,
        //   visibilityTime: 3000,
        //   autoHide: true,
        //   topOffset: 30,
        // });
        return rejectWithValue(errorMessage);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const verifyCode = createAsyncThunk(
  "auth/verifyCode",
  async (code, { rejectWithValue }) => {
    console.log("dw", code);
    try {
      const response = await fetch(`${API_URL}/api/auth/verify_email/${code}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const responseDataError = await response.json();
        console.log(responseDataError);
        const errorMessage =
          responseDataError.error.Message || "Произошла ошибка";
        // Toast.show({
        //   type: "error",
        //   position: "top",
        //   text2: errorMessage,
        //   visibilityTime: 3000,
        //   autoHide: true,
        //   topOffset: 30,
        // });
        return rejectWithValue(errorMessage);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const resendCode = createAsyncThunk(
  "auth/resend_verification_code",
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/api/auth/resend_verification_code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Email: email }),
        }
      );
      if (!response.ok) {
        const responseDataError = await response.json();

        const errorMessage =
          responseDataError.error.Error || "Произошла ошибка";
        Toast.show({
          type: "error",
          position: "top",
          text2: errorMessage,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
        return rejectWithValue(errorMessage);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const loginGoogle = createAsyncThunk(
  "google-auth/login",
  async ({ rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/google-auth/login`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (!response.ok) {
        const responseDataError = await response.json();
        console.log(responseDataError);
        const errorMessage =
          responseDataError.error.Error || "Произошла ошибка";
        Toast.show({
          type: "error",
          position: "top",
          text2: errorMessage,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
        return rejectWithValue(errorMessage);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const responseDataError = await response.json();
        const errorMessage =
          responseDataError.error.Message || "Произошла ошибка";
        return rejectWithValue(errorMessage);
      }

      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("login");
      await AsyncStorage.removeItem("password");

      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Слайс
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    token: null,
    userName: "",
  },
  reducers: {
    // Вы можете добавлять дополнительные синхронные действия здесь
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyCode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resendCode.pending, (state) => {
        state.error = null;
      })
      .addCase(resendCode.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.userName = "";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
