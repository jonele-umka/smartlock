import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Switch,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import i18n from "../i18n/i18n";
import Ionicons from "react-native-vector-icons/Ionicons";

const QuestionsInput = () => {
  const [modalQuestions, setModalQuestions] = useState(false);
  const handleQuestions = () => {
    setModalQuestions(!modalQuestions);
  };
  return (
    <View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "#f0f0f0",
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderRadius: 10,
            
          }}
          onPress={handleQuestions}
        >
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Задать вопрос
          </Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={modalQuestions}>
        <Pressable
          onPress={handleQuestions}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: "95%",
              backgroundColor: "#fff",
              borderRadius: 20,
              paddingVertical: 30,
              paddingHorizontal: 20,
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
            <View style={{ marginBottom: 20 }}>
              <View style={{ marginBottom: 20 }}>
                <Text style={{ marginBottom: 10, fontSize: 18 }}>
                  Электронная почта
                </Text>
                <View
                  style={{
                    borderColor: "#e3e3e3",
                    borderWidth: 1,
                    padding: 5,
                    borderRadius: 10,
                  }}
                >
                  <TextInput
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 5,
                      fontSize: 16,
                    }}
                    underlineColorAndroid="transparent"
                    placeholder="Задайте вопрос"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                  />
                </View>
              </View>
              <View>
                <Text style={{ marginBottom: 10, fontSize: 18 }}>
                  Ваш вопрос
                </Text>
                <View
                  style={{
                    borderColor: "#e3e3e3",
                    borderWidth: 1,
                    padding: 5,
                    borderRadius: 10,
                  }}
                >
                  <TextInput
                    style={{
                      height: 100,
                      fontSize: 16,
                    }}
                    underlineColorAndroid="transparent"
                    placeholder="Задайте вопрос"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleQuestions}
              style={{
                backgroundColor: "green",
                paddingVertical: 15,
                paddingHorizontal: 20,
                borderRadius: 10,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  textAlign: "center",
                  fontWeight: 500,
                }}
              >
                Отправить
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default QuestionsInput;
