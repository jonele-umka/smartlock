// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   ActivityIndicator,
//   SafeAreaView,
// } from "react-native";
// import { useRoute } from "@react-navigation/native";
// import { Skeleton } from "@rneui/base";
// import { LinearGradient } from "expo-linear-gradient";
// import i18n from "../i18n/i18n";
// import * as Localization from "expo-localization";
// const AnalyticsPage = () => {
//   const route = useRoute();
//   const { transactions, loading } = route.params;

//   const [monthlyExpenses, setMonthlyExpenses] = useState([]);
//   const [selectedDay, setSelectedDay] = useState(null);
//   useEffect(() => {
//     const groupedExpenses = transactions.reduce((result, transaction) => {
//       const date = transaction.CreatedAt.split("T")[0];
//       const amount = parseFloat(transaction.SumSender);
//       const status = transaction.Status;
//       const [year, month] = date.split("-");
//       const monthKey = `${year}-${month}`;

//       if (status === "Completed") {
//         if (!result[monthKey]) {
//           result[monthKey] = {
//             startDate: `${year}-${month}-01`,
//             endDate: new Date(year, month, 0).toISOString().split("T")[0],
//             days: {},
//             totalAmount: 0,
//           };
//         }

//         if (!result[monthKey].days[date]) {
//           result[monthKey].days[date] = {
//             totalAmount: 0,
//             transactions: [],
//           };
//         }

//         result[monthKey].days[date].totalAmount += amount;
//         result[monthKey].days[date].transactions.push(transaction);
//         result[monthKey].totalAmount += amount;
//       }
//       return result;
//     }, {});

//     const monthlyExpenses = Object.entries(groupedExpenses).map(
//       ([key, value]) => ({
//         month: key,
//         startDate: value.startDate,
//         endDate: value.endDate,
//         days: value.days,
//         totalAmount: value.totalAmount,
//       })
//     );

//     setMonthlyExpenses(monthlyExpenses);
//   }, [transactions]);
//   const maxExpense = Math.max(
//     ...monthlyExpenses.map(
//       (expense) =>
//         Math.max(
//           ...Object.values(expense.days).map((day) => day.totalAmount || 0)
//         ) || 0
//     )
//   );

//   const minExpense = Math.min(
//     ...monthlyExpenses.map(
//       (expense) =>
//         Math.min(
//           ...Object.values(expense.days).map((day) => day.totalAmount || 0)
//         ) || 0
//     )
//   );

//   const getRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   if (loading) {
//     return (
//       <ActivityIndicator
//         size="large"
//         style={{ marginTop: 30 }}
//         color={"#fff"}
//       />
//     );
//   }

//   if (!transactions.length) {
//     return (
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "flex-end",
//           justifyContent: "center",
//           columnGap: 10,
//           marginVertical: 30,
//         }}
//       >
//         <Skeleton
//           animation="pulse"
//           style={{
//             width: 20,
//             height: 60,
//             backgroundColor: "#333",
//             borderRadius: 5,
//           }}
//         />
//         <Skeleton
//           animation="pulse"
//           style={{
//             width: 20,
//             height: 150,
//             backgroundColor: "#333",
//             borderRadius: 5,
//           }}
//         />
//         <Skeleton
//           animation="pulse"
//           style={{
//             width: 20,
//             height: 40,
//             backgroundColor: "#333",
//             borderRadius: 5,
//           }}
//         />
//         <Skeleton
//           animation="pulse"
//           style={{
//             width: 20,
//             height: 50,
//             backgroundColor: "#333",
//             borderRadius: 5,
//           }}
//         />
//         <Skeleton
//           animation="pulse"
//           style={{
//             width: 20,
//             height: 20,
//             backgroundColor: "#333",
//             borderRadius: 5,
//           }}
//         />
//       </View>
//     );
//   }

//   if (Object.keys(monthlyExpenses).length === 0) {
//     return (
//       <View>
//         <Text
//           style={{
//             fontSize: 18,
//             color: "#fff",
//             textAlign: "left",
//             marginBottom: 20,
//           }}
//         >
//           {i18n.t("noCostData")}
//         </Text>
//       </View>
//     );
//   }
//   const handleDayClick = (day) => {
//     setSelectedDay(day);
//     const selectedExpenses = monthlyExpenses.find(
//       (expense) => expense.days[day]
//     );
//     setSelectedDay(
//       selectedExpenses
//         ? { date: day, expenses: selectedExpenses.days[day] }
//         : null
//     );
//   };

