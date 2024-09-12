// import { View, Text, Image, TextInput } from "react-native";
// import React from "react";
// import { TouchableOpacity } from "react-native";

// const Reviews = () => {
//   const reviewsData = [
//     {
//       name: "User 1",
//       date: "01.01.2024",
//       text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//       imageUri:
//         "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
//     },
//     {
//       name: "User 2",
//       date: "01.01.2024",
//       text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//       imageUri:
//         "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
//     },
//     {
//       name: "User 3",
//       date: "01.01.2024",
//       text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//       imageUri:
//         "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
//     },
//   ];

//   const firstTwoReviews = reviewsData.slice(0, 1);
//   return (
//     <View>
//       <View style={{ flexDirection: "column", rowGap: 20 }}>
//         {firstTwoReviews.map((review, index) => (
//           <View
//             key={index}
//             style={{
//               padding: 20,
//               borderRadius: 10,
//               borderWidth: 0.2,
//               borderColor: "#b8b8b8",
//             }}
//           >
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 marginBottom: 20,
//               }}
//             >
//               <Image
//                 style={{ width: 40, height: 40, borderRadius: 20 }}
//                 source={{ uri: review.imageUri }}
//               />
//               <View style={{ marginLeft: 10 }}>
//                 <Text style={{ fontSize: 18, fontWeight: "600" }}>
//                   {review.name}
//                 </Text>
//                 <Text style={{ color: "grey" }}>{review.date}</Text>
//               </View>
//             </View>
//             <Text style={{ fontSize: 16, lineHeight: 22 }}>{review.text}</Text>
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// };

// export default Reviews;

import React, { useRef, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Fontisto from "react-native-vector-icons/Fontisto";
import { formatDate } from "../../FormatDate/FormatDate";
import ActionDescription from "../../ActionSheet/ActionDescription/ActionDescription";
import CustomText from "../../CustomText/CustomText";

const Reviews = ({ reviewsData }) => {
  const navigation = useNavigation();
  const [expandedReviewText, setExpandedReviewText] = useState("");
  const actionSheetReviewRef = useRef(null);

  const handleShowMore = (text) => {
    setExpandedReviewText(text);
    actionSheetReviewRef.current?.show();
  };

  const renderItem = ({ item }) => {
    const reviewsWords = item.Content?.split(" ") || [];
    const isLongReviews = reviewsWords.length > 20;

    return (
      <View
        style={{
          padding: 20,
          borderColor: "#dee2f1",
          width: 330,
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

          <CustomText style={{ lineHeight: 22 }}>
            {isLongReviews
              ? reviewsWords.slice(0, 20).join(" ") + "..."
              : item.Content}
          </CustomText>

          {isLongReviews && (
            <TouchableOpacity
              onPress={() => handleShowMore(item.Content)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
                marginTop: 10,
              }}
            >
              <CustomText style={{ fontWeight: 500 }}>
                Читать полностью
              </CustomText>
              <Fontisto
                name="angle-right"
                style={{ color: "#000", fontSize: 14 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderSeparator = () => {
    return <View style={{ width: 20 }} />;
  };

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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Все отзывы", { id: reviewsData.ID })
          }
        >
          <CustomText style={{ paddingHorizontal: 10 }}>Все отзывы</CustomText>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 15 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={reviewsData?.Reviews}
          horizontal
          renderItem={renderItem}
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

export default Reviews;
