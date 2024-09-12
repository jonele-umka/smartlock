import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import Entypo from "react-native-vector-icons/Entypo";
import { useRoute } from "@react-navigation/core";
import { formatDate } from "../../components/FormatDate/FormatDate";
import SafeAreaWrapper from "../../components/SafeAreaWrapper/SafeAreaWrapper";
import ActionAddReview from "../../components/ActionSheet/ActionAddReview/ActionAddReview";
import CustomText from "../../components/CustomText/CustomText";

const AllReviewsScreen = () => {
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [reviewsData, setReviewsData] = useState(true);
  const actionSheetReviewRef = useRef(null);

  const toggleReviews = () => {
    actionSheetReviewRef.current?.show();
  };
  const API_URL = process.env.API_URL;

  const fetchReviews = async () => {
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
        setReviewsData(data?.Accommodation?.Reviews);
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
    fetchReviews();
  }, [route.params?.id]);

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
        <ActivityIndicator size="large" color={"#4B5DFF"} />
      </View>
    );
  }
  if (!reviewsData) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text>Нет данных</Text>
      </View>
    );
  }
  return (
    <ScrollView
      style={{ backgroundColor: "#fff", flex: 1 }}
      contentContainerStyle={{
        paddingTop: 10,
        paddingBottom: Platform.OS === "ios" ? 40 : 20,
        paddingHorizontal: 10,
      }}
    >
      <SafeAreaWrapper>
        <TouchableOpacity
          onPress={toggleReviews}
          style={{
            flexDirection: "column",
            alignItems: "center",
            columnGap: 10,
            padding: 20,
            borderColor: "#dee2f1",
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <Entypo name="plus" style={{ fontSize: 50, color: "#594BFF" }} />
          <View>
            <CustomText style={{ fontSize: 16, textAlign: "center" }}>
              Добавить отзыв
            </CustomText>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "column", rowGap: 20 }}>
          {reviewsData &&
            reviewsData.length > 0 &&
            reviewsData
              .slice()
              .reverse()
              .map((review, index) => (
                <View
                  key={index}
                  style={{
                    padding: 20,
                    borderColor: "#dee2f1",
                    borderWidth: 1,
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 10,
                      marginBottom: 20,
                    }}
                  >
                    <Image
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                      source={{
                        uri: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
                      }}
                    />
                    <View>
                      <CustomText
                        style={{
                          fontSize: 18,
                          fontWeight: "600",
                          marginBottom: 5,
                        }}
                      >
                        {review.Username}
                      </CustomText>
                      <CustomText style={{ color: "grey" }}>
                        {formatDate(review.CreatedAt)}
                      </CustomText>
                    </View>
                  </View>

                  <CustomText style={{ lineHeight: 22 }}>
                    {review.Content}
                  </CustomText>
                </View>
              ))}
        </View>
      </SafeAreaWrapper>
      <ActionAddReview
        actionSheetReviewRef={actionSheetReviewRef}
        id={route.params?.id}
        fetchReviews={fetchReviews}
      />
    </ScrollView>
  );
};

export default AllReviewsScreen;
