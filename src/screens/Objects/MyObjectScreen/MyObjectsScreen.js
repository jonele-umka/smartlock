import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import MyObjects from "../../../components/ObjectsComponent/MyObjects";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAccommodations } from "../../../Store/accommodationSlice/accommodationSlice";

const MyObjectsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  const myStatus = useSelector((state) => state.accommodation?.myStatus);
  const myError = useSelector((state) => state.accommodation?.myError);
  const myAccommodations = useSelector(
    (state) => state.accommodation?.myAccommodations
  );
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchMyAccommodations(token));
    }
  }, [dispatch, token]);

  if (myStatus === "loading") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (myStatus === "failed") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {myError}</Text>
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
            backgroundColor: "#f0f0f0",
            paddingVertical: 15,
            paddingHorizontal: 15,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <Entypo name="plus" style={{ fontSize: 50 }} />
          <View>
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              Добавить объект
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "column", rowGap: 20 }}>
          {myAccommodations
            .slice()
            .reverse()
            .map((myAccommodation) => (
              <MyObjects
                key={myAccommodation.ID}
                myAccommodation={myAccommodation}
              />
            ))}
        </View>
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default MyObjectsScreen;
