// import { View, Text, Image, TouchableOpacity } from "react-native";
// import React from "react";
// import Fontisto from "react-native-vector-icons/Fontisto";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useNavigation } from "@react-navigation/native";

// const HotelsScreen = () => {
//   const navigation = useNavigation();
//   return (
//     <View>
//       <Text
//         style={{
//           fontSize: 22,
//           color: "#000",
//           fontWeight: 600,
//           paddingHorizontal: 10,
//           marginBottom: 15,
//         }}
//       >
//         Другие отели
//       </Text>
//       <View style={{ flexDirection: "column", rowGap: 40 }}>
//         <View
//           onPress={() => navigation.navigate("Данные об отеле")}
//           style={{
//             paddingHorizontal: 10,
//             paddingBottom: 20,
//           }}
//         >
//           <Image
//             style={{ width: "100%", height: 220 }}
//             source={{
//               uri: "https://image-tc.galaxy.tf/wijpeg-4nwlvzphtdqm3zkyd79k5nj49/sens-hotel-exterior-summer.jpg?width=1920",
//             }}
//             borderRadius={20}
//           />
//           <View style={{ paddingTop: 15, paddingHorizontal: 10 }}>
//             <TouchableOpacity
//               onPress={() => navigation.navigate("Данные об отеле")}
//             >
//               <Text style={{ fontSize: 25, fontWeight: 700, marginBottom: 15 }}>
//                 OLOLO HOTEL BISHKEK
//               </Text>
//             </TouchableOpacity>

//             <View
//               style={{
//                 flexDirection: "row",
//                 columnGap: 10,
//                 marginBottom: 8,
//                 alignItems: "center",
//               }}
//             >
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   columnGap: 5,
//                 }}
//               >
//                 <View
//                   style={{
//                     paddingVertical: 2,
//                     paddingHorizontal: 6,
//                     backgroundColor: "green",
//                     borderRadius: 5,
//                   }}
//                 >
//                   <Text style={{ color: "#fff" }}>5.6</Text>
//                 </View>
//                 <Text>1090 отзывов</Text>
//               </View>
//               <Text>•</Text>
//               <Text>Гостиница</Text>
//             </View>
//             <View style={{ flexDirection: "row", columnGap: 10 }}>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   columnGap: 5,
//                 }}
//               >
//                 <Fontisto
//                   name="map-marker-alt"
//                   style={{ color: "#000", fontSize: 16 }}
//                 />
//                 <Text>Бишкек</Text>
//               </View>
//               <Text>•</Text>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   columnGap: 5,
//                 }}
//               >
//                 <Ionicons
//                   name="navigate-outline"
//                   style={{ color: "#000", fontSize: 16 }}
//                 />
//                 <Text>1 км от центра</Text>
//               </View>
//             </View>
//             <View style={{ marginTop: 15 }}>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   columnGap: 5,
//                   marginBottom: 5,
//                 }}
//               >
//                 <Text>1 ночь</Text>
//                 <Text>2 номер</Text>
//               </View>
//               <Text
//                 style={{
//                   fontSize: 25,
//                   fontWeight: 600,
//                 }}
//               >
//                 13 000 KGS
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View
//           style={{
//             paddingHorizontal: 10,
//             paddingBottom: 20,
//           }}
//         >
//           <Image
//             style={{ width: "100%", height: 220 }}
//             source={{
//               uri: "https://image-tc.galaxy.tf/wijpeg-4nwlvzphtdqm3zkyd79k5nj49/sens-hotel-exterior-summer.jpg?width=1920",
//             }}
//             borderRadius={20}
//           />
//           <View style={{ paddingTop: 15, paddingHorizontal: 10 }}>
//             <Text style={{ fontSize: 25, fontWeight: 700, marginBottom: 15 }}>
//               OLOLO HOTEL BISHKEK
//             </Text>

//             <View
//               style={{
//                 flexDirection: "row",
//                 columnGap: 10,
//                 marginBottom: 8,
//                 alignItems: "center",
//               }}
//             >
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   columnGap: 5,
//                 }}
//               >
//                 <View
//                   style={{
//                     paddingVertical: 3,
//                     paddingHorizontal: 6,
//                     backgroundColor: "green",
//                     borderRadius: 5,
//                   }}
//                 >
//                   <Text style={{ color: "#fff" }}>5.6</Text>
//                 </View>
//                 <Text>1090 отзывов</Text>
//               </View>
//               <Text>•</Text>
//               <Text>Гостиница</Text>
//             </View>
//             <View style={{ flexDirection: "row", columnGap: 10 }}>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   columnGap: 5,
//                 }}
//               >
//                 <Fontisto
//                   name="map-marker-alt"
//                   style={{ color: "#000", fontSize: 16 }}
//                 />
//                 <Text>Бишкек</Text>
//               </View>
//               <Text>•</Text>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   columnGap: 5,
//                 }}
//               >
//                 <Ionicons
//                   name="navigate-outline"
//                   style={{ color: "#000", fontSize: 16 }}
//                 />
//                 <Text>1 км от центра</Text>
//               </View>
//             </View>
//             <View style={{ marginTop: 15 }}>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   columnGap: 5,
//                   marginBottom: 5,
//                 }}
//               >
//                 <Text>1 ночь</Text>
//                 <Text>2 номер</Text>
//               </View>
//               <Text
//                 style={{
//                   fontSize: 25,
//                   fontWeight: 600,
//                 }}
//               >
//                 13 000 KGS
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default HotelsScreen;
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
const HotelsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ paddingHorizontal: 10 }}>
      {/* <Text
        style={{
          fontSize: 22,
          color: "#000",
          fontWeight: 600,

          marginBottom: 15,
        }}
      >
        Другие отели
      </Text> */}
      <View
        style={{
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <ImageBackground
          style={{
            width: "100%",
            height: 250,
            justifyContent: "flex-end",
            paddingBottom: 10,
          }}
          source={{
            uri: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          onPress={() => navigation.navigate("Данные об отеле")}
        >
          <BlurView
            tint="dark"
            style={{ paddingHorizontal: 10, paddingVertical: 10 }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                columnGap: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  style={{ marginBottom: 5 }}
                  onPress={() => navigation.navigate("Данные об отеле")}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    OLOLO HOTEL BISHKEK
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 5,
                  }}
                >
                  <Fontisto
                    name="map-marker-alt"
                    style={{ color: "#f0f0f0", fontSize: 16 }}
                  />
                  <Text style={{ color: "#f0f0f0" }}>Бишкек</Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#fff",
                  }}
                >
                  KGS 13 000
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    color: "#b8b8b8",
                  }}
                >
                  ночь
                </Text>
              </View>
            </View>
          </BlurView>
        </ImageBackground>
      </View>
    </View>
  );
};

export default HotelsScreen;
