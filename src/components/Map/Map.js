import React, { useEffect, useRef, useState } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { ScrollView } from "react-native-actions-sheet";
import ListImages from "../List/ListImages/ListImages";
import { useNavigation } from "@react-navigation/native";

export default function Map({ location, accommodations }) {
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (location) {
      mapRef.current?.animateCamera(
        {
          center: {
            latitude: location?.latitude,
            longitude: location?.longitude,
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
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        style={styles.map}
        showsUserLocation
        showsMyLocationButton
        ref={mapRef}
      >
        {accommodations.map((accommodation) => (
          <Marker
            key={accommodation?.ID}
            title={accommodation?.Title}
            coordinate={{
              latitude: parseFloat(accommodation?.Latitude),
              longitude: parseFloat(accommodation?.Longitude),
            }}
            onPress={() => onMarkerSelected(accommodation)}
          >
            <Callout>
              <View style={{ padding: 5 }}>
                <Text style={{ fontSize: 16, flexWrap: "wrap" }}>
                  {accommodation?.Title}
                </Text>
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
              <Text style={{ fontSize: 22, fontWeight: 600, marginBottom: 20 }}>
                {selectedAccommodation?.Title || "Без названия"}
              </Text>
              {selectedAccommodation?.Images?.length > 0 ? (
                <ListImages images={selectedAccommodation.Images} />
              ) : (
                <Text>Изображений нет</Text>
              )}

              <View style={{ marginVertical: 10 }}>
                <Text
                  style={{ fontWeight: 500, fontSize: 18, marginBottom: 5 }}
                >
                  Описание:
                </Text>
                <ScrollView style={{ height: 200 }}>
                  <Text>
                    {selectedAccommodation?.Description ||
                      "Описание отсутствует"}
                  </Text>
                </ScrollView>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 5,
                  marginBottom: 20,
                }}
              >
                <Text style={{ fontWeight: 500, fontSize: 18 }}>Цена:</Text>
                <Text style={{ fontSize: 18 }}>
                  {selectedAccommodation?.Price
                    ? `${selectedAccommodation.Price} сом/ночь`
                    : "Цена не указана"}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Детали объекта", {
                      id: selectedAccommodation.ID,
                    });
                    setModalVisible(false);
                  }}
                  style={{
                    backgroundColor: "#4B5DFF",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, color: "#fff", textAlign: "center" }}
                  >
                    Бронировать
                  </Text>
                </TouchableOpacity>
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
