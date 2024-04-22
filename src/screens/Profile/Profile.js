import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import React from "react";
import i18n from "../../components/i18n/i18n";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
const Profile = () => {
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <SafeAreaWrapper
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 20,
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              rowGap: 10,
              marginBottom: 30,
            }}
          >
            <Image
              source={{
                uri: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
              }}
              style={{ borderRadius: 80, width: 150, height: 150 }}
            />
            <TouchableOpacity>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: "#000",
                }}
              >
                Изменить фотографию
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "column", rowGap: 20 }}>
            <View>
              <Text style={{ marginBottom: 10 }}>ФИО</Text>
              <TextInput
                style={{
                  paddingVertical: Platform.OS === "android" ? 10 : 15,
                  paddingHorizontal: 10,
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: "#b8b8b8",
                  borderRadius: 10,
                }}
                underlineColorAndroid="transparent"
                placeholder="ФИО"
                defaultValue="Койчиев Урмат Акылбекович"
                placeholderTextColor="#000"
              />
            </View>
            <View>
              <Text style={{ marginBottom: 10 }}>Электронная почта</Text>
              <TextInput
                style={{
                  paddingVertical: Platform.OS === "android" ? 10 : 15,
                  paddingHorizontal: 10,
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: "#b8b8b8",
                  borderRadius: 10,
                }}
                underlineColorAndroid="transparent"
                placeholder="Email"
                defaultValue="koichiev.umka@gmail.com"
                placeholderTextColor="#000"
              />
            </View>
            <View>
              <Text style={{ marginBottom: 10 }}>Номер телефона</Text>
              <TextInput
                style={{
                  paddingVertical: Platform.OS === "android" ? 10 : 15,
                  paddingHorizontal: 10,
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: "#b8b8b8",
                  borderRadius: 10,
                }}
                underlineColorAndroid="transparent"
                placeholder="+996"
                defaultValue="+996509070708"
                placeholderTextColor="#000"
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Результаты поиска");
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
      </View>
    </SafeAreaWrapper>
  );
};

export default Profile;
