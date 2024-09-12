import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

export default function Camera({ onImageCaptured, type }) {
  const navigation = useNavigation();
  const [facing, setFacing] = useState("back");
  const [flash, setFlash] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isFlashPressed, setIsFlashPressed] = useState(false);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#fff",
          padding: 10,
        }}
      >
        <Text style={{ textAlign: "center", marginBottom: 20, fontSize: 20 }}>
          Нам нужно ваше разрешение, чтобы показать камеру
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            paddingHorizontal: 10,
            paddingVertical: 15,
            borderRadius: 10,
          }}
          onPress={requestPermission}
        >
          <Text style={{ color: "#fff", textAlign: "center", fontSize: 18 }}>
            Дать разрешение
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  const takePicture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      onImageCaptured(photo.uri);
      navigation.navigate("Камера", { type: type });
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  const toggleFlash = () => {
    setFlash((flash) => (flash === false ? true : false));
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <CameraView
        style={{ flex: 1 }}
        facing={facing}
        enableTorch={flash}
        ref={(ref) => setCameraRef(ref)}
      >
        <View
          style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 70 }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setIsFlashPressed(!isFlashPressed);
                toggleFlash();
              }}
            >
              <Image
                source={
                  isFlashPressed
                    ? require("../../assets/flash.png")
                    : require("../../assets/no-flash.png")
                }
                style={{ width: 35, height: 35 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPressIn={() => setIsButtonPressed(true)} // устанавливаем состояние при нажатии
              onPressOut={() => setIsButtonPressed(false)} // сбрасываем состояние при отпускании
              onPress={takePicture}
            >
              <Image
                source={
                  isButtonPressed
                    ? require("../../assets/circle-fill.png")
                    : require("../../assets/circle-outline.png")
                }
                style={{ width: 70, height: 70 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCameraFacing}>
              <Image
                source={require("../../assets/reload.png")}
                style={{ width: 35, height: 35 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}
