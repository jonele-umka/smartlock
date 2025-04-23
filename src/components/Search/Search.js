// import React, { useState } from "react";
// import { TextInput, TouchableOpacity, View } from "react-native";
// import { useForm, Controller } from "react-hook-form";
// import EvilIcons from "react-native-vector-icons/EvilIcons";
// import { fetchSearchResults } from "../../Store/searchSlice/searchSlice";
// import { useDispatch } from "react-redux";
// import SafeAreaWrapper from "../SafeAreaWrapper/SafeAreaWrapper";
// import FilterModal from "../Modal/FilterModal/FilterModal";
// import FontAwesome from "react-native-vector-icons/FontAwesome";

// export default function Search() {
//   const { control, handleSubmit, reset } = useForm();
//   const dispatch = useDispatch();

//   const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);
//   const [title, setTitle] = useState("");

//   const onSubmit = (data) => {
//     const filters = {
//       title: data.title || "",
//     };
//     setTitle(filters.title);
//     dispatch(fetchSearchResults(filters));
//     reset();
//   };

//   const showActionSheet = () => {
//     setIsActionSheetVisible(true);
//   };

//   const hideActionSheet = () => {
//     setIsActionSheetVisible(false);
//   };

//   return (
//     <SafeAreaWrapper>
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//           borderWidth: 1,
//           borderColor: "rgba(97, 105, 146, 0.2)",
//           backgroundColor: "rgba(97, 105, 146, 0.040)",
//           paddingHorizontal: 10,
//           marginHorizontal: 10,
//           marginVertical: 20,
//           borderRadius: 40,
//           paddingVertical: 10,
//         }}
//       >
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             flex: 1,
//             gap: 10,
//           }}
//         >
//           <TouchableOpacity onPress={showActionSheet}>
//             <FontAwesome
//               name="sliders"
//               style={{ color: "#616992", fontSize: 25 }}
//             />
//           </TouchableOpacity>
//           <Controller
//             control={control}
//             name="title"
//             rules={{ required: true }}
//             render={({ field }) => (
//               <TextInput
//                 placeholder={"Поиск"}
//                 placeholderTextColor="#616992"
//                 onChangeText={(text) => {
//                   field.onChange(text);
//                   setTitle(text);
//                 }}
//                 value={title}
//                 style={{
//                   fontSize: 16,
//                   flex: 1,
//                 }}
//               />
//             )}
//           />
//         </View>

//         <TouchableOpacity onPress={handleSubmit(onSubmit)}>
//           <EvilIcons name="search" style={{ color: "#616992", fontSize: 30 }} />
//         </TouchableOpacity>
//       </View>
//       <FilterModal
//         isVisible={isActionSheetVisible}
//         onClose={hideActionSheet}
//         title={title}
//       />
//     </SafeAreaWrapper>
//   );
// }
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
// import EvilIcons from "react-native-vector-icons/EvilIcons";
import { fetchSearchResults } from "../../Store/searchSlice/searchSlice";
import { useDispatch } from "react-redux";
import FilterModal from "../Modal/FilterModal/FilterModal";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import i18n from "../../../i18n/i18n";

export default function Search() {
  const { control } = useForm();
  const dispatch = useDispatch();

  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);
  const [title, setTitle] = useState("");

  const handleTitleChange = (text) => {
    setTitle(text);
    const filters = {
      title: text || "",
    };
    dispatch(fetchSearchResults(filters));
  };

  const showActionSheet = () => {
    setIsActionSheetVisible(true);
  };

  const hideActionSheet = () => {
    setIsActionSheetVisible(false);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: "rgba(97, 105, 146, 0.2)",
          backgroundColor: "rgba(97, 105, 146, 0.040)",
          paddingHorizontal: 10,
          marginVertical: 20,
          borderRadius: 40,
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            gap: 10,
          }}
        >
          <Controller
            control={control}
            name="title"
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                placeholder={i18n.t("search")}
                placeholderTextColor="#616992"
                onChangeText={(text) => {
                  field.onChange(text);
                  handleTitleChange(text);
                }}
                value={title}
                style={{
                  fontSize: 16,
                  flex: 1,
                }}
              />
            )}
          />
          <TouchableOpacity onPress={showActionSheet}>
            <FontAwesome
              name="sliders"
              style={{ color: "#616992", fontSize: 25 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FilterModal
        isVisible={isActionSheetVisible}
        onClose={hideActionSheet}
        title={title}
      />
    </View>
  );
}
