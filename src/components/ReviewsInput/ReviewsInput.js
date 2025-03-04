import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AirbnbRating } from "@rneui/base";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import CustomText from "../CustomText/CustomText";
import CustomInput from "../CustomInput/CustomInput";
import i18n from "../i18n/i18n";

const ReviewsInput = ({
  actionSheetReviewRef,
  id,
  fetchReviews,
  fetchReviewsCheck,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [rating, setRating] = useState(3);
  const API_URL = process.env.API_URL;
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const requestBody = {
      Content: data.Content,
      Star: rating,
      AccommodationId: id,
    };

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/review/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const responseDataError = await response.json();
        const errorMessage =
          responseDataError.error.Error || "Произошла ошибка";

        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error",
          text2: errorMessage,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
        actionSheetReviewRef?.current?.hide();
        setLoading(false);
      } else {
        setLoading(false);

        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Success",
          text2: i18n.t("sentReview"),
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
        actionSheetReviewRef?.current?.hide();
        fetchReviews();
        fetchReviewsCheck();
      }
    } catch (error) {
      setLoading(false);

      actionSheetReviewRef?.current?.hide();

      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Ошибка",
        text2: `${i18n.t("errorSentReview")}: ${error.message}`,
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
    }
  };

  return (
    <View>
      <View style={{ marginBottom: 20 }}>
        <CustomText
          style={{
            fontSize: 18,
            marginBottom: 10,
          }}
        >
          {i18n.t("writeReview")}
        </CustomText>
        <Controller
          control={control}
          name="Content"
          rules={{
            required: "Поле объязателен к заполнению",
          }}
          render={({ field }) => (
            <CustomInput
              placeholder={"Чистый, удобный ..."}
              placeholderTextColor="#616992"
              onChangeText={(value) => {
                field.onChange(value);
              }}
              numberOfLines={10}
              multiline={true}
              value={field.value}
              style={{
                borderWidth: 1,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 10,
                borderColor: "#dee2f1",
                color: "#1C2863",
                fontSize: 14,
                textAlignVertical: "top",
              }}
            />
          )}
        />
        {errors.Content && (
          <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
            {errors.Content.message}
          </CustomText>
        )}
      </View>

      <View style={{ marginBottom: 30 }}>
        <CustomText style={{ fontSize: 18, marginBottom: 10 }}>
          {i18n.t("rate")}
        </CustomText>
        <View
          style={{
            borderColor: "#dee2f1",
            borderWidth: 1,
            paddingBottom: 20,
            paddingTop: 10,
            borderRadius: 10,
            paddingHorizontal: 10,
          }}
        >
          <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad", "Normal", "Good", "Excellent"]}
            size={40}
            defaultRating={rating}
            onFinishRating={(value) => setRating(value)}
          />
        </View>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={"#4B5DFF"}
          style={{ marginTop: 20 }}
        />
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: "#4B5DFF",
            paddingVertical: 15,
            textAlign: "center",
            borderRadius: 10,
          }}
          onPress={handleSubmit(onSubmit)}
        >
          <CustomText
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            {i18n.t("send")}
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ReviewsInput;
