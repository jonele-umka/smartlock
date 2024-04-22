import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import i18n from "../i18n/i18n";

import Calendar from "../Calendar/Calendar";
import Person from "../Person/Person";
import { LinearGradient } from "expo-linear-gradient";

export default function Search() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigation = useNavigation();
  // const loading = useSelector((state) => state.signIn.loading);
  const snapPoints = useMemo(() => ["10%", "50%"]);

  // const handleSheetChanges = useCallback((index) => {
  //   if (index === 0) {
  //     bottomSheetRef.current?.collapse();
  //   } else {
  //     bottomSheetRef.current?.expand();
  //   }
  // }, []);
  const bottomSheetRef = useRef(null);
  const handleSheetChanges = useCallback((index) => {
    if (index === 0) {
      bottomSheetRef.current?.collapse();
    } else {
      bottomSheetRef.current?.expand();
    }
  }, []);

  // const searchBlockOpacity = useRef(new Animated.Value(1)).current;
  // const [searchBlockVisible, setSearchBlockVisible] = useState(true);
  // const animateSearchBlock = (show) => {
  //   Animated.timing(searchBlockOpacity, {
  //     toValue: show ? 1 : 0,
  //     duration: 500,
  //     useNativeDriver: false,
  //   }).start(() => {
  //     setSearchBlockVisible(show);
  //   });
  // };
  // const hotelsBlockOpacity = useRef(new Animated.Value(0)).current;
  // const [hotelsBlockVisible, setHotelsBlockVisible] = useState(false);

  // const animateHotelsBlock = (show) => {
  //   Animated.timing(hotelsBlockOpacity, {
  //     toValue: show ? 1 : 0,
  //     duration: 500,
  //     useNativeDriver: false,
  //   }).start(() => {
  //     setHotelsBlockVisible(show);
  //   });
  // };
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={false}
        handleIndicatorStyle={{ backgroundColor: "#000" }}
        backgroundStyle={{ backgroundColor: "#fff" }}
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <View style={{ padding: 10 }}>
          <Text
            style={
              { color: "#000", marginBottom: 20, fontSize: 20 }
              //   [
              //   isDarkModeEnabled ? { color: "#fff" } : { color: "#000" },
              // ]
            }
          >
            {i18n.t("searchHotel")}
          </Text>
          <View style={{ marginBottom: 10 }}>
            <Controller
              control={control}
              name="hotel"
              rules={{ required: true }}
              render={({ field }) => (
                <TextInput
                  placeholder={`${i18n.t("city")}, ${i18n.t("hotel")}`}
                  placeholderTextColor="#b8b8b8"
                  onChangeText={(value) => {
                    field.onChange(value);
                  }}
                  value={field.value}
                  style={{
                    color: "#000",
                    fontSize: 14,
                    borderWidth: 1,
                    borderColor: "#b8b8b8",
                    paddingVertical: Platform.OS === "android" ? 10 : 15,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                  }}
                />
              )}
            />
            {errors.hotel && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
                {i18n.t("enterEmail")}
              </Text>
            )}
          </View>
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: 10,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#b8b8b8",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <TouchableOpacity onPress={handleShowDatePicker}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 10,
                  }}
                >
                  <Ionicons
                    name="calendar-outline"
                    style={{ color: "#000", fontSize: 25 }}
                  />
                  {selectedDate && <Text>{formattedDate}</Text>}
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#b8b8b8",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <TouchableOpacity onPress={handleShowDateTwoPicker}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 10,
                  }}
                >
                  <Ionicons
                    name="calendar-outline"
                    style={{ color: "#000", fontSize: 25 }}
                  />
                  {selectedTwoDate && <Text>{formattedDate}</Text>}
                </View>
              </TouchableOpacity>
            </View>
          </View> */}
          <Calendar />
          <Person />
          {/* <Modal
            animationType="fade"
            transparent={true}
            visible={showDatePicker}
          >
            <Pressable
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleShowDatePicker}
            >
              <View
                style={{
                  backgroundColor: "black",
                  borderRadius: 20,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <DateTimePicker
                  value={selectedDate || new Date()}
                  mode="date"
                  display={Platform.OS === "android" ? "default" : "spinner"}
                  onChange={handleDateChange}
                />
              </View>
            </Pressable>
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={showDateTwoPicker}
          >
            <Pressable
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleShowDateTwoPicker}
            >
              <View
                style={{
                  backgroundColor: "black",
                  borderRadius: 20,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <DateTimePicker
                  value={selectedTwoDate || new Date()}
                  mode="date"
                  display={Platform.OS === "android" ? "default" : "spinner"}
                  onChange={handleDateTwoChange}
                />
              </View>
            </Pressable>
          </Modal> */}
          {/* {showDatePicker && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display={Platform.OS === "android" ? "default" : "spinner"}
              onChange={handleDateChange}
            />
          )}
          {showDateTwoPicker && (
            <DateTimePicker
              value={selectedTwoDate || new Date()}
              mode="date"
              display={Platform.OS === "android" ? "default" : "spinner"}
              onChange={handleDateTwoChange}
            />
          )} */}
          {/* <View style={{ marginBottom: 25 }}>
            <TouchableOpacity
              onPress={handleQuests}
              style={{
                borderWidth: 1,
                borderColor: "#b8b8b8",
                padding: 15,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "#b8b8b8" }}>Гости</Text>
            </TouchableOpacity>
          </View>
          <Modal animationType="fade" transparent={true} visible={modalQuests}>
            <Pressable
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  padding: 20,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    columnGap: 100,
                    marginBottom: 30,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontWeight: 600,
                        fontSize: 18,
                        marginBottom: 3,
                      }}
                    >
                      Взрослые
                    </Text>
                    <Text style={{ color: "#b8b8b8" }}>От 18 лет</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={decreaseQuantity}
                      style={{
                        backgroundColor: "#000",
                        borderRadius: 8,
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 18 }}>-</Text>
                    </TouchableOpacity>

                    <View>
                      <Text style={{ fontSize: 20 }}>{quantity}</Text>
                    </View>

                    <TouchableOpacity
                      onPress={increaseQuantity}
                      style={{
                        backgroundColor: "#000",
                        borderRadius: 8,
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 18 }}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    columnGap: 50,
                    marginBottom: 30,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontWeight: 600,
                        fontSize: 18,
                        marginBottom: 3,
                      }}
                    >
                      Дети
                    </Text>
                    <Text style={{ color: "#b8b8b8" }}>До 18 лет</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={decreaseQuantity}
                      style={{
                        backgroundColor: "#000",
                        borderRadius: 8,
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 18 }}>-</Text>
                    </TouchableOpacity>

                    <View>
                      <Text style={{ fontSize: 20 }}>{quantity}</Text>
                    </View>

                    <TouchableOpacity
                      onPress={increaseQuantity}
                      style={{
                        backgroundColor: "#000",
                        borderRadius: 8,
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 18 }}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text>{i18n.t("animals")}</Text>

                  <Switch
                    trackColor={{ false: "#b8b8b8", true: "#000" }}
                    thumbColor={isEnabled && "#f4f3f4"}
                    ios_backgroundColor="#b8b8b8"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
                <TouchableOpacity
                  onPress={handleQuests}
                  style={{
                    alignSelf: "flex-end",
                    backgroundColor: "#000",
                    marginTop: 20,
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "#fff" }}>{i18n.t("save")}</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal> */}

          <TouchableOpacity
            // onPress={handleSubmit(onSubmit)}
            onPress={() => {
              navigation.navigate("Результаты поиска");
            }}
            style={{
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              marginTop: 30,
            }}
          >
            <LinearGradient
              colors={["#02AAB0", "#00CDAC"]}
              style={{
                paddingVertical: 15,
                textAlign: "center",
                borderRadius: 10,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                {i18n.t("search")}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* {!searchBlockVisible && (
          <Animated.View
            style={{
              opacity: hotelsBlockOpacity,
              flexDirection: "column",
              rowGap: 20,
            }}
          >
            <View style={{ height: 299, backgroundColor: "#000" }}>
              <Text>fefee</Text>
            </View>
            <View style={{ height: 299, backgroundColor: "#000" }}>
              <Text>fefee</Text>
            </View>
          </Animated.View>
        )} */}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
    color: "#fff",
  },
});
