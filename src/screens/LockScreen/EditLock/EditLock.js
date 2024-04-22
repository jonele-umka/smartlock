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

const EditLock = () => {
  const navigation = useNavigation();
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;
  const { control, handleSubmit, errors } = useForm();
  const [data, setData] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://server.microret.com:80/lock", {
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
    fetchData();
  }, []);

  const handleSave = async (data) => {
    const requestBody = {
      LockID: 1,
      KeyboardPwd: parseInt(data.KeyboardPwd),
      KeyboardPwdName: data.KeyboardPwdName,
      KeyboardPwdType: 3,
      StartDate: 1713768194466,
      EndDate: 1714633032059,
      AddType: 2,
    };
    setSaveLoading(true);
    try {
      const response = await fetch("http://server.microret.com:80/passcode/", {
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
    setDeleteLoading(true);
    try {
      const response = await fetch(
        `http://server.microret.com:80/passcode/${ID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setDeleteLoading(false);

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
        setDeleteLoading(false);

        console.error("Ошибка при удалении пин кода:", response.status);
      }
    } catch (error) {
      setDeleteLoading(false);

      console.error("Ошибка при отправке запроса:", error);
    }
  };

  return (
    <SafeAreaWrapper
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
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
          {/* <View style={{ marginBottom: 20 }}>
            <TimePin />
          </View> */}
        </View>
        {saveLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity
            onPress={() => {
              handleSubmit(handleSave);
            }}
            style={{
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              marginTop: 30,
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
      </View>
      <ScrollView>
        <Text>Все пароли:</Text>
        {data.map((item, index) => (
          <View key={index} style={{ flexDirection: "column", rowGap: 20 }}>
            {item.Passcodes.map((passcode, passcodeIndex) => (
              <View
                key={passcodeIndex}
                style={{
                  backgroundColor: "rgba(0,0,0,0.4)",
                  padding: 10,
                  flexDirection: "column",
                  rowGap: 10,
                }}
              >
                <View>
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 20,
                      marginBottom: 5,
                    }}
                  >
                    KeyboardPwdName:
                  </Text>
                  <Text style={{ color: "#fff" }}>
                    {passcode.KeyboardPwdName}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 20,
                      marginBottom: 5,
                    }}
                  >
                    KeyboardPwd:
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                    }}
                  >
                    {passcode.KeyboardPwd}
                  </Text>
                </View>
                {deleteLoading ? (
                  <ActivityIndicator size="large" color="#8c0000" />
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
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      Удалить пин код
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default EditLock;
