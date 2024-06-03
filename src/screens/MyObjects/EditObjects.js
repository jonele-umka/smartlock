import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
// import ImageView from "react-native-image-viewing";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const EditObjects = () => {
  const navigation = useNavigation();

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
  const images = [
    {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFFDHQEEYtYDfx8XY1qLvevNoLHimPDELISw&usqp=CAU",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFFDHQEEYtYDfx8XY1qLvevNoLHimPDELISw&usqp=CAU",
    },
    {
      uri: "https://img.freepik.com/premium-photo/beautiful-mountain-lake-generative-ai_438099-11773.jpg",
    },
    {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsSih7MnL2maMIfYyVCkMcA-t-By2bNe3sHvHsbKZEPQlhuyUpVmcrOid1SNyukV8e8Zw&usqp=CAU",
    },
  ];

  const [visible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
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
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                columnGap: 10,
                justifyContent: "space-between",
              }}
            >
              {images.map((image, imgIndex) => (
                <TouchableOpacity
                  key={imgIndex}
                  onPress={() => {
                    setIsVisible(true);
                    setSelectedImageIndex(imgIndex);
                  }}
                >
                  <Image
                    source={{ uri: image.uri }}
                    style={{ width: 100, height: 100 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>Категория</Text>
            <TouchableOpacity
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
            </TouchableOpacity>
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
                defaultValue="OLOLO"
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
                defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
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
                defaultValue="Кыргызстан"
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
                defaultValue="Бишкек"
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
                defaultValue="+996"
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
                defaultValue="Wi-Fi, Парковка"
                numberOfLines={4}
                multiline={true}
              />
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
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
                defaultValue="С 10:00 до 10:00"
                numberOfLines={4}
                multiline={true}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Замок номера")}
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
                justifyContent: "space-between",
                alignItems: "center",
                columnGap: 5,
              }}
            >
              <Text style={{ fontSize: 16 }}>Замок</Text>
              <Icon
                name={"chevron-right"}
                size={18}
                color={"#000"}
                style={{ paddingTop: 3 }}
              />
            </View>
          </TouchableOpacity>

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
          onPress={() => {
            navigation.navigate("Замок номера");
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
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default EditObjects;
