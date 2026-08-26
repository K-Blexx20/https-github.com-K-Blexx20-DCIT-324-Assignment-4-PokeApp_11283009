import React, { useState } from "react";
import { SafeAreaView, View, Text, Switch, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";

const OPTIONS = [
  { key: "notifications", label: "Push Notifications", icon: "notifications-outline" },
  { key: "sound", label: "Sound Effects", icon: "volume-high-outline" },
  { key: "darkMode", label: "Dark Mode", icon: "moon-outline" },
];

export default function SettingsScreen() {
  const [values, setValues] = useState({
    notifications: true,
    sound: true,
    darkMode: false,
  });

  const toggle = (key) => setValues((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.list}>
        {OPTIONS.map((option) => (
          <View key={option.key} style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons name={option.icon} size={18} color={COLORS.primary} />
              <Text style={styles.label}>{option.label}</Text>
            </View>
            <Switch
              value={values[option.key]}
              onValueChange={() => toggle(option.key)}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        ))}
      </View>
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
  list: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 10,
  },
});
