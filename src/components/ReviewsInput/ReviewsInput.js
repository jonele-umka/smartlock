// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   Pressable,
//   Switch,
//   TextInput,
// } from "react-native";
// import React, { useState } from "react";
// import i18n from "../i18n/i18n";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import * as ImagePicker from "expo-image-picker";

// const ReviewsInput = () => {
//   const [modalReviews, setModalReviews] = useState(false);
//   const handleReviews = () => {
//     setModalReviews(!modalReviews);
//   };
//   const pickImage = async () => {
//     try {
//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.All,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });

//       if (!result.canceled) {
//         setImage(result.assets[0].uri);
//         uploadImage(result.assets[0].uri);
//       }
//     } catch (error) {
//       console.error("Ошибка при выборе изображения", error);
//     }
//   };

//   return (
//     <View>
//       <View>
//         <TouchableOpacity
//           style={{
//             backgroundColor: "#f0f0f0",
//             paddingVertical: 15,
//             paddingHorizontal: 10,
//             borderRadius: 10,
//           }}
//           onPress={handleReviews}
//         >
//           <Text
//             style={{
//               color: "#000",
//               textAlign: "center",
//               fontSize: 16,
//               fontWeight: 500,
//             }}
//           >
//             Написать отзыв
//           </Text>
//         </TouchableOpacity>
//       </View>
//       <Modal animationType="fade" transparent={true} visible={modalReviews}>
//         <Pressable
//           onPress={handleReviews}
//           style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: "rgba(0,0,0,0.5)",
//           }}
//         >
//           <View
//             style={{
//               width: "95%",
//               backgroundColor: "#fff",
//               borderRadius: 20,
//               paddingVertical: 30,
//               paddingHorizontal: 20,
//               shadowColor: "#000",
//               shadowOffset: {
//                 width: 0,
//                 height: 2,
//               },
//               shadowOpacity: 0.25,
//               shadowRadius: 4,
//               elevation: 5,
//             }}
//           >
//             <View style={{ marginBottom: 20 }}>
//               <View style={{ marginBottom: 20 }}>
//                 <Text style={{ marginBottom: 10, fontSize: 18 }}>
//                   Электронная почта
//                 </Text>
//                 <View
//                   style={{
//                     borderColor: "#e3e3e3",
//                     borderWidth: 1,
//                     padding: 5,
//                     borderRadius: 10,
//                   }}
//                 >
//                   <TextInput
//                     style={{
//                       paddingVertical: 10,
//                       paddingHorizontal: 5,
//                       fontSize: 16,
//                     }}
//                     underlineColorAndroid="transparent"
//                     placeholder="Задайте вопрос"
//                     placeholderTextColor="grey"
//                     numberOfLines={10}
//                     multiline={true}
//                   />
//                 </View>
//               </View>
//               <View style={{ marginBottom: 20 }}>
//                 <Text style={{ marginBottom: 10, fontSize: 18 }}>
//                   Ваш отзыв
//                 </Text>
//                 <View
//                   style={{
//                     borderColor: "#e3e3e3",
//                     borderWidth: 1,
//                     padding: 5,
//                     borderRadius: 10,
//                   }}
//                 >
//                   <TextInput
//                     style={{
//                       height: 100,
//                       fontSize: 16,
//                     }}
//                     underlineColorAndroid="transparent"
//                     placeholder="Задайте вопрос"
//                     placeholderTextColor="grey"
//                     numberOfLines={10}
//                     multiline={true}
//                   />
//                 </View>
//               </View>
//               <View>
//                 <TouchableOpacity
//                   onPress={pickImage}
//                   style={{
//                     flexDirection: "row",
//                     alignItems: "center",
//                     columnGap: 10,
//                     backgroundColor: "#e3e3e3",
//                     paddingVertical: 10,
//                     paddingHorizontal: 10,
//                     borderRadius: 10,
//                     alignSelf: "flex-start",
//                   }}
//                 >
//                   <Ionicons name="image-outline" style={{ fontSize: 20 }} />
//                   <Text style={{ fontSize: 16 }}>Добавить изображение</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <TouchableOpacity
//               onPress={handleReviews}
//               style={{
//                 backgroundColor: "green",
//                 paddingVertical: 15,
//                 paddingHorizontal: 20,
//                 borderRadius: 10,
//                 alignSelf: "center",
//               }}
//             >
//               <Text
//                 style={{
//                   color: "#fff",
//                   fontSize: 18,
//                   textAlign: "center",
//                   fontWeight: 500,
//                 }}
//               >
//                 Отправить
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </Pressable>
//       </Modal>
//     </View>
//   );
// };

// export default ReviewsInput;
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AirbnbRating } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import CustomText from "../CustomText/CustomText";

const ReviewsInput = ({ actionSheetReviewRef, id, fetchReviews }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [rating, setRating] = useState(3);
  const API_URL = process.env.API_URL;
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    const requestBody = {
      Content: data.Content,
      Star: rating,
      AccommodationID: id,
    };
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setLoading(false);

        Toast.show({
          type: "success",
          position: "top",
          text1: "Успех",
          text2: "Отзыв отправлен",
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
        actionSheetReviewRef?.current?.hide();
        fetchReviews();
      } else {
        actionSheetReviewRef?.current?.hide();
        setLoading(false);

        Toast.show({
          type: "error",
          position: "top",
          text1: "Ошибка",
          text2: "Произошла ошибка при отправке отзыва",
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });
      }
    } catch (error) {
      setLoading(false);

      console.log(error);
      actionSheetReviewRef?.current?.hide();

      Toast.show({
        type: "error",
        position: "top",
        text1: "Ошибка",
        text2: `Произошла ошибка при отправке отзыва ${error}`,
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
    }
  };
  return (
    <View>
      <View style={{ marginBottom: 20 }}>
        <CustomText
          style={{
            fontSize: 18,
            marginBottom: 10,
          }}
        >
          Напишите отзыв
        </CustomText>
        <Controller
          control={control}
          name="Content"
          rules={{
            required: "Поле объязателен к заполнению",
          }}
          render={({ field }) => (
            <TextInput
              placeholder={"Чистый, удобный ..."}
              placeholderTextColor="#616992"
              onChangeText={(value) => {
                field.onChange(value);
              }}
              value={field.value}
              style={{
                borderWidth: 1,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 10,
                borderColor: "#dee2f1",
                color: "#1C2863",
                fontSize: 14,
              }}
            />
          )}
        />
        {errors.Content && (
          <CustomText style={{ color: "red", fontSize: 12, marginTop: 7 }}>
            {errors.Content.message}
          </CustomText>
        )}
      </View>

      <View style={{ marginBottom: 30 }}>
        <CustomText style={{ fontSize: 18, marginBottom: 10 }}>
          Оцените как все прошло?
        </CustomText>
        <View
          style={{
            borderColor: "#dee2f1",
            borderWidth: 1,
            paddingBottom: 20,
            paddingTop: 10,
            borderRadius: 10,
            paddingHorizontal: 10,
          }}
        >
          <AirbnbRating
            count={5}
            reviews={["Ужасно", "Плохо", "Нормально", "Хорошо", "Отлично"]}
            size={40}
            defaultRating={rating}
            onFinishRating={(value) => setRating(value)}
          />
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large"  color={"#4B5DFF"} />
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: "#4B5DFF",
            paddingVertical: 15,
            textAlign: "center",
            borderRadius: 10,
          }}
          onPress={handleSubmit(onSubmit)}
        >
          <CustomText
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            Отправить
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ReviewsInput;
