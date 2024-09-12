// import {
//   View,
//   Text,
//   SafeAreaView,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Platform,
//   Modal,
//   Pressable,
//   Image,
// } from "react-native";
// import React, { useState } from "react";
// import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import * as ImagePicker from "expo-image-picker";
// import { CheckBox } from "@rneui/themed";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { LinearGradient } from "expo-linear-gradient";
// import Calendar from "../../../components/Calendar/Calendar";
// import Person from "../../../components/Person/Person";
// import CalendarsReservViewData from "../../../components/Calendars/CalendarsReservViewData";

// const amenitiesList = [
//   { name: "Wi-Fi", icon: require("../../../assets/Сonvenience/wifi.png") },
//   {
//     name: "Парковка",
//     icon: require("../../../assets/Сonvenience/parking.png"),
//   },
//   { name: "Бассейн", icon: require("../../../assets/Сonvenience/pool.png") },
//   {
//     name: "Тренажерный зал",
//     icon: require("../../../assets/Сonvenience/gym.png"),
//   },
//   {
//     name: "Ресторан",
//     icon: require("../../../assets/Сonvenience/restaurant.png"),
//   },
//   { name: "Бар", icon: require("../../../assets/Сonvenience/bar.png") },
//   { name: "Душ", icon: require("../../../assets/Сonvenience/show.png") },
//   {
//     name: "Кондиционер",
//     icon: require("../../../assets/Сonvenience/conditioner.png"),
//   },
//   { name: "Телевизор", icon: require("../../../assets/Сonvenience/tv.png") },

//   { name: "Спа-центр", icon: require("../../../assets/Сonvenience/spa.png") },
//   {
//     name: "Кофейня",
//     icon: require("../../../assets/Сonvenience/coffee.png"),
//   },

//   {
//     name: "Прачечная",
//     icon: require("../../../assets/Сonvenience/laundry.png"),
//   },
// ];
// const images = [
//   {
//     uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFFDHQEEYtYDfx8XY1qLvevNoLHimPDELISw&usqp=CAU",
//   },
//   {
//     uri: "https://img.freepik.com/premium-photo/beautiful-mountain-lake-generative-ai_438099-11773.jpg",
//   },
//   {
//     uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsSih7MnL2maMIfYyVCkMcA-t-By2bNe3sHvHsbKZEPQlhuyUpVmcrOid1SNyukV8e8Zw&usqp=CAU",
//   },
// ];
// const EditObject = () => {
//   const SafeAreaWrapper =
//     Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

//   const [selectedAmenities, setSelectedAmenities] = useState([]);
//   const [modalQuests, setModalQuests] = useState(false);
//   const [checked, setChecked] = useState(true);
//   const [selected, setSelected] = useState("");
//   const [data, setData] = useState(null);

//   const dateData = {
//     "2024-06-01": { name: "Иванов Иван Иванович", guests: 3 },
//     "2024-06-02": { name: "Петров Петр Петрович", guests: 2 },
//     "2024-06-03": { name: "Сидоров Сидор Сидорович", guests: 5 },
//   };
//   const pickImage = async () => {
//     try {
//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.All,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });

//       if (!result.canceled) {
//         setImage(result.assets[0].uri);
//         uploadImage(result.assets[0].uri);
//       }
//     } catch (error) {
//       console.error("Ошибка при выборе изображения", error);
//     }
//   };

//   const handleQuests = () => {
//     setModalQuests(!modalQuests);
//   };

//   const toggleCheckbox = () => setChecked(!checked);

//   const toggleAmenity = (amenity) => {
//     setSelectedAmenities((prev) =>
//       prev.includes(amenity)
//         ? prev.filter((item) => item !== amenity)
//         : [...prev, amenity]
//     );
//   };

//   return (
//     <ScrollView
//       style={{
//         backgroundColor: "#fff",
//         flex: 1,
//         paddingHorizontal: 10,
//         paddingVertical: 20,
//       }}
//     >
//       <SafeAreaWrapper style={{ paddingBottom: 50 }}>
//         <View style={{ marginBottom: 20 }}>
//           <View style={{ marginBottom: 20 }}>
//             <Text style={{ marginBottom: 10, fontSize: 18 }}>
//               Загрузите фото
//             </Text>

