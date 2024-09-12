import React, { useEffect, useRef, useState } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// import { useNavigation } from "@react-navigation/native";
// import * as Location from "expo-location";
export default function MapAddress({ latitude, longitude }) {
  const markers = [
    {
      latitude: 42.84225422334126,
      longitude: 74.58114389494061,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      name: "Golden Gate Bridge",
    },
  ];

  const mapRef = useRef(null);

  const onMarkerSelected = (marker) => {
    Alert.alert(marker.name);
  };

  const calloutPressed = (ev) => {
    console.log(ev);
  };

  const onRegionChange = (region) => {
    console.log(region);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        ref={mapRef}
        onRegionChangeComplete={onRegionChange}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 42.84225422334126,
          longitudeDelta: 74.58114389494061,
        }}
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
    height: 150,
  },
});
