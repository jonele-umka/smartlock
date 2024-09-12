import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Ionicons from "react-native-vector-icons/Ionicons";
import CalendarDatePassport from "../../../components/Calendars/CalendarDatePassport/CalendarDatePassport";
import { useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import CustomText from "../../../components/CustomText/CustomText";

const EditOwner = () => {
  const { control, handleSubmit, setValue, watch } = useForm();
  const [showCalendar, setShowCalendar] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const [currentField, setCurrentField] = useState(null);
  const [DateOfIssue, setDateOfIssue] = useState(null);
  const [DateOfExpiry, setDateOfExpiry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = process.env.API_URL;
  const token = useSelector((state) => state.auth.token);
  const navigation = useNavigation();

  const onSubmit = async (data) => {
    const requestData = {
      ...data,
      DateOfIssue: watch("DateOfIssue"),
      DateOfExpiry: watch("DateOfExpiry"),
    };

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/be_owner`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsLoading(false);
        navigation.navigate("Главная страница");
        console.log("Успешно отправлено:", result);
      } else {
        setIsLoading(false);
        console.error("Ошибка сервера:", result);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Ошибка:", error);
    }
  };

  const handleCalendarDateChange = (date) => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      setValue(currentField, formattedDate);
      if (currentField === "DateOfBirth") {
        setBirthDate(date);
      } else if (currentField === "DateOfIssue") {
        setDateOfIssue(date);
      } else if (currentField === "DateOfExpiry") {
        setDateOfExpiry(date);
      }
      setShowCalendar(false);
    }
  };

  const handleShowCalendar = (field) => {
    setCurrentField(field);
    setShowCalendar(true);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}
    >
      <View style={{ flexDirection: "column", rowGap: 20, marginBottom: 40 }}>
        <View style={{ flex: 1 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 16 }}>
            Фамилия
          </CustomText>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholderTextColor={"#616992"}
                placeholder="Фамилия"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  borderColor: "#dee2f1",
                  fontSize: 14,
                  paddingVertical: 10,
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  color: "#1C2863",
                  fontSize: 14,
                }}
              />
            )}
            name="Surname"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 16 }}>
            Имя
          </CustomText>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholderTextColor={"#616992"}
                placeholder="Имя"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  borderColor: "#dee2f1",
                  fontSize: 14,
                  paddingVertical: 10,
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  color: "#1C2863",
                  fontSize: 14,
                }}
              />
            )}
            name="Name"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>

        <View style={{ flex: 1 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 16 }}>
            Отчество
          </CustomText>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholderTextColor={"#616992"}
                placeholder="Отчество"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  borderColor: "#dee2f1",
                  fontSize: 14,
                  paddingVertical: 10,
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  color: "#1C2863",
                  fontSize: 14,
                }}
              />
            )}
            name="Patronymic"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 16 }}>
            Национальность
          </CustomText>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholderTextColor={"#616992"}
                placeholder="Национальность"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  borderColor: "#dee2f1",
                  fontSize: 14,
                  paddingVertical: 10,
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  color: "#1C2863",
                  fontSize: 14,
                }}
              />
            )}
            name="Nationality"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>

        <View style={{ flex: 1 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 16 }}>
            Дата рождения
          </CustomText>
          <TouchableOpacity onPress={() => handleShowCalendar("DateOfBirth")}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 10,
                borderColor: "#dee2f1",
                fontSize: 14,
                paddingVertical: 10,
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
            >
              <Ionicons
                name="calendar-outline"
                style={{ color: "#616992", fontSize: 25 }}
              />
              <CustomText>
                {birthDate
                  ? new Date(birthDate).toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })
                  : "Выберите дату"}
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 16 }}>
            Место рождения
          </CustomText>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholderTextColor={"#616992"}
                placeholder="Место рождения"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  borderColor: "#dee2f1",
                  fontSize: 14,
                  paddingVertical: 10,
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  color: "#1C2863",
                  fontSize: 14,
                }}
              />
            )}
            name="PlaceOfBirth"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>

        <View style={{ flex: 1 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 16 }}>
            ID номер паспорта
          </CustomText>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholderTextColor={"#616992"}
                keyboardType="numeric"
                placeholder="ID номер паспорта"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  borderColor: "#dee2f1",
                  fontSize: 14,
                  paddingVertical: 10,
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  color: "#1C2863",
                  fontSize: 14,
                }}
              />
            )}
            name="IDPassportType"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 16 }}>
            Номер документа
          </CustomText>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholderTextColor={"#616992"}
                keyboardType="numeric"
                placeholder="Номер документа"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  borderColor: "#dee2f1",
                  fontSize: 14,
                  paddingVertical: 10,
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  color: "#1C2863",
                  fontSize: 14,
                }}
              />
            )}
            name="DocumentNumber"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>

        <View style={{ flex: 1 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
            ИНН
          </CustomText>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="numeric"
                placeholder="Персональный номер"
                placeholderTextColor={"#616992"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  borderColor: "#dee2f1",
                  fontSize: 14,
                  paddingVertical: 10,
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  color: "#1C2863",
                  fontSize: 14,
                }}
              />
            )}
            name="Pin"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>

        <View style={{ flex: 1 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
            Орган выдачи
          </CustomText>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Орган выдачи"
                placeholderTextColor={"#616992"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  borderColor: "#dee2f1",
                  fontSize: 14,
                  paddingVertical: 10,
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  color: "#1C2863",
                  fontSize: 14,
                }}
              />
            )}
            name="Authority"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>

        <View>
          <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
            Дата выдачи
          </CustomText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: 10,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                columnGap: 10,
                borderColor: "#dee2f1",
                fontSize: 14,
                paddingVertical: 10,
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 10,
                color: "#1C2863",
                fontSize: 14,
              }}
              onPress={() => handleShowCalendar("DateOfIssue")}
            >
              <Ionicons
                name="calendar-outline"
                style={{ color: "#616992", fontSize: 25 }}
              />
              <CustomText>
                {DateOfIssue
                  ? new Date(DateOfIssue).toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })
                  : "Выберите дату"}
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                columnGap: 10,
                borderColor: "#dee2f1",
                fontSize: 14,
                paddingVertical: 10,
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 10,
                color: "#1C2863",
                fontSize: 14,
              }}
              onPress={() => handleShowCalendar("DateOfExpiry")}
            >
              <Ionicons
                name="calendar-outline"
                style={{ color: "#616992", fontSize: 25 }}
              />
              <CustomText>
                {DateOfExpiry
                  ? new Date(DateOfExpiry).toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })
                  : "Выберите дату"}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color={"#4B5DFF"} />
        ) : (
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={{
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              paddingVertical: 15,
              textAlign: "center",
              borderRadius: 10,
              backgroundColor: "#4B5DFF",
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              Сохранить
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {showCalendar && (
        <CalendarDatePassport
          handleCalendarDateChange={handleCalendarDateChange}
          showCalendar={showCalendar}
          dateOfIssue={DateOfIssue}
          dateOfExpiry={DateOfExpiry}
        />
      )}
    </ScrollView>
  );
};

export default EditOwner;
