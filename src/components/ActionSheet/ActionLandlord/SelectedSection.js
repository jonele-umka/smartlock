import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomText from "../../CustomText/CustomText";

const SelectionSection = ({ title, placeholder, selectedValue, onPress }) => {
  return (
    <View style={{ flex: 1 }}>
      <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
        {title}
      </CustomText>
      <TouchableOpacity
        onPress={onPress}
        style={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#dee2f1",
          paddingVertical: 15,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            columnGap: 5,
          }}
        >
          <CustomText style={{ fontSize: 16 }}>
            {selectedValue || placeholder}
          </CustomText>
          <Icon name={"chevron-right"} size={18} color={"#000"} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SelectionSection;
