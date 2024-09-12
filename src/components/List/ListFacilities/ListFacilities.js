import React from "react";
import { FlatList, Text, View, TouchableOpacity, Image } from "react-native";
import CustomText from "../../CustomText/CustomText";

const ListFacilities = ({ facilitiesData }) => {
  const formatText = (text) => {
    const words = text.split(" ");
    if (words.length > 1) {
      return `${words[0]}\n${words.slice(1).join(" ")}`;
    }
    return text;
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          columnGap: 10,
          paddingHorizontal: 15,
          paddingVertical: 5,
          borderColor: "#dee2f1",
          borderWidth: 1,
          borderRadius: 10,
        }}
      >
        <Image source={{ uri: item.Icon }} style={{ width: 30, height: 30 }} />

        <CustomText style={{ textAlign: "center" }}>{item.Value}</CustomText>
      </View>
    );
  };

  const renderSeparator = () => {
    return <View style={{ width: 20 }} />;
  };

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={facilitiesData}
        horizontal
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

export default ListFacilities;
