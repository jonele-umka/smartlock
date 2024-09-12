import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";

import MapAddress from "../../../components/Map/MapAddress";

import CarouselImage from "../../../components/CarouselImage/CarouselImage";
import Reviews from "../../../components/List/ListReviews/Reviews";
import { useNavigation, useRoute } from "@react-navigation/native";

import ListFacilities from "../../../components/List/ListFacilities/ListFacilities";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "../../../components/CustomText/CustomText";
import {
  addFavorite,
  fetchFavorites,
  removeFavorite,
} from "../../../Store/favoritesSlice/favoritesSlice";
import { useDispatch, useSelector } from "react-redux";
import CalendarReserv from "../../../components/Calendars/CalendarReserv/CalendarReserv";
import ActionAddReview from "../../../components/ActionSheet/ActionAddReview/ActionAddReview";
import ActionDescription from "../../../components/ActionSheet/ActionDescription/ActionDescription";
 
const ObjectDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const API_URL = process.env.API_URL;
  const token = useSelector((state) => state.auth.token);
  const favorites = useSelector((state) => state.favorites.favorites || []);
  const dispatch = useDispatch();

  // get data
  const [objectDetails, setObjectDetails] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [rules, setRules] = useState([]);
  const [image, setImage] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [currentType, setCurrentType] = useState(null);

  // const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);

  // // action
  // const openActionSheet = (type) => {
  //   setCurrentType(type);
  //   setIsActionSheetVisible(true);
  // };
  const fetchObjectDetails = async () => {
    try {
      const response = await fetch(
        `${API_URL}/accommodation/get-one/${route.params?.id}`,
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
        setFacilities(data?.Accommodation.Facilities);
        setRules(data?.Accommodation?.Rules);
        setImage(data?.Accommodation.Images);
        setCalendar(data?.Calendar);
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
    fetchObjectDetails();
  }, [route.params?.id]);

  const latitude = parseFloat(objectDetails?.Latitude);
  const longitude = parseFloat(objectDetails?.Longitude);
console.log(route.params?.id)
  // more reviews
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const descriptionText = objectDetails?.Description || "";
  const words = descriptionText.split(" ");
  const isLongDescription = words.length > 20;

  const toggleDescription = () => {
    setDescriptionExpanded(!descriptionExpanded);
  };

  const renderDescription = () => {
    if (!descriptionExpanded && isLongDescription) {
      const shortenedDescription = words.slice(0, 20).join(" ");
      return (
        <CustomText style={{ color: "#616992" }}>
          {shortenedDescription}...
        </CustomText>
      );
    } else {
      return (
        <CustomText style={{ color: "#616992" }}>{descriptionText}</CustomText>
      );
    }
  };
  // favorites
  const [isFavorite, setIsFavorite] = useState(
    favorites.some((fav) => fav.AccommodationID === route.params?.id)
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchFavorites(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    setIsFavorite(
      favorites.some((fav) => fav.AccommodationID === route.params?.id)
    );
  }, [favorites]);

  const handleFavoritePress = async () => {
    if (isFavorite) {
      const favorite = favorites.find(
        (fav) => fav.AccommodationID === route.params?.id
      );

      if (favorite) {
        await dispatch(removeFavorite({ id: favorite.ID, token }));
      }
    } else {
      await dispatch(addFavorite({ id: route.params?.id, token }));
    }

    // Обновляем локальное состояние немедленно
    setIsFavorite(!isFavorite);
    // Обновляем список фаворитов после добавления или удаления
    dispatch(fetchFavorites(token));
  };
  // actionsheet more reviews
  const [expandedReviewIndex, setExpandedReviewIndex] = useState(null);
  const [expandedReviewText, setExpandedReviewText] = useState("");

  const actionSheetRef = useRef(null);
  const actionSheetReviewRef = useRef(null);
  // reviews
  const toggleDescriptionReviews = (index, text) => {
    setExpandedReviewIndex(index);
    setExpandedReviewText(text);
    actionSheetRef.current?.show();
  };
  const toggleReviews = () => {
    actionSheetReviewRef.current?.show();
  };

  // calendar
  const [selectedDates, setSelectedDates] = useState({});

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

  if (!objectDetails) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <CustomText>Нет данных</CustomText>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
      contentContainerStyle={{
        paddingBottom: Platform.OS === "ios" ? 40 : 20,
      }}
    >
      <View style={{ position: "relative", height: 250 }}>
        {image && image.length > 0 && image[0].ImageUrl ? (
          <CarouselImage images={image} />
        ) : (
          <Image
            style={{ height: 250, width: "100%" }}
            source={{
              uri: "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg",
            }}
          />
        )}
        {/* <CarouselImage images={image} /> */}
        <View style={{ position: "absolute", right: 10, top: 200 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(97, 105, 146, 0.8)",
              borderRadius: 10,
              padding: 5,
            }}
            onPress={handleFavoritePress}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              style={{ color: "#fff ", fontSize: 35 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 10,
          paddingTop: 10,
          // paddingBottom: Platform.OS === "android" ? 250 : 270,
        }}
      >
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: 5,
          }}
        >
          <CustomText style={{ color: "#ccc" }}>Обновлено: </CustomText>
          <CustomText style={{ color: "#ccc" }}>
            {formattedUpdateDate || "Нет даты"}
          </CustomText>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: 10,
          }}
        >
          <CustomText style={{ color: "#ccc" }}>Добавлено: </CustomText>
          <CustomText style={{ color: "#ccc" }}>
            {formattedCreateDate || "Нет даты"}
          </CustomText>
        </View> */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <View>
            {objectDetails?.DiscountPrice ? (
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <CustomText
                  style={{
                    fontSize: 14,
                    color: "red",
                    textDecorationLine: "line-through",
                  }}
                >
                  {objectDetails?.Price || "Нет цены"} сом
                </CustomText>
                <CustomText
                  style={{
                    fontSize: 14,
                    color: "red",
                    textDecorationLine: "line-through",
                  }}
                >
                  {" "}
                  /ночь
                </CustomText>
              </View>
            ) : (
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <CustomText
                  style={{ fontSize: 28, fontWeight: 500, color: "#4B5DFF" }}
                >
                  {objectDetails?.Price || "Нет цены"} сом
                </CustomText>
                <CustomText style={{ fontSize: 18, color: "#4B5DFF" }}>
                  {" "}
                  /ночь
                </CustomText>
              </View>
            )}
            {objectDetails?.DiscountPrice && (
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <CustomText
                  style={{ fontSize: 28, fontWeight: 500, color: "#4B5DFF" }}
                >
                  {objectDetails?.DiscountPrice || "Нет цены"} сом
                </CustomText>
                <CustomText style={{ fontSize: 18, color: "#4B5DFF" }}>
                  {" "}
                  /ночь
                </CustomText>
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
              borderWidth: 1,
              borderColor: "#EF8030",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
            }}
          >
            <Fontisto name="star" style={{ fontSize: 20, color: "#EEC17E" }} />

            <CustomText style={{ fontSize: 20 }}>
              {objectDetails?.Rating || "Нет рейтингов"}
            </CustomText>
          </View>
        </View>
        <CustomText
          style={{
            fontSize: 25,
            fontWeight: 500,
            flexWrap: "wrap",
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          {objectDetails?.Title || "Нет названия"}
        </CustomText>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            columnGap: 15,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              columnGap: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
                marginBottom: 5,
              }}
            >
              <Ionicons
                name="home-outline"
                style={{ color: "#000", fontSize: 20 }}
              />

              <CustomText style={{ fontSize: 16, fontWeight: 500 }}>
                {objectDetails?.Category.Name || "Нет категории"}
              </CustomText>
            </View>
            <CustomText style={{ fontSize: 16 }}>Категория</CustomText>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              columnGap: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
                marginBottom: 5,
              }}
            >
              <Ionicons
                name="person-outline"
                style={{ color: "#000", fontSize: 20 }}
              />

              <CustomText style={{ fontSize: 16, fontWeight: 500 }}>
                {objectDetails?.PeopleQuantity || "Нет гостей"}
              </CustomText>
            </View>
            <CustomText>Гости</CustomText>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              columnGap: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
                marginBottom: 5,
              }}
            >
              <Ionicons
                name="bed-outline"
                style={{ color: "#000", fontSize: 20 }}
              />

              <CustomText style={{ fontSize: 16, fontWeight: 500 }}>
                {objectDetails?.RoomsQuantity || "Нет комнат"}
              </CustomText>
            </View>
            <CustomText>Комнаты</CustomText>
          </View>
        </View>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: "rgba(242, 242, 243, 1)",
            marginTop: 20,
            width: 280,
            margin: "auto",
          }}
        />
        <View style={{ marginTop: 20 }}>
          <CustomText
            style={{ fontSize: 18, fontWeight: 500, marginBottom: 5 }}
          >
            Описание
          </CustomText>
          <CustomText>{renderDescription()}</CustomText>
          {isLongDescription && !descriptionExpanded && (
            <TouchableOpacity onPress={toggleDescription}>
              <CustomText
                style={{
                  color: "#005fb8",
                  fontSize: 16,
                  marginTop: 10,
                  fontWeight: 500,
                }}
              >
                Показать полное описание
              </CustomText>
            </TouchableOpacity>
          )}
          {descriptionExpanded && (
            <TouchableOpacity onPress={toggleDescription}>
              <CustomText
                style={{
                  color: "#005fb8",
                  fontSize: 16,
                  marginTop: 10,
                  fontWeight: 500,
                }}
              >
                Скрыть описание
              </CustomText>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ marginTop: 40 }}>
          <CustomText
            style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}
          >
            Удобства
          </CustomText>
          <ListFacilities facilitiesData={facilities} />
        </View>
        <View style={{ marginTop: 40 }}>
          <CustomText
            style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}
          >
            Местоположение
          </CustomText>
          <MapAddress latitude={latitude} longitude={longitude} />
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
                marginTop: 10,
              }}
            >
              <Fontisto name="map-marker-alt" style={{ color: "#000" }} />
              <CustomText>
                {objectDetails?.LocationLabel || "Нет адреса"}
              </CustomText>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 40, paddingRight: 25 }}>
          <CustomText
            style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}
          >
            Порядок проживания
          </CustomText>
          <View style={{ flexDirection: "column", rowGap: 8 }}>
            {rules.map((rule) => {
              return (
                <View
                  key={rule.ID}
                  style={{ flexDirection: "row", columnGap: 8 }}
                >
                  <Image
                    source={{ uri: rule.Icon }}
                    style={{ width: 25, height: 25 }}
                  />

                  <CustomText>{rule.Value}</CustomText>
                </View>
              );
            })}
          </View>
        </View>

        <View style={{ marginTop: 40 }}>
          {/* <View>
            <View style={{ flexDirection: "column", rowGap: 20 }}>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <CustomText>Wi-Fi</CustomText>
                  <CustomText>9</CustomText>
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
                  <CustomText>Комфорт</CustomText>
                  <CustomText>9</CustomText>
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
                  <CustomText>Персонал</CustomText>
                  <CustomText>9</CustomText>
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
                  <CustomText>Расположение</CustomText>
                  <CustomText>9</CustomText>
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
                  <CustomText>Соотношение цена/качество</CustomText>
                  <CustomText>9</CustomText>
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
                  <CustomText>Удобства</CustomText>
                  <CustomText>9</CustomText>
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
                  <CustomText>Чистота</CustomText>
                  <CustomText>9</CustomText>
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
          </View> */}

          {objectDetails?.Reviews && objectDetails?.Reviews.length > 0 ? (
            <View style={{ marginTop: 20 }}>
              <Reviews
                reviewsData={objectDetails}
                toggleDescriptionReviews={toggleDescriptionReviews}
                expandedReviewIndex={expandedReviewIndex}
              />
            </View>
          ) : (
            <View style={{ marginTop: 20 }}>
              <CustomText style={{ fontSize: 18, fontWeight: 500 }}>
                Отзывы
              </CustomText>
              <CustomText style={{ marginTop: 10, fontSize: 16 }}>
                Нет отзывов
              </CustomText>
              <View style={{ marginTop: 10, alignItems: "center", flex: 1 }}>
                <TouchableOpacity onPress={toggleReviews}>
                  <CustomText
                    style={{ fontSize: 18, fontWeight: 500, color: "#005fb8" }}
                  >
                    Добавьте первый отзыв
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* {objectDetails?.QuestionAnswer &&
        objectDetails?.QuestionAnswer.length < 0 ? (
          <View style={{ marginTop: 40 }}>
            <Questions />
          </View>
        ) : (
          <View style={{ marginTop: 40 }}>
            <Text style={{ fontSize: 18, fontWeight: 500 }}>Вопросы</Text>
            <Text style={{ marginTop: 10, fontSize: 16 }}>Нет вопросов</Text>
          </View>
        )} */}
        <View style={{ marginTop: 40 }}>
          <CustomText
            style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}
          >
            Укажите дату въезда и выезда
          </CustomText>

          <CalendarReserv
            onDatesSelected={setSelectedDates}
            calendar={calendar}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            if (
              !selectedDates ||
              !selectedDates.startDate ||
              !selectedDates.endDate
            ) {
              Alert.alert(
                "Ошибка",
                "Пожалуйста, выберите даты въезда и выезда."
              );
              return;
            }

            // Проверка токена
            if (!token) {
              Alert.alert(
                "Необходима авторизация",
                "Пожалуйста, авторизуйтесь для продолжения.",
                [
                  {
                    text: "Отмена",
                    style: "cancel",
                  },
                  {
                    text: "Авторизоваться",
                    onPress: () => {
                      navigation.navigate("Войти", {
                        returnScreen: "Детали объекта",
                      });
                    },
                  },
                ]
              );
              return;
            }

            // Навигация на экран подтверждения брони
            navigation.navigate("Подтверждение брони", {
              title: objectDetails?.Title,
              discountPrice: objectDetails?.DiscountPrice,
              locationLabel: objectDetails?.LocationLabel,
              room: objectDetails?.RoomsQuantity,
              people: objectDetails?.PeopleQuantity,
              img: image,
              latitude: latitude,
              longitude: longitude,
              price: objectDetails?.Price,
              discountPrice: objectDetails?.DiscountPrice,
              id: objectDetails?.ID,
              selectedDates: selectedDates,
            });
          }}
          style={{
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            marginTop: 30,
            backgroundColor: "#4B5DFF",
            paddingVertical: 15,
            textAlign: "center",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              columnGap: 20,
            }}
          >
            <CustomText
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              Выбрать
            </CustomText>
            {objectDetails?.DiscountPrice ? (
              <CustomText
                style={{
                  color: "#fff",
                }}
              >
                {objectDetails?.DiscountPrice}/ночь
              </CustomText>
            ) : (
              <CustomText
                style={{
                  color: "#fff",
                }}
              >
                {objectDetails?.Price}/ночь
              </CustomText>
            )}
          </View>
        </TouchableOpacity>
      </View>
      {/* <ActionLandlord
        currentType={currentType}
        setIsActionSheetVisible={setIsActionSheetVisible}
      /> */}
      <ActionAddReview
        actionSheetReviewRef={actionSheetReviewRef}
        id={objectDetails?.ID}
        fetchReviews={fetchObjectDetails}
      />
      <ActionDescription
        actionSheetRef={actionSheetRef}
        expandedReviewText={expandedReviewText}
      />
    </ScrollView>
  );
};

export default ObjectDetails;
