import React, { useState } from "react";

import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Localization from "expo-localization";
import i18n from "../../components/i18n/i18n";
import { Dialog } from "@rneui/themed";
import Link from "../../components/Link/Link";
import ActionLanguage from "../../components/ActionSheet/ActionLanguage/ActionLanguage";
import SafeAreaWrapper from "../../components/SafeAreaWrapper/SafeAreaWrapper";
import { useSelector } from "react-redux";

const Settings = () => {
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.token);

  // language

  const [language, setLanguage] = useState(Localization.locale);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  const links = [
    {
      title: "Изменить почту",
      onPress: () => navigation.navigate("Изменить почту"),
    },
    {
      title: "Сменить пароль",
      onPress: () => navigation.navigate("Сменить пароль"),
    },
  ];
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
      contentContainerStyle={{ paddingHorizontal: 10 }}
    >
      <SafeAreaWrapper>
        <Dialog isVisible={modal}>
          <Dialog.Title title={i18n.t("areYouSureYouWantToLogOut")} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                toggleModal();
              }}
            >
              <Text style={{ fontSize: 18 }}>{i18n.t("no")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                toggleModal();
                // handleLogout();
              }}
            >
              <Text style={{ fontSize: 18 }}>{i18n.t("yes")}</Text>
            </TouchableOpacity>
          </View>
        </Dialog>

        <ActionLanguage language={language} setLanguage={setLanguage} />
        {token && (
          <View>
            {links.map((link, index) => (
              <Link
                key={index}
                title={link.title}
                onPress={link.onPress}
                icon={link.icon}
                isLast={index === links.length - 1}
              />
            ))}
          </View>
        )}
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default Settings;
