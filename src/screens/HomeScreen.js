import React, { useEffect, useState } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import ListCard from "../components/List/HomeListCard/ListCard";
import Header from "../components/Header/Header";

import ObjectList from "./Objects/ObjectList/ObjectList";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../Store/notificationsSlice/notificationsSlice";
import CustomText from "../components/CustomText/CustomText";
import { fetchAccommodations } from "../Store/accommodationSlice/accommodationSlice";
import Search from "../components/Search/Search";
import SafeAreaWrapper from "../components/SafeAreaWrapper/SafeAreaWrapper";
import { useNavigation } from "@react-navigation/core";
import { Button } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const navigationPage = useNavigation();
  const API_URL = process.env.API_URL;
  const token = useSelector((state) => state.auth.token);
  const [hotels, setHotels] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const accommodations = useSelector(
    (state) => state.accommodation.accommodations
  );

  // Функция, выполняющаяся при обновлении
  const onRefresh = () => {
    setRefreshing(true);
    fetchHotels();
    dispatch(fetchNotifications(token));
    dispatch(fetchAccommodations());
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  const fetchHotels = async () => {
    try {
      const response = await fetch(
        `${API_URL}/accommodation/get-all?min_rating=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      setHotels(data.Data);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };
  useEffect(() => {
    fetchHotels();
  }, [token]);

  useEffect(() => {
    dispatch(fetchNotifications(token));
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(fetchAccommodations());
  }, []);
  // list
  const clickHandler = (page) =>
    navigation.push("Главная страница", { screen: page });
  console.log(token);
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
      contentContainerStyle={{ paddingVertical: 20 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SafeAreaWrapper>
        <Header />
        <Search />
        {/* <Button
          onPress={async () => {
            try {
              await AsyncStorage.removeItem("login");
              await AsyncStorage.removeItem("password");

              console.log("Data removed");
            } catch (exception) {
              console.log(exception);
            }
          }}
        /> */}
        {/* <ListCategories clickHandler={clickHandler} items={categories} /> */}
        {hotels && hotels.length > 0 && (
          <View style={{ marginBottom: 30 }}>
            <CustomText
              style={{
                fontSize: 25,
                marginBottom: 15,paddingHorizontal: 10
              }}
            >
              Популярные
            </CustomText>
            <ListCard
              clickHandler={clickHandler}
              items={hotels}
              API_URL={API_URL}
              navigation={navigationPage}
            />
          </View>
        )}
        {accommodations && accommodations.length > 0 && (
          <View style={{ paddingHorizontal: 10 }}>
            <CustomText
              style={{
                fontSize: 25,
                marginBottom: 15,
              }}
            >
              Топ отели
            </CustomText>
            <ObjectList />
          </View>
        )}

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
