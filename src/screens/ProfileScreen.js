import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import i18n from "../components/i18n/i18n";
import { Dialog } from "@rneui/themed";
import { getUserProfile, logoutUser } from "../Store/authSlice/authSlice";
import CustomText from "../components/CustomText/CustomText";
import SafeAreaWrapper from "../components/SafeAreaWrapper/SafeAreaWrapper";

const Link = ({ title, onPress, icon, disabled = false, isLast = false }) => (
  <TouchableOpacity
    style={{ paddingVertical: 15 }}
    onPress={onPress}
    disabled={disabled}
  >
    <View style={styles.linkContainer}>
      <View style={styles.linkContent}>
        <Icon name={icon} />
        <CustomText style={styles.linkText}>{title}</CustomText>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color="#1C2863" />
    </View>
    {isLast && <View style={styles.separator} />}
  </TouchableOpacity>
);

const Icon = ({ name }) =>
  name === "logout" ? (
    <MaterialCommunityIcons name="logout" size={20} color="#FE3C5F" />
  ) : (
    <Ionicons name={name} size={20} color="#4B5DFF" />
  );

const ProfileScreen = () => {
  const navigation = useNavigation();
  const API_URL = process.env.API_URL;
  const [avatarImage, setAvatarImage] = useState(null);

  const userProfile = useSelector((state) => state.auth.userProfile);
  const owner = useSelector((state) => state.auth.owner);

  const token = useSelector((state) => state.auth.token);
  const [refreshing, setRefreshing] = useState(false);
  const [modal, setModal] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const dispatch = useDispatch();
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await getUserProfile(token);
    loadProfileData();
    setRefreshing(false);
  };

  const loadProfileData = () => {
    const timestamp = new Date().getTime();
    if (!userProfile?.Avatar) {
      setAvatarImage(
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
      );
    } else {
      setAvatarImage(`${API_URL}/${userProfile.Avatar}?timestamp=${timestamp}`);
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getUserProfile(token));
      loadProfileData();
    }, [dispatch, token])
  );

  useEffect(() => {
    dispatch(getUserProfile(token));
  }, [dispatch, token]);

  const handleLogout = async () => {
    try {
      const response = await dispatch(logoutUser(token));
      if (response.type === "auth/logout/fulfilled") {
        setAvatarImage(
          "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
        );
        navigation.navigate("Главная страница");
      } else {
        console.log("Не удалось выйти");
      }
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  const handlePress = () => {
    if (token) {
      navigation.navigate("Редактировать профиль");
    } else {
      console.log("Пользователь не авторизован");
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };
  const links = [
    token && {
      title: "Настройки",
      onPress: () => navigation.navigate("Настройки"),
      icon: "settings-outline",
    },
    token
      ? { title: i18n.t("logOut"), onPress: toggleModal, icon: "logout" }
      : {
          title: "Войти",
          onPress: () => navigation.navigate("Войти"),
          icon: "logout",
        },
  ].filter(Boolean);

  if (owner === "owner") {
    if (Array.isArray(links)) {
      links.unshift({
        title: "Владелец",
        onPress: () => navigation.navigate("Владелец"),
        icon: "person-outline",
      });
    }
  }
  if (owner === "client") {
    if (Array.isArray(links)) {
      links.unshift({
        title: "Стать владельцем",
        onPress: () => navigation.navigate("Стать владельцем"),
        icon: "person-outline",
      });
    }
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SafeAreaWrapper style={styles.safeAreaWrapper}>
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!isImageLoaded && (
                <ActivityIndicator size="large" color="#fff" />
              )}
              <Image
                source={{ uri: avatarImage }}
                style={styles.avatar}
                onLoad={handleImageLoad}
              />
            </View>
            <View>
              <CustomText style={styles.nickname}>
                {userProfile?.Nickname || "User"}
              </CustomText>
              <CustomText style={styles.biography}>
                {userProfile?.Biography || "Description"}
              </CustomText>
            </View>
          </View>
          {token && (
            <TouchableOpacity onPress={handlePress} style={styles.dotsButton}>
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.linksContainer}>
          {links.map((link, index) => (
            <Link
              key={index}
              title={link.title}
              onPress={link.onPress}
              icon={link.icon}
              isLast={index === links.length - 2}
            />
          ))}
        </View>
        <Dialog isVisible={modal} onBackdropPress={toggleModal}>
          <Dialog.Title title={i18n.t("areYouSureYouWantToLogOut")} />
          <View style={styles.modalActions}>
            <TouchableOpacity onPress={toggleModal}>
              <CustomText style={styles.modalText}>{i18n.t("no")}</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                toggleModal();
                handleLogout();
              }}
            >
              <CustomText style={styles.modalText}>{i18n.t("yes")}</CustomText>
            </TouchableOpacity>
          </View>
        </Dialog>
      </SafeAreaWrapper>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  safeAreaWrapper: { flex: 1, backgroundColor: "#4B5DFF" },
  profileHeader: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  avatar: { borderRadius: 50, width: 70, height: 70 },
  nickname: { color: "#fff", fontWeight: "500", fontSize: 18 },
  biography: { color: "#fff" },
  dotsButton: {
    backgroundColor: "rgb(165,174,255)",
    borderRadius: 10,
    padding: 10,
  },
  linksContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#fff",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linkContent: { flexDirection: "row", alignItems: "center", columnGap: 15 },
  linkText: { fontWeight: "500" },
  separator: {
    height: 1,
    backgroundColor: "rgba(222, 226, 241, 1)",
    marginTop: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalText: { fontSize: 18 },
});

export default ProfileScreen;
