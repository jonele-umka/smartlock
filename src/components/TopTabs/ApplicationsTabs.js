import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

// const ApplicationsComponent = () => {
//   // формат даты
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     const hours = String(date.getHours()).padStart(2, "0");
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const seconds = String(date.getSeconds()).padStart(2, "0");

//     return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
//   };
//   return (
//     <View style={{ flex: 1, backgroundColor: "green" }}>
//       <ScrollView style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
//         <SafeAreaView style={{ flex: 1 }}>
//           <Text
//             style={{
//               fontSize: 30,
//               marginBottom: 20,
//               color: "#000",
//               fontWeight: 600,
//             }}
//           >
//             Входящие
//           </Text>
//           <View style={{ flexDirection: "column", rowGap: 20 }}>
//             <View>
//               <TouchableOpacity
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   columnGap: 10,
//                   padding: 16,
//                   borderRadius: 10,
//                   backgroundColor: "#fff",
//                   shadowColor: "#000",
//                   shadowOffset: { width: 0, height: 2 },
//                   shadowOpacity: 0.2,
//                   shadowRadius: 10,
//                 }}
//               >
//                 {/* <Image
//                   source={require("../../assets/notification.png")}
//                   style={{ width: 40, height: 40 }}
//                 /> */}
//                 <View style={{ flex: 1 }}>
//                   <Text
//                     style={{ fontSize: 20, fontWeight: 500, marginBottom: 5 }}
//                   >
//                     fses
//                   </Text>
//                   <Text style={{ fontSize: 16 }}>bvcbvc</Text>
//                   <Text
//                     style={{
//                       alignSelf: "flex-end",
//                       color: "#000",
//                       marginTop: 10,
//                       fontSize: 14,
//                     }}
//                   >
//                     fefssfe
//                     {/* {formatDate(notification.CreatedAt)} */}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </SafeAreaView>
//       </ScrollView>
//     </View>
//   );
// };

const FirstRoute = () => {
  const navigation = useNavigation();
  // формат даты
  const formatDate = (dateString) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  };
  return (
    <View style={{ flex: 1, backgroundColor: "green" }}>
      <ScrollView style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 30,
              marginBottom: 20,
              color: "#000",
              fontWeight: 600,
            }}
          >
            Входящие
          </Text>
          <View style={{ flexDirection: "column", rowGap: 20 }}>
            <TouchableOpacity
              style={{
                padding: 16,
                borderRadius: 10,
                backgroundColor: "#fff",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  columnGap: 10,
                }}
              >
                <Image
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWyBQDPbrs0KAA9ahYQAkRT9CCw1CZuz-lXQ&s",
                  }}
                  style={{ width: 30, height: 30, borderRadius: 100 }}
                />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "column", rowGap: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text>ФИО: </Text>
                      <Text style={{ fontWeight: 500 }}>
                        Джетенова Курмет Дауренович
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>Количество гостей:</Text>
                      <Text style={{ fontWeight: 500 }}> 2</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>Цена: </Text>
                      <Text style={{ fontWeight: 500 }}>6000 сом</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>Дата въезда: </Text>
                      <Text style={{ fontWeight: 500 }}>{formatDate()}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>Дата выезда: </Text>
                      <Text style={{ fontWeight: 500 }}>{formatDate()}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "green",
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "#fff" }}>Подтвердить</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "red",
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "#fff" }}>Отклонить</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Просмотр заявки", {
                      text: 'fefe',
                    });
                  }}
                  style={{
                    backgroundColor: "yellow",
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "#fff" }}>Подробнее</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};
const SecondRoute = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "green" }}>
      <ScrollView style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 30,
              marginBottom: 20,
              color: "#000",
              fontWeight: 600,
            }}
          >
            В процессе
          </Text>
          <View style={{ flexDirection: "column", rowGap: 20 }}>
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 10,
                  padding: 16,
                  borderRadius: 10,
                  backgroundColor: "#fff",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                }}
              >
                {/* <Image
                  source={require("../../assets/notification.png")}
                  style={{ width: 40, height: 40 }}
                /> */}
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 500, marginBottom: 5 }}>fses</Text>
                  <Text style={{ fontSize: 16 }}>bvcbvc</Text>
                  <Text
                    style={{
                      alignSelf: "flex-end",
                      color: "#000",
                      marginTop: 10,
                      fontSize: 14,
                    }}
                  >
                    fefssfe
                    {/* {formatDate(notification.CreatedAt)} */}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};
const ThirdRoute = () => <View style={{ flex: 1, backgroundColor: "red" }} />;
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

export default function ApplicationsTabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Входящие" },
    { key: "second", title: "В процессе" },
    { key: "third", title: "Отклоненён" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
