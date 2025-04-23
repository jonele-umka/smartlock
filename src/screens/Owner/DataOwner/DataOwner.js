import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../../components/CustomText/CustomText";
import Toast from "react-native-toast-message";
// import { ownerFields } from "../../../assets/data/Fields";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { FormatDatePassport } from "../../../components/FormatDate/FormatDatePassport";
import CustomPicker from "../../../components/CustomPicker/CustomPicker";
import i18n from "../../../../i18n/i18n";
const DataOwner = () => {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const API_URL = process.env.API_URL;
  const token = useSelector((state) => state.auth.token);
  const navigation = useNavigation();
  const owner = useSelector((state) => state.auth.owner);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setLoading(false);

        const responseDataError = await response.json();
        const errorMessage = responseDataError.error || "Произошла ошибка";

        console.error("Error updating user profile:", errorMessage);
        return;
      }

      const result = await response.json();
      setData(result?.Profile?.Profile?.Passport);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setValue("Name", data?.Name);
      setValue("Surname", data?.Surname);
      setValue("Patronymic", data?.Patronymic);
      setValue("Nationality", data?.Nationality);
      setValue("DateOfBirth", FormatDatePassport(data?.DateOfBirth));
      setValue("DocumentNumber", data?.DocumentNumber);
      setValue("DateOfExpiry", FormatDatePassport(data?.DateOfExpiry));
      setValue("PlaceOfBirth", data?.PlaceOfBirth);
      setValue("Authority", data?.Authority);
      setValue("DateOfIssue", FormatDatePassport(data?.DateOfIssue));
      setValue("PIN", data?.PIN);
      setValue("IDPassportType", data?.IDPassportType);
    }
  }, [data]);

  const onSubmit = async (data) => {
    setIsLoading(true);

    const today = new Date();
    const birthDate = new Date(data.DateOfBirth);
    const issueDate = new Date(data.DateOfIssue);
    const expiryDate = new Date(data.DateOfExpiry);

    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    const actualAge =
      monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0) ? age : age - 1;

    if (birthDate > today) {
      setError("DateOfBirth", {
        type: "manual",
        message: i18n.t("dateBirthFuture"),
      });
      setIsLoading(false);
      return;
    }

    if (actualAge < 16) {
      setError("DateOfBirth", {
        type: "manual",
        message: i18n.t("years18"),
      });
      setIsLoading(false);
      return;
    }

    if (issueDate > today) {
      setError("DateOfIssue", {
        type: "manual",
        message: i18n.t("dateIssueFuture"),
      });
      setIsLoading(false);
      return;
    }

    const minIssueDate = new Date(birthDate);
    minIssueDate.setFullYear(minIssueDate.getFullYear() + 16);

    if (issueDate < minIssueDate) {
      setError("DateOfIssue", {
        type: "manual",
        message: i18n.t("years16"),
      });
      setIsLoading(false);
      return;
    }

    const expectedExpiryDate = new Date(issueDate);
    expectedExpiryDate.setFullYear(expectedExpiryDate.getFullYear() + 10);

    if (
      expiryDate.getFullYear() !== expectedExpiryDate.getFullYear() ||
      expiryDate.getMonth() !== expectedExpiryDate.getMonth() ||
      expiryDate.getDate() !== expectedExpiryDate.getDate()
    ) {
      setError("DateOfExpiry", {
        type: "manual",
        message: i18n.t("years10"),
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/be_owner`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setIsLoading(false);
        if (owner === "owner") {
          navigation.navigate("Главная страница");
        } else {
          navigation.navigate("Заявка на подтверждение");
        }
      } else {
        setIsLoading(false);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: i18n.t("error"),
          text2: result.error.Error,
          visibilityTime: 3000,
          autoHide: true,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Ошибка:", error);
    }
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flexDirection: "column", rowGap: 20, marginBottom: 40 }}>
          {/* Поле Surname */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              {i18n.t("surname")}
            </CustomText>
            <Controller
              control={control}
              name="Surname"
              rules={{ required: `${i18n.t("required")} ${i18n.t("surname")}` }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  value={value}
                  onChange={onChange}
                  placeholder={i18n.t("surname")}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.Surname && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.Surname.message}
              </CustomText>
            )}
          </View>

          {/* Поле Name */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              {i18n.t("name")}
            </CustomText>
            <Controller
              control={control}
              name="Name"
              rules={{ required: `${i18n.t("required")} ${i18n.t("name")}` }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  value={value}
                  onChange={onChange}
                  placeholder={i18n.t("name")}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.Name && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.Name.message}
              </CustomText>
            )}
          </View>

          {/* Поле Patronymic */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              {i18n.t("patronymic")}
            </CustomText>
            <Controller
              control={control}
              name="Patronymic"
              rules={{
                required: `${i18n.t("required")} ${i18n.t("patronymic")}`,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  value={value}
                  onChange={onChange}
                  placeholder={i18n.t("patronymic")}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.Patronymic && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.Patronymic.message}
              </CustomText>
            )}
          </View>

          {/* Поле Nationality */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              {i18n.t("nationality")}
            </CustomText>
            <Controller
              control={control}
              name="Nationality"
              rules={{
                required: `${i18n.t("required")} ${i18n.t("nationality")}`,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  value={value}
                  onChange={onChange}
                  placeholder={i18n.t("enterNationality")}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.Nationality && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.Nationality.message}
              </CustomText>
            )}
          </View>

          {/* Поле DateOfBirth */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              {i18n.t("dateOfBirth")}
            </CustomText>
            <Controller
              control={control}
              name="DateOfBirth"
              rules={{
                required: `${i18n.t("required")} ${i18n.t("dateOfBirth")}`,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  value={value}
                  onChange={(text) => onChange(FormatDatePassport(text))}
                  placeholder="2000-10-02"
                  onBlur={onBlur}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.DateOfBirth && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.DateOfBirth.message}
              </CustomText>
            )}
          </View>

          {/* Поле PlaceOfBirth */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              {i18n.t("placeOfBirth")}
            </CustomText>
            <Controller
              control={control}
              name="PlaceOfBirth"
              rules={{
                required: `${i18n.t("required")} ${i18n.t("placeOfBirth")}`,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  value={value}
                  onChange={onChange}
                  placeholder={i18n.t("placeOfBirth")}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.PlaceOfBirth && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.PlaceOfBirth.message}
              </CustomText>
            )}
          </View>

          {/* Поле IDPassportType */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              {i18n.t("passportType")}
            </CustomText>
            <Controller
              control={control}
              name="IDPassportType"
              rules={{
                required: `${i18n.t("required")} ${i18n.t("passportType")}`,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomPicker
                  items={[
                    { label: "AN", value: "AN" },
                    { label: "ID", value: "ID" },
                  ]}
                  selectedValue={value}
                  onValueChange={onChange}
                  placeholder={i18n.t("enterPassportType")}
                />
              )}
            />
            {errors.IDPassportType && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.IDPassportType.message}
              </CustomText>
            )}
          </View>

          {/* Поле DocumentNumber */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              {i18n.t("documentNumber")}
            </CustomText>
            <Controller
              control={control}
              name="DocumentNumber"
              rules={{
                required: `${i18n.t("required")} ${i18n.t("documentNumber")}`,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  value={value}
                  onChange={onChange}
                  placeholder={i18n.t("enterDocNumber")}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.DocumentNumber && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.DocumentNumber.message}
              </CustomText>
            )}
          </View>

          {/* Поле DateOfIssue */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              {i18n.t("dateOfIssue")}
            </CustomText>
            <Controller
              control={control}
              name="DateOfIssue"
              rules={{
                required: `${i18n.t("required")} ${i18n.t("dateOfIssue")}`,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  value={value}
                  onChange={(text) => onChange(FormatDatePassport(text))}
                  placeholder="2016-07-07"
                  onBlur={onBlur}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.DateOfIssue && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.DateOfIssue.message}
              </CustomText>
            )}
          </View>

          {/* Поле DateOfExpiry */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              {i18n.t("dateOfExpiry")}
            </CustomText>
            <Controller
              control={control}
              name="DateOfExpiry"
              rules={{
                required: `${i18n.t("required")} ${i18n.t("dateOfExpiry")}`,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  value={value}
                  onChange={(text) => onChange(FormatDatePassport(text))}
                  placeholder="2026-07-07"
                  onBlur={onBlur}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.DateOfExpiry && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.DateOfExpiry.message}
              </CustomText>
            )}
          </View>

          {/* Поле Authority */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              {i18n.t("authority")}
            </CustomText>
            <Controller
              control={control}
              name="Authority"
              rules={{
                required: `${i18n.t("required")} ${i18n.t("authority")}`,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  value={value}
                  onChange={onChange}
                  placeholder={i18n.t("enterAuthority")}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.Authority && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.Authority.message}
              </CustomText>
            )}
          </View>

          {/* Поле PIN */}
          <View>
            <CustomText style={{ marginBottom: 10, fontSize: 18 }}>
              {i18n.t("pin")}
            </CustomText>
            <Controller
              control={control}
              name="PIN"
              rules={{
                required: `${i18n.t("required")} ${i18n.t("pin")}`,
                minLength: {
                  value: 14,
                  message: `${i18n.t("pin")} ${i18n.t(
                    "mustBeAtLeast14digits"
                  )} `,
                },
                maxLength: {
                  value: 14,
                  message: `${i18n.t("pin")}`,
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  value={value}
                  onChange={(text) => {
                    if (text.length <= 14 && /^\d*$/.test(text)) {
                      onChange(text);
                    }
                  }}
                  placeholder={i18n.t("pin")}
                  onBlur={onBlur}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.PIN && (
              <CustomText style={{ color: "red", marginTop: 7 }}>
                {errors.PIN.message}
              </CustomText>
            )}
          </View>
        </View>
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" color={"#4B5DFF"} />
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                paddingVertical: 15,
                textAlign: "center",
                borderRadius: 10,
                backgroundColor: "#4B5DFF",
              }}
            >
              <CustomText
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                {i18n.t("save")}
              </CustomText>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DataOwner;
