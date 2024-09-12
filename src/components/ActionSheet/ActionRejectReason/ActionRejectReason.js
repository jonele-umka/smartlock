import React, { useRef, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import CustomText from "../../CustomText/CustomText";

const ActionRejectReason = ({ onReject, applicationID, visible, onClose }) => {
  const [rejectReason, setRejectReason] = useState("");
  const actionSheetRef = useRef(null);

  useEffect(() => {
    if (visible) {
      actionSheetRef.current?.setModalVisible(true);
    } else {
      actionSheetRef.current?.hide();
    }
  }, [visible]);

  const handleReject = () => {
    onReject(applicationID, rejectReason);
    onClose();
  };

  return (
    <ActionSheet ref={actionSheetRef} onClose={onClose}>
      <View
        style={{ paddingTop: 20, paddingBottom: 40, paddingHorizontal: 10 }}
      >
        <CustomText
          style={{ fontSize: 18, fontWeight: "500", marginBottom: 20 }}
        >
          Причина отклонения
        </CustomText>
        <TextInput
          style={{
            height: 100,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            textAlignVertical: "top",
          }}
          multiline
          placeholder="Введите причину..."
          value={rejectReason}
          onChangeText={setRejectReason}
        />
        <TouchableOpacity
          onPress={handleReject}
          style={{
            backgroundColor: "#4B5DFF",
            padding: 15,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Text
            style={{ color: "#fff", textAlign: "center", fontWeight: "500" }}
          >
            Отправить
          </Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
};

export default ActionRejectReason;
