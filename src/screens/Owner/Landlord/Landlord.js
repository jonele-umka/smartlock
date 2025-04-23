import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import Ionicons from "react-native-vector-icons/Ionicons";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/core";
import PickImage from "../../../components/PickImage/PickImage";
import ActionLandlord from "../../../components/ActionSheet/ActionLandlord/ActionLandlord";
import CustomText from "../../../components/CustomText/CustomText";
import { fetchMyAccommodations } from "../../../Store/accommodationSlice/accommodationSlice";
import Toast from "react-native-toast-message";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import MapLandlord from "../../../components/Map/MapLandlord";
import {
  fetchAmenities,
  fetchCategory,
  fetchCheckInOut,
  fetchRules,
} from "../../../Store/dictionarySlice/dictionarySlice";
import CustomInput from "../../../components/CustomInput/CustomInput";
import SelectionSection from "../../../components/ActionSheet/ActionLandlord/SelectedSection";
import i18n from "../../../../i18n/i18n";

const categoryIcon = {
  1: require("../../../assets/home.png"),
  2: require("../../../assets/hotel.png"),
  3: require("../../../assets/apartment.png"),
};

const Landlord = () => {
  const [objectDetails, setObjectDetails] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const navigation = useNavigation();
  const API_URL = process.env.API_URL;
  const route = useRoute();

  // action
  const actionSheetRef = useRef();
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);

  // list
  const { amenities, rules, categories, checkInOut } = useSelector(
    (state) => state.dictionary
  );

  // select
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCheckIn, setSelectedCheckIn] = useState([]);
  const [selectedCheckOut, setSelectedCheckOut] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  // more
  const [currentType, setCurrentType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [coordinate, setCoordinate] = useState(null);
  // action
  const openActionSheet = (type) => {
    setCurrentType(type);
    setIsActionSheetVisible(true);
  };
  useEffect(() => {
    if (isActionSheetVisible) {
      actionSheetRef.current?.show();
    } else {
      actionSheetRef.current?.hide();
    }
  }, [isActionSheetVisible]);

  useEffect(() => {
    if (currentType === "amenities") {
      fetchAmenities();
    } else if (currentType === "rules") {
      fetchRules();
    } else if (currentType === "category") {
      fetchCategory();
    } else if (currentType === "checkIn") {
      fetchCheckInOut();
    } else if (currentType === "checkOut") {
      fetchCheckInOut();
    }
  }, [currentType]);

  // fetchObject
  const fetchObjectDetails = async () => {
    if (!route?.params?.id) return;
    setLoading(true);
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
        setObjectDetails(data?.Accommodation);
        setSelectedImages(data?.Accommodation?.Images);
        reset(data?.Accommodation);
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
    if (route.params?.id) {
      fetchObjectDetails();
    }
  }, [route.params?.id]);

  useEffect(() => {
    if (objectDetails) {
      setValue("Title", objectDetails?.Title);
      setValue("CategoryID", objectDetails?.CategoryID);
      setValue("LocationLabel", objectDetails?.LocationLabel);
      // if (objectDetails?.Latitude && objectDetails?.Longitude) {
      //   const newCoordinate = {
      //     latitude: parseFloat(objectDetails.Latitude),
      //     longitude: parseFloat(objectDetails.Longitude),
      //   };
      //   setCoordinate(newCoordinate);
      //   setValue("Latitude", objectDetails?.Latitude);
      //   setValue("Longitude", objectDetails?.Longitude);
      // }
      setValue("Description", objectDetails?.Description);
      setValue("PeopleQuantity", objectDetails?.PeopleQuantity);
      setValue("RoomsQuantity", objectDetails?.RoomsQuantity);
      setValue("City", objectDetails?.City);
      setValue("Country", objectDetails?.Country);
      setValue("Price", objectDetails?.Price);
      setValue("DiscountPrice", objectDetails?.DiscountPrice);
      setValue("Bedrooms", objectDetails?.Bedrooms);
      setValue("Beds", objectDetails?.Beds);
      setValue("Bathrooms", objectDetails?.Bathrooms);
      setSelectedAmenities(
        objectDetails?.Facilities.map((item) => item.ID) || []
      );
      setSelectedRules(objectDetails?.Rules.map((item) => item.ID) || []);
      setSelectedCategory(objectDetails?.CategoryID);
      setSelectedCheckIn(objectDetails?.CheckIn.ID);
      setSelectedCheckOut(objectDetails?.CheckOut.ID);
    }
  }, [objectDetails]);

  // fetchAction

  useEffect(() => {
    dispatch(fetchAmenities());
    dispatch(fetchCategory());
    dispatch(fetchRules());
    dispatch(fetchCheckInOut());
  }, [dispatch]);

  // toggle
  const toggleAmenity = (amenityId) => {
    const updatedAmenities = selectedAmenities.includes(amenityId)
      ? selectedAmenities.filter((item) => item !== amenityId)
      : [...selectedAmenities, amenityId];
    setSelectedAmenities(updatedAmenities);
  };

  const toggleRule = (ruleId) => {
    const updatedRules = selectedRules.includes(ruleId)
      ? selectedRules.filter((item) => item !== ruleId)
      : [...selectedRules, ruleId];
    setSelectedRules(updatedRules);
  };
  const toggleCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  const toggleCheckIn = (id) => {
    setSelectedCheckIn(id);
    if (!selectedCheckOut) {
      setSelectedCheckOut(id);
    }
  };

  const toggleCheckOut = (id) => {
    setSelectedCheckOut(id);
  };

  // name
  const getCategoryNameById = (id, defaultText) => {
    const item = categories.find((category) => category.Id === id);

    return item ? item.Name : defaultText;
  };
  const firstSelectedAmenity = amenities.find((amenity) =>
    selectedAmenities.includes(amenity.Id)
  );
  const amenityValue = firstSelectedAmenity
    ? `${firstSelectedAmenity.Value}...`
    : "";
  const firstSelectedRules = rules.find((rule) =>
    selectedRules.includes(rule.Id)
  );
  const rulesValue = firstSelectedRules ? `${firstSelectedRules.Value}...` : "";
  const getCheckInOutNameById = (id, defaultText) => {
    const item = checkInOut.find((checkInOut) => checkInOut.ID === id);

    return item ? `${item.Value}:00` : defaultText;
  };

  //  images
  const handleProfileUpdate = async (id) => {
    try {
      if (selectedImages.length === 0) {
        return true;
      }

      for (let imageUri of selectedImages) {
        const formData = new FormData();

        const isServerImage = typeof imageUri === "object" && imageUri.ImageUrl;
        if (isServerImage) {
          continue;
        }

        formData.append("image", {
          uri: imageUri,
          name: "image.jpg",
          type: "image/jpeg",
        });

        const response = await fetch(
          `${API_URL}/image/create-accommodation-image/${id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          if (response.status === 413) {
            Toast.show({
              type: "error",
              position: "bottom",
              text1: "Error",
              text2: i18n.t("bigFile"),
              visibilityTime: 3000,
              autoHide: true,
              topOffset: 30,
            });
            return false;
          }

          const errorResponse = await response.json();
          console.log("Failed to upload image:", errorResponse);
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error("Error uploading images", error);
      return false;
    }
  };

  const handleImageSelected = (imageUri) => {
    setSelectedImages([...selectedImages, imageUri]);
  };
  // Функция для удаления изображения
  const handleRemoveImage = async (index) => {
    const imageToRemove = selectedImages[index];

    if (imageToRemove?.ID) {
      try {
        const url = `${API_URL}/image/delete/${route?.params?.id}`;
        const requestBody = JSON.stringify({
          Images: [imageToRemove.ID],
        });

        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: requestBody,
        });

        const responseBody = await response.json();

        if (response.ok) {
          setSelectedImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
          );
        } else {
          console.error("Ошибка при удалении изображения:", responseBody);
        }
      } catch (error) {
        console.error("Ошибка при удалении изображения: ", error);
      }
    } else {
      setSelectedImages((prevImages) =>
        prevImages.filter((_, i) => i !== index)
      );
    }
  };
  // map

  // const getCurrentLocation = async () => {
  //   try {
  //     const { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       Alert.alert("Ошибка", "Разрешите доступ к геолокации");
  //       return;
  //     }

  //     const location = await Location.getCurrentPositionAsync({});
  //     const { latitude, longitude } = location.coords;
  //     setCoordinate({ latitude, longitude });
  //     setValue("Latitude", latitude.toString());
  //     setValue("Longitude", longitude.toString());
  //   } catch (error) {
  //     console.error("Ошибка получения местоположения:", error);
  //   }
  // };

  // useEffect(() => {
  //   getCurrentLocation();
  // }, []);

  // const handleMapRegionChange = (newCoordinate) => {
  //   setCoordinate(newCoordinate);
  //   setValue("Latitude", newCoordinate.latitude.toString());
  //   setValue("Longitude", newCoordinate.longitude.toString());
  // };

  const onSubmit = async (data) => {
    if (
      !selectedCategory ||
      selectedCategory === null ||
      selectedCategory === ""
    ) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: i18n.t("error"),
        text2: i18n.t("selectCategoryError"),
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
      return;
    }
    if (selectedAmenities.length === 0) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: i18n.t("error"),
        text2: i18n.t("selectAmentiesError"),
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
      return;
    }
    if (selectedRules.length === 0) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: i18n.t("error"),
        text2: i18n.t("selectRulesError"),
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
      return;
    }
    if (selectedCheckIn.length === 0) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: i18n.t("error"),
        text2: i18n.t("selectCheckInError"),
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
      return;
    }
    if (selectedCheckOut.length === 0) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: i18n.t("error"),
        text2: i18n.t("selectCheckOutError"),
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
      return;
    }
    if (selectedImages.length < 5) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: i18n.t("error"),
        text2: i18n.t("minFiveImage"),
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
      return;
    }

    const requestBody = {
      Title: data.Title,
      CategoryID: parseInt(selectedCategory),
      LocationLabel: data.LocationLabel,
      // Longitude: data.Longitude,
      // Latitude: data.Latitude,
      Description: data.Description,
      PeopleQuantity: parseInt(data?.PeopleQuantity),
      RoomsQuantity: parseInt(data?.RoomsQuantity),
      Price: parseInt(data.Price),
      DiscountPrice: parseInt(data.DiscountPrice),
      PriceDescription: data.PriceDescription,
      CheckInID: parseInt(selectedCheckIn),
      CheckOutID: parseInt(selectedCheckOut),
      Bedrooms: parseInt(data.Bedrooms),
      Beds: parseInt(data.Beds),
      Bathrooms: parseInt(data.Bathrooms),
      City: data.City,
      Country: data.Country,
      Facilities: selectedAmenities,
      Rules: selectedRules,
    };

    const isEditing = !!route?.params?.id;
    const method = isEditing ? "PATCH" : "POST";
    const url = isEditing
      ? `${API_URL}/accommodation/update/${route.params.id}`
      : `${API_URL}/accommodation/create`;

    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      if (response.ok) {
        const imagesUploaded = await handleProfileUpdate(result.ID);
        setIsLoading(false);

        if (imagesUploaded) {
          if (method === "POST") {
            navigation.navigate("Заявка на подтверждение");
            // Toast.show({
            //   type: "success",
            //   position: "bottom",
            //   text2: i18n.t("createObjectSuccess"),
            //   visibilityTime: 3000,
            //   autoHide: true,
            //   topOffset: 30,
            // });
          } else {
            navigation.navigate("Главная страница");
            Toast.show({
              type: "success",
              position: "bottom",
              text2: i18n.t("editObjectSuccess"),
              visibilityTime: 3000,
              autoHide: true,
              topOffset: 30,
            });
          }

          dispatch(fetchMyAccommodations(token));
        }
      } else {
        console.error("Server Error:", result);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}
    >
      <View
        style={route.params?.id ? { marginBottom: 20 } : { marginBottom: 40 }}
      >
        <View style={{ marginBottom: 20 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
            {i18n.t("addImage")}
          </CustomText>
          <PickImage
            onImageSelected={handleImageSelected}
            renderPicker={({ pickImage }) => (
              <TouchableOpacity
                onPress={() => pickImage()}
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#dee2f1",
                  paddingVertical: 15,
                  paddingHorizontal: 15,
                  borderRadius: 10,
                }}
              >
                <Ionicons
                  name="camera"
                  style={{ fontSize: 50, color: "#4B5DFF" }}
                />
                <View>
                  <CustomText style={{ fontSize: 16, textAlign: "center" }}>
                    {route?.params?.id ? i18n.t("edit") : i18n.t("add")}
                  </CustomText>
                  <CustomText style={{ textAlign: "center", fontSize: 16 }}>
                    {i18n.t("image")}
                  </CustomText>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        {selectedImages.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              columnGap: 20,
              rowGap: 15,
              marginBottom: 20,
            }}
          >
            {selectedImages.map((image, index) => {
              const imageUri =
                typeof image === "string"
                  ? image
                  : typeof image?.ImageUrl === "string"
                  ? `${API_URL}/${image?.ImageUrl}`
                  : "";

              return (
                <View key={index} style={{ position: "relative" }}>
                  {imageUri ? (
                    <Image
                      source={{ uri: imageUri }}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 10,
                        backgroundColor: "#f0f0f0",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CustomText style={{ color: "#999" }}>
                        No Image
                      </CustomText>
                    </View>
                  )}
                  <TouchableOpacity
                    onPress={() => handleRemoveImage(index)}
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: 15,
                      padding: 5,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      size={20}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
        <View style={{ flexDirection: "column", rowGap: 20, marginBottom: 20 }}>
          {/* Title Field */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 16 }}>
              {i18n.t("label_title")}
            </CustomText>
            <Controller
              control={control}
              name="Title"
              rules={{ required: i18n.t("required") }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value ? value.toString() : ""}
                  placeholder={i18n.t("placeholder_title")}
                />
              )}
            />
            {errors.Title && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.Title.message}
              </CustomText>
            )}
          </View>

          {/* Description Field */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 16 }}>
              {i18n.t("label_description")}
            </CustomText>
            <Controller
              control={control}
              name="Description"
              rules={{ required: i18n.t("required") }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  style={{
                    borderColor: "#dee2f1",
                  }}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value ? value.toString() : ""}
                  placeholder={i18n.t("placeholder_description")}
                  multiline
                  numberOfLines={7}
                  textAlignVertical="top"
                />
              )}
            />
            {errors.Description && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.Description.message}
              </CustomText>
            )}
          </View>

          {/* Location Field */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 16 }}>
              {i18n.t("label_location")}
            </CustomText>
            <Controller
              control={control}
              name="LocationLabel"
              rules={{ required: i18n.t("required") }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value ? value.toString() : ""}
                  placeholder={i18n.t("placeholder_location")}
                />
              )}
            />
            {errors.LocationLabel && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.LocationLabel.message}
              </CustomText>
            )}
          </View>

          {/* Country Field */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 16 }}>
              {i18n.t("label_country")}
            </CustomText>
            <Controller
              control={control}
              name="Country"
              rules={{ required: i18n.t("required") }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value ? value.toString() : ""}
                  placeholder={i18n.t("placeholder_country")}
                />
              )}
            />
            {errors.Country && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.Country.message}
              </CustomText>
            )}
          </View>

          {/* City Field */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 16 }}>
              {i18n.t("label_city")}
            </CustomText>
            <Controller
              control={control}
              name="City"
              rules={{ required: i18n.t("required") }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value ? value.toString() : ""}
                  placeholder={i18n.t("placeholder_city")}
                />
              )}
            />
            {errors.City && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.City.message}
              </CustomText>
            )}
          </View>

          {/* Price Field */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 16 }}>
              {i18n.t("label_price")}
            </CustomText>
            <Controller
              control={control}
              name="Price"
              rules={{
                required: i18n.t("required"),
                validate: (value) =>
                  parseFloat(value) >= 500 || i18n.t("error_min_price"),
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9.]/g, "");
                    onChange(numericValue);
                  }}
                  value={value ? value.toString() : ""}
                  placeholder={i18n.t("placeholder_price")}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.Price && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.Price.message}
              </CustomText>
            )}
          </View>

          {/* DiscountPrice Field */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 16 }}>
              {i18n.t("label_discount_price")}
            </CustomText>
            <Controller
              control={control}
              name="DiscountPrice"
              rules={{
                validate: (value) =>
                  parseFloat(value) >= 500 || i18n.t("error_min_price"),
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9.]/g, "");
                    onChange(numericValue);
                  }}
                  value={value ? value.toString() : ""}
                  placeholder={i18n.t("placeholder_discount_price")}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.DiscountPrice && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.DiscountPrice.message}
              </CustomText>
            )}
          </View>

          {/* PeopleQuantity Field */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 16 }}>
              {i18n.t("label_people_quantity")}
            </CustomText>
            <Controller
              control={control}
              name="PeopleQuantity"
              rules={{ required: i18n.t("required") }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9.]/g, "");
                    onChange(numericValue);
                  }}
                  value={value ? value.toString() : ""}
                  placeholder={i18n.t("placeholder_people_quantity")}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.PeopleQuantity && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.PeopleQuantity.message}
              </CustomText>
            )}
          </View>

          {/* RoomsQuantity Field */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 16 }}>
              {i18n.t("label_rooms_quantity")}
            </CustomText>
            <Controller
              control={control}
              name="RoomsQuantity"
              rules={{ required: i18n.t("required") }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9.]/g, "");
                    onChange(numericValue);
                  }}
                  value={value ? value.toString() : ""}
                  placeholder={i18n.t("placeholder_rooms_quantity")}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.RoomsQuantity && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.RoomsQuantity.message}
              </CustomText>
            )}
          </View>

          {/* Bedrooms Field */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 16 }}>
              {i18n.t("label_bedrooms")}
            </CustomText>
            <Controller
              control={control}
              name="Bedrooms"
              rules={{ required: i18n.t("required") }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9.]/g, "");
                    onChange(numericValue);
                  }}
                  value={value ? value.toString() : ""}
                  placeholder={i18n.t("placeholder_bedrooms")}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.Bedrooms && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.Bedrooms.message}
              </CustomText>
            )}
          </View>

          {/* Bathrooms Field */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 16 }}>
              {i18n.t("label_bathrooms")}
            </CustomText>
            <Controller
              control={control}
              name="Bathrooms"
              rules={{ required: i18n.t("required") }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9.]/g, "");
                    onChange(numericValue);
                  }}
                  value={value ? value.toString() : ""}
                  placeholder={i18n.t("placeholder_bathrooms")}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.Bathrooms && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.Bathrooms.message}
              </CustomText>
            )}
          </View>

          {/* Beds Field */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 16 }}>
              {i18n.t("label_beds")}
            </CustomText>
            <Controller
              control={control}
              name="Beds"
              rules={{ required: i18n.t("required") }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9.]/g, "");
                    onChange(numericValue);
                  }}
                  value={value ? value.toString() : ""}
                  placeholder={i18n.t("placeholder_beds")}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.Beds && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.Beds.message}
              </CustomText>
            )}
          </View>
        </View>
        {/* <Image
          source={{ uri: categories[0]?.icon }}
          style={{ width: 30, height: 30 }}
        /> */}
        {/* <View style={{ marginBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <View style={{ flex: 1 }}>
              <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
                {i18n.t("location")} ({i18n.t("latitude")})
              </CustomText>
              <View>
                <Controller
                  control={control}
                  name="Latitude"
                  rules={{ required: i18n.t("required") }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{
                        borderWidth: 1,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        borderColor: errors.Latitude ? "red" : "#dee2f1",
                        color: "#1C2863",
                        fontSize: 14,
                      }}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value ? value.toString() : ""}
                      underlineColorAndroid="transparent"
                      placeholder="32.32423243"
                      placeholderTextColor="#616992"
                      keyboardType="numeric"
                    />
                  )}
                />
              </View>
              {errors.Latitude && (
                <CustomText style={{ color: "red", marginTop: 7 }}>
                  {errors.Latitude.message}
                </CustomText>
              )}
            </View>

            <View style={{ flex: 1 }}>
              <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
                {i18n.t("location")} ({i18n.t("longitude")})
              </CustomText>
              <View>
                <Controller
                  control={control}
                  name="Longitude"
                  rules={{ required: i18n.t("required") }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{
                        borderWidth: 1,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        borderColor: errors.Longitude ? "red" : "#dee2f1",
                        color: "#1C2863",
                        fontSize: 14,
                      }}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value ? value.toString() : ""}
                      underlineColorAndroid="transparent"
                      placeholder="32.32423243"
                      placeholderTextColor="#616992"
                      keyboardType="numeric"
                    />
                  )}
                />
              </View>
              {errors.Longitude && (
                <CustomText style={{ color: "red", marginTop: 7 }}>
                  {errors.Longitude.message}
                </CustomText>
              )}
            </View>
          </View>
        </View> */}
        {/* {coordinate ? (
              <MapLandlord
                coordinate={coordinate}
                handleMapRegionChange={handleMapRegionChange}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CustomText>Загрузка местоположения...</CustomText>
              </View>
            )} */}

        <View style={{ flex: 1, marginBottom: 20 }}>
          <SelectionSection
            title={i18n.t("categories")}
            placeholder={i18n.t("place_categories")}
            selectedValue={getCategoryNameById(
              selectedCategory,
              i18n.t("place_categories")
            )}
            onPress={() => openActionSheet("category")}
          />
          {/* <Controller
            control={control}
            name="Categories"
            rules={{ required: i18n.t("required") }}
            render={() => (
              <View>
                <SelectionSection
                  title={i18n.t("categories")}
                  placeholder={i18n.t("place_categories")}
                  selectedValue={getCategoryNameById(
                    selectedCategory,
                    i18n.t("place_categories")
                  )}
                  onPress={() => openActionSheet("category")}
                />
                {errors.Categories && (
                  <CustomText style={{ color: "red", marginTop: 7 }}>
                    {errors.Categories.message}
                  </CustomText>
                )}
              </View>
            )}
          /> */}
        </View>

        <View style={{ flex: 1, marginBottom: 20 }}>
          <SelectionSection
            title={i18n.t("amenities")}
            placeholder={i18n.t("place_amenities")}
            selectedValue={firstSelectedAmenity ? amenityValue : ""}
            onPress={() => openActionSheet("amenities")}
          />
          {/* <Controller
            control={control}
            name="Facilities"
            rules={{ required: i18n.t("required") }}
            render={() => (
              <View>
                <SelectionSection
                  title={i18n.t("amenities")}
                  placeholder={i18n.t("place_amenities")}
                  selectedValue={
                    firstSelectedAmenity ? firstSelectedAmenity.Value : ""
                  }
                  onPress={() => openActionSheet("amenities")}
                />
                {errors.Facilities && (
                  <CustomText style={{ color: "red", marginTop: 7 }}>
                    {errors.Facilities.message}
                  </CustomText>
                )}
              </View>
            )}
          /> */}
        </View>

        <View style={{ flex: 1, marginBottom: 20 }}>
          <SelectionSection
            title={i18n.t("rules")}
            placeholder={i18n.t("place_rules")}
            selectedValue={firstSelectedRules ? rulesValue : ""}
            onPress={() => openActionSheet("rules")}
          />
          {/* <Controller
            control={control}
            name="Rules"
            rules={{ required: i18n.t("required") }}
            render={() => (
              <View>
                <SelectionSection
                  title={i18n.t("rules")}
                  placeholder={i18n.t("place_rules")}
                  selectedValue={
                    firstSelectedRules ? firstSelectedRules.Value : ""
                  }
                  onPress={() => openActionSheet("rules")}
                />
                {errors.Rules && (
                  <CustomText style={{ color: "red", marginTop: 7 }}>
                    {errors.Rules.message}
                  </CustomText>
                )}
              </View>
            )}
          /> */}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 20,
          }}
        >
          {/* <SelectionSection
            title={i18n.t("entryTime")}
            placeholder={i18n.t("entryTime")}
            selectedValue={getCheckInOutNameById(
              selectedCheckIn,
              i18n.t("entryTime")
            )}
            onPress={() => openActionSheet("checkIn")}
          /> */}
          <View style={{ flex: 1 }}>
            <SelectionSection
              title={i18n.t("entryTime")}
              placeholder={i18n.t("entryTime")}
              selectedValue={getCheckInOutNameById(
                selectedCheckIn,
                i18n.t("entryTime")
              )}
              onPress={() => openActionSheet("checkIn")}
            />
            {/* <Controller
              control={control}
              name="CheckInID"
              rules={{ required: i18n.t("required") }}
              render={() => (
                <View>
                  <SelectionSection
                    title={i18n.t("entryTime")}
                    placeholder={i18n.t("entryTime")}
                    selectedValue={getCheckInOutNameById(
                      selectedCheckIn,
                      i18n.t("entryTime")
                    )}
                    onPress={() => openActionSheet("checkIn")}
                  />
                  {errors.CheckInID && (
                    <CustomText style={{ color: "red", marginTop: 7 }}>
                      {errors.CheckInID.message}
                    </CustomText>
                  )}
                </View>
              )}
            /> */}
          </View>
          <View style={{ flex: 1 }}>
            <SelectionSection
              title={i18n.t("departureTime")}
              placeholder={i18n.t("departureTime")}
              selectedValue={getCheckInOutNameById(
                selectedCheckOut,
                i18n.t("departureTime")
              )}
              onPress={() => openActionSheet("checkOut")}
            />
            {/* <Controller
              control={control}
              name="CheckOutID"
              rules={{ required: i18n.t("required") }}
              render={() => (
                <View>
                  <SelectionSection
                    title={i18n.t("departureTime")}
                    placeholder={i18n.t("departureTime")}
                    selectedValue={getCheckInOutNameById(
                      selectedCheckOut,
                      i18n.t("departureTime")
                    )}
                    onPress={() => openActionSheet("checkOut")}
                  />
                  {errors.CheckOutID && (
                    <CustomText style={{ color: "red", marginTop: 7 }}>
                      {errors.CheckOutID.message}
                    </CustomText>
                  )}
                </View>
              )}
            /> */}
          </View>
          {/* <SelectionSection
            title={i18n.t("departureTime")}
            placeholder={i18n.t("departureTime")}
            selectedValue={getCheckInOutNameById(
              selectedCheckOut,
              i18n.t("departureTime")
            )}
            onPress={() => openActionSheet("checkOut")}
          /> */}
        </View>
      </View>
      {route.params?.id && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Замок", { id: route.params?.id });
          }}
          style={{ marginBottom: 20 }}
        >
          <CustomText
            style={{
              color: "#005fb8",
              fontSize: 16,
              marginTop: 10,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            {i18n.t("locks")}
          </CustomText>
        </TouchableOpacity>
      )}
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color={"#4B5DFF"} />
        ) : (
          <TouchableOpacity
            style={{
              padding: 15,
              borderRadius: 10,
              shadowColor: "#000",
              backgroundColor: "#4B5DFF",
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
              {i18n.t("save")}
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
      <ActionLandlord
        actionSheetRef={actionSheetRef}
        currentType={currentType}
        setIsActionSheetVisible={setIsActionSheetVisible}
        amenitiesList={amenities}
        selectedAmenities={selectedAmenities}
        rulesList={rules}
        selectedRules={selectedRules}
        categoryList={categories}
        selectedCategory={selectedCategory}
        checkInOutList={checkInOut}
        selectedCheckIn={selectedCheckIn}
        selectedCheckOut={selectedCheckOut}
        categoryIcon={categoryIcon}
        toggleAmenity={toggleAmenity}
        toggleCategory={toggleCategory}
        toggleRule={toggleRule}
        toggleCheckIn={toggleCheckIn}
        toggleCheckOut={toggleCheckOut}
      />
    </ScrollView>
  );
};

export default Landlord;
