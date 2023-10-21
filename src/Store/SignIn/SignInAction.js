import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SAVE_TOKEN_TO_LOCAL_STORAGE,
  LOAD_TOKEN_FROM_LOCAL_STORAGE,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  VERIFY_CODE_REQUEST,
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./SignInTypes";
import Toast from "react-native-toast-message";
import { API_URL } from "../../constants";
// export const saveTokenToLocalstorage = (token) => {
//   return async (dispatch) => {
//     try {
//       await AsyncStorage.setItem("token", JSON.stringify(token));
//       dispatch({
//         type: SAVE_TOKEN_TO_LOCAL_STORAGE,
//         payload: token,
//       });
//     } catch (error) {
//       console.log(error);

//       Toast.show({
//         type: "error",
//         position: "top",
//         text1: "Ошибка",
//         text2: error,
//         visibilityTime: 3000,
//         autoHide: true,
//         topOffset: 30,
//       });
//     }
//   };
// };

// export const loadTokenFromLocalstorage = () => {
//   return async (dispatch) => {
//     try {
//       const token = await AsyncStorage.getItem("token");

//       dispatch({
//         type: LOAD_TOKEN_FROM_LOCAL_STORAGE,
//         payload: token,
//       });
//     } catch (error) {
//       console.log(error);

//       Toast.show({
//         type: "error",
//         position: "top",
//         text1: "Ошибка",
//         text2: error,
//         visibilityTime: 3000,
//         autoHide: true,
//         topOffset: 30,
//       });
//     }
//   };
// };

// export const loginSuccess = (token) => {
//   return async (dispatch) => {
//     try {
//       await AsyncStorage.setItem("token", token);
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: token,
//       });
//     } catch (error) {
//       console.log(error);

//       Toast.show({
//         type: "error",
//         position: "top",
//         text1: "Ошибка",
//         text2: error,
//         visibilityTime: 3000,
//         autoHide: true,
//         topOffset: 30,
//       });
//     }
//   };
// };

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginUser = (userData) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      const data = await response.json();
      const token = data.data.access_token;
      await AsyncStorage.setItem("token", token);
      dispatch(loginSuccess(token));

      return data;
    } else if (response.status >= 400) {
      console.log(response.status);
      throw new Error("Некорректные данные");
    } else if (response.status >= 500) {
      throw new Error("Ошибка с сервером");
    } else {
      throw new Error("Неизвестная ошибка");
    }
  } catch (error) {
    dispatch(loginFailure(error));
    Toast.show({
      type: "error",
      position: "top",
      text1: "Ошибка",
      text2: error.message,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
    });
  }
};

// export const loginSuccess = (token) => {
//   return async (dispatch) => {
//     try {
//       await AsyncStorage.setItem("token", token);
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: { token },
//       });
//     } catch (error) {
//       Toast.show({
//         type: "error",
//         position: "top",
//         text1: "Ошибка",
//         text2: error,
//         visibilityTime: 3000,
//         autoHide: true,
//         topOffset: 30,
//       });
//     }
//   };
// };

// export const loginUser = (userData) => {
//   return async (dispatch) => {
//     dispatch({ type: LOGIN_REQUEST });

//     try {
//       const response = await fetch("${API_URL}/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const token = data.data.access_token;

//         await dispatch(loginSuccess(token));

//         return data;
//       } else if (response.status >= 400) {
//         throw new Error("Некорректные данные");
//       } else if (response.status >= 500) {
//         throw new Error("Ошибка с сервером");
//       } else {
//         throw new Error("Неизвестная ошибка");
//       }
//     } catch (error) {
//       dispatch({ type: LOGIN_FAILURE, payload: error.message });
//       Toast.show({
//         type: "error",
//         position: "top",
//         text1: "Ошибка",
//         text2: error.message,
//         visibilityTime: 3000,
//         autoHide: true,
//         topOffset: 30,
//       });
//       throw error;
//     }
//   };
// };
export const sendEmail = (email) => {
  return (dispatch) => {
    dispatch({ type: SEND_EMAIL_REQUEST });

    return fetch(`${API_URL}/check-email-by-mobile/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json();
          console.log(data);
          const errorMessage = data?.error?.Code || "Произошла ошибка";

          throw new Error(errorMessage);
        }

        dispatch({ type: SEND_EMAIL_SUCCESS });
        return email;
      })
      .catch((error) => {
        dispatch({ type: SEND_EMAIL_FAILURE, payload: error });
        throw error;
      });
  };
};

export const verifyCode = (code) => {
  return (dispatch) => {
    dispatch({ type: VERIFY_CODE_REQUEST });

    return fetch(`${API_URL}/verify-email-by-mobile/${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json();

          const errorMessage = data?.error?.Code || "Произошла ошибка";
          throw new Error(errorMessage);
        }

        dispatch({ type: VERIFY_CODE_SUCCESS });
      })
      .catch((error) => {
        dispatch({ type: VERIFY_CODE_FAILURE, payload: error });
        throw error;
      });
  };
};

