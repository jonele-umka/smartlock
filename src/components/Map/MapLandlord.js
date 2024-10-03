import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";

const MapLandlord = ({ coordinate, handleMapRegionChange }) => {
  const initialRegion = {
    latitude: coordinate ? coordinate.latitude : 37.78825, // Значения по умолчанию
    longitude: coordinate ? coordinate.longitude : -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <MapView
      style={{ flex: 1, height: 300 }}
      initialRegion={initialRegion}
      region={coordinate}
      onPress={(e) => handleMapRegionChange(e.nativeEvent.coordinate)}
    >
      {coordinate && (
        <Marker coordinate={coordinate} title="Выбранное местоположение" />
      )}
    </MapView>
  );
};

export default MapLandlord;
