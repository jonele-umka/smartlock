import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import SafeAreaWrapper from "../../../components/SafeAreaWrapper/SafeAreaWrapper";
import { useNavigation } from "@react-navigation/core";

const Consideration = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Главная страница");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);
  
  return (
    <SafeAreaWrapper
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={require("../../../assets/Consideration.png")}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />
      <View>
        <Text
          style={{
            color: "rgba(28, 40, 99, 1)",
            fontSize: 20,
            fontWeight: 600,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Ваша заявка находится на рассмотрении
        </Text>
        <Text
          style={{
            color: "rgba(28, 40, 99, 1)",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          Ожидайте ответ в ближайшее время
        </Text>
      </View>
    </SafeAreaWrapper>
  );
};

export default Consideration;
