import React, { useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  ImageBackground,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import ListCard from "../components/List/HomeListCard/ListCard";
import Header from "../components/Header/Header";
import ListCategories from "../components/List/ListCategories/ListCategories";
import ObjectList from "./Objects/ObjectList/ObjectList";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../Store/notificationsSlice/notificationsSlice";
import CustomText from "../components/CustomText/CustomText";
import { fetchAccommodations } from "../Store/accommodationSlice/accommodationSlice";

const hotels = [
  {
    title: "Rixos",
    image:
      "https://www.newworldhotels.com/wp-content/uploads/2014/05/Mobile-NWHBR-Exterior.jpg",
    price: 12000,
    location: "Маями",
  },
  {
    title: "Hayat",
    image:
      "https://imageio.forbes.com/specials-images/imageserve/5ec567daf2098c0006c6036e/Kimpton-Shanghai-Hotel/960x0.jpg?format=jpg&width=960",
    price: 6000,
    location: "Турция",
  },
  {
    title: "Jannat",
    image:
      "https://static.theceomagazine.net/wp-content/uploads/2023/04/26003004/Atlantis-the-royal-e1682434586859.jpg",
    price: 22500,
    location: "Иссык куль",
  },
  {
    title: "Sanjyra",
    image:
      "https://www.luxuryhotelawards.com/wp-content/uploads/sites/8/2023/09/The-Granite-Luxury-Hotel-entrance-view-scaled-2.jpg",
    price: 75000,
    location: "Гавайим",
  },
];

const categories = [
  {
    title: "Пляж",
    image: require("../assets/beach.png"),
  },
  {
    title: "Горы",
    image: require("../assets/mountains.png"),
  },
  {
    title: "Водопады",
    image: require("../assets/waterfall.png"),
  },
  {
    title: "Город",
    image: require("../assets/city.png"),
  },
];

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // notifications
  const token = useSelector((state) => state.auth.token);
  const accommodation = useSelector(
    (state) => state.accommodation.accommodations
  );
 console.log(token)
  useEffect(() => {
    dispatch(fetchNotifications(token));
    dispatch(fetchAccommodations());
  }, [dispatch, token]);

  // list
  const clickHandler = (page) =>
    navigation.push("Главная страница", { screen: page });

  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
      contentContainerStyle={{ paddingVertical: 20 }}
    >
      <SafeAreaWrapper style={{ paddingBottom: 100 }}>
        <Header />
        <ListCategories clickHandler={clickHandler} items={categories} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <CustomText
            style={{
              fontSize: 25,
              fontWeight: 500,
            }}
          >
            Популярные
          </CustomText>

          <View
            style={{
              backgroundColor: "#f7f7f7",
              borderRadius: 100,
              padding: 5,
            }}
          >
            <Feather
              name="arrow-right"
              style={{ fontSize: 25, color: "#001510" }}
            />
          </View>
        </View>
        <ListCard clickHandler={clickHandler} items={hotels} />

        <View style={{ paddingHorizontal: 10, marginTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <CustomText
              style={{
                fontSize: 25,
                fontWeight: 500,
              }}
            >
              Топ отели
            </CustomText>

            <View
              style={{
                backgroundColor: "#f7f7f7",
                borderRadius: 100,
                padding: 5,
              }}
            >
              <Feather
                name="arrow-right"
                style={{ fontSize: 25, color: "#001510" }}
              />
            </View>
          </View>
          <ObjectList />
        </View>

        {/* <View>
          {data &&
            data.data &&
            data.data[0] &&
            data.data[0].Locks &&
            data.data[0].Locks.map((lock, index) => (
              <Text key={index}>{lock.LockID}</Text>
            ))}
        </View> */}
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default HomeScreen;