//             <TouchableOpacity
//               onPress={pickImage}
//               style={{
//                 flexDirection: "column",
//                 alignItems: "center",
//                 columnGap: 10,
//                 backgroundColor: "#f0f0f0",
//                 paddingVertical: 15,
//                 paddingHorizontal: 15,
//                 borderRadius: 10,
//               }}
//             >
//               <Ionicons name="camera" style={{ fontSize: 50 }} />
//               <View>
//                 <Text style={{ fontSize: 16, textAlign: "center" }}>
//                   Добавить
//                 </Text>
//                 <Text style={{ fontSize: 16, textAlign: "center" }}>
//                   изображение
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               flexWrap: "wrap",
//               columnGap: 10,
//               rowGap: 5,
//               marginBottom: 20,
//             }}
//           >
//             {images.map((item, index) => (
//               <View key={index}>
//                 <Image
//                   source={{ uri: item.uri }}
//                   style={{ width: 60, height: 60 }}
//                 />
//               </View>
//             ))}
//           </View>
//           <View style={{ marginBottom: 20 }}>
//             <Text style={{ marginBottom: 10, fontSize: 18 }}>Название</Text>
//             <View
//               style={{
//                 borderWidth: 1,
//                 borderColor: "#b8b8b8",
//                 padding: 5,
//                 borderRadius: 10,
//               }}
//             >
//               <TextInput
//                 style={{
//                   fontSize: 16,
//                   padding: 5,
//                 }}
//                 underlineColorAndroid="transparent"
//                 placeholder="Отель Smart-lock"
//                 placeholderTextColor="grey"
//               />
//             </View>
//           </View>
//           <View style={{ marginBottom: 20 }}>
//             <Text style={{ marginBottom: 10, fontSize: 18 }}>Описание</Text>
//             <View
//               style={{
//                 borderWidth: 1,
//                 borderColor: "#b8b8b8",
//                 padding: 5,
//                 borderRadius: 10,
//               }}
//             >
//               <TextInput
//                 style={{
//                   paddingVertical: 10,
//                   paddingHorizontal: 5,
//                   fontSize: 16,
//                 }}
//                 underlineColorAndroid="transparent"
//                 placeholder="Сдаю 2х комнатную квартиру"
//                 placeholderTextColor="grey"
//                 textAlignVertical="top"
//                 numberOfLines={7}
//                 multiline={true}
//               />
//             </View>
//           </View>

//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent: "space-between",
//               columnGap: 10,
//               marginBottom: 20,
//             }}
//           >
//             <View style={{ flex: 1 }}>
//               <Text style={{ marginBottom: 10, fontSize: 18 }}>Страна</Text>
//               <View
//                 style={{
//                   borderWidth: 1,
//                   borderColor: "#b8b8b8",
//                   padding: 5,
//                   borderRadius: 10,
//                 }}
//               >
//                 <TextInput
//                   style={{
//                     fontSize: 16,
//                     padding: 5,
//                   }}
//                   underlineColorAndroid="transparent"
//                   placeholder="Кыргызстан"
//                   placeholderTextColor="grey"
//                 />
//               </View>
//             </View>
//             <View style={{ flex: 1 }}>
//               <Text style={{ marginBottom: 10, fontSize: 18 }}>Город</Text>
//               <View
//                 style={{
//                   borderWidth: 1,
//                   borderColor: "#b8b8b8",
//                   padding: 5,
//                   borderRadius: 10,
//                 }}
//               >
//                 <TextInput
//                   style={{
//                     fontSize: 16,
//                     padding: 5,
//                   }}
//                   underlineColorAndroid="transparent"
//                   placeholder="Бишкек"
//                   placeholderTextColor="grey"
//                 />
//               </View>
//             </View>
//           </View>

