import React, { useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import CustomText from "../../CustomText/CustomText";

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
          activeIndex === index && {
            backgroundColor: "#00c6ff",
          },
          // isDarkModeEnabled && { backgroundColor: "#272727" },
        ]}
        onPress={() => onPress(index, item.page)}
      >
        <View
          style={{ flexDirection: "row", columnGap: 10, alignItems: "center" }}
        >
          <View
            style={{ padding: 5, backgroundColor: "#fff", borderRadius: 10 }}
          >
            <Image source={item.image} style={{ width: 20, height: 20 }} />
          </View>
          <CustomText
            style={[
              styles.cardTitle,
              activeIndex === index && { color: "#fff" },
              //  isDarkModeEnabled && { color: "#fff" }
            ]}
          >
            {item.title}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSeparator = () => {
    return <View style={{ width: 10 }} />;
  };

  return (
    <View>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 10,
          marginVertical: 30,
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
    backgroundColor: "#f7f7f7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  cardTitle: {
    flexWrap: "wrap",
    fontSize: 18,
    color: "#000",
  },
});

export default ListCategories;
