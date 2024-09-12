import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import SafeAreaWrapper from "../../components/SafeAreaWrapper/SafeAreaWrapper";

import LockList from "../../Locks/LockList/LockList";
import { useSelector } from "react-redux";
import { Text } from "react-native";

const LockScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.API_URL;
  const token = useSelector((state) => state.auth.token);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/lock/get-by-accommodation/117`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setLoading(false);

        const responseDataError = await response.json();
        const errorMessage =
          responseDataError.error.Message || "Произошла ошибка";
        console.error("Error updating user profile:", errorMessage);
        return;
      }

      const result = await response.json();
console.log(result[0].Passcodes[1].Booking.Name)
      setData(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.error("Error updating user profile", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}
    >
      <SafeAreaWrapper
        style={{
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        <Text style={{ color: "#000", fontSize: 30, marginBottom: 25 }}>
          Замки
        </Text>
        <LockList data={data} loading={loading} />
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default LockScreen;
