import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import Objects from "../../../components/ObjectsComponent/Objects";
import { Skeleton } from "@rneui/themed";
import CustomText from "../../../components/CustomText/CustomText";

const ObjectList = () => {
  const accommodations = useSelector(
    (state) => state.accommodation.accommodations
  );
  const results = useSelector((state) => state.search.results);

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
    return <CustomText style={{ fontSize: 30 }}>Нет отелей</CustomText>;
  }

  if (results.Count === 0 || (results.Data && results.Data.length === 0)) {
    return <CustomText style={{ fontSize: 20 }}>Ничего не найдено</CustomText>;
  }

  if (results.Count > 0 && results.Data.length > 0) {
    return (
      <View style={{ flexDirection: "column", rowGap: 25 }}>
        {results.Data.slice()
          .reverse()
          .map((accommodation) => (
            <Objects key={accommodation.ID} items={accommodation} />
          ))}
      </View>
    );
  }

  return (
    <View style={{ flexDirection: "column", rowGap: 25 }}>
      {accommodations
        .slice()
        .reverse()
        .map((accommodation) => (
          <Objects key={accommodation.ID} items={accommodation} />
        ))}
    </View>
  );
};

export default ObjectList;
