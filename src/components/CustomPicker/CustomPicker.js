import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomText from "../CustomText/CustomText";

const CustomPicker = ({ items, selectedValue, onValueChange, placeholder }) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsPickerVisible(!isPickerVisible)}
      >
        <CustomText style={styles.buttonText}>
          {selectedValue
            ? items.find((item) => String(item.value) === String(selectedValue))
                ?.label || "Не найдено"
            : placeholder}
        </CustomText>
      </TouchableOpacity>

      {isPickerVisible && (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(value) => {
              onValueChange(value);
              setIsPickerVisible(false);
            }}
            style={styles.picker}
          >
            <Picker.Item label={placeholder} value={null} color="gray" />
            {items.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#dee2f1",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#1C2863",
    fontSize: 14,
  },
  pickerContainer: {
    backgroundColor: "#dee2f1",
    borderRadius: 10,
  },
  picker: {
    color: "#1C2863",
    fontSize: 14,
  },
});

export default CustomPicker;
