import React from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";

const ListCard = ({ items, clickHandler }) => {
  const onPress = (page) => {
    clickHandler(page);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => onPress(item.page)}
      >
        <ImageBackground
          style={styles.imageBackground}
          source={{
            uri: item.image
          }}
        >
          <View style={styles.overlay} />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.bottomContent}>
            <View style={styles.locationContainer}>
              <Fontisto name="map-marker-alt" style={styles.locationIcon} />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>KGS {item.price}</Text>
              <Text style={styles.priceDescription}>ночь</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderSeparator = () => {
    return <View style={{ width: 20 }} />;
  };

  return (
    <View>
      <View>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 10, marginBottom: 30 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={items}
          horizontal
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 320,
    borderRadius: 20,
    overflow: "hidden",
  },
  imageBackground: {
    width: "100%",
    height: 180,
    justifyContent: "space-between",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)", // Задаем цвет оверлея
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  locationIcon: {
    color: "#f0f0f0",
    fontSize: 16,
  },
  locationText: {
    color: "#f0f0f0",
    fontSize: 16,
  },
  priceContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  priceDescription: {
    textAlign: "right",
    color: "#b8b8b8",
    fontSize: 16,
  },
});

export default ListCard;
