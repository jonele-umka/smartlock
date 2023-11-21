import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";

const CardDetails = () => {
  const route = useRoute();
  const { cardData } = route.params;

  const showSuccessCopy = () => {
    Toast.show({
      type: "success",
      position: "top",
      text2: "Реквизиты успешно скопированы",
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
    });
  };

  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <SafeAreaView
      style={[
        { flex: 1 },
        // isDarkModeEnabled && { backgroundColor: "#191a1d" },
      ]}
    >
      <LinearGradient
        style={[
          { flex: 1 },
          // isDarkModeEnabled && { backgroundColor: "#191a1d" },
        ]}
        start={{ x: 2.4, y: 1.1 }}
        end={{ x: 0, y: 0 }}
        colors={["#241270", "#140A4F", "#000"]}
      >
        <ScrollView
          style={[
            { flex: 1, paddingHorizontal: 10, paddingTop: 20 },
            // isDarkModeEnabled && { backgroundColor: "#191a1d" },
          ]}
        >
          <View
            style={{ width: "100%", alignItems: "center", marginBottom: 20 }}
          >
            <ImageBackground
              source={require("../../../../assets/card/cards.png")}
              imageStyle={{ borderRadius: 15 }}
              style={styles.card}
            >
              <View>
                <Image
                  source={require("../../../../assets/CRYPTONLogo.png")}
                  style={{ width: 120, height: 30 }}
                />
              </View>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  columnGap: 10,
                  backgroundColor: "rgba(0,0,0,0.1)",
                  borderRadius: 10,
                  paddingVertical: 10,
                }}
              >
                <Ionicons
                  name="lock-closed"
                  style={[
                    { fontSize: 25, color: "#fff" },
                    //   isDarkModeEnabled && { color: "#fff" },
                  ]}
                />
                <Text style={{ color: "#fff" }}>Заблокировать карту</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>

          <Text style={{ color: "#fff", marginBottom: 20, fontSize: 20 }}>
            Данные карты
          </Text>
          <View
            style={{
              backgroundColor: "#2A2867",
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            <View style={{ flexDirection: "column", rowGap: 10 }}>
              <View>
                <Text style={{ color: "#fff", marginBottom: 10 }}>
                  Реквизиты карты
                </Text>
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "#fff" }}>
                    {cardData.AccountNumber}
                  </Text>
                  <MaterialCommunityIcons
                    name="content-copy"
                    style={[
                      { fontSize: 20, color: "#fff" },
                      //   isDarkModeEnabled && { color: "#fff" },
                    ]}
                    onPress={() => {
                      Clipboard.setStringAsync(cardData.AccountNumber);
                      showSuccessCopy();
                    }}
                  />
                </View>
              </View>
              <View>
                <Text style={{ color: "#fff", marginBottom: 10 }}>
                  Валюта карты
                </Text>
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                    justifyContent: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "#fff" }}>
                    {cardData.Currency.CurrencyCode}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={{ color: "#fff", marginBottom: 10 }}>Баланс</Text>
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                    justifyContent: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "#fff" }}>{cardData.Balance}</Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                columnGap: 10,
                backgroundColor: "rgba(0,0,0,0.1)",
                borderRadius: 10,
                paddingVertical: 10,
              }}
            >
              <MaterialCommunityIcons
                name="delete"
                style={[
                  { fontSize: 25, color: "#fff" },
                  //   isDarkModeEnabled && { color: "#fff" },
                ]}
              />
              <Text style={{ color: "#fff" }}>Удалить карту</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 320,
    height: 170,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,

    // shadowColor: "#0268EC",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.35,
    // shadowRadius: 8.84,
    // elevation: 5,
  },
});
export default CardDetails;
