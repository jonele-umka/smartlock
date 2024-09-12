import React, { useEffect, useState } from "react";
import Camera from "../../components/Camera/Camera";
import {
  Image,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/core";

const CameraScreen = () => {
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;
  const navigation = useNavigation();
  const route = useRoute();
  const [type, setType] = useState(route.params?.type);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    if (type === "front") {
      setType("front");
    } else if (type === "back") {
      setType("back");
    } else if (type === "selfie") {
      setType("selfie");
    } else if (type === "international") {
      setType("international");
    }
  }, [route.params?.type]);
console.log('qqww', type)
  const handleImageCaptured = (imageUri) => {
    setCapturedImage(imageUri);
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };
  const handleSave = () => {
    navigation.navigate("Редактировать профиль", {
      cameraImg: capturedImage,
      type,
    });
  };

  if (capturedImage) {
    return (
      <SafeAreaWrapper style={{ flex: 1 }}>
        <Image source={{ uri: capturedImage }} style={{ flex: 1 }} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{
              backgroundColor: "#CD2326",
              padding: 10,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
            onPress={handleRetake}
          >
            <Image
              source={require("../../assets/camera-outline.png")}
              style={{ width: 25, height: 25 }}
            />
            <Text style={styles.buttonText}>Переснять</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#00CDAC",
              padding: 10,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
            onPress={handleSave}
          >
            <Image
              source={require("../../assets/check-mark.png")}
              style={{ width: 25, height: 25 }}
            />
            <Text style={styles.buttonText}>Сохранить</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaWrapper>
    );
  } else {
    return <Camera onImageCaptured={handleImageCaptured} type={type} />;
  }
};

const styles = {
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 15,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  button: {
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
};

export default CameraScreen;
