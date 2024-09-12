// ApplicationList.js
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Application from "./Application";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplications } from "../../../Store/applicationsSlice/applicationsSlice";

const ApplicationList = ({ status }) => {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.applications.data[status]);

  useEffect(() => {
    dispatch(fetchApplications(status));
  }, [status, dispatch]);

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
