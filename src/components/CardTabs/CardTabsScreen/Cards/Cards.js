// import React from "react";
// import {
//   Image,
//   Text,
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   ImageBackground,
//   ScrollView,
// } from "react-native";
// import { useSelector } from "react-redux";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import CardsCard from "./CardsCard";

// function Cards() {
//   const isDarkModeEnabled = useSelector(
//     (state) => state.theme.isDarkModeEnabled
//   );
//   // const background = isDarkModeEnabled ? "#111" : "#f8f3ff";
//   const transactions = [
//     {
//       id: 1,
//       image: require("../../../../assets/photo.jpg"),
//       user: "Alex",
//       data: "05.05.2023, 1:30 PM",
//       price: 100,
//       status: "Pending",
//     },
//     {
//       id: 2,
//       image: require("../../../../assets/photo.jpg"),
//       user: "Booking",
//       data: "05.05.2023, 5:30 AM",
//       price: 150,
//       status: "Completed",
//     },
//     {
//       id: 3,
//       image: require("../../../../assets/photo.jpg"),
//       user: "Alex",
//       data: "05.05.2023, 1:30 PM",
//       price: 100,
//       status: "Pending",
//     },
//     {
//       id: 4,
//       image: require("../../../../assets/photo.jpg"),
//       user: "Booking",
//       data: "05.05.2023, 5:30 AM",
//       price: 150,
//       status: "Rejected",
//     },
//   ];
//   const getStatusColor = (status) => {
//     if (status === "Completed") {
//       return "green";
//     } else if (status === "Rejected") {
//       return "red";
//     } else {
//       return "gray";
//     }
//   };
//   return (
//     <ScrollView
//       style={
//         isDarkModeEnabled
//           ? { backgroundColor: "#191a1d" }
//           : { backgroundColor: "#f8f3ff" }
//       }
//     >
//       <View
//         style={[
//           { backgroundColor: "#f8f3ff", flex: 1, paddingBottom: 20 },
//           isDarkModeEnabled && { backgroundColor: "#191a1d" },
//         ]}
//       >
//         <View style={{ marginBottom: 30 }}>
//           <CardsCard />
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "center",
//               columnGap: 20,
//             }}
//           >
//             <TouchableOpacity
//               style={[
//                 styles.cardBottomView,
//                 isDarkModeEnabled && { backgroundColor: "#383838" },
//               ]}
//             >
//               <MaterialCommunityIcons
//                 name="line-scan"
//                 style={{ fontSize: 50, color: "#fc8a0b" }}
//               />
//               <Text
//                 style={[
//                   styles.cardBottomText,
//                   isDarkModeEnabled && { color: "#fff" },
//                 ]}
//               >
//                 QR Scan
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.cardBottomView,
//                 isDarkModeEnabled && { backgroundColor: "#383838" },
//               ]}
//             >
//               <ImageBackground
//                 style={{ width: 50, height: 50 }}
//                 source={require("../../../../assets/transfer.png")}
//               />
//               <Text
//                 style={[
//                   styles.cardBottomText,
//                   isDarkModeEnabled && { color: "#fff" },
//                 ]}
//               >
//                 Transfer
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.cardBottomView,
//                 isDarkModeEnabled && { backgroundColor: "#383838" },
//               ]}
//             >
//               <ImageBackground
//                 style={{ width: 50, height: 50 }}
//                 source={require("../../../../assets/bill.png")}
//               />
//               <Text
//                 style={[
//                   styles.cardBottomText,
//                   isDarkModeEnabled && { color: "#fff" },
//                 ]}
//               >
//                 Pay bill
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View
//           style={{
//             paddingHorizontal: 20,
//           }}
//         >
//           <View style={[styles.headText]}>
//             <Text
//               style={[
//                 { fontWeight: 500, fontSize: 16 },
//                 isDarkModeEnabled && { color: "#fff" },
//               ]}
//             >
//               Transactions
//             </Text>
//           </View>
//           <View style={{ flexDirection: "column", rowGap: 10 }}>
//             {transactions.map((transactions) => (
//               <View
//                 key={transactions.id}
//                 style={[
//                   styles.transactionListView,
//                   isDarkModeEnabled && { backgroundColor: "#383838" },
//                 ]}
//               >
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     columnGap: 20,
//                     alignItems: "center",
//                   }}
//                 >
//                   <Image
//                     style={{ width: 40, height: 40 }}
//                     source={transactions.image}
//                   />
//                   <View
//                     style={[
//                       {
//                         borderLeftWidth: 1,
//                         borderLeftColor: "#f4f4f4",
//                         paddingLeft: 12,
//                       },
//                       isDarkModeEnabled && { borderLeftColor: "#9c9c9c" },
//                     ]}
//                   >
//                     <Text
//                       style={[
//                         { marginBottom: 10, fontWeight: 500 },
//                         isDarkModeEnabled
//                           ? { color: "#fff" }
//                           : { color: "#000" },
//                       ]}
//                     >
//                       {transactions.user}
//                     </Text>
//                     <Text
//                       style={[
//                         { fontSize: 12, color: "#9c9c9c" },
//                         isDarkModeEnabled && { color: "#9c9c9c" },
//                       ]}
//                     >
//                       {transactions.data}
//                     </Text>
//                   </View>
//                 </View>
//                 <View
//                   style={{ flexDirection: "column", alignItems: "flex-end" }}
//                 >
//                   <Text
//                     style={[
//                       { marginBottom: 10, fontWeight: 500 },
//                       isDarkModeEnabled ? { color: "#fff" } : { color: "#000" },
//                     ]}
//                   >
//                     € {transactions.price}
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: 12,
//                       color: getStatusColor(transactions.status),
//                     }}
//                   >
//                     {transactions.status}
//                   </Text>
//                 </View>
//               </View>
//             ))}
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }
// const styles = StyleSheet.create({
//   headText: {
//     marginBottom: 20,
//   },

//   cardBottomView: {
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     width: "25%",
//     height: 100,
//     borderRadius: 20,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 8.84,
//     elevation: 5,
//   },

//   cardBottomText: {
//     color: "#191a1d",
//     marginTop: 10,
//   },
//   transactionListView: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 15,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//   },
// });
// export default Cards;