//           <View style={{ marginBottom: 20 }}>
//             <Text style={{ marginBottom: 10, fontSize: 18 }}>
//               Номер телефона
//             </Text>
//             <View
//               style={{
//                 borderWidth: 1,
//                 borderColor: "#b8b8b8",
//                 padding: 5,
//                 borderRadius: 10,
//               }}
//             >
//               <TextInput
//                 style={{
//                   fontSize: 16,
//                   padding: 5,
//                 }}
//                 underlineColorAndroid="transparent"
//                 placeholder="+996"
//                 placeholderTextColor="grey"
//               />
//             </View>
//           </View>

//           <View style={{ marginBottom: 20 }}>
//             <Text style={{ marginBottom: 10, fontSize: 18 }}>
//               Въезд / Выезд
//             </Text>
//             <Calendar />
//           </View>

//           <View style={{ marginBottom: 20 }}>
//             <Text style={{ marginBottom: 10, fontSize: 18 }}>
//               Цена за сутки
//             </Text>
//             <View
//               style={{
//                 borderWidth: 1,
//                 borderColor: "#b8b8b8",
//                 padding: 5,
//                 borderRadius: 10,
//               }}
//             >
//               <TextInput
//                 style={{
//                   fontSize: 16,
//                   padding: 5,
//                 }}
//                 underlineColorAndroid="transparent"
//                 placeholder="1000 сом"
//                 placeholderTextColor="grey"
//               />
//             </View>
//           </View>
//           <View style={{ marginBottom: 20 }}>
//             <Text style={{ marginBottom: 10, fontSize: 18 }}>Гости</Text>
//             <Person />
//           </View>
//           <View style={{ marginBottom: 20 }}>
//             <Text style={{ marginBottom: 10, fontSize: 18 }}>Удобства</Text>
//             <TouchableOpacity
//               onPress={handleQuests}
//               style={{
//                 borderRadius: 10,
//                 backgroundColor: "#f0f0f0",
//                 paddingVertical: 15,
//                 paddingHorizontal: 10,
//               }}
//             >
//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   columnGap: 5,
//                 }}
//               >
//                 <Text style={{ fontSize: 16 }}>Выбрать удобства</Text>
//                 <Icon name={"chevron-right"} size={18} color={"#000"} />
//               </View>
//             </TouchableOpacity>
//           </View>

//           {selectedAmenities && selectedAmenities.length > 1 && (
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "center",
//                 columnGap: 20,
//                 marginBottom: 20,
//                 flexWrap: "wrap",
//                 rowGap: 20,
//               }}
//             >
//               {selectedAmenities.map((item) => (
//                 <View
//                   style={{
//                     flexDirection: "column",
//                     alignItems: "center",
//                     rowGap: 5,
//                   }}
//                   key={item.name}
//                 >
//                   <Image source={item.icon} style={{ width: 30, height: 30 }} />
//                   <Text style={{ textAlign: "center" }}>{item.name}</Text>
//                 </View>
//               ))}
//             </View>
//           )}
//           <View>
//             <Text style={{ marginBottom: 10, fontSize: 18 }}>
//               Способ оплаты
//             </Text>

