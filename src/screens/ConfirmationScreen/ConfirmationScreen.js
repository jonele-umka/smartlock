import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import MapAddress from "../../components/Map/MapAddress";
import { Rating, AirbnbRating } from "@rneui/base";
import Calendar from "../../components/Calendar/Calendar";
import Person from "../../components/Person/Person";
import CarouselImage from "../../components/CarouselImage/CarouselImage";
import Reviews from "../../components/List/ListReviews/Reviews";
import { useNavigation } from "@react-navigation/native";
import Questions from "../../components/List/ListQuestions/Questions";
import QuestionsInput from "../../components/Questions/QuestionsInput";
import ReviewsInput from "../../components/ReviewsInput/ReviewsInput";
import BottomSheet from "@gorhom/bottom-sheet";
import ActionSheet from "react-native-actions-sheet";
import ImageView from "react-native-image-viewing";
import { useForm, Controller } from "react-hook-form";
import { LinearGradient } from "expo-linear-gradient";
const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const reviewsData = [
    {
      name: "User 1",
      date: "01.01.2024",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      imageUri:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    },
    {
      name: "User 2",
      date: "01.01.2024",
      text: "Lorem Ipsum",
      imageUri:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    },
    {
      name: "User 3",
      date: "01.01.2024",
      text: "industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1600s.fefsfesfe fesfsefs efsefsef sfefesfsef esfesfs efsefe sfesfesfesfsefesf rfesfsfesfesfsffsefesfesfesfesffesf",
      imageUri:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    },
  ];
  const images = [
    {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFFDHQEEYtYDfx8XY1qLvevNoLHimPDELISw&usqp=CAU",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFFDHQEEYtYDfx8XY1qLvevNoLHimPDELISw&usqp=CAU",
    },
    {
      uri: "https://img.freepik.com/premium-photo/beautiful-mountain-lake-generative-ai_438099-11773.jpg",
    },
    {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsSih7MnL2maMIfYyVCkMcA-t-By2bNe3sHvHsbKZEPQlhuyUpVmcrOid1SNyukV8e8Zw&usqp=CAU",
    },
  ];
  const [favoritesClick, setFavoritesClick] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const handleFavorites = () => {
    setFavoritesClick(!favoritesClick);
  };

  const toggleDescription = () => {
    setDescriptionExpanded(!descriptionExpanded);
  };
  const renderDescription = () => {
    const descriptionText =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

    if (!descriptionExpanded) {
      const words = descriptionText.split(" ");
      const shortenedDescription = words.slice(0, 20).join(" ");
      return <Text>{shortenedDescription}...</Text>;
    } else {
      return <Text>{descriptionText}</Text>;
    }
  };

  const [expandedReviewIndex, setExpandedReviewIndex] = useState(null);
  const [expandedReviewText, setExpandedReviewText] = useState("");
  const [visible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const toggleDescriptionReviews = (index, text) => {
    setExpandedReviewIndex(index);
    setExpandedReviewText(text);
    actionSheetRef.current?.show();
  };
  const actionSheetRef = useRef(null);

  return (
    <View style={{ paddingBottom: 20, backgroundColor: "#fff" }}>
      <ScrollView style={{ backgroundColor: "#fff" }}>
        {/* <View style={{ position: "relative" }}>
          <CarouselImage />
          <View style={{ position: "absolute", right: 10, top: 5 }}>
            {favoritesClick ? (
              <TouchableOpacity onPress={handleFavorites}>
                <Ionicons
                  name="heart"
                  style={{ color: "#fff", fontSize: 40 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleFavorites}>
                <Ionicons
                  name="heart-outline"
                  style={{ color: "#fff", fontSize: 40 }}
                />
              </TouchableOpacity>
            )}
          </View>
        </View> */}

        <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 700, marginBottom: 5 }}>
            OLOLO HOTEL BISHKEK
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 5,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 2,
              }}
            >
              <Fontisto
                name="star"
                style={{ fontSize: 20, color: "#edce00" }}
              />
              <Fontisto
                name="star"
                style={{ fontSize: 20, color: "#edce00" }}
              />
              <Fontisto
                name="star"
                style={{ fontSize: 20, color: "#edce00" }}
              />
              <Fontisto
                name="star"
                style={{ fontSize: 20, color: "#edce00" }}
              />
              <Fontisto
                name="star"
                style={{ fontSize: 20, color: "#edce00" }}
              />
            </View>

            <Text style={{ fontSize: 14, color: "#b8b8b8" }}>Отлично</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              columnGap: 20,
              marginBottom: 20,
            }}
          >
            {images.map((image, imgIndex) => (
              <TouchableOpacity
                key={imgIndex}
                onPress={() => {
                  setIsVisible(true);
                  setSelectedImageIndex(imgIndex);
                }}
              >
                <Image
                  source={{ uri: image.uri }}
                  style={{ width: 70, height: 70 }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <ImageView
            images={images.map((image) => ({
              uri: image.uri,
            }))}
            imageIndex={selectedImageIndex}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: 600, marginBottom: 15 }}>
              Местоположение
            </Text>
            <MapAddress />
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 5,
                  marginTop: 15,
                }}
              >
                <Fontisto
                  name="map-marker-alt"
                  style={{ color: "#000", fontSize: 16 }}
                />
                <Text style={{ fontSize: 16 }}>Бишкек ул.Ахунбаева 165</Text>
              </View>
            </View>
          </View>
          {/* <View
            style={{
              flexDirection: "row",
              columnGap: 10,
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "#f0f0f0",
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 5,
              }}
            >
              <View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 5,
                  }}
                  onPress={() => navigation.navigate("Все условия")}
                >
                  <Text style={{ fontSize: 16 }}>Все условия</Text>
                  <Fontisto
                    name="angle-right"
                    style={{ color: "#000", fontSize: 14 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View> */}

          <View style={{ marginTop: 40 }}>
            <Text style={{ fontSize: 22, fontWeight: 600, marginBottom: 15 }}>
              Детали бронирования
            </Text>

            <View
              style={{
                flexDirection: "column",
                rowGap: 10,
                backgroundColor: "#f0f0f0",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: 500 }}>Заезд</Text>
                <View>
                  <Text>20.02.2024</Text>
                  <Text style={{ textAlign: "right" }}>Чт в 10:00</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: 500 }}>Выезд</Text>
                <View>
                  <Text>20.02.2024</Text>
                  <Text style={{ textAlign: "right" }}>Чт в 10:00</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: 500 }}>
                  Ночи и комнаты
                </Text>
                <View>
                  <Text style={{ textAlign: "right" }}>1 ночь</Text>
                  <Text>1 комната</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 40 }}>
            <Text style={{ fontSize: 22, fontWeight: 600, marginBottom: 15 }}>
              Ваши данные
            </Text>
            <View style={{ flexDirection: "column", rowGap: 20 }}>
              <View>
                <TextInput
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingHorizontal: 5,
                    backgroundColor: "#f0f0f0",
                    borderRadius: 10,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="Имя"
                  placeholderTextColor="grey"
                  multiline={true}
                />
              </View>
              <View>
                <TextInput
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingHorizontal: 5,
                    backgroundColor: "#f0f0f0",
                    borderRadius: 10,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="Фамилия"
                  placeholderTextColor="grey"
                  multiline={true}
                />
              </View>
              <View>
                <TextInput
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingHorizontal: 5,
                    backgroundColor: "#f0f0f0",
                    borderRadius: 10,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="Номер телефона"
                  placeholderTextColor="grey"
                  multiline={true}
                />
              </View>
              <View>
                <TextInput
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingHorizontal: 5,
                    backgroundColor: "#f0f0f0",
                    borderRadius: 10,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="Электронная почта"
                  placeholderTextColor="grey"
                  multiline={true}
                />
              </View>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Добавить карту")}
            >
              <Text
                style={{
                  color: "#005fb8",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                Добавить карту
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 40 }}>
            <Text style={{ fontSize: 22, fontWeight: 600, marginBottom: 15 }}>
              Комментарий для отеля
            </Text>
            <TextInput
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                paddingHorizontal: 5,
                backgroundColor: "#f0f0f0",
                borderRadius: 10,
              }}
              underlineColorAndroid="transparent"
              placeholder="Напишите свои пожелания"
              placeholderTextColor="grey"
              textAlignVertical="top"
              numberOfLines={Platform.OS === "ios" ? null : 5}
              minHeight={Platform.OS === "ios" && 5 ? 20 * 5 : null}
              multiline={true}
            />
          </View>
          <View style={{ marginTop: 40 }}>
            <Text style={{ fontSize: 22, fontWeight: 600, marginBottom: 15 }}>
              Оплата по карте
            </Text>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ color: "#b8b8b8", marginBottom: 10 }}>
                Номер карты
              </Text>
              <Controller
                control={control}
                name="hotel"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput
                    placeholder="XXXX XXXX XXXX XXXX"
                    placeholderTextColor="#f0f0f0"
                    onChangeText={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                    style={{
                      color: "#000",

                      borderBottomWidth: 0.2,
                      borderBottomColor: "#b8b8b8",
                      paddingBottom: 10,
                    }}
                  />
                )}
              />
              {errors.hotel && (
                <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                  {i18n.t("enterEmail")}
                </Text>
              )}
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ color: "#b8b8b8", marginBottom: 10 }}>ФИО</Text>
              <Controller
                control={control}
                name="hotel"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput
                    placeholder="INSTANT VISA"
                    placeholderTextColor="#f0f0f0"
                    onChangeText={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                    style={{
                      color: "#000",

                      borderBottomWidth: 0.2,
                      borderBottomColor: "#b8b8b8",
                      paddingBottom: 10,
                    }}
                  />
                )}
              />
              {errors.hotel && (
                <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                  {i18n.t("enterEmail")}
                </Text>
              )}
            </View>
            <View style={{ flexDirection: "row", columnGap: 20 }}>
              <View style={{ marginBottom: 20, flex: 1 }}>
                <Text style={{ color: "#b8b8b8", marginBottom: 10 }}>
                  Срок действия
                </Text>
                <Controller
                  control={control}
                  name="hotel"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextInput
                      placeholder="12/28"
                      placeholderTextColor="#f0f0f0"
                      onChangeText={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value}
                      style={{
                        color: "#000",

                        borderBottomWidth: 0.2,
                        borderBottomColor: "#b8b8b8",
                        paddingBottom: 10,
                      }}
                    />
                  )}
                />
                {errors.hotel && (
                  <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                    {i18n.t("enterEmail")}
                  </Text>
                )}
              </View>
              <View style={{ marginBottom: 20, flex: 1 }}>
                <Text style={{ color: "#b8b8b8", marginBottom: 10 }}>
                  CVC/CVV
                </Text>
                <Controller
                  control={control}
                  name="hotel"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextInput
                      placeholder="123"
                      placeholderTextColor="#f0f0f0"
                      onChangeText={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value}
                      style={{
                        color: "#000",

                        borderBottomWidth: 0.2,
                        borderBottomColor: "#b8b8b8",
                        paddingBottom: 10,
                      }}
                    />
                  )}
                />
                {errors.hotel && (
                  <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                    {i18n.t("enterEmail")}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View style={{ marginTop: 40 }}>
            <Text style={{ fontSize: 22, fontWeight: 600, marginBottom: 15 }}>
              Оплата
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>К оплате:</Text>
              <Text style={{ fontSize: 30, fontWeight: 700 }}>10 000 c</Text>
            </View>
          </View>

          <View style={{ marginTop: 40, marginBottom: 20 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Главная страница");
              }}
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
                  Оплатить
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ConfirmationScreen;
