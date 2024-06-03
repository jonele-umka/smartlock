import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
const MyObjects = () => {
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  const navigation = useNavigation();
  return (
    <SafeAreaWrapper style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
        <Text
          style={{
            fontSize: 22,
            color: "#000",
            fontWeight: 600,
            paddingHorizontal: 10,
            marginBottom: 15,
            textAlign: "center",
          }}
        >
          Мои объекты
        </Text>
        <View style={{ flexDirection: "column", rowGap: 40 }}>
          <View onPress={() => navigation.navigate("Просмотр объекта")}>
            <Image
              style={{ width: "100%", height: 220 }}
              source={{
                uri: "https://image-tc.galaxy.tf/wijpeg-4nwlvzphtdqm3zkyd79k5nj49/sens-hotel-exterior-summer.jpg?width=1920",
              }}
              borderRadius={20}
            />
            <View style={{ paddingTop: 15, paddingHorizontal: 10 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Просмотр объекта")}
              >
                <Text
                  style={{ fontSize: 25, fontWeight: 700, marginBottom: 15 }}
                >
                  OLOLO HOTEL BISHKEK
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  columnGap: 10,
                  marginBottom: 8,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 5,
                  }}
                >
                  <View
                    style={{
                      paddingVertical: 2,
                      paddingHorizontal: 6,
                      backgroundColor: "green",
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "#fff" }}>5.6</Text>
                  </View>
                  <Text>1090 отзывов</Text>
                </View>
                <Text>•</Text>
                <Text>Гостиница</Text>
              </View>
              <View style={{ flexDirection: "row", columnGap: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 5,
                  }}
                >
                  <Fontisto
                    name="map-marker-alt"
                    style={{ color: "#000", fontSize: 16 }}
                  />
                  <Text>Бишкек</Text>
                </View>
                <Text>•</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 5,
                  }}
                >
                  <Ionicons
                    name="navigate-outline"
                    style={{ color: "#000", fontSize: 16 }}
                  />
                  <Text>1 км от центра</Text>
                </View>
              </View>
              <View style={{ marginTop: 15 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 5,
                    marginBottom: 5,
                  }}
                >
                  <Text>1 ночь</Text>
                  <Text>2 номер</Text>
                </View>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 600,
                  }}
                >
                  13 000 KGS
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default MyObjects;
