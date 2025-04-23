import React, { useEffect, useState } from "react";
import {
  View,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from "react-native";
import BestObjectsList from "../components/List/BestObjects/BestObjectsList";
import Header from "../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../Store/notificationsSlice/notificationsSlice";
import CustomText from "../components/CustomText/CustomText";
import { fetchAccommodations } from "../Store/accommodationSlice/accommodationSlice";
import Search from "../components/Search/Search";
import SafeAreaWrapper from "../components/SafeAreaWrapper/SafeAreaWrapper";
import i18n from "../../i18n/i18n";
import Objects from "../components/ObjectsComponent/Objects";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const API_URL = process.env.API_URL;
  const token = useSelector((state) => state.auth.token);
  const [hotels, setHotels] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const { accommodations, status, hasMore, page } = useSelector(
    (state) => state.accommodation
  );

  useEffect(() => {
    dispatch(fetchAccommodations({ page: 1, limit: 10 }));
  }, []);

  const loadMore = () => {
    if (status !== "loading" && hasMore) {
      dispatch(fetchAccommodations({ page: page + 1, limit: 10 }));
    }
  };

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

  return (
    <SafeAreaWrapper style={{ backgroundColor: "#fff" }}>
      <FlatList
        data={accommodations}
        renderItem={({ item }) => <Objects items={item} />}
        keyExtractor={(item) => item.ID.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListHeaderComponent={
          <>
            <Header />
            <Search />
            {hotels?.length > 0 && (
              <View style={{ marginBottom: 30 }}>
                <CustomText
                  style={{
                    fontSize: 25,
                  }}
                >
                  {i18n.t("popular")}
                </CustomText>
                <BestObjectsList items={hotels} />
              </View>
            )}
            <CustomText style={{ fontSize: 25, marginBottom: 15 }}>
              {i18n.t("topHotels")}
            </CustomText>
          </>
        }
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        ListFooterComponent={
          status === "loading" ? (
            <ActivityIndicator
              size="large"
              color="#4B5DFF"
              style={{ marginTop: 20 }}
            />
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}
      />
      {/* {accommodations && accommodations.length > 0 && (
          <View style={{ paddingHorizontal: 10 }}>
            <CustomText
              style={{
                fontSize: 25,
                marginBottom: 15,
              }}
            >
              {i18n.t("topHotels")}
            </CustomText>
            <ObjectList />
          </View>
        )} */}

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
  );
};

export default HomeScreen;
