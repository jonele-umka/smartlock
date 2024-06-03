import React, { useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
const ListFacilities = ({ facilitiesData }) => {
  const navigation = useNavigation();

  // const isDarkModeEnabled = useSelector(
  //   (state) => state.theme.isDarkModeEnabled
  // );

  const renderItem = ({ item }) => {
    return (
      <View style={{flexDirection:'column', alignItems: 'center', rowGap: 10}}>
        <View
          style={{
            backgroundColor: "#f0f0f0",
            padding: 15,
            borderRadius: 100,
          }}
        >
          <Image
            source={{ uri: item.imageUri }}
            style={{ width: 30, height: 30 }}
          />
        </View>
        <Text>{item.facilities}</Text>
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
