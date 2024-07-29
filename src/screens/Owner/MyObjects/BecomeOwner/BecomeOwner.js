import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { LinearGradient } from "expo-linear-gradient";

const BecomeOwner = () => {
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;
  const API_URL = process.env.API_URL;
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    console.log(data);
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
        const result = await response.json();
        navigation.navigate("Главная страница");
      } else {
        const errorResponse = await response.json();
        console.log(errorResponse.error || "Произошла ошибка");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Ошибка при изменении email:", error);
    }
  };
  return (
    <ScrollView
      style={{ backgroundColor: "#fff", flex: 1 }}
      contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}
    >
      <SafeAreaWrapper>
        <View
          style={{
            flexDirection: "column",
            rowGap: 15,
            marginBottom: 20,
            backgroundColor: "#f3f3f3",
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderRadius: 10,
          }}
        >
          <View>
            <Text style={{ marginBottom: 10 }}>Имя</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    paddingVertical: Platform.OS === "android" ? 10 : 15,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="Усон"
                  value={value}
                  onChangeText={(text) => onChange(text)}
                />
              )}
              name="Name"
              defaultValue=""
            />
          </View>
          <View>
            <Text style={{ marginBottom: 10 }}>Фамилия</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    paddingVertical: Platform.OS === "android" ? 10 : 15,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="Асанов"
                  value={value}
                  onChangeText={(text) => onChange(text)}
                />
              )}
              name="Surname"
              defaultValue=""
            />
          </View>
          <View>
            <Text style={{ marginBottom: 10 }}>Отчество</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    paddingVertical: Platform.OS === "android" ? 10 : 15,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="Асанович"
                  value={value}
                  onChangeText={(text) => onChange(text)}
                />
              )}
              name="Patronymic"
              defaultValue=""
            />
          </View>
          <View>
            <Text style={{ marginBottom: 10 }}>Национальность</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    paddingVertical: Platform.OS === "android" ? 10 : 15,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="Кыргыз"
                  value={value}
                  onChangeText={(text) => onChange(text)}
                />
              )}
              name="Nationality"
              defaultValue=""
            />
          </View>
          <View>
            <Text style={{ marginBottom: 10 }}>День рождения</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    paddingVertical: Platform.OS === "android" ? 10 : 15,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="2000-01-01"
                  value={value}
                  onChangeText={(text) => onChange(text)}
                />
              )}
              name="DateOfBirth"
              defaultValue=""
            />
          </View>
          <View>
            <Text style={{ marginBottom: 10 }}>Тип паспорта</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    paddingVertical: Platform.OS === "android" ? 10 : 15,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="ID/AN"
                  value={value}
                  onChangeText={(text) => onChange(text)}
                />
              )}
              name="IDPassportType"
              defaultValue=""
            />
          </View>
          <View>
            <Text style={{ marginBottom: 10 }}>Серийный номер</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    paddingVertical: Platform.OS === "android" ? 10 : 15,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="0293444"
                  value={value}
                  onChangeText={(text) => onChange(text)}
                />
              )}
              name="DocumentNumber"
              defaultValue=""
            />
          </View>

          <View>
            <Text style={{ marginBottom: 10 }}>Место рождения</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    paddingVertical: Platform.OS === "android" ? 10 : 15,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="Бишкек"
                  value={value}
                  onChangeText={(text) => onChange(text)}
                />
              )}
              name="PlaceOfBirth"
              defaultValue=""
            />
          </View>
          <View>
            <Text style={{ marginBottom: 10 }}>Орган выдачи</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    paddingVertical: Platform.OS === "android" ? 10 : 15,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="MKK 201110"
                  value={value}
                  onChangeText={(text) => onChange(text)}
                />
              )}
              name="Authority"
              defaultValue=""
            />
          </View>
          <View>
            <Text style={{ marginBottom: 10 }}>Дата выдачи</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    paddingVertical: Platform.OS === "android" ? 10 : 15,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="2018-23-05"
                  value={value}
                  onChangeText={(text) => onChange(text)}
                />
              )}
              name="DateOfIssue"
              defaultValue=""
            />
          </View>

          <View>
            <Text style={{ marginBottom: 10 }}>Дата истечения срока</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    paddingVertical: Platform.OS === "android" ? 10 : 15,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="2028-23-05"
                  value={value}
                  onChangeText={(text) => onChange(text)}
                />
              )}
              name="DateOfExpiry"
              defaultValue=""
            />
          </View>
          <View>
            <Text style={{ marginBottom: 10 }}>Pin</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    paddingVertical: Platform.OS === "android" ? 10 : 15,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="2200001013443"
                  value={value}
                  onChangeText={(text) => onChange(text)}
                />
              )}
              name="Pin"
              defaultValue=""
            />
          </View>
        </View>
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginTop: 40, marginBottom: 30 }}
            color={"#000"}
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
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default BecomeOwner;
