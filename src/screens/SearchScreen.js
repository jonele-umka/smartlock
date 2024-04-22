import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Skeleton } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { Badge } from "@rneui/themed";
import i18n from "../components/i18n/i18n";
import Search from "../components/Search/Search";
import Map from "../components/Map/Map";
import * as Location from "expo-location";
export const SearchScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );

  // const incoming = useSelector((state) => state.transactions.incoming);
  // const outgoing = useSelector((state) => state.transactions.transactions);
  // const transactions = [...outgoing, ...incoming];
  // const loading = useSelector((state) => state.transactions.loading);
  // const token = useSelector((state) => state.signIn.token);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location?.coords);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  // const favorites = useSelector((state) => state.favorites.favorites);

  // const [showActionsheet, setShowActionsheet] = React.useState(false);
  // const handleClose = () => setShowActionsheet(!showActionsheet);
  // const logout = () => {
  //   // Очистить токен из хранилища
  //   AsyncStorage.removeItem("token");
  //   navigation.navigate("Войти");
  // };

  return (
    <View
      style={[
        { paddingVertical: 0, flex: 1 },
        // isDarkModeEnabled && { backgroundColor: "#191a1d" },
      ]}
    >
      <View style={{ paddingHorizontal: 10 }}>
        {/* <View style={styles.header}>
            <TouchableOpacity>
              <Image
                source={require("../assets/avatar.png")}
                style={{ width: 35, height: 35 }}
              />
            </TouchableOpacity>
          </View> */}
      </View>
      <View>
        <Map location={location} />
      </View>

      <View style={styles.searchContainer}>
        <Search />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchContainer: {
    flex: 1,
  },
});
export default SearchScreen;
