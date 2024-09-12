import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";

import ActionDateTime from "../../../components/ActionSheet/ActionDateTime/ActionDateTimePin";
import { useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import CustomText from "../../../components/CustomText/CustomText";
import { formatDate } from "../../../components/FormatDate/FormatDate";

const EditLock = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const route = useRoute();
  const token = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [passcodeType, setPasscodeType] = useState(1); // Default to 1 (Permanent code)

  const dateTimeSheetRef = useRef(null);
  const [dateType, setDateType] = useState("");

  const API_URL = process.env.API_URL;

  const onSubmit = async (data) => {
    const requestBody = {
      LockID: route?.params?.id,
      KeyboardPwdName: data.KeyboardPwdName,
      KeyboardPwd: data.KeyboardPwd,
      PasscodeTypeId: parseInt(passcodeType, 10),
      StartDate: passcodeType === 2 ? String(startDate) : null,
      EndDate: passcodeType === 2 ? String(endDate) : null,
    };

    console.log("Request Body:", requestBody);

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/passcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log("Response result:", result);

      if (response.ok) {
        Toast.show({
          type: "success",
          position: "top",
          text1: "Пин код успешно создан",
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
        navigation.navigate("Замок");
      } else {
        console.error("Server Error:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openDateTimeSheet = (type) => {
    setDateType(type);
    dateTimeSheetRef.current?.show();
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }}
    >
      <View style={{ marginBottom: 40 }}>
        <CustomText style={{ fontSize: 30, marginBottom: 25 }}>
          Создать пин код
        </CustomText>

        <View style={{ marginBottom: 20 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
            Тип пин кода
          </CustomText>
          <RNPickerSelect
            onValueChange={(value) => setPasscodeType(value)}
            items={[
              { label: "Постоянный код", value: 1 },
              { label: "Временный код", value: 2 },
            ]}
            value={passcodeType}
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
        </View>

        <View style={{ marginBottom: 20 }}>
          <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
            Название пин кода
          </CustomText>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={{
                  borderWidth: 1,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  borderColor: errors.KeyboardPwdName ? "red" : "#dee2f1",
                  color: "#1C2863",
                  fontSize: 14,
                }}
                placeholder="User"
                placeholderTextColor="grey"
                value={value}
                onChangeText={onChange}
              />
            )}
            name="KeyboardPwdName"
            defaultValue=""
            rules={{ required: "Заполните поле" }}
          />
          {errors.KeyboardPwdName && (
            <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
              {errors.KeyboardPwdName.message}
            </CustomText>
          )}
        </View>

        <View>
          <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
            Новый пин код
          </CustomText>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={{
                  borderWidth: 1,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  borderColor: errors.KeyboardPwd ? "red" : "#dee2f1",
                  color: "#1C2863",
                  fontSize: 14,
                }}
                keyboardType="numeric"
                placeholder="****"
                placeholderTextColor="grey"
                value={value}
                onChangeText={(text) => {
                  if (text.length <= 4) {
                    onChange(text);
                  }
                }}
                maxLength={4}
              />
            )}
            name="KeyboardPwd"
            defaultValue=""
            rules={{ required: "Заполните поле" }}
          />
          {errors.KeyboardPwd && (
            <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
              {errors.KeyboardPwd.message}
            </CustomText>
          )}
        </View>

        {passcodeType === 2 && (
          <>
            <View style={{ marginBottom: 20, marginTop: 20 }}>
              <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
                Дата начала
              </CustomText>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  borderColor: "#dee2f1",
                  color: "#1C2863",
                  fontSize: 14,
                }}
                onPress={() => openDateTimeSheet("start")}
              >
                <CustomText style={{ textAlign: "center", fontSize: 16 }}>
                  {startDate
                    ? formatDate(startDate)
                    : "Выберите дату и время начала"}
                </CustomText>
              </TouchableOpacity>
            </View>

            <View>
              <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
                Дата конца
              </CustomText>

              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  borderColor: "#dee2f1",
                  color: "#1C2863",
                  fontSize: 14,
                }}
                onPress={() => openDateTimeSheet("end")}
              >
                <CustomText style={{ textAlign: "center", fontSize: 16 }}>
                  {endDate
                    ? formatDate(endDate)
                    : "Выберите дату и время окончания"}
                </CustomText>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={"#4B5DFF"} />
      ) : (
        <TouchableOpacity
          style={{
            paddingVertical: 15,
            borderRadius: 10,
            textAlign: "center",
            backgroundColor: "#4B5DFF",
          }}
          onPress={handleSubmit(onSubmit)}
        >
          <CustomText
            style={{ color: "#fff", textAlign: "center", fontSize: 20 }}
          >
            Сохранить
          </CustomText>
        </TouchableOpacity>
      )}
      <ActionDateTime
        actionSheetRef={dateTimeSheetRef}
        dateType={dateType}
        onSelectDateTime={(date) => {
          if (dateType === "start") {
            setStartDate(date);
          } else {
            setEndDate(date);
          }
        }}
      />
    </ScrollView>
  );
};

export default EditLock;
