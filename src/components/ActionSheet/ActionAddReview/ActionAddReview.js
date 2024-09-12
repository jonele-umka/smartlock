import React from "react";
import ReviewsInput from "../../ReviewsInput/ReviewsInput";
import ActionSheet from "react-native-actions-sheet";
import { Text, View } from "react-native";
import CustomText from "../../CustomText/CustomText";

const ActionAddReview = ({ actionSheetReviewRef, id, fetchReviews }) => {
  return (
    <ActionSheet ref={actionSheetReviewRef}>
      <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
        <CustomText style={{ fontSize: 22, fontWeight: 500, marginBottom: 20 }}>
          Добавьте отзыв
        </CustomText>
        <ReviewsInput
          actionSheetReviewRef={actionSheetReviewRef}
          id={id}
          fetchReviews={fetchReviews}
        />
      </View>
    </ActionSheet>
  );
};

export default ActionAddReview;
