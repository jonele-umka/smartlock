import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useEffect } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import i18n from "../../../i18n/i18n";
import CustomText from "../CustomText/CustomText";

export default function Camera({ onImageCaptured, type }) {
  const navigation = useNavigation();
  const [facing, setFacing] = useState("back");
  const [flash, setFlash] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isFlashPressed, setIsFlashPressed] = useState(false);

  useEffect(() => {
    async function getPermission() {
      if (!permission?.granted) {
        const { granted } = await requestPermission();
        if (!granted) {
          console.warn("Доступ к камере не предоставлен.");
        }
      }
    }
    getPermission();
  }, [permission]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        {/* <Image
          source={require("../../assets/no-camera.png")} // Иконка запрета камеры
          style={{ width: 100, height: 100, marginBottom: 20 }}
        /> */}
        <CustomText style={{ fontSize: 18, textAlign: "center" }}>
          {i18n.t("cameraPermissions")}
        </CustomText>
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
    setFlash(!flash);
  };

  return (
    <View style={{ flex: 1 }}>
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
              onPressIn={() => setIsButtonPressed(true)}
              onPressOut={() => setIsButtonPressed(false)}
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
