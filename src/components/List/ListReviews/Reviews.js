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

import React, { useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Fontisto from "react-native-vector-icons/Fontisto";
import ReviewsInput from "../../ReviewsInput/ReviewsInput";

const Reviews = ({
  reviewsData,
  toggleDescriptionReviews,
  expandedReviewIndex,
}) => {
  const navigation = useNavigation();
  const onPress = (page) => {
    clickHandler(page);
  };
  // const isDarkModeEnabled = useSelector(
  //   (state) => state.theme.isDarkModeEnabled
  // );

  const renderItem = ({ item, index }) => {
    const { text } = item;
    const words = text.split(" ");
    const maxWords = 20;
    const showReadMoreButton = words.length > maxWords;
    const shortenedText = words.slice(0, maxWords).join(" ");
    const truncatedText = shortenedText + (showReadMoreButton ? "..." : "");
    const handleReadMore = () => {
      toggleDescriptionReviews(index, text); // Передаем полный текст отзыва в функцию
    };

    return (
      <View
        style={{
          padding: 20,
          borderRadius: 10,
          borderWidth: 0.2,
          borderColor: "#b8b8b8",
          width: 330,
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
              source={{ uri: item.imageUri }}
            />
            <View>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                {item.name}
              </Text>
              <Text style={{ color: "grey" }}>{item.date}</Text>
            </View>
          </View>

          <Text style={{ lineHeight: 22 }}>{truncatedText}</Text>

          {showReadMoreButton && (
            <TouchableOpacity
              onPress={handleReadMore}
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
                marginTop: 10,
              }}
            >
              <Text style={{  fontWeight: 500 }}>
                Читать полностью
              </Text>
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
      <TouchableOpacity
        style={{ alignSelf: "flex-end" }}
        onPress={() => navigation.navigate("Все отзывы")}
      >
        <Text style={{ color: "#000", paddingHorizontal: 10 }}>Все отзывы</Text>
      </TouchableOpacity>

      <View>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 15 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={reviewsData}
          horizontal
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
      {/* <View>
        <ReviewsInput />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  paymentsContainerTitle: {
    fontSize: 22,
    color: "#000",
    fontWeight: 600,
    paddingHorizontal: 10,
  },
  cardContainer: {
    width: 180,
    height: "100%",
  },
  cardTitle: {
    flexWrap: "wrap",
    fontSize: 16,
    paddingTop: 10,
    color: "#000",
    fontWeight: 500,
  },
  cardDescription: {
    flexWrap: "wrap",
    fontSize: 14,
    paddingTop: 5,
    color: "grey",
  },
});

export default Reviews;
