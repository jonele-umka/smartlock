import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
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
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import ActionSheet from "react-native-actions-sheet";
import ListFacilities from "../../components/List/ListFacilities/ListFacilities";
import { LinearGradient } from "expo-linear-gradient";

const HotelDetailsScreen = () => {
  const navigation = useNavigation();
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
  const facilitiesData = [
    {
      facilities: "Парковка",
      imageUri:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Parking_icon.svg/1200px-Parking_icon.svg.png",
    },
    {
      facilities: "Интернет",
      imageUri:
        "https://e7.pngegg.com/pngimages/87/811/png-clipart-wifi-symbol-wi-fi-computer-icons-hotspot-blue-wifi-icon-computer-network-electronics.png",
    },
    {
      facilities: "Душ",
      imageUri: "https://cdn-icons-png.flaticon.com/512/5236/5236533.png",
    },
    {
      facilities: "Душ",
      imageUri: "https://cdn-icons-png.flaticon.com/512/2309/2309927.png",
    },
    {
      facilities: "Душ",
      imageUri: "https://cdn-icons-png.flaticon.com/512/2309/2309927.png",
    },
    {
      facilities: "Душ",
      imageUri: "https://cdn-icons-png.flaticon.com/512/2309/2309927.png",
    },
  ];
  const images = [
    {
      uri: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      uri: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      uri: "https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      uri: "https://plus.unsplash.com/premium_photo-1670360414903-19e5832f8bc4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  // favorites
  const [favoritesClick, setFavoritesClick] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const handleFavorites = () => {
    setFavoritesClick(!favoritesClick);
  };
  // more reviews
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
  // actionsheet more reviews
  const [expandedReviewIndex, setExpandedReviewIndex] = useState(null);
  const [expandedReviewText, setExpandedReviewText] = useState("");

  const actionSheetRef = useRef(null);
  const toggleDescriptionReviews = (index, text) => {
    setExpandedReviewIndex(index);
    setExpandedReviewText(text);
    actionSheetRef.current?.show();
  };
  // bottomsheet
  const snapPoints = useMemo(() => ["70", "100%"]);
  const bottomSheetRef = useRef(null);
  const handleSheetChanges = useCallback((index) => {
    if (index === 0) {
      bottomSheetRef.current?.collapse();
    } else {
      bottomSheetRef.current?.expand();
    }
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View style={{ position: "relative", height: 250 }}>
        <CarouselImage images={images} />
        <View style={{ position: "absolute", right: 10, top: 200 }}>
          {favoritesClick ? (
            <TouchableOpacity onPress={handleFavorites}>
              <Ionicons name="heart" style={{ color: "#fff", fontSize: 40 }} />
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
      </View>
      <View
        style={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: "hidden",
        }}
      >
        <ScrollView
          style={{
            backgroundColor: "#fff",
          }}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingTop: Platform.OS === "android" ? 10 : 20,
            paddingBottom: Platform.OS === "android" ? 250 : 270,
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: 500, flexWrap: "wrap" }}>
            OLOLO HOTEL BISHKEK
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 5,
                  marginBottom: 5,
                }}
              >
                <Fontisto
                  name="map-marker-alt"
                  style={{ color: "#000", fontSize: 16 }}
                />
                <Text style={{ fontSize: 16 }}>Бишкек</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 5,
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

                <Text style={{ fontSize: 14, color: "#b8b8b8" }}>
                  ( 28 отзывов )
                </Text>
              </View>
              {/* <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 5,
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    paddingVertical: 2,
                    paddingHorizontal: 6,
                    backgroundColor: "green",
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: "#fff" }}>5.6</Text>
                </View>
                <Text>1090 отзывов</Text>
              </View> */}
              {/* <Text style={{ fontSize: 16, marginTop: 5 }}>
                Цена за 1 ночь, 2 взрослых
              </Text> */}
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: "red",
                  textDecorationLine: "line-through",
                  alignSelf: "flex-end",
                }}
              >
                KGS 3500
              </Text>

              <Text style={{ fontSize: 18, fontWeight: 500 }}>KGS 2500</Text>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: 500, marginBottom: 10 }}>
              Описание
            </Text>
            <Text style={{ lineHeight: 25 }}>{renderDescription()}</Text>
            <TouchableOpacity onPress={toggleDescription}>
              <Text
                style={{
                  color: "#005fb8",
                  fontSize: 16,
                  marginTop: 10,
                  fontWeight: 500,
                }}
              >
                Показать полное описание
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 40 }}>
            <Text style={{ fontSize: 22, fontWeight: 500, marginBottom: 10 }}>
              Местоположение
            </Text>
            <MapAddress />
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 5,
                  marginTop: 10,
                }}
              >
                <Fontisto
                  name="map-marker-alt"
                  style={{ color: "#000", fontSize: 14 }}
                />
                <Text>Бишкек ул.Ахунбаева 165</Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 40 }}>
            <Text style={{ fontSize: 22, fontWeight: 500, marginBottom: 10 }}>
              Удобства
            </Text>
            <ListFacilities facilitiesData={facilitiesData} />
          </View>
          <View style={{ marginTop: 40, paddingRight: 25 }}>
            <Text style={{ fontSize: 22, fontWeight: 500, marginBottom: 10 }}>
              Порядок проживания
            </Text>
            <View style={{ flexDirection: "column", rowGap: 20 }}>
              <View style={{ flexDirection: "row", columnGap: 8 }}>
                <Ionicons
                  name="alarm-outline"
                  style={{ color: "#000", fontSize: 25 }}
                />
                <View>
                  <Text
                    style={{ fontSize: 16, fontWeight: 600, marginBottom: 5 }}
                  >
                    Время въезда/выезда
                  </Text>
                  <Text style={{ marginBottom: 5 }}>Заезд с 14:00</Text>
                  <Text>Выезд с 10:00</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", columnGap: 8 }}>
                <Ionicons
                  name="paw-outline"
                  style={{ color: "#000", fontSize: 25 }}
                />
                <View>
                  <Text
                    style={{ fontSize: 16, fontWeight: 600, marginBottom: 5 }}
                  >
                    Домашние животные
                  </Text>

                  <Text>Размещение домашних животных не допустимо!</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", columnGap: 8 }}>
                <Ionicons
                  name="time-outline"
                  style={{ color: "#000", fontSize: 25 }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      marginBottom: 10,
                    }}
                  >
                    Нет комендатского часа
                  </Text>

                  <Text>
                    Можно покидать территорию и возвращаться обратно в любое
                    время
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", columnGap: 8 }}>
                <Ionicons
                  name="card-outline"
                  style={{ color: "#000", fontSize: 25 }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      marginBottom: 10,
                    }}
                  >
                    Способы оплаты
                  </Text>

                  <Text>Visa, Наличные</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 40 }}>
            <Text style={{ fontSize: 22, fontWeight: 500, marginBottom: 10 }}>
              Отзывы гостей
            </Text>
            <View style={{ marginBottom: 30 }}>
              <View
                style={{
                  backgroundColor: "#f0f0f0",
                  paddingBottom: 20,
                  paddingTop: 10,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                }}
              >
                <View style={{ marginBottom: 15 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: 500, marginBottom: 2 }}
                  >
                    Вы уже были здесь?
                  </Text>
                  <Text>Как все прошло?</Text>
                </View>
                <AirbnbRating
                  count={5}
                  reviews={[
                    "Ужасно",
                    "Плохо",
                    "Нормально",
                    "Хорошо",
                    "Отлично",
                  ]}
                  defaultRating={4}
                  size={40}
                />
              </View>
            </View>

            <View>
              <View style={{ flexDirection: "column", rowGap: 20 }}>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Wi-Fi</Text>
                    <Text>9</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "green",
                      height: 10,
                      borderRadius: 100,
                      marginTop: 5,
                    }}
                  ></View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Комфорт</Text>
                    <Text>9</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "green",
                      height: 10,
                      borderRadius: 100,
                      marginTop: 5,
                    }}
                  ></View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Персонал</Text>
                    <Text>9</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "green",
                      height: 10,
                      borderRadius: 100,
                      marginTop: 5,
                    }}
                  ></View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Расположение</Text>
                    <Text>9</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "green",
                      height: 10,
                      borderRadius: 100,
                      marginTop: 5,
                    }}
                  ></View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Соотношение цена/качество</Text>
                    <Text>9</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "green",
                      height: 10,
                      borderRadius: 100,
                      marginTop: 5,
                    }}
                  ></View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Удобства</Text>
                    <Text>9</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "green",
                      height: 10,
                      borderRadius: 100,
                      marginTop: 5,
                    }}
                  ></View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Чистота</Text>
                    <Text>9</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "green",
                      height: 10,
                      borderRadius: 100,
                      marginTop: 5,
                    }}
                  ></View>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <Reviews
                reviewsData={reviewsData}
                toggleDescriptionReviews={toggleDescriptionReviews}
                expandedReviewIndex={expandedReviewIndex}
              />
            </View>
          </View>

          <View style={{ marginTop: 40 }}>
            <Questions />
          </View>

          <View style={{ paddingVertical: 15 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Даты поездки");
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
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    columnGap: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                    }}
                  >
                    2500 KGS/ночь
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 18,
                      fontWeight: 500,
                    }}
                  >
                    Выбрать
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={false}
        handleIndicatorStyle={{ backgroundColor: "#000" }}
        backgroundStyle={{
          backgroundColor: "#fff",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
      </BottomSheet> */}
      {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate("Все варианты");
            }}
            style={{ marginTop: 5 }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Все варианты данного отеля
            </Text>
          </TouchableOpacity> */}
      <ActionSheet ref={actionSheetRef}>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 16, lineHeight: 22 }}>
            {expandedReviewText}
          </Text>
        </View>
      </ActionSheet>
    </View>
  );
};

export default HotelDetailsScreen;
