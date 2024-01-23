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
import { LinearGradient } from "expo-linear-gradient";
const Analytics = ({ transactions, loading }) => {
  const [dailyExpenses, setDailyExpenses] = useState({});
  const [monthlyExpenses, setMonthlyExpenses] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const currentDate = new Date();
    currentDate.setDate(1);
    const startDate = currentDate.toISOString().split("T")[0];

    currentDate.setMonth(currentDate.getMonth() + 1);
    currentDate.setDate(1);
    const endDate = currentDate.toISOString().split("T")[0];

    const groupedExpenses = transactions.reduce((result, transaction) => {
      const date = transaction.CreatedAt.split("T")[0];
      const amount =
        parseFloat(transaction.SumSender) +
        parseFloat(transaction.CommissionSum);
      const status = transaction.Status;

      if (date >= startDate && date < endDate && status === "Completed") {
        const currencyCode = transaction.CurrencySender.CurrencyCode;

        if (!result[date]) {
          result[date] = {};
        }

        if (!result[date][currencyCode]) {
          result[date][currencyCode] = 0;
        }

        result[date][currencyCode] += amount;

        if (!monthlyExpenses[currencyCode]) {
          monthlyExpenses[currencyCode] = 0;
        }

        monthlyExpenses[currencyCode] += amount;
      }

      return result;
    }, {});

    setDailyExpenses(groupedExpenses);
  }, [transactions]);

  const handleDayClick = (dayExpenses) => {
    setSelectedDay(dayExpenses);
  };
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
      {Object.keys(monthlyExpenses).length ? (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            columnGap: 10,
            rowGap: 10,
            marginVertical: 10,
          }}
        >
          {Object.keys(monthlyExpenses).map((currencyCode) => (
            <View
              key={currencyCode}
              style={{
                backgroundColor: "#5d00e6",
                padding: 7,
                borderRadius: 5,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{ color: "#fff", fontWeight: 500 }}
                >{`${currencyCode}: `}</Text>
                <Text style={{ color: "#fff" }}>
                  {`${monthlyExpenses[currencyCode]}`}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: 500 }}>
          {i18n.t("noExpensesThisMonth")}
        </Text>
      )}
      {selectedDay && (
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            {`${i18n.t("expenseFor")} ${selectedDay.date}`}
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              columnGap: 10,
              rowGap: 10,
            }}
          >
            {Object.keys(selectedDay.expenses).map((currencyCode) => (
              <View
                key={currencyCode}
                style={{
                  backgroundColor: "#5d00e6",
                  padding: 7,
                  borderRadius: 5,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{ color: "#fff", fontWeight: 500 }}
                  >{`${currencyCode}: `}</Text>
                  <Text style={{ color: "#fff" }}>
                    {`${monthlyExpenses[currencyCode]}`}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        horizontal={true}
      >
        <View style={styles.chart}>
          {Object.keys(dailyExpenses).map((date, index) => (
            <View key={date}>
              <LinearGradient
                colors={[getRandomColor(), getRandomColor()]}
                onPress={() =>
                  handleDayClick({ date, expenses: dailyExpenses[date] })
                }
                style={[
                  styles.bar,
                  {
                    height: Math.max(...Object.values(dailyExpenses[date])),
                    backgroundColor: getRandomColor(),
                  },
                ]}
              />
              <Text
                onPress={() =>
                  handleDayClick({ date, expenses: dailyExpenses[date] })
                }
                style={styles.barText}
              >
                {date.split("-")[2]}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
