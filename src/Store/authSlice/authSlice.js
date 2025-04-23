import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import i18n from "../../../i18n/i18n";

const API_URL = process.env.API_URL;

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
        console.log(errorMessage);
        return rejectWithValue(errorMessage);
      }

      const data = await response.json();
      const token = data?.token;
      const login = userData?.Email;
      const password = userData?.Password;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("login", login);
      await AsyncStorage.setItem("password", password);
      await AsyncStorage.setItem("authType", "local");
      return { token };
    } catch (error) {
      return rejectWithValue(error.toString());
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
          responseDataError.error.Error || "Произошла ошибка";

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
    try {
      const response = await fetch(`${API_URL}/api/auth/verify_email/${code}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const responseDataError = await response.json();

        const errorMessage =
          responseDataError.error.Error || "Произошла ошибка";

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
          position: "bottom",
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
  async ({ tokenGoogle, userInfo }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/google-auth/exchange-token?token=${tokenGoogle}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const responseDataError = await response.json();
        const errorMessage =
          responseDataError.error?.Error || "Произошла ошибка";
        Toast.show({
          type: "error",
          position: "bottom",
          text2: errorMessage,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
        return rejectWithValue(errorMessage);
      }

      const responseData = await response.json();
      const token = responseData?.token;
      // const user = responseData?.user || null;
      console.log(responseData);
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("authType", "google");

      return { token, user: userInfo };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ refresh_token: token }),
      });

      if (!response.ok) {
        const responseDataError = await response.json();
        const errorMessage = responseDataError.Error || "Произошла ошибка";

        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error",
          text2: i18n.t("errorLogout"),
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
        return rejectWithValue(errorMessage);
      }
      if (response.ok) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("login");
        await AsyncStorage.removeItem("password");
        await AsyncStorage.removeItem("googleAccessToken");
        await AsyncStorage.removeItem("authType");

        return true;
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: i18n.t("error"),
        text2: error.message,
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
      return rejectWithValue(error.message);
    }
  }
);
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const responseDataError = await response.json();
        const errorMessage =
          responseDataError.error.Error || "Произошла ошибка";
        return rejectWithValue(errorMessage);
      }

      const data = await response.json();
      return {
        userProfile: data?.Profile,
        statusOwner: data?.Profile?.status,
        role: data?.Profile?.Role,
      };
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);
export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/delete_me`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error?.Error || "Произошла ошибка";
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error",
          text2: errorMessage,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
        return rejectWithValue(errorMessage);
      }

      await AsyncStorage.multiRemove(["token", "login", "password"]);
      Toast.show({
        type: "success",
        position: "bottom",
        text2: i18n.t("successDelete"),
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });

      return true;
    } catch (error) {
      console.error("Ошибка удаления аккаунта:", error);
      return rejectWithValue(error.toString());
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
    avatar: null,
    userProfile: null,
    statusOwner: null,
    role: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.statusOwner = action.payload.statusOwner;
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
        state.statusOwner = null;
        state.userProfile = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload.userProfile;
        state.statusOwner = action.payload.statusOwner;
        state.role = action.payload.role;
        state.loading = false;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        // state.avatar = action.payload.user?.picture || null;
        // state.userProfile = action.payload.user;
      })

      .addCase(loginGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.userProfile = null;
        state.statusOwner = null;
        state.role = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
