import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
// import MapAddress from "../../components/Map/MapAddress";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import ListImages from "../../components/List/ListImages/ListImages";
import Toast from "react-native-toast-message";
import CustomText from "../../components/CustomText/CustomText";
import i18n from "../../../i18n/i18n";

const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const token = useSelector((state) => state.auth.token);
  const API_URL = process.env.API_URL;
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  // data
  const startDate = new Date(route?.params?.selectedDates.startDate);
  const endDate = new Date(route?.params?.selectedDates.endDate);

  const timeDifference = endDate - startDate;
  const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  const discount = route?.params?.discountPrice;
  const pricePerDay = discount > 0 ? discount : route?.params?.price;

  const totalSum = pricePerDay * days;

  // room and person
  const [quantityPerson, setQuantityPerson] = useState(1);
  const [quantityRooms, setQuantityRooms] = useState(1);
  // children and animals
  const [withChildren, setWithChildren] = useState(false);
  const [withAnimals, setWithAnimals] = useState(false);
  // Ограничение по количеству гостей и комнат
  const maxPeople = route?.params?.people || 1;
  const maxRooms = route?.params?.room || 1;

  const increaseQuantityPerson = () => {
    if (quantityPerson < maxPeople) {
      setQuantityPerson(quantityPerson + 1);
    }
  };

  const decreaseQuantityPerson = () => {
    if (quantityPerson > 1) {
      setQuantityPerson(quantityPerson - 1);
    }
  };

  const increaseQuantityRooms = () => {
    if (quantityRooms < maxRooms) {
      setQuantityRooms(quantityRooms + 1);
    }
  };

  const decreaseQuantityRooms = () => {
    if (quantityRooms > 1) {
      setQuantityRooms(quantityRooms - 1);
    }
  };

  //   const fetchProfile = async () => {
  //     try {
  //       const response = await fetch(`${API_URL}/api/auth/profile`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         const responseDataError = await response.json();
  //         const errorMessage =
  //           responseDataError.error.Message || "Произошла ошибка";
  //       }

  //       const responseData = await response.json();
  // console.log(responseData)
  //       const fieldsToShow = [];
  //       if (!responseData.Profile.Name) fieldsToShow.push("Name");
  //       if (!responseData.Profile.Surname) fieldsToShow.push("Surname");
  //       if (!responseData.Profile.PhoneNumber) fieldsToShow.push("PhoneNumber");
  //       setFieldsToShow(fieldsToShow);

  //       return responseData;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const onSubmit = async (data) => {
    setLoading(true);
    const booking = {
      AccommodationID: parseInt(route?.params?.id),
      StartDate: route?.params?.selectedDates.startDate,
      EndDate: route?.params?.selectedDates.endDate,
      PeopleQuantity: parseInt(route?.params?.people),
      Days: days,
      TotalSum: totalSum,
      WithChildren: withChildren,
      WithAnimals: withAnimals,
      ...data,
    };

    try {
      const response = await fetch(`${API_URL}/booking/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        setLoading(false);
        const responseDataError = await response.json();
        const errorMessage =
          responseDataError.error.Message || "Произошла ошибка";
        Toast.show({
          type: "error",
          position: "bottom",
          text2: errorMessage,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
        return;
      }

      if (response.ok) {
        setLoading(false);
        navigation.navigate("Главная страница");
        Toast.show({
          type: "success",
          position: "bottom",
          text2: i18n.t("successReserv"),
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("Ошибка при отправке:", error);
    }
  };

  // useEffect(() => {
  //   fetchProfile();
  // }, []);

  return (
    <ScrollView
      style={{ backgroundColor: "#fff", flex: 1 }}
      contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}
    >
      <CustomText
        style={{
          fontSize: 20,
          fontWeight: 500,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        {route?.params?.title}
      </CustomText>

      <View
        style={{
          flexDirection: "row",
          columnGap: 20,
        }}
      >
        {route?.params?.img &&
        route?.params?.img.length > 0 &&
        route?.params?.img[0].ImageUrl ? (
          <ListImages images={route?.params?.img} />
        ) : (
          <Image
            style={{ height: 100, width: "20%" }}
            source={{
              uri: "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg",
            }}
          />
        )}
      </View>

      <View style={{ marginTop: 40 }}>
        <CustomText style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}>
          {i18n.t("location")}
        </CustomText>
        {/* <MapAddress
          latitude={route?.params?.latitude}
          longitude={route?.params?.longitude}
        /> */}
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
              {route?.params?.locationLabel || "Нет адреса"}
            </CustomText>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 40 }}>
        <CustomText style={{ fontSize: 18, fontWeight: 500, marginBottom: 20 }}>
          {i18n.t("quantityPersonGuest")}
        </CustomText>
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
            <CustomText
              style={{
                fontSize: 16,
              }}
            >
              {i18n.t("guests")}
            </CustomText>
            {/* <CustomText style={{ color: "#616992", fontSize: 12 }}>
              От 18 лет
            </CustomText> */}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
              borderWidth: 1,
              borderColor: "#4B5DFF",
              borderRadius: 100,
              // paddingHorizontal: 15,
              // paddingVertical: 10,
            }}
          >
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={decreaseQuantityPerson}
            >
              <CustomText style={{ color: "#616992", fontSize: 18 }}>
                -
              </CustomText>
            </TouchableOpacity>

            <View>
              <CustomText
                style={{ fontSize: 16, color: "#616992", marginHorizontal: 10 }}
              >
                {quantityPerson}
              </CustomText>
            </View>

            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={increaseQuantityPerson}
            >
              <CustomText style={{ color: "#616992", fontSize: 18 }}>
                +
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            columnGap: 50,
            marginBottom: 20,
          }}
        >
          <View>
            <CustomText
              style={{
                fontSize: 16,
              }}
            >
              {i18n.t("placeholder_rooms_quantity")}
            </CustomText>
            {/* <CustomText style={{ color: "#616992", fontSize: 12 }}>
              1-х комн
            </CustomText> */}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
              borderWidth: 1,
              borderColor: "#4B5DFF",
              borderRadius: 100,
              // paddingHorizontal: 15,
              // paddingVertical: 10,
            }}
          >
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={decreaseQuantityRooms}
            >
              <Text style={{ color: "#616992", fontSize: 18 }}>-</Text>
            </TouchableOpacity>

            <View>
              <CustomText
                style={{ fontSize: 16, color: "#616992", marginHorizontal: 10 }}
              >
                {quantityRooms}
              </CustomText>
            </View>

            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={increaseQuantityRooms}
            >
              <CustomText style={{ color: "#616992", fontSize: 18 }}>
                +
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <CustomText>{i18n.t("haveChild")}</CustomText>
          <Switch
            value={withChildren}
            onValueChange={setWithChildren}
            thumbColor={withChildren ? "#4B5DFF" : "#ccc"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
      </View>

      {/* Переключатель "Есть животные?" */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <CustomText>{i18n.t("doYouHaveAnimals")}</CustomText>
        <Switch
          value={withAnimals}
          onValueChange={setWithAnimals}
          thumbColor={withAnimals ? "#4B5DFF" : "#ccc"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>
      <View style={{ marginTop: 40 }}>
        <CustomText style={{ fontSize: 18, fontWeight: 600, marginBottom: 15 }}>
          {i18n.t("bookingDetails")}
        </CustomText>

        <View
          style={{
            flexDirection: "column",
            rowGap: 15,
            borderLeftWidth: 8,
            borderLeftColor: "rgba(97,105,146,0.2)",
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <CustomText style={{ fontSize: 16, color: "#616992" }}>
              {i18n.t("dateEntry")}:
            </CustomText>
            <CustomText style={{ fontWeight: 500 }}>
              {route?.params?.selectedDates.startDate}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <CustomText style={{ fontSize: 16, color: "#616992" }}>
              {i18n.t("departureDate")}:
            </CustomText>
            <CustomText style={{ fontWeight: 500 }}>
              {route?.params?.selectedDates.endDate}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <CustomText style={{ fontSize: 16, color: "#616992" }}>
              {i18n.t("quantityGuests")}:
            </CustomText>
            <CustomText style={{ fontWeight: 500 }}>
              {quantityPerson}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <CustomText style={{ fontSize: 16, color: "#616992" }}>
              {i18n.t("label_rooms_quantity")}:
            </CustomText>
            <CustomText style={{ fontWeight: 500 }}>{quantityRooms}</CustomText>
          </View>
        </View>
      </View>
      <View
        style={{
          borderColor: "#F2F2F3",
          borderWidth: 1,
          marginTop: 20,
          borderRadius: 10,
        }}
      />

      {/* {fieldsToShow.length > 0 && (
        <View style={{ marginTop: 40 }}>
          <CustomText
            style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}
          >
            Контактные данные
          </CustomText>

          <View style={{ flexDirection: "column", rowGap: 20 }}>
            {fieldsToShow.includes("Name") && (
              <View>
                <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
                  Имя
                </CustomText>
                <Controller
                  control={control}
                  name="Name"
                  rules={{ required: "Заполните это поле" }}
                  render={({ field }) => (
                    <TextInput
                      placeholder={"Усон"}
                      placeholderTextColor="#616992"
                      onChangeText={(value) => field.onChange(value)}
                      value={field.value}
                      style={{
                        flex: 1,
                        color: "#000",
                        fontSize: 14,
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        paddingVertical: 10,
                        borderColor: errors.Name ? "red" : "#dee2f1",
                      }}
                    />
                  )}
                />
                {errors.Name && (
                  <CustomText
                    style={{ color: "red", fontSize: 12, marginTop: 7 }}
                  >
                    {errors.Name.message}
                  </CustomText>
                )}
              </View>
            )}

            {fieldsToShow.includes("Surname") && (
              <View>
                <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
                  Фамилия
                </CustomText>
                <Controller
                  control={control}
                  name="Surname"
                  rules={{ required: "Заполните это поле" }}
                  render={({ field }) => (
                    <TextInput
                      placeholder={"Асанов"}
                      placeholderTextColor="#616992"
                      onChangeText={(value) => field.onChange(value)}
                      value={field.value}
                      style={{
                        flex: 1,
                        color: "#000",
                        fontSize: 14,
                        borderWidth: 0.5,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        paddingVertical: 15,
                        borderColor: errors.Surname ? "red" : "#dee2f1",
                      }}
                    />
                  )}
                />
                {errors.Surname && (
                  <CustomText
                    style={{ color: "red", fontSize: 12, marginTop: 7 }}
                  >
                    {errors.Surname.message}
                  </CustomText>
                )}
              </View>
            )}

            {fieldsToShow.includes("PhoneNumber") && (
              <View>
                <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
                  Номер телефона
                </CustomText>
                <Controller
                  control={control}
                  name="PhoneNumber"
                  rules={{ required: "Заполните это поле" }}
                  render={({ field }) => (
                    <TextInput
                      placeholder={"+996"}
                      placeholderTextColor="#616992"
                      onChangeText={(value) => field.onChange(value)}
                      value={field.value}
                      style={{
                        flex: 1,
                        color: "#000",
                        fontSize: 14,
                        borderWidth: 0.5,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        paddingVertical: 15,
                        borderColor: errors.PhoneNumber ? "red" : "#dee2f1",
                      }}
                    />
                  )}
                />
                {errors.PhoneNumber && (
                  <CustomText
                    style={{ color: "red", fontSize: 12, marginTop: 7 }}
                  >
                    {errors.PhoneNumber.message}
                  </CustomText>
                )}
              </View>
            )}
          </View>
        </View>
      )} */}
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CustomText
            style={{ fontSize: 16, color: "#616992", fontWeight: 500 }}
          >
            {i18n.t("toPaid")}:
          </CustomText>

          <View style={{ alignItems: "flex-end" }}>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <CustomText
                style={{ fontSize: 18, fontWeight: 500, color: "#4B5DFF" }}
              >
                {`${totalSum} KGS` || "Нет цены"}
              </CustomText>
              <CustomText style={{ fontSize: 18, color: "#4B5DFF" }}>
                /{i18n.t("night")}
              </CustomText>
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 30 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#4B5DFF" />
        ) : (
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={{
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              backgroundColor: "#4B5DFF",
              paddingVertical: 15,
              textAlign: "center",
              borderRadius: 10,
            }}
          >
            <CustomText
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              {i18n.t("book")}
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default ConfirmationScreen;
