import React from "react";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { SafeAreaView, Platform } from "react-native";

const SafeAreaWrapper = ({ children, style }) => {
  const WrapperComponent =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return <WrapperComponent style={style}>{children}</WrapperComponent>;
};

export default SafeAreaWrapper;
