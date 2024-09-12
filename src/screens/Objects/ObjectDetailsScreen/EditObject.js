import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "../../../components/CustomText/CustomText";
import SafeAreaWrapper from "../../../components/SafeAreaWrapper/SafeAreaWrapper";
import ActionLandlord from "../../../components/ActionSheet/ActionLandlord/ActionLandlord";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/core";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";
import PickImage from "../../../components/PickImage/PickImage";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const categoryIcon = {
  1: require("../../../assets/home.png"),
  2: require("../../../assets/hotel.png"),
  3: require("../../../assets/apartment.png"),
};
const EditObject = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const route = useRoute();
  const token = useSelector((state) => state.auth.token);
  const navigation = useNavigation();
  const API_URL = process.env.API_URL;

  // action
  const actionSheetRef = useRef();
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);

  // list
  const [objectDetails, setObjectDetails] = useState(null);
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

  // person room
  const [quantityPerson, setQuantityPerson] = useState(1);
  const [quantityRooms, setQuantityRooms] = useState(1);

  // more
  const [currentType, setCurrentType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // action
  const openActionSheet = (type) => {
    setCurrentType(type);
    setIsActionSheetVisible(true);
  };

  useEffect(() => {
    const fetchObjectDetails = async () => {
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
          // setFacilities(data?.Accommodation.Facilities);
          // setRules(data?.Accommodation?.Rules);
          setSelectedImages(data?.Accommodation?.Images);
          // setCalendar(data?.Calendar);
          setIsLoading(false);
        } else {
          console.error("Ошибка при получении данных:", response.status);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Ошибка при отправке запроса:", error);
        setIsLoading(false);
      }
    };

    fetchObjectDetails();
  }, [route.params?.id]);
  
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

  // fetch
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

  const getNameById = (id, defaultText) => {
    const item = checkInOutList.find((checkInOut) => checkInOut.ID === id);
    return item ? item.Name : defaultText;
  };
  // person and room quantity
  const increaseQuantityPerson = () => {
    setQuantityPerson(quantityPerson + 1);
  };

  const decreaseQuantityPerson = () => {
    if (quantityPerson > 1) {
      setQuantityPerson(quantityPerson - 1);
    }
  };

  const increaseQuantityRooms = () => {
    setQuantityRooms(quantityRooms + 1);
  };

  const decreaseQuantityRooms = () => {
    if (quantityRooms > 1) {
      setQuantityRooms(quantityRooms - 1);
    }
  };

  // select images

  const handleImageSelected = (imageUri) => {
    setSelectedImages([...selectedImages, imageUri]);
  };

  // Функция для обновления профиля
  const handleProfileUpdate = async (id) => {
    try {
      for (let imageUri of selectedImages) {
        const formData = new FormData();

        formData.append("image", {
          uri: imageUri,
          name: "image.jpg",
          type: "image/jpeg",
        });

        const response = await fetch(
          `${API_URL}/image/create-accommodation-image/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

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
  const handleRemoveImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
  };
  // Функция для отправки данных
  const onSubmit = async (data) => {
    try {
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

      setIsLoading(true);
      const response = await fetch(
        `${API_URL}/accommodation/update/${route?.params?.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

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

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 10,
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
                      Изменить
                    </CustomText>
                    <CustomText style={{ textAlign: "center", fontSize: 16 }}>
                      изображение
                    </CustomText>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          {selectedImages && selectedImages.length > 0 && (
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
              {selectedImages.map((ImageUri, index) => (
                <View key={index} style={{ position: "relative" }}>
                  <Image
                    source={{ uri: `${API_URL}/${ImageUri}` }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                    }}
                  />
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
              ))}
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
              Бишкек
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
                  Выбрать категории
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
                  Выбрать удобства
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
                  Выбрать порядок
                </CustomText>
                <Icon name={"chevron-right"} size={18} color={"#000"} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 20 }}>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              Гости
            </CustomText>
            <TouchableOpacity
              onPress={() => openActionSheet("person")}
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
                  Количество гостей и комнат
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
                    {getNameById(selectedCheckIn, "Время въезда")}
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
                    {getNameById(selectedCheckOut, "Время выезда")}
                  </CustomText>
                  <Icon name={"chevron-right"} size={18} color={"#000"} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <CustomText
            style={{ marginBottom: 15, fontWeight: 500, fontSize: 16 }}
          >
            Название
          </CustomText>
          <Controller
            control={control}
            name="Title"
            rules={{ required: "Title is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.Title ? "red" : "#dee2f1",
                  },
                ]}
                placeholder="Title"
                placeholderTextColor="#616992"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                defaultValue={objectDetails?.Title}
              />
            )}
          />
          {errors.Title && (
            <Text style={styles.errorText}>{errors.Title.message}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <CustomText
            style={{ marginBottom: 15, fontWeight: 500, fontSize: 16 }}
          >
            Категория
          </CustomText>
          <Controller
            control={control}
            name="CategoryID"
            rules={{ required: "CategoryID is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.CategoryID ? "red" : "#dee2f1",
                  },
                ]}
                placeholder="Category ID"
                placeholderTextColor="#616992"
                onBlur={onBlur}
                onChangeText={(text) => onChange(parseInt(text))}
                value={value ? value.toString() : ""}
                keyboardType="numeric"
              />
            )}
          />
          {errors.CategoryID && (
            <Text style={styles.errorText}>{errors.CategoryID.message}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <CustomText
            style={{ marginBottom: 15, fontWeight: 500, fontSize: 16 }}
          >
            Адрес
          </CustomText>
          <Controller
            control={control}
            name="LocationLabel"
            rules={{ required: "LocationLabel is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.LocationLabel ? "red" : "#dee2f1",
                  },
                ]}
                placeholder="LocationLabel"
                placeholderTextColor="#616992"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                defaultValue={objectDetails?.LocationLabel}
              />
            )}
          />
          {errors.LocationLabel && (
            <Text style={styles.errorText}>{errors.LocationLabel.message}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <CustomText
            style={{ marginBottom: 15, fontWeight: 500, fontSize: 16 }}
          >
            Ширина
          </CustomText>
          <Controller
            control={control}
            name="Latitude"
            rules={{ required: "Latitude is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.Latitude ? "red" : "#dee2f1",
                  },
                ]}
                placeholder="23.32433"
                keyboardType="numeric"
                placeholderTextColor="#616992"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                defaultValue={objectDetails?.Latitude}
              />
            )}
          />
          {errors.Latitude && (
            <Text style={styles.errorText}>{errors.Latitude.message}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <CustomText
            style={{ marginBottom: 15, fontWeight: 500, fontSize: 16 }}
          >
            Долгота
          </CustomText>
          <Controller
            control={control}
            name="Longitude"
            rules={{ required: "Longitude is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.Longitude ? "red" : "#dee2f1",
                  },
                ]}
                placeholder="24.32433"
                keyboardType="numeric"
                placeholderTextColor="#616992"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                defaultValue={objectDetails?.Longitude}
              />
            )}
          />
          {errors.Longitude && (
            <Text style={styles.errorText}>{errors.Longitude.message}</Text>
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
        <View style={styles.inputContainer}>
          <CustomText
            style={{ marginBottom: 15, fontWeight: 500, fontSize: 16 }}
          >
            Описание
          </CustomText>
          <Controller
            control={control}
            name="Description"
            rules={{ required: "Description is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.Description ? "red" : "#dee2f1",
                  },
                ]}
                placeholder="Очень приятный сервис"
                placeholderTextColor="#616992"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                defaultValue={objectDetails?.Description}
              />
            )}
          />
          {errors.Description && (
            <Text style={styles.errorText}>{errors.Description.message}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <CustomText
            style={{ marginBottom: 15, fontWeight: 500, fontSize: 16 }}
          >
            Цена
          </CustomText>
          <Controller
            control={control}
            name="Price"
            rules={{ required: "Price is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.Price ? "red" : "#dee2f1",
                  },
                ]}
                placeholder="10 000"
                keyboardType="numeric"
                placeholderTextColor="#616992"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                defaultValue={objectDetails?.Price}
              />
            )}
          />
          {errors.Price && (
            <Text style={styles.errorText}>{errors.Price.message}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <CustomText
            style={{ marginBottom: 15, fontWeight: 500, fontSize: 16 }}
          >
            Цена со скидкой
          </CustomText>
          <Controller
            control={control}
            name="DiscountPrice"
            rules={{ required: "DiscountPrice is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.DiscountPrice ? "red" : "#dee2f1",
                  },
                ]}
                placeholder="5000"
                keyboardType="numeric"
                placeholderTextColor="#616992"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                defaultValue={objectDetails?.DiscountPrice}
              />
            )}
          />
          {errors.DiscountPrice && (
            <Text style={styles.errorText}>{errors.DiscountPrice.message}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <CustomText
            style={{ marginBottom: 15, fontWeight: 500, fontSize: 16 }}
          >
            Описание скидки
          </CustomText>
          <Controller
            control={control}
            name="PriceDescription"
            rules={{ required: "PriceDescription is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.PriceDescription ? "red" : "#dee2f1",
                  },
                ]}
                placeholder="Описание скидки"
                placeholderTextColor="#616992"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                defaultValue={objectDetails?.PriceDescription}
              />
            )}
          />
          {errors.PriceDescription && (
            <Text style={styles.errorText}>
              {errors.PriceDescription.message}
            </Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <CustomText
            style={{ marginBottom: 15, fontWeight: 500, fontSize: 16 }}
          >
            Страна
          </CustomText>
          <Controller
            control={control}
            name="Country"
            rules={{ required: "Country is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.Country ? "red" : "#dee2f1",
                  },
                ]}
                placeholder="Кыргызстан"
                placeholderTextColor="#616992"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                defaultValue={objectDetails?.Country}
              />
            )}
          />
          {errors.Country && (
            <Text style={styles.errorText}>{errors.Country.message}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <CustomText
            style={{ marginBottom: 15, fontWeight: 500, fontSize: 16 }}
          >
            Город
          </CustomText>
          <Controller
            control={control}
            name="City"
            rules={{ required: "City is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.City ? "red" : "#dee2f1",
                  },
                ]}
                placeholder="Бишкек"
                placeholderTextColor="#616992"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                defaultValue={objectDetails?.City}
              />
            )}
          />
          {errors.City && (
            <Text style={styles.errorText}>{errors.City.message}</Text>
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
                Выбрать категории
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
              <CustomText style={{ fontSize: 16 }}>Выбрать удобства</CustomText>
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
              <CustomText style={{ fontSize: 16 }}>Выбрать порядок</CustomText>
              <Icon name={"chevron-right"} size={18} color={"#000"} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 20 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
            Гости
          </CustomText>
          <TouchableOpacity
            onPress={() => openActionSheet("person")}
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
                Количество гостей и комнат
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
            marginBottom: 40,
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
                  {getNameById(selectedCheckIn, "Время въезда")}
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
                  {getNameById(selectedCheckOut, "Время выезда")}
                </CustomText>
                <Icon name={"chevron-right"} size={18} color={"#000"} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
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
          decreaseQuantityPerson={decreaseQuantityPerson}
          quantityPerson={quantityPerson}
          increaseQuantityPerson={increaseQuantityPerson}
          categoryIcon={categoryIcon}
          toggleAmenity={toggleAmenity}
          toggleCategory={toggleCategory}
          toggleRule={toggleRule}
          toggleCheckIn={toggleCheckIn}
          toggleCheckOut={toggleCheckOut}
          decreaseQuantityRooms={decreaseQuantityRooms}
          increaseQuantityRooms={increaseQuantityRooms}
          quantityRooms={quantityRooms}
        />
      </SafeAreaWrapper>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: "#dee2f1",
    color: "#1C2863",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: "#1C2863",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditObject;
