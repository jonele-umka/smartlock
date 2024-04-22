import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import ImageView from "react-native-image-viewing";
import Ionicons from "react-native-vector-icons/Ionicons";
const AllReviewsScreen = () => {
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

  const reviewsData = [
    {
      name: "User 1",
      date: "01.01.2024",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      imageUri:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    },
    {
      name: "User 2",
      date: "01.01.2024",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      imageUri:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    },
    {
      name: "User 3",
      date: "01.01.2024",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      imageUri:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    },
    {
      name: "User 3",
      date: "01.01.2024",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      imageUri:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    },
    {
      name: "User 3",
      date: "01.01.2024",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      imageUri:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    },
    {
      name: "User 3",
      date: "01.01.2024",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      imageUri:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    },
    {
      name: "User 3",
      date: "01.01.2024",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      imageUri:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    },
  ];
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;
  const [visible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  return (
    <View>
      <ScrollView style={{ backgroundColor: "#fff", paddingVertical: 20 }}>
        <SafeAreaWrapper style={{ marginBottom: 100 }}>
          <View style={{ paddingHorizontal: 10 }}>
            <View style={{ flexDirection: "column", rowGap: 20 }}>
              {reviewsData.map((review, index) => (
                <View
                  key={index}
                  style={{
                    padding: 20,
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderColor: "#b8b8b8",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 10,
                      marginBottom: 20,
                    }}
                  >
                    <Image
                      style={{ width: 40, height: 40 }}
                      borderRadius={50}
                      source={{ uri: review.imageUri }}
                    />
                    <View>
                      <Text style={{ fontSize: 18, fontWeight: "600" }}>
                        {review.name}
                      </Text>
                      <Text style={{ color: "grey" }}>{review.date}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      columnGap: 20,
                      marginBottom: 20,
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
                          style={{ width: 70, height: 70 }}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                  <Text style={{ lineHeight: 22 }}>{review.text}</Text>
                  <ImageView
                    images={images.map((image) => ({
                      uri: image.uri,
                    }))}
                    imageIndex={selectedImageIndex}
                    visible={visible}
                    onRequestClose={() => setIsVisible(false)}
                  />
                </View>
              ))}
            </View>
          </View>
        </SafeAreaWrapper>
      </ScrollView>
      <View
        style={{
          position: "sticky",
          bottom: 60,
          zIndex: 100,
          paddingHorizontal: 10,
          borderWidth: 0.5,
          borderColor: "#b8b8b8",
          backgroundColor: "#fff",
          marginHorizontal: 20,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            columnGap: 20,
          }}
        >
          <TextInput
            style={{
              paddingVertical: 15,
              paddingHorizontal: 5,
              borderRightWidth: 0.5,
              borderRightColor: "#b8b8b8",
              flex: 1,
            }}
            underlineColorAndroid="transparent"
            placeholder="Напишите отзыв"
            placeholderTextColor="grey"
          />
          <TouchableOpacity>
            <Ionicons
              name="send-outline"
              style={{ color: "#000", fontSize: 30 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AllReviewsScreen;
