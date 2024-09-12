import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import ImageView from "react-native-image-viewing";

function CarouselImage({ images }) {
  const [visible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const API_URL = process.env.API_URL;
  // Преобразование массива изображений
  const formattedImages = images.map((image) => ({
    uri: `${API_URL}/${image.ImageUrl}`,
  }));

  const width = Dimensions.get("window").width;

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={300}
        data={formattedImages}
        scrollAnimationDuration={1000}
        renderItem={({ index }) => (
          <View>
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: "center",
                marginHorizontal: -1,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(true);
                  setSelectedImageIndex(index);
                }}
              >
                <Image
                  style={{ width: "100%", height: 300 }}
                  source={{
                    uri: formattedImages[index].uri,
                  }}
                />
              </TouchableOpacity>
              <ImageView
                images={formattedImages}
                imageIndex={selectedImageIndex}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default CarouselImage;
