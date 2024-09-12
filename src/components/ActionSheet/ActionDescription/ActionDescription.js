import React from "react";
import { View } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import CustomText from "../../CustomText/CustomText";

const ActionDescription = ({ actionSheetRef, expandedReviewText }) => {
  return (
    <ActionSheet ref={actionSheetRef}>
      <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
        <CustomText style={{ fontSize: 22, marginBottom: 10 }}>
          Подробнее:
        </CustomText>
        <CustomText style={{ fontSize: 16, lineHeight: 22 }}>
          {expandedReviewText}
        </CustomText>
      </View>
    </ActionSheet>
  );
};

export default ActionDescription;
