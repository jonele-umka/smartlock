// import { View, Text } from "react-native";
// import React from "react";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useNavigation } from "@react-navigation/native";
// const Questions = () => {
//   const navigation = useNavigation();
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
//         {firstTwoReviews.map((question, index) => (
//           <View
//             onPress={() => navigation.navigate("Все вопросы")}
//             key={index}
//             style={{
//               paddingHorizontal: 10,
//               paddingVertical: 20,
//               borderRadius: 10,
//               borderWidth: 0.2,
//               borderColor: "#b8b8b8",
//             }}
//           >
//             <View style={{ flexDirection: "column", rowGap: 20 }}>
//               <View
//                 style={{
//                   backgroundColor: "#fff",
//                   padding: 10,
//                   borderRadius: 10,
//                   alignSelf: "flex-start",
//                 }}
//               >
//                 <View>
//                   <Text
//                     style={{ color: "grey", marginBottom: 10, fontSize: 12 }}
//                   >
//                     {question.date}
//                   </Text>
//                   <Text style={{ fontSize: 16, lineHeight: 22 }}>
//                     {question.text}
//                   </Text>
//                 </View>
//               </View>
//               <View
//                 style={{
//                   backgroundColor: "#e3e3e3",
//                   padding: 10,
//                   borderRadius: 10,
//                   alignSelf: "flex-end",
//                 }}
//               >
//                 <View>
//                   <Text
//                     style={{ color: "grey", marginBottom: 10, fontSize: 12 }}
//                   >
//                     {question.date}
//                   </Text>
//                   <Text style={{ fontSize: 16, lineHeight: 22 }}>
//                     {question.text}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// };

// export default Questions;
import React from "react";
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
import QuestionsInput from "../../Questions/QuestionsInput";
const Questions = () => {
  const navigation = useNavigation();
  const onPress = (page) => {
    clickHandler(page);
  };
  const isDarkModeEnabled = useSelector(
    (state) => state.theme.isDarkModeEnabled
  );
  const reviewsData = [
    {
      name: "User 1",
      date: "01.01.2024",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      imageUri:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    },
    {
      name: "User 2",
      date: "01.01.2024",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      imageUri:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    },
    {
      name: "User 3",
      date: "01.01.2024",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      imageUri:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 20,
          borderRadius: 10,
          borderWidth: 0.2,
          borderColor: "#b8b8b8",
          width: 330,
        }}
      >
        <View style={{ flexDirection: "column", rowGap: 20 }}>
          <View
            style={{
              backgroundColor: "#f7f7f7",
              padding: 10,
              borderRadius: 10,
              alignSelf: "flex-start",
            }}
          >
            <View>
              <Text style={{ color: "grey", marginBottom: 10, fontSize: 12 }}>
                {item.date}
              </Text>
              <Text style={{ lineHeight: 22 }}>{item.text}</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#f0f0f0",
              padding: 10,
              borderRadius: 10,
              alignSelf: "flex-end",
            }}
          >
            <View>
              <Text style={{ color: "grey", marginBottom: 10, fontSize: 12 }}>
                {item.date}
              </Text>
              <Text style={{ lineHeight: 22 }}>{item.text}</Text>
            </View>
          </View>
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
        <Text style={{ fontSize: 22, fontWeight: 500 }}>Вопросы</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Все вопросы")}>
          <Text style={{ color: "#000", paddingHorizontal: 10 }}>
            Все вопросы
          </Text>
        </TouchableOpacity>
      </View>
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
        <QuestionsInput />
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

export default Questions;
