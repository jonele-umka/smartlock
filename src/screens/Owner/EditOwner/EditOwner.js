import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../../components/CustomText/CustomText";
import Toast from "react-native-toast-message";
import { ownerFields } from "../../../assets/data/Fields";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { FormatDatePassport } from "../../../components/FormatDate/FormatDatePassport";
import SafeAreaWrapper from "../../../components/SafeAreaWrapper/SafeAreaWrapper";
import CustomPicker from "../../../components/CustomPicker/CustomPicker"; // Import CustomPicker
import i18n from "../../../components/i18n/i18n";

const EditOwner = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
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
        const errorMessage = responseDataError.error || "Произошла ошибка";

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
          position: "bottom",
          text1: "Error",
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
      <SafeAreaWrapper>
        <View style={{ flexDirection: "column", rowGap: 20, marginBottom: 40 }}>
          {ownerFields.map((field) => (
            <View key={field.name}>
              <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
                {field.label}
              </CustomText>
              <Controller
                control={control}
                name={field.name}
                rules={{ required: `Заполните поле ${field.label}` }}
                render={({ field: { onChange, onBlur, value } }) => {
                  if (field.name === "IDPassportType") {
                    return (
                      <>
                        <CustomPicker
                          items={[
                            { label: "AN", value: "AN" },
                            { label: "ID", value: "ID" },
                          ]}
                          selectedValue={value}
                          onValueChange={onChange}
                          placeholder={i18n.t("enterPassportType")}
                        />
                        {errors[field.name] && (
                          <Text style={{ color: "red", marginTop: 5 }}>
                            {errors[field.name].message}
                          </Text>
                        )}
                      </>
                    );
                  } else {
                    return (
                      <>
                        <CustomInput
                          value={value}
                          onChange={(text) =>
                            field.name.includes("Date")
                              ? onChange(FormatDatePassport(text))
                              : onChange(text)
                          }
                          placeholder={field.placeholder}
                          onBlur={onBlur}
                          keyboardType={
                            field.name.includes("Date") ? "numeric" : "default"
                          }
                        />
                        {errors[field.name] && (
                          <Text style={{ color: "red", marginTop: 5 }}>
                            {errors[field.name].message}
                          </Text>
                        )}
                      </>
                    );
                  }
                }}
              />
            </View>
          ))}
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
                {i18n.t("save")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default EditOwner;
