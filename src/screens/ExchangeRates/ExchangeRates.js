import {
  View,
  Text,
  Platform,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { API_URL } from "../../constants";
import { useSelector } from "react-redux";
import i18n from "../../components/i18n/i18n";
const ExchangeRates = () => {
  // const token = useSelector((state) => state.signIn.token);
  const [exchange, setExchange] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let socket = new WebSocket(
      `${API_URL}/get-crypto-exchange-rates?token=${token}`
    );

    socket.onopen = function (e) {
      setLoading(true);
      socket.send(JSON.stringify({ token: token }));
    };

    socket.onmessage = function (event) {
      setLoading(false);
      const data = JSON.parse(event.data);

      setExchange(data);
    };

    socket.onclose = function (event) {
      if (event.wasClean) {
        setLoading;
        console.log(
          `Соединение закрыто чисто, код=${event.code}, причина=${event.reason}`
        );
      } else {
        console.log("Соединение прервано");
      }
    };

    socket.onerror = function (error) {
      setLoading(false);
      console.log("[error]", error.message);
    };

    return () => {
      socket.close();
    };
  }, []);
  const currencyImg = {
    USDT: require("../../assets/Exchange/usdt.png"),
    ETH: require("../../assets/Exchange/eth.png"),
    ETC: require("../../assets/Exchange/etc.png"),
    BTC: require("../../assets/Exchange/btc.png"),
  };
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;
  if (loading) {
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
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator
            size="large"
            style={{ marginTop: 30 }}
            color={"#fff"}
          />
        </View>
      </LinearGradient>
    );
  } else {
    return (
      <LinearGradient
        style={[{ flex: 1 }]}
        start={{ x: 2.4, y: 1.1 }}
        end={{ x: 0, y: 0 }}
        colors={["#241270", "#140A4F", "#000"]}
      >
        <SafeAreaWrapper style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 10 }}>
            <View>
              <Text style={{ color: "#fff", textAlign: "center", marginBottom: 40, fontSize: 25 }}>
                {i18n.t("exchangeRates")}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "#9c9c9c", marginBottom: 30 }}>
                {i18n.t("currency")}
              </Text>
              <Text style={{ color: "#9c9c9c", marginBottom: 30 }}>
                {i18n.t("buy")}
              </Text>
              <Text style={{ color: "#9c9c9c", marginBottom: 30 }}>
                {i18n.t("sell")}
              </Text>
            </View>
            {Array.isArray(exchange) && (
              <View style={{ flexDirection: "column", rowGap: 40 }}>
                {exchange.map((exchange) => (
                  <View
                    key={exchange.ID}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 10,
                      }}
                    >
                      <Image
                        style={{ width: 25, height: 25 }}
                        source={currencyImg[exchange.Currency.CurrencyCode]}
                      />
                      <Text style={{ color: "#fff", fontSize: 16 }}>
                        {exchange.Currency.CurrencyCode}
                      </Text>
                    </View>
                    <Text style={{ color: "#fff", fontSize: 16 }}>
                      {exchange.ExchangeRateBuy}
                    </Text>
                    <Text style={{ color: "#fff", fontSize: 16 }}>
                      {exchange.ExchangeRateSell}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </SafeAreaWrapper>
      </LinearGradient>
    );
  }
};

export default ExchangeRates;
