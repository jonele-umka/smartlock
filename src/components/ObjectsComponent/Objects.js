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

const Objects = ({ accommodation }) => {
  const navigation = useNavigation();
  const API_URL = process.env.API_URL;
  const token = useSelector((state) => state.auth.token);
  const favorites = useSelector((state) => state.favorites.favorites || []);
  const dispatch = useDispatch();

  const [isFavorite, setIsFavorite] = useState(
    favorites.some((fav) => fav.AccommodationID === accommodation.ID)
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchFavorites(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    setIsFavorite(
      favorites.some((fav) => fav.AccommodationID === accommodation.ID)
    );
  }, [favorites]);

  const handleFavoritePress = async () => {
    if (isFavorite) {
      const favorite = favorites.find(
        (fav) => fav.AccommodationID === accommodation.ID
      );

      if (favorite) {
        await dispatch(removeFavorite({ id: favorite.ID, token }));
      }
    } else {
      await dispatch(addFavorite({ id: accommodation.ID, token }));
    }

    // Обновляем локальное состояние немедленно
    setIsFavorite(!isFavorite);
    // Обновляем список фаворитов после добавления или удаления
    dispatch(fetchFavorites(token));
  };
  console.log(accommodation)
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
          uri: `${API_URL}/${accommodation.Images[0].ImageUrl}`,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <View style={{ flexDirection: "row", columnGap: 10 }}>
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
          </View>
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
                {accommodation.Rating}
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
                onPress={() =>
                  navigation.navigate("Данные об отеле", {
                    img: accommodation?.Images,
                    title: accommodation?.Title,
                    descriptionText: accommodation?.Description,
                    locationLabel: accommodation?.LocationLabel,
                    price: accommodation?.Price,
                    discountPrice: accommodation?.DiscountPrice,
                    peopleQuantity: accommodation?.PeopleQuantity,
                    roomsQuantity: accommodation?.RoomsQuantity,
                    rating: accommodation?.Rating,
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
                  {accommodation.Title}
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
                  {accommodation.LocationLabel}
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
                {accommodation?.Price} c
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

export default Objects;
