import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
const AllVariantHotels = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}
        >
          <Image
            style={{ width: "100%", height: 220 }}
            source={{
              uri: "https://image-tc.galaxy.tf/wijpeg-4nwlvzphtdqm3zkyd79k5nj49/sens-hotel-exterior-summer.jpg?width=1920",
            }}
            borderRadius={20}
          />
          <View style={{ paddingTop: 15, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 25, fontWeight: 700, marginBottom: 15 }}>
              OLOLO HOTEL BISHKEK
            </Text>
            <View>
              <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
                Краткое описание
              </Text>
              <View style={{ flexDirection: "column", rowGap: 5 }}>
                <Text style={{ fontSize: 16 }}>Цена за 2</Text>
                <Text style={{ fontSize: 16 }}>1 двуспальная кровать</Text>
                <Text style={{ fontSize: 16 }}>Площадь 40 м2</Text>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
                Условия
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  columnGap: 10,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#e3e3e3",
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderRadius: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 5,
                    }}
                  >
                    <Ionicons
                      name="wifi"
                      style={{ color: "#000", fontSize: 16 }}
                    />
                    <Text style={{ fontSize: 16 }}>Wi-Fi</Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: "#e3e3e3",
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderRadius: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 5,
                    }}
                  >
                    <Ionicons
                      name="wifi"
                      style={{ color: "#000", fontSize: 16 }}
                    />
                    <Text style={{ fontSize: 16 }}>Wi-Fi</Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: "#e3e3e3",
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderRadius: 5,
                  }}
                >
                  <View>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 5,
                      }}
                      onPress={() => navigation.navigate("Все условия")}
                    >
                      <Text style={{ fontSize: 16 }}>Все условия</Text>
                      <Fontisto
                        name="angle-right"
                        style={{ color: "#000", fontSize: 14 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 20, marginBottom: 20 }}>
              <Text style={{ fontSize: 16, marginBottom: 5 }}>
                Цена за 1 ночь
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: "red",
                  textDecorationLine: "line-through",
                }}
              >
                KGS 3500
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 600,
                }}
              >
                13 000 KGS
              </Text>
            </View>
            <View>
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
                    Выбрать
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AllVariantHotels;
