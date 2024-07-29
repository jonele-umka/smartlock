import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CustomText from "../CustomText/CustomText";
const MyObjects = ({ myAccommodation }) => {
  const navigation = useNavigation();
  const API_URL = process.env.API_URL;

  return (
    <View
      style={{
        borderRadius: 20,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      }}
    >
      <ImageBackground
        style={{
          width: "100%",
          height: 220,
          justifyContent: "space-between",
          paddingVertical: 10,
        }}
        source={{
          uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/ad/7f/16/caption.jpg?w=1200&h=-1&s=1",
        }}
        onPress={() => navigation.navigate("Данные об отеле")}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          {/* <View style={{ flexDirection: "row", columnGap: 10 }}>
            <View style={{ overflow: "hidden", borderRadius: 100 }}>
              <BlurView intensity={40} tint="dark" style={{ padding: 5 }}>
                <Ionicons
                  name="share-social-outline"
                  style={{ color: "#fff", fontSize: 25 }}
                />
              </BlurView>
            </View>
            <View style={{ overflow: "hidden", borderRadius: 100 }}>
              <TouchableOpacity onPress={handleFavoritePress}>
                <BlurView intensity={40} tint="dark" style={{ padding: 5 }}>
                  <Ionicons
                    name={isFavorite ? "heart" : "heart-outline"}
                    style={{ color: "#fff", fontSize: 25 }}
                  />
                </BlurView>
              </TouchableOpacity>
            </View>
          </View> */}
          <View style={{ overflow: "hidden", borderRadius: 100 }}>
            <BlurView
              intensity={40}
              tint="dark"
              style={{
                padding: 5,
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
              }}
            >
              <MaterialIcons
                name="star-outline"
                style={{ color: "#fff", fontSize: 25 }}
              />
              <CustomText style={{ color: "#fff", fontWeight: 500 }}>
                {myAccommodation.Rating}
              </CustomText>
            </BlurView>
          </View>
        </View>
        <BlurView
          tint="dark"
          style={{ paddingHorizontal: 10, paddingVertical: 10 }}
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
                onPress={() => navigation.navigate("Редактировать объект")}
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
        </BlurView>
      </ImageBackground>
    </View>
  );
};

export default MyObjects;
