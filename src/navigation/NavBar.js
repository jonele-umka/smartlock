import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
// import MapScreen from "../screens/MapScreen";
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
  const map = "Карта";
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
        tabBarActiveTintColor: "#594BFF",
        tabBarInactiveTintColor: "rgba(97, 105, 146, 0.8)",
        tabBarStyle: [
          // isDarkModeEnabled
          //   ? { backgroundColor: "#191a1d" }
          //   : { backgroundColor: "#f8f3ff" },
          {
            // position: "absolute",
            // bottom: 20,
            // left: 20,
            // right: 20,
            // borderRadius: 20,
            // height: 70,
            backgroundColor: "#EFF2F6",
            borderTopWidth: 0,
            paddingVertical: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
          },
        ],

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === home) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === map) {
            iconName = focused ? "map" : "map-outline";
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
      {/* <Tab.Screen name={map} component={MapScreen} /> */}
      <Tab.Screen name={reservation} component={ReservationScreen} />
      <Tab.Screen name={favorites} component={FavoritesScreen} />
      <Tab.Screen name={profile} component={profileScreen} />
    </Tab.Navigator>
  );
};

export default NavBar;

/*
         
         .btn-grad {
            background-image: linear-gradient(to right, #00c6ff 0%, #0072ff  51%, #00c6ff  100%);
            margin: 10px;
            padding: 15px 45px;
            text-align: center;
            text-transform: uppercase;
            transition: 0.5s;
            background-size: 200% auto;
            color: white;            
            box-shadow: 0 0 20px #eee;
            border-radius: 10px;
            display: block;
          }
                   
         .btn-grad {
            background-image: linear-gradient(to right, #0575E6 0%, #021B79  51%, #0575E6  100%);
            margin: 10px;
            padding: 15px 45px;
            text-align: center;
            text-transform: uppercase;
            transition: 0.5s;
            background-size: 200% auto;
            color: white;            
            box-shadow: 0 0 20px #eee;
            border-radius: 10px;
            display: block;
          }

       
         
         .btn-grad {
            background-image: linear-gradient(to right, #00bf8f 0%, #001510  51%, #00bf8f  100%);
            margin: 10px;
            padding: 15px 45px;
            text-align: center;
            text-transform: uppercase;
            transition: 0.5s;
            background-size: 200% auto;
            color: white;            
            box-shadow: 0 0 20px #eee;
            border-radius: 10px;
            display: block;
          }

      
                  
         .btn-grad {
            background-image: linear-gradient(to right, #FF512F 0%, #F09819  51%, #FF512F  100%);
            margin: 10px;
            padding: 15px 45px;
            text-align: center;
            text-transform: uppercase;
            transition: 0.5s;
            background-size: 200% auto;
            color: white;            
            box-shadow: 0 0 20px #eee;
            border-radius: 10px;
            display: block;
          }
 
         
         
*/
