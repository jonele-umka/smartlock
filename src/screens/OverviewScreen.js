import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { Skeleton } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import CryptoCard from "../components/Crypto/CryptoCard";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import TransactionsCrypto from "../components/TransactionsCrypto/TransactionsCrypto";
import { LinearGradient } from "expo-linear-gradient";
import {
  fetchTransactions,
  fetchTransactionsIncoming,
} from "../Store/Transactions/transctionsActions";
import Analytics from "../components/Analytics/Analytics";
import { Badge } from "@rneui/themed";
import i18n from "../components/i18n/i18n";

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
  console.log(token);

  // refresh
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchTransactions());
    setRefreshing(false);
  };
  // loadHistory
  useEffect(() => {
    if (token) {
      dispatch(fetchTransactionsIncoming());
      dispatch(fetchTransactions());
    }
  }, [token, dispatch]);

  // const favorites = useSelector((state) => state.favorites.favorites);

  // const [showActionsheet, setShowActionsheet] = React.useState(false);
  // const handleClose = () => setShowActionsheet(!showActionsheet);
  // const logout = () => {
  //   // Очистить токен из хранилища
  //   AsyncStorage.removeItem("token");
  //   navigation.navigate("Войти");
  // };
  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;
  // const onShare = async () => {
  //   try {
  //     const asset = Asset.fromModule(require("../assets/card/cardCrypto.png"));
  //     await asset.downloadAsync();
  //     const localFilePath = asset.localUri;
  //     console.log(localFilePath);

  //     // Отправьте файл
  //     const result = await Sharing.shareAsync(localFilePath, {
  //       mimeType: "image/png",
  //       dialogTitle: "Kurmet shakal",
  //     });

  //     console.log("Результат обмена:", result);
  //   } catch (error) {
  //     console.error("Ошибка обмена:", error.message);
  //   }
  // };
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
        style={{ paddingVertical: 20 }}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        <SafeAreaWrapper
          style={[
            { flex: 1 },
            // isDarkModeEnabled && { backgroundColor: "#191a1d" },
          ]}
        >
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
              source={require("../assets/CRYPTONLogo.png")}
            />

            <TouchableOpacity>
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
                        {i18n.t("transfer")}
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
              <TouchableOpacity style={{ flex: 1, height: 120 }}>
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
                        {i18n.t("scan")}
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
                        {i18n.t("history")}
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
                        {i18n.t("orderACard")}
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
                        source={require("../assets/overview/card.png")}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
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
              {i18n.t("expensesForThisMonth")}
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
                  backgroundColor: "#5d00e6",
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
                  {i18n.t("moreDetails")}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              paddingBottom: 30,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
                marginBottom: 10,
              }}
            >
              {i18n.t("transfers")}
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
                  backgroundColor: "#5d00e6",
                  borderRadius: 10,
                  paddingVertical: 20,
                  marginTop: 10,
                }}
                onPress={() => navigation.navigate("История переводов")}
              >
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  {i18n.t("viewAllTransfers")}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaWrapper>
      </ScrollView>
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
    width: 130,
    height: 30,
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
