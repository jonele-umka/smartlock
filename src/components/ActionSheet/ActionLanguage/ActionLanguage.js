import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomText from "../../CustomText/CustomText";
import {
  fetchAmenities,
  fetchCategory,
  fetchRules,
} from "../../../Store/dictionarySlice/dictionarySlice";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../../Store/languageSlice/languageSlice";

const ActionLanguage = ({ actionSheetRef }) => {
  const dispatch = useDispatch();

  const changeLanguage = async (newLanguage) => {
    dispatch(setLanguage(newLanguage));
    actionSheetRef.current?.hide();
    dispatch(fetchAmenities());
    dispatch(fetchRules());
    dispatch(fetchCategory());
  };
  const language = useSelector((state) => state.language.language);
  const shortLanguage = language.includes("-")
    ? language.split("-")[0]
    : language;

  return (
    <>
      <ActionSheet ref={actionSheetRef}>
        <View
          style={{
            flexDirection: "column",
            rowGap: 20,
            paddingHorizontal: 10,
            paddingVertical: 20,
            backgroundColor: "#fff",
          }}
        >
          <TouchableOpacity onPress={() => changeLanguage("ky")}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                  objectFit: "cover",
                }}
                source={require("../../../assets/Country/kyrgyzstan.png")}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 10,
                }}
              >
                <CustomText>Кыргызча</CustomText>
                {shortLanguage === "ky" && (
                  <Ionicons
                    name="checkmark"
                    style={{ color: "#4B5DFF", fontSize: 20 }}
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeLanguage("en")}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                  objectFit: "cover",
                }}
                source={require("../../../assets/Country/united-kingdom.png")}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 10,
                }}
              >
                <CustomText>English</CustomText>
                {shortLanguage === "en" && (
                  <Ionicons
                    name="checkmark"
                    style={{ color: "#4B5DFF", fontSize: 20 }}
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeLanguage("ru")}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                  objectFit: "cover",
                }}
                source={require("../../../assets/Country/russia.png")}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 10,
                }}
              >
                <CustomText>Русский</CustomText>
                {shortLanguage === "ru" && (
                  <Ionicons
                    name="checkmark"
                    style={{ color: "#4B5DFF", fontSize: 20 }}
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </>
  );
};

export default ActionLanguage;
