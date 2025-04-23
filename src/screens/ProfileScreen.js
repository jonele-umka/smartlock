import React, { useState, useCallback } from "react";
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
import i18n from "../../i18n/i18n";
import { Dialog } from "@rneui/themed";
import { getUserProfile, logoutUser } from "../Store/authSlice/authSlice";
import CustomText from "../components/CustomText/CustomText";
import SafeAreaWrapper from "../components/SafeAreaWrapper/SafeAreaWrapper";
import {
  clearSelectedAmenities,
  fetchSearchResults,
} from "../Store/searchSlice/searchSlice";
import { fetchAmenities } from "../Store/dictionarySlice/dictionarySlice";

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
  const statusOwner = useSelector((state) => state.auth.statusOwner);
  const role = useSelector((state) => state.auth.role);
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.auth.loading);
  const [refreshing, setRefreshing] = useState(false);
  const [modal, setModal] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const dispatch = useDispatch();
  // const language = useSelector((state) => state.language.language);

  // const route = useRoute();
  // useEffect(() => {
  //   if (route.params?.updated) {
  //     dispatch(getUserProfile());
  //   }
  // }, [route.params]);

  // useEffect(() => {
  //   const checkPendingOwner = async () => {
  //     const pending = await AsyncStorage.getItem("isPendingOwner");
  //     setIsPendingOwner(pending === "true");
  //   };
  //   checkPendingOwner();
  // }, []);

  // useEffect(() => {
  //   if (owner === "owner") {
  //     AsyncStorage.removeItem("isPendingOwner");
  //     setIsPendingOwner(false);
  //   }
  // }, [owner]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const loadProfileData = () => {
    const timestamp = new Date().getTime();

    if (userProfile?.Profile?.Avatar) {
      setAvatarImage(
        `${API_URL}/${userProfile?.Profile?.Avatar}?timestamp=${timestamp}`
      );
    } else {
      setAvatarImage(
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getUserProfile(token));
      loadProfileData();
    }, [dispatch, token])
  );

  const handleLogout = async () => {
    try {
      const response = await dispatch(logoutUser(token));
      if (response.type === "auth/logout/fulfilled") {
        setAvatarImage(
          "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
        );
        navigation.navigate("Главная страница");
        dispatch(fetchSearchResults({}));
        dispatch(clearSelectedAmenities());
        dispatch(fetchAmenities());
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
      alert("Пользователь не авторизован");
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const links = [
    {
      title: i18n.t("settings"),
      onPress: () => navigation.navigate("Настройки"),
      icon: "settings-outline",
    },
    token
      ? { title: i18n.t("logout"), onPress: toggleModal, icon: "logout" }
      : {
          title: i18n.t("login"),
          onPress: () => navigation.navigate("Войти"),
          icon: "logout",
        },
  ].filter(Boolean);
 
  if (statusOwner === "approved") {
    links.unshift({
      title: i18n.t("owner"),
      onPress: () => navigation.navigate("Владелец"),
      icon: "person-outline",
    });
  } else if (statusOwner === "pending") {
    links.unshift({
      title: i18n.t("pending"),
      onPress: () => navigation.navigate("Заявка на подтверждение"),
      icon: "person-outline",
    });
  } else if (role === "client") {
    links.unshift({
      title: i18n.t("becomeOwner"),
      onPress: () => navigation.navigate("Данные владельца"),
      icon: "person-outline",
    });
  }

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getUserProfile(token));
    loadProfileData();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#4B5DFF" />
      </View>
    );
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
                {userProfile?.Profile?.Nickname || "User"}
              </CustomText>
              {/* <CustomText style={styles.biography}>
                {userProfile?.Biography || "Description"}
              </CustomText> */}
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
          <Dialog.Title title={i18n.t("logoutQuestions")} />
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
