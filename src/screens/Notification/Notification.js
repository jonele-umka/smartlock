import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  fetchTransactions,
  fetchTransactionsIncoming,
  markNotificationsAsRead,
} from "../../Store/Transactions/transctionsActions";
import { useSelector, useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { API_URL } from "../../constants";
import i18n from "../../components/i18n/i18n";

const Notification = () => {
  const dispatch = useDispatch();
  // const incoming = useSelector((state) => state.transactions.incoming);
  // const outgoing = useSelector((state) => state.transactions.transactions);
  // const transactions = [...outgoing, ...incoming];
  // const loading = useSelector((state) => state.transactions.loading);
  // const token = useSelector((state) => state.signIn.token);
  const [balance, setBalance] = useState("");
  const scrollViewRef = useRef();

  useEffect(() => {
    // Check if scrollViewRef is defined before calling scrollToEnd
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [scrollViewRef.current]);

  // loadHistory
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    RUB: "₽",
    KGS: "C",
    USDT: "₮",
    ETH: "Ξ",
    BTC: "₿",
  };
<<<<<<< HEAD
  // useEffect(() => {
  //   if (token) {
  //     dispatch(fetchTransactionsIncoming());
  //     dispatch(fetchTransactions());
  //     fetch(`${API_URL}/wallets/balance`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           return response.json().then((data) => {
  //             const errorMessage = data?.Error || "Произошла ошибка";
  //             throw new Error(errorMessage);
  //           });
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         const newBalances = {};
  //         data.data.forEach((item) => {
  //           newBalances[item.WalletSubAccount.AccountNumber] =
  //             item.WalletSubAccount.Balance;
  //         });
  //         setBalance(newBalances);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, [token, dispatch]);
=======
  useEffect(() => {
    if (token) {
      dispatch(fetchTransactionsIncoming());
      dispatch(fetchTransactions());
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
          const newBalances = {};
          data.data.forEach((item) => {
            newBalances[item.WalletSubAccount.AccountNumber] =
              item.WalletSubAccount.Balance;
          });
          setBalance(newBalances);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token, dispatch]);
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  };
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
        style={[
          { flex: 1 },
          // isDarkModeEnabled && { backgroundColor: "#191a1d" },
        ]}
        start={{ x: 2.4, y: 1.1 }}
        end={{ x: 0, y: 0 }}
        colors={["#241270", "#140A4F", "#000"]}
      >
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          style={styles.chatThread}
        >
          <SafeAreaView style={{ flex: 1 }}>
            {transactions.map((transaction, index) => {
              const isOutgoing = outgoing.includes(transaction);
              const isIncoming = incoming.includes(transaction);

              return (
                <View
                  key={index}
                  style={[
                    styles.messageContainer,
                    isOutgoing
                      ? styles.outgoingMessage
                      : styles.incomingMessage,
                  ]}
                >
                  <View
                    style={
                      isOutgoing
                        ? styles.outgoingMessageBlock
                        : styles.incomingMessageBlock
                    }
                  >
                    {transaction.Status === "Completed" && (
                      <MaterialCommunityIcons
                        name="check-circle"
                        style={{ color: "#2CE02B", fontSize: 35 }}
                      />
                    )}
                    {transaction.Status === "Canceled" && (
                      <Entypo
                        name="circle-with-cross"
                        style={{ color: "#9D0038", fontSize: 35 }}
                      />
                    )}
                    {transaction.Status === "Performed" && (
                      <Entypo
                        name="back-in-time"
                        style={{
                          color: "grey",
                          fontSize: 35,
                        }}
                      />
                    )}
                    <View style={styles.message}>
                      <Text style={styles.messageText}>
                        {i18n.t("transfers")}: {transaction.SumSender}
                        {""}{" "}
                        {
                          currencySymbols[
                            transaction.CurrencySender.CurrencyCode
                          ]
                        }
                      </Text>

                      <Text style={styles.messageText}>
                        {isIncoming ? i18n.t("from") : i18n.t("to")} :{" "}
                        {isIncoming ? "****" : ""}
                        {isIncoming
                          ? transaction.ReceiverRequisites.slice(-4)
                          : transaction.ReceiverRequisites}
                      </Text>

                      <Text style={styles.messageText}>
                        {i18n.t("card")}: {transaction.SenderRequisites}
                      </Text>

                      {transaction.Status === "Completed" && (
                        <Text style={styles.messageText}>
                          {i18n.t("available")}:{" "}
                          {balance[transaction.SenderRequisites]}
                        </Text>
                      )}
                      <Text
                        style={{
                          alignSelf: "flex-end",
                          color: "#fff",
                          marginTop: 10,
                          fontSize: 14,
                        }}
                      >
                        {formatDate(transaction.CreatedAt)}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </SafeAreaView>
        </ScrollView>
      </LinearGradient>
    );
  }
};

const styles = {
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  chatThread: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageContainer: {
    marginBottom: 20,
    alignItems: "flex-end",
  },
  outgoingMessageBlock: {
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    columnGap: 10,
  },
  incomingMessageBlock: {
    flexDirection: "row",
    alignItems: "flex-end",
    columnGap: 10,
  },
  message: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "rgba(93, 0, 230, 0.2)",
    flexDirection: "column",
    rowGap: 5,
  },
  messageText: {
    fontSize: 16,
    color: "#fff",
  },
  incomingMessage: {
    alignItems: "flex-start",
  },
  outgoingMessage: {
    alignItems: "flex-end",
  },
};

export default Notification;
