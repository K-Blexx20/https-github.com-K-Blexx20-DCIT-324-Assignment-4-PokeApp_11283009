import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";

const FAQS = [
  {
    question: "Where does the Pokemon data come from?",
    answer: "All Pokemon data and artwork is fetched live from PokeAPI (pokeapi.co).",
  },
  {
    question: "Why is a Pokemon missing its details?",
    answer:
      "If your connection drops mid-request, the Details screen shows a retry button — tap it to fetch again.",
  },
  {
    question: "How do favourites work?",
    answer:
      "Tap the heart icon on any card to mark it as a favourite for this session.",
  },
];

export default function HelpSupportScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Help & Support</Text>
      {FAQS.map((item) => (
        <View key={item.question} style={styles.card}>
          <View style={styles.questionRow}>
            <Ionicons name="help-circle-outline" size={18} color={COLORS.primary} />
            <Text style={styles.question}>{item.question}</Text>
          </View>
          <Text style={styles.answer}>{item.answer}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 12,
  },
  questionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  question: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginLeft: 8,
    flex: 1,
  },
  answer: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.subtext,
  },
});
