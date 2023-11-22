import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ScrollView,
  RefreshControl,
  Image,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { LinearGradient } from "expo-linear-gradient";
import { fetchTransactions } from "../../../Store/Transactions/transctionsActions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@gluestack-ui/themed";

const SuccessTransfer = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const {
    sum,
    currencyCode,
    sender_requisites,
    requisites,
    nameUser,
    commission,
    selectedType,
    id,
  } = route.params;
  console.log(route.params);

  const [showModal, setShowModal] = useState(false);
  // selector
  const transactions = useSelector((state) => state.transactions.transactions);
  const token = useSelector((state) => state.signIn.token);

  // const addToFavoritesHandler = () => {
  //   navigation.navigate("Создать шаблон", { favorites: route.params });
  //   // dispatch(addToFavorites(route.params));
  // };
  // loadHistory
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
    if (token) {
      dispatch(fetchTransactions());
    }
  }, [token, dispatch]);

  // refresh
  const onRefresh = () => {
    dispatch(fetchTransactions());
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  };

  const SafeAreaWrapper =
    Platform.OS === "android" ? SafeAreaViewContext : SafeAreaView;
  console.log(sum);

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
      <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} />}>
        <View>
          {transactions[0]?.Status === "Completed" && (
            <LinearGradient colors={["#191a1d", "#004714", "#007321"]}>
              <View
                style={{
                  padding: 20,
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 120, marginBottom: 20 }}
                  source={require("../../../assets/check.png")}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    color: "#fff",
                    fontWeight: 500,
                  }}
                >
                  Перевод успешно проведен
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 30,
                    fontWeight: 600,
                    marginTop: 20,
                    marginBottom: 5,
                    color: "#fff",
                  }}
                >
                  {sum} {currencySymbols[currencyCode]}
                </Text>
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  Комиссия {commission}
                </Text>
              </View>
            </LinearGradient>
          )}
          {transactions[0]?.Status === "Performed" && (
            <LinearGradient
              // Button Linear Gradient
              colors={["#191a1d", "#303030", "#4f4f4f"]}
            >
              <View
                style={{
                  padding: 20,
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Entypo
                  name="back-in-time"
                  style={{
                    color: "#fff",
                    fontSize: 100,
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    color: "#fff",
                    fontWeight: 500,
                  }}
                >
                  В обработке
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 30,
                    fontWeight: 600,
                    marginTop: 20,
                    marginBottom: 5,
                    color: "#fff",
                  }}
                >
                  {sum} {currencySymbols[currencyCode]}
                </Text>
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  Комиссия {commission}
                </Text>
              </View>
            </LinearGradient>
          )}
          {transactions[0]?.Status === "Canceled" && (
            <LinearGradient
              // Button Linear Gradient
              colors={["#191a1d", "#4f0400", "#a80d05"]}
            >
              <View
                style={{
                  padding: 20,
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 100, marginBottom: 20 }}
                  source={require("../../../assets/воскл.знак.png")}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    color: "#fff",
                    fontWeight: 500,
                  }}
                >
                  Не выполнено!
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 30,
                    fontWeight: 600,
                    marginTop: 20,
                    marginBottom: 5,
                    color: "#fff",
                  }}
                >
                  {sum} {currencySymbols[currencyCode]}
                </Text>
              </View>
            </LinearGradient>
          )}
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}
        >
          {transactions[0].Status === "Completed" && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                columnGap: 20,
                marginBottom: 40,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",

                  // width: "30%",
                }}
              >
                <TouchableOpacity
                  style={styles.cardBottomView}
                  // style={[
                  //   styles.cardBottomView,
                  //   // isDarkModeEnabled && { backgroundColor: "#383838" },
                  // ]}
                >
                  <Ionicons
                    name="star-outline"
                    color="#fff"
                    style={{ fontSize: 35 }}
                  />
                </TouchableOpacity>
                <Text
                  style={styles.cardBottomText}
                  // style={[
                  //   styles.cardBottomText,
                  //   // isDarkModeEnabled && { color: "#fff" },
                  // ]}
                >
                  Избранное
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",

                  // width: "30%",
                }}
              >
                <TouchableOpacity
                  onPress={() => setShowModal(true)}
                  style={styles.cardBottomView}
                  // style={[
                  //   styles.cardBottomView,
                  //   // isDarkModeEnabled && { backgroundColor: "#383838" },
                  // ]}
                >
                  <Ionicons
                    name="document-text-outline"
                    style={{ color: "#fff", fontSize: 35 }}
                  />
                </TouchableOpacity>
                <Text
                  style={styles.cardBottomText}
                  // style={[
                  //   styles.cardBottomText,
                  //   // isDarkModeEnabled && { color: "#fff" },
                  // ]}
                >
                  Чек
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",

                  // width: "30%",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Перевести")}
                  style={styles.cardBottomView}
                  // style={[
                  //   styles.cardBottomView,
                  //   // isDarkModeEnabled && { backgroundColor: "#383838" },
                  // ]}
                >
                  <MaterialCommunityIcons
                    name="restore"
                    style={{ fontSize: 35, color: "#fff" }}
                  />
                </TouchableOpacity>
                <Text
                  style={styles.cardBottomText}
                  // style={[
                  //   styles.cardBottomText,
                  //   // isDarkModeEnabled && { color: "#fff" },
                  // ]}
                >
                  Повторить
                </Text>
              </View>
            </View>
          )}
          <Text style={{ color: "#fff", fontSize: 20, marginBottom: 20 }}>
            Подробности:
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "grey",
              marginBottom: 20,
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 10,
              }}
            >
              <Entypo
                name="wallet"
                style={{
                  color: "#fff",
                  fontSize: 30,
                  color: "#5d00e6",
                }}
              />
              <View>
                <Text style={{ color: "#fff", marginBottom: 10 }}>
                  От кого:
                </Text>

                <Text style={{ color: "#fff" }}>{sender_requisites}</Text>
              </View>
            </View>
            {/* <EvilIcons
              name="arrow-down"
              style={{
                color: "#fff",
                fontSize: 20,
                color: "#0268EC",
                textAlign: "center",
              }}
            /> */}
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 10,
              }}
            >
              <Entypo
                name="wallet"
                style={{
                  color: "#fff",
                  fontSize: 30,
                  color: "#5d00e6",
                }}
              />

              <View>
                <Text style={{ color: "#fff", marginBottom: 10 }}>Кому:</Text>
                {/* <Text style={{ color: "#fff", marginBottom: 10 }}>
                    {selectedType}
                  </Text> */}

                {nameUser && (
                  <Text style={{ color: "#fff", marginBottom: 5 }}>
                    {nameUser}
                  </Text>
                )}
                {selectedType && (
                  <Text style={{ color: "#fff", marginBottom: 5 }}>
                    {selectedType}
                  </Text>
                )}
                <Text
                  style={[
                    selectedType === "По адресу кошелька" && { width: 300 },
                    { color: "#fff" },
                  ]}
                >
                  {requisites}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Главная страница")}
            style={{
              marginTop: 25,
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
          >
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 16,
              }}
            >
              На главную
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal isOpen={showModal}>
        <ModalBackdrop />
        <ModalContent
          width={"95%"}
          backgroundColor={"#140A4F"}
          borderRadius={20}
          paddingHorizontal={10}
          paddingVertical={25}
        >
          <ModalHeader paddingTop={0} paddingHorizontal={0} marginBottom={20}>
            <Image
              style={{
                width: "50%",
                height: "100%",
              }}
              source={require("../../../assets/CRYPTONLogo.png")}
            />
            <ModalCloseButton>
              <MaterialCommunityIcons
                name="close"
                style={{ color: "#fff", fontSize: 25 }}
                onPress={() => {
                  setShowModal(false);
                }}
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody paddingHorizontal={0}>
            <View>
              {transactions[0].Status === "Completed" && (
                <View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      borderBottomWidth: 0.5,
                      borderBottomColor: "grey",
                      paddingBottom: 20,
                      marginBottom: 20,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="check-circle"
                      style={{
                        color: "#2CE02B",
                        fontSize: 70,
                        marginBottom: 10,
                      }}
                    />
                    <Text
                      style={{
                        color: "#2CE02B",
                        fontSize: 20,
                        fontWeight: 600,
                        marginBottom: 20,
                      }}
                    >
                      Перевод успешно проведен
                    </Text>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: 500,
                      }}
                    >
                      - {sum} {currencySymbols[currencyCode]}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      rowGap: 20,
                    }}
                  >
                    {nameUser && (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          columnGap: 20
                        }}
                      >
                        <Text style={{ color: "#fff" }}>Имя получателя</Text>
                        <Text style={{ color: "#fff" }}>{nameUser}</Text>
                      </View>
                    )}

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        columnGap: 20
                      }}
                    >
                      <Text style={{ color: "#fff" }}>
                        Реквизиты получателя
                      </Text>

                      <Text style={{ color: "#fff", textAlign: "right" }}>
                        {requisites}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        columnGap: 20
                      }}
                    >
                      <Text style={{ color: "#fff" }}>Отправлено со счета</Text>

                      <Text style={{ color: "#fff" }}>{sender_requisites}</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        columnGap: 20
                      }}
                    >
                      <Text style={{ color: "#fff" }}>Комиссия</Text>
                      <Text style={{ color: "#fff" }}>
                        {commission} {currencySymbols[currencyCode]}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        columnGap: 20
                      }}
                    >
                      <Text style={{ color: "#fff" }}>Дата операции</Text>
                      <Text style={{ color: "#fff" }}>
                        {formatDate(transactions[0].CreatedAt)}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        columnGap: 20
                      }}
                    >
                      <Text style={{ color: "#fff" }}>Номер квитанции</Text>
                      <Text style={{ color: "#fff" }}>
                        {transactions[0].ChequeNo}
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {/* 019757 009C4D */}
            </View>
          </ModalBody>
        </ModalContent>
      </Modal>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  cardBottomView: {
    backgroundColor: "#5d00e6",
    padding: 20,
    borderRadius: 10,
  },

  cardBottomText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 12,
  },
});
export default SuccessTransfer;
