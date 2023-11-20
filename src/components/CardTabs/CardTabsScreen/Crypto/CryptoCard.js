import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Skeleton } from "@rneui/themed";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { API_URL } from "../../../../constants";
const { width } = Dimensions.get("window");

const CARD_WIDTH = width - 45;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + 25;

const CryptoCard = () => {
  const navigation = useNavigation();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [data, setData] = useState([]);
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const token = useSelector((state) => state.signIn.token);
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    RUB: "₽",
    KGS: "C",
    USDT: "₮",
    ETH: "Ξ",
    BTC: "₿",
  };
  // loadCard
  useEffect(() => {
    fetch(`${API_URL}/wallets/balance`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            const errorMessage = data?.Error || "Произошла ошибка";
            throw new Error(errorMessage);
          });
        }
        return response.json();
      })
      .then((data) => {
        setData(data?.data);
      })
      .catch((error) => {
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
  }, [token]);

  const toggleBalanceVisibility = () => {
    setIsBalanceHidden((prev) => !prev);
  };
  const renderDot = (index) => {
    const isActive = index === activeSlideIndex;
    return (
      <View key={index} style={[styles.dot, isActive && styles.activeDot]} />
    );
  };
  if (!data.length) {
    return (
      <View
        style={{
          flexDirection: "column",
          rowGap: 20,
          padding: 20,
          marginBottom: 30,
        }}
      >
        <Skeleton animation="pulse" style={styles.skeletonItem} />
      </View>
    );
  }

  return (
    <View style={{ marginBottom: 30 }}>
      <FlatList
        data={data}
        horizontal
        snapToInterval={CARD_WIDTH_SPACING}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.WalletSubAccount.ID.toString()}
        onScroll={(event) => {
          const xOffset = event.nativeEvent.contentOffset.x;
          const index = Math.round(xOffset / CARD_WIDTH_SPACING);
          setActiveSlideIndex(index);
        }}
        renderItem={({ item, index }) => {
          const walletSubAccount = item.WalletSubAccount;
          const currencyCode = `${walletSubAccount.Currency.CurrencyCode}`;
          const currencySymbol = currencySymbols[currencyCode] || currencyCode;
          const currencyNumber = `${walletSubAccount.AccountNumber}`;
          const balance = `${walletSubAccount.Balance}`;

          return (
            <View
              style={{
                marginLeft: 25,
                marginRight: index === data.length - 1 ? 25 : 0,
                paddingVertical: 20,
              }}
            >
              <ImageBackground
                source={require("../../../../assets/card/cards.png")}
                imageStyle={{ borderRadius: 15 }}
                key={item.WalletSubAccount.ID}
                style={styles.card}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../../../../assets/CRYPTONLogo5.png")}
                    style={{ width: 100, height: 15 }}
                  />
                  <Entypo
                    onPress={() => {
                      navigation.navigate("Детали карты", {
                        cardData: item.WalletSubAccount,
                        currencySymbol: currencySymbol,
                      });
                    }}
                    name={"dots-three-vertical"}
                    style={{
                      fontSize: 15,
                      color: "#fff",
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.title}>
                    **** {currencyNumber.slice(-4)}
                  </Text>
                </View>
                <View>
                  <Text style={{ color: "#fff" }}>Баланс</Text>
                  <View
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
                        marginTop: 5,
                        columnGap: 5,
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 20 }}>
                        {currencySymbol}
                      </Text>
                      <Text style={styles.currencyData}>
                        {isBalanceHidden
                          ? "****"
                          : balance.length > 16
                          ? balance.substring(0, 16) + "...."
                          : balance}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={toggleBalanceVisibility}>
                      {isBalanceHidden ? (
                        <Ionicons
                          name="eye-outline"
                          style={{ color: "#fff", fontSize: 25 }}
                        />
                      ) : (
                        <Ionicons
                          name="eye-off-outline"
                          style={{ color: "#fff", fontSize: 25 }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                {/* <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#f3f3f3", fontSize: 16 }}>
                    {wallet.label}
                  </Text>

                  <AntDesign
                    name="arrowright"
                    style={{ fontSize: 20, color: "#fff" }}
                  />
                </View> */}
              </ImageBackground>
            </View>
          );
        }}
      />
      <View style={styles.dotContainer}>
        {data.map((_, index) => {
          const isActive = index === activeSlideIndex;
          return (
            <View
              key={index}
              style={[styles.dot, isActive && styles.activeDot]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,
    // shadowColor: "#0268EC",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.35,
    // shadowRadius: 8.84,
    // elevation: 5,
  },

  title: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 30,
  },
  currencyData: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 22,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#333",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#0268EC",
  },
  skeletonItem: {
    width: "100%",
    height: 200,
    backgroundColor: "#333",
    borderRadius: 10,
  },
});

export default CryptoCard;
