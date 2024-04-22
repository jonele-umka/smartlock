import React, { useEffect, useRef } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function Map({ location }) {
  const markers = [
    {
      latitude: 42.83225422334126,
      longitude: 74.59614389494061,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      name: "San Francisco City Center",
    },
    {
      latitude: 42.84225422334126,
      longitude: 74.58114389494061,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      name: "Golden Gate Bridge",
    },
  ];
  const mapRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (location) {
      mapRef.current?.animateCamera(
        {
          center: {
            latitude: location.latitude + -0.0050,
            longitude: location.longitude,
          },
          zoom: 15,
        },
        { duration: 1500 }
      );
    }

    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={focusMap}>
          <View style={{ padding: 10 }}>
            <Text>Focus</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [location]);

  const focusMap = () => {
    mapRef.current?.animateCamera(
      { center: -0.0050, zoom: 15 },
      { duration: 1500 }
    );
  };

  const onMarkerSelected = (marker) => {
    Alert.alert(marker.name);
  };

  const calloutPressed = (ev) => {
    console.log(ev);
  };

  const onRegionChange = (region) => {
    console.log(region);
  };

  console.log("location.coords", location);
  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
        showsMyLocationButton
        ref={mapRef}
        onRegionChangeComplete={onRegionChange}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            title={marker.name}
            coordinate={marker}
            onPress={() => onMarkerSelected(marker)}
          >
            <Callout onPress={calloutPressed}>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 24 }}>Hello</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
/*
         
         .btn-grad {
            background-image: linear-gradient(to right, #1FA2FF 0%, #12D8FA  51%, #1FA2FF  100%);
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