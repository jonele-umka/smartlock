import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import card from "../../assets/card/cards.png";
import {
  Box,
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetItem,
} from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { API_URL } from "../../constants";
export const TransferCryptoInternal = () => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const { navigate } = useNavigation();

  const [data, setData] = useState([]);

  const [wallet, setWallet] = useState([]);
  const [selectedType, setSelectedType] = useState("По номеру телефона");
  const [addressType, setAddressType] = useState("Внутренний");
  const [loading, setLoading] = useState(false);

  const [currencyCode, setCurrencyCode] = useState(null);
  const [error, setError] = useState(null);
  const [sender_requisites, setSender_requisites] = useState(null);

  const token = useSelector((state) => state.signIn.token);

  // selectedtype
  const handleTypeChange = (value) => {
    setSelectedType(value);
    setValue("phone_number", "");
    setValue("receiver_requisites", "");
    setValue("address", "");
    setValue("sum", "");
  };
  // addresstype
  const handleTypeAddressChange = (value) => {
    setAddressType(value);
  };

  // // defaultValue type transfer
  // useEffect(() => {
  //   handleTypeChange("По номеру телефона");
  //   handleTypeAddressChange("Внутренний");
  // }, []);

  // loadWallet
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    RUB: "₽",
    KGS: "C",
    USDT: "₮",
    ETH: "Ξ",
    BTC: "₿",
  };
  useEffect(() => {
    fetch(`${API_URL}/wallets/balance`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            const errorMessage = data?.Error || "Произошла ошибка";
            throw new Error(errorMessage);
          });
        }
        return response.json();
      })
      .then((data) => {
        const currencyData = data?.data.map((item) => ({
          selectedWallet: (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <ImageBackground
                imageStyle={{ borderRadius: 5 }}
                source={card}
                style={{
                  width: 50,
                  height: 30,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  padding: 3,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 12 }}>
                  ... {item.WalletSubAccount.AccountNumber.slice(-4)}
                </Text>
              </ImageBackground>

              <View>
                <Text
                  style={{
                    color: "#fff",
                  }}
                >{`${item.WalletSubAccount.Balance} ${
                  currencySymbols[item.WalletSubAccount.Currency.CurrencyCode]
                }`}</Text>
              </View>
            </View>
          ),
          value: item.WalletSubAccount.AccountNumber,
        }));

        setData(data);
        setWallet(currencyData);
        setWallet(currencyData);
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Ошибка",
          text2: error.message,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
      });
  }, [token]);

  // currecy code
  const handleWalletChange = (value) => {
    const selectedCurrency = data?.data.find(
      (item) => item.WalletSubAccount.AccountNumber === value
    );
    const currencyCode =
      selectedCurrency?.WalletSubAccount.Currency.CurrencyCode || null;
    setCurrencyCode(currencyCode);
  };

  const searchUser = () => {
    const values = getValues();
    const {
      selectedType,
      sender_requisites,
      phone_number,
      receiver_requisites,
      address,
      sum,
    } = values;

    if (selectedType === "По номеру телефона") {
      const selectedCurrency = data?.data.find(
        (item) => item.WalletSubAccount.AccountNumber === sender_requisites
      );

      const currencyId = selectedCurrency
        ? selectedCurrency.WalletSubAccount.IdCurrency
        : null;

      const balance = selectedCurrency
        ? selectedCurrency.WalletSubAccount.Balance
        : null;
      const ID = selectedCurrency ? selectedCurrency.WalletSubAccount.ID : null;

      fetch(
        `${API_URL}/wallets/check-requisites-by-phone/${phone_number}/${currencyId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          setLoading(true);
          if (!response.ok) {
            return response.json().then((data) => {
              const errorMessage = data?.error?.Error || "Произошла ошибка";
              throw new Error(errorMessage);
            });
          }
          return response.json();
        })
        .then((result) => {
          const receiver_requisites = result?.data.AccountNumber;
          if (result) {
            fetch(
              `${API_URL}/wallets/preliminary-calculation-transfer/${sender_requisites}/${receiver_requisites}/${sum}/`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
              .then((response) => {
                if (!response.ok) {
                  return response.json().then((data) => {
                    const errorMessage =
                      data?.error?.Code || "Произошла ошибка";
                    console.log(errorMessage);
                    throw new Error(errorMessage);
                  });
                }
                return response.json();
              })
              .then((data) => {
                setLoading(false);
                navigate("Подтверждение перевода", {
                  phone_number: phone_number,
                  currencyCode: currencyCode,
                  sender_requisites: sender_requisites,
                  sum: sum,
                  selectedType: selectedType,
                  balance: balance,
                  commission: data.data,
                  id: ID,
                });
              })
              .catch((error) => {
                setError(error.message);

                Toast.show({
                  type: "error",
                  position: "top",
                  text1: "Ошибка",
                  text2: error.message,
                  visibilityTime: 3000,
                  autoHide: true,
                  topOffset: 30,
                });
                setLoading(false);
              });
          } else {
            Toast.show({
              type: "error",
              position: "top",
              text1: "Ошибка",
              text2: "Ошибка при проверке реквизитов",
              visibilityTime: 3000,
              autoHide: true,
              topOffset: 30,
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          setError(error.message);

          Toast.show({
            type: "error",
            position: "top",
            text1: "Ошибка",
            text2: error.message,
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 30,
          });
          setLoading(false);
        });
    } else if (selectedType === "По номеру счета") {
      const selectedCurrency = data?.data.find(
        (item) => item.WalletSubAccount.AccountNumber === sender_requisites
      );
      const ID = selectedCurrency ? selectedCurrency.WalletSubAccount.ID : null;

      const balance = selectedCurrency
        ? selectedCurrency.WalletSubAccount.Balance
        : null;
      fetch(`${API_URL}/wallets/check-requisites/${receiver_requisites}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setLoading(true);
          if (!response.ok) {
            return response.json().then((data) => {
              const errorMessage = data?.error?.Error || "Произошла ошибка";
              throw new Error(errorMessage);
            });
          }
          return response.json();
        })
        .then((result) => {
          if (result) {
            fetch(
              `${API_URL}/wallets/preliminary-calculation-transfer/${sender_requisites}/${receiver_requisites}/${sum}/`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
              .then((response) => {
                if (!response.ok) {
                  return response.json().then((data) => {
                    const errorMessage =
                      data?.error?.Code || "Произошла ошибка";
                    throw new Error(errorMessage);
                  });
                }
                return response.json();
              })
              .then((data) => {
                setLoading(false);
                navigate("Подтверждение перевода", {
                  nameUser: result.data,
                  receiver_requisites: receiver_requisites,
                  currencyCode: currencyCode,
                  sender_requisites: sender_requisites,
                  sum: sum,
                  commission: data.data,
                  selectedType: selectedType,
                  balance: balance,
                  id: ID,
                });
              })
              .catch((error) => {
                setError(error.message);

                Toast.show({
                  type: "error",
                  position: "top",
                  text1: "Ошибка",
                  text2: error.message,
                  visibilityTime: 3000,
                  autoHide: true,
                  topOffset: 30,
                });
                setLoading(false);
              });
          } else {
            Toast.show({
              type: "error",
              position: "top",
              text1: "Ошибка",
              text2: "Ошибка при проверке реквизитов",
              visibilityTime: 3000,
              autoHide: true,
              topOffset: 30,
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          setError(error.message);

          Toast.show({
            type: "error",
            position: "top",
            text1: "Ошибка",
            text2: error.message,
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 30,
          });
          setLoading(false);
        });
    } else if (selectedType === "По адресу кошелька") {
      const selectedCurrency = data?.data.find(
        (item) => item.WalletSubAccount.AccountNumber === sender_requisites
      );

      const currencyId = selectedCurrency
        ? selectedCurrency.WalletSubAccount.Currency.ID
        : null;

      const balance = selectedCurrency
        ? selectedCurrency.WalletSubAccount.Balance
        : null;
      const ID = selectedCurrency ? selectedCurrency.WalletSubAccount.ID : null;

      const apiUrl =
        addressType === "Внутренний"
          ? `${API_URL}/wallets/check-requisites-by-address-in/${address}`
          : `${API_URL}/wallets/check-requisites-by-address-out/${address}/${currencyId}`;

      fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setLoading(true);
          if (!response.ok) {
            return response.json().then((data) => {
              const errorMessage = data?.error?.Error || "Произошла ошибка";
              throw new Error(errorMessage);
            });
          }
          return response.json();
        })
        .then((result) => {
          console.log(result);
          if (result) {
            const apiComission =
              addressType === "Внутренний"
                ? `${API_URL}/wallets/preliminary-calculation-transfer/${sender_requisites}/${address}/${sum}/`
                : `${API_URL}/wallets/preliminary-calculation-external-transfer/${sender_requisites}/${address}/${sum}/`;

            fetch(apiComission, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response) => {
                if (!response.ok) {
                  return response.json().then((data) => {
                    const errorMessage =
                      data?.error?.Error || "Произошла ошибка";
                    console.log(errorMessage);
                    throw new Error(errorMessage);
                  });
                }
                return response.json();
              })
              .then((data) => {
                setLoading(false);
                navigate("Подтверждение перевода", {
                  address: address,
                  currencyCode: currencyCode,
                  sender_requisites: sender_requisites,
                  sum: sum,
                  selectedType: selectedType,
                  balance: balance,
                  commission: data.data,
                  addressType: addressType,
                  id: ID,
                });
              })
              .catch((error) => {
                setError(error.message);

                Toast.show({
                  type: "error",
                  position: "top",
                  text1: "Ошибка",
                  text2: error.message,
                  visibilityTime: 3000,
                  autoHide: true,
                  topOffset: 30,
                });
                setLoading(false);
              });
          } else {
            Toast.show({
              type: "error",
              position: "top",
              text1: "Ошибка",
              text2: "Ошибка при проверке реквизитов",
              visibilityTime: 3000,
              autoHide: true,
              topOffset: 30,
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          setError(error.message);

          Toast.show({
            type: "error",
            position: "top",
            text1: "Ошибка",
            text2: error.message,
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 30,
          });
          setLoading(false);
        });
    }
  };
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);
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
      <SafeAreaWrapper
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: Platform.OS === "android" ? 0 : 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              color: "#fff",
              marginBottom: 20,
            }}
          >
            Перевод {selectedType.toLowerCase()}
          </Text>
          <View
            style={{
              backgroundColor: "rgba(93, 0, 230, 0.2)",
              borderRadius: 10,
              borderBottomLeftRadius:
                selectedType === "По номеру телефона" ? 0 : 10,

              borderBottomRightRadius:
                selectedType === "По адресу кошелька" ? 0 : 10,
            }}
          >
            {/* <Text style={{ marginBottom: 5, color: "#fff" }}>Тип перевода</Text> */}

            <Controller
              control={control}
              name="selectedType"
              rules={{ required: true }}
              defaultValue="По номеру телефона"
              render={({ field }) => (
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      handleTypeChange("По номеру телефона");
                      field.onChange("По номеру телефона");
                    }}
                    style={[
                      styles.button,
                      selectedType === "По номеру телефона" &&
                        styles.activeButton,
                    ]}
                  >
                    <Text style={{ color: "#fff" }}>Телефон</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleTypeChange("По номеру счета");
                      field.onChange("По номеру счета");
                    }}
                    style={[
                      styles.button,
                      selectedType === "По номеру счета" && styles.activeButton,
                    ]}
                  >
                    <Text style={{ color: "#fff" }}>Реквизиты</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleTypeChange("По адресу кошелька");
                      field.onChange("По адресу кошелька");
                    }}
                    style={[
                      styles.button,
                      selectedType === "По адресу кошелька" &&
                        styles.activeButton,
                    ]}
                  >
                    <Text style={{ color: "#fff" }}>Кошелек</Text>
                  </TouchableOpacity>
                </View>
              )}
            />

            {errors.selectedType && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                Выберите тип перевода
              </Text>
            )}
          </View>

          <View style={{ marginTop: 25 }}>
            <Controller
              name="sender_requisites"
              control={control}
              rules={{ required: "Выберите валюту" }}
              render={({ field }) => (
                <View>
                  <TouchableOpacity
                    onPress={handleClose}
                    style={{
                      backgroundColor: "rgba(93, 0, 230, 0.2)",
                      justifyContent: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 20,
                      borderRadius: 10,
                    }}
                  >
                    <View>
                      {sender_requisites ? (
                        <View style={{ color: "#fff" }}>
                          {sender_requisites}
                        </View>
                      ) : (
                        <Text style={{ color: "#fff" }}>Выберите валюту</Text>
                      )}
                    </View>
                  </TouchableOpacity>

                  <Actionsheet
                    isOpen={showActionsheet}
                    onClose={handleClose}
                    zIndex={999}
                  >
                    <ActionsheetBackdrop />
                    <ActionsheetContent
                      backgroundColor={"#140A4F"}
                      paddingVertical={10}
                      zIndex={999}
                    >
                      <ActionsheetDragIndicatorWrapper marginBottom={10}>
                        <ActionsheetDragIndicator />
                      </ActionsheetDragIndicatorWrapper>

                      {wallet.map((item, index) => (
                        <ActionsheetItem
                          padding={15}
                          backgroundColor={"rgba(93, 0, 230, 0.2)"}
                          marginBottom={15}
                          borderRadius={10}
                          key={index}
                          onPress={() => {
                            handleClose();
                            field.onChange(item.value);
                            handleWalletChange(item.value);
                            setSender_requisites(item.selectedWallet);
                          }}
                        >
                          <Box width={"100%"}>{item.selectedWallet}</Box>
                        </ActionsheetItem>
                      ))}
                    </ActionsheetContent>
                  </Actionsheet>

                  {errors.sender_requisites && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                      {errors.sender_requisites.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          {selectedType === "По адресу кошелька" && (
            <View
              style={{
                backgroundColor: "rgba(93, 0, 230, 0.2)",
                borderRadius: 10,
                marginTop: 25,
                borderBottomLeftRadius: addressType === "Внутренний" ? 0 : 10,

                borderBottomRightRadius: addressType === "Внешний" ? 0 : 10,
              }}
            >
              <Controller
                control={control}
                name="addressType"
                rules={{ required: true }}
                defaultValue="Внутренний"
                render={({ field }) => (
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        handleTypeAddressChange("Внутренний");
                        field.onChange("Внутренний");
                      }}
                      style={[
                        styles.button,
                        addressType === "Внутренний" && styles.activeButton,
                      ]}
                    >
                      <Text style={{ color: "#fff" }}>Внутренний</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleTypeAddressChange("Внешний");
                        field.onChange("Внешний");
                      }}
                      style={[
                        styles.button,
                        addressType === "Внешний" && styles.activeButton,
                      ]}
                    >
                      <Text style={{ color: "#fff" }}>Внешний</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />

              {errors.addressType && (
                <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                  Выберите тип перевода
                </Text>
              )}
            </View>
          )}

          {selectedType === "По номеру телефона" && (
            <>
              <View
                style={{
                  marginTop: 25,
                  backgroundColor: "rgba(93, 0, 230, 0.2)",
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderRadius: 10,
                  borderWidth:
                    errors.phone_number || error === "record not found" ? 1 : 0,
                  borderColor:
                    errors.phone_number || error === "record not found"
                      ? "red"
                      : "rgba(93, 0, 230, 0.2)",
                }}
              >
                <Text style={{ marginBottom: 10, color: "#fff" }}>
                  Номер телефона
                </Text>
                <Controller
                  control={control}
                  name="phone_number"
                  rules={{ required: true, pattern: /^[0-9]*$/ }}
                  render={({ field }) => (
                    <TextInput
                      placeholderTextColor={"#9c9c9c"}
                      placeholder="996"
                      onChangeText={(value) => {
                        if (/^[0-9]*$/.test(value)) {
                          field.onChange(value);
                          setError(null);
                          setValue("sum", "");
                        }
                      }}
                      value={field.value}
                      keyboardType="numeric"
                      style={{
                        color: "#fff",
                        fontSize: 16,
                      }}
                    />
                  )}
                />
              </View>
              {errors.phone_number && (
                <Text
                  style={{
                    color: "red",
                    fontSize: 12,
                    marginTop: 7,
                    marginBottom: 10,
                  }}
                >
                  Заполните это поле
                </Text>
              )}
              {error === "record not found" && error && (
                <Text
                  style={{
                    color: "red",
                    fontSize: 12,
                    marginTop: 7,
                    marginBottom: 10,
                  }}
                >
                  Абонент не найден
                </Text>
              )}
            </>
          )}
          {selectedType === "По номеру счета" && (
            <>
              <View
                style={{
                  marginTop: 25,
                  backgroundColor: "rgba(93, 0, 230, 0.2)",
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderRadius: 10,
                  borderWidth:
                    errors.receiver_requisites || error === "record not found"
                      ? 1
                      : 0,
                  borderColor:
                    errors.receiver_requisites || error === "record not found"
                      ? "red"
                      : "rgba(93, 0, 230, 0.2)",
                }}
              >
                <Text style={{ marginBottom: 10, color: "#fff" }}>
                  Реквизиты получателя
                </Text>
                <Controller
                  control={control}
                  name="receiver_requisites"
                  defaultValue=""
                  rules={{ required: true, pattern: /^[0-9]*$/ }}
                  render={({ field }) => (
                    <TextInput
                      placeholderTextColor={"#9c9c9c"}
                      placeholder="XXXXXXXXXXXXXXXX"
                      onChangeText={(value) => {
                        if (/^[0-9]*$/.test(value)) {
                          field.onChange(value);
                          setValue("sum", "");
                          setError(null);
                        }
                      }}
                      value={field.value}
                      keyboardType="numeric"
                      style={{
                        color: "#fff",
                        fontSize: 16,
                      }}
                    />
                  )}
                />
              </View>
              {errors.receiver_requisites && (
                <Text
                  style={{
                    color: "red",
                    fontSize: 12,
                    marginTop: 7,
                    marginBottom: 10,
                  }}
                >
                  Заполните это поле
                </Text>
              )}
              {error === "record not found" && error && (
                <Text
                  style={{
                    color: "red",
                    fontSize: 12,
                    marginTop: 7,
                    marginBottom: 10,
                  }}
                >
                  Абонент не найден
                </Text>
              )}
            </>
          )}
          {selectedType === "По адресу кошелька" && (
            <>
              <View
                style={{
                  marginTop: 25,
                  backgroundColor: "rgba(93, 0, 230, 0.2)",
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderRadius: 10,
                  borderWidth:
                    errors.address || error === "record not found" ? 1 : 0,
                  borderColor:
                    errors.address || error === "record not found"
                      ? "red"
                      : "rgba(93, 0, 230, 0.2)",
                }}
              >
                <Text style={{ marginBottom: 10, color: "#fff" }}>
                  Адрес кошелька получателя
                </Text>
                <Controller
                  control={control}
                  name="address"
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextInput
                      placeholderTextColor={"#9c9c9c"}
                      placeholder="XXXXXXXXXXXXXXXXXXXXX"
                      onChangeText={(value) => {
                        field.onChange(value);
                        setError(null);
                        setValue("sum", "");
                      }}
                      value={field.value}
                      keyboardType="numeric"
                      style={{
                        color: "#fff",
                        fontSize: 16,
                      }}
                    />
                  )}
                />
              </View>
              {errors.address && (
                <Text
                  style={{
                    color: "red",
                    fontSize: 12,
                    marginTop: 7,
                    marginBottom: 10,
                  }}
                >
                  Заполните это поле
                </Text>
              )}
              {error === "record not found" && error && (
                <Text
                  style={{
                    color: "red",
                    fontSize: 12,
                    marginTop: 7,
                    marginBottom: 10,
                  }}
                >
                  Абонент не найден
                </Text>
              )}
            </>
          )}

          <View style={{ marginTop: 25 }}>
            {/* <Text style={{ marginBottom: 10, color: "#fff" }}>Сумма</Text> */}
            <Controller
              control={control}
              name="sum"
              rules={{ required: "Заполните это поле", pattern: /^[0-9.]*$/ }}
              render={({ field }) => (
                <View
                  style={{
                    borderRadius: 10,
                    paddingVertical: 20,
                    paddingHorizontal: 10,
                    backgroundColor: "rgba(93, 0, 230, 0.2)",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    columnGap: 10,
                    borderWidth: errors.sum || parseInt(error) === 400 ? 1 : 0,
                    borderColor:
                      errors.sum || parseInt(error) === 400 ? "red" : "rgba(93, 0, 230, 0.2)",
                  }}
                >
                  <TextInput
                    placeholderTextColor={"#9c9c9c"}
                    placeholder="0"
                    value={field.value}
                    onChangeText={(value) => {
                      if (/^[0-9.]*$/.test(value)) {
                        field.onChange(value);
                        setError(null);
                      }
                    }}
                    keyboardType="numeric"
                    style={{
                      color: "#fff",
                      fontSize: 30,
                    }}
                  />
                  <Text style={{ color: "#fff", fontSize: 20 }}>
                    {currencySymbols[currencyCode]}
                  </Text>
                </View>
              )}
            />
            {errors.sum && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {errors.sum.message}
              </Text>
            )}
            {parseInt(error) === 400 && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                Недостаточно средств
              </Text>
            )}
          </View>

          {loading ? (
            <ActivityIndicator
              size="large"
              style={{ marginTop: 30 }}
              color={"#0268EC"}
            />
          ) : (
            <TouchableOpacity
              style={{
                marginTop: 25,
                borderRadius: 10,
                padding: 20,
                backgroundColor: "rgba(93, 0, 230, 0.6)",
                marginTop: 30,
                shadowColor: "rgba(93, 0, 230, 0.6)",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 10,
              }}
              onPress={handleSubmit(searchUser)}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Отправить
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaWrapper>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    flex: 1,
    alignItems: "center",
  },
  activeButton: {
    borderBottomWidth: 1,
    borderColor: "#fff",
  },
});
