import React from "react";

import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Link from "../../components/Link/Link";
import SafeAreaWrapper from "../../components/SafeAreaWrapper/SafeAreaWrapper";
import i18n from "../../components/i18n/i18n";

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
          title={i18n.t("editDataOwner")}
          onPress={() => navigation.navigate("Редактировать данные владельца")}
        />
        <Link
          title={i18n.t("objectManagement")}
          onPress={() => navigation.navigate("Управление объектами")}
        />

        <Link
          title={i18n.t("applications")}
          onPress={() => navigation.navigate("Заявки")}
        />
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default Owner;
