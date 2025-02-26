import React, { useRef, useState } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ActionDescription from "../../ActionSheet/ActionDescription/ActionDescription";
import CustomText from "../../CustomText/CustomText";
import ReviewItem from "../../Reviews/ReviewItem";
import Feather from "react-native-vector-icons/Feather";

const ListReviews = ({
  reviewsData,
  fetchObjectDetails,
  fetchReviewsCheck,
  canReview,
  toggleReviews,
}) => {
  const navigation = useNavigation();
  const [expandedReviewText, setExpandedReviewText] = useState("");
  const actionSheetReviewRef = useRef(null);
  const fromList = true;
  const handleShowMore = (text) => {
    setExpandedReviewText(text);
    actionSheetReviewRef.current?.show();
  };

  const renderSeparator = () => <View style={{ width: 20 }} />;

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomText style={{ fontSize: 18, fontWeight: 500 }}>
          Отзывы
        </CustomText>

        {/* <TouchableOpacity
          onPress={() =>
            navigation.navigate("Все отзывы", { id: reviewsData.ID })
          }
        >
          <CustomText style={{ paddingHorizontal: 10 }}>Все отзывы</CustomText>
        </TouchableOpacity> */}
      </View>
      <View>
        {canReview === 2 && (
          <TouchableOpacity
            onPress={toggleReviews}
            style={{
              flexDirection: "column",
              alignItems: "center",
              columnGap: 10,
              padding: 10,
              borderColor: "#dee2f1",
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            <Feather name="plus" style={{ fontSize: 22, color: "#594BFF" }} />
            <CustomText style={{ fontSize: 16 }}>Добавить отзыв</CustomText>
          </TouchableOpacity>
        )}
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 15 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={reviewsData?.Reviews}
          horizontal
          renderItem={({ item, index }) => (
            <ReviewItem
              item={item}
              onShowMore={handleShowMore}
              fromList={fromList}
              fetchObjectDetails={fetchObjectDetails}
              fetchReviewsCheck={fetchReviewsCheck}
              canReview={canReview}
              isFirstReview={index === 0}
            />
          )}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
      <ActionDescription
        actionSheetRef={actionSheetReviewRef}
        expandedReviewText={expandedReviewText}
      />
    </View>
  );
};

export default ListReviews;
