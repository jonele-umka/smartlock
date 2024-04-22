import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Switch,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import i18n from "../i18n/i18n";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

const ReviewsInput = () => {
  const [modalReviews, setModalReviews] = useState(false);
  const handleReviews = () => {
    setModalReviews(!modalReviews);
  };
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
    <View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "#f0f0f0",
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderRadius: 10,
          }}
          onPress={handleReviews}
        >
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Написать отзыв
          </Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={modalReviews}>
        <Pressable
          onPress={handleReviews}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: "95%",
              backgroundColor: "#fff",
              borderRadius: 20,
              paddingVertical: 30,
              paddingHorizontal: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <View style={{ marginBottom: 20 }}>
              <View style={{ marginBottom: 20 }}>
                <Text style={{ marginBottom: 10, fontSize: 18 }}>
                  Электронная почта
                </Text>
                <View
                  style={{
                    borderColor: "#e3e3e3",
                    borderWidth: 1,
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
                    placeholder="Задайте вопрос"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                  />
                </View>
              </View>
              <View style={{ marginBottom: 20 }}>
                <Text style={{ marginBottom: 10, fontSize: 18 }}>
                  Ваш отзыв
                </Text>
                <View
                  style={{
                    borderColor: "#e3e3e3",
                    borderWidth: 1,
                    padding: 5,
                    borderRadius: 10,
                  }}
                >
                  <TextInput
                    style={{
                      height: 100,
                      fontSize: 16,
                    }}
                    underlineColorAndroid="transparent"
                    placeholder="Задайте вопрос"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                  />
                </View>
              </View>
              <View>
                <TouchableOpacity
                  onPress={pickImage}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 10,
                    backgroundColor: "#e3e3e3",
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    alignSelf: "flex-start",
                  }}
                >
                  <Ionicons name="image-outline" style={{ fontSize: 20 }} />
                  <Text style={{ fontSize: 16 }}>Добавить изображение</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleReviews}
              style={{
                backgroundColor: "green",
                paddingVertical: 15,
                paddingHorizontal: 20,
                borderRadius: 10,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  textAlign: "center",
                  fontWeight: 500,
                }}
              >
                Отправить
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ReviewsInput;
