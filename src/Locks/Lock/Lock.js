import { View, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomText from "../../components/CustomText/CustomText";
import Fontisto from "react-native-vector-icons/Fontisto";

const Lock = ({ id }) => {
  const API_URL = process.env.API_URL;
  const token = useSelector((state) => state.auth.token);
  const [unlockLoading, setUnlockLoading] = useState(false);
  const [lockLoading, setLockLoading] = useState(false);

  const handleUnlock = async () => {
    setUnlockLoading(true);
    try {
      const response = await fetch(`${API_URL}/lock/unlock/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setUnlockLoading(false);

        const responseDataError = await response.json();
        const errorMessage =
          responseDataError.error.Message || "Произошла ошибка";
        console.error("Error updating user profile:", errorMessage);
        return;
      }

      const result = await response.json();
      console.log(result);
      setUnlockLoading(false);
    } catch (error) {
      setUnlockLoading(false);

      console.error("Error updating user profile", error);
    }
  };

  const handleLock = async () => {
    setLockLoading(true);
    try {
      const response = await fetch(`${API_URL}/lock/lock/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setLockLoading(false);

        const responseDataError = await response.json();
        const errorMessage =
          responseDataError.error.Message || "Произошла ошибка";
        console.error("Error updating user profile:", errorMessage);
        return;
      }

      const result = await response.json();
      console.log(result);
      setLockLoading(false);
    } catch (error) {
      setLockLoading(false);

      console.error("Error updating user profile", error);
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        columnGap: 30,
        justifyContent: "center",
      }}
    >
      {lockLoading ? (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 40, marginBottom: 30 }}
          color={"#4B5DFF"}
        />
      ) : (
        <TouchableOpacity
          onPress={handleLock}
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            rowGap: 10,
            backgroundColor: "#F36A7B",
            paddingHorizontal: 40,
            paddingVertical: 30,
            borderRadius: 20,
          }}
        >
          <Fontisto
            style={{ fontSize: 50, color: "#FDE1E5" }}
            name="locked"
          />
          <CustomText
            style={{
              fontSize: 16,
              textAlign: "center",
              fontWeight: 500,
              color: "#FDE1E5",
            }}
          >
            Закрыть
          </CustomText>
        </TouchableOpacity>
      )}
      {unlockLoading ? (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 40, marginBottom: 30 }}
          color={"#4B5DFF"}
        />
      ) : (
        <TouchableOpacity
          onPress={handleUnlock}
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            rowGap: 10,
            backgroundColor: "rgba(75,93,255, 0.2)",
            paddingHorizontal: 40,
            paddingVertical: 30,
            borderRadius: 20,
          }}
        >
          <Fontisto
            style={{ fontSize: 50, color: "#4B5DFF" }}
            name="unlocked"
          />
          <CustomText
            style={{
              fontSize: 16,
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Открыть
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Lock;
