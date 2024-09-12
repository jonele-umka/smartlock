import {
  View,
  Text,
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
  categoryIcon,
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
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
              {currentType === "amenities" && "Удобства"}
              {currentType === "rules" && "Порядок проживания"}
              {currentType === "category" && "Категории"}

              {currentType === "checkIn" && "Время въезда"}
              {currentType === "checkOut" && "Время выезда"}
            </Text>
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
            {currentType === "amenities" &&
              amenitiesList.map((amenity) => (
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
                      source={{ uri: amenity.Icon }}
                      style={{ width: 30, height: 30 }}
                    />
                    <Text>{amenity.Value}</Text>
                  </View>
                </View>
              ))}
            {currentType === "rules" &&
              rulesList.map((rule) => (
                <View
                  key={rule.ID}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 10,
                    marginBottom: 10,
                  }}
                >
                  <CheckBox
                    checked={selectedRules.includes(rule.ID)}
                    onPress={() => {
                      toggleRule(rule.ID);
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
                      source={{ uri: rule.Icon }}
                      style={{ width: 30, height: 30 }}
                    />
                    <Text>{rule.Value}</Text>
                  </View>
                </View>
              ))}
            {currentType === "category" &&
              categoryList.map((category) => (
                <TouchableOpacity
                  key={category.ID}
                  onPress={() => {
                    toggleCategory(category.ID);
                    setIsActionSheetVisible(false);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginBottom: 10,
                    backgroundColor:
                      selectedCategory === category.ID ? "#f0f0f0" : "#fff",
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor:
                      selectedCategory === category.ID ? "#4B5DFF" : "#f0f0f0",
                  }}
                >
                  <Image
                    source={categoryIcon[category.ID]}
                    style={{ width: 30, height: 30 }}
                  />
                  <Text style={{ marginLeft: 8 }}>{category.Name}</Text>
                </TouchableOpacity>
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
                    <Text>{checkIn.Name}</Text>
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
                      toggleCheckOut(checkOut.ID);
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
                    <Text>{checkOut.Name}</Text>
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
