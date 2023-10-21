import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";

const Card = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const page = Math.floor(contentOffset.x / layoutMeasurement.width);
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      >
        <View style={[styles.slide, { backgroundColor: "red" }]}>
          <Text style={styles.slideText}>Slide 1</Text>
        </View>
        <View style={[styles.slide, { backgroundColor: "green" }]}>
          <Text style={styles.slideText}>Slide 2</Text>
        </View>
        <View style={[styles.slide, { backgroundColor: "blue" }]}>
          <Text style={styles.slideText}>Slide 3</Text>
        </View>
      </ScrollView>
      <View style={styles.pagination}>
        {[...Array(3)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              currentPage === index && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  slideText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: "#191a1d",
  },
});

export default Card;
