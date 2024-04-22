import { View, Text, ScrollView } from "react-native";
import React from "react";

const AllConditions = () => {
  return (
    <ScrollView style={{ backgroundColor: "#fff", flex: 1 }}>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}
      >
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
            Интернет
          </Text>
          <View>
            <Text style={{ fontSize: 16 }}>По всей территории</Text>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
            Интернет
          </Text>
          <View>
            <Text style={{ fontSize: 16 }}>По всей территории</Text>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
            Интернет
          </Text>
          <View>
            <Text style={{ fontSize: 16 }}>По всей территории</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AllConditions;
