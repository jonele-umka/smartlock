import React, { useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const ListCategories = ({ items }) => {
  //   const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  const onPress = (index) => {
    setActiveIndex(index);
  };

  // const isDarkModeEnabled = useSelector(
  //   (state) => state.theme.isDarkModeEnabled
  // );
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          styles.cardContainer,
          activeIndex === index && { backgroundColor: "#000" },
          // isDarkModeEnabled && { backgroundColor: "#272727" },
        ]}
        onPress={() => onPress(index, item.page)}
      >
        <Text
          style={[
            styles.cardTitle,
            activeIndex === index && { color: "#fff" },
            //  isDarkModeEnabled && { color: "#fff" }
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSeparator = () => {
    return <View style={{ width: 10 }} />;
  };

  return (
    <View>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 10, marginBottom: 20 }}
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
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cardTitle: {
    flexWrap: "wrap",
    fontSize: 18,
    color: "#000",
  },
});

export default ListCategories;
