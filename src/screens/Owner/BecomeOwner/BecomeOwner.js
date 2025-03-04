import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";

import SafeAreaWrapper from "../../../components/SafeAreaWrapper/SafeAreaWrapper";
import { ownerFields } from "../../../assets/data/Fields";
import { FormatDatePassport } from "../../../components/FormatDate/FormatDatePassport";
import CustomText from "../../../components/CustomText/CustomText";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomPicker from "../../../components/CustomPicker/CustomPicker"; // Подключаем универсальный Picker
import Toast from "react-native-toast-message";
import i18n from "../../../components/i18n/i18n";

const BecomeOwner = () => {
  const API_URL = process.env.API_URL;
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/be_owner`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setLoading(false);
        navigation.navigate("Заявка на подтверждение");
      } else {
        const errorResponse = await response.json();

        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error",
          text2: `${i18n.t("errorWrite")}: ${errorResponse.error.Error}`,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Ошибка при отправке запроса:", error.Error);
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: "#fff", flex: 1 }}
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
                      <CustomPicker
                        items={[
                          { label: "AN", value: "AN" },
                          { label: "ID", value: "ID" },
                        ]}
                        selectedValue={value}
                        onValueChange={onChange}
                        placeholder="Выберите тип паспорта"
                      />
                    );
                  } else {
                    return (
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
                    );
                  }
                }}
              />
            </View>
          ))}
        </View>
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginTop: 40, marginBottom: 30 }}
            color={"#4B5DFF"}
          />
        ) : (
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={{
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              marginTop: 30,
              backgroundColor: "#4B5DFF",
              paddingVertical: 15,
              textAlign: "center",
              borderRadius: 10,
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
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default BecomeOwner;
