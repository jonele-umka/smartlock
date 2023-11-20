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
  ImageBackground,
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: 20,
              paddingHorizontal: 10,
              marginBottom: 30,
            }}
          >
            <View style={{ flex: 1, rowGap: 20 }}>
              <TouchableOpacity
                style={{ flex: 1, height: 120 }}
                onPress={() => navigation.navigate("Перевести")}
              >
                <LinearGradient
                  style={[
                    { flex: 1, borderRadius: 15, padding: 10 },
                    // isDarkModeEnabled && { backgroundColor: "#191a1d" },
                  ]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  colors={["#6902EC", "#C40EC8"]}
                >
                  <View
                    style={{ flex: 1, flexDirection: "column", rowGap: 10 }}
                  >
                    <View
                      style={{
                        padding: 5,
                        borderRadius: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        columnGap: 5,
                        backgroundColor: "rgba(0,0,0,0.2)",
                      }}
                    >
                      <Feather
                        name="send"
                        style={{ color: "#fff", fontSize: 15 }}
                      />
                      <Text
                        style={{
                          color: "#fff",
                        }}
                      >
                        Перевести
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Image
                        style={{
                          width: 100,
                          height: "100%",
                          marginLeft: "auto",
                          resizeMode: "contain",
                          flex: 1,
                        }}
                        source={require("../assets/overview/transfer.png")}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1, height: 120 }}
                onPress={() => navigation.navigate("Перевести")}
              >
                <LinearGradient
                  style={[
                    { flex: 1, borderRadius: 15, padding: 10 },
                    // isDarkModeEnabled && { backgroundColor: "#191a1d" },
                  ]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  colors={["#0A53B2", "#0298EC"]}
                >
                  <View
                    style={{ flex: 1, flexDirection: "column", rowGap: 10 }}
                  >
                    <View
                      style={{
                        padding: 5,
                        borderRadius: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        columnGap: 5,
                        backgroundColor: "rgba(0,0,0,0.2)",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="qrcode-scan"
                        style={{ color: "#fff", fontSize: 15 }}
                      />
                      <Text
                        style={{
                          color: "#fff",
                        }}
                      >
                        Сканировать
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Image
                        style={{
                          width: 100,
                          height: "100%",
                          marginLeft: "auto",
                          resizeMode: "contain",
                          flex: 1,
                        }}
                        source={require("../assets/overview/scan.png")}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, rowGap: 20 }}>
              <TouchableOpacity
                style={{ flex: 1, height: 120 }}
                onPress={() => navigation.navigate("История переводов")}
              >
                <LinearGradient
                  style={[
                    { flex: 1, borderRadius: 15, padding: 10 },
                    // isDarkModeEnabled && { backgroundColor: "#191a1d" },
                  ]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  colors={["#0EC879", "#0AD5C2"]}
                >
                  <View
                    style={{ flex: 1, flexDirection: "column", rowGap: 10 }}
                  >
                    <View
                      style={{
                        padding: 5,
                        borderRadius: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        columnGap: 5,
                        backgroundColor: "rgba(0,0,0,0.2)",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="history"
                        style={{ fontSize: 15, color: "#fff" }}
                      />
                      <Text
                        style={{
                          color: "#fff",
                        }}
                      >
                        История
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Image
                        style={{
                          width: 100,
                          height: "100%",
                          marginLeft: "auto",
                          resizeMode: "contain",
                          flex: 1,
                        }}
                        source={require("../assets/overview/history.png")}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, height: 120 }}>
                <LinearGradient
                  style={[
                    { flex: 1, borderRadius: 15, padding: 10 },
                    // isDarkModeEnabled && { backgroundColor: "#191a1d" },
                  ]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  colors={["#EC6402", "#EC0256"]}
                >
                  <View
                    style={{ flex: 1, flexDirection: "column", rowGap: 10 }}
                  >
                    <View
                      style={{
                        padding: 5,
                        borderRadius: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        columnGap: 5,
                        backgroundColor: "rgba(0,0,0,0.2)",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="plus"
                        style={{ fontSize: 15, color: "#fff" }}
                      />
                      <Text
                        style={{
                          color: "#fff",
                        }}
                      >
                        Заказать карту
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Image
                        style={{
                          width: 100,
                          height: "100%",
                          marginLeft: "auto",
                          resizeMode: "contain",
                          flex: 1,
                        }}
                        source={require("../assets/overview/cardadd.png")}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={{ marginBottom: 30 }}>
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
          </View> */}
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
                  backgroundColor: "#4600c8",
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
                  backgroundColor: "rgb(70, 0, 200)",
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
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 15,
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
