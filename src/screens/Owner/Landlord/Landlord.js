import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import Ionicons from "react-native-vector-icons/Ionicons";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/core";

import PickImage from "../../../components/PickImage/PickImage";
import SafeAreaWrapper from "../../../components/SafeAreaWrapper/SafeAreaWrapper";
import ActionLandlord from "../../../components/ActionSheet/ActionLandlord/ActionLandlord";
import CustomText from "../../../components/CustomText/CustomText";
import { fetchMyAccommodations } from "../../../Store/accommodationSlice/accommodationSlice";
import Toast from "react-native-toast-message";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const categoryIcon = {
  1: require("../../../assets/home.png"),
  2: require("../../../assets/hotel.png"),
  3: require("../../../assets/apartment.png"),
};

const Landlord = () => {
  const [objectDetails, setObjectDetails] = useState(null);

  const defaultFormValues = {
    Title: "",
    CategoryID: null,
    LocationLabel: "",
    Latitude: "",
    Longitude: "",
    PeopleQuantity: null,
    RoomsQuantity: null,
    Description: "",
    Price: null,
    DiscountPrice: "",
    PriceDescription: "",
    CheckInID: null,
    CheckOutID: null,
    Bedrooms: null,
    Beds: null,
    Bathrooms: null,
    City: "",
    Country: "",
    Facilities: [1, 2, 3],
    Rules: [1, 2, 3],
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormValues,
  });

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const navigation = useNavigation();
  const API_URL = process.env.API_URL;
  const route = useRoute();

  // action
  const actionSheetRef = useRef();
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);

  // list
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [rulesList, setRulesList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [checkInOutList, setCheckInOutList] = useState([]);
  // select
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCheckIn, setSelectedCheckIn] = useState([]);
  const [selectedCheckOut, setSelectedCheckOut] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  // more
  const [currentType, setCurrentType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // action
  const openActionSheet = (type) => {
    setCurrentType(type);
    setIsActionSheetVisible(true);
  };
  useEffect(() => {
    if (isActionSheetVisible) {
      actionSheetRef.current?.show();
    } else {
      actionSheetRef.current?.hide();
    }
  }, [isActionSheetVisible]);

  useEffect(() => {
    if (currentType === "amenities") {
      fetchAmenities();
    } else if (currentType === "rules") {
      fetchRules();
    } else if (currentType === "category") {
      fetchCategory();
    } else if (currentType === "checkIn") {
      fetchCheckInOut();
    } else if (currentType === "checkOut") {
      fetchCheckInOut();
    }
  }, [currentType]);

  // fetchObject
  const fetchObjectDetails = async () => {
    if (!route?.params?.id) return;
    setLoading(true); // Устанавливаем состояние загрузки
    try {
      const response = await fetch(
        `${API_URL}/accommodation/get-one/${route?.params?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setObjectDetails(data?.Accommodation);
        setSelectedImages(data?.Accommodation?.Images);
        reset(data?.Accommodation);
        setLoading(false);
      } else {
        console.error("Ошибка при получении данных:", response.status);
        setLoading(false);
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (route.params?.id) {
      fetchObjectDetails();
    }
  }, [route.params?.id]);

  // fetchAction
  useEffect(() => {
    fetchAmenities();
    fetchRules();
    fetchCategory();
    fetchCheckInOut();
  }, []);

  const fetchAmenities = async () => {
    try {
      const response = await fetch(`${API_URL}/dictionary/facility`);
      const data = await response.json();
      setAmenitiesList(data);
    } catch (error) {
      console.error("Ошибка получения данных:", error);
    }
  };

  const fetchRules = async () => {
    try {
      const response = await fetch(`${API_URL}/dictionary/rule`);
      const data = await response.json();
      setRulesList(data);
    } catch (error) {
      console.error("Ошибка получения данных:", error);
    }
  };
  const fetchCategory = async () => {
    try {
      const response = await fetch(`${API_URL}/dictionary/category`);
      const data = await response.json();
      setCategoryList(data);
    } catch (error) {
      console.error("Ошибка получения данных:", error);
    }
  };
  const fetchCheckInOut = async () => {
    try {
      const response = await fetch(`${API_URL}/dictionary/check_in_out`);
      const data = await response.json();
      setCheckInOutList(data);
    } catch (error) {
      console.error("Ошибка получения данных:", error);
    }
  };

  // toggle
  const toggleAmenity = (amenityId) => {
    const updatedAmenities = selectedAmenities.includes(amenityId)
      ? selectedAmenities.filter((item) => item !== amenityId)
      : [...selectedAmenities, amenityId];
    setSelectedAmenities(updatedAmenities);
  };

  const toggleRule = (ruleId) => {
    const updatedRules = selectedRules.includes(ruleId)
      ? selectedRules.filter((item) => item !== ruleId)
      : [...selectedRules, ruleId];
    setSelectedRules(updatedRules);
  };
  const toggleCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  const toggleCheckIn = (id) => {
    setSelectedCheckIn(id);
    if (!selectedCheckOut) {
      setSelectedCheckOut(id);
    }
  };

  const toggleCheckOut = (id) => {
    setSelectedCheckOut(id);
  };

  // name
  const getCategoryNameById = (id, defaultText) => {
    const item = categoryList.find((category) => category.ID === id);
    return item ? item.Name : defaultText;
  };
  const firstSelectedAmenity = amenitiesList.find((amenity) =>
    selectedAmenities.includes(amenity.ID)
  );
  const firstSelectedRules = rulesList.find((rule) =>
    selectedRules.includes(rule.ID)
  );
  const getCheckInOutNameById = (id, defaultText) => {
    const item = checkInOutList.find((checkInOut) => checkInOut.ID === id);
    return item ? item.Value : defaultText;
  };

  //  images
  const handleProfileUpdate = async (id) => {
    console.log("Profile Update ID:", id);

    try {
      // Проверяем, что у нас есть изображения для загрузки
      if (selectedImages.length === 0) {
        console.log("No images to upload.");
        return true; // Если нет изображений, просто выходим
      }

      for (let imageUri of selectedImages) {
        const formData = new FormData();

        // Проверяем тип данных в imageUri и добавляем в FormData
        const isServerImage = typeof imageUri === "object" && imageUri.ImageUrl;
        if (isServerImage) {
          // Если это изображение с сервера, просто пропускаем
          console.log("Skipping server image:", imageUri.ImageUrl);
          continue;
        }

        formData.append("image", {
          uri: imageUri,
          name: "image.jpg",
          type: "image/jpeg",
        });

        console.log("FormData before sending:", formData);

        const response = await fetch(
          `${API_URL}/image/create-accommodation-image/${id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              // Убираем Content-Type, так как FormData автоматически устанавливает его
            },
            body: formData,
          }
        );

        console.log("Response Status:", response.status);
        console.log("Response Headers:", response.headers);
        const responseBody = await response.text();
        console.log("Response Body:", responseBody);

        if (!response.ok) {
          if (response.status === 413) {
            Toast.show({
              type: "error",
              position: "top",
              text1: "Ошибка",
              text2: "Слишком большой файл",
              visibilityTime: 3000,
              autoHide: true,
              topOffset: 30,
            });
            return false;
          }

          const errorResponse = await response.json();
          console.log("Failed to upload image:", errorResponse);
          return false;
        }
      }

      console.log("All images uploaded successfully");
      return true;
    } catch (error) {
      console.error("Error uploading images", error);
      return false;
    }
  };

  const handleImageSelected = (imageUri) => {
    setSelectedImages([...selectedImages, imageUri]);
  };
  // Функция для удаления изображения
  const handleRemoveImage = async (index) => {
    const imageToRemove = selectedImages[index];

    if (imageToRemove?.ID) {
      try {
        const url = `${API_URL}/image/delete/${route?.params?.id}`;
        const requestBody = JSON.stringify({
          Images: [imageToRemove.ID],
        });

        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: requestBody,
        });

        const responseBody = await response.json();
        console.log("Delete response:", requestBody);

        if (response.ok) {
          setSelectedImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
          );
        } else {
          console.error("Ошибка при удалении изображения:", responseBody);
        }
      } catch (error) {
        console.error("Ошибка при удалении изображения:         ", error);
      }
    } else {
      setSelectedImages((prevImages) =>
        prevImages.filter((_, i) => i !== index)
      );
    }
  };

  // Функция для отправки данных
  const onSubmit = async (data) => {
    const requestBody = {
      Title: data.Title,
      CategoryID: parseInt(selectedCategory),
      LocationLabel: data.LocationLabel,
      Longitude: data.Longitude,
      Latitude: data.Latitude,
      Description: data.Description,
      PeopleQuantity: parseInt(quantityPerson),
      RoomsQuantity: parseInt(quantityRooms),
      Price: parseInt(data.Price),
      DiscountPrice: parseInt(data.DiscountPrice),
      PriceDescription: data.PriceDescription,
      CheckInID: parseInt(selectedCheckIn),
      CheckOutID: parseInt(selectedCheckOut),
      Bedrooms: parseInt(data.Bedrooms),
      Beds: parseInt(data.Beds),
      Bathrooms: parseInt(data.Bathrooms),
      City: data.City,
      Country: data.Country,
      Facilities: selectedAmenities,
      Rules: selectedRules,
    };

    const isEditing = !!route?.params?.id; // Проверка на редактирование
    const method = isEditing ? "PATCH" : "POST"; // Определение метода
    const url = isEditing
      ? `${API_URL}/accommodation/update/${route.params.id}`
      : `${API_URL}/accommodation/create`; // Определение URL

    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      if (response.ok) {
        const imagesUploaded = await handleProfileUpdate(result.ID);
        setIsLoading(false);

        if (imagesUploaded) {
          navigation.navigate("Управление объектами");
          dispatch(fetchMyAccommodations(token));
        }
      } else {
        console.error("Server Error:", result);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
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
        <ActivityIndicator size="large" color="#4B5DFF" />
      </View>
    );
  }
  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
        flex: 1,
        paddingHorizontal: 10,
      }}
      contentContainerStyle={{
        paddingTop: 20,
        paddingBottom: Platform.OS === "ios" ? 40 : 20,
      }}
    >
      <SafeAreaWrapper>
        <View style={{ marginBottom: 40 }}>
          <View style={{ marginBottom: 20 }}>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              Загрузите фото
            </CustomText>
            <PickImage
              onImageSelected={handleImageSelected}
              renderPicker={({ pickImage }) => (
                <TouchableOpacity
                  onPress={() => pickImage()}
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#dee2f1",
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    borderRadius: 10,
                  }}
                >
                  <Ionicons
                    name="camera"
                    style={{ fontSize: 50, color: "#4B5DFF" }}
                  />
                  <View>
                    <CustomText style={{ fontSize: 16, textAlign: "center" }}>
                      {route?.params?.id ? "Изменить" : "Добавить"}
                    </CustomText>
                    <CustomText style={{ textAlign: "center", fontSize: 16 }}>
                      изображение
                    </CustomText>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          {selectedImages.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                columnGap: 20,
                rowGap: 15,
                marginBottom: 20,
              }}
            >
              {selectedImages.map((image, index) => {
                // Определите, является ли image объектом или строкой
                const imageUri =
                  typeof image === "string"
                    ? image
                    : typeof image.ImageUrl === "string"
                    ? `${API_URL}/${image.ImageUrl}`
                    : "";

                return (
                  <View key={index} style={{ position: "relative" }}>
                    {imageUri ? (
                      <Image
                        source={{ uri: imageUri }}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 10,
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 10,
                          backgroundColor: "#f0f0f0",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CustomText style={{ color: "#999" }}>
                          No Image
                        </CustomText>
                      </View>
                    )}
                    <TouchableOpacity
                      onPress={() => handleRemoveImage(index)}
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        borderRadius: 15,
                        padding: 5,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="close"
                        size={20}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}

          <View style={{ marginBottom: 20 }}>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              Название
            </CustomText>
            <View>
              <Controller
                control={control}
                name="Title"
                rules={{ required: "Это поле обязательно для заполнения" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      borderColor: errors.Title ? "red" : "#dee2f1",
                      color: "#1C2863",
                      fontSize: 14,
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    underlineColorAndroid="transparent"
                    placeholder="Коттедж с видом на берег"
                    placeholderTextColor="#616992"
                  />
                )}
              />
            </View>
            {errors.Title && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.Title.message}
              </CustomText>
            )}
          </View>
          <View style={{ marginBottom: 20 }}>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              Описание
            </CustomText>
            <View>
              <Controller
                control={control}
                name="Description"
                rules={{ required: "Это поле обязательно для заполнения" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      borderColor: errors.Description ? "red" : "#dee2f1",
                      color: "#1C2863",
                      fontSize: 14,
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    underlineColorAndroid="transparent"
                    placeholder="Описание коттеджа, вид на берег"
                    placeholderTextColor="#616992"
                    textAlignVertical="top"
                    numberOfLines={7}
                    multiline={true}
                  />
                )}
              />
            </View>
            {errors.Description && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.Description.message}
              </CustomText>
            )}
          </View>
          <View style={{ marginBottom: 20 }}>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              Адрес
            </CustomText>
            <View>
              <Controller
                control={control}
                name="LocationLabel"
                rules={{ required: "Это поле обязательно для заполнения" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      borderColor: errors.LocationLabel ? "red" : "#dee2f1",
                      color: "#1C2863",
                      fontSize: 14,
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    underlineColorAndroid="transparent"
                    placeholder="Ул. Чуй 122"
                    placeholderTextColor="#616992"
                  />
                )}
              />
            </View>
            {errors.LocationLabel && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.LocationLabel.message}
              </CustomText>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <View style={{ marginBottom: 20, flex: 1 }}>
              <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
                Местоположение (широта)
              </CustomText>
              <View>
                <Controller
                  control={control}
                  name="Latitude"
                  rules={{ required: "Это поле обязательно для заполнения" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{
                        borderWidth: 1,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        borderColor: errors.LocationLabel ? "red" : "#dee2f1",
                        color: "#1C2863",
                        fontSize: 14,
                      }}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      underlineColorAndroid="transparent"
                      placeholder="32.32423243"
                      placeholderTextColor="#616992"
                      keyboardType="numeric"
                    />
                  )}
                />
              </View>
              {errors.Latitude && (
                <CustomText style={{ color: "red", marginTop: 7 }}>
                  {errors.Latitude.message}
                </CustomText>
              )}
            </View>

            <View style={{ marginBottom: 20, flex: 1 }}>
              <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
                Местоположение (долгота)
              </CustomText>
              <View>
                <Controller
                  control={control}
                  name="Longitude"
                  rules={{ required: "Это поле обязательно для заполнения" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{
                        borderWidth: 1,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        borderColor: errors.Longitude ? "red" : "#dee2f1",
                        color: "#1C2863",
                        fontSize: 14,
                      }}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      underlineColorAndroid="transparent"
                      placeholder="32.32423243"
                      placeholderTextColor="#616992"
                      keyboardType="numeric"
                    />
                  )}
                />
              </View>
              {errors.Longitude && (
                <CustomText style={{ color: "red", marginTop: 7 }}>
                  {errors.Longitude.message}
                </CustomText>
              )}
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              Страна
            </CustomText>
            <View>
              <Controller
                control={control}
                name="Country"
                rules={{ required: "Это поле обязательно для заполнения" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      borderColor: errors.Country ? "red" : "#dee2f1",
                      color: "#1C2863",
                      fontSize: 14,
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    underlineColorAndroid="transparent"
                    placeholder="Кыргызстан"
                    placeholderTextColor="#616992"
                  />
                )}
              />
            </View>
            {errors.Country && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.Country.message}
              </CustomText>
            )}
          </View>

          <View style={{ marginBottom: 20 }}>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              Город
            </CustomText>
            <View>
              <Controller
                control={control}
                name="City"
                rules={{ required: "Это поле обязательно для заполнения" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      borderColor: errors.City ? "red" : "#dee2f1",
                      color: "#1C2863",
                      fontSize: 14,
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    underlineColorAndroid="transparent"
                    placeholder="Бишкек"
                    placeholderTextColor="#616992"
                  />
                )}
              />
            </View>
            {errors.City && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.City.message}
              </CustomText>
            )}
          </View>
          <View style={{ marginBottom: 20 }}>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              Цена
            </CustomText>
            <View>
              <Controller
                control={control}
                name="Price"
                rules={{ required: "Это поле обязательно для заполнения" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      borderColor: errors.Price ? "red" : "#dee2f1",
                      color: "#1C2863",
                      fontSize: 14,
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    underlineColorAndroid="transparent"
                    placeholder="10 000 сом"
                    placeholderTextColor="#616992"
                    keyboardType="numeric"
                  />
                )}
              />
            </View>
            {errors.Price && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.Price.message}
              </CustomText>
            )}
          </View>
          <View style={{ marginBottom: 20 }}>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              Цена со скидкой
            </CustomText>
            <View>
              <Controller
                control={control}
                name="DiscountPrice"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      borderColor: errors.DiscountPrice ? "red" : "#dee2f1",
                      color: "#1C2863",
                      fontSize: 14,
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    underlineColorAndroid="transparent"
                    placeholder="5000 сом"
                    placeholderTextColor="#616992"
                    keyboardType="numeric"
                  />
                )}
              />
            </View>
            {errors.DiscountPrice && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.DiscountPrice.message}
              </CustomText>
            )}
          </View>
          <View style={{ marginBottom: 20 }}>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              Описание цены
            </CustomText>
            <View>
              <Controller
                control={control}
                name="PriceDescription"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      borderColor: errors.PriceDescription ? "red" : "#dee2f1",
                      color: "#1C2863",
                      fontSize: 14,
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    underlineColorAndroid="transparent"
                    placeholder="Лучшая цена"
                    placeholderTextColor="#616992"
                  />
                )}
              />
            </View>
            {errors.PriceDescription && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.PriceDescription.message}
              </CustomText>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
              marginBottom: 20,
            }}
          >
            <View style={{ flex: 1 }}>
              <View>
                <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
                  Количество гостей
                </CustomText>
                <Controller
                  control={control}
                  name="PeopleQuantity"
                  rules={{ required: "Это поле обязательно для заполнения" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{
                        borderWidth: 1,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        borderColor: errors.PeopleQuantity ? "red" : "#dee2f1",
                        color: "#1C2863",
                        fontSize: 14,
                      }}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      underlineColorAndroid="transparent"
                      placeholder="Гости"
                      placeholderTextColor="#616992"
                      keyboardType="numeric"
                    />
                  )}
                />
              </View>
              {errors.PeopleQuantity && (
                <CustomText style={{ color: "red", marginTop: 7 }}>
                  {errors.PeopleQuantity.message}
                </CustomText>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <View>
                <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
                  Количество комнат
                </CustomText>
                <Controller
                  control={control}
                  name="RoomsQuantity"
                  rules={{ required: "Это поле обязательно для заполнения" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{
                        borderWidth: 1,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        borderColor: errors.RoomsQuantity ? "red" : "#dee2f1",
                        color: "#1C2863",
                        fontSize: 14,
                      }}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      underlineColorAndroid="transparent"
                      placeholder="Комнаты"
                      placeholderTextColor="#616992"
                      keyboardType="numeric"
                    />
                  )}
                />
              </View>
              {errors.RoomsQuantity && (
                <CustomText style={{ color: "red", marginTop: 7 }}>
                  {errors.RoomsQuantity.message}
                </CustomText>
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
              marginBottom: 20,
            }}
          >
            <View style={{ flex: 1 }}>
              <View>
                <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
                  Количество спальн
                </CustomText>
                <Controller
                  control={control}
                  name="Bedrooms"
                  rules={{ required: "Это поле обязательно для заполнения" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{
                        borderWidth: 1,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        borderColor: errors.Bedrooms ? "red" : "#dee2f1",
                        color: "#1C2863",
                        fontSize: 14,
                      }}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      underlineColorAndroid="transparent"
                      placeholder="Спальня"
                      placeholderTextColor="#616992"
                      keyboardType="numeric"
                    />
                  )}
                />
              </View>
              {errors.Bedrooms && (
                <CustomText style={{ color: "red", marginTop: 7 }}>
                  {errors.Bedrooms.message}
                </CustomText>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <View>
                <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
                  Количество ванных
                </CustomText>
                <Controller
                  control={control}
                  name="Bathrooms"
                  rules={{ required: "Это поле обязательно для заполнения" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{
                        borderWidth: 1,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        borderColor: errors.Bathrooms ? "red" : "#dee2f1",
                        color: "#1C2863",
                        fontSize: 14,
                      }}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      underlineColorAndroid="transparent"
                      placeholder="Комнаты"
                      placeholderTextColor="#616992"
                      keyboardType="numeric"
                    />
                  )}
                />
              </View>
              {errors.Bathrooms && (
                <CustomText style={{ color: "red", marginTop: 7 }}>
                  {errors.Bathrooms.message}
                </CustomText>
              )}
            </View>
          </View>
          <View style={{ flex: 1, marginBottom: 20 }}>
            <View>
              <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
                Количество кроватей
              </CustomText>
              <Controller
                control={control}
                name="Beds"
                rules={{ required: "Это поле обязательно для заполнения" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      borderColor: errors.Beds ? "red" : "#dee2f1",
                      color: "#1C2863",
                      fontSize: 14,
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    underlineColorAndroid="transparent"
                    placeholder="Кровати"
                    placeholderTextColor="#616992"
                    keyboardType="numeric"
                  />
                )}
              />
            </View>
            {errors.Beds && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.Beds.message}
              </CustomText>
            )}
          </View>
          <View style={{ marginBottom: 20 }}>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              Категории
            </CustomText>
            <TouchableOpacity
              onPress={() => openActionSheet("category")}
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#dee2f1",
                paddingVertical: 15,
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  columnGap: 5,
                }}
              >
                <CustomText style={{ fontSize: 16 }}>
                  {getCategoryNameById(selectedCategory, "Выбрать категории")}
                </CustomText>
                <Icon name={"chevron-right"} size={18} color={"#000"} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 20 }}>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              Удобства
            </CustomText>
            <TouchableOpacity
              onPress={() => openActionSheet("amenities")}
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#dee2f1",
                paddingVertical: 15,
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  columnGap: 5,
                }}
              >
                <CustomText style={{ fontSize: 16 }}>
                  {firstSelectedAmenity
                    ? firstSelectedAmenity.Value
                    : "Выбрать удобства"}
                </CustomText>
                <Icon name={"chevron-right"} size={18} color={"#000"} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 20 }}>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              Порядок проживания
            </CustomText>
            <TouchableOpacity
              onPress={() => openActionSheet("rules")}
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#dee2f1",
                paddingVertical: 15,
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  columnGap: 5,
                }}
              >
                <CustomText style={{ fontSize: 16 }}>
                  {firstSelectedRules
                    ? firstSelectedRules.Value
                    : "Выбрать порядок проживания"}
                </CustomText>
                <Icon name={"chevron-right"} size={18} color={"#000"} />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 20,
            }}
          >
            <View style={{ flex: 1 }}>
              <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
                Время въезда
              </CustomText>
              <TouchableOpacity
                onPress={() => openActionSheet("checkIn")}
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#dee2f1",
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    columnGap: 5,
                  }}
                >
                  <CustomText style={{ fontSize: 16 }}>
                    {getCheckInOutNameById(selectedCheckIn, "Время въезда")}
                  </CustomText>
                  <Icon name={"chevron-right"} size={18} color={"#000"} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
                Время выезда
              </CustomText>
              <TouchableOpacity
                onPress={() => openActionSheet("checkOut")}
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#dee2f1",
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    columnGap: 5,
                  }}
                >
                  <CustomText style={{ fontSize: 16 }}>
                    {getCheckInOutNameById(selectedCheckOut, "Время выезда")}
                  </CustomText>
                  <Icon name={"chevron-right"} size={18} color={"#000"} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" color={"#4B5DFF"} />
          ) : (
            <TouchableOpacity
              style={{
                padding: 15,
                borderRadius: 10,
                shadowColor: "#000",
                marginBottom: 30,
                backgroundColor: "#4B5DFF",
              }}
              onPress={handleSubmit(onSubmit)}
            >
              <CustomText
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Сохранить
              </CustomText>
            </TouchableOpacity>
          )}
        </View>
        <ActionLandlord
          actionSheetRef={actionSheetRef}
          currentType={currentType}
          setIsActionSheetVisible={setIsActionSheetVisible}
          amenitiesList={amenitiesList}
          selectedAmenities={selectedAmenities}
          rulesList={rulesList}
          selectedRules={selectedRules}
          categoryList={categoryList}
          selectedCategory={selectedCategory}
          checkInOutList={checkInOutList}
          selectedCheckIn={selectedCheckIn}
          selectedCheckOut={selectedCheckOut}
          categoryIcon={categoryIcon}
          toggleAmenity={toggleAmenity}
          toggleCategory={toggleCategory}
          toggleRule={toggleRule}
          toggleCheckIn={toggleCheckIn}
          toggleCheckOut={toggleCheckOut}
        />
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default Landlord;
