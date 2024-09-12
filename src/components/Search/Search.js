import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { fetchSearchResults } from "../../Store/searchSlice/searchSlice";
import { useDispatch } from "react-redux";
import SafeAreaWrapper from "../SafeAreaWrapper/SafeAreaWrapper";
import ActionFilter from "../ActionSheet/ActionFilter/ActionFilter";

export default function Search() {
  const { control, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const actionSheetRef = useRef(null);
  const onSubmit = (data) => {
    const filters = {
      title: data.title || "",
    };

    dispatch(fetchSearchResults(filters));
    navigation.navigate("Результаты поиска", { title: filters.title });
    // navigation.navigate("Результаты поиска", { filters });
  };
  return (
    <SafeAreaWrapper>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          columnGap: 10,
          borderWidth: 1,
          borderColor: "rgba(97, 105, 146, 0.2)",
          backgroundColor: "rgba(97, 105, 146, 0.040)",
          paddingHorizontal: 10,
          marginHorizontal: 10,
          marginVertical: 20,
          borderRadius: 40,
          paddingVertical: 10,
          flex: 1,
        }}
      >
        <Controller
          control={control}
          name="title"
          rules={{ required: true }}
          render={({ field }) => (
            <TextInput
              placeholder={"Поиск"}
              placeholderTextColor="#616992"
              onChangeText={field.onChange}
              value={field.value}
              style={{
                fontSize: 16,
                flex: 1,
              }}
            />
          )}
        />

        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <EvilIcons name="search" style={{ color: "#616992", fontSize: 30 }} />
        </TouchableOpacity>
      </View>

      <ActionFilter actionSheetRef={actionSheetRef} />
    </SafeAreaWrapper>
  );
}
