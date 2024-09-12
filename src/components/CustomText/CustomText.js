import React from "react";
import { Text as RNText } from "react-native";

const CustomText = ({ style, children }) => {
  // Разделяем fontWeight из остальных стилей
  const { fontWeight, ...restStyles } = style || {};

  let fontFamily = "IBMPlexSans-Regular";

  if (fontWeight === "500" || fontWeight === 500 || fontWeight === "medium") {
    fontFamily = "IBMPlexSans-Medium";
  } else if (
    fontWeight === "600" ||
    fontWeight === 600 ||
    fontWeight === "semiBold"
  ) {
    fontFamily = "IBMPlexSans-Semibold";
  } else if (
    fontWeight === "700" ||
    fontWeight === 700 ||
    fontWeight === "bold"
  ) {
    fontFamily = "IBMPlexSans-Bold";
  }

  // Фильтруем невалидные стили
  const filteredStyles = Array.isArray(style)
    ? style.filter((s) => s)
    : [style];

  // Добавляем цвет по умолчанию #1C2863
  const defaultColorStyle = { color: "#1C2863" };

  // Выводим в лог конечный стиль для отладки
  return (
    <RNText style={[{ fontFamily }, defaultColorStyle, ...filteredStyles]}>
      {children}
    </RNText>
  );
};

export default CustomText;
