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
import card from "../../assets/card/cards.png";
import ActionSheet from "react-native-actions-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { API_URL } from "../../constants";
import i18n from "../../components/i18n/i18n";
import Ionicons from "react-native-vector-icons/Ionicons";

export const TransferCrypto = () => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const { navigate } = useNavigation();
  const actionSheetRefFrom = useRef(null);
  const actionSheetRefWhere = useRef(null);
  const [data, setData] = useState([]);
  const [wallet, setWallet] = useState([]);
  const [selectedType, setSelectedType] = useState("По номеру телефона");
  const [addressType, setAddressType] = useState("Внутренний");
  const [loading, setLoading] = useState(false);
  const [loadWallet, setLoadWallet] = useState(false);
  const [currencyCode, setCurrencyCode] = useState(null);
  const [whereCurrencyCode, setWhereCurrencyCode] = useState(null);
  const [error, setError] = useState(null);
  const [sender_requisites, setSender_requisites] = useState(null);
  const [AccountNumberFrom, setAccountNumberFrom] = useState(null);
  const [AccountNumberWhere, setAccountNumberWhere] = useState(null);

  const token = useSelector((state) => state.signIn.token);

  const actionSheetRef = useRef(null);
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
        // const defaultWallet =
        //   currencyData.length > 0 ? currencyData[0].value : "";
        // setSender_requisites(
        //   currencyData.length > 0 ? currencyData[0].selectedWallet : ""
        // );
        // setAccountNumberFrom(
        //   currencyData.length > 0 ? currencyData[0].selectedWallet : ""
        // );
        // const accountNumberWhereWithDifferentCurrency = currencyData.find(
        //   (item) => item.value !== defaultWallet
        // );

        // setAccountNumberWhere(
        //   accountNumberWhereWithDifferentCurrency
        //     ? accountNumberWhereWithDifferentCurrency.selectedWallet
        //     : ""
        // );
        // setValue("sender_requisites", defaultWallet);
        // setValue("AccountNumberFrom", defaultWallet);
        // setValue(
        //   "AccountNumberWhere",
        //   accountNumberWhereWithDifferentCurrency
        //     ? accountNumberWhereWithDifferentCurrency.selectedWallet
        //     : defaultWallet
        // );
        // setCurrencyCode(
        //   data?.data[0]?.WalletSubAccount?.Currency?.CurrencyCode || ""
        // );
      })
      .catch((error) => {
        console.log(error);
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
  const handleWhereWalletChange = (value) => {
    const selectedCurrency = data?.data.find(
      (item) => item.WalletSubAccount.AccountNumber === value
    );
    const currencyCode =
      selectedCurrency?.WalletSubAccount.Currency.CurrencyCode || null;
    setWhereCurrencyCode(currencyCode);
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
      AccountNumberFrom,
      AccountNumberWhere,
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

                setLoading(false);
              });
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          setError(error.message);

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
                setLoading(false);
              });
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          setError(error.message);

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

                setLoading(false);
              });
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          setError(error.message);

          setLoading(false);
        });
    } else if (selectedType === "Между счетами") {
      const accountNumberFromSelected = data?.data.find(
        (item) => item.WalletSubAccount.AccountNumber === AccountNumberFrom
      );
      const accountNumberWhereSelected = data?.data.find(
        (item) => item.WalletSubAccount.AccountNumber === AccountNumberWhere
      );
      const IdCurrencyFrom = accountNumberFromSelected
        ? accountNumberFromSelected.WalletSubAccount.IdCurrency
        : null;
      const IdCurrencyWhere = accountNumberWhereSelected
        ? accountNumberWhereSelected.WalletSubAccount.IdCurrency
        : null;
      const balance = accountNumberFromSelected
        ? accountNumberFromSelected.WalletSubAccount.Balance
        : null;

      fetch(`${API_URL}/wallets/preliminary-calculation-exchange/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          IdCurrencyFrom,
          IdCurrencyWhere,
          sum,
        }),
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
          setLoading(false);
          navigate("Подтверждение перевода", {
            currencyCode: currencyCode,
            whereCurrencyCode: whereCurrencyCode,
            sum: sum,
            balance: balance,
            selectedType: selectedType,
            accountNumberFrom: AccountNumberFrom,
            accountNumberWhere: AccountNumberWhere,
            resultSum: result.data,
          });
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  };
  const getTranslatedSelectedType = (selectedType) => {
    switch (selectedType) {
      case "По номеру телефона":
        return i18n.t("byPhoneNumber");
      case "По номеру счета":
        return i18n.t("byAccountNumber");
      case "По адресу кошелька":
        return i18n.t("byWalletAddress");
      case "Между счетами":
        return i18n.t("betweenAccounts");
      default:
        return selectedType;
    }
  };

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
            paddingVertical: 20,
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
            {i18n.t("transfer")}{" "}
            {getTranslatedSelectedType(selectedType).toLowerCase()}
          </Text>
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
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
                    <Text style={{ color: "#fff" }}>{i18n.t("phone")}</Text>
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
                    <Text style={{ color: "#fff" }}>
                      {i18n.t("requisites")}
                    </Text>
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
                    <Text style={{ color: "#fff" }}>{i18n.t("wallet")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleTypeChange("Между счетами");
                      field.onChange("Между счетами");
                    }}
                    style={[
                      styles.button,
                      selectedType === "Между счетами" && styles.activeButton,
                    ]}
                  >
                    <Text style={{ color: "#fff" }}>
                      {i18n.t("betweenAccounts")}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />

            {errors.selectedType && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {i18n.t("selectTransferType")}
              </Text>
            )}
          </View>
          {selectedType !== "Между счетами" && (
            <View style={{ marginTop: 25 }}>
              <Controller
                name="sender_requisites"
                control={control}
                rules={{ required: i18n.t("chooseCurrency") }}
                render={({ field }) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => actionSheetRef.current?.show()}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.05)",
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
                          <Text style={{ color: "#fff" }}>
                            {i18n.t("chooseCurrency")}
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>

                    <ActionSheet ref={actionSheetRef}>
                      <View
                        style={{
                          flexDirection: "column",
                          rowGap: 20,
                          paddingHorizontal: 20,
                          paddingVertical: 20,
                          backgroundColor: "#140A4F",
                        }}
                      >
                        {wallet.map((item, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              actionSheetRef.current?.hide();
                              field.onChange(item.value);
                              handleWalletChange(item.value);
                              setSender_requisites(item.selectedWallet);
                            }}
                          >
                            <View>{item.selectedWallet}</View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ActionSheet>
                    {errors.sender_requisites && (
                      <Text
                        style={{ color: "red", fontSize: 12, marginTop: 7 }}
                      >
                        {errors.sender_requisites.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>
          )}

          {selectedType === "По адресу кошелька" && (
            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
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
                      <Text style={{ color: "#fff" }}>
                        {i18n.t("interior")}
                      </Text>
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
                      <Text style={{ color: "#fff" }}>
                        {i18n.t("external")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />

              {errors.addressType && (
                <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                  {i18n.t("selectTransferType")}
                </Text>
              )}
            </View>
          )}

          {selectedType === "По номеру телефона" && (
            <>
              <View
                style={{
                  marginTop: 25,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderRadius: 10,
                  borderWidth:
                    errors.phone_number || error === "record not found" ? 1 : 0,
                  borderColor:
                    errors.phone_number || error === "record not found"
                      ? "red"
                      : "rgba(255,255,255,0.05)",
                }}
              >
                <Text style={{ marginBottom: 10, color: "#fff" }}>
                  {i18n.t("phoneNumber")}
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
                  {i18n.t("fillInThisField")}
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
                  {i18n.t("subscriberNotFound")}
                </Text>
              )}
            </>
          )}
          {selectedType === "По номеру счета" && (
            <>
              <View
                style={{
                  marginTop: 25,
                  backgroundColor: "rgba(255,255,255,0.05)",
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
                      : "rgba(255,255,255,0.05)",
                }}
              >
                <Text style={{ marginBottom: 10, color: "#fff" }}>
                  {i18n.t("recipientDetails")}
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
                  {i18n.t("fillInThisField")}
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
                  {i18n.t("subscriberNotFound")}
                </Text>
              )}
            </>
          )}
          {selectedType === "По адресу кошелька" && (
            <>
              <View
                style={{
                  marginTop: 25,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderRadius: 10,
                  borderWidth:
                    errors.address || error === "record not found" ? 1 : 0,
                  borderColor:
                    errors.address || error === "record not found"
                      ? "red"
                      : "rgba(255,255,255,0.05)",
                }}
              >
                <Text style={{ marginBottom: 10, color: "#fff" }}>
                  {i18n.t("recipientsWalletAddress")}
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
                  {i18n.t("fillInThisField")}
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
                  {i18n.t("subscriberNotFound")}
                </Text>
              )}
            </>
          )}

          {selectedType === "Между счетами" && (
            <View style={{ marginTop: 25 }}>
              <Controller
                name="AccountNumberFrom"
                control={control}
                rules={{ required: i18n.t("chooseCurrency") }}
                render={({ field }) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => actionSheetRefFrom.current?.show()}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.05)",
                        justifyContent: "center",
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                        borderRadius: 10,
                      }}
                    >
                      <View>
                        {AccountNumberFrom ? (
                          <View style={{ color: "#fff" }}>
                            {AccountNumberFrom}
                          </View>
                        ) : (
                          <Text style={{ color: "#fff" }}>
                            {i18n.t("chooseCurrency")}
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>

                    <ActionSheet ref={actionSheetRefFrom}>
                      <View
                        style={{
                          flexDirection: "column",
                          rowGap: 20,
                          paddingHorizontal: 20,
                          paddingVertical: 20,
                          backgroundColor: "#140A4F",
                        }}
                      >
                        {wallet.map((item, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              actionSheetRefFrom.current?.hide();

                              if (
                                item.value !==
                                  getValues("AccountNumberWhere") &&
                                item.value !== getValues("AccountNumberFrom")
                              ) {
                                field.onChange(item.value);
                                handleWalletChange(item.value);
                                setAccountNumberFrom(item.selectedWallet);
                              } else {
                                // Выводите сообщение или предпринимайте необходимые действия, если валюты совпадают
                                console.log(
                                  "Выберите другую валюту для AccountNumberFrom"
                                );
                              }
                            }}
                            disabled={
                              item.value === getValues("AccountNumberWhere")
                            }
                            style={{
                              opacity:
                                item.value === getValues("AccountNumberWhere")
                                  ? 0.5
                                  : 1,
                            }}
                          >
                            <View>{item.selectedWallet}</View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ActionSheet>
                    {errors.AccountNumberFrom && (
                      <Text
                        style={{ color: "red", fontSize: 12, marginTop: 7 }}
                      >
                        {errors.AccountNumberFrom.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>
          )}
          {selectedType === "Между счетами" && (
            <View style={{ marginTop: 10 }}>
              <Ionicons
                name="arrow-down-circle-outline"
                style={{ color: "#fff", fontSize: 30, textAlign: "center" }}
              />
            </View>
          )}
          {selectedType === "Между счетами" && (
            <View style={{ marginTop: 10 }}>
              <Controller
                name="AccountNumberWhere"
                control={control}
                rules={{ required: i18n.t("chooseCurrency") }}
                render={({ field }) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        actionSheetRefWhere.current?.show();
                      }}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.05)",
                        justifyContent: "center",
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                        borderRadius: 10,
                      }}
                    >
                      <View>
                        {AccountNumberWhere ? (
                          <View style={{ color: "#fff" }}>
                            {AccountNumberWhere}
                          </View>
                        ) : (
                          <Text style={{ color: "#fff" }}>
                            {i18n.t("inWhatCurrency")}
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>

                    <ActionSheet ref={actionSheetRefWhere}>
                      <View
                        style={{
                          flexDirection: "column",
                          rowGap: 20,
                          paddingHorizontal: 20,
                          paddingVertical: 20,
                          backgroundColor: "#140A4F",
                        }}
                      >
                        {wallet.map((item, index) => (
                          <TouchableOpacity
                            key={index}
                            disabled={
                              AccountNumberWhere ===
                              getValues("AccountNumberFrom")
                            }
                            style={{
                              opacity:
                                item.value === getValues("AccountNumberFrom")
                                  ? 0.5
                                  : 1,
                            }}
                            onPress={() => {
                              if (
                                item.value !== getValues("AccountNumberFrom")
                              ) {
                                field.onChange(item.value);
                                handleWhereWalletChange(item.value);
                                setAccountNumberWhere(item.selectedWallet);
                              }
                              actionSheetRefWhere.current?.hide();
                            }}
                          >
                            <View>{item.selectedWallet}</View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ActionSheet>
                    {errors.AccountNumberWhere && (
                      <Text
                        style={{ color: "red", fontSize: 12, marginTop: 7 }}
                      >
                        {errors.AccountNumberWhere.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>
          )}
          <View style={{ marginTop: 25 }}>
            <Controller
              control={control}
              name="sum"
              rules={{
                required: i18n.t("fillInThisField"),
                pattern: /^[0-9.,]*$/,
              }}
              render={({ field }) => (
                <View
                  style={{
                    borderRadius: 10,
                    paddingVertical: 20,
                    paddingHorizontal: 10,
                    backgroundColor: "rgba(255,255,255,0.05)",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",

                    columnGap: 10,
                    borderWidth: errors.sum || parseInt(error) === 400 ? 1 : 0,
                    borderColor:
                      errors.sum || parseInt(error) === 400
                        ? "red"
                        : "rgba(255,255,255,0.05)",
                  }}
                >
                  <TextInput
                    placeholderTextColor={"#9c9c9c"}
                    placeholder="0"
                    value={field.value}
                    onChangeText={(value) => {
                      if (/^[0-9.,]*$/.test(value)) {
                        field.onChange(value);
                        setError(null);
                      }
                    }}
                    keyboardType="numeric"
                    style={{
                      color: "#fff",
                      fontSize: 30,
                      textAlign: "center",
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
                {i18n.t("insufficientFunds")}
              </Text>
            )}
          </View>

          {loading ? (
            <ActivityIndicator
              size="large"
              style={{ marginTop: 30 }}
              color={"#fff"}
            />
          ) : (
            <TouchableOpacity
              style={{
                borderRadius: 10,
                padding: 20,
                backgroundColor: "#5d00e6",
                marginTop: 30,
                shadowColor: "#5d00e6",
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
                {i18n.t("send")}
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
  skeletonItem: {
    width: "100%",
    height: 70,
    backgroundColor: "#333",
    borderRadius: 10,
    marginTop: 20,
  },
});
