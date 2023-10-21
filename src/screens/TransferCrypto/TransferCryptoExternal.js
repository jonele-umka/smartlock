// import React, { useState, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   ActivityIndicator,
//   Platform,
// } from "react-native";
// import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";
// // import RNPickerSelect from "react-native-picker-select";
// import Toast from "react-native-toast-message";
// import { useSelector } from "react-redux";
// import SelectDropdown from "react-native-select-dropdown";

// export const TransferCryptoExternal = () => {
//   const {
//     control,
//     handleSubmit,
//     getValues,
//     setValue,
//     formState: { errors },
//   } = useForm();
//   const { navigate } = useNavigation();

//   const [data, setData] = useState([]);
//   const [sum, setSum] = useState("");
//   const [receiver_requisites, setReceiver_requisites] = useState("");
//   const [wallet, setWallet] = useState([]);
//   const [selectedType, setSelectedType] = useState("По номеру телефона");
//   const [loading, setLoading] = useState(false);
//   const [commission, setCommission] = useState(null);
//   const [currencyCode, setCurrencyCode] = useState(null);
//   const [error, setError] = useState(null);

//   const token = useSelector((state) => state.signIn.token);

//   // selectedtype
//   const handleTypeChange = (value) => {
//     setSelectedType(value);
//     setValue("phone_number", "");
//     setValue("receiver_requisites", "");
//     setValue("address", "");
//     setValue("sum", "");
//   };

//   // defaultValue type transfer
//   useEffect(() => {
//     handleTypeChange("По номеру телефона");
//   }, []);

//   // loadWallet
//   useEffect(() => {
//     fetch("http://coffee.microret.com:8088/wallets/balance", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           return response.json().then((data) => {
//             const errorMessage = data?.Error || "Произошла ошибка";
//             throw new Error(errorMessage);
//           });
//         }
//         return response.json();
//       })
//       .then((data) => {
//         const currencyData = data?.data.map((item) => ({
//           label: `${item.WalletSubAccount.Currency.CurrencyCode} - ${item.WalletSubAccount.AccountNumber}`,
//           value: item.WalletSubAccount.AccountNumber,
//         }));

//         setData(data);
//         setWallet(currencyData);
//       })
//       .catch((error) => {
//         Toast.show({
//           type: "error",
//           position: "top",
//           text1: "Ошибка",
//           text2: error.message,
//           visibilityTime: 3000,
//           autoHide: true,
//           topOffset: 30,
//         });
//       });
//   }, [token]);

//   // currecy code
//   const handleWalletChange = (value) => {
//     const selectedCurrency = data?.data.find(
//       (item) => item.WalletSubAccount.AccountNumber === value
//     );
//     const currencyCode =
//       selectedCurrency?.WalletSubAccount.Currency.CurrencyCode || null;
//     setCurrencyCode(currencyCode);
//   };
//   // commission
//   let timeout;
//   const handleSumChange = () => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       const values = getValues();
//       const { translationType, sender_requisites, receiver_requisites, sum } =
//         values;

//       setSum(sum);
//       setReceiver_requisites(receiver_requisites);

//       if (translationType === "По номеру счета" && sum !== "") {
//         fetch(
//           `http://coffee.microret.com:8088/wallets/preliminary-calculation-transfer/${sender_requisites}/${receiver_requisites}/${sum}/`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         )
//           .then((response) => {
//             if (!response.ok) {
//               return response.json().then((data) => {
//                 const errorMessage = data?.error?.Error || "Произошла ошибка";
//                 throw new Error(errorMessage);
//               });
//             }
//             return response.json();
//           })
//           .then((result) => {
            

//             JSON.stringify(result);
//             setCommission(result.data);
//           })
//           .catch((error) => {
//             setError(error.message);
//             Toast.show({
//               type: "error",
//               position: "top",
//               text1: "Ошибка",
//               text2: error.message,
//               visibilityTime: 3000,
//               autoHide: true,
//               topOffset: 30,
//             });
//           });
//       } else {
//         setCommission(null);
//       }
//     }, 1000);
//   };
//   // transfer
//   const handleTransfer = () => {
//     const values = getValues();
//     const {
//       translationType,
//       sender_requisites,
//       phone_number,
//       receiver_requisites,
//       address,
//       sum,
//     } = values;

