import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import i18n from "../i18n/i18n";
const ModalCheck = ({
  selectedTransaction,
  outgoing,
  modalVisible,
  setModalVisible,
}) => {
  const navigation = useNavigation();

  const currencySymbols = {
    USD: "$",
    EUR: "€",
    RUB: "₽",
    KGS: "C",
    USDT: "₮",
    ETH: "Ξ",
    BTC: "₿",
  };
console.log(selectedTransaction)
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

  const createAndSharePDF = async () => {
    try {
      const htmlContent = `
      <html>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      <style>
       .logoImg{
        margin-bottom: 50px;
       }
      .logoImg img{
        width: 100%;
      }
      .block{
        display: flex;
        flex-direction: column;
        padding: 20px;
        height: 100%;
      }
      .detailsBlock{
        display: flex;
        flex-direction: column;
        row-gap: 50px;
        border-top: 0.5px solid #241270;
        border-bottom: 0.5px solid #241270;
        padding: 50px 0; 
      }
      .detailsBlock p{
        font-size: 27px;
        color: #000;
        margin: 0;
      }
      .result h2{
        font-size: 45px;
        margin-bottom: 10px;
        font-weight: 500;
      }
      .result h1{
        font-size: 50px;
        margin: 0;
        font-weight: 500 
      }
      .box{
        display: flex;
        justify-content: space-between;
        column-gap: 10px;
      }
      </style>
      </head>
        <body>
        <div class="block">
        <div class="logoImg">
        <img src="https://i.ibb.co/y6RcmDN/CRYPTONLogo-Pdf.png" alt="crypton"/> 
        </div>
     
          <div class='detailsBlock'>

            <div class="box">
            <p>Реквизиты получателя:<p>
            <p>${selectedTransaction.ReceiverRequisites}</p>
            </div>
        
            ${
              selectedTransaction.nameUser
                ? `
                <div class="box">
                <p>Имя получателя:</p>
                <p>${selectedTransaction.nameUser}</p>
                </div>
                `
                : ""
            }
            <div class="box">
            <p>Отправлено со счета:</p>
            <p>****${selectedTransaction.SenderRequisites.slice(-4)}</p>
            </div>

            <div class="box">
            <p>Сумма:</p>
            <p>${selectedTransaction.SumSender} ${
        currencySymbols[selectedTransaction.CurrencySender.CurrencyCode]
      }</p>
            </div>
            
          <div class="box">
          <p>Комиссия:</p>
          <p>${selectedTransaction.CommissionSum} ${
        currencySymbols[selectedTransaction.CurrencySender.CurrencyCode]
      }</p>
          </div>

          <div class="box">
          <p>Дата операции:</p>
          <p>${formatDate(selectedTransaction.CreatedAt)}</p>
          </div>

          <div class="box">
          <p>Номер квитанции:</p>
          <p>${selectedTransaction.ChequeNo}</p>
          </div>
          </div>
          <div class="result">
            <h2>Итого:</h2> 
            <h1>${
              parseFloat(selectedTransaction.SumSender) +
              parseFloat(selectedTransaction.CommissionSum)
            } ${
        currencySymbols[selectedTransaction.CurrencySender.CurrencyCode]
      }</h1>
          </div>
          </div>
        </body>
      </html>
    `;

      const pdfFile = await Print.printToFileAsync({
        html: htmlContent,
      });

      await Sharing.shareAsync(pdfFile.uri, {
        mimeType: "application/pdf",
        dialogTitle: "Отправить PDF",
        UTI: "com.adobe.pdf",
      });
    } catch (error) {
      console.error("Ошибка при создании и отправке PDF:", error);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Image
              style={{
                width: 130,
                height: 30,
              }}
              source={require("../../assets/CRYPTONLogo.png")}
            />

            <MaterialCommunityIcons
              name="close"
              style={{ color: "#fff", fontSize: 25 }}
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
          <View>
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
                          {i18n.t("transferSuccess")}
                        </Text>
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 20,
                            fontWeight: 500,
                          }}
                        >
                          {outgoing ? "- " : "+ "}{" "}
                          {parseFloat(selectedTransaction.SumSender) +
                            parseFloat(selectedTransaction.CommissionSum)}{" "}
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
                              columnGap: 20,
                            }}
                          >
                            <Text style={{ color: "#fff" }}>
                              {i18n.t("receiverName")}
                            </Text>
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
                              columnGap: 20,
                            }}
                          >
                            <Text style={{ color: "#fff" }}>
                              {i18n.t("recipientDetails")}
                            </Text>
                            <Text
                              style={[
                                { color: "#fff", textAlign: "right" },
                                selectedTransaction.ReceiverRequisites.length >
                                  16 && { maxWidth: 130 },
                              ]}
                            >
                              {selectedTransaction.ReceiverRequisites}
                            </Text>
                          </View>
                        )}
                        {outgoing && (
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              columnGap: 20,
                            }}
                          >
                            <Text style={{ color: "#fff" }}>
                              {i18n.t("sentFromAccount")}
                            </Text>

                            <Text style={{ color: "#fff" }}>
                              {selectedTransaction.SenderRequisites}
                            </Text>
                          </View>
                        )}
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            columnGap: 20,
                          }}
                        >
                          <Text style={{ color: "#fff" }}>
                            {i18n.t("amount")}
                          </Text>

                          <Text style={{ color: "#fff" }}>
                            {selectedTransaction.SumSender}{" "}
                            {
                              currencySymbols[
                                selectedTransaction.CurrencySender.CurrencyCode
                              ]
                            }
                          </Text>
                        </View>
                        {outgoing && (
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              columnGap: 20,
                            }}
                          >
                            <Text style={{ color: "#fff" }}>
                              {i18n.t("commission")}
                            </Text>
                            <Text style={{ color: "#fff" }}>
                              {selectedTransaction.CommissionSum}{" "}
                              {
                                currencySymbols[
                                  selectedTransaction.CurrencySender
                                    .CurrencyCode
                                ]
                              }
                            </Text>
                          </View>
                        )}
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            columnGap: 20,
                          }}
                        >
                          <Text style={{ color: "#fff" }}>
                            {i18n.t("transactionDate")}
                          </Text>
                          <Text style={{ color: "#fff" }}>
                            {formatDate(selectedTransaction.CreatedAt)}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            columnGap: 20,
                          }}
                        >
                          <Text style={{ color: "#fff" }}>
                            {i18n.t("receiptNumber")}
                          </Text>
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
                          }}
                        >
                          {i18n.t("TransferDeclined")}
                        </Text>
                        {outgoing && (
                          <Text
                            style={{
                              color: "#9D0038",
                              fontSize: 20,
                              fontWeight: 500,
                              marginTop: 20,
                            }}
                          >
                            - {selectedTransaction.SumSender}{" "}
                            {
                              currencySymbols[
                                selectedTransaction.CurrencySender.CurrencyCode
                              ]
                            }
                          </Text>
                        )}
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          rowGap: 20,
                        }}
                      >
                        {outgoing && (
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              columnGap: 20,
                            }}
                          >
                            <Text style={{ color: "#fff" }}>
                              {i18n.t("recipientDetails")}
                            </Text>
                            <Text
                              style={[
                                { color: "#fff", textAlign: "right" },
                                selectedTransaction.ReceiverRequisites.length >
                                  16 && { maxWidth: 130 },
                              ]}
                            >
                              {selectedTransaction.ReceiverRequisites}
                            </Text>
                          </View>
                        )}
                        {outgoing && (
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              columnGap: 20,
                            }}
                          >
                            <Text style={{ color: "#fff" }}>
                              {i18n.t("sentFromAccount")}
                            </Text>
                            <Text style={{ color: "#fff" }}>
                              {selectedTransaction.SenderRequisites}
                            </Text>
                          </View>
                        )}

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            columnGap: 20,
                          }}
                        >
                          <Text style={{ color: "#fff" }}>
                            {i18n.t("transactionDate")}
                          </Text>
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
            {outgoing &&
              selectedTransaction &&
              selectedTransaction.Status === "Completed" && (
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
                        setModalVisible(false);
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
                        setModalVisible(false);
                      }}
                      style={styles.cardBottomText}
                      // style={[
                      //   styles.cardBottomText,
                      //   // isDarkModeEnabled && { color: "#fff" },
                      // ]}
                    >
                      {i18n.t("favorites")}
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
                      onPress={createAndSharePDF}
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
                      {i18n.t("share")}
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
                        setModalVisible(false);
<<<<<<< HEAD
                     
=======
                        navigation.navigate("Перевести");
>>>>>>> f197eaaaae4752be8ef2f168da1b153613fee086
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
                      {i18n.t("repeat")}
                    </Text>
                  </View>
                </View>
              )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "95%",
    backgroundColor: "#140A4F",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 25,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  cardBottomView: {
    backgroundColor: "#5d00e6",
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
