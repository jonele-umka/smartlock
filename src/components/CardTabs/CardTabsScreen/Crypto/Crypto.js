import React, { useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CryptoCard from "./CryptoCard";
import TransactionsCrypto from "../../../TransactionsCrypto/TransactionsCrypto";
import { fetchTransactions } from "../../../../Store/Transactions/transctionsActions";
import Ionicons from "react-native-vector-icons/Ionicons";

function Crypto() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );
  const transactions = useSelector((state) => state.transactions.transactions);
  const loading = useSelector((state) => state.transactions.loading);
  const token = useSelector((state) => state.signIn.token);

  // loadHistory
  useEffect(() => {
    if (token) {
      dispatch(fetchTransactions());
    }
  }, [token, dispatch]);

  // refresh
  const onRefresh = () => {
    dispatch(fetchTransactions());
  };

  return (
    <ScrollView
      style={
        { backgroundColor: "#191a1d" }
        // isDarkModeEnabled
        //   ? { backgroundColor: "#f8f3ff" }
        //   : { backgroundColor: "#191a1d" }
      }
      refreshControl={<RefreshControl onRefresh={onRefresh} />}
    >
      <View
        style={[
          { flex: 1, paddingBottom: 20 },
          // isDarkModeEnabled && { backgroundColor: "#191a1d" },
        ]}
      >
        <View style={{ marginBottom: 30 }}>
          <CryptoCard />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              columnGap: 20,
            }}
          >
            <TouchableOpacity
              style={[
                styles.cardBottomView,
                // isDarkModeEnabled && { backgroundColor: "#383838" },
              ]}
            >
              <MaterialCommunityIcons
                name="line-scan"
                style={{ fontSize: 50, color: "#5d00e6" }}
              />
              <Text
                style={[
                  styles.cardBottomText,
                  isDarkModeEnabled && { color: "#fff" },
                ]}
              >
                QR
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Перевести")}
              style={[
                styles.cardBottomView,
                // isDarkModeEnabled && { backgroundColor: "#383838" },
              ]}
            >
              <Ionicons
                name="send"
                style={{ color: "#5d00e6", fontSize: 40 }}
              />

              <Text
                style={[
                  styles.cardBottomText,
                  isDarkModeEnabled && { color: "#fff" },
                ]}
              >
                Перевести
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("История переводов")}
              style={[
                styles.cardBottomView,
                // isDarkModeEnabled && { backgroundColor: "#383838" },
              ]}
            >
              <MaterialCommunityIcons
                name="history"
                style={{ fontSize: 50, color: "#5d00e6" }}
              />
              <Text
                style={[
                  styles.cardBottomText,
                  // isDarkModeEnabled && { color: "#fff" },
                ]}
              >
                История
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <View style={[styles.headText]}>
            <Text
              style={[
                { fontWeight: 500, fontSize: 16, color: "#fff" },
                // isDarkModeEnabled && { color: "#fff" },
              ]}
            >
              Переводы
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator
              size="large"
              style={{ marginTop: 30 }}
              color={"#fff"}
            />
          ) : (
            <TransactionsCrypto transactions={transactions} />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  headText: {
    marginBottom: 20,
  },

  cardBottomView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    width: "25%",
    height: 100,
    borderRadius: 20,
  },

  cardBottomText: {
    color: "#fff",
    marginTop: 10,
  },
});
export default Crypto;
