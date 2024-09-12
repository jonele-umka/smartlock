import React from "react";
import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

const MyCalendarReserv = ({ calendar }) => {
    // Проверка, если календарь пустой
    if (!calendar || !Array.isArray(calendar) || calendar.length === 0) {
      return (
        <View>
          <Text style={{ marginTop: 10, fontSize: 16 }}>
            Нет забронированных дат.
          </Text>
        </View>
      );
    }
  const transformCalendarData = (calendarData) => {
    const unavailableDates = [];

    calendarData.forEach((period) => {
      const startDate = new Date(period.StartDate);
      const endDate = new Date(period.EndDate);

      // Преобразование всех дат в периоде в нужный формат
      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        unavailableDates.push(d.toISOString().split("T")[0]);
      }
    });

    return unavailableDates;
  };

  const unavailableDates = transformCalendarData(calendar);

  const disabledDates = unavailableDates.reduce((acc, date) => {
    acc[date] = {
      disabled: true,
      selected: true,
      selectedColor: "gray",
    };
    return acc;
  }, {});

  return (
    <View>
      <Calendar
        onDayPress={() => {}}
        markedDates={disabledDates}
        markingType={"custom"}
      />
    </View>
  );
};

export default MyCalendarReserv;
