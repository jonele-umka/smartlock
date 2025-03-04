import {
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import React from "react";
import ActionSheet from "react-native-actions-sheet";
import { CheckBox } from "@rneui/base";
import SafeAreaWrapper from "../../SafeAreaWrapper/SafeAreaWrapper";
import Entypo from "react-native-vector-icons/Entypo";
import CustomText from "../../CustomText/CustomText";
import i18n from "../../i18n/i18n";

const ActionLandlord = ({
  actionSheetRef,
  currentType,
  setIsActionSheetVisible,
  amenitiesList,
  selectedAmenities,
  rulesList,
  selectedRules,
  categoryList,
  selectedCategory,
  checkInOutList,
  selectedCheckIn,
  selectedCheckOut,
  toggleAmenity,
  toggleCategory,
  toggleRule,
  toggleCheckIn,
  toggleCheckOut,
}) => {
  return (
    <SafeAreaWrapper>
      <ActionSheet
        ref={actionSheetRef}
        onClose={() => setIsActionSheetVisible(false)}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CustomText style={{ fontSize: 18, marginBottom: 10 }}>
              {currentType === "amenities" && i18n.t("facilities")}
              {currentType === "rules" && i18n.t("rules")}
              {currentType === "category" && i18n.t("categories")}

              {currentType === "checkIn" && i18n.t("entryTime")}
              {currentType === "checkOut" && i18n.t("departureTime")}
            </CustomText>
            <TouchableOpacity onPress={() => setIsActionSheetVisible(false)}>
              <Entypo name="cross" style={{ fontSize: 30 }} />
            </TouchableOpacity>
          </View>
          <ScrollView
            contentContainerStyle={{
              paddingTop: 10,
              paddingBottom: Platform.OS === "ios" ? 40 : 20,
            }}
          >
            {currentType === "category" &&
              categoryList.map((category) => (
                <TouchableOpacity
                  key={category.Id}
                  onPress={() => {
                    toggleCategory(category.Id);
                    setIsActionSheetVisible(false);
                  }}
                  style={{
                    marginBottom: 10,
                    backgroundColor:
                      selectedCategory === category.Id ? "#f0f0f0" : "#fff",
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor:
                      selectedCategory === category.Id ? "#4B5DFF" : "#f0f0f0",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 8,
                    }}
                  >
                    <Image
                      source={{ uri: category?.Icon }}
                      style={{ width: 20, height: 20, objectFit: "contain" }}
                    />
                    <CustomText>{category?.Name}</CustomText>
                  </View>
                </TouchableOpacity>
              ))}

            {currentType === "rules" &&
              rulesList.map((rule) => (
                <View
                  key={rule.Id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 10,
                    marginBottom: 10,
                  }}
                >
                  <CheckBox
                    checked={selectedRules.includes(rule.Id)}
                    onPress={() => {
                      toggleRule(rule.Id);
                    }}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    size={30}
                    checkedColor="#4B5DFF"
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
                      source={{ uri: rule?.Icon }}
                      style={{ width: 20, height: 20, objectFit: "contain" }}
                    />
                    <CustomText>{rule?.Value}</CustomText>
                  </View>
                </View>
              ))}
            {currentType === "amenities" &&
              amenitiesList.map((amenity) => (
                <View
                  key={amenity.Id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 10,
                    marginBottom: 10,
                  }}
                >
                  <CheckBox
                    checked={selectedAmenities.includes(amenity.Id)}
                    onPress={() => {
                      toggleAmenity(amenity.Id);
                    }}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    size={30}
                    checkedColor="#4B5DFF"
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
                      source={{ uri: amenity?.Icon }}
                      style={{ width: 20, height: 20, objectFit: "contain" }}
                    />
                    <CustomText>{amenity?.Value}</CustomText>
                  </View>
                </View>
              ))}
            {currentType === "checkIn" &&
              checkInOutList.map((checkIn) => (
                <View
                  key={checkIn.ID}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 10,
                    marginBottom: 10,
                  }}
                >
                  <CheckBox
                    checked={selectedCheckIn === checkIn.ID}
                    onPress={() => {
                      toggleCheckIn(checkIn.ID);
                      setIsActionSheetVisible(false);
                    }}
                    iconType="material-community"
                    checkedIcon="radiobox-marked"
                    uncheckedIcon="radiobox-blank"
                    size={30}
                    checkedColor="#4B5DFF"
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
                    <CustomText>{checkIn.Name}</CustomText>
                  </View>
                </View>
              ))}

            {currentType === "checkOut" &&
              checkInOutList.map((checkOut) => (
                <View
                  key={checkOut.ID}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 10,
                    marginBottom: 10,
                  }}
                >
                  <CheckBox
                    checked={selectedCheckOut === checkOut.ID}
                    onPress={() => {
                      toggleCheckOut(checkOut.id);
                      setIsActionSheetVisible(false);
                    }}
                    iconType="material-community"
                    checkedIcon="radiobox-marked"
                    uncheckedIcon="radiobox-blank"
                    size={30}
                    checkedColor="#4B5DFF"
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
                    <CustomText>{checkOut.Name}</CustomText>
                  </View>
                </View>
              ))}
          </ScrollView>
        </View>
      </ActionSheet>
    </SafeAreaWrapper>
  );
};

export default ActionLandlord;
