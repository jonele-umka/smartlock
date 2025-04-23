import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import CustomText from "../CustomText/CustomText";
import { formatDate } from "../FormatDate/FormatDate";
import { useSelector } from "react-redux";
import i18n from "../../../i18n/i18n";
import { AirbnbRating } from "@rneui/base";

const ReviewItem = ({
  item,
  onShowMore,
  fromList,
  fetchObjectDetails,
  fetchReviewsCheck,
  canReview,
  isFirstReview,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(item.Star || 5);
  const [editedContent, setEditedContent] = useState(item.Content);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  console.log(item);
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.API_URL}/review/${item.ID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Content: editedContent,
          Star: rating,
        }),
      });

      if (response.ok) {
        setIsEditing(false);
        fetchObjectDetails();
      }
    } catch (error) {
      console.error("Ошибка обновления отзыва", error);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.API_URL}/review/${item.ID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchObjectDetails();
        fetchReviewsCheck();
      }
    } catch (error) {
      console.error("Ошибка удаления отзыва", error);
    }
    setLoading(false);
  };

  const reviewsWords = item.Content?.split(" ") || [];
  const isLongReviews = reviewsWords.length > 20;

  return (
    <View
      style={{
        padding: 20,
        borderColor: "#dee2f1",
        width: fromList ? 330 : "auto",
        borderWidth: 1,
        borderRadius: 10,
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            columnGap: 10,
          }}
        >
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{
              uri:
                item.imageUri ||
                "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
            }}
          />
          <View>
            <CustomText
              style={{ fontSize: 16, fontWeight: "600", marginBottom: 5 }}
            >
              {item.Username}
            </CustomText>
            <CustomText style={{ color: "grey" }}>
              {formatDate(item.CreatedAt)}
            </CustomText>
          </View>
        </View>

        {isEditing ? (
          <>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 5,
                marginBottom: 10,
              }}
              value={editedContent}
              onChangeText={setEditedContent}
            />
            <AirbnbRating
              count={5}
              defaultRating={rating}
              size={20}
              showRating={false}
              onFinishRating={(value) => setRating(value)}
            />
          </>
        ) : (
          <CustomText style={{ lineHeight: 22 }}>
            {isLongReviews
              ? reviewsWords.slice(0, 20).join(" ") + "..."
              : item.Content}
          </CustomText>
        )}

        {isLongReviews && !isEditing && (
          <TouchableOpacity
            onPress={() => onShowMore(item.Content)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 5,
              marginTop: 5,
            }}
          >
            <CustomText style={{ fontWeight: 500 }}>
              {i18n.t("readFull")}
            </CustomText>
            <Fontisto
              name="angle-right"
              style={{ color: "#000", fontSize: 14 }}
            />
          </TouchableOpacity>
        )}

        {isFirstReview && canReview === 1 && (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                columnGap: 10,
                marginTop: 10,
              }}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#4B5DFF" />
              ) : isEditing ? (
                <TouchableOpacity
                  onPress={handleSave}
                  style={{
                    borderRadius: 5,
                    backgroundColor: "rgba(180, 230, 180, 1)",
                    padding: 5,
                  }}
                >
                  <Ionicons
                    name="checkmark"
                    style={{ color: "rgba(19, 19, 19, 0.7)", fontSize: 22 }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleEdit}
                  style={{
                    borderRadius: 5,
                    backgroundColor: "rgba(220, 222, 243, 1)",
                    padding: 5,
                  }}
                >
                  <Ionicons
                    name="pencil"
                    style={{ color: "rgba(19, 19, 19, 0.7)", fontSize: 22 }}
                  />
                </TouchableOpacity>
              )}
              {!loading && (
                <TouchableOpacity
                  onPress={handleDelete}
                  style={{
                    borderRadius: 5,
                    backgroundColor: "rgba(245, 212, 221, 1)",
                    padding: 5,
                  }}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    style={{ color: "rgba(19, 19, 19, 0.7)", fontSize: 22 }}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: "100%",
                backgroundColor: "green",
                marginTop: 5,
              }}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default ReviewItem;
