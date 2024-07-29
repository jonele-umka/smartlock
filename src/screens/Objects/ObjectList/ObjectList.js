import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import Objects from "../../../components/ObjectsComponent/Objects";
import { Skeleton } from "@rneui/themed";

const ObjectList = () => {
  const accommodations = useSelector(
    (state) => state.accommodation.accommodations
  );

  const status = useSelector((state) => state.accommodation.status);
  if (status === "loading") {
    return (
      <Skeleton
        animation="pulse"
        width={"100%"}
        height={220}
        style={{ borderRadius: 20 }}
      />
    );
  }
  if (status === "failed") {
    return <Text style={{ fontSize: 30 }}>Нет отелей</Text>;
  }
  return (
    <View style={{ flexDirection: "column", rowGap: 25 }}>
      {accommodations.map((accommodation) => (
        <Objects key={accommodation.ID} accommodation={accommodation} />
      ))}
    </View>
  );
};

export default ObjectList;
