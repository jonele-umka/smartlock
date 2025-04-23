import React from "react";
import { FlatList, View } from "react-native";
// import Fontisto from "react-native-vector-icons/Fontisto";
// import CustomText from "../../CustomText/CustomText";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Objects from "../../ObjectsComponent/Objects";

const BestObjectsList = ({ items }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={{ width: 340 }}>
        <Objects items={item} />
      </View>
    );
  };

  const renderSeparator = () => {
    return <View style={{ width: 20 }} />;
  };

  return (
    <View>
      <FlatList
        contentContainerStyle={{
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

export default BestObjectsList;
