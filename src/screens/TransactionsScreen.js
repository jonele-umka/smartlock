import React from "react";
import { useSelector } from "react-redux";
import { View, SafeAreaView, Platform } from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";

import TransactionTabsRoute from "../components/TransactionTabs/TransactionTabsRoute/TransactionTabsRoute";

const TransactionsScreen = () => {
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return <TransactionTabsRoute />;
};

export default TransactionsScreen;
