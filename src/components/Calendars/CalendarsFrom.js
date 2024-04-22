import { View } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
const CalendarsFrom = () => {
  const [selected, setSelected] = useState("");
  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
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

export default CalendarsFrom;
