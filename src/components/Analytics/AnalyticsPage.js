import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Skeleton } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";

const AnalyticsPage = () => {
  const route = useRoute();
  const { transactions, loading } = route.params;

  const [monthlyExpenses, setMonthlyExpenses] = useState([]);

  useEffect(() => {
    const groupedExpenses = transactions.reduce((result, transaction) => {
      const date = transaction.CreatedAt.split("T")[0];
      const amount = parseFloat(transaction.SumSender);
      const status = transaction.Status;
      const [year, month] = date.split("-");
      const monthKey = `${year}-${month}`;

      if (status === "Completed") {
        if (!result[monthKey]) {
          result[monthKey] = {
            startDate: `${year}-${month}-01`,
            endDate: new Date(year, month, 0).toISOString().split("T")[0],
            days: {},
            totalAmount: 0,
          };
        }

        if (!result[monthKey].days[date]) {
          result[monthKey].days[date] = {
            totalAmount: 0,
            transactions: [],
          };
        }

        result[monthKey].days[date].totalAmount += amount;
        result[monthKey].days[date].transactions.push(transaction);
        result[monthKey].totalAmount += amount;
      }
      return result;
    }, {});

    const monthlyExpenses = Object.entries(groupedExpenses).map(
      ([key, value]) => ({
        month: key,
        startDate: value.startDate,
        endDate: value.endDate,
        days: value.days,
        totalAmount: value.totalAmount,
      })
    );

    setMonthlyExpenses(monthlyExpenses);
  }, [transactions]);
  const maxExpense = Math.max(
    ...monthlyExpenses.map(
      (expense) =>
        Math.max(
          ...Object.values(expense.days).map((day) => day.totalAmount || 0)
        ) || 0
    )
  );

  const minExpense = Math.min(
    ...monthlyExpenses.map(
      (expense) =>
        Math.min(
          ...Object.values(expense.days).map((day) => day.totalAmount || 0)
        ) || 0
    )
  );

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ marginTop: 30 }}
        color={"#fff"}
      />
    );
  }

  if (!transactions.length) {
    return (
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
    );
  }

  if (Object.keys(monthlyExpenses).length === 0) {
    return (
      <View>
        <Text
          style={{
            fontSize: 18,
            color: "#fff",
            textAlign: "left",
            marginBottom: 20,
          }}
        >
          Нет данных о расходах
        </Text>
      </View>
    );
  }

  return (
    <LinearGradient
      style={{ flex: 1 }}
      start={{ x: 2.4, y: 1.1 }}
      end={{ x: 0, y: 0 }}
      colors={["#241270", "#140A4F", "#000"]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Text
          style={{
            color: "#fff",
            paddingHorizontal: 10,
            paddingTop: 20,
            fontSize: 25,
            textAlign: "center",
          }}
        >
          Все расходы
        </Text>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 10,
            paddingTop: 20,
            paddingBottom: 20,
          }}
          horizontal={true}
        >
          <View style={{ flexDirection: "row", columnGap: 40 }}>
            {monthlyExpenses.map((expense, index) => (
              <View
                style={{
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                key={index}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#fff",
                      marginBottom: 5,
                    }}
                  >
                    За{" "}
                    {new Date(expense.startDate).toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </Text>
                  <Text
                    style={{ color: "#fff", fontSize: 20, fontWeight: 500 }}
                  >
                    {expense.totalAmount}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row-reverse",
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  {Object.keys(expense.days).map((day, index) => (
                    <View key={index}>
                      <View
                        style={{
                          width: 20,
                          marginHorizontal: 2,
                          borderRadius: 5,
                          height:
                            (expense.days[day].totalAmount / maxExpense) * 450,
                          backgroundColor: getRandomColor(),
                        }}
                      ></View>
                      <Text
                        style={{
                          paddingTop: 10,
                          color: "#fff",
                          fontSize: 12,
                          textAlign: "center",
                        }}
                      >
                        {day.split("-")[2]}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AnalyticsPage;
