import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";

import Ionicons from "react-native-vector-icons/Ionicons";
import ListCard from "../components/ListCard";
import { LinearGradient } from "expo-linear-gradient";

const transferItems = [
  {
    title: "Перенос счетов",
    icon: "repeat-variant",
  },
  {
    title: "Отправить деньги",
    icon: "cash-100",
  },
  {
    title: "Запросить деньги",
    icon: "cash-multiple",
  },
  {
    title: "Оплатить счета",
    icon: "file-check",
  },
];

const productItems = [
  {
    title: "Валютный своп",
    icon: "swap-vertical-circle-outline",
  },
  {
    title: "Купить страховку",
    icon: "account-box-multiple",
  },
  {
    title: "Buy stocks",
    icon: "trending-up",
  },
  {
    title: "Купить акции",
    icon: "bank",
  },
];

const topUpItems = [
  {
    title: "Входящий банковский перевод",
    icon: "arrow-collapse-down",
  },
  {
    title: "Исходящий банковский перевод",
    icon: "arrow-collapse-up",
  },
];
const PaymentsScreen = ({ navigation }) => {
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );
  const clickHandler = (page) =>
    navigation.push("Главная страница", { screen: page });

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
      <ScrollView>
        <SafeAreaWrapper
          style={[
            {
              flex: 1,
              // paddingHorizontal: 10,
            },
            // isDarkModeEnabled && { backgroundColor: "#191a1d" },
          ]}
        >
          <Text
            style={[
              {
                fontSize: 30,
                textAlign: "center",
                fontWeight: 600,
                color: "#191a1d",
                marginBottom: 25,
                color: "#fff",
                paddingTop: 20,
              },
              // isDarkModeEnabled && {
              //   color: "#fff",
              // },
            ]}
          >
            Платежи
          </Text>
          <View
            style={{
              marginBottom: 25,
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={[
                {
                  fontSize: 25,
                  color: "#191a1d",
                  fontWeight: 500,
                  marginBottom: 10,
                  color: "#fff",
                },
                // isDarkModeEnabled && {
                //   color: "#fff",
                // },
              ]}
            >
              Поиск
            </Text>
            <View
              style={[
                styles.search,
                // isDarkModeEnabled && { backgroundColor: "#272727" },
              ]}
            >
              <Ionicons name="search" size={25} color={"#9c9c9c"} />
              <TextInput
                style={[
                  styles.searchInput,
                  // isDarkModeEnabled && { backgroundColor: "#272727" },
                ]}
                placeholder="Поиск"
                placeholderTextColor={"#9c9c9c"}
              />
            </View>
          </View>
          <View style={styles.list}>
            <View>
              <ListCard
                clickHandler={clickHandler}
                items={transferItems}
                title={"Переводы"}
              />
            </View>
            <View>
              <ListCard
                clickHandler={clickHandler}
                items={productItems}
                title={"Другие продукты"}
              />
            </View>
            <View>
              <ListCard
                clickHandler={clickHandler}
                items={topUpItems}
                title={"Пополнить / Вывести"}
              />
            </View>
          </View>
        </SafeAreaWrapper>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: "column",
    rowGap: 25,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 0.7,
    // borderColor: "#767676",
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    shadowColor: "rgba(255,255,255,0.05)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8.84,
    elevation: 5,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    height: 45,
    color: "#fff",

    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default PaymentsScreen;
