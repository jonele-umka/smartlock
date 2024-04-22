import React, { useState } from "react";
import { View, Modal, Pressable, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";

const TimePin = () => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showTimeTwoPicker, setShowTimeTwoPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  // первая дата
  const handleShowTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  // вторая дата
  const handleShowTimeTwoPicker = () => {
    setShowTimeTwoPicker(!showTimeTwoPicker);
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
          <TouchableOpacity onPress={handleShowTimePicker}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 10,
              }}
            >
              <Ionicons
                name="time-outline"
                style={{ color: "#000", fontSize: 25 }}
              />
              <Text>10:00</Text>
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
          <TouchableOpacity onPress={handleShowTimeTwoPicker}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 10,
              }}
            >
              <Ionicons
                name="time-outline"
                style={{ color: "#000", fontSize: 25 }}
              />
              <Text>22:00</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Modal animationType="fade" transparent={true} visible={showTimePicker}>
        <Pressable
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleShowTimePicker}
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
              mode="time"
              display={Platform.OS === "android" ? "default" : "spinner"}
              value={selectedTime}
              onChange={(event, selectedDate) => {
                setShowTimePicker(false);
                setSelectedTime(selectedDate || selectedTime);
              }}
            />
          </View>
        </Pressable>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showTimeTwoPicker}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleShowTimeTwoPicker}
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
              mode="time"
              display={Platform.OS === "android" ? "default" : "spinner"}
              value={selectedTime}
              onChange={(event, selectedDate) => {
                setShowTimePicker(false);
                setSelectedTime(selectedDate || selectedTime);
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default TimePin;
