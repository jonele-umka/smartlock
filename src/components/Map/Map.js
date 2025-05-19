import React, { useEffect, useRef, useState } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { ScrollView } from "react-native-actions-sheet";
import ListImages from "../List/ListImages/ListImages";
import { useNavigation } from "@react-navigation/native";
import i18n from "../../../i18n/i18n";
import CustomText from "../CustomText/CustomText";

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
        {accommodations
          .filter((accommodation) => {
            const lat = parseFloat(accommodation?.Latitude);
            const lng = parseFloat(accommodation?.Longitude);
            return !isNaN(lat) && !isNaN(lng);
          })
          .map((accommodation) => {
            const lat = parseFloat(accommodation.Latitude);
            const lng = parseFloat(accommodation.Longitude);
            return (
              <Marker
                key={accommodation?.ID}
                title={accommodation?.Title}
                coordinate={{ latitude: lat, longitude: lng }}
                onPress={() => onMarkerSelected(accommodation)}
              >
                <Callout>
                  <View style={{ padding: 5 }}>
                    <CustomText style={{ fontSize: 16, flexWrap: "wrap" }}>
                      {accommodation?.Title}
                    </CustomText>
                  </View>
                </Callout>
              </Marker>
            );
          })}
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
                width: "95%",
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
              <CustomText
                style={{ fontSize: 22, fontWeight: 600, marginBottom: 20 }}
              >
                {selectedAccommodation?.Title || "Без названия"}
              </CustomText>
              {selectedAccommodation?.Images?.length > 0 ? (
                <ListImages images={selectedAccommodation.Images} />
              ) : (
                <CustomText>{i18n.t("noImage")}</CustomText>
              )}

              <View style={{ marginVertical: 20 }}>
                <CustomText
                  style={{ fontWeight: 500, fontSize: 18, marginBottom: 5 }}
                >
                  {i18n.t("label_description")}:
                </CustomText>
                <ScrollView style={{ height: 200 }}>
                  <CustomText>
                    {selectedAccommodation?.Description ||
                      i18n.t("noDescription")}
                  </CustomText>
                </ScrollView>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  columnGap: 5,
                  marginBottom: 30,
                }}
              >
                <CustomText style={{ fontWeight: 500, fontSize: 18 }}>
                  {i18n.t("price")}:
                </CustomText>
                <CustomText style={{ fontSize: 18 }}>
                  {selectedAccommodation?.Price
                    ? `${selectedAccommodation.Price} KGS/${i18n.t("night")}`
                    : "Цена не указана"}
                </CustomText>
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
                  <CustomText
                    style={{ fontSize: 18, color: "#fff", textAlign: "center" }}
                  >
                    {i18n.t("book")}
                  </CustomText>
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
