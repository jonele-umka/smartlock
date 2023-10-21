import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import AccountsCard from "./AccountsCard";
import RecentTransaction from "../../../RecentTransaction";
import AntDesign from "react-native-vector-icons/AntDesign";
export const Accounts = () => {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={{ marginBottom: 30 }}>
        <AccountsCard />
        <View style={styles.cardBottomButtons}>
          <View style={styles.cardBottomView}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                columnGap: 5,
                alignItems: "center",
              }}
            >
              <AntDesign name="plus" style={{ color: "#1b22a2" }} />
              <Text style={styles.cardBottomText}>Add money</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardBottomView}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                columnGap: 5,
                alignItems: "center",
              }}
            >
              <AntDesign name="arrowright" style={{ color: "#1b22a2" }} />
              <Text style={styles.cardBottomText}>Send</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardBottomView}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                columnGap: 5,
                alignItems: "center",
              }}
            >
              <AntDesign name="arrowdown" style={{ color: "#1b22a2" }} />
              <Text style={styles.cardBottomText}>WithDraw</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <RecentTransaction />
    </View>
  );
};
const styles = StyleSheet.create({
  headText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cardBottomButtons: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 10,
  },
  cardBottomView: {
    backgroundColor: "rgb(237,245,253)",
    paddingTop: 8,
    paddingRight: 12,
    paddingBottom: 8,
    paddingLeft: 12,
    borderRadius: 7,
  },
  cardBottomText: {
    color: "#8b5cf6",
    alignItems: "center",
    fontWeight: 600,
  },
});
