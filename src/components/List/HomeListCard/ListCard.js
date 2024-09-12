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
import CustomText from "../../CustomText/CustomText";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ListCard = ({ items, API_URL, navigation }) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() =>
          navigation.navigate("Детали объекта", {
            id: item.ID,
          })
        }
      >
        <ImageBackground
          style={styles.imageBackground}
          resizeMode={
            item.Images && item.Images.length > 0 && item.Images[0].ImageUrl
              ? "cover"
              : "contain"
          }
          source={
            item.Images && item.Images.length > 0 && item.Images[0].ImageUrl
              ? { uri: `${API_URL}/${item.Images[0].ImageUrl}` }
              : require("../../../assets/noImg.png")
          }
        >
          {/* <View style={styles.overlay} /> */}
          <View style={styles.contentContainer}>
            <View style={styles.priceContainer}>
              <CustomText style={styles.price}>
                {item.DiscountPrice} c /ночь
              </CustomText>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
                backgroundColor: "rgba(97, 105, 146, 0.8)",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <MaterialIcons
                name="star-outline"
                style={{ color: "#fff", fontSize: 20 }}
              />
              <CustomText
                style={{ color: "#fff", fontWeight: 500, fontSize: 16 }}
              >
                {item.Rating}
              </CustomText>
            </View>
          </View>
          <View style={styles.bottomContent}>
            <CustomText style={styles.title}>{item.Title}</CustomText>
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
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 10,
          marginTop: 15,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={items}
        horizontal
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
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
  // overlay: {
  //   ...StyleSheet.absoluteFillObject,
  //   backgroundColor: "rgba(0,0,0,0.5)",
  // },
  contentContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    color: "#fff",
  },
  bottomContent: {
    backgroundColor: "rgba(97, 105, 146, 0.8)",
    padding: 10,
  },
  // locationContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   columnGap: 5,
  // },
  // locationIcon: {
  //   color: "#f0f0f0",
  //   fontSize: 16,
  // },
  // locationText: {
  //   color: "#f0f0f0",
  //   fontSize: 16,
  // },
  priceContainer: {
    backgroundColor: "rgba(97, 105, 146, 0.8)",
    padding: 5,
    borderRadius: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  // priceDescription: {
  //   textAlign: "right",
  //   color: "#b8b8b8",
  //   fontSize: 16,
  // },
});

export default ListCard;
