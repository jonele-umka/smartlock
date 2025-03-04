import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavorites,
  removeFavorite,
} from "../Store/favoritesSlice/favoritesSlice";
import { useNavigation } from "@react-navigation/core";
import CustomText from "../components/CustomText/CustomText";
import { RefreshControl } from "react-native";
import SafeAreaWrapper from "../components/SafeAreaWrapper/SafeAreaWrapper";
import i18n from "../components/i18n/i18n";

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.token);
  const status = useSelector((state) => state.favorites.status);
  const favorites = useSelector((state) => state.favorites.favorites);
  const API_URL = process.env.API_URL;
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchFavorites(token));
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    dispatch(fetchFavorites(token));
  }, [dispatch, token]);

  if (status === "loading") {
  if (status === "loading") {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#4B5DFF" />
      </View>
    );
  }
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 40,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SafeAreaWrapper>
        <CustomText
          style={{
            fontSize: 30,
            textAlign: "center",
            marginBottom: 25,
          }}
        >
          {favorites && favorites.length > 0
            ? i18n.t("yourFavorites")
            : i18n.t("noYourFavorites")}
        </CustomText>
        <View style={{ flexDirection: "column", rowGap: 20, flexWrap: "wrap" }}>
          {favorites &&
            favorites.length > 0 &&
            favorites.map((items, index) => (
              <TouchableOpacity
                key={items?.Accommodation?.ID || index}
                style={{
                  width: "100%",
                }}
                onPress={() => {
                  navigation.navigate("Детали объекта", {
                    id: items?.Accommodation?.ID,
                  });
                }}
              >
                <ImageBackground
                  style={{
                    width: "100%",
                    height: 220,
                    justifyContent: "space-between",
                    paddingTop: 10,
                    borderRadius: 20,
                    overflow: "hidden",
                  }}
                  resizeMode={
                    items?.Accommodation?.Images &&
                    items?.Accommodation?.Images.length > 0 &&
                    items?.Accommodation?.Images[0].ImageUrl
                      ? "cover"
                      : "contain"
                  }
                  source={
                    items?.Accommodation?.Images &&
                    items?.Accommodation?.Images.length > 0 &&
                    items?.Accommodation?.Images[0].ImageUrl
                      ? {
                          uri: `${API_URL}/${items?.Accommodation?.Images[0].ImageUrl}`,
                        }
                      : require("../assets/noImg.png")
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
                        {items?.Accommodation?.Rating}
                      </CustomText>
                    </View>

                    <TouchableOpacity
                      style={{
                        backgroundColor: "rgba(97, 105, 146, 0.8)",
                        borderRadius: 10,
                        padding: 5,
                      }}
                      onPress={() => {
                        dispatch(removeFavorite({ id: items?.ID, token })).then(
                          () => {
                            dispatch(fetchFavorites(token));
                          }
                        );
                      }}
                    >
                      <Ionicons
                        name={"heart"}
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
                      <CustomText
                        style={{
                          fontSize: 20,
                          fontWeight: 500,
                          color: "#fff",
                          marginBottom: 5,
                        }}
                      >
                        {items?.Accommodation?.Title}
                      </CustomText>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          columnGap: 5,
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
                          {items?.Accommodation?.LocationLabel}
                        </CustomText>
                      </View>
                    </View>

                    <View>
                      <CustomText
                    </View>

                    <View>
                      <CustomText
                        style={{
                          fontSize: 16,
                          fontSize: 16,
                          fontWeight: 500,
                          color: "#fff",
                        }}
                      >
                        {items?.Accommodation?.Price} c
                      </CustomText>
                      <CustomText
                        style={{
                          textAlign: "right",
                          color: "#b8b8b8",
                        }}
                      >
                        {i18n.t("night")}
                      </CustomText>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
        </View>
        </View>
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default FavoritesScreen;
