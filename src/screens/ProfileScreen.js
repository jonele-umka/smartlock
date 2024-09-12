import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TouchableOpacity, Image, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import i18n from "../components/i18n/i18n";
import { Dialog } from "@rneui/themed";
import { logoutUser } from "../Store/authSlice/authSlice";
import CustomText from "../components/CustomText/CustomText";
import SafeAreaWrapper from "../components/SafeAreaWrapper/SafeAreaWrapper";

// link
const Link = ({ title, onPress, icon, disabled = false, isLast = false }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 15,
          }}
        >
          <View>
            {icon === "logout" ? (
              <MaterialCommunityIcons
                name={"logout"}
                size={20}
                color={"#FE3C5F"}
              />
            ) : (
              <Ionicons name={icon} size={20} color={"#4B5DFF"} />
            )}
          </View>
          <View>
            <CustomText
              style={{
                fontWeight: 500,
              }}
            >
              {title}
            </CustomText>
          </View>
        </View>
        <View>
          <MaterialCommunityIcons
            name={"chevron-right"}
            size={20}
            color={"#1C2863"}
          />
        </View>
      </View>
      {!isLast && (
        <View
          style={{
            height: 1,
            backgroundColor: "#e0e0e0",
            marginTop: 15,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const API_URL = process.env.API_URL;
  const [avatarImage, setAvatarImage] = useState(null);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const owner = useSelector((state) => state.auth.owner);
  const avatar = userProfile?.Avatar;
  const token = useSelector((state) => state.auth.token);

  const loadProfileData = () => {
    const timestamp = new Date().getTime();
    if (avatar) {
      setAvatarImage(`${API_URL}/${avatar}?timestamp=${timestamp}`);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfileData();
    }, [avatar])
  );

  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleLogout = async () => {
    try {
      const response = await dispatch(logoutUser());

      if (response.type === "auth/logout/fulfilled") {
        navigation.navigate("Главная страница");
      } else {
        console.log("Не удалось выйти");
      }
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  const links = [
    {
      title: "Настройки",
      onPress: () => navigation.navigate("Настройки"),
      icon: "settings-outline",
    },
    // {
    //   title: "Платежи и выплаты",
    //   onPress: () => navigation.navigate("Платежи и выплаты"),
    //   icon: "cash",
    // },
    // {
    //   title: i18n.t("help"),
    //   onPress: () => navigation.navigate("Помощь"),
    //   icon: "help",
    // },

    token
      ? { title: i18n.t("logOut"), onPress: toggleModal, icon: "logout" }
      : {
          title: "Войти",
          onPress: () => navigation.navigate("Войти"),
          icon: "logout",
        },
  ];
  if (owner === "owner") {
    links.unshift({
      title: "Владелец",
      onPress: () => navigation.navigate("Владелец"),
      icon: "person-outline",
    });
  }
  const handlePress = () => {
    if (token) {
      navigation.navigate("Редактировать профиль");
    } else {
      // Здесь можно показать сообщение или ничего не делать
      console.log("Пользователь не авторизован");
    }
  };
  return (
    <SafeAreaWrapper style={{ flex: 1, backgroundColor: "#4B5DFF" }}>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            borderRadius: 20,
          }}
          onPress={handlePress}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 20,
              }}
            >
              {userProfile?.Avatar ? (
                <Image
                  source={{
                    uri:
                      avatarImage ||
                      "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
                  }}
                  style={{
                    borderRadius: 50,
                    width: 70,
                    height: 70,
                  }}
                />
              ) : (
                <Image
                  source={{
                    uri: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
                  }}
                  style={{
                    borderRadius: 50,
                    width: 70,
                    height: 70,
                  }}
                />
              )}
              <View>
                {userProfile?.Nickname ? (
                  <CustomText
                    style={
                      {
                        color: "#fff",
                        fontWeight: 500,
                        fontSize: 18,
                      }
                      //   [
                      //   isDarkModeEnabled ? { color: "#fff" } : { color: "#191a1d" },
                      // ]
                    }
                  >
                    {userProfile?.Nickname}
                  </CustomText>
                ) : (
                  <CustomText
                    style={
                      {
                        color: "#fff",
                        fontWeight: 500,
                      }
                      //   [
                      //   isDarkModeEnabled ? { color: "#fff" } : { color: "#191a1d" },
                      // ]
                    }
                  >
                    User
                  </CustomText>
                )}
                {userProfile?.Biography ? (
                  <CustomText style={{ color: "#fff", marginBottom: 10 }}>
                    {userProfile?.Biography}
                  </CustomText>
                ) : (
                  <CustomText style={{ color: "#fff" }}>Description</CustomText>
                )}
              </View>
            </View>
            <View>
              <MaterialCommunityIcons
                name={"chevron-right"}
                size={20}
                color={"#fff"}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: 10,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,

          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            rowGap: 15,
            paddingHorizontal: 10,
          }}
        >
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
      </View>
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
            <CustomText style={{ fontSize: 18 }}>{i18n.t("no")}</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleModal();
              handleLogout();
            }}
          >
            <CustomText style={{ fontSize: 18 }}>{i18n.t("yes")}</CustomText>
          </TouchableOpacity>
        </View>
      </Dialog>
    </SafeAreaWrapper>
  );
};

export default ProfileScreen;
