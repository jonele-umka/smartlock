import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import i18n from "../i18n/i18n";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Slider, CheckBox } from "@rneui/themed";
import Calendar from "../Calendar/Calendar";
import Person from "../Person/Person";

export default function Search({ handleSheetChanges }) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const API_URL = process.env.API_URL;

  const navigation = useNavigation();
  const onSubmit = () => {
    navigation.navigate("Результаты поиска");
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      contentContainerStyle={{ paddingVertical: 20 }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "#000", fontSize: 20 }}>
          {i18n.t("searchHotel")}
        </Text>
        <TouchableOpacity onPress={() => handleSheetChanges()}>
          <Ionicons name="close" size={30} />
        </TouchableOpacity>
      </View>

      <View>
        <Controller
          control={control}
          name="hotel"
          rules={{ required: true }}
          render={({ field }) => (
            <TextInput
              placeholder={`${i18n.t("city")}, ${i18n.t("hotel")}`}
              placeholderTextColor="#b8b8b8"
              onChangeText={field.onChange}
              value={field.value}
              style={{
                color: "#000",
                fontSize: 14,
                borderWidth: 1,
                borderColor: "#b8b8b8",
                paddingVertical: Platform.OS === "android" ? 10 : 15,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
            />
          )}
        />
        {errors.hotel && (
          <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
            {i18n.t("enterEmail")}
          </Text>
        )}
      </View>

      <View style={{ marginVertical: 20 }}>
        <Calendar />
      </View>

      <View>
        <Person />
      </View>

      <TouchableOpacity
        onPress={onSubmit}
        style={{
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          marginTop: 20,
        }}
      >
        <LinearGradient
          colors={["#02AAB0", "#00CDAC"]}
          style={{
            paddingVertical: 15,
            textAlign: "center",
            borderRadius: 10,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 20,
            }}
          >
            {i18n.t("search")}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}