//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 columnGap: 20,
//               }}
//             >
//               <View
//                 style={{
//                   flexDirection: "row",
//                   columnGap: 10,
//                   alignItems: "center",
//                 }}
//               >
//                 <CheckBox
//                   checked={checked}
//                   onPress={toggleCheckbox}
//                   iconType="material-community"
//                   checkedIcon="checkbox-marked"
//                   uncheckedIcon="checkbox-blank-outline"
//                   checkedColor="#02AAB0"
//                   containerStyle={{
//                     margin: 0,
//                     padding: 0,
//                     marginLeft: 0,
//                     marginRight: 0,
//                   }}
//                 />
//                 <Text>Картой</Text>
//               </View>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   columnGap: 10,
//                   alignItems: "center",
//                 }}
//               >
//                 <CheckBox
//                   checked={checked}
//                   onPress={toggleCheckbox}
//                   iconType="material-community"
//                   checkedIcon="checkbox-marked"
//                   uncheckedIcon="checkbox-blank-outline"
//                   checkedColor="#02AAB0"
//                   containerStyle={{
//                     margin: 0,
//                     padding: 0,
//                     marginLeft: 0,
//                     marginRight: 0,
//                   }}
//                 />
//                 <Text>Наличные</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//         <View style={{ marginBottom: 20 }}>
//           <CalendarsReservViewData
//             dateData={dateData}
//             selected={selected}
//             setSelected={setSelected}
//             setData={setData}
//           />
//           <View style={{ marginTop: 10 }}>
//             {data ? (
//               <>
//                 <Text>ФИО: {data.name}</Text>
//                 <Text>Количество гостей: {data.guests}</Text>
//               </>
//             ) : (
//               <Text>Нет данных для выбранной даты</Text>
//             )}
//           </View>
//         </View>
//         <TouchableOpacity
//           style={{
//             elevation: 5,
//             shadowColor: "#000",
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.2,
//             shadowRadius: 10,
//             marginTop: 30,
//             marginBottom: 20,
//           }}
//         >
//           <LinearGradient
//             colors={["#02AAB0", "#00CDAC"]}
//             style={{
//               paddingVertical: 15,
//               textAlign: "center",
//               borderRadius: 10,
//             }}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//           >
//             <Text
//               style={{
//                 color: "#fff",
//                 textAlign: "center",
//                 fontSize: 20,
//               }}
//             >
//               Сохранить
//             </Text>
//           </LinearGradient>
//         </TouchableOpacity>

//         <Modal animationType="fade" transparent={true} visible={modalQuests}>
//           <View
//             style={{
//               flex: 1,
//               justifyContent: "center",
//               alignItems: "center",
//               backgroundColor: "rgba(0,0,0,0.5)",
//             }}
//           >
//             <View
//               style={{
//                 width: "95%",
//                 backgroundColor: "#fff",
//                 borderRadius: 20,
//                 padding: 20,
//                 shadowColor: "#000",
//                 shadowOffset: {
//                   width: 0,
//                   height: 2,
//                 },
//                 shadowOpacity: 0.25,
//                 shadowRadius: 4,
//                 elevation: 5,
//                 flex: 0.5,
//               }}
//             >
//               <Text style={{ fontSize: 18, marginBottom: 20 }}>Удобства</Text>
//               <ScrollView style={{ flex: 1 }}>
//                 {amenitiesList.map((amenity) => (
//                   <View
//                     key={amenity.name}
//                     style={{
//                       flexDirection: "row",
//                       alignItems: "center",
//                       columnGap: 10,
//                       marginBottom: 10,
//                     }}
//                   >
//                     <CheckBox
//                       checked={selectedAmenities.includes(amenity)}
//                       onPress={() => toggleAmenity(amenity)}
//                       iconType="material-community"
//                       checkedIcon="checkbox-marked"
//                       uncheckedIcon="checkbox-blank-outline"
//                       size={30}
//                       checkedColor="#02AAB0"
//                       containerStyle={{
//                         margin: 0,
//                         padding: 0,
//                         marginLeft: 0,
//                         marginRight: 0,
//                       }}
//                     />
//                     <View
//                       style={{
//                         flexDirection: "row",
//                         alignItems: "center",
//                         columnGap: 8,
//                       }}
//                     >
//                       <Image
//                         source={amenity.icon}
//                         style={{ width: 30, height: 30 }}
//                       />
//                       <Text>{amenity.name}</Text>
//                     </View>
//                   </View>
//                 ))}
//               </ScrollView>
//               <TouchableOpacity
//                 onPress={handleQuests}
//                 style={{
//                   elevation: 5,
//                   shadowColor: "#000",
//                   shadowOffset: { width: 0, height: 2 },
//                   shadowOpacity: 0.2,
//                   shadowRadius: 10,
//                   marginTop: 30,
//                 }}
//               >
//                 <LinearGradient
//                   colors={["#02AAB0", "#00CDAC"]}
//                   style={{
//                     paddingVertical: 15,
//                     textAlign: "center",
//                     borderRadius: 10,
//                   }}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                 >
//                   <Text
//                     style={{
//                       color: "#fff",
//                       textAlign: "center",
//                       fontSize: 20,
//                     }}
//                   >
//                     Сохранить
//                   </Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       </SafeAreaWrapper>
//     </ScrollView>
//   );
// };

// export default EditObject;
