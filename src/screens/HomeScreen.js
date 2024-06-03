import React from "react";
import { Text, View, ScrollView, SafeAreaView, Platform } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import ListCard from "../components/List/HomeListCard/ListCard";
import Header from "../components/Header/Header";
import ListCategories from "../components/List/ListCategories/ListCategories";
import ObjectList from "../components/ObjectList/ObjectList";

const hotels = [
  {
    title: "Rixos",
    image:
      "https://www.newworldhotels.com/wp-content/uploads/2014/05/Mobile-NWHBR-Exterior.jpg",
    price: 12000,
    location: "Маями",
  },
  {
    title: "Hayat",
    image:
      "https://imageio.forbes.com/specials-images/imageserve/5ec567daf2098c0006c6036e/Kimpton-Shanghai-Hotel/960x0.jpg?format=jpg&width=960",
    price: 6000,
    location: "Турция",
  },
  {
    title: "Jannat",
    image:
      "https://static.theceomagazine.net/wp-content/uploads/2023/04/26003004/Atlantis-the-royal-e1682434586859.jpg",
    price: 22500,
    location: "Иссык куль",
  },
  {
    title: "Sanjyra",
    image:
      "https://www.luxuryhotelawards.com/wp-content/uploads/sites/8/2023/09/The-Granite-Luxury-Hotel-entrance-view-scaled-2.jpg",
    price: 75000,
    location: "Гавайим",
  },
];

const categories = [
  {
    title: "Пляж",
  },
  {
    title: "Горы",
  },
  {
    title: "Водопады",
  },
  {
    title: "Город",
  },
];

const HomeScreen = ({ navigation }) => {
  // const isDarkModeEnabled = useSelector(
  //   (state) => state.theme.isDarkModeEnabled
  // );
  const clickHandler = (page) =>
    navigation.push("Главная страница", { screen: page });

  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <ScrollView
      style={{ backgroundColor: "#fff", flex: 1 }}
      // contentContainerStyle={{ paddingVertical: 20 }}
    >
      <SafeAreaWrapper>
        <Header />
        <ListCategories clickHandler={clickHandler} items={categories} />
        <ListCard clickHandler={clickHandler} items={hotels} />

        {/* <View style={{ paddingHorizontal: 10, marginVertical: 20 }}>
          <View
            style={{
              flexDirection: "row",
              columnGap: 20,
              flexWrap: "wrap",
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
        </View> */}

        <View style={{ paddingHorizontal: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: 500,
              }}
            >
              Топ отели
            </Text>

            <View
              style={{
                backgroundColor: "#f0f0f0",
                borderRadius: 100,
                padding: 5,
              }}
            >
              <Feather name="arrow-right" style={{ fontSize: 30 }} />
            </View>
          </View>
          <ObjectList />
        </View>

        {/* <View>
          {data &&
            data.data &&
            data.data[0] &&
            data.data[0].Locks &&
            data.data[0].Locks.map((lock, index) => (
              <Text key={index}>{lock.LockID}</Text>
            ))}
        </View> */}
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default HomeScreen;
