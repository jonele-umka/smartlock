import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import { useForm, Controller } from "react-hook-form";
import Entypo from "react-native-vector-icons/Entypo";
import { CheckBox } from "@rneui/base";
import { fetchSearchResults } from "../../../Store/searchSlice/searchSlice";
import { useDispatch } from "react-redux";
import ActionSheet from "react-native-actions-sheet";
import CustomText from "../../CustomText/CustomText";

const ActionFilter = ({ actionSheetRef, title }) => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchAmenities();
    fetchCategory();
  }, []);

  const fetchAmenities = async () => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/dictionary/facility`
      );
      const data = await response.json();
      setAmenitiesList(data);
    } catch (error) {
      console.error("Ошибка получения данных:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/dictionary/category`
      );
      const data = await response.json();
      setCategoryList(data);
    } catch (error) {
      console.error("Ошибка получения данных:", error);
    }
  };
  const toggleAmenity = (amenityId) => {
    const updatedAmenities = selectedAmenities.includes(amenityId)
      ? selectedAmenities.filter((item) => item !== amenityId)
      : [...selectedAmenities, amenityId];
    setSelectedAmenities(updatedAmenities);
  };
  const onSubmit = (data) => {
    const filters = {
      title: data.title || "",
      category_id: selectedCategory ? selectedCategory : null,
      people_quantity: data.peopleQuantity
        ? parseInt(data.peopleQuantity, 10)
        : undefined,
      rooms_quantity: data.roomsQuantity
        ? parseInt(data.roomsQuantity, 10)
        : undefined,
      min_price: data.minPrice ? parseInt(data.minPrice, 10) : undefined,
      max_price: data.maxPrice ? parseInt(data.maxPrice, 10) : undefined,
      facilities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
      min_rating: data.minRating ? parseFloat(data.minRating) : undefined,
    };

    // Удаляем поля с `undefined` значением, чтобы они не отправлялись на сервер
    Object.keys(filters).forEach((key) => {
      if (filters[key] === undefined || filters[key] === null) {
        delete filters[key];
      }
    });

    dispatch(fetchSearchResults(filters));
    actionSheetRef.current?.hide();
  };
  return (
    <ActionSheet ref={actionSheetRef}>
      <ScrollView
        contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <CustomText style={{ fontSize: 25 }}>Фильтры</CustomText>
          <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
            <Entypo name="cross" style={{ fontSize: 30 }} />
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: 20 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 20 }}>
            Название
          </CustomText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: 10,
            }}
          >
            <View style={{ flex: 1 }}>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: "#dee2f1",
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      paddingVertical: 12,
                      fontSize: 16,
                      color: "#1C2863",
                    }}
                    placeholder="Коттедж"
                    placeholderTextColor={"#616992"}
                    onChangeText={field.onChange}
                    value={field.value}
                    defaultValue={title}
                  />
                )}
              />
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 20 }}>
            Цена
          </CustomText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: 10,
              borderWidth: 1,
              borderColor: "#dee2f1",
              borderRadius: 10,
              paddingVertical: 12,
            }}
          >
            <View style={{ flex: 1 }}>
              <Controller
                control={control}
                name="minPrice"
                render={({ field }) => (
                  <TextInput
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 16,
                      color: "#1C2863",
                      borderRightWidth: 1,
                      borderRightColor: "#DEE2F1",
                    }}
                    placeholder="Минимальная цена"
                    placeholderTextColor={"#616992"}
                    keyboardType="numeric"
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Controller
                control={control}
                name="maxPrice"
                render={({ field }) => (
                  <TextInput
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 16,
                      color: "#1C2863",
                    }}
                    placeholderTextColor={"#616992"}
                    placeholder="Максимальная цена"
                    keyboardType="numeric"
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </View>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 20 }}>
            Рейтинг
          </CustomText>
          <View style={{ flex: 1 }}>
            <Controller
              control={control}
              name="minRating"
              render={({ field }) => (
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "#dee2f1",
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    paddingVertical: 12,
                    fontSize: 16,
                    color: "#1C2863",
                  }}
                  placeholder="5"
                  placeholderTextColor={"#616992"}
                  keyboardType="numeric"
                  onChangeText={field.onChange}
                  value={field.value}
                />
              )}
            />
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 20 }}>
            Тип жилья
          </CustomText>
          <View>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <RNPickerSelect
                  itemKey="value"
                  placeholder={{
                    label: "Выберите тип жилья",
                    value: null,
                    color: "#616992",
                  }}
                  onValueChange={(value) => setSelectedCategory(value)}
                  items={categoryList.map((category) => ({
                    label: category.Name,
                    value: category.ID,
                    color: "#1C2863",
                  }))}
                  value={selectedCategory}
                  style={{
                    inputAndroid: {
                      paddingVertical: 15,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      color: "#1C2863",
                      fontSize: 14,
                      backgroundColor: "#dee2f1",
                    },
                    inputIOS: {
                      paddingVertical: 15,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      color: "#1C2863",
                      fontSize: 14,
                      backgroundColor: "#dee2f1",
                    },
                  }}
                />
              )}
            />
          </View>
        </View>

        <View>
          <CustomText
            onPress={() => actionSheetRef.current?.hide()}
            style={{ marginBottom: 10, fontSize: 20 }}
          >
            Удобства
          </CustomText>
          {amenitiesList.map((amenity) => (
            <View
              key={amenity.ID}
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
                marginBottom: 10,
              }}
            >
              <CheckBox
                checked={selectedAmenities.includes(amenity.ID)}
                onPress={() => toggleAmenity(amenity.ID)}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                size={30}
                checkedColor="#594BFF"
                containerStyle={{
                  margin: 0,
                  padding: 0,
                  marginLeft: 0,
                  marginRight: 0,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 8,
                }}
              >
                <CustomText>{amenity.Value}</CustomText>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: "#252525",
          marginTop: 20,
          marginBottom: 30,
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderRadius: 10,
          marginHorizontal: 10,
        }}
        onPress={handleSubmit(onSubmit)}
      >
        <CustomText
          style={{ textAlign: "center", fontSize: 20, color: "white" }}
        >
          Применить
        </CustomText>
      </TouchableOpacity>
    </ActionSheet>
  );
};

export default ActionFilter;
