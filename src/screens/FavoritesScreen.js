import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  Platform,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites, removeFavorite } from "../Store/favoritesSlice/favoritesSlice";
// import Objects from "../components/Objects/Objects";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/core";
import CustomText from "../components/CustomText/CustomText";

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;
  const token = useSelector((state) => state.auth.token);
  const status = useSelector((state) => state.favorites.status);
  const favorites = useSelector((state) => state.favorites.favorites);
  const API_URL = process.env.API_URL;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites(token));
  }, [dispatch, token]);

  if (status === "loading") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}
    >
      <SafeAreaWrapper>
        <Text
          style={{
            color: "#000",
            fontSize: 30,
            textAlign: "center",
            marginBottom: 25,
          }}
        >
          {favorites && favorites.length > 0
            ? "Ваши избранные"
            : "Нет избранных"}
        </Text>
        <View style={{ flexDirection: "column", rowGap: 20, flexWrap: "wrap" }}>
          {favorites &&
            favorites.map((favorite) => (
              // <Objects
              //   key={item.favorite.ID}
              //   favorites={favorites}
              // />

              <View
                key={favorite.ID}
                style={{
                  width: "100%",
                  height: "auto",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  elevation: 5,
                }}
              >
                <View style={{ position: "relative" }}>
                  <Image
                    borderTopLeftRadius={20}
                    borderTopRightRadius={20}
                    style={{
                      height: 180,
                    }}
                    source={{
                      uri: `${API_URL}/${favorite?.Accommodation?.Images[0]?.ImageUrl}`,
                    }}
                  />
                  <View
                    style={{
                      overflow: "hidden",
                      borderRadius: 100,
                      position: "absolute",
                      right: 10,
                      top: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        dispatch(removeFavorite({ id: favorite.ID, token }))
                      }
                    >
                      <BlurView
                        intensity={40}
                        tint="dark"
                        style={{ padding: 5 }}
                      >
                        <Ionicons
                          name={"heart"}
                          style={{ color: "#fff", fontSize: 25 }}
                        />
                      </BlurView>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: "#fff",
                    padding: 15,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
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
                        onPress={() => navigation.navigate("Данные об отеле")}
                      >
                        <CustomText
                          style={{
                            fontSize: 20,
                            fontWeight: 500,
                            color: "#000",
                          }}
                        >
                          {favorite?.Accommodation?.Title}
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
                          style={{ color: "#000", fontSize: 15 }}
                        />
                        <CustomText style={{ color: "#000" }}>
                          {favorite?.Accommodation?.LocationLabel}
                        </CustomText>
                      </View>
                    </View>

                    <View>
                      <CustomText
                        style={{
                          fontSize: 16,
                          fontWeight: 500,
                          color: "#000",
                        }}
                      >
                        {favorite?.Accommodation?.Price} c
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
              </View>
            ))}
        </View>
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default FavoritesScreen;
