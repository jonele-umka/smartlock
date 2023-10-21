// thunks.js

import {
  FETCH_TRANSACTIONS_REQUEST,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_ERROR,
  FETCH_TRANSACTIONS_INCOMING_REQUEST,
  FETCH_TRANSACTIONS_INCOMING_SUCCESS,
  FETCH_TRANSACTIONS_INCOMING_ERROR,
} from "./transactionsTypes";
import Toast from "react-native-toast-message";
import { API_URL } from "../../constants";

export const fetchTransactionsRequest = () => ({
  type: FETCH_TRANSACTIONS_REQUEST,
});

export const fetchTransactionsSuccess = (data) => ({
  type: FETCH_TRANSACTIONS_SUCCESS,
  payload: data,
});

export const fetchTransactionsError = (error) => ({
  type: FETCH_TRANSACTIONS_ERROR,
  payload: error,
});
export const fetchTransactions = () => {
  return async (dispatch, getState) => {
    const token = getState().signIn.token;
    dispatch(fetchTransactionsRequest());

    try {
      const response = await fetch(`${API_URL}/rabbit-log?order_by=-id`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      dispatch(fetchTransactionsSuccess(data.data));
    } catch (error) {
      dispatch(fetchTransactionsError(error.message));
      Toast.show({
        type: "error",
        position: "top",
        text1: "Ошибка",
        text2: "Ошибка c загрузкой истории переводов",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
    }
  };
};

export const fetchTransactionsIncomingRequest = () => ({
  type: FETCH_TRANSACTIONS_INCOMING_REQUEST,
});

export const fetchTransactionsIncomingSuccess = (data) => ({
  type: FETCH_TRANSACTIONS_INCOMING_SUCCESS,
  payload: data,
});

export const fetchTransactionsIncomingError = (error) => ({
  type: FETCH_TRANSACTIONS_INCOMING_ERROR,
  payload: error,
});
export const fetchTransactionsIncoming = () => {
  return async (dispatch, getState) => {
    const token = getState().signIn.token;
    dispatch(fetchTransactionsIncomingRequest());

    try {
      const response = await fetch(`${API_URL}/rabbit-log/output/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      dispatch(fetchTransactionsIncomingSuccess(data.data));
    } catch (error) {
      dispatch(fetchTransactionsIncomingError(error.message));
      Toast.show({
        type: "error",
        position: "top",
        text1: "Ошибка",
        text2: "Ошибка c загрузкой истории переводов",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
    }
  };
};
