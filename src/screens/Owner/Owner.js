import React from "react";

import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// link
const Link = ({ title, onClick, disabled = false }) => {
  // const isDarkModeEnabled = useSelector(
  //   (state) => state.theme.isDarkModeEnabled
  // );

  return (
    <TouchableOpacity
      onPress={onClick}
      disabled={disabled}
      style={{
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={
            {
              color: "#000",
              fontSize: 16,
            }
            //   [
            //   isDarkModeEnabled ? { color: "#fff" } : { color: "#191a1d" },
            // ]
          }
        >
          {title}
        </Text>

        <Icon name={"chevron-right"} size={20} color={"#00CDAC"} />
      </View>
    </TouchableOpacity>
  );
};

const Owner = () => {
  const navigation = useNavigation();

  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <SafeAreaWrapper
      style={{ flex: 1, backgroundColor: "#fff" }}
      // style={
      //   [isDarkModeEnabled && { backgroundColor: "#383838" }]
      // }
    >
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontSize: 30,
            marginBottom: 20,
            color: "#000",
            fontWeight: 600,
          }}
        >
          Владелец
        </Text>
        <View style={{ flexDirection: "column", rowGap: 20 }}>
          <Link
            title={"Редактировать данные владельца"}
            onClick={() =>
              navigation.navigate("Редактировать данные владельца")
            }
          />
          <Link
            title={"Управление объектами"}
            onClick={() => navigation.navigate("Управление объектами")}
          />

          <Link
            title={"Заявки"}
            onClick={() => navigation.navigate("Заявки")}
          />
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default Owner;
