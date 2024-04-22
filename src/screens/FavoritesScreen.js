import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Modal,
  Pressable,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFavorite,
  fetchFavorites,
} from "../Store/Favorites/FavoritesAction";
import { LinearGradient } from "expo-linear-gradient";
import i18n from "../components/i18n/i18n";
import { useNavigation } from "@react-navigation/native";
import { Tooltip } from "@rneui/themed";
const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const loading = useSelector((state) => state.favorites.loading);
  const [selectedTemplateDelete, setSelectedTemplateDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // const favorites = useSelector((state) => state.favorites.favorites);
  // const token = useSelector((state) => state.signIn.token);

  const handleTemplatePress = (template) => {
    setSelectedTemplate(template);
     
  };
  useEffect(() => {
    dispatch(fetchFavorites(token));
  }, [dispatch, token]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchFavorites(token));
    setRefreshing(false);
  };

  const deleteTransferTemplate = async (id) => {
    console.log(id);
    try {
      await dispatch(deleteFavorite(id, token));
    } catch (error) {
      console.error("Ошибка при удалении элемента:", error);
    }
  };

  const handleDeletePress = (id) => {
    setShowDeleteModal(!showDeleteModal);
    setSelectedTemplateDelete(id);
  };
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color={"#000"} />
      </View>
    );
  }
  if (!favorites.length) {
    return (
      <SafeAreaWrapper
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <View>
          <Ionicons name="star-outline" size={200} color="#000" />
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              marginTop: 20,
              fontSize: 20,
            }}
          >
            Нет избранных
          </Text>
        </View>
      </SafeAreaWrapper>
    );
  }
  return (
    <ScrollView
      style={{ paddingVertical: 20, flex: 1, backgroundColor: "#fff" }}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      <SafeAreaWrapper
        style={{
          flex: 1,
          paddingHorizontal: 10,
          paddingBottom: 40,
        }}
      >
        <Text
          style={{
            color: "#000",
            fontSize: 30,
            textAlign: "center",
            marginBottom: 25,
          }}
        >
          Ваши избранные
        </Text>

        {favorites && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
              columnGap: 10,
              rowGap: 20,
            }}
          >
            {favorites?.data?.map((favorite, index) => (
              <>
                <TouchableOpacity
                  onPress={() => handleTemplatePress(favorite)}
                  key={favorite.ID}
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    alignSelf: "auto",
                    borderRadius: 20,
                    paddingTop: 15,
                    paddingRight: 5,
                    paddingBottom: 15,
                    paddingLeft: 15,
                    width: 110,
                    backgroundColor: "rgba(255,255,255,0.05)",
                    shadowColor: "rgba(255,255,255,0.05)",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 8.84,
                    elevation: 5,
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
                          backgroundColor: "#5d00e6",
                          borderRadius: 10,
                          padding: 5,
                        }}
                      >
                        <Ionicons
                          name={"star-outline"}
                          size={25}
                          color={"#000"}
                        />
                      </View>
                      <Text
                        style={{
                          flexWrap: "wrap",
                          fontSize: 14,
                          paddingTop: 10,
                          color: "#000",
                          fontWeight: 500,
                        }}
                      >
                        {favorite?.Name}
                      </Text>
                    </View>

                    <Entypo
                      onPress={() => {
                        // setSelectedTemplate(favorite);
                        handleDeletePress(favorite.ID);
                      }}
                      name={"dots-three-vertical"}
                      style={{
                        fontSize: 15,
                        color: "#000",
                      }}
                    />
                  </View>
                  {/* {showDeleteModal &&
                      selectedTemplateDelete === favorite.ID && (
                        <Tooltip
                          width={200}
                          onClose={() => setShowDeleteModal(false)}
                          placement="top"
                          backgroundColor={"#000"}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "flex-end",
                              marginTop: 5,
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                setShowDeleteModal(true);
                                deleteTransferTemplate(selectedTemplateDelete);
                              }}
                            >
                              <Text style={{ color: "#b8b8b8" }}>Delete</Text>
                            </TouchableOpacity>
                          </View>
                        </Tooltip>
                      )} */}
                  {showDeleteModal &&
                    selectedTemplateDelete === favorite.ID && (
                      <Tooltip
                        popover={
                          <Text
                            onPress={() => {
                              setShowDeleteModal(false);
                              deleteTransferTemplate(selectedTemplateDelete);
                            }}
                          >
                            {i18n.t("delete")}
                          </Text>
                        }
                        visible={
                          showDeleteModal &&
                          selectedTemplateDelete === favorite.ID
                        }
                        backgroundColor={"#000"}
                        onClose={() => setShowDeleteModal(false)}
                      />
                    )}
                </TouchableOpacity>
              </>
            ))}
          </View>
        )}
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default FavoritesScreen;
