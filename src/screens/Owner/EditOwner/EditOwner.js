import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  ScrollView,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import Calendar from "../../../components/Calendar/Calendar";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

const EditOwner = () => {
  const { control, handleSubmit, setValue } = useForm();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSubmit = (data) => {
    console.log(data); // Действия при отправке формы (например, отправка данных на сервер)
  };

  const handleShowDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      setValue("date", selectedDate);
    }
  };
  const formattedDate = selectedDate.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flexDirection: "column", rowGap: 20, marginBottom: 20 }}>
        <View>
          <Text style={{ marginBottom: 10, fontSize: 18 }}>Фамилия</Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: "#b8b8b8",
              padding: 5,
              borderRadius: 10,
            }}
          >
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Фамилия"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{
                    fontSize: 16,
                    padding: 5,
                  }}
                />
              )}
              name="surname"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
        </View>
        <View>
          <Text style={{ marginBottom: 10, fontSize: 18 }}>Имя</Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: "#b8b8b8",
              padding: 5,
              borderRadius: 10,
            }}
          >
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Фамилия"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{
                    fontSize: 16,
                    padding: 5,
                  }}
                />
              )}
              name="surname"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
        </View>
        <View>
          <Text style={{ marginBottom: 10, fontSize: 18 }}>Отчество</Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: "#b8b8b8",
              padding: 5,
              borderRadius: 10,
            }}
          >
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Фамилия"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{
                    fontSize: 16,
                    padding: 5,
                  }}
                />
              )}
              name="surname"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
        </View>
        <View>
          <Text style={{ marginBottom: 10, fontSize: 18 }}>Дата рождения</Text>

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
        </View>
        <View>
          <Text style={{ marginBottom: 10, fontSize: 18 }}>
            Номер документа
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#b8b8b8",
              padding: 5,
              borderRadius: 10,
            }}
          >
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Фамилия"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{
                    fontSize: 16,
                    padding: 5,
                  }}
                />
              )}
              name="surname"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
        </View>

        <View>
          <Text style={{ marginBottom: 10, fontSize: 18 }}>
            Персональный номер
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#b8b8b8",
              padding: 5,
              borderRadius: 10,
            }}
          >
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Фамилия"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{
                    fontSize: 16,
                    padding: 5,
                  }}
                />
              )}
              name="surname"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
        </View>
        <View>
          <Text style={{ marginBottom: 10, fontSize: 18 }}>Орган выдачи</Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: "#b8b8b8",
              padding: 5,
              borderRadius: 10,
            }}
          >
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Фамилия"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{
                    fontSize: 16,
                    padding: 5,
                  }}
                />
              )}
              name="surname"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
        </View>
      </View>
      <View>
        <Text style={{ marginBottom: 10, fontSize: 18 }}>
          Дата выдачи / дата окончания
        </Text>

        <Calendar />
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={{
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          marginTop: 30,
          marginBottom: 20,
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
            Сохранить
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <Modal animationType="fade" transparent={true} visible={showDatePicker}>
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
              backgroundColor: "#f7f7f7",
              borderRadius: 20,
              paddingHorizontal: 10,
              paddingVertical: 20,
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
    </ScrollView>
  );
};

export default EditOwner;
