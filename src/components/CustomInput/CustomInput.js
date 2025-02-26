import React from "react";
import { TextInput } from "react-native";

const CustomInput = ({
  value,
  onChange,
  placeholder,
  keyboardType,
  style,
  ...props
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      keyboardType={keyboardType}
      style={{
        borderWidth: 1,
        borderColor: "#dee2f1",
        paddingHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 12,
        fontSize: 16,
        color: "#1C2863",
        ...style,
      }}
      {...props}
    />
  );
};

export default CustomInput;
