import {
  ScrollView,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchReservation } from "../Store/reservationSlice/reservationSlice";
import { useDispatch, useSelector } from "react-redux";
import SafeAreaWrapper from "../components/SafeAreaWrapper/SafeAreaWrapper";
import CustomText from "../components/CustomText/CustomText";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import i18n from "../components/i18n/i18n";

const ReservationScreen = () => {
  const token = useSelector((state) => state.auth.token);
  const reservation = useSelector((state) => state.reservation.reservation);
  const status = useSelector((state) => state.reservation.status);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  // Функция, выполняющаяся при обновлении
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchReservation(token));
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };
  useEffect(() => {
    if (token) {
      dispatch(fetchReservation(token));
    }
  }, [dispatch, token]);

  if (status === "loading") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4B5DFF" />
      </View>
    );
  }
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 40,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SafeAreaWrapper>
        <CustomText
          style={{
            fontSize: 30,
            textAlign: "center",
            marginBottom: 25,
          }}
        >
          {reservation && reservation.length > 0
            ? i18n.t("yourReservations")
            : i18n.t("noYourReservations")}
        </CustomText>
        <View style={{ flexDirection: "column", rowGap: 20 }}>
          {reservation &&
            reservation
              .slice()
              .reverse()
              .map((reservation) => (
                <View
                  key={reservation.ID}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 20,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "rgba(75, 93, 255, 0.2)",
                  }}
                >
                  <CustomText
                    style={{
                      textAlign: "center",
                      fontWeight: 500,
                      fontSize: 18,
                      marginBottom: 20,
                    }}
                  >
                    {reservation?.Accommodation?.Title}
                  </CustomText>
                  <View
                    style={{
                      flexDirection: "row",
                      columnGap: 5,
                      marginBottom: 10,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "rgba(75,93,355,0.2)",
                        borderRadius: 10,
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                      }}
                    >
                      <View style={{ flexDirection: "column" }}>
                        <CustomText
                          style={{
                            color: "#616992",
                            fontSize: 14,
                            marginBottom: 2,
                          }}
                        >
                          {i18n.t("price")}:
                        </CustomText>
                        <CustomText style={{ fontWeight: 500, fontSize: 16 }}>
                          {reservation?.TotalSum} {i18n.t("som")}
                        </CustomText>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "rgba(75,93,355,0.2)",
                        borderRadius: 10,
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                      }}
                    >
                      <View style={{ flexDirection: "column" }}>
                        <CustomText
                          style={{
                            color: "#616992",
                            fontSize: 14,
                            marginBottom: 2,
                          }}
                        >
                          {i18n.t("quantityGuests")}:
                        </CustomText>
                        <CustomText style={{ fontWeight: 500, fontSize: 16 }}>
                          {reservation?.PeopleQuantity}
                        </CustomText>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      columnGap: 5,
                      marginBottom: 10,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "rgba(75,93,355,0.2)",
                        borderRadius: 10,
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                      }}
                    >
                      <View style={{ flexDirection: "column" }}>
                        <CustomText
                          style={{
                            color: "#616992",
                            fontSize: 14,
                            marginBottom: 2,
                          }}
                        >
                          {i18n.t("dateEntry")}:
                        </CustomText>
                        <CustomText style={{ fontWeight: 500, fontSize: 16 }}>
                          {reservation?.StartDate}
                        </CustomText>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "rgba(75,93,355,0.2)",
                        borderRadius: 10,
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                      }}
                    >
                      <View style={{ flexDirection: "column" }}>
                        <CustomText
                          style={{
                            color: "#616992",
                            fontSize: 14,
                            marginBottom: 2,
                          }}
                        >
                          <CustomText>{i18n.t("departureDate")}: </CustomText>
                        </CustomText>
                        <CustomText style={{ fontWeight: 500, fontSize: 16 }}>
                          {reservation?.EndDate}
                        </CustomText>
                      </View>
                    </View>
                  </View>
                  {reservation.KeyboardPwd && (
                    <View
                      style={{
                        flexDirection: "column",
                        marginBottom: 20,
                        alignItems: "center",
                      }}
                    >
                      <CustomText
                        style={{
                          color: "#616992",
                          fontSize: 14,
                          marginBottom: 2,
                        }}
                      >
                        {i18n.t("password")}
                      </CustomText>
                      <CustomText style={{ fontWeight: 500, fontSize: 16 }}>
                        {reservation?.KeyboardPwd}
                      </CustomText>
                    </View>
                  )}
                  {reservation?.WithAnimals ? (
                    <View
                      style={{
                        flexDirection: "row",
                        borderWidth: 1,
                        borderColor: "#57d673",
                        padding: 10,
                        borderRadius: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          columnGap: 10,
                          alignItems: "center",
                        }}
                      >
                        <SimpleLineIcons
                          name="check"
                          style={{ color: "#57d673", fontSize: 25 }}
                        />

                        <CustomText style={{ color: "green" }}>
                          {i18n.t("haveAnimals")}
                        </CustomText>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: "row",
                        borderWidth: 1,
                        borderColor: "rgba(243, 106,123,0.2)",
                        padding: 10,
                        borderRadius: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          columnGap: 10,
                          alignItems: "center",
                        }}
                      >
                        <MaterialIcons
                          name="error"
                          style={{ color: "#F36A7B", fontSize: 25 }}
                        />

                        <CustomText style={{ color: "#F36A7B" }}>
                          {i18n.t("noAnimals")}
                        </CustomText>
                      </View>
                    </View>
                  )}
                </View>
              ))}
        </View>
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default ReservationScreen;
