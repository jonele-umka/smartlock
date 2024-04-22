import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import ListCard from "../components/List/HomeListCard/ListCard";
import ListCardTwo from "../components/List/HomeListCard/ListCardTwo";
import ListCardThree from "../components/List/HomeListCard/ListCardThree";
import HotelsScreen from "./HotelsScreen/HotelsScreen";
import { BlurView } from "expo-blur";

const transferItems = [
  {
    title: "Перенос счетов",
    image:
      "https://www.intechnic.com/hubfs/Blog/Featured%20Images/Best%20Hotel%20Website%20Designs.jpg",
  },
  {
    title: "Отправить деньги",
    image:
      "https://www.intechnic.com/hubfs/Blog/Featured%20Images/Best%20Hotel%20Website%20Designs.jpg",
  },
  {
    title: "Запросить деньги",
    image:
      "https://www.intechnic.com/hubfs/Blog/Featured%20Images/Best%20Hotel%20Website%20Designs.jpg",
  },
  {
    title: "Оплатить счета",
    image:
      "https://www.intechnic.com/hubfs/Blog/Featured%20Images/Best%20Hotel%20Website%20Designs.jpg",
  },
];

const productItems = [
  {
    title: "Валютный своп",
    image:
      "https://mk-turkey.ru/media/images/tourism/3198cb1b-4782-4516-ba89-a2dddcbd16fb.jpg",
  },
  {
    title: "Купить страховку",
    image:
      "https://mk-turkey.ru/media/images/tourism/3198cb1b-4782-4516-ba89-a2dddcbd16fb.jpg",
  },
  {
    title: "Buy stocks",
    image:
      "https://mk-turkey.ru/media/images/tourism/3198cb1b-4782-4516-ba89-a2dddcbd16fb.jpg",
  },
  {
    title: "Купить акции",
    image:
      "https://mk-turkey.ru/media/images/tourism/3198cb1b-4782-4516-ba89-a2dddcbd16fb.jpg",
  },
];

const topUpItems = [
  {
    title: "Входящий банковский перевод",
    image:
      "https://assets.langhamhotels.com/is/image/langhamhotelsstage/tlhkg-langham-hong-kongopti:Medium?wid=675&hei=380",
  },
  {
    title: "Исходящий банковский перевод",
    image:
      "https://assets.langhamhotels.com/is/image/langhamhotelsstage/tlhkg-langham-hong-kongopti:Medium?wid=675&hei=380",
  },
];
const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );
  const clickHandler = (page) =>
    navigation.push("Главная страница", { screen: page });

  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://server.microret.com:80/room", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const jsonData = await response.json();
          console.log(jsonData.data[0].Locks[0].LockName);
          setData(jsonData);
          // Здесь вы можете обработать полученные данные
        } else {
          console.error("Ошибка при получении данных:", response.status);
        }
      } catch (error) {
        console.error("Ошибка при отправке запроса:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingVertical: 20 }}
    >
      <SafeAreaWrapper
        style={[
          {
            flex: 1,
            // paddingHorizontal: 10,
          },
          // isDarkModeEnabled && { backgroundColor: "#191a1d" },
        ]}
      >
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            marginBottom: 40,
          }}
        >
          <Text
            style={[
              {
                fontSize: 30,
                textAlign: "center",
                fontWeight: 600,
                color: "#191a1d",
              },
              // isDarkModeEnabled && {
              //   color: "#fff",
              // },
            ]}
          >
            Умные замки
          </Text>
          <Image
            style={{ width: 30, height: 30 }}
            source={{
              uri: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
            }}
          />
        </View> */}

        {/* <View style={styles.list}>
          <View>
            <ListCard
              clickHandler={clickHandler}
              items={transferItems}
              title={"Рекомендуемые"}
            />
          </View>
          <View>
            <ListCardTwo
              clickHandler={clickHandler}
              items={productItems}
              title={"Ближе к вам"}
            />
          </View>
          <View>
            <ListCardThree
              clickHandler={clickHandler}
              items={topUpItems}
              title={"Популярные"}
            />
          </View>
        </View> */}

        <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
          {/* <Text style={{ fontSize: 25, fontWeight: 500 }}>Рекомендуемые</Text> */}
          <View
            style={{
              flexDirection: "row",
              columnGap: 20,
              flexWrap: "wrap",
              marginTop: 10,
            }}
          >
            <View style={{ flex: 1, rowGap: 20 }}>
              <View style={{ borderRadius: 20, overflow: "hidden" }}>
                <ImageBackground
                  style={{
                    height: 150,
                    justifyContent: "flex-end",
                    paddingBottom: 10,
                  }}
                  source={{
                    uri: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  }}
                  onPress={() => navigation.navigate("Данные об отеле")}
                >
                  <View
                    style={{
                      paddingHorizontal: 10,
                      backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                  >
                    <TouchableOpacity
                      style={{ marginBottom: 5 }}
                      onPress={() => navigation.navigate("Данные об отеле")}
                    >
                      <Text
                        style={{
                          fontSize: 16,

                          color: "#fff",
                        }}
                      >
                        Рекомендуемые
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
              <View style={{ borderRadius: 20, overflow: "hidden" }}>
                <ImageBackground
                  style={{
                    height: 150,
                    justifyContent: "flex-end",
                    paddingBottom: 10,
                  }}
                  source={{
                    uri: "https://images.unsplash.com/photo-1629340038197-191832a53546?q=80&w=2094&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  }}
                  onPress={() => navigation.navigate("Данные об отеле")}
                >
                  <View
                    style={{
                      paddingHorizontal: 10,
                      backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                  >
                    <TouchableOpacity
                      style={{ marginBottom: 5 }}
                      onPress={() => navigation.navigate("Данные об отеле")}
                    >
                      <Text
                        style={{
                          fontSize: 16,

                          color: "#fff",
                        }}
                      >
                        Ближе к вам
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <View style={{ borderRadius: 20, overflow: "hidden" }}>
                <ImageBackground
                  style={{
                    height: 320,
                    justifyContent: "flex-end",
                    paddingBottom: 10,
                  }}
                  source={{
                    uri: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  }}
                  onPress={() => navigation.navigate("Данные об отеле")}
                >
                  <View
                    style={{
                      paddingHorizontal: 10,
                      backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                  >
                    <TouchableOpacity
                      style={{ marginBottom: 5 }}
                      onPress={() => navigation.navigate("Данные об отеле")}
                    >
                      <Text
                        style={{
                          fontSize: 16,

                          color: "#fff",
                        }}
                      >
                        Популярные
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
            </View>
          </View>
        </View>
        <View>
          <HotelsScreen />
        </View>
        <View>
          {data &&
            data.data &&
            data.data[0] &&
            data.data[0].Locks &&
            data.data[0].Locks.map((lock, index) => (
              <Text key={index}>{lock.LockName}</Text>
            ))}
        </View>
      </SafeAreaWrapper>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: "column",
    rowGap: 25,
    marginBottom: 20,
  },
});

export default HomeScreen;
