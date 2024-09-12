import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomText from "../CustomText/CustomText";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { fetchMyAccommodations } from "../../Store/accommodationSlice/accommodationSlice";

const MyObjects = ({ myAccommodation }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const API_URL = process.env.API_URL;
  const token = useSelector((state) => state.auth.token);

  const handleDeactivate = async () => {
    try {
      const response = await fetch(
        `${API_URL}/accommodation/deactivate/${myAccommodation.ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        dispatch(fetchMyAccommodations(token));
        Toast.show({
          type: "success",
          position: "top",
          text1: "Успех",
          text2: "Объект был деактивирован",
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Ошибка",
          text2: "Произошла ошибка при попытке деактивировать объект.",
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Ошибка",
        text2: `Произошла ошибка при попытке деактивировать объект: ${error}`,

        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
    }
  };

  const handleActivate = async () => {
    try {
      const response = await fetch(
        `${API_URL}/accommodation/activate/${myAccommodation.ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        dispatch(fetchMyAccommodations(token));
        Toast.show({
          type: "success",
          position: "top",
          text1: "Успех",
          text2: "Объект был активирован",
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Ошибка",
          text2: "Произошла ошибка при попытке активировать объект.",
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Ошибка",
        text2: "Произошла ошибка при попытке активировать объект.",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${API_URL}/accommodation/delete/${myAccommodation.ID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        dispatch(fetchMyAccommodations(token));
        Toast.show({
          type: "success",
          position: "top",
          text1: "Успех",
          text2: "Объект был удален",
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Ошибка",
          text2: "Произошла ошибка при попытке удаления объекта.",
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Ошибка",
        text2: "Произошла ошибка при попытке удаления объекта",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
    }
  };
  const isActive = myAccommodation?.IsAvailable;

  return (
    <ImageBackground
      borderRadius={20}
      style={{
        width: "100%",
        height: 220,
        justifyContent: "space-between",
        paddingTop: 10,
        borderRadius: 20,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#f0f0f0",
      }}
      resizeMode={
        myAccommodation.Images &&
        myAccommodation.Images.length > 0 &&
        myAccommodation.Images[0].ImageUrl
          ? "cover"
          : "contain"
      }
      source={
        myAccommodation.Images &&
        myAccommodation.Images.length > 0 &&
        myAccommodation.Images[0].ImageUrl
          ? { uri: `${API_URL}/${myAccommodation.Images[0].ImageUrl}` }
          : require("../../assets/noImg.png")
      }
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          onPress={handleDelete}
          style={{
            borderRadius: 10,
            marginLeft: 10,
            backgroundColor: "red",
            padding: 5,
          }}
        >
          <MaterialCommunityIcons
            name="delete"
            style={{ fontSize: 25, color: "#fff" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={isActive ? handleDeactivate : handleActivate}
          style={{
            borderRadius: 5,
            alignSelf: "flex-end",
            marginRight: 10,
            backgroundColor: isActive ? "#fe3c53" : "#57d673",
            padding: 5,
          }}
        >
          <CustomText style={{ color: "#fff", fontWeight: 500 }}>
            {isActive ? "Деактивировать" : "Активировать"}
          </CustomText>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: "rgba(97, 105, 146, 0.8)",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            columnGap: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ marginBottom: 5 }}
              onPress={() =>
                navigation.navigate("Сдать жильё", {
                  id: myAccommodation.ID,
                })
              }
            >
              <CustomText
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  color: "#fff",
                }}
              >
                {myAccommodation.Title}
              </CustomText>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
              }}
            >
              <Fontisto
                name="map-marker-alt"
                style={{ color: "#f0f0f0", fontSize: 15 }}
              />
              <CustomText style={{ color: "#f0f0f0" }}>
                {myAccommodation.LocationLabel}
              </CustomText>
            </View>
          </View>

          <View>
            <CustomText
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "#fff",
              }}
            >
              {myAccommodation.Price} c
            </CustomText>
            <CustomText
              style={{
                textAlign: "right",
                color: "#b8b8b8",
              }}
            >
              ночь
            </CustomText>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default MyObjects;
