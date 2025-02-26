import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Entypo from "react-native-vector-icons/Entypo";
import { CheckBox } from "@rneui/base";
import { fetchSearchResults } from "../../../Store/searchSlice/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomText from "../../CustomText/CustomText";
import CustomInput from "../../CustomInput/CustomInput";
import {
  fetchAmenities,
  fetchCategory,
} from "../../../Store/dictionarySlice/dictionarySlice";
import CustomPicker from "../../CustomPicker/CustomPicker";

const FilterModal = ({ isVisible, onClose, title }) => {
  const dispatch = useDispatch();
  const { control, handleSubmit, reset, setValue } = useForm();
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { amenities, categories } = useSelector((state) => state.dictionary);

  useEffect(() => {
    dispatch(fetchAmenities());
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    setValue("title", title);
  }, [title, setValue]);

  const toggleAmenity = (amenityId) => {
    const updatedAmenities = selectedAmenities.includes(amenityId)
      ? selectedAmenities.filter((item) => item !== amenityId)
      : [...selectedAmenities, amenityId];
    setSelectedAmenities(updatedAmenities);
  };

  const onSubmit = (data) => {
    const filters = {
      title: title || "",
      category_id: selectedCategory || null,
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

    Object.keys(filters).forEach((key) => {
      if (filters[key] === undefined || filters[key] === null) {
        delete filters[key];
      }
    });

    dispatch(fetchSearchResults(filters));
    reset();
    onClose();
  };
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20,
            maxHeight: "80%",
          }}
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
            <TouchableOpacity onPress={onClose}>
              <Entypo name="cross" style={{ fontSize: 30 }} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {/* <View style={{ marginBottom: 20 }}>
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
                      <CustomInput
                        placeholder="Дом"
                        keyboardType="default"
                        value={field.value || title}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </View>
              </View>
            </View> */}
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
                    <CustomInput
                      placeholder="5"
                      keyboardType="numeric"
                      value={field.value}
                      onChange={field.onChange}
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
                    <CustomPicker
                      placeholder="Выберите тип жилья"
                      selectedValue={field.value}
                      onValueChange={(value) => {
                        setSelectedCategory(value);
                        field.onChange(value);
                      }}
                      items={categories.map((category) => ({
                        label: category.Name,
                        value: category.Id,
                      }))}
                    />
                  )}
                />
              </View>
            </View>

            <View>
              <CustomText style={{ marginBottom: 10, fontSize: 20 }}>
                Удобства
              </CustomText>
              {amenities.map((amenity) => (
                <View
                  key={amenity.Id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 5,
                    marginBottom: 10,
                  }}
                >
                  <CheckBox
                    checked={selectedAmenities.includes(amenity.Id)}
                    onPress={() => toggleAmenity(amenity.Id)}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    size={30}
                    checkedColor="#594BFF"
                    containerStyle={{
                      margin: 0,
                      padding: 0,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 8,
                    }}
                  >
                    <Image
                      source={{ uri: amenity?.Icon }}
                      style={{ width: 20, height: 20 }}
                    />
                    <CustomText>{amenity?.Value}</CustomText>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                flex: 1,
                borderBottomWidth: 1,
                borderBlockColor: "#252525",
              }}
              onPress={() => reset()}
            >
              <CustomText style={{ textAlign: "center", fontSize: 16 }}>
                Очистить
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#252525",

                paddingVertical: 15,
                paddingHorizontal: 10,
                borderRadius: 10,
                flex: 1,
              }}
              onPress={handleSubmit(onSubmit)}
            >
              <CustomText
                style={{ textAlign: "center", fontSize: 20, color: "white" }}
              >
                Применить
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
