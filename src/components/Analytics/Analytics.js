import { Skeleton } from "@rneui/base";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

const Analytics = ({ transactions, loading }) => {
  const [dailyExpenses, setDailyExpenses] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const currentDate = new Date();
    currentDate.setDate(1); // Устанавливаем текущую дату на 1 число текущего месяца
    const startDate = currentDate.toISOString().split("T")[0]; // Первое число текущего месяца

    currentDate.setMonth(currentDate.getMonth() + 1); // Переходим на первое число следующего месяца
    currentDate.setDate(1);
    const endDate = currentDate.toISOString().split("T")[0]; // Первое число следующего месяца

    setStartDate(startDate);
    setEndDate(endDate);

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
  const handleDayClick = (day, totalAmount) => {
    // Здесь вы можете выполнить необходимые действия при выборе дня
    console.log(`Выбран день: ${day}, Расход за день: ${totalAmount}`);
    setSelectedDay({ date: day, expenses: { totalAmount } });
  };
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const year = date.getFullYear();
  //   return `${day}.${month}.${year}`;
  // };

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
        {totalAmount ? totalAmount : "Нет расходов в этом месяце"}
      </Text>
      {selectedDay && (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            columnGap: 10,
            rowGap: 10,
            marginVertical: 10,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, marginBottom: 5 }}>
            {selectedDay ? `Расход за ${selectedDay.date}` : null}
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
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          horizontal={true}
        >
          <View style={styles.chart}>
            {Object.keys(dailyExpenses).map((date, index) => (
              <View key={date}>
                <View
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

// useEffect(() => {
//   const currentDate = new Date();
//   currentDate.setDate(1); // Устанавливаем текущую дату на 1 число текущего месяца
//   const startDate = currentDate.toISOString().split("T")[0]; // Первое число текущего месяца

//   currentDate.setMonth(currentDate.getMonth() + 1); // Переходим на первое число следующего месяца
//   currentDate.setDate(1);
//   const endDate = currentDate.toISOString().split("T")[0]; // Первое число следующего месяца

//   setStartDate(startDate);
//   setEndDate(endDate);

//   const groupedExpenses = transactions.reduce((result, transaction) => {
//     const date = transaction.CreatedAt.split("T")[0];
//     const amount = parseFloat(transaction.SumSender);

//     if (!result[date]) {
//       result[date] = 0;
//     }

//     result[date] += amount;

//     return result;
//   }, {});

//   // Заполняем все дни текущего месяца нулевыми значениями, если в них не было расходов
//   let currentDatePointer = new Date(startDate);
//   while (currentDatePointer.toISOString().split("T")[0] !== endDate) {
//     const date = currentDatePointer.toISOString().split("T")[0];
//     if (!groupedExpenses[date]) {
//       groupedExpenses[date] = 0;
//     }
//     currentDatePointer.setDate(currentDatePointer.getDate() + 1);
//   }

//   setDailyExpenses(groupedExpenses);
// }, [transactions]);

// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet } from "react-native";

// const Analytics = ({ transactions }) => {
//   const [dailyExpenses, setDailyExpenses] = useState({});
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   useEffect(() => {
//     let currentDate = new Date();
//     currentDate.setDate(1); // Устанавливаем текущую дату на 1 число текущего месяца
//     const startDate = currentDate.toISOString().split("T")[0]; // Первое число текущего месяца

//     currentDate.setMonth(currentDate.getMonth() + 1); // Переходим на первое число следующего месяца
//     currentDate.setDate(1);
//     const endDate = currentDate.toISOString().split("T")[0]; // Первое число следующего месяца

//     setStartDate(startDate);
//     setEndDate(endDate);

//     const groupedExpenses = transactions.reduce((result, transaction) => {
//       const date = transaction.CreatedAt.split("T")[0];
//       const amount = parseFloat(transaction.SumSender);

//       if (date >= startDate && date < endDate) {
//         if (!result[date]) {
//           result[date] = 0;
//         }

//         result[date] += amount;
//       }

//       return result;
//     }, {});

//     setDailyExpenses(groupedExpenses);
//   }, [transactions]);

//   const maxExpense = Math.max(...Object.values(dailyExpenses));
//   const minExpense = Math.min(...Object.values(dailyExpenses));

//   const getRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         Расходы с {startDate} по {endDate}
//       </Text>
//       <View style={styles.chart}>
//         {Object.keys(dailyExpenses).map((date) => (
//           <View
//             key={date}
//             style={[
//               styles.bar,
//               {
//                 height: dailyExpenses[date]
//                   ? (dailyExpenses[date] / maxExpense) * 200
//                   : 20, // Минимальная высота
//                 backgroundColor: dailyExpenses[date]
//                   ? getRandomColor()
//                   : "transparent",
//               },
//             ]}
//           >
//             {dailyExpenses[date] && (
//               <Text style={styles.barText}>{date.split("-")[2]}</Text>
//             )}
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#f0f0f0",
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginVertical: 10,
//   },
//   chart: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     height: 200,
//     paddingHorizontal: 10,
//   },
//   bar: {
//     flex: 1,
//     marginHorizontal: 1,
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   barText: {
//     color: "white",
//   },
// });

// export default Analytics;
