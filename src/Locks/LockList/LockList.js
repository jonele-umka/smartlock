import { useNavigation } from "@react-navigation/core";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { formatDate } from "../../components/FormatDate/FormatDate";

const LockList = ({ data, loading }) => {
  const navigation = useNavigation();
 
  return (
    <View style={{ flexDirection: "column", rowGap: 25 }}>
      {loading ? (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 40, marginBottom: 30 }}
          color={"#4B5DFF"}
        />
      ) : data && data.length > 0 ? (
        data.map((item) => (
          <TouchableOpacity
            key={item.ID}
            onPress={() => navigation.navigate("Детали замка", { id: item.ID })}
            style={{
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#f0f0f0",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text>Название замка: </Text>
              <Text style={{ fontWeight: 500 }}>{item.LockAlias}</Text>
            </View>

            <Text style={{ textAlign: "right" }}>
              {formatDate(item.CreatedAt)}
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={{ fontSize: 16 }}>Нет замков</Text>
      )}
    </View>
  );
};

export default LockList;
