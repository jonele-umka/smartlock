// import React from "react";
// import { View, Text, Image } from "react-native";
// import { useSelector } from "react-redux";
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerToggleButton,
// } from "@react-navigation/drawer";
// import Ionicons from "react-native-vector-icons/Ionicons";
// // import AntDesign from "react-native-vector-icons/AntDesign";
// import SearchScreen from "../screens/SearchScreen";
// import HomeScreen from "../screens/HomeScreen";
// // import FavoritesScreen from "../screens/FavoritesScreen";

// import ProfileScreen from "../screens/ProfileScreen";
// import SignIn from "../screens/Registration/SignIn";
// import i18n from "../components/i18n/i18n";
// // import ReservationScreen from "../screens/ReservationScreen";
// import Landlord from "../screens/Landlord/Landlord";
// // import Help from "../screens/Help/Help";
// // import Notification from "../screens/Notification/Notification";
// import Settings from "../screens/Settings/Settings";
// import { useNavigation, DrawerActions } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
// const Drawer = createDrawerNavigator();

// const CustomDrawerContent = (props) => {
//   const isDarkModeEnabled = useSelector(
//     (state) => state.theme.isDarkModeEnabled
//   );
//   return (
//     <LinearGradient
//       colors={["#02AAB0", "#00CDAC"]}
//       style={{ paddingVertical: 20, flex: 1 }}
//     >
//       <DrawerContentScrollView {...props}>
//         <View style={{ paddingHorizontal: 20, marginBottom: 50 }}>
//           <Image
//             source={require("../assets/logo.png")}
//             style={{ width: "100%", height: 60 }}
//           />
//         </View>

//         <DrawerItemList {...props} />
//       </DrawerContentScrollView>
//     </LinearGradient>
//   );
// };

// const NavBar = () => {
//   const home = i18n.t("home");
//   const search = i18n.t("search");
//   const reservation = i18n.t("Бронь");
//   const favorites = i18n.t("favorites");
//   const profile = i18n.t("profile");
//   const notification = "notification";
//   const landlord = "landlord";
//   const settings = "settings";
//   const navigation = useNavigation();
//   return (
//     <Drawer.Navigator
//       initialRouteName={SignIn}
//       drawerContent={CustomDrawerContent}
//       screenOptions={{
//         drawerPosition: "right",
//         headerLeft: false,
//         headerRight: () => (
//           <Ionicons
//             onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
//             name="menu-sharp"
//             size={30}
//             color="#02AAB0"
//             style={{ marginRight: 10 }}
//           />
//         ),
//         drawerActiveTintColor: "#02AAB0", // Цвет активного элемента
//         drawerInactiveTintColor: "#fff",
//         drawerActiveBackgroundColor: "#fff", // Цвет фона активного элемента
//       }}
//     >
//       <Drawer.Screen
//         name={home}
//         component={HomeScreen}
//         options={{
//           title: "Умные технологии",
//           drawerLabel: home,
//           headerLeft: () => (
//             <Image
//               style={{
//                 width: 30,
//                 height: 30,
//                 borderRadius: 100,
//                 marginLeft: 10,
//               }}
//               source={{
//                 uri: "https://abali.ru/wp-content/uploads/2013/01/Bruce_Leei_1024x768.jpg",
//               }}
//             />
//           ),
//           drawerIcon: ({ focused, color, size }) => (
//             <Ionicons
//               name={focused ? "home" : "home-outline"}
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name={search}
//         component={SearchScreen}
//         options={{
//           title: Platform.OS === "android" ? "" : "Поиск",
//           title: "Умные технологии",
//           drawerLabel: search,
//           drawerIcon: ({ focused, color, size }) => (
//             <Ionicons
//               name={focused ? "search-circle" : "search-circle-outline"}
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name={reservation}
//         component={HomeScreen}
//         options={{
//           title: "Забронированные",
//           drawerIcon: ({ focused, color, size }) => (
//             <Image
//               source={
//                 focused
//                   ? require("../assets/booking.png")
//                   : require("../assets/booking-outline.png")
//               }
//               style={{ width: size, height: size, tintColor: color }}
//             />
//           ),
//         }}
//       />

//       <Drawer.Screen
//         name={favorites}
//         component={HomeScreen}
//         options={{
//           title: "Избранное",
//           drawerIcon: ({ focused, color, size }) => (
//             <Ionicons
//               name={focused ? "star" : "star-outline"}
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />

//       <Drawer.Screen
//         name={notification}
//         component={HomeScreen}
//         options={{
//           title: "Сообщения",
//           drawerIcon: ({ focused, color, size }) => (
//             <Ionicons
//               name={focused ? "chatbubbles" : "chatbubbles-outline"}
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name={landlord}
//         component={Landlord}
//         options={{
//           title: "Сдать жилье",
//           drawerIcon: ({ focused, color, size }) => (
//             <Ionicons
//               name={focused ? "key" : "key-outline"}
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name={settings}
//         component={Settings}
//         options={{
//           title: "Настройки",
//           drawerIcon: ({ focused, color, size }) => (
//             <Ionicons
//               name={focused ? "settings" : "settings-outline"}
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />

//       <Drawer.Screen
//         name={profile}
//         component={ProfileScreen}
//         options={{
//           title: "Профиль",
//           drawerIcon: ({ focused, color, size }) => (
//             <Ionicons
//               name={focused ? "person" : "person-outline"}
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };

// export default NavBar;

import React from "react";
import { useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchScreen from "../screens/SearchScreen";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import profileScreen from "../screens/ProfileScreen";
import SignIn from "../screens/Registration/SignIn";
import i18n from "../components/i18n/i18n";
import ReservationScreen from "../screens/ReservationScreen";
import { Image } from "react-native";
const Tab = createBottomTabNavigator();

const NavBar = () => {
  const home = i18n.t("home");
  const search = i18n.t("search");
  const reservation = i18n.t("Бронь");
  const favorites = i18n.t("favorites");
  const profile = i18n.t("more");

  // const isDarkModeEnabled = useSelector(
  //   (state) => state.theme.isDarkModeEnabled
  // );
  return (
    <Tab.Navigator
      initialRouteName={SignIn}
      screenOptions={({ route }) => ({
        headerShown: false,
        // tabBarShowLabel: tr,

        tabBarActiveTintColor: "#02AAB0",

        tabBarInactiveTintColor: "grey",
        tabBarStyle: [
          // isDarkModeEnabled
          //   ? { backgroundColor: "#191a1d" }
          //   : { backgroundColor: "#f8f3ff" },
          { borderTopWidth: 0, paddingTop: 10, backgroundColor: "#fff" },
        ],

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === home) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === search) {
            iconName = focused ? "search-circle" : "search-circle-outline";
          } else if (rn === reservation) {
            return focused ? (
              <Image
                source={require("../assets/booking.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            ) : (
              <Image
                source={require("../assets/booking-outline.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            );
          } else if (rn === favorites) {
            iconName = focused ? "star" : "star-outline";
          } else if (rn === profile) {
            return focused ? (
              <Image
                source={require("../assets/user.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            ) : (
              <Image
                source={require("../assets/user-outline.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            );
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={home} component={HomeScreen} />
      <Tab.Screen name={search} component={SearchScreen} />
      <Tab.Screen name={reservation} component={ReservationScreen} />
      <Tab.Screen name={favorites} component={FavoritesScreen} />
      <Tab.Screen name={profile} component={profileScreen} />
    </Tab.Navigator>
  );
};

export default NavBar;