//     if (translationType === "По номеру телефона") {
//       const selectedCurrency = data?.data.find(
//         (item) => item.WalletSubAccount.AccountNumber === sender_requisites
//       );

//       const currencyId = selectedCurrency
//         ? selectedCurrency.WalletSubAccount.Currency.ID
//         : null;

//       fetch(
//         `http://coffee.microret.com:8088/wallets/check-requisites-by-phone/${phone_number}/${currencyId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//         .then((response) => {
//           setLoading(true);
//           if (!response.ok) {
//             return response.json().then((data) => {
//               const errorMessage = data?.error.Error || "Произошла ошибка";
//               throw new Error(errorMessage);
//             });
//           }
//           return response.json();
//         })
//         .then((result) => {
//           if (result) {
//             fetch(
//               `http://coffee.microret.com:8088/wallets/transfer-by-phone/${sender_requisites}/${phone_number}/${sum}/`,
//               {
//                 method: "PATCH",
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             )
//               .then((response) => {
//                 if (!response.ok) {
//                   return response.json().then((data) => {
//                     const errorMessage =
//                       data?.error.Error || "Произошла ошибка";
//                     throw new Error(errorMessage);
//                   });
//                 }
//                 setLoading(false);
//                 navigate("SuccessTransfer", {
//                   amount: sum,
//                   currencyCode: currencyCode,
//                   requisites: phone_number,
//                 });
//               })
//               .catch((error) => {
//                 setError(error.message);

//                 Toast.show({
//                   type: "error",
//                   position: "top",
//                   text1: "Ошибка",
//                   text2: error.message,
//                   visibilityTime: 3000,
//                   autoHide: true,
//                   topOffset: 30,
//                 });
//                 // console.error("Ошибка при выполнении перевода:", error);
//                 setLoading(false);
//               });
//           } else {
//             Toast.show({
//               type: "error",
//               position: "top",
//               text1: "Ошибка",
//               text2: "Ошибка при проверке реквизитов по номеру телефона",
//               visibilityTime: 3000,
//               autoHide: true,
//               topOffset: 30,
//             });
//             // console.error("Ошибка при проверке реквизитов по номеру телефона");
//             setLoading(false);
//           }
//         })
//         .catch((error) => {
//           setError(error.message);

//           Toast.show({
//             type: "error",
//             position: "top",
//             text1: "Ошибка",
//             text2: error.message,
//             visibilityTime: 3000,
//             autoHide: true,
//             topOffset: 30,
//           });
//           // console.error(
//           //   "Ошибка при проверке реквизитов по номеру телефона:",
//           //   error
//           // );
//           setLoading(false);
//         });
//     } else if (translationType === "По номеру счета") {
//       fetch(
//         `http://coffee.microret.com:8088/wallets/check-requisites/${receiver_requisites}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//         .then((response) => {
//           setLoading(true);
//           if (!response.ok) {
//             return response.json().then((data) => {
//               const errorMessage = data?.error?.Error || "Произошла ошибка";
//               throw new Error(errorMessage);
//             });
//           }
//           return response.json();
//         })
//         .then((result) => {
//           if (result) {
//             fetch(
//               `http://coffee.microret.com:8088/wallets/transfer/${sender_requisites}/${receiver_requisites}/${sum}/`,
//               {
//                 method: "PATCH",
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             )
//               .then((response) => {
//                 if (!response.ok) {
//                   return response.json().then((data) => {
//                     const errorMessage =
//                       data?.error?.Error || "Произошла ошибка";
//                     throw new Error(errorMessage);
//                   });
//                 }
//                 setLoading(false);
//                 navigate("SuccessTransfer", {
//                   amount: sum,
//                   currencyCode: currencyCode,
//                   requisites: receiver_requisites,
//                 });
//               })
//               .catch((error) => {
//                 setError(error.message);

//                 Toast.show({
//                   type: "error",
//                   position: "top",
//                   text1: "Ошибка",
//                   text2: error.message,
//                   visibilityTime: 3000,
//                   autoHide: true,
//                   topOffset: 30,
//                 });
//                 setLoading(false);

//                 // console.error("Ошибка при выполнении перевода:", error);
//               });
//           } else {
//             Toast.show({
//               type: "error",
//               position: "top",
//               text1: "Ошибка",
//               text2: "Ошибка при проверке реквизитов",
//               visibilityTime: 3000,
//               autoHide: true,
//               topOffset: 30,
//             });
//             setLoading(false);

