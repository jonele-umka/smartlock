import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/core";
import PickImage from "../../components/PickImage/PickImage";
// import ActionSheet from "react-native-actions-sheet";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
// import Entypo from "react-native-vector-icons/Entypo";
import CustomText from "../../components/CustomText/CustomText";
// import CustomPicker from "../../components/CustomPicker/CustomPicker";
import { getUserProfile } from "../../Store/authSlice/authSlice";
import i18n from "../../../i18n/i18n";
import CustomPicker from "../../components/CustomPicker/CustomPicker";
import Entypo from "react-native-vector-icons/Entypo";
import ActionSheet from "react-native-actions-sheet";

const EditProfile = () => {
  const route = useRoute();
  const dispatch = useDispatch();

  const { control, handleSubmit, setValue } = useForm();
  const API_URL = process.env.API_URL;
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [internationalImage, setInternationalImage] = useState(null);
  const [internationalSelfie, setInternationalSelfie] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);
  const [selfieImage, setSelfieImage] = useState(null);
  const [passportType, setPassportType] = useState("ID");
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPhotoType, setCurrentPhotoType] = useState(null);
  const navigation = useNavigation();
  const actionSheetRef = useRef();
  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.auth.loading);
  // const owner = useSelector((state) => state.auth.owner);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const avatar = userProfile?.Profile?.Avatar;
  const IDPassportPhotoFront =
    userProfile?.Profile?.Passport?.IDPassportPhotoFront;
  const IDPassportPhotoBack =
    userProfile?.Profile?.Passport?.IDPassportPhotoBack;
  const IDPassportPhotoWithClient =
    userProfile?.Profile?.Passport?.IDPassportPhotoWithClient;
  const InternationalPassportPhoto =
    userProfile?.Profile?.Passport?.InternationalPassportPhoto;
  const InternationalPassportPhotoWithClient =
    userProfile?.Profile?.Passport?.InternationalPassportPhotoWithClient;
  // const [shouldNavigate, setShouldNavigate] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile(token));
  }, [dispatch, token]);

  const loadProfileData = () => {
    const timestamp = new Date().getTime();
    if (avatar && !avatarImage) {
      setAvatarImage(`${API_URL}/${avatar}?timestamp=${timestamp}`);
    }
    if (IDPassportPhotoFront && !frontImage) {
      setFrontImage(`${API_URL}${IDPassportPhotoFront}?timestamp=${timestamp}`);
    }
    if (IDPassportPhotoBack && !backImage) {
      setBackImage(`${API_URL}${IDPassportPhotoBack}?timestamp=${timestamp}`);
    }
    if (IDPassportPhotoWithClient && !selfieImage) {
      setSelfieImage(
        `${API_URL}${IDPassportPhotoWithClient}?timestamp=${timestamp}`
      );
    }
    if (InternationalPassportPhoto && !internationalImage) {
      setInternationalImage(
        `${API_URL}${InternationalPassportPhoto}?timestamp=${timestamp}`
      );
    }
    if (InternationalPassportPhotoWithClient && !internationalSelfie) {
      setInternationalSelfie(
        `${API_URL}${InternationalPassportPhotoWithClient}?timestamp=${timestamp}`
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfileData();
    }, [
      avatar,
      IDPassportPhotoFront,
      IDPassportPhotoBack,
      IDPassportPhotoWithClient,
      InternationalPassportPhoto,
      InternationalPassportPhotoWithClient,
    ])
  );

  const navigateToCamera = (type) => {
    navigation.navigate("Камера", { type });
  };
  useEffect(() => {
    if (route.params?.cameraImg) {
      switch (route.params?.type) {
        case "front":
          setFrontImage(route.params?.cameraImg);
          break;
        case "back":
          setBackImage(route.params?.cameraImg);
          break;
        case "selfie":
          setSelfieImage(route.params?.cameraImg);
          break;
        case "international":
          setInternationalImage(route.params?.cameraImg);
          break;
        case "internationalSelfie":
          setInternationalSelfie(route.params?.cameraImg);
          break;
        default:
          break;
      }
      setIsActionSheetVisible(false);
    }
  }, [route.params]);

  useEffect(() => {
    if (isActionSheetVisible) {
      actionSheetRef.current?.show();
    } else {
      actionSheetRef.current?.hide();
    }
  }, [isActionSheetVisible]);

  useEffect(() => {
    setValue("Nickname", userProfile?.Profile?.Nickname || "");
    // setValue("Biography", userProfile?.Profile?.Biography || "");
    setValue("PhoneNumber", userProfile?.Profile?.PhoneNumber || "");
  }, [userProfile, setValue]);

  const handleProfileUpdate = async (isBookable) => {
    try {
      const formData = new FormData();

      if (avatarImage) {
        formData.append("Avatar", {
          uri: avatarImage,
          name: "avatar.jpg",
          type: "image/jpeg",
        });
      }

      if (!isBookable) {
        if (passportType === "ID") {
          if (!frontImage || !backImage || !selfieImage) {
            Alert.alert(i18n.t("attention"), i18n.t("uploadAllPhotosId"));
            return;
          }
          formData.append("IDPassportPhotoFront", {
            uri: frontImage,
            name: "IDPassportPhotoFront.jpg",
            type: "image/jpeg",
          });
          formData.append("IDPassportPhotoBack", {
            uri: backImage,
            name: "IDPassportPhotoBack.jpg",
            type: "image/jpeg",
          });
          formData.append("IDPassportPhotoWithClient", {
            uri: selfieImage,
            name: "IDPassportPhotoWithClient.jpg",
            type: "image/jpeg",
          });
        } else if (passportType === "International") {
          if (!internationalImage || !internationalSelfie) {
            Alert.alert(
              i18n.t("attention"),
              i18n.t("uploadAllPhotosInternational")
            );
            return;
          }
          formData.append("InternationalPassportPhoto", {
            uri: internationalImage,
            name: "InternationalPassportPhoto.jpg",
            type: "image/jpeg",
          });
          formData.append("InternationalPassportPhotoWithClient", {
            uri: internationalSelfie,
            name: "InternationalPassportPhotoWithClient.jpg",
            type: "image/jpeg",
          });
        }
      }

      const response = await fetch(`${API_URL}/api/auth/change_photo`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        const timestamp = new Date().getTime();

        if (result?.Profile?.Avatar) {
          setAvatarImage(
            `${API_URL}/${result?.Profile?.Avatar}?timestamp=${timestamp}`
          );
        }
        if (result?.Profile?.Passport?.IDPassportPhotoFront) {
          setFrontImage(
            `${API_URL}${result?.Profile?.Passport?.IDPassportPhotoFront}?timestamp=${timestamp}`
          );
        }
        if (result?.Profile?.Passport?.IDPassportPhotoBack) {
          setBackImage(
            `${API_URL}${result?.Profile?.Passport?.IDPassportPhotoBack}?timestamp=${timestamp}`
          );
        }
        if (result?.Profile?.Passport?.IDPassportPhotoWithClient) {
          setSelfieImage(
            `${API_URL}${result?.Profile?.Passport?.IDPassportPhotoWithClient}?timestamp=${timestamp}`
          );
        }
        if (result?.Profile?.Passport?.InternationalPassportPhoto) {
          setInternationalImage(
            `${API_URL}${result?.Profile?.Passport?.InternationalPassportPhoto}?timestamp=${timestamp}`
          );
        }
        if (result?.Profile?.Passport?.InternationalPassportPhotoWithClient) {
          setInternationalSelfie(
            `${API_URL}${result?.Profile?.Passport?.InternationalPassportPhotoWithClient}?timestamp=${timestamp}`
          );
        }
      } else {
        const errorResponse = await response.json();
        console.log("Failed to update profile:", errorResponse);
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    if (!userProfile?.Profile?.ISBookable) {
      if (
        passportType === "ID" &&
        (!frontImage || !backImage || !selfieImage)
      ) {
        Alert.alert(i18n.t("attention"), i18n.t("uploadAllPhotosId"));
        setLoading(false);
        return;
      }
      if (
        passportType === "International" &&
        (!internationalImage || !internationalSelfie)
      ) {
        Alert.alert(
          i18n.t("attention"),
          i18n.t("uploadAllPhotosInternational")
        );
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(`${API_URL}/api/auth`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setLoading(false);
        const responseDataError = await response.json();
        const errorMessage = responseDataError.Message || "Произошла ошибка";
        console.error("Error updating user profile:", errorMessage);
        return;
      }

      // Обновление фото профиля после успешной отправки данных
      await handleProfileUpdate(userProfile?.Profile?.ISBookable);
      await getUserProfile(token);

      // Переход на главную страницу
      navigation.navigate("Главная страница");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error updating user profile", error);
    }
  };

  const handleImageSelected = (imageUri, type) => {
    if (type === "avatar") {
      setAvatarImage(imageUri);
    } else if (type === "front") {
      setFrontImage(imageUri);
    } else if (type === "back") {
      setBackImage(imageUri);
    } else if (type === "selfie") {
      setSelfieImage(imageUri);
    } else if (type === "international") {
      setInternationalImage(imageUri);
    } else if (type === "internationalSelfie") {
      setInternationalSelfie(imageUri);
    }

    setIsActionSheetVisible(false);
  };

  const openActionSheet = (photoType) => {
    setCurrentPhotoType(photoType);
    setIsActionSheetVisible(true);
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getUserProfile(token));
    loadProfileData();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  if (isLoading) {
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
      style={{ backgroundColor: "#fff", flex: 1 }}
      contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View>
          <PickImage
            onImageSelected={(imageUri) => {
              handleImageSelected(imageUri, "avatar");
            }}
            renderPicker={({ pickImage }) => (
              <TouchableOpacity
                onPress={pickImage}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  rowGap: 10,
                  marginBottom: 30,
                }}
              >
                {avatarImage ? (
                  <Image
                    source={{
                      uri:
                        avatarImage ||
                        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
                    }}
                    style={{
                      borderRadius: 80,
                      width: 150,
                      height: 150,
                    }}
                  />
                ) : (
                  <Image
                    source={{
                      uri: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
                    }}
                    style={{
                      borderRadius: 80,
                      width: 150,
                      height: 150,
                    }}
                  />
                )}
              </TouchableOpacity>
            )}
          />
          {/* {owner === "client" && (
              <TouchableOpacity
                onPress={() => navigation.navigate("Стать владельцем")}
                style={{
                  backgroundColor: "#4B5DFF",
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  marginBottom: 20,
                  borderRadius: 10,
                }}
              >
                <CustomText
                  style={{
                    color: "#fff",
                    fontWeight: 500,
                    fontSize: 18,
                    textAlign: "center",
                  }}
                >
                  Стать владельцем
                </CustomText>
              </TouchableOpacity>
            )} */}
          <View>
            <CustomText style={{ marginBottom: 15, fontSize: 25 }}>
              {i18n.t("editData")}
            </CustomText>
            <View
              style={{
                flexDirection: "column",
                rowGap: 15,
              }}
            >
              <View>
                <CustomText style={{ marginBottom: 10 }}>
                  {i18n.t("nickname")}
                </CustomText>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={{
                        paddingVertical: Platform.OS === "android" ? 10 : 15,
                        fontSize: 16,
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        borderColor: "#DEE2F1",
                        color: "#616992",
                        borderRadius: 10,
                      }}
                      underlineColorAndroid="transparent"
                      placeholder={i18n.t("enterNickname")}
                      placeholderTextColor={"#616992"}
                      value={value}
                      onChangeText={(text) => onChange(text)}
                    />
                  )}
                  name="Nickname"
                  defaultValue=""
                />
              </View>
              <View>
                <CustomText style={{ marginBottom: 10 }}>
                  {i18n.t("phoneNumber")}
                </CustomText>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={{
                        paddingVertical: Platform.OS === "android" ? 10 : 15,
                        fontSize: 16,
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        borderColor: "#DEE2F1",
                        color: "#616992",
                        borderRadius: 10,
                      }}
                      underlineColorAndroid="transparent"
                      placeholderTextColor={"#616992"}
                      placeholder="+996 777 111 222"
                      value={value}
                      onChangeText={(text) => onChange(text)}
                    />
                  )}
                  name="PhoneNumber"
                  defaultValue=""
                />
              </View>
              {/* <View>
                  <CustomText style={{ marginBottom: 10 }}>Био</CustomText>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={{
                          paddingVertical: Platform.OS === "android" ? 10 : 15,
                          fontSize: 16,
                          paddingHorizontal: 10,
                          borderWidth: 1,
                          borderColor: "#DEE2F1",
                          color: "#616992",
                          borderRadius: 10,
                        }}
                        underlineColorAndroid="transparent"
                        placeholderTextColor={"#616992"}
                        placeholder="Био"
                        value={value}
                        onChangeText={(text) => onChange(text)}
                      />
                    )}
                    name="Biography"
                    defaultValue=""
                  />
                </View> */}
            </View>
          </View>
          {!userProfile?.Profile?.ISBookable && (
            <View style={{ marginTop: 20 }}>
              <View style={{ marginBottom: 20 }}>
                <CustomText style={{ marginBottom: 15, fontSize: 25 }}>
                  {i18n.t("passport_photo")}
                </CustomText>
                <View>
                  <CustomText style={{ marginBottom: 10 }}>
                    {i18n.t("passport_type")}
                  </CustomText>
                  <CustomPicker
                    items={[
                      { label: i18n.t("id_passport"), value: "ID" },
                      {
                        label: i18n.t("international_passport"),
                        value: "International",
                      },
                    ]}
                    selectedValue={passportType}
                    onValueChange={setPassportType}
                    // placeholder={i18n.t("choose_passport_type")}
                  />
                </View>
              </View>
              {passportType === "ID" ? (
                <View>
                  <View style={{ marginBottom: 20 }}>
                    <CustomText style={{ marginBottom: 10 }}>
                      {i18n.t("front_side_passport")}
                    </CustomText>
                    <TouchableOpacity
                      onPress={() => openActionSheet("front")}
                      style={{
                        backgroundColor: "#F2F2F3",
                        padding: 15,
                        borderRadius: 10,
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 10,
                        marginBottom: 10,
                      }}
                    >
                      <Entypo
                        name={"camera"}
                        style={{
                          color: "#616992",
                          fontSize: 22,
                        }}
                      />
                      <CustomText>{i18n.t("add_photo")}</CustomText>
                    </TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: "#fff",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 200,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "rgba(97,105,146,0.2)",
                      }}
                    >
                      {frontImage ? (
                        <Image
                          borderRadius={10}
                          style={{ width: "100%", height: "100%" }}
                          source={{ uri: frontImage }}
                        />
                      ) : (
                        <Image
                          borderRadius={10}
                          style={{ width: 200, height: 200 }}
                          source={require("../../assets/back-of-id-card-512.png")}
                        />
                      )}
                    </View>
                  </View>
                  <View style={{ marginBottom: 20 }}>
                    <CustomText style={{ marginBottom: 10 }}>
                      {i18n.t("back_side_passport")}
                    </CustomText>
                    <TouchableOpacity
                      onPress={() => openActionSheet("back")}
                      style={{
                        backgroundColor: "#F2F2F3",
                        padding: 15,
                        borderRadius: 10,
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 10,
                        marginBottom: 10,
                      }}
                    >
                      <Entypo
                        name={"camera"}
                        style={{
                          color: "#616992",
                          fontSize: 22,
                        }}
                      />
                      <CustomText>{i18n.t("add_photo")}</CustomText>
                    </TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: "#fff",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 200,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "rgb(97,105,146,0.2)",
                      }}
                    >
                      {backImage ? (
                        <Image
                          borderRadius={10}
                          style={{ width: "100%", height: "100%" }}
                          source={{ uri: backImage }}
                        />
                      ) : (
                        <Image
                          borderRadius={10}
                          style={{ width: 200, height: 200 }}
                          source={require("../../assets/back-of-id-card-512.png")}
                        />
                      )}
                    </View>
                  </View>
                  <View>
                    <CustomText style={{ marginBottom: 10 }}>
                      {i18n.t("selfie_with_passport")}
                    </CustomText>
                    <TouchableOpacity
                      onPress={() => navigateToCamera("selfie")}
                      style={{
                        backgroundColor: "#F2F2F3",
                        padding: 15,
                        borderRadius: 10,
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 10,
                        marginBottom: 10,
                      }}
                    >
                      <Entypo
                        name={"camera"}
                        style={{
                          color: "#616992",
                          fontSize: 22,
                        }}
                      />
                      <CustomText>{i18n.t("add_photo")}</CustomText>
                    </TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: "#fff",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 200,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "rgb(97,105,146,0.2)",
                      }}
                    >
                      {selfieImage ? (
                        <Image
                          borderRadius={10}
                          style={{ width: "100%", height: "100%" }}
                          source={{ uri: selfieImage }}
                        />
                      ) : (
                        <Image
                          borderRadius={10}
                          style={{ width: 200, height: 200 }}
                          source={require("../../assets/back-of-id-card-512.png")}
                        />
                      )}
                    </View>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={{ marginBottom: 20 }}>
                    <CustomText style={{ marginBottom: 10 }}>
                      {i18n.t("international_passport")}
                    </CustomText>
                    <TouchableOpacity
                      onPress={() => openActionSheet("international")}
                      style={{
                        backgroundColor: "#F2F2F3",
                        padding: 15,
                        borderRadius: 10,
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 10,
                        marginBottom: 10,
                      }}
                    >
                      <Entypo
                        name={"camera"}
                        style={{
                          color: "#616992",
                          fontSize: 22,
                        }}
                      />
                      <CustomText>{i18n.t("add_photo")}</CustomText>
                    </TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: "#fff",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 200,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "rgb(97,105,146,0.2)",
                      }}
                    >
                      {internationalImage ? (
                        <Image
                          borderRadius={10}
                          style={{ width: "100%", height: "100%" }}
                          source={{ uri: internationalImage }}
                        />
                      ) : (
                        <Image
                          borderRadius={10}
                          style={{ width: 170, height: 170 }}
                          source={require("../../assets/passport.png")}
                        />
                      )}
                    </View>
                  </View>
                  <View>
                    <CustomText style={{ marginBottom: 10 }}>
                      {i18n.t("selfie_with_international_passport")}
                    </CustomText>
                    <TouchableOpacity
                      onPress={() => navigateToCamera("internationalSelfie")}
                      style={{
                        backgroundColor: "#F2F2F3",
                        padding: 15,
                        borderRadius: 10,
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 10,
                        marginBottom: 10,
                      }}
                    >
                      <Entypo
                        name={"camera"}
                        style={{
                          color: "#616992",
                          fontSize: 22,
                        }}
                      />
                      <CustomText>{i18n.t("add_photo")}</CustomText>
                    </TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: "#fff",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 200,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "rgb(97,105,146,0.2)",
                      }}
                    >
                      {internationalSelfie ? (
                        <Image
                          borderRadius={10}
                          style={{ width: "100%", height: "100%" }}
                          source={{ uri: internationalSelfie }}
                        />
                      ) : (
                        <Image
                          borderRadius={10}
                          style={{ width: 170, height: 170 }}
                          source={require("../../assets/passport.png")}
                        />
                      )}
                    </View>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginTop: 40 }}
            color={"#4B5DFF"}
          />
        ) : (
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={{
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              marginTop: 30,
              backgroundColor: "#4B5DFF",
              paddingVertical: 15,
              textAlign: "center",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              {i18n.t("save")}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ActionSheet
        ref={actionSheetRef}
        onClose={() => setIsActionSheetVisible(false)}
      >
        <View
          style={{
            padding: 20,
            backgroundColor: "white",
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <CustomText style={{ marginBottom: 20 }}>
            {i18n.t("selectSource")}
          </CustomText>
          <View style={{ flexDirection: "row", columnGap: 50 }}>
            <TouchableOpacity
              onPress={() => {
                navigateToCamera(currentPhotoType);
                setIsActionSheetVisible(false);
              }}
              style={{ alignItems: "center", rowGap: 5 }}
            >
              <Image
                style={{ width: 70, height: 70 }}
                source={require("../../assets/camera.png")}
              />
              <CustomText>{i18n.t("camera")}</CustomText>
            </TouchableOpacity>
            <PickImage
              onImageSelected={(imageUri) => {
                handleImageSelected(imageUri, currentPhotoType);
                setIsActionSheetVisible(false);
              }}
              renderPicker={({ pickImage }) => (
                <TouchableOpacity
                  onPress={() => {
                    pickImage();
                  }}
                  style={{ alignItems: "center", rowGap: 5 }}
                >
                  <Image
                    style={{ width: 70, height: 70 }}
                    source={require("../../assets/gallery.png")}
                  />
                  <CustomText>{i18n.t("gallery")}</CustomText>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </ActionSheet>
    </ScrollView>
  );
};

export default EditProfile;
