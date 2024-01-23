import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/core";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { registerUser, loginUser } from "../../../Store/SignIn/SignInAction/";
import { LinearGradient } from "expo-linear-gradient";
import i18n from "../../../components/i18n/i18n";
const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const route = useRoute();
  // const { email } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.signIn.loading);
  const isRegistered = useSelector((state) => state.signIn.isRegistered);

  const onSubmit = async (userData) => {
    const requestData = {
      PhoneNumber: userData.PhoneNumber,
      Email: email,
      User: {
        UserName: userData.UserName,
        UserPassword: userData.UserPassword,
        UserPasswordConfirm: userData.UserPasswordConfirm,
      },
      PassportDetails: {
        CountryCode: userData.CountryCode,
        Type: userData.Type,
        PassportNo: userData.PassportNo,
        Name: userData.Name,
        Surname: userData.Surname,
        FatherName: userData.FatherName,
        Nationality: userData.Nationality,
        DateOfBirth: userData.DateOfBirth,
        Sex: userData.Sex,
        PlaceOfBirth: userData.PlaceOfBirth,
        DateOfIssue: userData.DateOfIssue,
        DateOfExpiration: userData.DateOfExpiration,
        Authority: userData.Authority,
        PIN: userData.PIN,
        DepartmentCode: userData.DepartmentCode,
      },
      Address: {
        FlatNumber: "",
        HouseNumber: "",
        Street: "",
        Geolocation: "",
        IdSoate: "41711000000000",
      },
    };

    try {
      await dispatch(registerUser(requestData));

      if (!isRegistered) {
        console.error("Ошибка при регистрации");
        return;
      }

      const loginData = {
        UserName: requestData.User.UserName,
        UserPassword: requestData.User.UserPassword,
      };

      try {
        const data = await dispatch(loginUser(loginData));

        if (data && data.data && data.data.access_token) {
          // await AsyncStorage.setItem("token", data.data.access_token);
          navigation.navigate("Главная страница");
        } else {
          console.error("Ошибка при входе");
        }
      } catch (error) {
        console.error("Ошибка при входе", error);
      }
    } catch (error) {
      console.error("Ошибка при регистрации", error);
    }
  };
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  return (
    <LinearGradient
      style={[
        { flex: 1 },
        // isDarkModeEnabled && { backgroundColor: "#191a1d" },
      ]}
      start={{ x: 2.4, y: 1.1 }}
      end={{ x: 0, y: 0 }}
      colors={["#241270", "#140A4F", "#000"]}
    >
      <ScrollView style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
        <SafeAreaWrapper style={{ flex: 1 }}>
          <View
            style={{ flexDirection: "column", rowGap: 25, marginBottom: 30 }}
          >
            <View>
              <Text style={{ color: "#fff", fontSize: 20, marginBottom: 20 }}>
                {i18n.t("userData")}:
              </Text>
              <View
                style={{
                  flexDirection: "column",
                  rowGap: 15,
                }}
              >
                <View>
                  <Text style={{ marginBottom: 10, color: "#fff" }}>
                    {i18n.t("phoneNumber")}
                  </Text>
                  <Controller
                    control={control}
                    name="PhoneNumber"
                    rules={{ required: i18n.t("fillInThisField") }}
                    render={({ field }) => (
                      <TextInput
                        placeholder="996"
                        placeholderTextColor={"#9c9c9c"}
                        value={field.value}
                        onChangeText={(value) => {
                          field.onChange(value);
                        }}
                        style={{
                          color: "#fff",
                          borderRadius: 10,
                          fontSize: 16,
                          paddingHorizontal: 10,
                          paddingVertical: 15,
                          backgroundColor: "rgba(255,255,255,0.05)",
                          borderWidth: errors.PhoneNumber ? 1 : 0,
                          borderColor: errors.PhoneNumber
                            ? "red"
                            : "rgba(255,255,255,0.05)",
                        }}
                      />
                    )}
                  />
                  {errors.PhoneNumber && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                      {errors.PhoneNumber.message}
                    </Text>
                  )}
                </View>

                <View>
                  <Text style={{ marginBottom: 10, color: "#fff" }}>
                    {i18n.t("userName")}
                  </Text>
                  <Controller
                    control={control}
                    name="UserName"
                    rules={{ required: i18n.t("fillInThisField") }}
                    render={({ field }) => (
                      <TextInput
                        placeholderTextColor={"#9c9c9c"}
                        placeholder={i18n.t("userName")}
                        value={field.value}
                        onChangeText={(value) => {
                          field.onChange(value);
                        }}
                        style={{
                          color: "#fff",
                          borderRadius: 10,
                          fontSize: 16,
                          paddingVertical: 15,
                          paddingHorizontal: 10,
                          paddingVertical: 15,
                          backgroundColor: "rgba(255,255,255,0.05)",
                          borderWidth: errors.UserName ? 1 : 0,
                          borderColor: errors.UserName
                            ? "red"
                            : "rgba(255,255,255,0.05)",
                        }}
                      />
                    )}
                  />
                  {errors.UserName && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                      {errors.UserName.message}
                    </Text>
                  )}
                </View>

                <View>
                  <Text style={{ marginBottom: 10, color: "#fff" }}>
                    {i18n.t("password")}
                  </Text>
                  <Controller
                    control={control}
                    name="UserPassword"
                    rules={{
                      required: i18n.t("fillInThisField"),
                      minLength: {
                        value: 8,
                        message: i18n.t("passwordMinLength"),
                      },
                    }}
                    render={({ field }) => (
                      <TextInput
                        placeholderTextColor={"#9c9c9c"}
                        placeholder="********"
                        value={field.value}
                        onChangeText={(value) => {
                          field.onChange(value);
                        }}
                        style={{
                          color: "#fff",
                          borderRadius: 10,
                          fontSize: 16,
                          paddingVertical: 15,
                          paddingHorizontal: 10,
                          paddingVertical: 15,
                          backgroundColor: "rgba(255,255,255,0.05)",
                          borderWidth: errors.UserPassword ? 1 : 0,
                          borderColor: errors.UserPassword
                            ? "red"
                            : "rgba(255,255,255,0.05)",
                        }}
                      />
                    )}
                  />
                  {errors.UserPassword && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                      {errors.UserPassword.message}
                    </Text>
                  )}
                </View>
                <View>
                  <Text style={{ marginBottom: 10, color: "#fff" }}>
                    {i18n.t("confirmPassword")}
                  </Text>
                  <Controller
                    control={control}
                    name="UserPasswordConfirm"
                    rules={{
                      required: i18n.t("fillInThisField"),
                      minLength: {
                        value: 8,
                        message: i18n.t("passwordMinLength"),
                      },
                    }}
                    render={({ field }) => (
                      <TextInput
                        placeholderTextColor={"#9c9c9c"}
                        placeholder="********"
                        value={field.value}
                        onChangeText={(value) => {
                          field.onChange(value);
                        }}
                        style={{
                          color: "#fff",
                          borderRadius: 10,
                          fontSize: 16,
                          paddingVertical: 15,
                          paddingHorizontal: 10,
                          paddingVertical: 15,
                          backgroundColor: "rgba(255,255,255,0.05)",
                          borderWidth: errors.UserPasswordConfirm ? 1 : 0,
                          borderColor: errors.UserPasswordConfirm
                            ? "red"
                            : "rgba(255,255,255,0.05)",
                        }}
                      />
                    )}
                  />
                  {errors.UserPasswordConfirm && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                      {errors.UserPasswordConfirm.message}
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <View>
              <Text style={{ color: "#fff", fontSize: 20, marginBottom: 20 }}>
                {i18n.t("passportData")}:
              </Text>
              <View style={{ flexDirection: "column", rowGap: 15 }}>
                <View style={{ flexDirection: "row", columnGap: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ marginBottom: 10, color: "#fff" }}>
                      {i18n.t("name")}
                    </Text>
                    <Controller
                      control={control}
                      name="Name"
                      rules={{ required: i18n.t("fillInThisField") }}
                      render={({ field }) => (
                        <TextInput
                          placeholderTextColor={"#9c9c9c"}
                          placeholder={i18n.t("namePlaceholder")}
                          value={field.value}
                          onChangeText={(value) => {
                            field.onChange(value);
                          }}
                          style={{
                            color: "#fff",
                            borderRadius: 10,
                            fontSize: 16,
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            backgroundColor: "rgba(255,255,255,0.05)",
                            borderWidth: errors.Name ? 1 : 0,
                            borderColor: errors.Name
                              ? "red"
                              : "rgba(255,255,255,0.05)",
                          }}
                        />
                      )}
                    />
                    {errors.Name && (
                      <Text
                        style={{ color: "red", fontSize: 12, marginTop: 7 }}
                      >
                        {errors.Name.message}
                      </Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ marginBottom: 10, color: "#fff" }}>
                      {i18n.t("surname")}
                    </Text>
                    <Controller
                      control={control}
                      name="Surname"
                      rules={{ required: i18n.t("fillInThisField") }}
                      render={({ field }) => (
                        <TextInput
                          placeholderTextColor={"#9c9c9c"}
                          placeholder={i18n.t("surnamePlaceholder")}
                          value={field.value}
                          onChangeText={(value) => {
                            field.onChange(value);
                          }}
                          style={{
                            color: "#fff",
                            borderRadius: 10,
                            fontSize: 16,
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            backgroundColor: "rgba(255,255,255,0.05)",
                            borderWidth: errors.Surname ? 1 : 0,
                            borderColor: errors.Surname
                              ? "red"
                              : "rgba(255,255,255,0.05)",
                          }}
                        />
                      )}
                    />
                    {errors.Surname && (
                      <Text
                        style={{ color: "red", fontSize: 12, marginTop: 7 }}
                      >
                        {errors.Surname.message}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={{ flexDirection: "row", columnGap: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ marginBottom: 10, color: "#fff" }}>
                      {i18n.t("fatherName")}
                    </Text>
                    <Controller
                      control={control}
                      name="FatherName"
                      rules={{ required: i18n.t("fillInThisField") }}
                      render={({ field }) => (
                        <TextInput
                          placeholderTextColor={"#9c9c9c"}
                          placeholder={i18n.t("fatherNamePlaceholder")}
                          value={field.value}
                          onChangeText={(value) => {
                            field.onChange(value);
                          }}
                          style={{
                            color: "#fff",
                            borderRadius: 10,
                            fontSize: 16,
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            backgroundColor: "rgba(255,255,255,0.05)",
                            borderWidth: errors.FatherName ? 1 : 0,
                            borderColor: errors.FatherName
                              ? "red"
                              : "rgba(255,255,255,0.05)",
                          }}
                        />
                      )}
                    />
                    {errors.FatherName && (
                      <Text
                        style={{ color: "red", fontSize: 12, marginTop: 7 }}
                      >
                        {errors.FatherName.message}
                      </Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ marginBottom: 10, color: "#fff" }}>
                      {i18n.t("nationality")}
                    </Text>
                    <Controller
                      control={control}
                      name="Nationality"
                      rules={{ required: i18n.t("fillInThisField") }}
                      render={({ field }) => (
                        <TextInput
                          placeholderTextColor={"#9c9c9c"}
                          placeholder={i18n.t("nationalityPlaceholder")}
                          value={field.value}
                          onChangeText={(value) => {
                            field.onChange(value);
                          }}
                          style={{
                            color: "#fff",
                            borderRadius: 10,
                            fontSize: 16,
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            backgroundColor: "rgba(255,255,255,0.05)",
                            borderWidth: errors.Nationality ? 1 : 0,
                            borderColor: errors.Nationality
                              ? "red"
                              : "rgba(255,255,255,0.05)",
                          }}
                        />
                      )}
                    />
                    {errors.Nationality && (
                      <Text
                        style={{ color: "red", fontSize: 12, marginTop: 7 }}
                      >
                        {errors.Nationality.message}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={{ flexDirection: "row", columnGap: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ marginBottom: 10, color: "#fff" }}>
                      {i18n.t("dateOfBirth")}
                    </Text>
                    <Controller
                      control={control}
                      name="DateOfBirth"
                      rules={{ required: i18n.t("fillInThisField") }}
                      render={({ field }) => (
                        <TextInput
                          placeholderTextColor={"#9c9c9c"}
                          placeholder="2000-01-01"
                          value={field.value}
                          onChangeText={(value) => {
                            field.onChange(value);
                          }}
                          style={{
                            color: "#fff",
                            borderRadius: 10,
                            fontSize: 16,
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            backgroundColor: "rgba(255,255,255,0.05)",
                            borderWidth: errors.DateOfBirth ? 1 : 0,
                            borderColor: errors.DateOfBirth
                              ? "red"
                              : "rgba(255,255,255,0.05)",
                          }}
                        />
                      )}
                    />
                    {errors.DateOfBirth && (
                      <Text
                        style={{ color: "red", fontSize: 12, marginTop: 7 }}
                      >
                        {errors.DateOfBirth.message}
                      </Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ marginBottom: 10, color: "#fff" }}>
                      {i18n.t("placeOfBirth")}
                    </Text>
                    <Controller
                      control={control}
                      name="PlaceOfBirth"
                      rules={{ required: i18n.t("fillInThisField") }}
                      render={({ field }) => (
                        <TextInput
                          placeholderTextColor={"#9c9c9c"}
                          placeholder={i18n.t("placeOfBirthPlaceholder")}
                          value={field.value}
                          onChangeText={(value) => {
                            field.onChange(value);
                          }}
                          style={{
                            color: "#fff",
                            borderRadius: 10,
                            fontSize: 16,
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            backgroundColor: "rgba(255,255,255,0.05)",
                            borderWidth: errors.PlaceOfBirth ? 1 : 0,
                            borderColor: errors.PlaceOfBirth
                              ? "red"
                              : "rgba(255,255,255,0.05)",
                          }}
                        />
                      )}
                    />
                    {errors.PlaceOfBirth && (
                      <Text
                        style={{ color: "red", fontSize: 12, marginTop: 7 }}
                      >
                        {errors.PlaceOfBirth.message}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={{ flexDirection: "row", columnGap: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ marginBottom: 10, color: "#fff" }}>
                      {i18n.t("sex")}
                    </Text>
                    <Controller
                      control={control}
                      name="Sex"
                      rules={{ required: i18n.t("fillInThisField") }}
                      render={({ field }) => (
                        <TextInput
                          placeholderTextColor={"#9c9c9c"}
                          placeholder={i18n.t("sexPlaceholder")}
                          value={field.value}
                          onChangeText={(value) => {
                            field.onChange(value);
                          }}
                          style={{
                            color: "#fff",
                            borderRadius: 10,
                            fontSize: 16,
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            backgroundColor: "rgba(255,255,255,0.05)",
                            borderWidth: errors.Sex ? 1 : 0,
                            borderColor: errors.Sex
                              ? "red"
                              : "rgba(255,255,255,0.05)",
                          }}
                        />
                      )}
                    />
                    {errors.Sex && (
                      <Text
                        style={{ color: "red", fontSize: 12, marginTop: 7 }}
                      >
                        {errors.Sex.message}
                      </Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ marginBottom: 10, color: "#fff" }}>
                      {i18n.t("authority")}
                    </Text>
                    <Controller
                      control={control}
                      name="Authority"
                      rules={{ required: i18n.t("fillInThisField") }}
                      render={({ field }) => (
                        <TextInput
                          placeholderTextColor={"#9c9c9c"}
                          placeholder="MKK"
                          value={field.value}
                          onChangeText={(value) => {
                            field.onChange(value);
                          }}
                          style={{
                            color: "#fff",
                            borderRadius: 10,
                            fontSize: 16,
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            backgroundColor: "rgba(255,255,255,0.05)",
                            borderWidth: errors.Authority ? 1 : 0,
                            borderColor: errors.Authority
                              ? "red"
                              : "rgba(255,255,255,0.05)",
                          }}
                        />
                      )}
                    />
                    {errors.Authority && (
                      <Text
                        style={{ color: "red", fontSize: 12, marginTop: 7 }}
                      >
                        {errors.Authority.message}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={{ flexDirection: "row", columnGap: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ marginBottom: 10, color: "#fff" }}>
                      {i18n.t("dateOfIssue")}
                    </Text>
                    <Controller
                      control={control}
                      name="DateOfIssue"
                      rules={{ required: i18n.t("fillInThisField") }}
                      render={({ field }) => (
                        <TextInput
                          placeholderTextColor={"#9c9c9c"}
                          placeholder="2018-01-01"
                          value={field.value}
                          onChangeText={(value) => {
                            field.onChange(value);
                          }}
                          style={{
                            color: "#fff",
                            borderRadius: 10,
                            fontSize: 16,
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            backgroundColor: "rgba(255,255,255,0.05)",
                            borderWidth: errors.DateOfIssue ? 1 : 0,
                            borderColor: errors.DateOfIssue
                              ? "red"
                              : "rgba(255,255,255,0.05)",
                          }}
                        />
                      )}
                    />
                    {errors.DateOfIssue && (
                      <Text
                        style={{ color: "red", fontSize: 12, marginTop: 7 }}
                      >
                        {errors.DateOfIssue.message}
                      </Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ marginBottom: 10, color: "#fff" }}>
                      {i18n.t("dateOfExpiration")}
                    </Text>
                    <Controller
                      control={control}
                      name="DateOfExpiration"
                      rules={{ required: i18n.t("fillInThisField") }}
                      render={({ field }) => (
                        <TextInput
                          placeholderTextColor={"#9c9c9c"}
                          placeholder="2028-01-01"
                          value={field.value}
                          onChangeText={(value) => {
                            field.onChange(value);
                          }}
                          style={{
                            color: "#fff",
                            borderRadius: 10,
                            fontSize: 16,
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            backgroundColor: "rgba(255,255,255,0.05)",
                            borderWidth: errors.DateOfExpiration ? 1 : 0,
                            borderColor: errors.DateOfExpiration
                              ? "red"
                              : "rgba(255,255,255,0.05)",
                          }}
                        />
                      )}
                    />
                    {errors.DateOfExpiration && (
                      <Text
                        style={{ color: "red", fontSize: 12, marginTop: 7 }}
                      >
                        {errors.DateOfExpiration.message}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={{ flexDirection: "row", columnGap: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ marginBottom: 10, color: "#fff" }}>
                      {i18n.t("pin")}
                    </Text>
                    <Controller
                      control={control}
                      name="PIN"
                      rules={{
                        required: i18n.t("fillInThisField"),
                        pattern: /^[0-9]{14}$/,
                        maxLength: {
                          value: 14,
                          message: i18n.t("pinMustContainDigits"),
                        },
                      }}
                      render={({ field }) => (
                        <TextInput
                          type="number"
                          maxLength={14}
                          placeholderTextColor={"#9c9c9c"}
                          placeholder="**************"
                          value={field.value}
                          onChangeText={(value) => {
                            field.onChange(value);
                          }}
                          style={{
                            color: "#fff",
                            borderRadius: 10,
                            fontSize: 16,
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            backgroundColor: "rgba(255,255,255,0.05)",
                            borderWidth: errors.PIN ? 1 : 0,
                            borderColor: errors.PIN
                              ? "red"
                              : "rgba(255,255,255,0.05)",
                          }}
                        />
                      )}
                    />
                    {errors.PIN && (
                      <Text
                        style={{ color: "red", fontSize: 12, marginTop: 7 }}
                      >
                        {errors.PIN.message}
                      </Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ marginBottom: 10, color: "#fff" }}>
                      {i18n.t("passportNo")}
                    </Text>
                    <Controller
                      control={control}
                      name="PassportNo"
                      rules={{ required: i18n.t("fillInThisField") }}
                      render={({ field }) => (
                        <TextInput
                          placeholderTextColor={"#9c9c9c"}
                          placeholder="ID *******"
                          value={field.value}
                          onChangeText={(value) => {
                            field.onChange(value);
                          }}
                          style={{
                            color: "#fff",
                            borderRadius: 10,
                            fontSize: 16,
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            backgroundColor: "rgba(255,255,255,0.05)",
                            borderWidth: errors.PassportNo ? 1 : 0,
                            borderColor: errors.PassportNo
                              ? "red"
                              : "rgba(255,255,255,0.05)",
                          }}
                        />
                      )}
                    />
                    {errors.PassportNo && (
                      <Text
                        style={{ color: "red", fontSize: 12, marginTop: 7 }}
                      >
                        {errors.PassportNo.message}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ marginBottom: 10, color: "#fff" }}>
                    {i18n.t("departmentCode")}
                  </Text>
                  <Controller
                    control={control}
                    name="DepartmentCode"
                    rules={{ required: false }}
                    render={({ field }) => (
                      <TextInput
                        placeholderTextColor={"#9c9c9c"}
                        placeholder={i18n.t("departmentCode")}
                        value={field.value}
                        onChangeText={(value) => {
                          field.onChange(value);
                        }}
                        style={{
                          color: "#fff",
                          borderRadius: 10,
                          fontSize: 16,
                          paddingVertical: 15,
                          paddingHorizontal: 10,
                          backgroundColor: "rgba(255,255,255,0.05)",
                          borderWidth: errors.DepartmentCode ? 1 : 0,
                          borderColor: errors.DepartmentCode
                            ? "red"
                            : "rgba(255,255,255,0.05)",
                        }}
                      />
                    )}
                  />
                  {errors.DepartmentCode && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                      {errors.DepartmentCode.message}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
          <View style={{ paddingBottom: 30 }}>
            {loading ? (
              <ActivityIndicator
                size="large"
                style={{ marginTop: 30 }}
                color={"#fff"}
              />
            ) : (
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={{
                  padding: 15,
                  backgroundColor: "#5d00e6",

                  color: "#fff",
                  borderRadius: 10,
                  shadowColor: "#5d00e6",
                  shadowOffset: {
                    width: 0,
                    paddingVertical: 15,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 10,
                  elevation: 20,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  {i18n.t("register")}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaWrapper>
      </ScrollView>
    </LinearGradient>
  );
};

export default SignUpForm;
