import React, { useEffect, useRef, useState } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

export default function Map({ location, accommodations }) {
  const mapRef = useRef(null);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (location) {
      mapRef.current?.animateCamera(
        {
          center: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          zoom: 13,
        },
        { duration: 1500 }
      );
    }
  }, [location]);

  const onMarkerSelected = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAccommodation(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
        showsMyLocationButton
        ref={mapRef}
      >
        {accommodations.map((accommodation) => (
          <Marker
            key={accommodation.ID}
            title={accommodation.Title}
            coordinate={{
              latitude: parseFloat(accommodation.Latitude),
              longitude: parseFloat(accommodation.Longitude),
            }}
            onPress={() => onMarkerSelected(accommodation)}
          >
            <Callout>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 24 }}>{accommodation.Title}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {selectedAccommodation && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View
              style={{
                width: "90%",
                padding: 20,
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                style={{ alignItems: "flex-end" }}
                onPress={closeModal}
              >
                <Entypo name="cross" style={{ fontSize: 30 }} />
              </TouchableOpacity>
              <Text style={{ fontSize: 25, fontWeight: 600, marginBottom: 10 }}>
                {selectedAccommodation.Title}
              </Text>
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{ fontWeight: 500, fontSize: 18, marginBottom: 5 }}
                >
                  Описание:
                </Text>
                <Text>{selectedAccommodation.Description}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 5,
                }}
              >
                <Text style={{ fontWeight: 500, fontSize: 18 }}>Цена:</Text>
                <Text>{selectedAccommodation.Price} сом</Text>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
