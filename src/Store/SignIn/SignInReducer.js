import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  loading: false,
  error: null,
  isLoggedIn: false,
  token: null,
  isRegistered: false,
  userName: "",
  refreshToken: null,
};

const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userName: action.payload.userName,
        refreshToken: action.payload.refreshToken,
        loading: false,
        error: null,
        isLoggedIn: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SEND_EMAIL_REQUEST:
      return { ...state, loading: true, error: null };
    case SEND_EMAIL_SUCCESS:
      return { ...state, loading: false };
    case SEND_EMAIL_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case VERIFY_CODE_REQUEST:
      return { ...state, loading: true, error: null };
    case VERIFY_CODE_SUCCESS:
      return { ...state, loading: false };
    case VERIFY_CODE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        isRegistered: false,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isRegistered: true,
      };

    case REGISTER_FAILURE:
      AsyncStorage.removeItem("token");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // case LOGOUT_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null,
    //   };
    // case LOGOUT_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     isLoggedIn: false,
    //     // token: null,
    //   };
    // case LOGOUT_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload,
    //   };

    default:
      return state;
  }
};

export default signInReducer;
