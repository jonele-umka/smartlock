import React, { useEffect } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import CardTabsRoute from "../components/CardTabs/CardTabsRoute/CardTabsRoute";
import { Skeleton } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Crypto from "../components/CardTabs/CardTabsScreen/Crypto/Crypto";
import CryptoCard from "../components/CardTabs/CardTabsScreen/Crypto/CryptoCard";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import TransactionsCrypto from "../components/TransactionsCrypto/TransactionsCrypto";
import { LinearGradient } from "expo-linear-gradient";
import {
  fetchTransactions,
  fetchTransactionsIncoming,
} from "../Store/Transactions/transctionsActions";
import Analytics from "../components/Analytics/Analytics";
import { Avatar, AvatarFallbackText } from "@gluestack-ui/themed";
import { Badge, Icon, withBadge } from "@rneui/themed";

import AsyncStorage from "@react-native-async-storage/async-storage";
export const OverviewScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );

  const incoming = useSelector((state) => state.transactions.incoming);
  const outgoing = useSelector((state) => state.transactions.transactions);
  const transactions = [...outgoing, ...incoming];
  const loading = useSelector((state) => state.transactions.loading);
  const token = useSelector((state) => state.signIn.token);

  // loadHistory
  useEffect(() => {
    if (token) {
      dispatch(fetchTransactionsIncoming());
      dispatch(fetchTransactions());
    }
  }, [token, dispatch]);

  // refresh
  const onRefresh = () => {
    dispatch(fetchTransactions());
  };
  // const favorites = useSelector((state) => state.favorites.favorites);

  // const [showActionsheet, setShowActionsheet] = React.useState(false);
  // const handleClose = () => setShowActionsheet(!showActionsheet);
  const logout = () => {
    // Очистить токен из хранилища
    AsyncStorage.removeItem("token");
    navigation.navigate("Войти");
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
        style={[
          { flex: 1 },
          // isDarkModeEnabled && { backgroundColor: "#191a1d" },
        ]}
      >
        <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} />}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Уведомления", {
                  transactions: transactions,
                })
              }
            >
              <Ionicons
                name="notifications-outline"
                style={[
                  { fontSize: 30, color: "#fff", position: "relative" },
                  isDarkModeEnabled && { color: "#fff" },
                ]}
              />
              <Badge
                status="primary"
                value={transactions.length > 100 ? "99+" : transactions.length}
                containerStyle={{ position: "absolute", top: 0, left: 15 }}
              />
            </TouchableOpacity>
            <Image
              style={styles.logo}
              source={require("../assets/logo3.png")}
            />
            <TouchableOpacity onPress={logout}>
              <Image
                source={require("../assets/avatar.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>

            {/* <Avatar bgColor="#241270" size="sm" borderRadius="$full">
              </Avatar> */}
          </View>

          <View>
            <CryptoCard />
          </View>
          <View style={{ marginBottom: 30 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",

                  // width: "30%",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Перевести")}
                  style={styles.cardBottomView}
                  // style={[
                  //   styles.cardBottomView,
                  //   // isDarkModeEnabled && { backgroundColor: "#383838" },
                  // ]}
                >
                  <MaterialCommunityIcons
                    name="line-scan"
                    style={{ fontSize: 35, color: "#fff" }}
                  />
                </TouchableOpacity>
                <Text
                  style={styles.cardBottomText}
                  // style={[
                  //   styles.cardBottomText,
                  //   // isDarkModeEnabled && { color: "#fff" },
                  // ]}
                >
                  Скан
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",

                  // width: "30%",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Перевести")}
                  style={styles.cardBottomView}
                  // style={[
                  //   styles.cardBottomView,
                  //   // isDarkModeEnabled && { backgroundColor: "#383838" },
                  // ]}
                >
                  <Feather
                    name="send"
                    style={{ color: "#fff", fontSize: 35 }}
                  />
                </TouchableOpacity>
                <Text
                  style={styles.cardBottomText}
                  // style={[
                  //   styles.cardBottomText,
                  //   // isDarkModeEnabled && { color: "#fff" },
                  // ]}
                >
                  Перевести
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",

                  // width: "30%",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("История переводов")}
                  style={styles.cardBottomView}
                  // style={[
                  //   styles.cardBottomView,
                  //   // isDarkModeEnabled && { backgroundColor: "#383838" },
                  // ]}
                >
                  <MaterialCommunityIcons
                    name="history"
                    style={{ fontSize: 35, color: "#fff" }}
                  />
                </TouchableOpacity>
                <Text
                  style={styles.cardBottomText}
                  // style={[
                  //   styles.cardBottomText,
                  //   // isDarkModeEnabled && { color: "#fff" },
                  // ]}
                >
                  История
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",

                  // width: "30%",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Перевести")}
                  style={styles.cardBottomView}
                  // style={[
                  //   styles.cardBottomView,
                  //   // isDarkModeEnabled && { backgroundColor: "#383838" },
                  // ]}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    style={{ fontSize: 35, color: "#fff" }}
                  />
                </TouchableOpacity>
                <Text
                  style={styles.cardBottomText}
                  // style={[
                  //   styles.cardBottomText,
                  //   // isDarkModeEnabled && { color: "#fff" },
                  // ]}
                >
                  Карта
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
              }}
            >
              Расходы за этот месяц
            </Text>
            {loading ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  columnGap: 10,
                  marginVertical: 30,
                }}
              >
                <Skeleton
                  animation="pulse"
                  style={{
                    width: 20,
                    height: 60,
                    backgroundColor: "#333",
                    borderRadius: 5,
                  }}
                />
                <Skeleton
                  animation="pulse"
                  style={{
                    width: 20,
                    height: 150,
                    backgroundColor: "#333",
                    borderRadius: 5,
                  }}
                />
                <Skeleton
                  animation="pulse"
                  style={{
                    width: 20,
                    height: 40,
                    backgroundColor: "#333",
                    borderRadius: 5,
                  }}
                />
                <Skeleton
                  animation="pulse"
                  style={{
                    width: 20,
                    height: 50,
                    backgroundColor: "#333",
                    borderRadius: 5,
                  }}
                />
                <Skeleton
                  animation="pulse"
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "#333",
                    borderRadius: 5,
                  }}
                />
              </View>
            ) : (
              <Analytics transactions={outgoing} loading={loading} />
            )}
            {outgoing.length > 0 && !loading && (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  columnGap: 10,
                  backgroundColor: "rgba(93, 0, 230, 0.6)",
                  borderRadius: 10,
                  paddingVertical: 20,
                  marginTop: 20,
                }}
                onPress={() =>
                  navigation.navigate("Все расходы", {
                    transactions: outgoing,
                    loading: loading,
                  })
                }
              >
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  Посмотреть все расходы
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
                marginBottom: 10,
              }}
            >
              Переводы
            </Text>
            {loading ? (
              <View style={{ flexDirection: "column", rowGap: 20 }}>
                <Skeleton animation="pulse" style={styles.skeletonItem} />
                <Skeleton animation="pulse" style={styles.skeletonItem} />
              </View>
            ) : (
              <TransactionsCrypto
                transactions={transactions}
                incoming={incoming}
                outgoing={outgoing}
              />
            )}
            {transactions.length > 0 && !loading && (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  columnGap: 10,
                  backgroundColor: "rgba(93, 0, 230, 0.6)",
                  borderRadius: 10,
                  paddingVertical: 20,
                  marginTop: 10,
                }}
                onPress={() => navigation.navigate("История переводов")}
              >
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  Посмотреть все переводы
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaWrapper>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  logo: {
    flex: 0.5,
    height: "100%",
  },

  cardBottomView: {
    backgroundColor: "rgba(93, 0, 230, 0.6)",
    padding: 20,
    borderRadius: 10,
  },

  cardBottomText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 12,
  },
  skeletonItem: {
    width: "100%",
    height: 80,
    backgroundColor: "#333",
    borderRadius: 10,
  },
});
export default OverviewScreen;
