import React, { useState } from "react";
import { FlatList, Text, View, StyleSheet, Image } from "react-native";
import { shadow, sizes, spacing } from "../Theme";
import AntDesign from "react-native-vector-icons/AntDesign";

const CARD_WIDTH = sizes.width - 48;
const CARD_HEIGHT = 140;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;
const list = [
  {
    id: 1,
    image:
      "https://www.eeas.europa.eu/sites/default/files/styles/site_logo/public/media/eu-flag.png?itok=iwv4PoOU",
    currency: "EUR EUR",
    check: 0.01,
  },
  {
    id: 2,
    image:
      "https://www.eeas.europa.eu/sites/default/files/styles/site_logo/public/media/eu-flag.png?itok=iwv4PoOU",
    currency: "Granada",
    check: 50,
  },
  {
    id: 3,
    image:
      "https://www.eeas.europa.eu/sites/default/files/styles/site_logo/public/media/eu-flag.png?itok=iwv4PoOU",
    currency: "Cherry blossoms",
    check: 43,
  },
];

const AccountsCard = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const renderDot = (index) => {
    const isActive = index === activeSlideIndex;
    return <View style={[styles.dot, isActive && styles.activeDot]} />;
  };

  return (
    <View style={{ marginBottom: 20 }}>
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
                marginLeft: spacing.l,
                marginRight: index === list.length - 1 ? spacing.l : 0,
                marginBottom: 10,
                paddingTop: 10,
              }}
            >
              <View key={index} style={[styles.card, shadow.dark]}>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <Image
                    style={{ width: 30, height: 30, borderRadius: 50 }}
                    source={{ uri: item.image }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={styles.currency}>{item.currency}</Text>
                    <Text style={styles.check}>€ {item.check}</Text>
                  </View>
                  <View>
                    <AntDesign
                      name="arrowright"
                      style={{ fontSize: 20, color: "#fff" }}
                    />
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
      <View style={styles.dotContainer}>
        {list.map((_, index) => {
          const isActive = index === activeSlideIndex;
          return <View key={index} style={[styles.dot, isActive && styles.activeDot]} />;
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
    backgroundColor: "#8b5cf6",
    borderRadius: 15,
    padding: 20,
  },
  currency: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 5,
  },
  check: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
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
    backgroundColor: "#8b5cf6",
  },
});

export default AccountsCard;