export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const registerUser = (requestData) => {
  return (dispatch) => {
    dispatch(registerRequest());

    return fetch(`${API_URL}/individual/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            const errorMessage = data?.error.Error || "Произошла ошибка";
            console.log(errorMessage, "n");
            throw new Error(errorMessage);
          });
        } else if (response.status >= 400) {
          throw new Error("Некорректные данные");
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(registerSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(registerFailure(error));
        Toast.show({
          type: "error",
          position: "top",
          text1: "fefe",
          text2: error.message,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
      });
  };
};

// export const sendEmail = (email) => {
//   return async (dispatch) => {
//     dispatch({ type: SEND_EMAIL_REQUEST });

//     try {
//       const response = await fetch(
//         `${API_URL}/check-email-by-mobile/${email}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email }),
//         }
//       );

//       if (response.ok) {
//         dispatch({ type: SEND_EMAIL_SUCCESS });
//       } else {
//         throw new Error("Failed to send email.");
//       }
//     } catch (error) {
//       dispatch({ type: SEND_EMAIL_FAILURE, payload: error.message });
//     }
//   };
// };

// export const verifyCode = (code) => {
//   return async (dispatch) => {
//     dispatch({ type: VERIFY_CODE_REQUEST });

//     try {
//       const response = await fetch(
//         `${API_URL}/verify-email-by-mobile/${code}`,
//         {
//           method: "GET",
//         }
//       );

//       if (response.ok) {
//         dispatch({ type: VERIFY_CODE_SUCCESS });
//       } else {
//         throw new Error("Invalid verification code.");
//       }
//     } catch (error) {
//       dispatch({ type: VERIFY_CODE_FAILURE, payload: error.message });
//     }
//   };
// };

// export const registerUser = (requestData) => {
//   return (dispatch) => {
//     dispatch(registerRequest());

//     return fetch("${API_URL}/individual/registration", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestData),
//     })
//       .then((response) => {
//         console.log(response);

//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error("Failed to register user.");
//         }
//       })
//       .then((data) => {
//         console.log(data);
//         const token = data.data.access_token;
//         dispatch(loginSuccess(token));
//         dispatch(registerSuccess());
//       })
//       .catch((error) => {
//         dispatch(registerFailure(error.message));
//         Toast.show({
//           type: "error",
//           position: "top",
//           text1: "Ошибка",
//           text2: error.message,
//           visibilityTime: 3000,
//           autoHide: true,
//           topOffset: 30,
//         });
//       });
//   };
// };

// import {
//   SEND_EMAIL_REQUEST,
//   SEND_EMAIL_SUCCESS,
//   SEND_EMAIL_FAILURE,
//   VERIFY_CODE_REQUEST,
//   VERIFY_CODE_SUCCESS,
//   VERIFY_CODE_FAILURE,
// } from "./registerTypes";

// export const sendEmail = (email) => {
//   return async (dispatch) => {
//     dispatch({ type: SEND_EMAIL_REQUEST });

//     try {
//       const response = await fetch(
//         `http://206.81.16.41:8080/auth/check-email/${email}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const data = await response.json();

//       if (response.ok) {
//         dispatch({ type: SEND_EMAIL_SUCCESS, payload: data.message });
//       } else {
//         dispatch({ type: SEND_EMAIL_FAILURE, payload: data.error });
//       }
//     } catch (error) {
//       dispatch({ type: SEND_EMAIL_FAILURE, payload: error.message });
//     }
//   };
// };

// export const verifyCode = (code) => {
//   return async (dispatch) => {
//     dispatch({ type: VERIFY_CODE_REQUEST });

//     try {
//       const response = await fetch(
//         `http://206.81.16.41:8080/auth/verify-email/${code}`,
//         {
//           method: "GET",
//         }
//       );

//       if (response.ok) {
//         dispatch({ type: VERIFY_CODE_SUCCESS });
//       } else {
//         throw new Error("Invalid verification code.");
//       }
//     } catch (error) {
//       dispatch({ type: VERIFY_CODE_FAILURE, payload: error.message });
//     }
//   };
// };

// actions.js

// export const logoutRequest = () => ({
//   type: LOGOUT_REQUEST,
// });

// export const logoutSuccess = () => ({
//   type: LOGOUT_SUCCESS,
// });

// export const logoutFailure = (error) => ({
//   type: LOGOUT_FAILURE,
//   payload: error,
// });
// export const logoutUser = () => {
//   return async (dispatch, getState) => {
//     const token = getState().signIn.token;
//     dispatch(logoutRequest());

//     try {
//       // Вызов API для выхода
//       const response = await fetch("${API_URL}/logout/", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       // Удаление токена из AsyncStorage
//       await AsyncStorage.removeItem("token");

//       dispatch(logoutSuccess());
//     } catch (error) {
//       dispatch(logoutFailure(error.message));
//       Toast.show({
//         type: "error",
//         position: "top",
//         text1: "Ошибка",
//         text2: error.message,
//         visibilityTime: 3000,
//         autoHide: true,
//         topOffset: 30,
//       });
//     }
//   };
// };
// export const loginUser = (userData) => {
//   return async (dispatch) => {
//     dispatch({ type: LOGIN_REQUEST });

//     try {
//       const response = await fetch("${API_URL}/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const token = data.data.access_token;
//         console.log(token);
//         await dispatch(loginSuccess(token));
//         return data;
//       } else if (response.status >= 400) {
//         console.log(response.status);
//         throw new Error("Некорректные данные");
//       } else if (response.status >= 500) {
//         throw new Error("Ошибка с сервером");
//       } else {
//         throw new Error("Неизвестная ошибка");
//       }
//     } catch (error) {
//       console.log(error)
//       dispatch({ type: LOGIN_FAILURE, payload: error.message });
//       Toast.show({
//         type: "error",
//         position: "top",
//         text1: "Ошибка",
//         text2: error.message,
//         visibilityTime: 3000,
//         autoHide: true,
//         topOffset: 30,
//       });
//       throw error;
//     }
//   };
// };
