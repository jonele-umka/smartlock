import React from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

const ListCard = ({ items, title, clickHandler }) => {
  //   const navigation = useNavigation();
  const onPress = (page) => {
    clickHandler(page);
  };
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.cardContainer,
          // isDarkModeEnabled && { backgroundColor: "#272727" },
        ]}
        onPress={() => onPress(item.page)}
      >
        <View
          style={{
            backgroundColor: "#5d00e6",
            borderRadius: 10,
            padding: 5,
          }}
        >
          <Icon
            name={item?.icon || "repeat-variant"}
            size={30}
            color={"#fff"}
          />
        </View>
        <Text
          style={[
            styles.cardTitle,
            //  isDarkModeEnabled && { color: "#fff" }
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSeparator = () => {
    return <View style={{ width: 15 }} />;
  };

  return (
    <View>
      <Text
        style={[
          styles.paymentsContainerTitle,
          // isDarkModeEnabled && { color: "#fff" },
        ]}
      >
        {title}
      </Text>
      <View>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 15 }}  
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={items}
          horizontal
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paymentsContainerTitle: {
    fontSize: 25,
    color: "#fff",
    fontWeight: 500,
    paddingHorizontal: 10,
  },
  cardContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "auto",
    borderRadius: 20,
    padding: 15,
    width: 120,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.05)",
    shadowColor: "rgba(255,255,255,0.05)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8.84,
    elevation: 5,
  },
  cardTitle: {
    flexWrap: "wrap",
    fontSize: 14,
    paddingTop: 10,
    color: "#fff",
    fontWeight: 500,
  },
  icon: {
    width: 40,
    height: 30,
  },
});

export default ListCard;