//             // console.error("Ошибка при проверке реквизитов");
//           }
//         })
//         .catch((error) => {
//           setError(error.message);

//           Toast.show({
//             type: "error",
//             position: "top",
//             text1: "Ошибка",
//             text2: error.message,
//             visibilityTime: 3000,
//             autoHide: true,
//             topOffset: 30,
//           });
//           setLoading(false);
//         });
//     } else if (translationType === "По адресу кошелька") {
//       const selectedCurrency = data?.data.find(
//         (item) => item.WalletSubAccount.AccountNumber === sender_requisites
//       );

//       const currencyId = selectedCurrency
//         ? selectedCurrency.WalletSubAccount.Currency.ID
//         : null;

//       fetch(
//         `http://coffee.microret.com:8088/wallets/check-requisites-by-address-out/${address}/${currencyId}/`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//         .then((response) => {
//           setLoading(true);
//           if (!response.ok) {
//             return response.json().then((data) => {
//               const errorMessage = data?.error?.Error || "Произошла ошибка";
//               throw new Error(errorMessage);
//             });
//           }
//           return response.json();
//         })
//         .then((result) => {
//           if (result) {
//             fetch(
//               `http://coffee.microret.com:8088/wallets/external-transfer-by-address/${sender_requisites}/${address}/${sum}/`,
//               {
//                 method: "PATCH",
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             )
//               .then((response) => {
//                 if (!response.ok) {
//                   return response.json().then((data) => {
//                     const errorMessage =
//                       data?.error?.Error || "Произошла ошибка";
//                     throw new Error(errorMessage);
//                   });
//                 }
//                 setLoading(false);
//                 navigate("SuccessTransfer", {
//                   amount: sum,
//                   currencyCode: currencyCode,
//                   requisites: address,
//                 });
//               })
//               .catch((error) => {
//                 setError(error.message);
//                 Toast.show({
//                   type: "error",
//                   position: "top",
//                   text1: "Ошибка",
//                   text2: error.message,
//                   visibilityTime: 3000,
//                   autoHide: true,
//                   topOffset: 30,
//                 });
//                 setLoading(false);

//                 // console.error("Ошибка при выполнении перевода:", error);
//               });
//           } else {
//             Toast.show({
//               type: "error",
//               position: "top",
//               text1: "Ошибка",
//               text2: "Ошибка при проверке реквизитов по адресу",
//               visibilityTime: 3000,
//               autoHide: true,
//               topOffset: 30,
//             });
//             setLoading(false);
//           }
//         })
//         .catch((error) => {
//           setError(error.message);

//           Toast.show({
//             type: "error",
//             position: "top",
//             text1: "Ошибка",
//             text2: error.message,
//             visibilityTime: 3000,
//             autoHide: true,
//             topOffset: 30,
//           });
//           setLoading(false);
//         });
//     }
//   };
//   const SafeAreaWrapper =
//     Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;

//   return (
//     <SafeAreaWrapper
//       style={{
//         flex: 1,
//         paddingHorizontal: 20,
//         backgroundColor: "#fff",
//       }}
//     >
//       <View style={{ padding: Platform.OS === "android" ? 0 : 20 }}>
//         <View
//           style={{
//             marginBottom: 25,
//           }}
//         >
//           <Text style={{ marginBottom: 5, color: "grey" }}>Тип перевода</Text>

//           <Controller
//             control={control}
//             name="translationType"
//             rules={{ required: true }}
//             defaultValue="По номеру телефона"
//             render={({ field }) => (
//               <SelectDropdown
//                 data={[
//                   "По номеру телефона",
//                   "По номеру счета",
//                   "По адресу кошелька",
//                 ]}
//                 onSelect={(selectedItem, index) => {
//                   handleTypeChange(selectedItem);
//                   field.onChange(selectedItem);
//                 }}
//                 defaultValue="По номеру телефона"
//                 buttonTextAfterSelection={(selectedItem, index) => {
//                   return selectedItem;
//                 }}
//                 rowTextForSelection={(item, index) => {
//                   return item;
//                 }}
//                 buttonStyle={{ width: "100%" }}
//               />
//               // <RNPickerSelect
//               //   style={{
//               //     inputAndroid: {
//               //       backgroundColor: "#f3f3f3",
//               //       borderRadius: 98,
//               //     },
//               //   }}
//               //   placeholder={{
//               //     label: "Тип перевода",
//               //   }}
//               //   onValueChange={(value) => {
//               //     handleTypeChange(value);
//               //     field.onChange(value);
//               //   }}
//               //   items={[
//               //     {
//               //       label: "По номеру телефона",
//               //       value: "По номеру телефона",
//               //     },
//               //     { label: "По номеру счета", value: "По номеру счета" },
//               //     {
//               //       label: "По адресу кошелька",
//               //       value: "По адресу кошелька",
//               //     },
//               //   ]}
//               //   value={field.value}
//               // />
//             )}
//           />

