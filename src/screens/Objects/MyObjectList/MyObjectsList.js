import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import MyObjects from "../../../components/ObjectsComponent/MyObjects";

import { TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAccommodations } from "../../../Store/accommodationSlice/accommodationSlice";
import SafeAreaWrapper from "../../../components/SafeAreaWrapper/SafeAreaWrapper";
import CustomText from "../../../components/CustomText/CustomText";
import { RefreshControl } from "react-native";

const MyObjectsList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const myStatus = useSelector((state) => state.accommodation?.myStatus);
  const myError = useSelector((state) => state.accommodation?.myError);
  const myAccommodations = useSelector(
    (state) => state.accommodation?.myAccommodations
  );

  const token = useSelector((state) => state.auth.token);
  const [refreshing, setRefreshing] = useState(false);

  // Функция, выполняющаяся при обновлении
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchMyAccommodations(token));
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchMyAccommodations(token));
    }
  }, [dispatch, token]);

  if (myStatus === "loading") {
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

  if (myStatus === "failed") {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <CustomText>Error: {myError}</CustomText>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
      contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SafeAreaWrapper style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Сдать жильё");
          }}
          style={{
            flexDirection: "column",
            alignItems: "center",
            columnGap: 10,
            borderWidth: 1,
            borderColor: "#dee2f1",
            paddingVertical: 15,
            paddingHorizontal: 15,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <Entypo name="plus" style={{ fontSize: 50, color: "#4B5DFF" }} />
          <View>
            <CustomText style={{ fontSize: 16, textAlign: "center" }}>
              Добавить объект
            </CustomText>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "column", rowGap: 20 }}>
          {myAccommodations &&
            myAccommodations.length > 0 &&
            myAccommodations
              .slice()
              .reverse()
              .map((myAccommodation) => (
                <MyObjects
                  key={myAccommodation.Accommodation.ID}
                  myAccommodation={myAccommodation.Accommodation}
                />
              ))}
        </View>
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default MyObjectsList;
