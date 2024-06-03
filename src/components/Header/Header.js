import { View, Image, TouchableOpacity, Text } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginBottom: 20
      }}
    >
      <Text style={{ fontSize: 35, fontWeight: 500 }}>Smart lock</Text>
      <TouchableOpacity
      style={{backgroundColor: '#f0f0f0', padding: 10, borderRadius: 50}}
        onPress={() =>
          navigation.navigate("Уведомления", {
            transactions: transactions,
          })
        }
      >
        <Ionicons
          name="notifications-outline"
          style={[
            { fontSize: 30, color: "#000", position: "relative" },
            // isDarkModeEnabled && { color: "#fff" },
          ]}
        />
        {/* <Badge
                status="primary"
                value={transactions.length > 100 ? "99+" : transactions.length}
                containerStyle={{ position: "absolute", top: 0, left: 15 }}
              /> */}
      </TouchableOpacity>

      {/* <Avatar bgColor="#241270" size="sm" borderRadius="$full">
              </Avatar> */}
    </View>
  );
};

export default Header;
