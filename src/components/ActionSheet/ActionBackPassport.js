import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import ActionSheet from "react-native-actions-sheet";
import PickImage from "../PickImage/PickImage";

const ActionBackPassport = ({
  actionSheetRefBack,
  handleImageSelected,
  navigateToCamera,
  isFrontImage,
}) => {
  return (
    <ActionSheet ref={actionSheetRefBack}>
      <View
        style={{
          padding: 20,
          backgroundColor: "white",
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ marginBottom: 20 }}>Выберите источник изображения</Text>
        <View style={{ flexDirection: "row", columnGap: 50 }}>
          <TouchableOpacity
            onPress={() => navigateToCamera(isFrontImage)}
            style={{ alignItems: "center", rowGap: 5 }}
          >
            <Image
              style={{ width: 70, height: 70 }}
              source={require("../../assets/camera.png")}
            />
            <Text>Камера</Text>
          </TouchableOpacity>
          <PickImage
            onImageSelected={handleImageSelected}
            renderPicker={({ pickImage }) => (
              <TouchableOpacity
                onPress={pickImage}
                style={{ alignItems: "center", rowGap: 5 }}
              >
                <Image
                  style={{ width: 70, height: 70 }}
                  source={require("../../assets/gallery.png")}
                />
                <Text>Галерея</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </ActionSheet>
  );
};

export default ActionBackPassport;
