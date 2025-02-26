import React from "react";
import { Platform } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const MapLandlord = ({ coordinate, handleMapRegionChange }) => {
  return (
    <MapView
      provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
      style={{ flex: 1, height: 200 }}
      region={{
        latitude: coordinate ? coordinate.latitude : 37.78825,
        longitude: coordinate ? coordinate.longitude : -122.4324,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      onPress={(e) => handleMapRegionChange(e.nativeEvent.coordinate)}
    >
      {coordinate && (
        <Marker coordinate={coordinate} title="Местоположение объекта" />
      )}
    </MapView>
  );
};

export default MapLandlord;
