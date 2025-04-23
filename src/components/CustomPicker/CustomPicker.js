import { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomText from "../CustomText/CustomText";
import i18n from "../../../i18n/i18n";

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
                ?.label || i18n.t("notFound")
            : placeholder}
        </CustomText>
      </TouchableOpacity>

      {isPickerVisible && (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={String(selectedValue) || ""}
            onValueChange={(value) => {
              onValueChange(value);
              setIsPickerVisible(false);
            }}
            style={styles.picker}
          >
            <Picker.Item label={placeholder} value="" color="gray" />
            {items.map((item) => (
              <Picker.Item
                key={String(item.value)}
                label={item.label}
                value={String(item.value)}
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
