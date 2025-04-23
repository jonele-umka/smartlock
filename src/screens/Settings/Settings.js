import React, { useEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import i18n from "../../../i18n/i18n";
import { Dialog } from "@rneui/themed";
import Link from "../../components/Link/Link";
import { useDispatch, useSelector } from "react-redux";
import ActionLanguage from "../../components/ActionSheet/ActionLanguage/ActionLanguage";
import CustomText from "../../components/CustomText/CustomText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { deleteAccount } from "../../Store/authSlice/authSlice";
const Settings = () => {
  const language = useSelector((state) => state.language.language);
  const shortLanguage = language.includes("-")
    ? language.split("-")[0]
    : language;

  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.token);
  const actionSheetRef = useRef();
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      title: i18n.t("settings"),
    });
  }, [language, navigation]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleDeleteAccount = async () => {
    const result = await dispatch(deleteAccount({ token }));

    if (deleteAccount.fulfilled.match(result)) {
      if (role === "client") {
        navigation.navigate("Главная страница");
      } else if (role === "owner") {
        Alert.alert(i18n.t("waitForModerator"), "", [
          {
            text: "ОК",
            onPress: () => navigation.navigate("Главная страница"),
          },
        ]);
      }
    }
  };

  const links = [
    {
      title: i18n.t("changeEmail"),
      onPress: () => navigation.navigate("Изменить почту"),
    },
    {
      title: i18n.t("changePassword"),
      onPress: () => navigation.navigate("Сменить пароль"),
    },
  ];

  // useEffect(() => {
  //   Localization.locale = language;
  //   i18n.setLocale(language);
  // }, [language]);

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        <Dialog isVisible={modal}>
          <Dialog.Title title={i18n.t("areYouSureYouWantToLogOut")} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <TouchableOpacity onPress={toggleModal}>
              <Text style={{ fontSize: 18 }}>{i18n.t("no")}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={{ fontSize: 18 }}>{i18n.t("yes")}</Text>
            </TouchableOpacity>
          </View>
        </Dialog>

        <Dialog isVisible={deleteModal}>
          <Dialog.Title title={i18n.t("seriosDelete")} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <TouchableOpacity onPress={() => setDeleteModal(false)}>
              <Text style={{ fontSize: 18, color: "black" }}>
                {i18n.t("no")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDeleteModal(false);
                handleDeleteAccount();
              }}
            >
              <Text style={{ fontSize: 18, color: "red" }}>
                {i18n.t("yes")}
              </Text>
            </TouchableOpacity>
          </View>
        </Dialog>

        {/* Выбор языка */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 15,
          }}
          onPress={() => actionSheetRef.current?.show()}
        >
          <CustomText style={{ fontSize: 16 }}>{i18n.t("language")}</CustomText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {shortLanguage === "ky" && (
              <CustomText style={{ color: "grey" }}>Кыргызча</CustomText>
            )}
            {shortLanguage === "en" && (
              <CustomText style={{ color: "grey" }}>English</CustomText>
            )}
            {shortLanguage === "ru" && (
              <CustomText style={{ color: "grey" }}>Русский</CustomText>
            )}
            <Icon name={"chevron-right"} size={20} color={"#1C2863"} />
          </View>
        </TouchableOpacity>
        <ActionLanguage actionSheetRef={actionSheetRef} />

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

        {/* Содержимое с кнопкой удаления аккаунта */}
      </ScrollView>

      {token && (
        <View
          style={{
            position: "absolute",
            bottom: 30,
            left: 0,
            right: 0,
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity
            style={{
              paddingVertical: 15,
            }}
            onPress={() => setDeleteModal(true)}
          >
            <CustomText
              style={{ fontSize: 16, color: "red", textAlign: "center" }}
            >
              {i18n.t("deleteMe")}
            </CustomText>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Settings;
