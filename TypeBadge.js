import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { typeColor } from "../theme/colors";

export default function TypeBadge({ type }) {
  return (
    <View style={[styles.badge, { backgroundColor: typeColor(type) }]}>
      <Text style={styles.text}>{type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});
