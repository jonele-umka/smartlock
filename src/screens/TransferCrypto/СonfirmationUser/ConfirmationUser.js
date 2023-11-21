import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";
import { API_URL } from "../../../constants";
const ConfirmationUser = () => {
  const { navigate } = useNavigation();
  const route = useRoute();
  const {
    nameUser,
    sender_requisites,
    phone_number,
    address,
    currencyCode,
    receiver_requisites,
    sum,
    commission,
    selectedType,
    balance,
    addressType,
    id,
  } = route.params;
  const [loading, setLoading] = useState(false);
  console.log("phone_number", phone_number);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.signIn.token);
  // transfer
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    RUB: "₽",
    KGS: "C",
    USDT: "₮",
    ETH: "Ξ",
    BTC: "₿",
  };

  const handleTransfer = () => {
    if (selectedType === "По номеру телефона") {
      fetch(
        `${API_URL}/wallets/transfer-by-phone/${sender_requisites}/${phone_number}/${sum}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          setLoading(true);
          if (!response.ok) {
            return response.json().then((data) => {
              const errorMessage = data?.error.Code || "Произошла ошибка";
              throw new Error(errorMessage);
            });
          }
          return response.json();
        })

        .then((data) => {
          console.log(data);
          setLoading(false);
          navigate("SuccessTransfer", {
            sum: sum,
            currencyCode: currencyCode,
            requisites: phone_number,
            sender_requisites: sender_requisites,
            commission: commission,
            selectedType: selectedType,
            id: id,
          });
        })
        .catch((error) => {
          setError(error.message);
          console.log("errorsss:", error.message);
          setLoading(false);
          Toast.show({
            type: "error",
            position: "top",
            text1: "Ошибка",
            text2: error.message,
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 30,
          });
        });
    } else if (selectedType === "По номеру счета") {
      fetch(
        `${API_URL}/wallets/transfer/${sender_requisites}/${receiver_requisites}/${sum}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          setLoading(true);
          if (!response.ok) {
            return response.json().then((data) => {
              const errorMessage = data?.error?.Code || "Произошла ошибка";
              throw new Error(errorMessage);
            });
          }
          return response.json();
        })
        .then((data) => {
          setLoading(false);
          navigate("SuccessTransfer", {
            sum: sum,
            sender_requisites: sender_requisites,
            currencyCode: currencyCode,
            requisites: receiver_requisites,
            nameUser: nameUser,
            commission: commission,
            selectedType: selectedType,
            id: id,
          });
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
          Toast.show({
            type: "error",
            position: "top",
            text1: "Ошибка",
            text2: error.message,
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 30,
          });
        });
    } else if (selectedType === "По адресу кошелька") {
      const transferApiUrl =
        addressType === "Внутренний"
          ? `${API_URL}/wallets/transfer-by-address/${sender_requisites}/${address}/${sum}/`
          : `${API_URL}/wallets/external-transfer-by-address/${sender_requisites}/${address}/${sum}/`;

      fetch(transferApiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setLoading(true);
          if (!response.ok) {
            return response.json().then((data) => {
              const errorMessage = data?.error?.Code || "Произошла ошибка";
              throw new Error(errorMessage);
            });
          }
          return response.json();
        })
        .then((data) => {
          setLoading(false);
          navigate("SuccessTransfer", {
            sum: sum,
            sender_requisites: sender_requisites,
            currencyCode: currencyCode,
            requisites: address,
            commission: commission,
            selectedType: selectedType,
            id: id,
          });
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
          Toast.show({
            type: "error",
            position: "top",
            text1: "Ошибка",
            text2: error.message,
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 30,
          });
        });
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
      <SafeAreaWrapper
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: Platform.OS === "android" ? 0 : 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              color: "#fff",
              marginBottom: 20,
            }}
          >
            Проверьте данные
          </Text>
          <View
            style={{
              marginBottom: 20,
              backgroundColor: "rgba(93, 0, 230, 0.2)",
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 10,
            }}
          >
            {phone_number && (
              <View>
                <Text style={{ color: "#fff", marginBottom: 5 }}>
                  Номер телефона получателя:
                </Text>
                <Text style={{ color: "#fff", fontWeight: 600 }}>
                  {phone_number}
                </Text>
              </View>
            )}
            {receiver_requisites && (
              <View>
                <Text style={{ color: "#fff", marginBottom: 10 }}>
                  Реквизиты получателя:
                </Text>
                <Text
                  style={{ color: "#fff", marginBottom: 5, fontWeight: 600 }}
                >
                  {nameUser}
                </Text>
                <Text style={{ color: "#fff", fontWeight: 600 }}>
                  {receiver_requisites}
                </Text>
              </View>
            )}
            {address && (
              <View>
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ color: "#fff", marginBottom: 5 }}>
                    Адрес кошелька получателя:
                  </Text>
                  <Text style={{ color: "#fff", fontWeight: 600 }}>
                    {address}
                  </Text>
                </View>
                <View>
                  <Text style={{ color: "#fff", marginBottom: 5 }}>
                    Тип перевода:
                  </Text>
                  <Text style={{ color: "#fff", fontWeight: 600 }}>
                    {addressType}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View
            style={{
              backgroundColor: "rgba(93, 0, 230, 0.2)",
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                columnGap: 20,
              }}
            >
              <Text style={{ color: "#fff" }}>Счёт списания</Text>
              <Text style={{ color: "#fff" }}>{sender_requisites}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                columnGap: 20,
              }}
            >
              <Text style={{ color: "#fff" }}>Баланс</Text>
              <Text style={{ color: "#fff" }}>{balance}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                columnGap: 20,
              }}
            >
              <Text style={{ color: "#fff" }}>Сумма перевода</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 5,
                }}
              >
                <Text style={{ color: "#fff" }}>{sum}</Text>
                <Text style={{ color: "#fff" }}>
                  {currencySymbols[currencyCode]}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                columnGap: 20,
              }}
            >
              <Text style={{ color: "#fff" }}>Комиссия</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 5,
                }}
              >
                {commission ? (
                  <Text style={{ color: "#fff" }}>{commission}</Text>
                ) : (
                  <Text style={{ color: "#fff" }}>
                    0,00 {currencySymbols[currencyCode]}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              rowGap: 5,
              backgroundColor: "rgba(93, 0, 230, 0.2)",
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>Сумма списания:</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
              }}
            >
              {commission ? (
                <Text style={{ color: "#fff", fontSize: 20, fontWeight: 600 }}>
                  {parseFloat(sum) + parseFloat(commission)}
                </Text>
              ) : (
                <Text style={{ color: "#fff", fontSize: 20, fontWeight: 600 }}>
                  {sum}
                </Text>
              )}

              <Text style={{ color: "#fff", fontSize: 20, fontWeight: 600 }}>
                {currencySymbols[currencyCode]}
              </Text>
            </View>
          </View>

          {parseInt(error) === 400 && (
            <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
              Недостаточно средств
            </Text>
          )}
          {loading ? (
            <ActivityIndicator
              size="large"
              style={{ marginTop: 30 }}
              color={"#0268EC"}
            />
          ) : (
            <TouchableOpacity
              onPress={handleTransfer}
              style={{
                marginTop: 25,
                borderRadius: 10,
                padding: 20,
                backgroundColor: "#5d00e6",
                marginTop: 30,
                shadowColor: "#5d00e6",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Подтвердить
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaWrapper>
    </LinearGradient>
  );
};

export default ConfirmationUser;
