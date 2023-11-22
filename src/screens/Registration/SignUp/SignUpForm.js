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

import { registerUser, loginUser } from "../../../Store/SignIn/SignInAction/";

const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const route = useRoute();
  const { email } = route.params;
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
    console.log(requestData);
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

  return (
    <ScrollView style={{ backgroundColor: "#191a1d" }}>
      <View
        style={{
          padding: 20,
        }}
      >
        <View style={{ flexDirection: "column", rowGap: 25, marginBottom: 30 }}>
          <View>
            <Text style={{ color: "#fff", fontSize: 20, marginBottom: 20 }}>
              Пользовательские данные:
            </Text>
            <View
              style={{
                flexDirection: "column",
                rowGap: 15,
              }}
            >
              <View>
                <Text style={{ marginBottom: 10, color: "#fff" }}>
                  Номер телефона
                </Text>
                <Controller
                  control={control}
                  name="PhoneNumber"
                  rules={{ required: "Заполните это поле" }}
                  render={({ field }) => (
                    <TextInput
                      placeholder="996"
                      placeholderTextColor="grey"
                      value={field.value}
                      onChangeText={(value) => {
                        field.onChange(value);
                      }}
                      style={{
                        color: "#fff",
                        borderRadius: 10,
                        fontSize: 16,
                        height: 50,
                        paddingHorizontal: 10,
                        backgroundColor: "#272727",
                        borderWidth: errors.PhoneNumber ? 1 : 0,
                        borderColor: errors.PhoneNumber ? "red" : "#272727",
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
                  Имя пользователя
                </Text>
                <Controller
                  control={control}
                  name="UserName"
                  rules={{ required: "Заполните это поле" }}
                  render={({ field }) => (
                    <TextInput
                      placeholderTextColor="grey"
                      placeholder="Имя пользователя"
                      value={field.value}
                      onChangeText={(value) => {
                        field.onChange(value);
                      }}
                      style={{
                        color: "#fff",
                        borderRadius: 10,
                        fontSize: 16,
                        height: 50,
                        paddingHorizontal: 10,
                        backgroundColor: "#272727",
                        borderWidth: errors.UserName ? 1 : 0,
                        borderColor: errors.UserName ? "red" : "#272727",
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
                <Text style={{ marginBottom: 10, color: "#fff" }}>Пароль</Text>
                <Controller
                  control={control}
                  name="UserPassword"
                  rules={{
                    required: "Заполните это поле",
                    minLength: {
                      value: 8,
                      message: "Пароль должен содержать минимум 8 символов",
                    },
                  }}
                  render={({ field }) => (
                    <TextInput
                      placeholderTextColor="grey"
                      placeholder="********"
                      value={field.value}
                      onChangeText={(value) => {
                        field.onChange(value);
                      }}
                      style={{
                        color: "#fff",
                        borderRadius: 10,
                        fontSize: 16,
                        height: 50,
                        paddingHorizontal: 10,
                        backgroundColor: "#272727",
                        borderWidth: errors.UserPassword ? 1 : 0,
                        borderColor: errors.UserPassword ? "red" : "#272727",
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
                  Подтверждение пароля
                </Text>
                <Controller
                  control={control}
                  name="UserPasswordConfirm"
                  rules={{
                    required: "Заполните это поле",
                    minLength: {
                      value: 8,
                      message: "Пароль должен содержать минимум 8 символов",
                    },
                  }}
                  render={({ field }) => (
                    <TextInput
                      placeholderTextColor="grey"
                      placeholder="********"
                      value={field.value}
                      onChangeText={(value) => {
                        field.onChange(value);
                      }}
                      style={{
                        color: "#fff",
                        borderRadius: 10,
                        fontSize: 16,
                        height: 50,
                        paddingHorizontal: 10,
                        backgroundColor: "#272727",
                        borderWidth: errors.UserPasswordConfirm ? 1 : 0,
                        borderColor: errors.UserPasswordConfirm
                          ? "red"
                          : "#272727",
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
              Паспортные данные:
            </Text>
            <View style={{ flexDirection: "column", rowGap: 15 }}>
              <View style={{ flexDirection: "row", columnGap: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ marginBottom: 10, color: "#fff" }}>Имя</Text>
                  <Controller
                    control={control}
                    name="Name"
                    rules={{ required: "Заполните это поле" }}
                    render={({ field }) => (
                      <TextInput
                        placeholderTextColor="grey"
                        placeholder="Усон"
                        value={field.value}
                        onChangeText={(value) => {
                          field.onChange(value);
                        }}
                        style={{
                          color: "#fff",
                          borderRadius: 10,
                          fontSize: 16,
                          height: 50,
                          paddingHorizontal: 10,
                          backgroundColor: "#272727",
                          borderWidth: errors.Name ? 1 : 0,
                          borderColor: errors.Name ? "red" : "#272727",
                        }}
                      />
                    )}
                  />
                  {errors.Name && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                      {errors.Name.message}
                    </Text>
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ marginBottom: 10, color: "#fff" }}>
                    Фамилия
                  </Text>
                  <Controller
                    control={control}
                    name="Surname"
                    rules={{ required: "Заполните это поле" }}
                    render={({ field }) => (
                      <TextInput
                        placeholderTextColor="grey"
                        placeholder="Асанов"
                        value={field.value}
                        onChangeText={(value) => {
                          field.onChange(value);
                        }}
                        style={{
                          color: "#fff",
                          borderRadius: 10,
                          fontSize: 16,
                          height: 50,
                          paddingHorizontal: 10,
                          backgroundColor: "#272727",
                          borderWidth: errors.Surname ? 1 : 0,
                          borderColor: errors.Surname ? "red" : "#272727",
                        }}
                      />
                    )}
                  />
                  {errors.Surname && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                      {errors.Surname.message}
                    </Text>
                  )}
                </View>
              </View>
              <View style={{ flexDirection: "row", columnGap: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ marginBottom: 10, color: "#fff" }}>
                    Отчество
                  </Text>
                  <Controller
                    control={control}
                    name="FatherName"
                    rules={{ required: "Заполните это поле" }}
                    render={({ field }) => (
                      <TextInput
                        placeholderTextColor="grey"
                        placeholder="Асанович"
                        value={field.value}
                        onChangeText={(value) => {
                          field.onChange(value);
                        }}
                        style={{
                          color: "#fff",
                          borderRadius: 10,
                          fontSize: 16,
                          height: 50,
                          paddingHorizontal: 10,
                          backgroundColor: "#272727",
                          borderWidth: errors.FatherName ? 1 : 0,
                          borderColor: errors.FatherName ? "red" : "#272727",
                        }}
                      />
                    )}
                  />
                  {errors.FatherName && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                      {errors.FatherName.message}
                    </Text>
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ marginBottom: 10, color: "#fff" }}>
                    Национальность
                  </Text>
                  <Controller
                    control={control}
                    name="Nationality"
                    rules={{ required: "Заполните это поле" }}
                    render={({ field }) => (
                      <TextInput
                        placeholderTextColor="grey"
                        placeholder="Кыргыз"
                        value={field.value}
                        onChangeText={(value) => {
                          field.onChange(value);
                        }}
                        style={{
                          color: "#fff",
                          borderRadius: 10,
                          fontSize: 16,
                          height: 50,
                          paddingHorizontal: 10,
                          backgroundColor: "#272727",
                          borderWidth: errors.Nationality ? 1 : 0,
                          borderColor: errors.Nationality ? "red" : "#272727",
                        }}
                      />
                    )}
                  />
                  {errors.Nationality && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                      {errors.Nationality.message}
                    </Text>
                  )}
                </View>
              </View>
              <View style={{ flexDirection: "row", columnGap: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ marginBottom: 10, color: "#fff" }}>
                    Дата рождения
                  </Text>
                  <Controller
                    control={control}
                    name="DateOfBirth"
                    rules={{ required: "Заполните это поле" }}
                    render={({ field }) => (
                      <TextInput
                        placeholderTextColor="grey"
                        placeholder="2000-01-01"
                        value={field.value}
                        onChangeText={(value) => {
                          field.onChange(value);
                        }}
                        style={{
                          color: "#fff",
                          borderRadius: 10,
                          fontSize: 16,
                          height: 50,
                          paddingHorizontal: 10,
                          backgroundColor: "#272727",
                          borderWidth: errors.DateOfBirth ? 1 : 0,
                          borderColor: errors.DateOfBirth ? "red" : "#272727",
                        }}
                      />
                    )}
                  />
                  {errors.DateOfBirth && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                      {errors.DateOfBirth.message}
                    </Text>
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ marginBottom: 10, color: "#fff" }}>
                    Место рождения
                  </Text>
                  <Controller
                    control={control}
                    name="PlaceOfBirth"
                    rules={{ required: "Заполните это поле" }}
                    render={({ field }) => (
                      <TextInput
                        placeholderTextColor="grey"
                        placeholder="Бишкек"
                        value={field.value}
                        onChangeText={(value) => {
                          field.onChange(value);
                        }}
                        style={{
                          color: "#fff",
                          borderRadius: 10,
                          fontSize: 16,
                          height: 50,
                          paddingHorizontal: 10,
                          backgroundColor: "#272727",
                          borderWidth: errors.PlaceOfBirth ? 1 : 0,
                          borderColor: errors.PlaceOfBirth ? "red" : "#272727",
                        }}
                      />
                    )}
                  />
                  {errors.PlaceOfBirth && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                      {errors.PlaceOfBirth.message}
                    </Text>
                  )}
                </View>
              </View>
              <View style={{ flexDirection: "row", columnGap: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ marginBottom: 10, color: "#fff" }}>Пол</Text>
                  <Controller
                    control={control}
                    name="Sex"
                    rules={{ required: "Заполните это поле" }}
                    render={({ field }) => (
                      <TextInput
                        placeholderTextColor="grey"
                        placeholder="Мужчина"
                        value={field.value}
                        onChangeText={(value) => {
                          field.onChange(value);
                        }}
                        style={{
                          color: "#fff",
                          borderRadius: 10,
                          fontSize: 16,
                          height: 50,
                          paddingHorizontal: 10,
                          backgroundColor: "#272727",
                          borderWidth: errors.Sex ? 1 : 0,
                          borderColor: errors.Sex ? "red" : "#272727",
                        }}
                      />
                    )}
                  />
                  {errors.Sex && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                      {errors.Sex.message}
                    </Text>
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ marginBottom: 10, color: "#fff" }}>
                    Орган выдачи
                  </Text>
                  <Controller
                    control={control}
                    name="Authority"
                    rules={{ required: "Заполните это поле" }}
                    render={({ field }) => (
                      <TextInput
                        placeholderTextColor="grey"
                        placeholder="MKK"
                        value={field.value}
                        onChangeText={(value) => {
                          field.onChange(value);
                        }}
                        style={{
                          color: "#fff",
                          borderRadius: 10,
                          fontSize: 16,
                          height: 50,
                          paddingHorizontal: 10,
                          backgroundColor: "#272727",
                          borderWidth: errors.Authority ? 1 : 0,
                          borderColor: errors.Authority ? "red" : "#272727",
                        }}
                      />
                    )}
                  />
                  {errors.Authority && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                      {errors.Authority.message}
                    </Text>
                  )}
                </View>
              </View>
              <View style={{ flexDirection: "row", columnGap: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ marginBottom: 10, color: "#fff" }}>
                    Дата выдачи
                  </Text>
                  <Controller
                    control={control}
                    name="DateOfIssue"
                    rules={{ required: "Заполните это поле" }}
                    render={({ field }) => (
                      <TextInput
                        placeholderTextColor="grey"
                        placeholder="2018-01-01"
                        value={field.value}
                        onChangeText={(value) => {
                          field.onChange(value);
                        }}
                        style={{
                          color: "#fff",
                          borderRadius: 10,
                          fontSize: 16,
                          height: 50,
                          paddingHorizontal: 10,
                          backgroundColor: "#272727",
                          borderWidth: errors.DateOfIssue ? 1 : 0,
                          borderColor: errors.DateOfIssue ? "red" : "#272727",
                        }}
                      />
                    )}
                  />
                  {errors.DateOfIssue && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                      {errors.DateOfIssue.message}
                    </Text>
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ marginBottom: 10, color: "#fff" }}>
                    Дата истечения срока
                  </Text>
                  <Controller
                    control={control}
                    name="DateOfExpiration"
                    rules={{ required: "Заполните это поле" }}
                    render={({ field }) => (
                      <TextInput
                        placeholderTextColor="grey"
                        placeholder="2028-01-01"
                        value={field.value}
                        onChangeText={(value) => {
                          field.onChange(value);
                        }}
                        style={{
                          color: "#fff",
                          borderRadius: 10,
                          fontSize: 16,
                          height: 50,
                          paddingHorizontal: 10,
                          backgroundColor: "#272727",
                          borderWidth: errors.DateOfExpiration ? 1 : 0,
                          borderColor: errors.DateOfExpiration
                            ? "red"
                            : "#272727",
                        }}
                      />
                    )}
                  />
                  {errors.DateOfExpiration && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                      {errors.DateOfExpiration.message}
                    </Text>
                  )}
                </View>
              </View>
              <View style={{ flexDirection: "row", columnGap: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ marginBottom: 10, color: "#fff" }}>Пин</Text>
                  <Controller
                    control={control}
                    name="PIN"
                    rules={{
                      required: "Заполните это поле",
                      pattern: /^[0-9]{14}$/,
                      maxLength: {
                        value: 14,
                        message: "PIN должен содержать 14 цифр",
                      },
                    }}
                    render={({ field }) => (
                      <TextInput
                        type="number"
                        maxLength={14}
                        placeholderTextColor="grey"
                        placeholder="**************"
                        value={field.value}
                        onChangeText={(value) => {
                          field.onChange(value);
                        }}
                        style={{
                          color: "#fff",
                          borderRadius: 10,
                          fontSize: 16,
                          height: 50,
                          paddingHorizontal: 10,
                          backgroundColor: "#272727",
                          borderWidth: errors.PIN ? 1 : 0,
                          borderColor: errors.PIN ? "red" : "#272727",
                        }}
                      />
                    )}
                  />
                  {errors.PIN && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                      {errors.PIN.message}
                    </Text>
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ marginBottom: 10, color: "#fff" }}>
                    Номер паспорта
                  </Text>
                  <Controller
                    control={control}
                    name="PassportNo"
                    rules={{ required: "Заполните это поле" }}
                    render={({ field }) => (
                      <TextInput
                        placeholderTextColor="grey"
                        placeholder="ID *******"
                        value={field.value}
                        onChangeText={(value) => {
                          field.onChange(value);
                        }}
                        style={{
                          color: "#fff",
                          borderRadius: 10,
                          fontSize: 16,
                          height: 50,
                          paddingHorizontal: 10,
                          backgroundColor: "#272727",
                          borderWidth: errors.PassportNo ? 1 : 0,
                          borderColor: errors.PassportNo ? "red" : "#272727",
                        }}
                      />
                    )}
                  />
                  {errors.PassportNo && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                      {errors.PassportNo.message}
                    </Text>
                  )}
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: 10, color: "#fff" }}>
                  Код депортамента
                </Text>
                <Controller
                  control={control}
                  name="DepartmentCode"
                  rules={{ required: false }}
                  render={({ field }) => (
                    <TextInput
                      placeholderTextColor="grey"
                      placeholder="Код депортамента"
                      value={field.value}
                      onChangeText={(value) => {
                        field.onChange(value);
                      }}
                      style={{
                        color: "#fff",
                        borderRadius: 10,
                        fontSize: 16,
                        height: 50,
                        paddingHorizontal: 10,
                        backgroundColor: "#272727",
                        borderWidth: errors.DepartmentCode ? 1 : 0,
                        borderColor: errors.DepartmentCode ? "red" : "#272727",
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
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginTop: 30 }}
            color={"#0268EC"}
          />
        ) : (
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={{
              padding: 15,
              backgroundColor: "#0268EC",

              marginBottom: 20,
              color: "#fff",
              borderRadius: 10,
              shadowColor: "#0268EC",
              shadowOffset: {
                width: 0,
                height: 10,
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
              Зарегистрироваться
            </Text>
          </TouchableOpacity>
        )}
        {/* {loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginTop: 30 }}
            color={"#0268EC"}
          />
        ) : (
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={{
              padding: 15,
              backgroundColor: "#0268EC",

              marginBottom: 20,
              color: "#fff",
              borderRadius: 10,
              shadowColor: "#0268EC",
              shadowOffset: {
                width: 0,
                height: 10,
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
              Зарегистрироваться
            </Text>
          </TouchableOpacity>
        )} */}
      </View>
    </ScrollView>
  );
};

export default SignUpForm;
