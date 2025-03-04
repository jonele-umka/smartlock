import React, { useRef } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "../../i18n/i18n";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomText from "../../CustomText/CustomText";
import {
  fetchAmenities,
  fetchCategory,
  fetchRules,
} from "../../../Store/dictionarySlice/dictionarySlice";
import { useDispatch } from "react-redux";

const ActionLanguage = ({ language, setLanguage }) => {
  const actionSheetRef = useRef();
  const dispatch = useDispatch();

  const changeLanguage = async (newLanguage) => {
    try {
      await AsyncStorage.setItem("language", newLanguage);
      setLanguage(newLanguage);

      // Обновляем глобальный язык
      Localization.locale = newLanguage;
      i18n.locale = newLanguage;

      actionSheetRef.current?.hide();
      dispatch(fetchAmenities());
      dispatch(fetchRules());
      dispatch(fetchCategory());
    } catch (error) {
      console.error("Ошибка при сохранении языка в AsyncStorage:", error);
    }
  };

  const showActionSheet = () => {
    actionSheetRef.current?.show();
  };

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
                style={{ width: 30, height: 30, objectFit: "contain" }}
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
                {language === "ky" && (
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
                style={{ width: 30, height: 30 }}
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
                {language === "en" && (
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
                style={{ width: 30, height: 30 }}
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
                {language === "ru" && (
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

      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 15,
        }}
        onPress={showActionSheet}
      >
        <CustomText style={{ fontSize: 16 }}>{i18n.t("language")}</CustomText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {language === "ky" && (
            <CustomText style={{ color: "grey" }}>Кыргызча</CustomText>
          )}
          {language === "en" && (
            <CustomText style={{ color: "grey" }}>English</CustomText>
          )}
          {language === "ru" && (
            <CustomText style={{ color: "grey" }}>Русский</CustomText>
          )}

          <Icon name={"chevron-right"} size={20} color={"#1C2863"} />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ActionLanguage;
