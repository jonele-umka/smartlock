// import React, { useState, useEffect } from "react";
// import { View } from "react-native";
// import { Calendar } from "react-native-calendars";

// const CalendarReserv = ({ onDatesSelected, calendar }) => {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   // Если calendar равен null, используем пустой массив
//   const calendarData = calendar || [];

//   const transformCalendarData = (calendarData) => {
//     const unavailableDates = [];

//     calendarData.forEach((period) => {
//       const startDate = new Date(period.StartDate);
//       const endDate = new Date(period.EndDate);

//       for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
//         unavailableDates.push(d.toISOString().split("T")[0]);
//       }
//     });

//     return unavailableDates;
//   };

//   const unavailableDates = transformCalendarData(calendarData);

//   const disabledDates = unavailableDates.reduce((acc, date) => {
//     acc[date] = {
//       disabled: true,
//       selected: true,
//       selectedColor: "gray",
//     };
//     return acc;
//   }, {});

//   const handleDayPress = (day) => {
//     const date = day.dateString;

//     if (disabledDates[date]) {
//       return;
//     }

//     if (!startDate) {
//       setStartDate(date);
//       setEndDate(null);
//     } else if (!endDate && date > startDate) {
//       setEndDate(date);
//     } else if (date === startDate) {
//       setStartDate(null);
//       setEndDate(null);
//     } else if (date === endDate) {
//       setEndDate(null);
//     } else if (date < startDate) {
//       setStartDate(date);
//       setEndDate(null);
//     }
//   };

//   useEffect(() => {
//     if (startDate && endDate) {
//       onDatesSelected({ startDate, endDate });
//     } else if (!startDate && !endDate) {
//       onDatesSelected({ startDate: null, endDate: null });
//     }
//   }, [startDate, endDate]);

//   const markedDates = {
//     ...(startDate && {
//       [startDate]: {
//         selected: true,
//         selectedColor: "#00c6ff",
//         selectedTextColor: "white",
//         customStyles: {
//           container: {
//             borderRadius: 15,
//             backgroundColor: "#00c6ff",
//           },
//           text: {
//             color: "white",
//           },
//         },
//       },
//     }),
//     ...(endDate && {
//       [endDate]: {
//         selected: true,
//         selectedColor: "#00c6ff",
//         selectedTextColor: "white",
//         customStyles: {
//           container: {
//             borderRadius: 15,
//             backgroundColor: "#00c6ff",
//           },
//           text: {
//             color: "white",
//           },
//         },
//       },
//     }),
//     ...disabledDates,
//   };

//   return (
//     <View>
//       <Calendar
//         onDayPress={handleDayPress}
//         markedDates={markedDates}
//         markingType={"custom"}
//       />
//     </View>
//   );
// };

// export default CalendarReserv;
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
      setEndDate(date);
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
