import { useNavigation } from "@react-navigation/core";
import React from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { formatDate } from "../../components/FormatDate/FormatDate";
import CustomText from "../../components/CustomText/CustomText";
import i18n from "../../components/i18n/i18n";

const LockList = ({ data, loading }) => {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: "column", rowGap: 25 }}>
      {loading ? (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 40, marginBottom: 30 }}
          color={"#4B5DFF"}
        />
      ) : data && data.length > 0 ? (
        data.map((item) => (
          <TouchableOpacity
            key={item.ID}
            onPress={() => navigation.navigate("Детали замка", { id: item.ID })}
            style={{
              backgroundColor: "rgba(75, 93, 255, 0.2)",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
                borderLeftWidth: 3,
                borderLeftColor: "red",
                paddingLeft: 5,
              }}
            >
              <CustomText style={{ fontWeight: 500, fontSize: 18 }}>
                {i18n.t("nameLock")}:{" "}
              </CustomText>
              <CustomText style={{ fontWeight: 500, fontSize: 18 }}>
                {item.LockAlias}
              </CustomText>
            </View>

            <CustomText style={{ textAlign: "right" }}>
              {formatDate(item.CreatedAt)}
            </CustomText>
          </TouchableOpacity>
        ))
      ) : (
        <CustomText style={{ fontSize: 16 }}>{i18n.t("noLocks")}</CustomText>
      )}
    </View>
  );
};

export default LockList;
