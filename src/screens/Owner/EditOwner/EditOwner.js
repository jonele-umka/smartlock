import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import RNPickerSelect from "react-native-picker-select";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../../components/CustomText/CustomText";
import Toast from "react-native-toast-message";

const EditOwner = () => {
  const { control, handleSubmit, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const API_URL = process.env.API_URL;
  const token = useSelector((state) => state.auth.token);
  const navigation = useNavigation();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setLoading(false);

        const responseDataError = await response.json();
        const errorMessage =
          responseDataError.error.Message || "Произошла ошибка";
        console.error("Error updating user profile:", errorMessage);
        return;
      }

      const result = await response.json();
      setData(result?.Profile?.Passport);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setValue("Name", data?.Name);
      setValue("Surname", data?.Surname);
      setValue("Patronymic", data?.Patronymic);
      setValue("Nationality", data?.Nationality);
      setValue("DateOfBirth", data?.DateOfBirth);
      setValue("DocumentNumber", data?.DocumentNumber);
      setValue("DateOfExpiry", data?.DateOfExpiry);
      setValue("PlaceOfBirth", data?.PlaceOfBirth);
      setValue("Authority", data?.Authority);
      setValue("DateOfIssue", data?.DateOfIssue);
      setValue("PIN", data?.PIN);
      setValue("IDPassportType", data?.IDPassportType);
    }
  }, [data]);

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/be_owner`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setIsLoading(false);
        navigation.navigate("Главная страница");
      } else {
        setIsLoading(false);
        console.error("Ошибка сервера:", result);
        Toast.show({
          type: "error",
          position: "top",
          text1: "Ошибка",
          text2: result.error.Error,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Ошибка:", error);
    }
  };

  const formatDate = (text) => {
    const cleaned = text.replace(/[^0-9]/g, ""); // Убираем все символы, кроме цифр

    let formattedText = cleaned;

    if (cleaned.length > 4 && cleaned.length <= 6) {
      // Если длина больше 4, но меньше 6 — добавляем дефис между годом и месяцем
      formattedText = `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
    } else if (cleaned.length > 6) {
      // Если длина больше 6 — добавляем дефисы между годом, месяцем и днём
      formattedText = `${cleaned.slice(0, 4)}-${cleaned.slice(
        4,
        6
      )}-${cleaned.slice(6, 8)}`;
    }

    return formattedText;
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
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}
    >
      <View style={{ flexDirection: "column", rowGap: 20, marginBottom: 40 }}>
        <View style={{ flex: 1 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
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
            rules={{ required: "Заполните это поле" }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
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
            rules={{ required: "Заполните это поле" }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
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
            rules={{ required: "Заполните это поле" }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
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
            rules={{ required: "Заполните это поле" }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
            Дата рождения
          </CustomText>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholderTextColor={"#616992"}
                placeholder="1996-10-02"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={(text) => onChange(formatDate(text))}
                value={value}
                maxLength={10}
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
            name="DateOfBirth"
            rules={{ required: "Заполните это поле" }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
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
            rules={{ required: "Заполните это поле" }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
            Тип паспорта
          </CustomText>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <RNPickerSelect
                placeholder={{
                  label: "Выберите тип паспорта",
                  value: null,
                  color: "#616992",
                }}
                onValueChange={(value) => onChange(value)}
                items={[
                  { label: "AN", value: "AN" },
                  { label: "ID", value: "ID" },
                ]}
                value={value}
                style={{
                  inputAndroid: {
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    color: "#1C2863",
                    fontSize: 14,
                    backgroundColor: "#dee2f1",
                  },
                  inputIOS: {
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    color: "#1C2863",
                    fontSize: 14,
                    backgroundColor: "#dee2f1",
                  },
                }}
              />
            )}
            name="IDPassportType"
            rules={{ required: "Заполните это поле" }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
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
            rules={{ required: "Заполните это поле" }}
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
            rules={{ required: "Заполните это поле" }}
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
            rules={{ required: "Заполните это поле" }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            columnGap: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              Дата выдачи
            </CustomText>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholderTextColor={"#616992"}
                  placeholder="2013-02-23"
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(formatDate(text))}
                  value={value}
                  maxLength={10}
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
              name="DateOfIssue"
              rules={{ required: "Заполните это поле" }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              Дата окончания
            </CustomText>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholderTextColor={"#616992"}
                  placeholder="2023-02-23"
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(formatDate(text))}
                  value={value}
                  maxLength={10}
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
              name="DateOfExpiry"
              rules={{ required: "Заполните это поле" }}
            />
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
    </ScrollView>
  );
};

export default EditOwner;
