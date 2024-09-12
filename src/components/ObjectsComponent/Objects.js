import React, { useEffect, useState } from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import CustomText from "../CustomText/CustomText";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  fetchFavorites,
  removeFavorite,
} from "../../Store/favoritesSlice/favoritesSlice";

const Objects = ({ items }) => {
  const navigation = useNavigation();
  const API_URL = process.env.API_URL;
  const token = useSelector((state) => state.auth.token);
  const favorites = useSelector((state) => state.favorites.favorites || []);
  const dispatch = useDispatch();

  const [isFavorite, setIsFavorite] = useState(
    favorites.some((fav) => fav.AccommodationID === items.ID)
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchFavorites(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav.AccommodationID === items.ID));
  }, [favorites]);

  const handleFavoritePress = async () => {
    if (isFavorite) {
      const favorite = favorites.find(
        (fav) => fav.AccommodationID === items.ID
      );

      if (favorite) {
        await dispatch(removeFavorite({ id: favorite.ID, token }));
      }
    } else {
      await dispatch(addFavorite({ id: items.ID, token }));
    }

    // Обновляем локальное состояние немедленно
    setIsFavorite(!isFavorite);
    // Обновляем список фаворитов после добавления или удаления
    dispatch(fetchFavorites(token));
  };
  return (
    <ImageBackground
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
        items.Images && items.Images.length > 0 && items.Images[0].ImageUrl
          ? "cover"
          : "contain"
      }
      source={
        items.Images && items.Images.length > 0 && items.Images[0].ImageUrl
          ? { uri: `${API_URL}/${items.Images[0].ImageUrl}` }
          : require("../../assets/noImg.png")
      }
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            padding: 5,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "rgba(97, 105, 146, 0.8)",
            columnGap: 5,
            borderRadius: 10,
          }}
        >
          <MaterialIcons
            name="star-outline"
            style={{ color: "#fff", fontSize: 25 }}
          />
          <CustomText style={{ color: "#fff", fontWeight: 500 }}>
            {items?.Rating}
          </CustomText>
        </View>

        {/* <View style={{ flexDirection: "row", columnGap: 10 }}>
            <View style={{ overflow: "hidden", borderRadius: 100 }}>
              <BlurView intensity={40} tint="dark" style={{ padding: 5 }}>
                <Ionicons
                  name="share-social-outline"
                  style={{ color: "#fff", fontSize: 25 }}
                />
              </BlurView>
            </View>
          </View> */}

        <TouchableOpacity
          style={{
            backgroundColor: "rgba(97, 105, 146, 0.8)",
            borderRadius: 10,
            padding: 5,
          }}
          onPress={handleFavoritePress}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            style={{ color: "#fff", fontSize: 25 }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: "rgba(97, 105, 146, 0.8)",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          columnGap: 10,
          padding: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ marginBottom: 5 }}
            onPress={() =>
              navigation.navigate("Детали объекта", {
                id: items.ID,
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
              {items.Title}
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
              {items.LocationLabel}
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
            {items?.Price} c
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
    </ImageBackground>
  );
};

export default Objects;
