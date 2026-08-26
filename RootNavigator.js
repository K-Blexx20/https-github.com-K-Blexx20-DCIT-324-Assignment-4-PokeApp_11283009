import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootDrawer from "./RootDrawer";
import PokemonDetailsScreen from "../screens/PokemonDetailsScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* RootDrawer holds the drawer (Pokedex tabs, Settings, Help &
            Support) plus a Logout action. PokemonDetails is pushed above
            it in the stack so it covers the whole screen, including the
            tab bar and drawer, when opened from a card. */}
        <Stack.Screen name="RootDrawer" component={RootDrawer} />
        <Stack.Screen name="PokemonDetails" component={PokemonDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
