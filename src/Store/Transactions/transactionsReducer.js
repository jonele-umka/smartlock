// // reducers.js

// import {
//   FETCH_TRANSACTIONS_REQUEST,
//   FETCH_TRANSACTIONS_SUCCESS,
//   FETCH_TRANSACTIONS_ERROR,
//   FETCH_TRANSACTIONS_INCOMING_REQUEST,
//   FETCH_TRANSACTIONS_INCOMING_SUCCESS,
//   FETCH_TRANSACTIONS_INCOMING_ERROR,
// } from "./transactionsTypes";

// const initialState = {
//   transactions: [],
//   incoming: [],
//   loading: false,
//   error: null,
// };

// const transactionsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_TRANSACTIONS_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case FETCH_TRANSACTIONS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         transactions: action.payload,
//       };
//     case FETCH_TRANSACTIONS_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     case FETCH_TRANSACTIONS_INCOMING_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case FETCH_TRANSACTIONS_INCOMING_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         incoming: action.payload,
//       };
//     case FETCH_TRANSACTIONS_INCOMING_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default transactionsReducer;
