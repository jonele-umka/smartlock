import { View } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
const CalendarsReservViewData = ({
  dateData,
  selected,
  setSelected,
  setData,
}) => {
  const handleDayPress = (day) => {
    setSelected(day.dateString);
    setData(dateData[day.dateString] || null);
  };

  return (
    <View>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: "orange",
          },
        }}
      />
    </View>
  );
};

export default CalendarsReservViewData;
