import React, { useState } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { Calendar } from "react-native-calendars";
import TimePicker from "../../Calendars/TimePicker/TimePicker";

const ActionDateTimePin = ({ actionSheetRef, onSelectDateTime, dateType }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (day) => {
    const date = new Date(day.dateString);
    setSelectedDate(date);
    setShowTimePicker(true);
  };

  const handleTimeChange = (time) => {
    const combinedDate = new Date(
      `${selectedDate.toISOString().split("T")[0]}T${
        time.toTimeString().split(" ")[0]
      }`
    ).getTime();
    onSelectDateTime(combinedDate, dateType);
    setShowTimePicker(false);
    actionSheetRef.current?.hide();
  };

  return (
    <ActionSheet ref={actionSheetRef} containerStyle={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>
          {dateType === "start"
            ? "Выберите дату и время начала"
            : "Выберите дату и время окончания"}
        </Text>
        <Calendar
          markedDates={{
            [selectedDate.toISOString().split("T")[0]]: {
              selected: true,
              selectedColor: "#4B5DFF",
              selectedTextColor: "#fff",
            },
          }}
          onDayPress={handleDateChange}
          monthFormat={"yyyy MM"}
        />
        {showTimePicker && (
          <TimePicker selectedTime={selectedDate} onChange={handleTimeChange} />
        )}
      </ScrollView>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ActionDateTimePin;
