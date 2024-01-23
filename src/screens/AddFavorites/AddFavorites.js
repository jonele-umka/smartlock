import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addToFavorites } from "../../Store/Favorites/FavoritesAction";

export const AddFavorites = () => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const values = getValues();
  
  const { templateName } = values;
  const { favorites } = route.params;

  const addToFavoritesHandler = () => {
    console.log("Adding to favorites: ", favorites);  
    if (favorites && templateName) {
      const newFavorite = {
        ...favorites,
        templateName: templateName,
      };
      console.log("New Favorite: ", newFavorite); 
      dispatch(addToFavorites(newFavorite));
      console.log("Added to favorites");
      navigation.navigate("Главная страница");
    }
  };

  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <SafeAreaWrapper
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#191a1d",
      }}
    >
      <View
        style={{
          paddingHorizontal: Platform.OS === "android" ? 0 : 10,
          paddingVertical: Platform.OS === "android" ? 0 : 20,
        }}
      >
        <View style={{ marginTop: 25 }}>
          <Text style={{ marginBottom: 5, color: "grey" }}>
            Назовите свой шаблон
          </Text>
          <Controller
            control={control}
            name="templateName"
            rules={{ required: "Заполните это поле" }}
            render={({ field }) => (
              <View
                style={{
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  backgroundColor: "#272727",
                }}
              >
                <TextInput
                  placeholderTextColor={"grey"}
                  placeholder="Название шаблона"
                  value={field.value}
                  onChangeText={(value) => field.onChange(value)}
                  style={{
                    color: "#fff",
                    fontSize: 16,
                  }}
                />
              </View>
            )}
          />
          {errors.templateName && (
            <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
              Заполните поле
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={{
            marginTop: 25,
            borderRadius: 10,
            padding: 20,
            backgroundColor: "#5d00e6",
            marginTop: 30,
            shadowColor: "#5d00e6",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          }}
          onPress={handleSubmit(addToFavoritesHandler)}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: 16,
            }}
          >
            Отправить
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
};
