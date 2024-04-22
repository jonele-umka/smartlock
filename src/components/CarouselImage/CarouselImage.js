import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import ImageView from "react-native-image-viewing";
function CarouselImage({images}) {
  const [visible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // const images = [
  //   {
  //     uri: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     uri: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     uri: "https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     uri: "https://plus.unsplash.com/premium_photo-1670360414903-19e5832f8bc4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  // ];

  const width = Dimensions.get("window").width;
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={300}
        data={images}
        scrollAnimationDuration={1000}
        renderItem={({ index }) => (
          <View>
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: "center",
                marginHorizontal: -1, // Убираем отступы по горизонтали
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
                    uri: images[index].uri,
                  }}
                />
              </TouchableOpacity>
              <ImageView
                images={images.map((image) => ({
                  uri: image.uri,
                }))}
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
