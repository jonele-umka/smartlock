import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

const formatNumber = (number) => {
  return number.toString().padStart(2, "0");
};

const TimePicker = ({ selectedTime, onChange }) => {
  const [hours, setHours] = useState(
    selectedTime ? selectedTime.getHours() : 0
  );
  const [minutes, setMinutes] = useState(
    selectedTime ? selectedTime.getMinutes() : 0
  );

  const handleHoursChange = (increment) => {
    setHours((prev) => (prev + increment + 24) % 24);
  };

  const handleMinutesChange = (increment) => {
    setMinutes((prev) => (prev + increment + 60) % 60);
  };

  const handleHoursInputChange = (value) => {
    if (value.length > 0 && parseInt(value, 10) >= 24) {
      return;
    }

    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue < 24) {
      setHours(numericValue);
    } else if (value === "") {
      setHours("");
    }
  };

  const handleMinutesInputChange = (value) => {
    if (value.length > 0 && value[0] === "7" && value.length === 1) {
      return;
    }

    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue < 60) {
      setMinutes(numericValue);
    } else if (value === "") {
      setMinutes("");
    }
  };

  const confirmTime = () => {
    const time = new Date();
    time.setHours(hours || 0);
    time.setMinutes(minutes || 0);
    onChange(time);
  };

  return (
    <View style={styles.timePickerContainer}>
      <Text style={styles.timePickerLabel}>Выберите время:</Text>
      <View style={styles.timePicker}>
        <View style={styles.changeView}>
          <Text>Часы:</Text>
          <View style={styles.changeTime}>
            <TouchableOpacity
              style={styles.changeButton}
              onPress={() => handleHoursChange(-1)}
            >
              <Text style={styles.changeButtonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.timePickerInput}
              keyboardType="numeric"
              value={formatNumber(hours)}
              onChangeText={handleHoursInputChange}
              maxLength={2}
            />
            <TouchableOpacity
              style={styles.changeButton}
              onPress={() => handleHoursChange(1)}
            >
              <Text style={styles.changeButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.timePickerText}>:</Text>

        <View style={styles.changeView}>
          <Text>Минуты:</Text>
          <View style={styles.changeTime}>
            <TouchableOpacity
              style={styles.changeButton}
              onPress={() => handleMinutesChange(-1)}
            >
              <Text style={styles.changeButtonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.timePickerInput}
              keyboardType="numeric"
              value={formatNumber(minutes)}
              onChangeText={handleMinutesInputChange}
              maxLength={2}
            />
            <TouchableOpacity
              style={styles.changeButton}
              onPress={() => handleMinutesChange(1)}
            >
              <Text style={styles.changeButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={confirmTime} style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Сохранить</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  timePickerContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  timePickerLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  timePicker: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  changeView: {
    flexDirection: "column",
    alignItems: "center",
  },
  changeTime: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  changeButton: {
    backgroundColor: "#4B5DFF",
    borderRadius: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  changeButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  timePickerText: {
    fontSize: 30,
    marginHorizontal: 10,
  },
  timePickerInput: {
    fontSize: 25,
    marginHorizontal: 10,
    textAlign: "center",
    width: 40,
  },
  confirmButton: {
    marginTop: 20,
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "#4B5DFF",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
});

export default TimePicker;
