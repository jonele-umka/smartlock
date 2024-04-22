import React, { useState } from "react";
import { View, Modal, Pressable, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useForm } from "react-hook-form";

const DatePin = ({ onStartDateChange, onEndDateChange }) => {
  const { setValue } = useForm();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDateTwoPicker, setShowDateTwoPicker] = useState(false);
  const [selectedTwoDate, setSelectedTwoDate] = useState(
    new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000)
  );

  const handleShowDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      setValue("date", selectedDate);
      onStartDateChange(selectedDate.getTime()); // Передача выбранной даты в родительский компонент
    }
  };

  const handleShowDateTwoPicker = () => {
    setShowDateTwoPicker(!showDateTwoPicker);
  };

  const handleDateTwoChange = (event, selectedTwoDate) => {
    setShowDateTwoPicker(false);
    if (selectedTwoDate) {
      setSelectedTwoDate(selectedTwoDate);
      setValue("dateTwo", selectedTwoDate);
      onEndDateChange(selectedTwoDate.getTime()); // Передача выбранной даты в родительский компонент
    }
  };

  const formattedDate = (date) => {
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          columnGap: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#b8b8b8",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <TouchableOpacity onPress={handleShowDatePicker}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 10,
              }}
            >
              <Ionicons
                name="calendar-outline"
                style={{ color: "#000", fontSize: 25 }}
              />
              <Text>{formattedDate(selectedDate)}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#b8b8b8",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <TouchableOpacity onPress={handleShowDateTwoPicker}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 10,
              }}
            >
              <Ionicons
                name="calendar-outline"
                style={{ color: "#000", fontSize: 25 }}
              />
              <Text>{formattedDate(selectedTwoDate)}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Modal animationType="fade" transparent={true} visible={showDatePicker}>
        <Pressable
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleShowDatePicker}
        >
          <View
            style={{
              backgroundColor: "black",
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display={Platform.OS === "android" ? "default" : "spinner"}
              onChange={handleDateChange}
            />
          </View>
        </Pressable>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showDateTwoPicker}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleShowDateTwoPicker}
        >
          <View
            style={{
              backgroundColor: "black",
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <DateTimePicker
              value={selectedTwoDate || new Date()}
              mode="date"
              display={Platform.OS === "android" ? "default" : "spinner"}
              onChange={handleDateTwoChange}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default DatePin;
