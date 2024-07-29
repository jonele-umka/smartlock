import React, { useState } from "react";
import { View } from "react-native";
import * as ImagePicker from "expo-image-picker";

const PickImage = ({ onImageSelected, renderPicker }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedImageUri = result.assets[0].uri;
        setImage(selectedImageUri);
        onImageSelected(selectedImageUri);
      }
    } catch (error) {
      console.error("Ошибка при выборе изображения", error);
    }
  };

  return <View>{renderPicker({ pickImage, image })}</View>;
};

export default PickImage;
