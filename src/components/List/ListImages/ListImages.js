import React, { useState } from "react";
import { FlatList, View, TouchableOpacity, Image } from "react-native";
import ImageView from "react-native-image-viewing";

const ListImages = ({ images }) => {
  const [visible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const API_URL = process.env.API_URL;

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setIsVisible(true);
          setSelectedImageIndex(index);
        }}
      >
        <Image
          source={{ uri: `${API_URL}/${item.ImageUrl}` }}
          style={{ width: 70, height: 70 }}
          borderRadius={10}
        />
      </TouchableOpacity>
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
        data={images}
        horizontal
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={(item, index) => index.toString()}
      />
      <ImageView
        images={images.map((image) => ({
          uri: `${API_URL}/${image.ImageUrl}`,
        }))}
        imageIndex={selectedImageIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
};

export default ListImages;
