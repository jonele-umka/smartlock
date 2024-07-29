import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { CheckBox } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";

import { LinearGradient } from "expo-linear-gradient";
import ActionSheet from "react-native-actions-sheet";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import Person from "../../../components/Person/Person";

const amenitiesIcon = {
  1: require("../../../assets/Сonvenience/wifi.png"),
  2: require("../../../assets/Сonvenience/parking.png"),
  3: require("../../../assets/Сonvenience/laundry.png"),
  4: require("../../../assets/Сonvenience/coffee.png"),
  5: require("../../../assets/Сonvenience/pool.png"),
  6: require("../../../assets/Сonvenience/gym.png"),
  7: require("../../../assets/Сonvenience/restaurant.png"),
  8: require("../../../assets/Сonvenience/bar.png"),
  9: require("../../../assets/Сonvenience/show.png"),
  10: require("../../../assets/Сonvenience/conditioner.png"),
  11: require("../../../assets/Сonvenience/tv.png"),
  12: require("../../../assets/Сonvenience/spa.png"),
};
const categoryIcon = {
  1: require("../../../assets/home.png"),
  2: require("../../../assets/hotel.png"),
  3: require("../../../assets/apartment.png"),
};
const images = [
  {
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFFDHQEEYtYDfx8XY1qLvevNoLHimPDELISw&usqp=CAU",
  },
  {
    uri: "https://img.freepik.com/premium-photo/beautiful-mountain-lake-generative-ai_438099-11773.jpg",
  },
  {
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsSih7MnL2maMIfYyVCkMcA-t-By2bNe3sHvHsbKZEPQlhuyUpVmcrOid1SNyukV8e8Zw&usqp=CAU",
  },
];

