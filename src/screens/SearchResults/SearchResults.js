import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef, useMemo, useEffect } from "react";

import { ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useDispatch, useSelector } from "react-redux";

import Objects from "../../components/ObjectsComponent/Objects";
import SafeAreaWrapper from "../../components/SafeAreaWrapper/SafeAreaWrapper";
import ActionFilter from "../../components/ActionSheet/ActionFilter/ActionFilter";
import { fetchSearchResults } from "../../Store/searchSlice/searchSlice";
import { useRoute } from "@react-navigation/core";
import CustomText from "../../components/CustomText/CustomText";

const SearchResults = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.search.results);
  const route = useRoute();
  useEffect(() => {
    fetchSearchResults();
  }, [dispatch]);

  const actionSheetRef = useRef(null);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
      }}
      contentContainerStyle={{ paddingVertical: 20 }}
    >
      <SafeAreaWrapper>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <CustomText style={{ fontSize: 25 }}>Результаты поиска</CustomText>
          <TouchableOpacity onPress={() => actionSheetRef.current?.show()}>
            <Ionicons
              name="filter"
              style={{ fontSize: 30, color: "#616992" }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "column", rowGap: 20 }}>
          {searchResults && searchResults.Data ? (
            searchResults.Data.length > 0 ? (
              searchResults.Data.map((result) => (
                <Objects key={result.ID} items={result} />
              ))
            ) : (
              <Text>Нет доступных результатов</Text>
            )
          ) : (
            <Text>Загрузка данных...</Text>
          )}
        </View>
        <ActionFilter
          actionSheetRef={actionSheetRef}
          title={route?.params?.title}
        />
      </SafeAreaWrapper>
    </ScrollView>
  );
};

export default SearchResults;
