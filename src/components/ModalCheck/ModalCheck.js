import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@gluestack-ui/themed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
 
// import file from "../../assets/card/card.png";
const ModalCheck = ({
  showModal,
  selectedTransaction,
  setShowModal,
  outgoing,
}) => {
  const navigation = useNavigation();
  // const [showPdf, setShowPdf] = useState(false);

  // const sharePDF = async () => {
  //   try {
  //     const fileUri = require("../../assets/card/Frame 116.pdf");
  //     console.log(fileUri)
  //     const result = await Sharing.shareAsync(fileUri, {
  //       mimeType: "image/jpeg",
  //       dialogTitle: "Поделиться изображением",
  //     });

  //     if (result.action === Sharing.sharedAction) {
  //       if (result.activityType) {
  //         console.log(`Поделились через ${result.activityType}`);
  //       } else {
  //         console.log("Поделились успешно");
  //       }
  //     } else if (result.action === Sharing.dismissedAction) {
  //       console.log("Поделиться отменено");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const currencySymbols = {
    USD: "$",
    EUR: "€",
    RUB: "₽",
    KGS: "C",
    USDT: "₮",
    ETH: "Ξ",
    BTC: "₿",
  };
  // const addToFavoritesHandler = () => {
  //   navigation.navigate("Создать шаблон", { favorites: route.params });
  //   // dispatch(addToFavorites(route.params));
  // };

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

  return (
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
              width: "70%",
              height: "100%",
            }}
            source={require("../../assets/logo3.png")}
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
          {selectedTransaction && (
            <View>
              <View>
                {selectedTransaction.Status === "Completed" && (
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
                        {outgoing ? "- " : "+ "} {selectedTransaction.SumSender}{" "}
                        {
                          currencySymbols[
                            selectedTransaction.CurrencySender.CurrencyCode
                          ]
                        }
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        rowGap: 20,
                      }}
                    >
                      {selectedTransaction.nameUser && (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ color: "#fff" }}>Имя получателя</Text>
                          <Text style={{ color: "#fff" }}>
                            {selectedTransaction.nameUser}
                          </Text>
                        </View>
                      )}
                      {outgoing && (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ color: "#fff" }}>
                            Реквизиты получателя
                          </Text>
                          <Text style={{ color: "#fff", width: 128 }}>
                            {selectedTransaction.ReceiverRequisites}
                          </Text>
                        </View>
                      )}
                      {outgoing && (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ color: "#fff" }}>
                            Отправлено со счета
                          </Text>

                          <Text style={{ color: "#fff" }}>
                            {selectedTransaction.SenderRequisites}
                          </Text>
                        </View>
                      )}
                      {outgoing && (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ color: "#fff" }}>Комиссия</Text>
                          <Text style={{ color: "#fff" }}>
                            {selectedTransaction.SumSender}{" "}
                            {
                              currencySymbols[
                                selectedTransaction.CurrencySender.CurrencyCode
                              ]
                            }
                          </Text>
                        </View>
                      )}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ color: "#fff" }}>Дата операции</Text>
                        <Text style={{ color: "#fff" }}>
                          {formatDate(selectedTransaction.CreatedAt)}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ color: "#fff" }}>Номер квитанции</Text>
                        <Text style={{ color: "#fff" }}>
                          {selectedTransaction.ChequeNo}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                {selectedTransaction.Status === "Canceled" && (
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
                      <Entypo
                        name="circle-with-cross"
                        style={{
                          color: "#9D0038",
                          fontSize: 70,
                          marginBottom: 10,
                        }}
                      />
                      <Text
                        style={{
                          color: "#9D0038",
                          fontSize: 20,
                          fontWeight: 500,
                          marginBottom: 20,
                        }}
                      >
                        Трансфер отклонён
                      </Text>
                      <Text
                        style={{
                          color: "#9D0038",
                          fontSize: 20,
                          fontWeight: 500,
                        }}
                      >
                        - {selectedTransaction.SumSender}{" "}
                        {
                          currencySymbols[
                            selectedTransaction.CurrencySender.CurrencyCode
                          ]
                        }
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        rowGap: 20,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ color: "#fff" }}>
                          Реквизиты получателя
                        </Text>
                        <Text style={{ color: "#fff", width: 128 }}>
                          {selectedTransaction.ReceiverRequisites}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ color: "#fff" }}>
                          Отправлено со счета
                        </Text>
                        <Text style={{ color: "#fff" }}>
                          {selectedTransaction.SenderRequisites}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ color: "#fff" }}>Дата операции</Text>
                        <Text style={{ color: "#fff" }}>
                          {formatDate(selectedTransaction.CreatedAt)}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                {/* 019757 009C4D */}
              </View>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 30,
              width: "100%",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                }}
                // onPress={addToFavoritesHandler}
                style={styles.cardBottomView}
                // style={[
                //   styles.cardBottomView,
                //   // isDarkModeEnabled && { backgroundColor: "#383838" },
                // ]}
              >
                <Ionicons
                  name="star-outline"
                  color="#fff"
                  style={{ fontSize: 30 }}
                />
              </TouchableOpacity>
              <Text
                onPress={() => {
                  setShowModal(false);
                }}
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
                onPress={() => {
                  setShowModal(false);
                }}
                style={styles.cardBottomView}
                // style={[
                //   styles.cardBottomView,
                //   // isDarkModeEnabled && { backgroundColor: "#383838" },
                // ]}
              >
                <Ionicons
                  name="share-outline"
                  style={{ color: "#fff", fontSize: 30 }}
                />
              </TouchableOpacity>
              <Text
                style={styles.cardBottomText}
                // style={[
                //   styles.cardBottomText,
                //   // isDarkModeEnabled && { color: "#fff" },
                // ]}
              >
                Поделиться
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
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate("Перевести");
                }}
                style={styles.cardBottomView}
                // style={[
                //   styles.cardBottomView,
                //   // isDarkModeEnabled && { backgroundColor: "#383838" },
                // ]}
              >
                <MaterialCommunityIcons
                  name="restore"
                  style={{ fontSize: 30, color: "#fff" }}
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
const styles = StyleSheet.create({
  cardBottomView: {
    backgroundColor: "rgba(93, 0, 230, 0.6)",
    padding: 10,
    borderRadius: 10,
  },

  cardBottomText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 12,
  },
});
export default ModalCheck;
