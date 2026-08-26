import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import MainTabs from "./MainTabs";
import SettingsScreen from "../screens/SettingsScreen";
import HelpSupportScreen from "../screens/HelpSupportScreen";
import { COLORS } from "../theme/colors";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: () => Alert.alert("Logged out") },
    ]);
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.profile}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100?img=12" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Alex Johnson</Text>
        <Text style={styles.email}>alex.johnson@example.com</Text>
      </View>

      {/* Renders a drawer item for every Drawer.Screen below */}
      <DrawerItemList {...props} />

      <DrawerItem
        label="Logout"
        icon={({ size }) => <Ionicons name="log-out-outline" size={size} color={COLORS.primary} />}
        labelStyle={styles.logoutLabel}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
}

export default function RootDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.text,
        drawerLabelStyle: { fontSize: 14, fontWeight: "600" },
      }}
    >
      <Drawer.Screen
        name="Pokedex"
        component={MainTabs}
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} /> }}
      />
      <Drawer.Screen
        name="Help & Support"
        component={HelpSupportScreen}
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="help-circle-outline" size={size} color={color} /> }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  profile: {
    alignItems: "center",
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },
  email: {
    fontSize: 12,
    color: COLORS.subtext,
    marginTop: 2,
  },
  logoutLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },
});
