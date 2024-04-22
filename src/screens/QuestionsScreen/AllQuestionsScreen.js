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
import QuestionsInput from "../../components/Questions/QuestionsInput";
import Feather from "react-native-vector-icons/Feather";
const AllQuestionsScreen = () => {
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

  return (
    <View>
      <ScrollView
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 120 }}
        style={{ backgroundColor: "#fff" }}
      >
        <SafeAreaWrapper>
          <View style={{ paddingHorizontal: 10 }}>
            <View style={{ flexDirection: "column", rowGap: 40 }}>
              {reviewsData.map((question, index) => (
                <View
                  key={index}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 20,
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderColor: "#b8b8b8",
                  }}
                >
                  <View style={{ flexDirection: "column", rowGap: 20 }}>
                    <View
                      style={{
                        backgroundColor: "#fff",
                        padding: 10,
                        borderRadius: 10,
                        alignSelf: "flex-start",
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            color: "grey",
                            marginBottom: 10,
                            fontSize: 12,
                          }}
                        >
                          {question.date}
                        </Text>
                        <Text style={{ lineHeight: 22 }}>{question.text}</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        backgroundColor: "#e3e3e3",
                        padding: 10,
                        borderRadius: 10,
                        alignSelf: "flex-end",
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            color: "grey",
                            marginBottom: 10,
                            fontSize: 12,
                          }}
                        >
                          {question.date}
                        </Text>
                        <Text style={{ lineHeight: 22 }}>{question.text}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </SafeAreaWrapper>
      </ScrollView>
      <View
        style={{
          position: "sticky",
          bottom: 80,
          zIndex: 100,

          marginHorizontal: 20,
          borderRadius: 10,
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
          <TextInput
            style={{
              paddingVertical: 15,
              paddingHorizontal: 5,
              borderRadius: 10,
              backgroundColor: "#f0f0f0",
              flex: 1,
            }}
            underlineColorAndroid="transparent"
            placeholder="Задайте вопрос"
            placeholderTextColor="grey"
          />
          <TouchableOpacity
            style={{
              borderRadius: 100,
              backgroundColor: "#f0f0f0",
              padding: 10,
            }}
          >
            <Feather name="send" style={{ color: "#000", fontSize: 25 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AllQuestionsScreen;
