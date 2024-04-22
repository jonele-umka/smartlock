import React from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

const ListCardThree = ({ items, title, clickHandler }) => {
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
        <Image
          style={{
            width: "100%",
            height: 150,
            objectFit: "cover",
            borderRadius: 20,
          }}
          source={{
            uri: item?.image,
          }}
        />

        <Text
          style={[
            styles.cardTitle,
            //  isDarkModeEnabled && { color: "#fff" }
          ]}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles.cardDescription,
            //  isDarkModeEnabled && { color: "#fff" }
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSeparator = () => {
    return <View style={{ width: 20 }} />;
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            styles.paymentsContainerTitle,
            // isDarkModeEnabled && { color: "#fff" },
          ]}
        >
          {title}
        </Text>
        <Text style={{ color: "#000", paddingHorizontal: 10 }}>Еще</Text>
      </View>
      <View>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 15 }}
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
  paymentsContainerTitle: {
    fontSize: 22,
    color: "#000",
    fontWeight: 600,
    paddingHorizontal: 10,
  },
  cardContainer: {
    width: 180,
    height: "100%",
  },
  cardTitle: {
    flexWrap: "wrap",
    fontSize: 16,
    paddingTop: 10,
    color: "#000",
    fontWeight: 500,
  },
  cardDescription: {
    flexWrap: "wrap",
    fontSize: 14,
    paddingTop: 5,
    color: "grey",
  },
});

export default ListCardThree;
