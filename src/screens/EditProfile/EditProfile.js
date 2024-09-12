import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/core";
import PickImage from "../../components/PickImage/PickImage";
import ActionSheet from "react-native-actions-sheet";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RNPickerSelect from "react-native-picker-select";
import { Skeleton } from "@rneui/themed";
import Entypo from "react-native-vector-icons/Entypo";
import CustomText from "../../components/CustomText/CustomText";

const EditProfile = () => {
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;
  const route = useRoute();
  const { control, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const API_URL = process.env.API_URL;
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [internationalImage, setInternationalImage] = useState(null);
  const [internationalSelfie, setInternationalSelfie] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);
  const [selfieImage, setSelfieImage] = useState(null);

  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPhotoType, setCurrentPhotoType] = useState(null);
  const navigation = useNavigation();
  const actionSheetRef = useRef();
  const token = useSelector((state) => state.auth.token);
  const owner = useSelector((state) => state.auth.owner);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const avatar = userProfile?.Avatar;
  const IDPassportPhotoFront = userProfile?.Passport?.IDPassportPhotoFront;
  const IDPassportPhotoBack = userProfile?.Passport?.IDPassportPhotoBack;
  const IDPassportPhotoWithClient =
    userProfile?.Passport?.IDPassportPhotoWithClient;
  const InternationalPassportPhoto =
    userProfile?.Passport?.InternationalPassportPhoto;
  const InternationalPassportPhotoWithClient =
    userProfile?.Passport?.InternationalPassportPhotoWithClient;
  const [passportType, setPassportType] = useState("ID");

  const loadProfileData = () => {
    const timestamp = new Date().getTime();
    if (avatar && !avatarImage) {
      setAvatarImage(`${API_URL}/${avatar}?timestamp=${timestamp}`);
    }
    if (IDPassportPhotoFront && !frontImage) {
      setFrontImage(
        `${API_URL}/${IDPassportPhotoFront}?timestamp=${timestamp}`
      );
    }
    if (IDPassportPhotoBack && !backImage) {
      setBackImage(`${API_URL}/${IDPassportPhotoBack}?timestamp=${timestamp}`);
    }
    if (IDPassportPhotoWithClient && !selfieImage) {
      setSelfieImage(
        `${API_URL}/${IDPassportPhotoWithClient}?timestamp=${timestamp}`
      );
    }
    if (InternationalPassportPhoto && !internationalImage) {
      setInternationalImage(
        `${API_URL}/${InternationalPassportPhoto}?timestamp=${timestamp}`
      );
    }
    if (InternationalPassportPhotoWithClient && !internationalSelfie) {
      setInternationalSelfie(
        `${API_URL}/${InternationalPassportPhotoWithClient}?timestamp=${timestamp}`
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
    console.log("Navigating to camera with type:", type);
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
    setValue("nickname", userProfile?.Nickname || "");
    setValue("biography", userProfile?.Biography || "");
    setValue("phoneNumber", userProfile?.PhoneNumber || "");
  }, [userProfile, setValue]);

  const handleProfileUpdate = async () => {
    try {
      const formData = new FormData();
      if (avatarImage) {
        formData.append("Avatar", {
          uri: avatarImage,
          name: "avatar.jpg",
          type: "image/jpeg",
        });
      }
      if (frontImage) {
        formData.append("IDPassportPhotoFront", {
          uri: frontImage,
          name: "IDPassportPhotoFront.jpg",
          type: "image/jpeg",
        });
      }
      if (backImage) {
        formData.append("IDPassportPhotoBack", {
          uri: backImage,
          name: "IDPassportPhotoBack.jpg",
          type: "image/jpeg",
        });
      }
      if (selfieImage) {
        formData.append("IDPassportPhotoWithClient", {
          uri: selfieImage,
          name: "IDPassportPhotoWithClient.jpg",
          type: "image/jpeg",
        });
      }
      if (internationalImage) {
        formData.append("InternationalPassportPhoto", {
          uri: internationalImage,
          name: "InternationalPassportPhoto.jpg",
          type: "image/jpeg",
        });
      }
      if (internationalSelfie) {
        formData.append("InternationalPassportPhotoWithClient", {
          uri: internationalSelfie,
          name: "InternationalPassportPhotoWithClient.jpg",
          type: "image/jpeg",
        });
      }
      const response = await fetch(`${API_URL}/api/auth/change_photo`, {
        method: "PATCH",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();

        const timestamp = new Date().getTime();

        if (result.Profile.Avatar) {
          setAvatarImage(
            `${API_URL}/${result.Profile.Avatar}?timestamp=${timestamp}`
          );
        }
        if (
          result.Profile.Passport &&
          result.Profile.Passport.IDPassportPhotoFront
        ) {
          setFrontImage(
            `${API_URL}/${result.Profile.Passport.IDPassportPhotoFront}?timestamp=${timestamp}`
          );
        }
        if (
          result.Profile.Passport &&
          result.Profile.Passport.IDPassportPhotoBack
        ) {
          setBackImage(
            `${API_URL}/${result.Profile.Passport.IDPassportPhotoBack}?timestamp=${timestamp}`
          );
        }
        if (
          result.Profile.Passport &&
          result.Profile.Passport.IDPassportPhotoWithClient
        ) {
          setSelfieImage(
            `${API_URL}/${result.Profile.Passport.IDPassportPhotoWithClient}?timestamp=${timestamp}`
          );
        }
        if (
          result.Profile.Passport &&
          result.Profile.Passport.InternationalPassportPhoto
        ) {
          setInternationalImage(
            `${API_URL}/${result.Profile.Passport.InternationalPassportPhoto}?timestamp=${timestamp}`
          );
        }
        if (
          result.Profile.Passport &&
          result.Profile.Passport.InternationalPassportPhotoWithClient
        ) {
          setInternationalSelfie(
            `${API_URL}/${result.Profile.Passport.InternationalPassportPhotoWithClient}?timestamp=${timestamp}`
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
    try {
      const response = await fetch(`${API_URL}/api/auth`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
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

      const result = await response.json();
      navigation.navigate("Главная страница");
      await handleProfileUpdate();
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.error("Error updating user profile", error);
    }
  };

  const handleImageSelected = (imageUri, type) => {
    console.log(type);
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
  return (
    <ScrollView
      style={{ backgroundColor: "#fff", flex: 1 }}
      contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}
    >
      <SafeAreaWrapper>
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
            {owner === "client" && (
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
            )}
            <View style={{ marginBottom: 40 }}>
              <CustomText style={{ marginBottom: 15, fontSize: 25 }}>
                Редактировать данные
              </CustomText>
              <View
                style={{
                  flexDirection: "column",
                  rowGap: 15,
                }}
              >
                <View>
                  <CustomText style={{ marginBottom: 10 }}>ФИО</CustomText>
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
                        placeholder="Асанов Усон"
                        placeholderTextColor={"#616992"}
                        value={value}
                        onChangeText={(text) => onChange(text)}
                      />
                    )}
                    name="nickname"
                    defaultValue=""
                  />
                </View>
                <View>
                  <CustomText style={{ marginBottom: 10 }}>
                    Номер телефона
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
                    name="phoneNumber"
                    defaultValue=""
                  />
                </View>
                <View>
                  <CustomText style={{ marginBottom: 10 }}>Описание</CustomText>
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
                        placeholder="Описание"
                        value={value}
                        onChangeText={(text) => onChange(text)}
                      />
                    )}
                    name="biography"
                    defaultValue=""
                  />
                </View>
              </View>
            </View>
            <View style={{ marginBottom: 20 }}>
              <CustomText style={{ marginBottom: 15, fontSize: 25 }}>
                Фото паспорта
              </CustomText>
              <View
                style={{
                  marginBottom: 20,
                  backgroundColor: "#F2F2F3",
                  borderRadius: 10,
                  padding: Platform.OS === "ios" ? 15 : 0,
                }}
              >
                <RNPickerSelect
                  itemKey="value"
                  placeholder={{
                    label: "Выберите тип паспорта",
                    value: null,
                    color: "gray",
                  }}
                  onValueChange={(value) => setPassportType(value)}
                  items={[
                    { label: "ID паспорт", value: "ID" },
                    { label: "Загран паспорт", value: "International" },
                  ]}
                  value={passportType}
                  style={{
                    inputAndroid: {
                      paddingVertical: 15,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      color: "#1C2863",
                      fontSize: 14,
                      backgroundColor: "#dee2f1",
                    },
                    inputIOS: {
                      paddingVertical: 15,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      color: "#1C2863",
                      fontSize: 14,
                      backgroundColor: "#dee2f1",
                    },
                  }}
                />
              </View>
            </View>
            {passportType === "ID" ? (
              <View>
                <View style={{ marginBottom: 20 }}>
                  <CustomText style={{ marginBottom: 10 }}>
                    Передняя сторона паспорта
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
                    <CustomText>Добавить фото</CustomText>
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
                    Задняя сторона паспорта
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
                    <CustomText>Добавить фото</CustomText>
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
                    Селфи с паспортом
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
                    <CustomText>Добавить фото</CustomText>
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
                    Международный паспорт
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
                    <CustomText>Добавить фото</CustomText>
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
                    Селфи с международным паспортом
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
                    <CustomText>Добавить фото</CustomText>
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
                Сохранить
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaWrapper>

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
          <Text style={{ marginBottom: 20 }}>
            Выберите источник изображения
          </Text>
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
              <Text>Камера</Text>
            </TouchableOpacity>
            <PickImage
              onImageSelected={(imageUri) => {
                handleImageSelected(imageUri, currentPhotoType);
                console.log("imageUri", imageUri);
              }}
              renderPicker={({ pickImage }) => (
                <TouchableOpacity
                  onPress={() => {
                    setIsActionSheetVisible(false);
                    pickImage();
                  }}
                  style={{ alignItems: "center", rowGap: 5 }}
                >
                  <Image
                    style={{ width: 70, height: 70 }}
                    source={require("../../assets/gallery.png")}
                  />
                  <Text>Галерея</Text>
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
