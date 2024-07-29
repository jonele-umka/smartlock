import {
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Slider, CheckBox } from "@rneui/themed";
// import Person from "../../components/Person/Person";
import RNPickerSelect from "react-native-picker-select";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/core";
import i18n from "../../components/i18n/i18n";
import { ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import ActionSheet from "react-native-actions-sheet";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import Objects from "../../components/ObjectsComponent/Objects";
const SearchResults = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const API_URL = process.env.API_URL;

  const navigation = useNavigation();
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setpPriceRange] = useState(0);
  const [rating, setRating] = useState(3);
  const actionSheetRef = useRef();

  const interpolate = (start, end) => {
    let k = (priceRange - 0) / 10;
    return Math.ceil((1 - k) * start + k * end) % 256;
  };
  useEffect(() => {
    fetchAmenities();
    fetchCategory();
  }, []);

  const fetchAmenities = async () => {
    try {
      const response = await fetch(`${API_URL}/dictionary/facility`);
      const data = await response.json();
      setAmenitiesList(data);
    } catch (error) {
      console.error("Ошибка получения данных:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await fetch(`${API_URL}/dictionary/category`);
      const data = await response.json();
      setCategoryList(data);
    } catch (error) {
      console.error("Ошибка получения данных:", error);
    }
  };

  const onSubmit = (data) => {
    // Логика для отправки данных формы
    console.log(data);
    navigation.navigate("Результаты поиска", {
      ...data,
      priceRange,
      rating,
      selectedAmenities,
      selectedCategory,
    });
  };
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
      }}
      contentContainerStyle={{ paddingVertical: 20 }}
    >
      <SafeAreaWrapper>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 25 }}>Результаты поиска</Text>
          <TouchableOpacity onPress={() => actionSheetRef.current?.show()}>
            <Ionicons name="filter" style={{ fontSize: 30 }} />
          </TouchableOpacity>
        </View>
        <Objects />
      </SafeAreaWrapper>
      <ActionSheet
        ref={actionSheetRef}
        gestureEnabled={true}
        initialOffsetFromBottom={0.5}
        bounceOnOpen={true}
        closable={true}
      >
        <ScrollView
          style={{ paddingHorizontal: 10, backgroundColor: "#fff" }}
          contentContainerStyle={{ paddingVertical: 20 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 25 }}>Результаты поиска</Text>
            <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
              <Entypo name="cross" style={{ fontSize: 30 }} />
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 40 }}>
            <Text style={{ fontSize: 20 }}>Цена</Text>
            <Slider
              value={priceRange}
              onValueChange={setpPriceRange}
              minimumValue={0}
              maximumValue={1000}
              step={10}
              allowTouchTrack
              trackStyle={{ height: 10 }}
              thumbStyle={{ height: 20, width: 20, backgroundColor: "#02AAB0" }}
              minimumTrackTintColor="#02AAB0"
              maximumTrackTintColor="#b8b8b8"
            />
            <Text>{`${priceRange[0]} - ${priceRange[1]} $`}</Text>
          </View>
          <View style={{ marginBottom: 40 }}>
            <Text style={{ fontSize: 20 }}>Рейтинг</Text>
            <Slider
              value={rating}
              onValueChange={setRating}
              minimumValue={1}
              maximumValue={5}
              step={1}
              allowTouchTrack
              trackStyle={{ height: 10 }}
              thumbStyle={{ height: 20, width: 20, backgroundColor: "#02AAB0" }}
              minimumTrackTintColor="#02AAB0"
              maximumTrackTintColor="#b8b8b8"
            />
            <Text>{`${rating} звезды`}</Text>
          </View>
          <View style={{ marginBottom: 40 }}>
            <Text style={{ marginBottom: 10 }}>Тип жилья</Text>
            <View
              style={{
                backgroundColor: "#f0f0f0",
                borderRadius: 10,
                padding: Platform.OS === "ios" ? 15 : 0,
              }}
            >
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <RNPickerSelect
                    itemKey="value"
                    placeholder={{
                      label: "Выберите тип жилья",
                      value: null,
                      color: "gray",
                    }}
                    onValueChange={(value) => setSelectedCategory(value)}
                    items={categoryList.map((category) => ({
                      label: category.Name,
                      value: category.ID,
                    }))}
                    value={selectedCategory}
                  />
                )}
              />
            </View>
          </View>
          <View>
            <Text
              onPress={() => actionSheetRef.current?.hide()}
              style={{ marginBottom: 10, fontSize: 20 }}
            >
              Удобства
            </Text>
            {amenitiesList.map((amenity) => (
              <View
                key={amenity.ID}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 10,
                  marginBottom: 10,
                }}
              >
                <CheckBox
                  checked={selectedAmenities.includes(amenity.ID)}
                  onPress={() => {
                    toggleAmenity(amenity.ID);
                    console.log(amenity.ID);
                  }}
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  size={30}
                  checkedColor="#02AAB0"
                  containerStyle={{
                    margin: 0,
                    padding: 0,
                    marginLeft: 0,
                    marginRight: 0,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 8,
                  }}
                >
                  <Image
                    source={{ uri: amenity.Icon }}
                    style={{ width: 30, height: 30 }}
                  />
                  <Text>{amenity.Value}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </ActionSheet>
    </ScrollView>
  );
};

export default SearchResults;
