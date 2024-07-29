import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CameraOrImages = ({
  isVisible,
  onClose,
  onPickCamera,
  onPickGallery,
}) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onPickCamera} style={styles.optionButton}>
            <Text style={styles.optionText}>Открыть камеру</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPickGallery} style={styles.optionButton}>
            <Text style={styles.optionText}>Выбрать из галереи</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.optionButton}>
            <Text style={styles.optionText}>Отмена</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  optionButton: {
    padding: 15,
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
    color: "#007BFF",
  },
});

export default CameraOrImages;
