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

// const sendNotification = async (notificationData) => {
//   let notification;
//   if (notificationData.transactionType === "incoming") {
//     notification = {
//       title: "Поступление средств",
//       body: `
//       Поступило: ${notificationData.SumReceiver} ${
//         notificationData.CurrencyCode
//       }
//       от ${("****", notificationData.SenderRequisites)}
//       ${notificationData.Date}`,
//       android: {
//         channelId: "default",
//       },
//     };
//   } else {
//     notification = {
//       title: "Отправка средств",
//       body: `
//        Отправлено: ${notificationData.SumReceiver} ${
//         notificationData.CurrencyCode
//       }
//        Комиссия: ${notificationData.Commission}
//        Со счёта: ${notificationData.SenderRequisites}
//        На счёт: ${notificationData.ReceiverRequisites}
//        Дата: ${notificationData.Date}
//        Общая сумма ${
//          notificationData.Commission + notificationData.SumReceiver
//        } `,
//       android: {
//         channelId: "default",
//       },
//     };
//   }
//   console.log("Sending notification with data:", notification);
//   await Notifications.scheduleNotificationAsync({
//     content: notification,
//     trigger: null,
//   });
// };

export const fetchTransactionsRequest = () => ({
  type: FETCH_TRANSACTIONS_REQUEST,
});

export const fetchTransactionsSuccess = (data) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_TRANSACTIONS_SUCCESS,
      payload: data,
    });
    // const latestTransaction = data[0];

    // const CommissionSum = latestTransaction.CommissionSum;
    // console.log(CommissionSum + latestTransaction.SumReceiver);
    // const createdAtDate = new Date(latestTransaction?.CreatedAt);
    // const formattedCreatedAt = createdAtDate.toLocaleString("ru-RU", {
    //   day: "2-digit",
    //   month: "2-digit",
    //   year: "numeric",
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   second: "2-digit",
    //   hour12: false,
    // });

    // await sendNotification({
    //   transactionType: "outgoing",
    //   SenderRequisites: latestTransaction.ReceiverRequisites,
    //   ReceiverRequisites: latestTransaction.SenderRequisites,
    //   SumReceiver: latestTransaction.SumReceiver,
    //   CurrencyCode: latestTransaction.CurrencyReceiver.CurrencyCode,
    //   Commission: CommissionSum,
    //   Date: formattedCreatedAt,
    // });
  };
};

// export const fetchTransactionsSuccess = (data) => {
//   return async (dispatch) => {
//     dispatch({
//       type: FETCH_TRANSACTIONS_SUCCESS,
//       payload: data,
//     });
//     await sendNotification();
//   };
// };

// const sendNotification = async () => {
//   const notificationContent = {
//     title: "Успешный перевод",
//     body: "Ваш перевод денег выполнен успешно.",
//   };

//   await Notifications.scheduleNotificationAsync({
//     content: notificationContent,
//     trigger: null, // Отправка немедленного уведомления
//   });
// };

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

export const fetchTransactionsIncomingSuccess = (data) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_TRANSACTIONS_INCOMING_SUCCESS,
      payload: data,
    });
    // const latestTransaction = data[0];
    // const lastFourDigitsReceiver =
    //   latestTransaction.ReceiverRequisites.slice(-4);
    // const createdAtDate = new Date(latestTransaction?.CreatedAt);
    // const formattedCreatedAt = createdAtDate.toLocaleString("ru-RU", {
    //   day: "2-digit",
    //   month: "2-digit",
    //   year: "numeric",
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   second: "2-digit",
    //   hour12: false,
    // });

    // await sendNotification({
    //   transactionType: "incoming",
    //   SenderRequisites: latestTransaction.ReceiverRequisites,
    //   ReceiverRequisites: lastFourDigitsReceiver,
    //   SumReceiver: latestTransaction.SumReceiver,
    //   CurrencyCode: latestTransaction.CurrencyReceiver.CurrencyCode,
    //   Date: formattedCreatedAt,
    // });
  };
};

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
