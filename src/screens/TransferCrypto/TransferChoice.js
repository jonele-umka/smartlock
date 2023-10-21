import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";

function TransferChoice() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ fontSize: 25 }}>Выберите тип перевода</Text>
      <TouchableOpacity
        style={{
          width: "100%",
          marginTop: 20,
          marginHorizontal: 20,
          padding: 15,
          backgroundColor: "#0268EC",
          borderRadius: 10,
          shadowColor: "#0268EC",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.3,
          shadowRadius: 10,
        }}
        onPress={() => navigation.navigate("Внутренние переводы")}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 18 }}>
          Внутренние переводы
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: "100%",
          marginTop: 15,
          padding: 15,
          backgroundColor: "#0268EC",
          borderRadius: 10,
          shadowColor: "#0268EC",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.3,
          shadowRadius: 10,
        }}
        onPress={() => navigation.navigate("Внешние переводы")}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 18 }}>
          Внешние переводы
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#0268EC",
    borderRadius: 10,
    shadowColor: "#0268EC",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
});
export default TransferChoice;
