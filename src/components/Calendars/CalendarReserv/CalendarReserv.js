import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarReserv = ({ onDatesSelected, calendar }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Если calendar равен null, используем пустой массив
  const calendarData = calendar || [];

  const transformCalendarData = (calendarData) => {
    const unavailableDates = [];

    calendarData.forEach((period) => {
      const startDate = new Date(period.StartDate);
      const endDate = new Date(period.EndDate);

      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        unavailableDates.push(d.toISOString().split("T")[0]);
      }
    });

    return unavailableDates;
  };

  const unavailableDates = transformCalendarData(calendarData);

  const disabledDates = unavailableDates.reduce((acc, date) => {
    acc[date] = {
      disabled: true,
      selected: true,
      selectedColor: "gray",
    };
    return acc;
  }, {});

  const checkForUnavailableDatesInRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const formattedDate = d.toISOString().split("T")[0];
      if (unavailableDates.includes(formattedDate)) {
        return true; // Найдены заблокированные даты в диапазоне
      }
    }
    return false;
  };

  const handleDayPress = (day) => {
    const date = day.dateString;
    const today = new Date().toISOString().split("T")[0]; // Текущая дата в формате YYYY-MM-DD

    // Проверка, если выбранная дата меньше сегодняшней
    if (date < today) {
      Alert.alert("Ошибка", "Нельзя выбрать дату до сегодняшнего дня.");
      return;
    }

    if (disabledDates[date]) {
      return;
    }

    if (!startDate) {
      setStartDate(date);
      setEndDate(null);
    } else if (!endDate && date > startDate) {
      // Проверяем, есть ли забронированные даты между startDate и выбранной датой
      if (checkForUnavailableDatesInRange(startDate, date)) {
        Alert.alert(
          "Ошибка",
          "Выбранный диапазон содержит забронированные даты."
        );
        setStartDate(null);
        setEndDate(null);
      } else {
        setEndDate(date);
      }
    } else if (date === startDate) {
      setStartDate(null);
      setEndDate(null);
    } else if (date === endDate) {
      setEndDate(null);
    } else if (date < startDate) {
      setStartDate(date);
      setEndDate(null);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      onDatesSelected({ startDate, endDate });
    } else if (!startDate && !endDate) {
      onDatesSelected({ startDate: null, endDate: null });
    }
  }, [startDate, endDate]);

  const markedDates = {
    ...(startDate && {
      [startDate]: {
        selected: true,
        selectedColor: "#4B5DFF",
        selectedTextColor: "white",
        customStyles: {
          container: {
            borderRadius: 15,
            backgroundColor: "#4B5DFF",
          },
          text: {
            color: "white",
          },
        },
      },
    }),
    ...(endDate && {
      [endDate]: {
        selected: true,
        selectedColor: "#4B5DFF",
        selectedTextColor: "white",
        customStyles: {
          container: {
            borderRadius: 15,
            backgroundColor: "#4B5DFF",
          },
          text: {
            color: "white",
          },
        },
      },
    }),
    ...disabledDates,
  };

  return (
    <View>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        markingType={"custom"}
      />
    </View>
  );
};

export default CalendarReserv;
