import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { CheckBox } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
const Landlord = () => {
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Ошибка при выборе изображения", error);
    }
  };
  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}
    >
      <SafeAreaWrapper style={{ paddingBottom: 50 }}>
        <View style={{ marginBottom: 20 }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>
              Загрузите фото
            </Text>

            <TouchableOpacity
              onPress={pickImage}
              style={{
                flexDirection: "column",
                alignItems: "center",
                columnGap: 10,
                backgroundColor: "#f0f0f0",
                paddingVertical: 15,
                paddingHorizontal: 15,
                borderRadius: 10,
              }}
            >
              <Ionicons name="camera" style={{ fontSize: 50 }} />
              <View>
                <Text style={{ fontSize: 16, textAlign: "center" }}>
                  Добавить
                </Text>
                <Text style={{ fontSize: 16, textAlign: "center" }}>
                  изображение
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>Категория</Text>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: "#f0f0f0",
                paddingVertical: 15,
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  columnGap: 5,
                }}
              >
                <Text style={{ fontSize: 16 }}>Выбрать</Text>
                <Icon
                  name={"chevron-right"}
                  size={18}
                  color={"#000"}
                  style={{ paddingTop: 3 }}
                />
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>Название</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#b8b8b8",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <TextInput
                style={{
                  fontSize: 16,
                  padding: 5,
                }}
                underlineColorAndroid="transparent"
                placeholder="Отель Smart-lock"
                placeholderTextColor="grey"
              />
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>Описание</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#b8b8b8",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <TextInput
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                  fontSize: 16,
                }}
                underlineColorAndroid="transparent"
                placeholder="Сдаю 2х комнатную квартиру"
                placeholderTextColor="grey"
                textAlignVertical="top"
                numberOfLines={7}
                multiline={true}
              />
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>Страна</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#b8b8b8",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <TextInput
                style={{
                  fontSize: 16,
                  padding: 5,
                }}
                underlineColorAndroid="transparent"
                placeholder="Кыргызстан"
                placeholderTextColor="grey"
              />
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>Город</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#b8b8b8",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <TextInput
                style={{
                  fontSize: 16,
                  padding: 5,
                }}
                underlineColorAndroid="transparent"
                placeholder="Бишкек"
                placeholderTextColor="grey"
              />
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>
              Номер телефона
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#b8b8b8",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <TextInput
                style={{
                  fontSize: 16,
                  padding: 5,
                }}
                underlineColorAndroid="transparent"
                placeholder="+996"
                placeholderTextColor="grey"
              />
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>Удобства</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#b8b8b8",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <TextInput
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                  fontSize: 16,
                }}
                underlineColorAndroid="transparent"
                placeholder="Wi-Fi, парковка и т.д."
                placeholderTextColor="grey"
                textAlignVertical="top"
                numberOfLines={4}
                multiline={true}
              />
            </View>
          </View>
          <View>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>
              Порядок проживания
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#b8b8b8",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <TextInput
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                  fontSize: 16,
                }}
                underlineColorAndroid="transparent"
                placeholder="Время въезда/выезда"
                placeholderTextColor="grey"
                textAlignVertical="top"
                numberOfLines={4}
                multiline={true}
              />
            </View>
          </View>
          {/* <CheckBox
            center
            checkedIcon={
              <Icon
                name="radio-button-checked"
                type="material"
                color="green"
                size={25}
                iconStyle={{ marginRight: 10 }}
              />
            }
            uncheckedIcon={
              <Icon
                name="radio-button-unchecked"
                type="material"
                color="grey"
                size={25}
                iconStyle={{ marginRight: 10 }}
              />
            }
            checked={check4}
            onPress={() => setCheck4(!check4)}
          /> */}
        </View>

        <TouchableOpacity
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
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default Landlord;
