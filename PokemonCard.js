import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";

// Reusable card. `name`, `image`, and `number` come in as props (per the
// assignment brief), so this same component could be reused anywhere a
// Pokemon needs to be displayed. The favourite toggle is local UI state —
// it doesn't need to be shared with any other screen, so it lives here.
export default function PokemonCard({ name, image, number, onPress }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.card} onPress={onPress}>
      <TouchableOpacity
        style={styles.favoriteButton}
        activeOpacity={0.7}
        onPress={() => setIsFavorite((prev) => !prev)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={18}
          color={isFavorite ? COLORS.primary : COLORS.subtext}
        />
      </TouchableOpacity>

      <Image source={{ uri: image }} style={styles.image} />

      <Text style={styles.number}>#{String(number).padStart(3, "0")}</Text>
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    marginBottom: 8,
  },
  number: {
    fontSize: 11,
    color: COLORS.subtext,
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    textTransform: "capitalize",
  },
});
