// ApplicationList.js
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Application from "./Application";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplications } from "../../../Store/applicationsSlice/applicationsSlice";
import CustomText from "../../CustomText/CustomText";

const ApplicationList = ({ status }) => {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.applications.data[status]);

  useEffect(() => {
    dispatch(fetchApplications(status));
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4B5DFF" />
      </View>
    );
  }
  if (status === "failed") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CustomText>Ошибка при получении данных</CustomText>
      </View>
    );
  }
  if (!applications || applications.length <= 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CustomText>Нет заявок</CustomText>
      </View>
    );
  }
  return (
    <View style={{ flexDirection: "column", rowGap: 25 }}>
      {applications
        .slice()
        .reverse()
        .map((application) => (
          <Application
            key={application.ID}
            application={application}
            status={status}
          />
        ))}
    </View>
  );
};

export default ApplicationList;
