import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
// import TimePin from "../../../components/DateTimePin/TimePin";
import DatePin from "../../../components/DateTimePin/DatePin";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TimePin from "../../../components/DateTimePin/TimePin";

const EditLock = () => {
  const navigation = useNavigation();
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;
  const { control, handleSubmit, errors } = useForm();
  const [data, setData] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);

  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const fetchData = async () => {
    try {
      const response = await fetch("https://server.microret.com/lock", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
        // Здесь вы можете обработать полученные данные
      } else {
        console.error("Ошибка при получении данных:", response.status);
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (data) => {
    console.log(data);
    const requestBody = {
      LockID: 1,
      KeyboardPwd: parseInt(data.KeyboardPwd),
      KeyboardPwdName: data.KeyboardPwdName,
      KeyboardPwdType: 3,
      StartDate: 1715750268596,
      EndDate: 1715815206000,
      AddType: 2,
    };
    setSaveLoading(true);
    try {
      const response = await fetch("https://server.microret.com/passcode/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setSaveLoading(false);
        console.log("Пин код успешно создан");
        Toast.show({
          type: "success",
          position: "top",
          text1: "Пин код успешно создан",
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
        navigation.navigate("Замок номера");
      } else {
        console.error("Ошибка при создании пин кода:", response.status);
        setSaveLoading(false);
      }
    } catch (error) {
      setSaveLoading(false);
      console.error("Ошибка при отправке запроса:", error);
    }
  };
  const handleDelete = async (ID) => {
    setDeleteLoadingId(ID);

    try {
      const response = await fetch(
        `https://server.microret.com/passcode/${ID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        fetchData();

        setDeleteLoadingId(null);

        Toast.show({
          type: "success",
          position: "top",
          text1: "Пин код успешно удален",
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
        // navigation.navigate("Замок номера");
      } else {
        setDeleteLoadingId(null);

        console.error("Ошибка при удалении пин кода:", response.status);
      }
    } catch (error) {
      setDeleteLoadingId(null);

      console.error("Ошибка при отправке запроса:", error);
    }
  };
  const isDeleteLoading = (ID) => {
    return deleteLoadingId === ID;
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaWrapper>
        <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
          <View style={{ marginBottom: 20 }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ marginBottom: 10, fontSize: 18 }}>
                Создать пин код
              </Text>
              <View>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={{
                        borderWidth: 1,
                        borderColor: "#b8b8b8",
                        padding: 10,
                        borderRadius: 10,
                      }}
                      underlineColorAndroid="transparent"
                      placeholder="****"
                      placeholderTextColor="grey"
                      value={value}
                      onChangeText={(text) => {
                        // Ограничиваем ввод до 4 символов
                        if (text.length <= 4) {
                          onChange(text);
                        }
                      }}
                      maxLength={4} // Ограничиваем максимальную длину ввода до 4 символов
                    />
                  )}
                  name="KeyboardPwd" // Имя поля в данных формы
                  defaultValue="" // Начальное значение
                  rules={{ required: true }} // Правила валидации (обязательное поле)
                />
              </View>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ marginBottom: 10, fontSize: 18 }}>
                Название пин кода
              </Text>
              <View>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={{
                        borderWidth: 1,
                        borderColor: "#b8b8b8",
                        padding: 10,
                        borderRadius: 10,
                      }}
                      underlineColorAndroid="transparent"
                      placeholder="User"
                      placeholderTextColor="grey"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                  onChangeText={(text) => onChange(text)}
                  name="KeyboardPwdName" // Имя поля в данных формы
                  defaultValue="" // Начальное значение
                  rules={{ required: true }} // Правила валидации (обязательное поле)
                />
              </View>
            </View>
            <View style={{ marginBottom: 20 }}>
              <DatePin />
            </View>
            <View>
              <TimePin />
            </View>
          </View>
          {saveLoading ? (
            <ActivityIndicator size="large" color="#02AAB0" />
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(handleSave)}
              style={{
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
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
                  Сохранить
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                color: "#000",
                fontWeight: 600,
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              Все пароли:
            </Text>
            {data.map((item, index) => (
              <View key={index} style={{ flexDirection: "column", rowGap: 20 }}>
                {item.Passcodes.map((passcode, passcodeIndex) => (
                  <View
                    key={passcodeIndex}
                    style={{
                      backgroundColor: "rgba(0,0,0,0.4)",
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        rowGap: 5,
                        marginBottom: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          columnGap: 5,
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                          }}
                        >
                          Название замка:
                        </Text>
                        <Text
                          style={{
                            color: "#fff",
                          }}
                        >
                          {passcode.KeyboardPwdName}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          columnGap: 5,
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                          }}
                        >
                          Пароль:
                        </Text>
                        <Text
                          style={{
                            color: "#fff",
                          }}
                        >
                          {passcode.KeyboardPwd}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          columnGap: 5,
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                          }}
                        >
                          Дата создания:
                        </Text>
                        <Text
                          style={{
                            color: "#fff",
                          }}
                        >
                          {passcode.CreatedAt}
                        </Text>
                      </View>
                    </View>

                    {isDeleteLoading(passcode.ID) ? (
                      <ActivityIndicator
                        size="large"
                        color="#8c0000"
                        style={{ alignSelf: "flex-end" }}
                      />
                    ) : (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#8c0000",
                          alignSelf: "flex-end",
                          padding: 10,
                          borderRadius: 10,
                        }}
                        onPress={() => handleDelete(passcode.ID)}
                      >
                        <MaterialCommunityIcons
                          name="delete"
                          color={"#fff"}
                          size={20}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default EditLock;
