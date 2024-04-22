import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactionsIncoming } from "../../../Store/Transactions/transctionsActions";
import { Skeleton } from "@rneui/themed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import ModalCheck from "../../ModalCheck/ModalCheck";
import { LinearGradient } from "expo-linear-gradient";
import i18n from "../../i18n/i18n";
const Incoming = () => {
  const dispatch = useDispatch();
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const transactions = useSelector((state) => state.transactions.incoming);
  const loading = useSelector((state) => state.transactions.loading);
  const token = useSelector((state) => state.signIn.token);

  // Группировка транзакций по датам
  const groupedTransactions = transactions.reduce((result, transaction) => {
    const date = new Date(transaction.CreatedAt);
    const now = new Date();
    const formattedDate =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
        ? i18n.t("today")
        : date.getDate() === now.getDate() - 1 &&
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        ? i18n.t("yesterday")
        : `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    if (!result[formattedDate]) {
      result[formattedDate] = [];
    }
    result[formattedDate].push(transaction);
    return result;
  }, {});
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
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    RUB: "₽",
    KGS: "C",
    USDT: "₮",
    ETH: "Ξ",
    BTC: "₿",
  };

  // loadHistory
  useEffect(() => {
    if (token) {
      dispatch(fetchTransactionsIncoming());
    }
  }, [token, dispatch]);

  // refresh
  const onRefresh = () => {
    dispatch(fetchTransactionsIncoming());
  };

  const getStatusColor = (status) => {
    if (status === "Completed") {
      return (
        <MaterialCommunityIcons
          name="check-circle"
          style={{ color: "#2CE02B", fontSize: 30 }}
        />
      );
    } else if (status === "Canceled") {
      return (
        <Entypo
          name="circle-with-cross"
          style={{ color: "#9D0038", fontSize: 30 }}
        />
      );
    } else {
      return (
        <Entypo
          name="back-in-time"
          style={{
            color: "grey",
            fontSize: 30,
          }}
        />
      );
    }
  };

  if (!transactions.length) {
    return (
      <View style={{ flexDirection: "column", rowGap: 20, padding: 20 }}>
        <Skeleton animation="pulse" style={styles.skeletonItem} />
        <Skeleton animation="pulse" style={styles.skeletonItem} />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          size="large"
          style={{ marginTop: 30 }}
          color={"#fff"}
        />
      </View>
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
          style={
            {
              paddingHorizontal: 10,
              paddingVertical: 20,
            }
            // isDarkModeEnabled
            //   ? { backgroundColor: "#191a1d" }
            //   : { backgroundColor: "#f8f3ff" }
          }
          refreshControl={<RefreshControl onRefresh={onRefresh} />}
        >
          <View
            style={{
              flexDirection: "column",
              rowGap: 20,
            }}
          >
            {Object.keys(groupedTransactions).map((date) => (
              <View key={date}>
                <Text
                  style={{
                    color: "#fff",
                    marginBottom: 10,
                    textAlign: "right",
                  }}
                >
                  {date}
                </Text>
                <View
                  style={{
                    flexDirection: "column",
                    borderRadius: 10,
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                >
                  {groupedTransactions[date].map(
                    (transactions, index, array) => (
                      <TouchableOpacity
                        key={`${transactions.ID}_${transactions.Type}_${index}`}
                        onPress={() => {
                          if (transactions.Status !== "Performed") {
                            setSelectedTransaction(transactions);
                            setModalVisible(!modalVisible);
                          }
                        }}
                        style={[
                          styles.transactionListView,
                          index === array.length - 1 && {
                            borderBottomWidth: 0,
                          },
                          // isDarkModeEnabled && { backgroundColor: "#383838" },
                        ]}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            columnGap: 10,
                            alignItems: "center",
                          }}
                        >
                          {getStatusColor(transactions.Status)}

                          <View
                          // style={isDarkModeEnabled && { borderLeftColor: "#fff" }}
                          >
                            <Text
                              style={[
                                {
                                  marginBottom: 10,
                                  fontWeight: 500,
                                  fontSize: 16,
                                  width: 180,
                                  color: "#fff",
                                },
                                // isDarkModeEnabled ? { color: "#fff" } : { color: "#000" },
                              ]}
                            >
                              {transactions.ReceiverRequisites.length > 16
                                ? transactions.ReceiverRequisites.substring(
                                    0,
                                    16
                                  ) + "..."
                                : transactions.ReceiverRequisites.slice(
                                    -4
                                  ).padStart(
                                    transactions.ReceiverRequisites.length,
                                    "*"
                                  )}
                            </Text>
                            <Text
                              style={[
                                { fontSize: 12, color: "#9c9c9c" },
                                // isDarkModeEnabled && { color: "#7A7A7A" },
                              ]}
                            >
                              {formatDate(transactions.CreatedAt)}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            columnGap: 5,
                          }}
                        >
                          <View style={{ flexDirection: "column" }}>
                            <Text
                              style={[
                                transactions.Status === "Completed"
                                  ? { color: "#2CE02B" }
                                  : { color: "#fff" },
                                { fontWeight: 600, textAlign: "right" },
                                // isDarkModeEnabled
                                //   ? { color: "#fff" }
                                //   : { color: getStatusColor(transactions.Status) },
                              ]}
                            >
                              {transactions.Status === "Completed" ? "+" : ""}{" "}
                              {transactions.SumSender.length > 8
                                ? transactions.SumSender.substring(0, 8) + "..."
                                : transactions.SumSender}
                            </Text>
                            {transactions.Status === "Canceled" && (
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: "#9D0038",
                                  textAlign: "right",
                                }}
                              >
                                Отклонён
                              </Text>
                            )}
                            {transactions.Status === "Performed" && (
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: "grey",
                                  textAlign: "right",
                                }}
                              >
                                В обработке
                              </Text>
                            )}
                          </View>
                          <Text
                            style={[
                              { color: "#fff" },
                              // isDarkModeEnabled ? { color: "#fff" } : { color: "#000" },
                            ]}
                          >
                            {
                              currencySymbols[
                                transactions.CurrencySender.CurrencyCode
                              ]
                            }
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                  )}
                </View>
              </View>
            ))}
          </View>
          <ModalCheck
            selectedTransaction={selectedTransaction}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            transactions={transactions}
          />
        </ScrollView>
      </LinearGradient>
    );
  }
};

const styles = StyleSheet.create({
  transactionListView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    columnGap: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#fff",
  },

  skeletonItem: {
    width: "100%",
    height: 80,
    backgroundColor: "#333",
    borderRadius: 10,
  },
});

export default Incoming;
