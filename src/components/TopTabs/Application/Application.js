import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplications } from "../../../Store/applicationsSlice/applicationsSlice";
import ActionRejectReason from "../../ActionSheet/ActionRejectReason/ActionRejectReason";
import CustomText from "../../CustomText/CustomText";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const Application = ({ application, status }) => {
  const [isRejectSheetVisible, setRejectSheetVisible] = useState(false);
  const API_URL = process.env.API_URL;
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleReject = async (applicationID, rejectReason) => {
    try {
      const response = await fetch(
        `${API_URL}/booking/reject/${applicationID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reason: rejectReason }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("result", result);
        dispatch(fetchApplications("pending"));
        dispatch(fetchApplications("active"));
        dispatch(fetchApplications("rejected"));
      } else {
        console.error("Server Error:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleActive = async () => {
    try {
      const response = await fetch(
        `${API_URL}/booking/activate/${application.ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("result", result);
        dispatch(fetchApplications("pending"));
        dispatch(fetchApplications("active"));
        dispatch(fetchApplications("rejected"));
      } else {
        console.error("Server Error:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 25,
        backgroundColor: "#4B5DFF",
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 25,
        }}
      >
        <View style={{ flexDirection: "column", rowGap: 12 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: 10,
            }}
          >
            <CustomText>Имя: </CustomText>
            <CustomText style={{ fontWeight: "500" }}>
              {application?.Name}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: 10,
            }}
          >
            <CustomText>Фамилия: </CustomText>
            <CustomText style={{ fontWeight: "500" }}>
              {application?.Surname}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: 10,
            }}
          >
            <CustomText>Номер телефона: </CustomText>
            <CustomText style={{ fontWeight: "500" }}>
              {application?.PhoneNumber}
            </CustomText>
          </View>
          <View
            style={{ borderWidth: 1, borderColor: "#E7F0FB", borderRadius: 10 }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: 10,
            }}
          >
            <CustomText>Количество гостей: </CustomText>
            <CustomText style={{ fontWeight: "500" }}>
              {application?.PeopleQuantity}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: 10,
            }}
          >
            <CustomText>Цена: </CustomText>
            <CustomText style={{ fontWeight: "500" }}>
              {application?.TotalSum} сом
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: 10,
            }}
          >
            <CustomText>Дата въезда: </CustomText>
            <CustomText style={{ fontWeight: "500" }}>
              {application?.StartDate}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: 10,
            }}
          >
            <CustomText>Дата выезда: </CustomText>
            <CustomText style={{ fontWeight: "500" }}>
              {application?.EndDate}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: 10,
            }}
          >
            {application?.WithAnimals ? (
              <View
                style={{
                  flexDirection: "row",
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

                  <CustomText style={{ color: "#57d673" }}>
                    С животными можно
                  </CustomText>
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
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

                  <CustomText>С животными нельзя</CustomText>
                </View>
              </View>
            )}
          </View>
        </View>
        {status === "pending" && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              columnGap: 20,
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => setRejectSheetVisible(true)}
              style={{
                borderWidth: 1,
                borderColor: "#FE3C5F",
                padding: 10,
                borderRadius: 10,
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: "#FE3C5F",
                  textAlign: "center",
                  fontWeight: "500",
                }}
              >
                Отклонить
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleActive}
              style={{
                borderWidth: 1,
                borderColor: "#4B5DFF",
                padding: 10,
                borderRadius: 10,
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: "#4B5DFF",
                  textAlign: "center",
                  fontWeight: "500",
                }}
              >
                Подтвердить
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ActionRejectReason
        applicationID={application.ID}
        onReject={handleReject}
        visible={isRejectSheetVisible}
        onClose={() => setRejectSheetVisible(false)}
      />
    </View>
  );
};

export default Application;
