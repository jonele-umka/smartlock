import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import Map from "../components/Map/Map";
import Search from "../components/Search/Search";
import { LinearGradient } from "expo-linear-gradient";

const SearchScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const [isSearchVisible, setIsSearchVisible] = useState(false);

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

  const handleSheetChanges = () => {
    if (isSearchVisible) {
      // Animate hiding the search component
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => setIsSearchVisible(false));
    } else {
      setIsSearchVisible(true);
      // Animate showing the search component
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: isSearchVisible ? 1 : 1.15 }}>
        <Map location={location} />
        {!isSearchVisible && (
          <TouchableOpacity
            onPress={() => handleSheetChanges()}
            style={{
              position: "absolute",
              bottom: 50,
              alignSelf: "center",
              zIndex: 1,
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
            }}
          >
            <LinearGradient
              colors={["#02AAB0", "#00CDAC"]}
              style={{
                paddingVertical: 15,
                paddingHorizontal: 30,
                borderRadius: 10,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                Поиск
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
      {isSearchVisible && (
        <Animated.View
          style={{
            flex: animatedHeight,
            opacity: animatedOpacity,
          }}
        >
          <Search handleSheetChanges={handleSheetChanges} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    zIndex: 1,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  searchButtonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  searchButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
});

export default SearchScreen;
