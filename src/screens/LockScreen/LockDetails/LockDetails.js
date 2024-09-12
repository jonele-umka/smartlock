import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaWrapper from "../../../components/SafeAreaWrapper/SafeAreaWrapper";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/core";
import Lock from "../../../Locks/Lock/Lock";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import CustomText from "../../../components/CustomText/CustomText";

const LockDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const API_URL = process.env.API_URL;
  const token = useSelector((state) => state.auth.token);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  const handleDelete = async (ID) => {
    console.log(ID);
    setDeleteLoadingId(ID);
    try {
      const response = await fetch(`${API_URL}/passcode/${ID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/lock/${route?.params?.id}`, {
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
        console.error("Error fetching lock details:", errorMessage);
        return;
      }

      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching lock details", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: "#fff", flex: 1 }}
      contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }}
    >
      <SafeAreaWrapper>
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginTop: 40 }}
            color={"#4B5DFF"}
          />
        ) : (
          <View>
            {/* <Text
              style={{
                color: "#000",
                fontSize: 30,
                marginBottom: 25,
              }}
            >
              Детали замка
            </Text> */}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <CustomText
                style={{
                  fontWeight: 500,
                  fontSize: 22,
                }}
              >
                Название замка:{" "}
              </CustomText>
              <CustomText style={{ fontWeight: 500, fontSize: 18 }}>
                {data?.LockAlias}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 40,
              }}
            >
              <CustomText style={{ fontSize: 16 }}>Супер код: </CustomText>
              <CustomText style={{ fontWeight: 500, fontSize: 16 }}>
                {data?.NoKeyPwd}
              </CustomText>
            </View>
            <Lock id={data?.ID} />

            <CustomText
              style={{
                fontWeight: 500,
                fontSize: 22,
                marginTop: 40,
                marginBottom: 15,
              }}
            >
              Все пароли:
            </CustomText>
            <View style={{ marginBottom: 20 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Редактировать замок", { id: data?.ID });
                }}
                style={{
                  elevation: 5,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  backgroundColor: "#4B5DFF",
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}
              >
                <CustomText
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  Создать новый пароль
                </CustomText>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "column", rowGap: 20 }}>
              {data?.Passcodes && data.Passcodes.length > 0 ? (
                data.Passcodes.slice()
                  .reverse()
                  .map((passcode) => (
                    <View
                      key={passcode.ID}
                      style={{
                        backgroundColor: "rgba(75,93,255, 0.2)",
                        borderRadius: 10,
                        padding: 10,
                        columnGap: 15,
                      }}
                    >
                      <View
                        style={{
                          padding: 20,
                          backgroundColor: "#fff",
                          borderRadius: 10,
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            rowGap: 15,
                            marginBottom: 20,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              columnGap: 10,
                            }}
                          >
                            <CustomText style={{ fontSize: 16 }}>
                              ФИО:
                            </CustomText>
                            <CustomText
                              style={{ fontWeight: "500", fontSize: 16 }}
                            >
                              {passcode?.Booking?.Name}{" "}
                              {passcode?.Booking?.Name}
                            </CustomText>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              columnGap: 10,
                            }}
                          >
                            <CustomText style={{ fontSize: 16 }}>
                              Название пин кода:
                            </CustomText>
                            <CustomText
                              style={{ fontWeight: "500", fontSize: 16 }}
                            >
                              {passcode?.KeyboardPwdName}
                            </CustomText>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              columnGap: 10,
                            }}
                          >
                            <CustomText style={{ fontSize: 16 }}>
                              Пароль:
                            </CustomText>
                            <CustomText
                              style={{ fontWeight: "500", fontSize: 16 }}
                            >
                              {passcode?.KeyboardPwd}
                            </CustomText>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              columnGap: 10,
                            }}
                          >
                            <CustomText style={{ fontSize: 16 }}>
                              Начало:
                            </CustomText>
                            <CustomText
                              style={{ fontWeight: "500", fontSize: 16 }}
                            >
                              {passcode?.StartDate}
                            </CustomText>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              columnGap: 10,
                            }}
                          >
                            <CustomText style={{ fontSize: 16 }}>
                              Конец:
                            </CustomText>
                            <CustomText
                              style={{ fontWeight: "500", fontSize: 16 }}
                            >
                              {passcode?.EndDate}
                            </CustomText>
                          </View>
                        </View>
                        <View style={{ alignSelf: "flex-end" }}>
                          {isDeleteLoading(passcode.ID) ? (
                            <ActivityIndicator size="small" color={"#4B5DFF"} />
                          ) : (
                            <TouchableOpacity
                              onPress={() => handleDelete(passcode.ID)}
                              style={{
                                backgroundColor: "red",
                                padding: 5,
                                borderRadius: 5,
                                flexDirection: "row",
                                alignItems: "center",
                                columnGap: 5,
                              }}
                            >
                              <CustomText
                                style={{
                                  color: "#fff",
                                  fontSize: 16,
                                  fontWeight: "500",
                                }}
                              >
                                Удалить
                              </CustomText>
                              <MaterialCommunityIcons
                                name={"delete"}
                                style={{ color: "#fff", fontSize: 20 }}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </View>
                  ))
              ) : (
                <Text>Нет доступных паролей</Text>
              )}
            </View>
          </View>
        )}
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default LockDetails;
