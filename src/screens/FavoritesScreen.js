import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  loadFavoritesFromStorage,
  removeFromFavorites,
} from "../Store/Favorites/FavoritesAction";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetItem,
  ActionsheetItemText,
} from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [selectedFavorite, setSelectedFavorite] = useState(null);
  const [showActionsheet, setShowActionsheet] = useState(false);
  const favorite = useSelector((state) => state.favorites.favorites);

  const handleClose = () => {
    setShowActionsheet(!showActionsheet);
  };

  const removeFavoriteHandler = () => {
    if (selectedFavorite) {
      dispatch(removeFromFavorites(selectedFavorite));
      console.log("first", selectedFavorite);
      setSelectedFavorite(null);
    }
  };

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      try {
        const favoritesData = await AsyncStorage.getItem("favorites");
        if (favoritesData !== null && favoritesData !== "[]") {
          const parsedFavorites = JSON.parse(favoritesData);
          dispatch(loadFavoritesFromStorage(parsedFavorites));
          setFavorites(parsedFavorites);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [dispatch]);

  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <LinearGradient
      style={[
        { flex: 1 },
        // isDarkModeEnabled && { backgroundColor: "#191a1d" },
      ]}
      start={{ x: 2.4, y: 1.1 }}
      end={{ x: 0, y: 0 }}
      colors={["#241270", "#140A4F", "#000"]}
    >
      <SafeAreaWrapper
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <Ionicons name="star-outline" size={200} color="rgba(93, 0, 230, 0.6)" />
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              marginTop: 20,
              fontSize: 20,
            }}
          >
            Избранные пусты
          </Text>
        </View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {favorites?.length > 0 &&
              favorites.map((favorite, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    alignSelf: "auto",
                    borderRadius: 20,
                    paddingTop: 15,
                    paddingRight: 5,
                    paddingBottom: 15,
                    paddingLeft: 15,
                    width: 120,
                    height: "100%",
                    backgroundColor: "#272727",
                    // shadowColor: "#272727",
                    // shadowOffset: {
                    //   width: 0,
                    //   height: 2,
                    // },
                    // shadowOpacity: 0.1,
                    // shadowRadius: 8.84,
                    // elevation: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <View>
                      <View
                        style={{
                          backgroundColor: "rgba(93, 0, 230, 0.6)",
                          borderRadius: 10,
                          padding: 5,
                        }}
                      >
                        <Ionicons
                          name={"star-outline"}
                          size={30}
                          color={"#fff"}
                        />
                      </View>
                      <Text
                        style={{
                          flexWrap: "wrap",
                          fontSize: 14,
                          paddingTop: 10,
                          color: "#fff",
                          fontWeight: 500,
                        }}
                      >
                        {favorite?.templateName}
                      </Text>
                    </View>

                    <Entypo
                      onPress={() => {
                        setSelectedFavorite(favorite);
                        handleClose();
                      }}
                      name={"dots-three-vertical"}
                      style={{
                        fontSize: 15,
                        color: "#fff",
                      }}
                    />
                  </View>
                  {selectedFavorite && selectedFavorite.id === favorite.id && (
                    <Actionsheet
                      isOpen={showActionsheet}
                      onClose={handleClose}
                      zIndex={999}
                    >
                      <ActionsheetBackdrop />
                      <ActionsheetContent
                        backgroundColor={"#191a1d"}
                        paddingVertical={10}
                        zIndex={999}
                      >
                        <ActionsheetDragIndicatorWrapper marginBottom={10}>
                          <ActionsheetDragIndicator />
                        </ActionsheetDragIndicatorWrapper>

                        <ActionsheetItem>
                          <ActionsheetItemText
                            color={"#fff"}
                            onPress={removeFavoriteHandler}
                          >
                            Удалить
                          </ActionsheetItemText>
                        </ActionsheetItem>
                      </ActionsheetContent>
                    </Actionsheet>
                  )}
                </TouchableOpacity>
              ))}
          </View>
        )}
      </SafeAreaWrapper>
    </LinearGradient>
  );
};

export default FavoritesScreen;
