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
import i18n from "../../../components/i18n/i18n";
import { LinearGradient } from "expo-linear-gradient";
import { API_URL } from "../../../constants";
import * as Notifications from "expo-notifications";

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
    accountNumberFrom,
    accountNumberWhere,
    resultSum,
    whereCurrencyCode,
  } = route.params;
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const token = useSelector((state) => state.signIn.token);

  const sendNotification = async (notificationData) => {
    const intSum = parseFloat(notificationData?.data?.data?.TransferSum);
    const intCommission = parseFloat(
      notificationData?.data?.data?.CommissionSum
    );

    const createdAtDate = new Date(notificationData?.data?.data?.TransferDate);
    const formattedCreatedAt = createdAtDate.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const notification = {
      title: "Отправка средств",
      body: `
         Отправлено: ${notificationData?.data?.data?.TransferSum} ${
        notificationData.Currency
      }
         Комиссия: ${notificationData?.data?.data?.CommissionSum}
         Со счёта: ${notificationData?.data?.data?.WalletSender}
         На счёт: ${notificationData?.data?.data?.WalletReceiver}
         Дата: ${formattedCreatedAt}
         Общая сумма ${intSum + intCommission} `,
      android: {
        channelId: "default",
      },
    };

    await Notifications.scheduleNotificationAsync({
      content: notification,
      trigger: null,
    });
  };
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
          setLoading(false);
          sendNotification({
            data,
          });
          navigate("Успешный перевод", {
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

          setLoading(false);
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
          sendNotification({
            data,
          });
          setLoading(false);
          navigate("Успешный перевод", {
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
          sendNotification({
            data,
          });
          setLoading(false);
          navigate("Успешный перевод", {
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
        });
    } else if (selectedType === "Между счетами") {
      fetch(`${API_URL}/wallets/currency-exchange/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ accountNumberFrom, accountNumberWhere, sum }),
      })
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
          sendNotification({
            data,
          });
          navigate("Успешный перевод", {
            sum: sum,
            currencyCode: currencyCode,
            requisites: accountNumberWhere,
            sender_requisites: accountNumberFrom,
            commission: commission,
            selectedType: selectedType,
            id: id,
          });
        })
        .catch((error) => {
          setError(error.message);

          setLoading(false);
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
            paddingVertical: 20,
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
            {i18n.t("checkDetails")}
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
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ color: "#fff", marginBottom: 5 }}>
                    {i18n.t("transferType")}:
                  </Text>
                  <Text style={{ color: "#fff", fontWeight: 600 }}>
                    {selectedType}
                  </Text>
                </View>
                <View>
                  <Text style={{ color: "#fff", marginBottom: 5 }}>
                    {i18n.t("recipientPhoneNumber")}:
                  </Text>
                  <Text style={{ color: "#fff", fontWeight: 600 }}>
                    {phone_number}
                  </Text>
                </View>
              </View>
            )}
            {receiver_requisites && (
              <View>
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ color: "#fff", marginBottom: 5 }}>
                    {i18n.t("transferType")}:
                  </Text>
                  <Text style={{ color: "#fff", fontWeight: 600 }}>
                    {selectedType}
                  </Text>
                </View>
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ color: "#fff", marginBottom: 5 }}>
                    {i18n.t("receiverName")}:
                  </Text>
                  <Text style={{ color: "#fff", fontWeight: 600 }}>
                    {nameUser}
                  </Text>
                </View>
                <View>
                  <Text style={{ color: "#fff", marginBottom: 5 }}>
                    {i18n.t("recipientDetails")}:
                  </Text>
                  <Text style={{ color: "#fff", fontWeight: 600 }}>
                    {receiver_requisites}
                  </Text>
                </View>
              </View>
            )}
            {address && (
              <View>
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ color: "#fff", marginBottom: 5 }}>
                    {i18n.t("transferType")}:
                  </Text>
                  <Text style={{ color: "#fff", fontWeight: 600 }}>
                    {selectedType}
                  </Text>
                </View>
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ color: "#fff", marginBottom: 5 }}>
                    {i18n.t("recipientsWalletAddress")}:
                  </Text>
                  <Text style={{ color: "#fff", fontWeight: 600 }}>
                    {address}
                  </Text>
                </View>
                <View>
                  <Text style={{ color: "#fff", marginBottom: 5 }}>
                    {i18n.t("transferTypeWallet")}:
                  </Text>
                  <Text style={{ color: "#fff", fontWeight: 600 }}>
                    {addressType}
                  </Text>
                </View>
              </View>
            )}
            {accountNumberWhere && (
              <View>
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ color: "#fff", marginBottom: 5 }}>
                    {i18n.t("transferType")}:
                  </Text>
                  <Text style={{ color: "#fff", fontWeight: 600 }}>
                    {selectedType}
                  </Text>
                </View>
                <View>
                  <Text style={{ color: "#fff", marginBottom: 5 }}>
                    {i18n.t("сurrencyDetails")}:
                  </Text>
                  <Text style={{ color: "#fff", fontWeight: 600 }}>
                    {accountNumberWhere}
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
              <Text style={{ color: "#fff" }}>{i18n.t("accountDebited")}</Text>
              {selectedType === "Между счетами" ? (
                <Text style={{ color: "#fff" }}>{accountNumberFrom}</Text>
              ) : (
                <Text style={{ color: "#fff" }}>{sender_requisites}</Text>
              )}
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
              <Text style={{ color: "#fff" }}>{i18n.t("balance")}</Text>
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
              <Text style={{ color: "#fff" }}>{i18n.t("transferAmount")}</Text>
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
              <Text style={{ color: "#fff" }}>{i18n.t("commission")}</Text>
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
            {selectedType === "Между счетами" ? (
              <Text style={{ color: "#fff", fontSize: 16 }}>
                {i18n.t("receiptAmount")}:
              </Text>
            ) : (
              <Text style={{ color: "#fff", fontSize: 16 }}>
                {i18n.t("amountDebited")}:
              </Text>
            )}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
              }}
            >
              {selectedType === "Между счетами" ? (
                <Text style={{ color: "#fff", fontSize: 20, fontWeight: 600 }}>
                  {resultSum}
                </Text>
              ) : commission ? (
                <Text style={{ color: "#fff", fontSize: 20, fontWeight: 600 }}>
                  {parseFloat(sum) + parseFloat(commission)}
                </Text>
              ) : (
                <Text style={{ color: "#fff", fontSize: 20, fontWeight: 600 }}>
                  {sum}
                </Text>
              )}
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: 600 }}>
                {currencySymbols[whereCurrencyCode]}
              </Text>
            </View>
          </View>

          {parseInt(error) === 400 && (
            <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
              {i18n.t("insufficientFunds")}
            </Text>
          )}
          {loading ? (
            <ActivityIndicator
              size="large"
              style={{ marginTop: 30 }}
              color={"#fff"}
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
                {i18n.t("confirm")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaWrapper>
    </LinearGradient>
  );
};

export default ConfirmationUser;
