import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";

const LockComponent = ({ item }) => {
  const navigation = useNavigation();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Детали замка", { id: item.ID, data: item })
      }
      style={{
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#f0f0f0",
        borderRadius: 10,
        padding: 10,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <Text>Название замка: </Text>
        <Text style={{ fontWeight: 500 }}>{item.LockName}</Text>
      </View>

      <Text style={{ textAlign: "right" }}>{formatDate(item.CreatedAt)}</Text>
    </TouchableOpacity>
  );
};

export default LockComponent;