const Landlord = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;
  const token = useSelector((state) => state.auth.token);
  const navigation = useNavigation();
  const API_URL = process.env.API_URL;
  const actionSheetRef = useRef();
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [rulesList, setRulesList] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentType, setCurrentType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quantityPerson, setQuantityPerson] = useState(1);
  const [quantityRooms, setQuantityRooms] = useState(1);

  useEffect(() => {
    fetchAmenities();
    fetchRules();
    fetchCategory();
  }, []);
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
    }
  }, [currentType]);

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

  const openActionSheet = (type) => {
    setCurrentType(type);
    setIsActionSheetVisible(true);
  };

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
    if (quantityRooms > 0) {
      setQuantityRooms(quantityRooms - 1);
    }
  };
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
      Facilities: selectedAmenities,
      Rules: selectedRules,
    };
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/accommodation/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      if (!response.ok) {
        setIsLoading(false);

        const responseDataError = await response.json();
        const errorMessage =
          responseDataError.error.Error || "Произошла ошибка";
        console.error("Error updating user profile:", errorMessage);
        return;
      }

      console.log('dfefkvvdnvbjvkjgfsffffisfkidfdsfjdkks  ` q fsf sfeds')
      const result = await response.json();
      navigation.navigate("Управление объектами");
      console.log(result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.error("Error updating user profile", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
        flex: 1,
        paddingHorizontal: 10,
      }}
      contentContainerStyle={{ paddingVertical: 20 }}
    >
      <SafeAreaWrapper style={{ paddingBottom: 50 }}>
        <View style={{ marginBottom: 30 }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>
              Загрузите фото
            </Text>

            <TouchableOpacity
              style={{
                flexDirection: "column",
                alignItems: "center",
                columnGap: 10,
                backgroundColor: "#f0f0f0",
                paddingVertical: 15,
                paddingHorizontal: 15,
                borderRadius: 10,
              }}
            >
              <Ionicons name="camera" style={{ fontSize: 50 }} />
              <View>
                <Text style={{ fontSize: 16, textAlign: "center" }}>
                  Добавить
                </Text>
                <Text style={{ fontSize: 16, textAlign: "center" }}>
                  изображение
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              columnGap: 10,
              rowGap: 5,
              marginBottom: 20,
            }}
          >
            {images.map((item, index) => (
              <View key={index}>
                <Image
                  source={{ uri: item.uri }}
                  style={{ width: 60, height: 60 }}
                />
              </View>
            ))}
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>Название</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#b8b8b8",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <Controller
                control={control}
                name="Title"
                rules={{ required: "Это поле обязательно для заполнения" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{ fontSize: 16, padding: 5 }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    underlineColorAndroid="transparent"
                    placeholder="Коттедж с видом на берег"
                    placeholderTextColor="grey"
                  />
                )}
              />
            </View>
            {errors.Title && (
              <Text style={{ color: "red", marginTop: 7 }}>
                {errors.Title.message}
              </Text>
            )}
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>Описание</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#b8b8b8",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <Controller
                control={control}
                name="Description"
                rules={{ required: "Это поле обязательно для заполнения" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 5,
                      fontSize: 16,
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    underlineColorAndroid="transparent"
                    placeholder="Описание коттеджа, вид на берег"
                    placeholderTextColor="grey"
                    textAlignVertical="top"
                    numberOfLines={7}
                    multiline={true}
                  />
                )}
              />
            </View>
            {errors.Description && (
              <Text style={{ color: "red", marginTop: 7 }}>
                {errors.Description.message}
              </Text>
            )}
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>Адрес</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#b8b8b8",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <Controller
                control={control}
                name="LocationLabel"
                rules={{ required: "Это поле обязательно для заполнения" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{ fontSize: 16, padding: 5 }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    underlineColorAndroid="transparent"
                    placeholder="Ул. Чуй 122"
                    placeholderTextColor="grey"
                  />
                )}
              />
            </View>
            {errors.LocationLabel && (
              <Text style={{ color: "red", marginTop: 7 }}>
                {errors.LocationLabel.message}
              </Text>
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
              <Text style={{ marginBottom: 10, fontSize: 18 }}>
                Местоположение (широта)
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#b8b8b8",
                  padding: 5,
                  borderRadius: 10,
                }}
              >
                <Controller
                  control={control}
                  name="Latitude"
                  rules={{ required: "Это поле обязательно для заполнения" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{ fontSize: 16, padding: 5 }}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      underlineColorAndroid="transparent"
                      placeholder="32423243"
                      placeholderTextColor="grey"
                      keyboardType="numeric"
                    />
                  )}
                />
              </View>
              {errors.Latitude && (
                <Text style={{ color: "red", marginTop: 7 }}>
                  {errors.Latitude.message}
                </Text>
              )}
            </View>

            <View style={{ marginBottom: 20, flex: 1 }}>
              <Text style={{ marginBottom: 10, fontSize: 18 }}>
                Местоположение (долгота)
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#b8b8b8",
                  padding: 5,
                  borderRadius: 10,
                }}
              >
                <Controller
                  control={control}
                  name="Longitude"
                  rules={{ required: "Это поле обязательно для заполнения" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{ fontSize: 16, padding: 5 }}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      underlineColorAndroid="transparent"
                      placeholder="32423243"
                      placeholderTextColor="grey"
                      keyboardType="numeric"
                    />
                  )}
                />
              </View>
              {errors.Longitude && (
                <Text style={{ color: "red", marginTop: 7 }}>
                  {errors.Longitude.message}
                </Text>
              )}
            </View>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>Цена</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#b8b8b8",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <Controller
                control={control}
                name="Price"
                rules={{ required: "Это поле обязательно для заполнения" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{ fontSize: 16, padding: 5 }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    underlineColorAndroid="transparent"
                    placeholder="10 000 сом"
                    placeholderTextColor="grey"
                    keyboardType="numeric"
                  />
                )}
              />
            </View>
            {errors.Price && (
              <Text style={{ color: "red", marginTop: 7 }}>
                {errors.Price.message}
              </Text>
            )}
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>
              Цена со скидкой
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#b8b8b8",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <Controller
                control={control}
                name="DiscountPrice"
                rules={{ required: "Это поле обязательно для заполнения" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{ fontSize: 16, padding: 5 }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    underlineColorAndroid="transparent"
                    placeholder="5000 сом"
                    placeholderTextColor="grey"
                    keyboardType="numeric"
                  />
                )}
              />
            </View>
            {errors.DiscountPrice && (
              <Text style={{ color: "red", marginTop: 7 }}>
                {errors.DiscountPrice.message}
              </Text>
            )}
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>
              Описание цены
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#b8b8b8",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <Controller
                control={control}
                name="PriceDescription"
                rules={{ required: "Это поле обязательно для заполнения" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{ fontSize: 16, padding: 5 }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    underlineColorAndroid="transparent"
                    placeholder="Лучшая цена"
                    placeholderTextColor="grey"
                  />
                )}
              />
            </View>
            {errors.PriceDescription && (
              <Text style={{ color: "red", marginTop: 7 }}>
                {errors.PriceDescription.message}
              </Text>
            )}
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>Категории</Text>
            <TouchableOpacity
              onPress={() => openActionSheet("category")}
              style={{
                borderRadius: 10,
                backgroundColor: "#f0f0f0",
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
                <Text style={{ fontSize: 16 }}>Выбрать категории</Text>
                <Icon name={"chevron-right"} size={18} color={"#000"} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>Удобства</Text>
            <TouchableOpacity
              onPress={() => openActionSheet("amenities")}
              style={{
                borderRadius: 10,
                backgroundColor: "#f0f0f0",
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
                <Text style={{ fontSize: 16 }}>Выбрать удобства</Text>
                <Icon name={"chevron-right"} size={18} color={"#000"} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>
              Порядок проживания
            </Text>
            <TouchableOpacity
              onPress={() => openActionSheet("rules")}
              style={{
                borderRadius: 10,
                backgroundColor: "#f0f0f0",
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
                <Text style={{ fontSize: 16 }}>Выбрать порядок</Text>
                <Icon name={"chevron-right"} size={18} color={"#000"} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>Гости</Text>
            <TouchableOpacity
              onPress={() => openActionSheet("person")}
              style={{
                borderRadius: 10,
                backgroundColor: "#f0f0f0",
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
                <Text style={{ fontSize: 16 }}>Количество гостей и комнат</Text>
                <Icon name={"chevron-right"} size={18} color={"#000"} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" color={"#000"} />
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
              }}
            >
              <LinearGradient
                colors={["#02AAB0", "#00CDAC"]}
                style={{
                  paddingVertical: 15,
                  textAlign: "center",
                  borderRadius: 10,
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  Сохранить
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
        {/* <Modal animationType="fade" transparent={true} visible={modalQuests}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                width: "95%",
                backgroundColor: "#fff",
                borderRadius: 20,
                padding: 20,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                flex: 0.5,
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
                <Text style={{ fontSize: 18 }}>Удобства</Text>
                <TouchableOpacity onPress={handleQuests}>
                  <Entypo name={"cross"} size={25} color={"#000"} />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ flex: 1 }}>
                {amenitiesList.map((amenity) => (
                  <View
                    key={amenity.ID}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 10,
                      marginBottom: 10,
                    }}
                  >
                    <CheckBox
                      checked={selectedAmenities.includes(amenity)}
                      onPress={() => {
                        toggleAmenity(amenity);
                      }}
                      iconType="material-community"
                      checkedIcon="checkbox-marked"
                      uncheckedIcon="checkbox-blank-outline"
                      size={30}
                      checkedColor="#02AAB0"
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
                      <Image
                        source={amenitiesIcon[amenity.ID]}
                        style={{ width: 30, height: 30 }}
                      />
                      <Text>{amenity.Value}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity
                onPress={handleQuests}
                style={{
                  elevation: 5,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  marginTop: 30,
                }}
              >
                <LinearGradient
                  colors={["#02AAB0", "#00CDAC"]}
                  style={{
                    paddingVertical: 15,
                    textAlign: "center",
                    borderRadius: 10,
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontSize: 20,
                    }}
                  >
                    Сохранить
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}
        <ActionSheet
          ref={actionSheetRef}
          onClose={() => setIsActionSheetVisible(false)}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 20 }}>
              {currentType === "amenities" && "Удобства"}
              {currentType === "rules" && "Порядок проживания"}
              {currentType === "category" && "Категории"}
              {currentType === "person" && "Гости и комнаты"}
            </Text>
            <ScrollView>
              {currentType === "amenities" &&
                amenitiesList.map((amenity) => (
                  <View
                    key={amenity.ID}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 10,
                      marginBottom: 10,
                    }}
                  >
                    <CheckBox
                      checked={selectedAmenities.includes(amenity.ID)}
                      onPress={() => {
                        toggleAmenity(amenity.ID);
                      }}
                      iconType="material-community"
                      checkedIcon="checkbox-marked"
                      uncheckedIcon="checkbox-blank-outline"
                      size={30}
                      checkedColor="#02AAB0"
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
                      <Image
                        source={{ uri: amenity.Icon }}
                        style={{ width: 30, height: 30 }}
                      />
                      <Text>{amenity.Value}</Text>
                    </View>
                  </View>
                ))}
              {currentType === "rules" &&
                rulesList.map((rule) => (
                  <View
                    key={rule.ID}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 10,
                      marginBottom: 10,
                    }}
                  >
                    <CheckBox
                      checked={selectedRules.includes(rule.ID)}
                      onPress={() => {
                        toggleRule(rule.ID);
                      }}
                      iconType="material-community"
                      checkedIcon="checkbox-marked"
                      uncheckedIcon="checkbox-blank-outline"
                      size={30}
                      checkedColor="#02AAB0"
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
                      <Image
                        source={{ uri: rule.Icon }}
                        style={{ width: 30, height: 30 }}
                      />
                      <Text>{rule.Value}</Text>
                    </View>
                  </View>
                ))}
              {currentType === "category" &&
                categoryList.map((category) => (
                  <TouchableOpacity
                    key={category.ID}
                    onPress={() => {
                      toggleCategory(category.ID);
                      setIsActionSheetVisible(false);
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      marginBottom: 10,
                      backgroundColor:
                        selectedCategory === category.ID ? "#f0f0f0" : "#fff",
                      paddingVertical: 15,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor:
                        selectedCategory === category.ID
                          ? "#02AAB0"
                          : "#f0f0f0",
                    }}
                  >
                    <Image
                      source={categoryIcon[category.ID]}
                      style={{ width: 30, height: 30 }}
                    />
                    <Text style={{ marginLeft: 8 }}>{category.Name}</Text>
                  </TouchableOpacity>
                ))}
              {currentType === "person" && (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      columnGap: 100,
                      marginBottom: 30,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontWeight: 600,
                          fontSize: 18,
                          marginBottom: 3,
                        }}
                      >
                        Гости
                      </Text>
                      <Text style={{ color: "#b8b8b8" }}>От 18 лет</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={decreaseQuantityPerson}
                        style={{
                          backgroundColor: "#02AAB0",
                          borderRadius: 8,
                          paddingHorizontal: 15,
                          paddingVertical: 8,
                        }}
                      >
                        <Text style={{ color: "#fff", fontSize: 18 }}>-</Text>
                      </TouchableOpacity>

                      <View>
                        <Text style={{ fontSize: 20 }}>{quantityPerson}</Text>
                      </View>

                      <TouchableOpacity
                        onPress={increaseQuantityPerson}
                        style={{
                          backgroundColor: "#02AAB0",
                          borderRadius: 8,
                          paddingHorizontal: 15,
                          paddingVertical: 8,
                        }}
                      >
                        <Text style={{ color: "#fff", fontSize: 18 }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      columnGap: 50,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontWeight: 600,
                          fontSize: 18,
                          marginBottom: 3,
                        }}
                      >
                        Комнаты
                      </Text>
                      <Text style={{ color: "#b8b8b8" }}>1-х комн</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={decreaseQuantityRooms}
                        style={{
                          backgroundColor: "#02AAB0",
                          borderRadius: 8,
                          paddingHorizontal: 15,
                          paddingVertical: 8,
                        }}
                      >
                        <Text style={{ color: "#fff", fontSize: 18 }}>-</Text>
                      </TouchableOpacity>

                      <View>
                        <Text style={{ fontSize: 20 }}>{quantityRooms}</Text>
                      </View>

                      <TouchableOpacity
                        onPress={increaseQuantityRooms}
                        style={{
                          backgroundColor: "#02AAB0",
                          borderRadius: 8,
                          paddingHorizontal: 15,
                          paddingVertical: 8,
                        }}
                      >
                        <Text style={{ color: "#fff", fontSize: 18 }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </ScrollView>
            {/* {isLoading ? (
              <ActivityIndicator
                size="large"
                style={{ marginTop: 40, marginBottom: 30 }}
                color={"#000"}
              />
            ) : (
              <TouchableOpacity
                onPress={() => setIsActionSheetVisible(false)}
                style={{
                  elevation: 5,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  marginTop: 20,
                }}
              >
                <LinearGradient
                  colors={["#02AAB0", "#00CDAC"]}
                  style={{
                    paddingVertical: 15,
                    textAlign: "center",
                    borderRadius: 10,
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontSize: 20,
                    }}
                  >
                    Сохранить
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )} */}
          </View>
        </ActionSheet>
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default Landlord;
