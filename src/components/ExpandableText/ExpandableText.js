import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ExpandableText = ({
  text = "",
  numberOfWords = 20,
  style = {},
  toggleTextStyle = {},
  showMoreText = "Показать полностью",
  showLessText = "Скрыть",
}) => {
  const [expanded, setExpanded] = useState(false);
  const words = text.split(" ");
  const isLong = words.length > numberOfWords;

  const toggle = () => setExpanded(!expanded);

  const renderText = () => {
    if (!expanded && isLong) {
      return `${words.slice(0, numberOfWords).join(" ")}...`;
    }
    return text;
  };

  return (
    <View>
      <Text style={[{ color: "#616992" }, style]}>{renderText()}</Text>
      {isLong && (
        <TouchableOpacity onPress={toggle}>
          <Text
            style={[
              {
                color: "#005fb8",
                fontSize: 16,
                marginTop: 10,
                fontWeight: "500",
              },
              toggleTextStyle,
            ]}
          >
            {expanded ? showLessText : showMoreText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ExpandableText;
