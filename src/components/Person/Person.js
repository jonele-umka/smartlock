import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Switch,
} from "react-native";
import React, { useState } from "react";
import i18n from "../i18n/i18n";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

const Person = () => {
  // гости
  const [modalQuests, setModalQuests] = useState(false);
  const handleQuests = () => {
    setModalQuests(!modalQuests);
  };
  // количество взрослых
  const [quantityPerson, setQuantityPerson] = useState(1);

  const increaseQuantityPerson = () => {
    setQuantityPerson(quantityPerson + 1);
  };

  const decreaseQuantityPerson = () => {
    if (quantityPerson > 1) {
      setQuantityPerson(quantityPerson - 1);
    }
  };

  // количество детей
  const [quantityKids, setQuantityKids] = useState(0);

  const increaseQuantityKids = () => {
    setQuantityKids(quantityKids + 1);
  };

  const decreaseQuantityKids = () => {
    if (quantityKids > 0) {
      setQuantityKids(quantityKids - 1);
    }
  };
  // switch
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = async () => {
    const newIsEnabled = !isEnabled;
    setIsEnabled(newIsEnabled);
  };
  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={handleQuests}
          style={{
            borderWidth: 1,
            borderColor: "#b8b8b8",
            padding: 15,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 5,
              justifyContent: "center",
            }}
          >
            <Ionicons name="person" style={{ fontSize: 18 }} />
            <Text>
              {quantityPerson} {quantityPerson && "взрослых"}{" "}
              {quantityKids && quantityKids !== 0
                ? `${quantityKids} детей`
                : ""}{" "}
            </Text>
          </View>
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
                  onPress={decreaseQuantityPerson}
                  style={{
                    backgroundColor: "#02AAB0",
                    borderRadius: 8,
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 18 }}>-</Text>
                </TouchableOpacity>

                <View>
                  <Text style={{ fontSize: 20 }}>{quantityPerson}</Text>
                </View>

                <TouchableOpacity
                  onPress={increaseQuantityPerson}
                  style={{
                    backgroundColor: "#02AAB0",
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
                  onPress={decreaseQuantityKids}
                  style={{
                    backgroundColor: "#02AAB0",
                    borderRadius: 8,
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 18 }}>-</Text>
                </TouchableOpacity>

                <View>
                  <Text style={{ fontSize: 20 }}>{quantityKids}</Text>
                </View>

                <TouchableOpacity
                  onPress={increaseQuantityKids}
                  style={{
                    backgroundColor: "#02AAB0",
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
                trackColor={{ false: "#b8b8b8", true: "#02AAB0" }}
                thumbColor={isEnabled && "#f4f3f4"}
                ios_backgroundColor="#b8b8b8"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <TouchableOpacity
              onPress={handleQuests}
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
                  Сохранить
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Person;
