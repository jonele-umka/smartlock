import React, { useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width - 45;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + 25;
const list = [
  {
    id: 1,
    backImage: require("../../../../assets/cardBack.png"),
    imageChip: require("../../../../assets/chip.png"),
    imageCardType: require("../../../../assets/masterCard.png"),
    check: "54,111",
    user: "username",
  },
  {
    id: 2,
    backImage: require("../../../../assets/cardBack.png"),
    imageChip: require("../../../../assets/chip.png"),
    imageCardType: require("../../../../assets/masterCard.png"),
    check: "47,585",
    user: "username",
  },
  {
    id: 3,
    backImage: require("../../../../assets/cardBack.png"),
    imageChip: require("../../../../assets/chip.png"),
    imageCardType: require("../../../../assets/masterCard.png"),
    check: "200,654",
    user: "username",
  },
];

const CardsCard = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const renderDot = (index) => {
    const isActive = index === activeSlideIndex;
    return <View style={[styles.dot, isActive && styles.activeDot]} />;
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <FlatList
        data={list}
        horizontal
        snapToInterval={CARD_WIDTH_SPACING}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onScroll={(event) => {
          const xOffset = event.nativeEvent.contentOffset.x;
          const index = Math.round(xOffset / CARD_WIDTH_SPACING);
          setActiveSlideIndex(index);
        }}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                marginLeft: 24,
                marginRight: index === list.length - 1 ? 24 : 0,
                paddingVertical: 20,
              }}
            >
              <ImageBackground
                source={item.backImage}
                imageStyle={{ borderRadius: 25 }}
                // colors={["#8b88fb", "#0268EC"]}
                // start={{ x: 0.5, y: 0 }}
                // end={{ x: 0.5, y: 1 }}
                key={index}
                style={[styles.card, styles.shadow]}
              >
                <Image source={item.imageChip} />

                <View>
                  <Text style={styles.check}>$ {item.check}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.user}>{item.user}</Text>
                  <View>
                    <Image source={item.imageCardType} />
                  </View>
                </View>
              </ImageBackground>
            </View>
          );
        }}
      />

      <View style={styles.dotContainer}>
        {list.map((_, index) => {
          const isActive = index === activeSlideIndex;
          return (
            <View
              key={index}
              style={[styles.dot, isActive && styles.activeDot]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8.84,
    elevation: 5,
  },
  check: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 30,
  },
  user: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 22,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#5d00e6",
  },
});

export default CardsCard;
