import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import i18n from "../../../../i18n/i18n";

const CalendarReserv = ({ onDatesSelected, calendar }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
        return true;
      }
    }
    return false;
  };

  const handleDayPress = (day) => {
    const date = day.dateString;
    const today = new Date().toISOString().split("T")[0];

    if (date < today) {
      Alert.alert(i18n.t("error"), i18n.t("errorDate"));
      return;
    }

    if (disabledDates[date]) {
      return;
    }

    if (!startDate) {
      setStartDate(date);
      setEndDate(null);
    } else if (!endDate && date > startDate) {
      if (checkForUnavailableDatesInRange(startDate, date)) {
        Alert.alert(i18n.t("error"), i18n.t("errorSelectDate"));
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
