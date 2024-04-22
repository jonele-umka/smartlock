import { Skeleton } from "@rneui/base";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import i18n from "../i18n/i18n";
const Analytics = ({ transactions, loading }) => {
  const [dailyExpenses, setDailyExpenses] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  useEffect(() => {
    let totalAmount = 0;
    const currentDate = new Date();
    currentDate.setDate(1);
    const startDate = currentDate.toISOString().split("T")[0];

    currentDate.setMonth(currentDate.getMonth() + 1);
    currentDate.setDate(1);
    const endDate = currentDate.toISOString().split("T")[0];

    setStartDate(startDate);
    setEndDate(endDate);

    const groupedExpenses = transactions.reduce((result, transaction) => {
      const date = transaction.CreatedAt.split("T")[0];
      const amount = parseFloat(transaction.SumSender);
      const status = transaction.Status;
      if (date >= startDate && date < endDate && status === "Completed") {
        if (!result[date]) {
          result[date] = 0;
        }

        result[date] += amount;
        totalAmount += amount;
      }

      return result;
    }, {});
    setTotalAmount(totalAmount);
    setDailyExpenses(groupedExpenses);
  }, [transactions]);
  const handleDayClick = (day, totalAmount) => {
    setSelectedDay({ date: day, expenses: { totalAmount } });
  };

  const maxExpense = Math.max(...Object.values(dailyExpenses));
  const minExpense = Math.min(...Object.values(dailyExpenses));

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  if (loading) {
    <ActivityIndicator
      size="large"
      style={{ marginTop: 30, marginBottom: 30 }}
      color={"#fff"}
    />;
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
  return (
    <View>
      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: 500,
          marginTop: 5,
        }}
      >
        {totalAmount ? totalAmount : i18n.t("noExpensesThisMonth")}
      </Text>
      {selectedDay && (
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 10,
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, marginBottom: 5 }}>
            {selectedDay ? `${i18n.t("expenseFor")} ${selectedDay.date}` : null}
          </Text>
          <Text style={{ color: "#fff", fontSize: 16 }}>
            {selectedDay ? `${selectedDay.expenses.totalAmount}` : null}
          </Text>
        </View>
      )}
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          horizontal={true}
        >
          <View style={styles.chart}>
            {Object.keys(dailyExpenses).map((date, index) => (
              <View key={date}>
                <View
                  onPress={() => handleDayClick(date, dailyExpenses[date] || 0)}
                  style={[
                    styles.bar,
                    {
                      height: Math.max(
                        (dailyExpenses[date] / maxExpense) * 150
                      ),
                      backgroundColor: getRandomColor(),
                    },
                  ]}
                ></View>

                <Text
                  onPress={() => handleDayClick(date, dailyExpenses[date] || 0)}
                  style={styles.barText}
                >
                  {date.split("-")[2]}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: "#fff",
    textAlign: "left",
    marginBottom: 20,
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  chart: {
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    marginTop: 20,
  },
  bar: {
    width: 20,
    marginHorizontal: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 5,
  },
  barText: {
    paddingTop: 10,
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
});

export default Analytics;
