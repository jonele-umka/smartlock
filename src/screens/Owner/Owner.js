import React from "react";

import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Link from "../../components/Link/Link";
import SafeAreaWrapper from "../../components/SafeAreaWrapper/SafeAreaWrapper";

const Owner = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
      contentContainerStyle={{ paddingHorizontal: 10 }}
    >
      <SafeAreaWrapper>
        <Link
          title={"Редактировать данные владельца"}
          onPress={() => navigation.navigate("Редактировать данные владельца")}
        />
        <Link
          title={"Управление объектами"}
          onPress={() => navigation.navigate("Управление объектами")}
        />

        <Link title={"Заявки"} onPress={() => navigation.navigate("Заявки")} />
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default Owner;
