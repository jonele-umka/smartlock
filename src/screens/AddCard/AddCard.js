import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import React from "react";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import i18n from "../../components/i18n/i18n";
const AddCard = () => {
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  return (
    <SafeAreaWrapper style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
        <ImageBackground
          source={require("../../assets/card/card2.png")}
          style={{ width: "100%" , height: 200, marginBottom: 20}}
        />
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: "#b8b8b8", marginBottom: 10 }}>
            Номер карты
          </Text>
          <Controller
            control={control}
            name="hotel"
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                placeholder="XXXX XXXX XXXX XXXX"
                placeholderTextColor="#f0f0f0"
                onChangeText={(value) => {
                  field.onChange(value);
                }}
                value={field.value}
                style={{
                  color: "#000",
                  fontSize: 16,
                  borderBottomWidth: 0.2,
                  borderBottomColor: "#b8b8b8",
                  paddingBottom: 10,
                }}
              />
            )}
          />
          {errors.hotel && (
            <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
              {i18n.t("enterEmail")}
            </Text>
          )}
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: "#b8b8b8", marginBottom: 10 }}>ФИО</Text>
          <Controller
            control={control}
            name="hotel"
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                placeholder="INSTANT VISA"
                placeholderTextColor="#f0f0f0"
                onChangeText={(value) => {
                  field.onChange(value);
                }}
                value={field.value}
                style={{
                  color: "#000",
                  fontSize: 16,
                  borderBottomWidth: 0.2,
                  borderBottomColor: "#b8b8b8",
                  paddingBottom: 10,
                }}
              />
            )}
          />
          {errors.hotel && (
            <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
              {i18n.t("enterEmail")}
            </Text>
          )}
        </View>
        <View style={{ flexDirection: "row", columnGap: 20 }}>
          <View style={{ marginBottom: 20, flex: 1 }}>
            <Text style={{ color: "#b8b8b8", marginBottom: 10 }}>
              Срок действия
            </Text>
            <Controller
              control={control}
              name="hotel"
              rules={{ required: true }}
              render={({ field }) => (
                <TextInput
                  placeholder="12/28"
                  placeholderTextColor="#f0f0f0"
                  onChangeText={(value) => {
                    field.onChange(value);
                  }}
                  value={field.value}
                  style={{
                    color: "#000",
                    fontSize: 16,
                    borderBottomWidth: 0.2,
                    borderBottomColor: "#b8b8b8",
                    paddingBottom: 10,
                  }}
                />
              )}
            />
            {errors.hotel && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {i18n.t("enterEmail")}
              </Text>
            )}
          </View>
          <View style={{ marginBottom: 20, flex: 1 }}>
            <Text style={{ color: "#b8b8b8", marginBottom: 10 }}>CVC/CVV</Text>
            <Controller
              control={control}
              name="hotel"
              rules={{ required: true }}
              render={({ field }) => (
                <TextInput
                  placeholder="123"
                  placeholderTextColor="#f0f0f0"
                  onChangeText={(value) => {
                    field.onChange(value);
                  }}
                  value={field.value}
                  style={{
                    color: "#000",
                    fontSize: 16,
                    borderBottomWidth: 0.2,
                    borderBottomColor: "#b8b8b8",
                    paddingBottom: 10,
                  }}
                />
              )}
            />
            {errors.hotel && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {i18n.t("enterEmail")}
              </Text>
            )}
          </View>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default AddCard;