//   return (
//     <LinearGradient
//       style={{ flex: 1 }}
//       start={{ x: 2.4, y: 1.1 }}
//       end={{ x: 0, y: 0 }}
//       colors={["#241270", "#140A4F", "#000"]}
//     >
//       <SafeAreaView style={{ flex: 1 }}>
//         <Text
//           style={{
//             color: "#fff",
//             paddingHorizontal: 10,
//             paddingTop: 20,
//             fontSize: 25,
//             textAlign: "center",
//           }}
//         >
//           {i18n.t("allExpenses")}
//         </Text>

//         {selectedDay && (
//           <View
//             style={{
//               paddingVertical: 20,
//               paddingHorizontal: 10,
//               flex: 1,
//               alignItems: "center",
//             }}
//           >
//             <Text style={{ color: "#fff", fontSize: 16, marginBottom: 5 }}>
//               {selectedDay
//                 ? `${i18n.t("expenseFor")} ${selectedDay.date}`
//                 : null}
//             </Text>
//             <Text style={{ color: "#fff", fontSize: 16 }}>
//               {selectedDay ? `${selectedDay.expenses.totalAmount}` : null}
//             </Text>
//           </View>
//         )}
//         <ScrollView
//           contentContainerStyle={{
//             flexGrow: 1,
//             paddingHorizontal: 10,
//             paddingTop: 20,
//             paddingBottom: 20,
//           }}
//           horizontal={true}
//         >
//           <View style={{ flexDirection: "row", columnGap: 100 }}>
//             {monthlyExpenses.map((expense, index) => (
//               <View
//                 style={{
//                   // width: "100%",
//                   // flexDirection: "column",
//                   justifyContent: "space-between",
//                 }}
//                 key={index}
//               >
//                 <View>
//                   <Text
//                     style={{
//                       fontSize: 16,
//                       color: "#fff",
//                       marginBottom: 5,
//                     }}
//                   >
//                     {i18n.t("for")}{" "}
//                     {new Date(expense.startDate).toLocaleString(
//                       Localization.locale,
//                       {
//                         month: "long",
//                         year: "numeric",
//                       }
//                     )}
//                   </Text>
//                   <Text
//                     style={{ color: "#fff", fontSize: 20, fontWeight: 500 }}
//                   >
//                     {expense.totalAmount}
//                   </Text>
//                 </View>
//                 <View
//                   style={{
//                     flexDirection: "row-reverse",
//                     alignItems: "flex-end",
//                     justifyContent: "flex-end",
//                   }}
//                 >
//                   {Object.keys(expense.days).map((day, index) => (
//                     <View style={{ flexDirection: "column" }} key={index}>
//                       <View
//                         style={{
//                           width: 20,
//                           marginHorizontal: 2,
//                           borderRadius: 5,
//                           height:
//                             (expense.days[day].totalAmount / maxExpense) * 450,
//                           backgroundColor: getRandomColor(),
//                         }}
//                       ></View>
//                       <Text
//                         onPress={() => handleDayClick(day)}
//                         style={{
//                           paddingTop: 10,
//                           color: "#fff",
//                           fontSize: 12,
//                           textAlign: "center",
//                         }}
//                       >
//                         {day.split("-")[2]}
//                       </Text>
//                     </View>
//                   ))}
//                 </View>
//               </View>
//             ))}
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// export default AnalyticsPage;
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const AnalyticsPage = () => {
  const route = useRoute();
  const { transactions, loading } = route.params;
  const [selectedDays, setSelectedDays] = useState({});
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);

  useEffect(() => {
    const groupedExpenses = transactions.reduce((result, transaction) => {
      const date = transaction.CreatedAt.split("T")[0];
      const amount =
        parseFloat(transaction.SumSender) +
        parseFloat(transaction.CommissionSum);
      const status = transaction.Status;
      const currencyCode = transaction.CurrencySender.CurrencyCode;
      const [year, month] = date.split("-");
      const monthKey = `${year}-${month}`;

      if (status === "Completed") {
        if (!result[monthKey]) {
          result[monthKey] = {
            startDate: `${year}-${month}-01`,
            endDate: new Date(year, month, 0).toISOString().split("T")[0],
            days: {},
            totalAmount: 0,
            currencies: {},
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

        if (!result[monthKey].currencies[currencyCode]) {
          result[monthKey].currencies[currencyCode] = 0;
        }

        result[monthKey].currencies[currencyCode] += amount;
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
        currencies: value.currencies,
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

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleDayClick = (day, month) => {
    setSelectedDays((prevSelectedDays) => {
      const selectedExpenses = monthlyExpenses.find(
        (expense) => expense.days[day]
      );

      return {
        ...prevSelectedDays,
        [month]: selectedExpenses
          ? {
              date: day,
              expenses: selectedExpenses.days[day].transactions.reduce(
                (result, transaction) => {
                  const currencyCode = transaction.CurrencySender.CurrencyCode;
                  const amount =
                    parseFloat(transaction.SumSender) +
                    parseFloat(transaction.CommissionSum);

                  if (!result[currencyCode]) {
                    result[currencyCode] = 0;
                  }

                  result[currencyCode] += amount;

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
  const handleDayClick = (day) => {
    setSelectedDay(day);
    const selectedExpenses = monthlyExpenses.find(
      (expense) => expense.days[day]
    );
    setSelectedDay(
      selectedExpenses
        ? { date: day, expenses: selectedExpenses.days[day] }
        : null
    );
  };
  return (
    <LinearGradient
      style={{ flex: 1 }}
      start={{ x: 2.4, y: 1.1 }}
      end={{ x: 0, y: 0 }}
      colors={["#241270", "#140A4F", "#000"]}
    >
      <SafeAreaView style={{ flex: 1}}>
        <Text
          style={{
            color: "#fff",
            paddingHorizontal: 10,
            paddingTop: 10,
            fontSize: 25,
            textAlign: "center",
          }}
        >
          Все расходы
        </Text>

        {selectedDay && (
          <View style={{ paddingVertical: 20, paddingHorizontal: 10 , flex: 1, alignItems: 'center' }}>
            <Text style={{ color: "#fff", fontSize: 16, marginBottom: 5 }}>
              {selectedDay ? `Расход за ${selectedDay.date}` : null}
            </Text>
            <Text style={{ color: "#fff", fontSize: 16 }}>
              {selectedDay ? `${selectedDay.expenses.totalAmount}` : null}
            </Text>
          </View>
        )}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 10,
            paddingTop: 20,
            paddingBottom: 20,
          }}
          horizontal={true}
        >
          <View style={{ flexDirection: "row", columnGap: 100 }}>
            {monthlyExpenses.map((expense, index) => (
              <View
                style={{
                  justifyContent: "space-between",
                }}
                key={index}
              >
                {console.log(expense.totalAmount)}
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#fff",
                      marginBottom: 10,
                      textAlign: "center",
                      fontWeight: 500,
                    }}
                  >
                    За{" "}
                    {new Date(expense.startDate).toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </Text>
                  <View
                    style={{
                      flexDirection: "column",
                      rowGap: 10,
                    }}
                  >
                    {Object.keys(expense.currencies).map((currency) => (
                      <View key={currency}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{ color: "#fff", fontWeight: 500 }}
                          >{`${currency}: `}</Text>
                          <Text style={{ color: "#fff" }}>
                            {`${expense.currencies[currency]}`}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                  {selectedDays[expense.month] && (
                    <View style={{ marginTop: 20 }}>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 16,
                          marginBottom: 10,
                          fontWeight: 500,
                          textAlign: "center",
                        }}
                      >
                        {selectedDays[expense.month]
                          ? `${i18n.t("expenseFor")} ${
                              selectedDays[expense.month].date
                            }`
                          : null}
                      </Text>
                      {selectedDays[expense.month] && (
                        <View
                          style={{
                            flexDirection: "column",
                            rowGap: 10,
                          }}
                        >
                          {Object.keys(
                            selectedDays[expense.month].expenses
                          ).map((currency) => (
                            <View key={currency}>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <Text
                                  style={{ color: "#fff", fontWeight: 500 }}
                                >{`${currency}: `}</Text>
                                <Text style={{ color: "#fff" }}>
                                  {`${
                                    selectedDays[expense.month].expenses[
                                      currency
                                    ]
                                  }`}
                                </Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  )}
                </View>

                <View
                  style={{
                    flexDirection: "row-reverse",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  {Object.keys(expense.days).map((day, index) => {
                    const currentDayTotalAmount =
                      expense.days[day].totalAmount || 0;
                    const height =
                      selectedDays[expense.month] &&
                      selectedDays[expense.month].date === day
                        ? Math.min(
                            300,
                            (currentDayTotalAmount / maxExpense) * 300
                          )
                        : (currentDayTotalAmount / maxExpense) * 300;

                    return (
                      <View style={{ flexDirection: "column" }} key={index}>
                        <LinearGradient
                          style={{
                            width: 20,
                            marginHorizontal: 2,
                            borderRadius: 5,
                            height,
                          }}
                          colors={[getRandomColor(), getRandomColor()]}
                        />
                        <Text
                          onPress={() => handleDayClick(day, expense.month)}
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
                    );
                  })}
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