//           {errors.translationType && (
//             <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
//               Выберите тип перевода
//             </Text>
//           )}
//         </View>
//         <View style={{ marginBottom: 25 }}>
//           <Text style={{ marginBottom: 5, color: "grey" }}>
//             Выберите кошелёк
//           </Text>
//           <Controller
//             control={control}
//             name="sender_requisites"
//             rules={{ required: true }}
//             render={({ field }) => (
//               <SelectDropdown
//                 data={wallet}
//                 onSelect={(selectedItem) => {
//                   field.onChange(selectedItem.value);
//                   handleWalletChange(selectedItem.value);
//                 }}
//                 buttonTextAfterSelection={(selectedItem) => {
//                   return selectedItem.label;
//                 }}
//                 rowTextForSelection={(item) => {
//                   return item.label;
//                 }}
//                 buttonStyle={{
//                   backgroundColor: "#f3f3f3",
//                   width: "100%",
//                 }}
//                 defaultButtonText="Не выбрано"
//               />

//               // <RNPickerSelect
//               //   style={{
//               //     inputAndroid: {
//               //       backgroundColor: "#f3f3f3",
//               //     },
//               //   }}
//               //   placeholder={{
//               //     label: "Не выбрано",
//               //   }}
//               //   onValueChange={(value) => {
//               //     field.onChange(value);
//               //     handleWalletChange(value);
//               //   }}
//               //   items={wallet}
//               // />
//             )}
//           />
//           {errors.sender_requisites && (
//             <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
//               Выберите тип валюты
//             </Text>
//           )}
//         </View>
//         {selectedType === "По номеру телефона" && (
//           <View style={{ marginBottom: 25 }}>
//             <Text style={{ marginBottom: 10, color: "grey" }}>
//               Номер телефона
//             </Text>
//             <Controller
//               control={control}
//               name="phone_number"
//               defaultValue=""
//               rules={{ required: true }}
//               render={({ field }) => (
//                 <TextInput
//                   placeholder="996"
//                   onChangeText={(value) => {
//                     field.onChange(value);
//                     setError(null);
//                   }}
//                   value={field.value}
//                   keyboardType="numeric"
//                   style={{
//                     fontSize: 16,
//                     height: 50,
//                     paddingHorizontal: 10,
//                     backgroundColor: "#f3f3f3",
//                     borderWidth:
//                       errors.phone_number || error === "record not found"
//                         ? 1
//                         : 0,
//                     borderColor:
//                       errors.phone_number || error === "record not found"
//                         ? "red"
//                         : "#f3f3f3",
//                   }}
//                 />
//               )}
//             />
//             {errors.phone_number && (
//               <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
//                 Заполните это поле
//               </Text>
//             )}
//             {error === "record not found" && error && (
//               <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
//                 Абонент не найден
//               </Text>
//             )}
//           </View>
//         )}
//         {selectedType === "По номеру счета" && (
//           <View style={{ marginBottom: 25 }}>
//             <Text style={{ marginBottom: 10, color: "grey" }}>
//               Реквизиты получателя
//             </Text>
//             <Controller
//               control={control}
//               name="receiver_requisites"
//               rules={{ required: true }}
//               render={({ field }) => (
//                 <TextInput
//                   placeholder="XXXXXXXXXXXXXXXX"
//                   onChangeText={(value) => {
//                     field.onChange(value);
//                     handleSumChange();
//                     setError(null);
//                   }}
//                   value={field.value}
//                   keyboardType="numeric"
//                   style={{
//                     fontSize: 16,
//                     height: 50,
//                     paddingHorizontal: 10,
//                     backgroundColor: "#f3f3f3",
//                     borderWidth:
//                       errors.receiver_requisites || error === "record not found"
//                         ? 1
//                         : 0,
//                     borderColor:
//                       errors.receiver_requisites || error === "record not found"
//                         ? "red"
//                         : "#f3f3f3",
//                   }}
//                 />
//               )}
//             />
//             {errors.receiver_requisites && (
//               <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
//                 Заполните это поле
//               </Text>
//             )}
//             {error === "record not found" && error && (
//               <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
//                 Абонент не найден
//               </Text>
//             )}
//           </View>
//         )}
//         {selectedType === "По адресу кошелька" && (
//           <View style={{ marginBottom: 25 }}>
//             <Text style={{ marginBottom: 10, color: "grey" }}>
//               Адрес получателя
//             </Text>
//             <Controller
//               control={control}
//               name="address"
//               rules={{ required: true }}
//               render={({ field }) => (
//                 <TextInput
//                   placeholder="XXXXXXXXXXXXXXXXXXXXX"
//                   onChangeText={(value) => {
//                     field.onChange(value);
//                     setError(null);
//                   }}
//                   value={field.value}
//                   style={{
//                     fontSize: 16,
//                     height: 50,
//                     paddingHorizontal: 10,
//                     backgroundColor: "#f3f3f3",
//                     borderWidth:
//                       errors.address || error === "record not found" ? 1 : 0,
//                     borderColor:
//                       errors.address || error === "record not found"
//                         ? "red"
//                         : "#f3f3f3",
//                   }}
//                 />
//               )}
//             />
//             {errors.address && (
//               <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
//                 Заполните это поле
//               </Text>
//             )}
//             {error === "record not found" && error && (
//               <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
//                 Абонент не найден
//               </Text>
//             )}
//           </View>
//         )}
//         <View style={{ marginBottom: 25 }}>
//           <Text style={{ marginBottom: 10, color: "grey" }}>Сумма</Text>
//           <Controller
//             control={control}
//             name="sum"
//             rules={{ required: true }}
//             render={({ field }) => (
//               <TextInput
//                 placeholder="0"
//                 value={field.value}
//                 onChangeText={(value) => {
//                   field.onChange(value);
//                   handleSumChange();
//                   setError(null);
//                 }}
//                 keyboardType="numeric"
//                 style={{
//                   fontSize: 16,
//                   height: 50,
//                   paddingHorizontal: 10,
//                   backgroundColor: "#f3f3f3",
//                   borderWidth:
//                     errors.sum ||
//                     error ===
//                       "исключение:Денег на Вашем электронном кошельке не достаточно для совершения данного платежа, id=<no value>"
//                       ? 1
//                       : 0,
//                   borderColor:
//                     errors.sum ||
//                     error ===
//                       "исключение:Денег на Вашем электронном кошельке не достаточно для совершения данного платежа, id=<no value>"
//                       ? "red"
//                       : "#f3f3f3",
//                 }}
//               />
//             )}
//           />
//           {errors.sum && (
//             <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
//               {error}
//             </Text>
//           )}
//           {error ===
//             "исключение:Денег на Вашем электронном кошельке не достаточно для совершения данного платежа, id=<no value>" &&
//             error && (
//               <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
//                 Недостаточно средств
//               </Text>
//             )}
//         </View>
//         {selectedType === "По номеру счета" && (
//           <Text>
//             Комиссия:{" "}
//             {commission !== null &&
//               sum !== "" &&
//               receiver_requisites !== "" && (
//                 <Text>
//                   {commission} {currencyCode}
//                 </Text>
//               )}
//           </Text>
//         )}

//         {loading ? (
//           <ActivityIndicator
//             size="large"
//             style={{ marginTop: 30 }}
//             color={"#0268EC"}
//           />
//         ) : (
//           <TouchableOpacity
//             style={{
//               padding: 15,
//               backgroundColor: "#0268EC",
//               marginTop: 30,
//               shadowColor: "#0268EC",
//               shadowOffset: {
//                 width: 0,
//                 height: 10,
//               },
//               shadowOpacity: 0.3,
//               shadowRadius: 10,
//             }}
//             onPress={handleSubmit(handleTransfer)}
//           >
//             <Text
//               style={{
//                 textAlign: "center",
//                 color: "#fff",
//                 fontSize: 16,
//               }}
//             >
//               Отправить
//             </Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </SafeAreaWrapper>
//   );
// };
