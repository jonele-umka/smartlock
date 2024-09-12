import React from "react";
import { View, Modal, Pressable } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendatDatePassport = ({
  handleCalendarDateChange,
  showCalendar,
  dateOfIssue,
  dateOfExpiry,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={showCalendar}>
      <Pressable
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: "#fff",
            borderRadius: 10,
          }}
        >
          <Calendar
            onDayPress={(day) =>
              handleCalendarDateChange(new Date(day.dateString))
            }
            markedDates={{
              [dateOfIssue]: {
                selected: true,
                marked: true,
                selectedColor: "blue",
              },
              [dateOfExpiry]: {
                selected: true,
                marked: true,
                selectedColor: "red",
              },
            }}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default CalendatDatePassport;
