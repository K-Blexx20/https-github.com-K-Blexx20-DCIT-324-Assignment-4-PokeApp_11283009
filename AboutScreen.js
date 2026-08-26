import React from "react";
import { SafeAreaView, View, Text, Image, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Image
          source={{ uri: "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" }}
          style={styles.logo}
        />
        <Text style={styles.title}>About Pokedex</Text>
        <Text style={styles.paragraph}>
          This app was built for DCIT 324 to practice reusable components,
          local and shared state, multi-screen navigation, and fetching
          live data from a public API.
        </Text>
        <Text style={styles.paragraph}>
          Pokemon data is provided by PokeAPI (pokeapi.co), a free,
          open, RESTful API — no signup or key required.
        </Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Built with</Text>
          <Text style={styles.infoValue}>React Native + Expo</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Navigation</Text>
          <Text style={styles.infoValue}>Stack, Bottom Tabs, Drawer</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Data source</Text>
          <Text style={styles.infoValue}>pokeapi.co</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 24,
    alignItems: "center",
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.subtext,
    textAlign: "center",
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLabel: {
    fontSize: 13,
    color: COLORS.subtext,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
  },
});
