import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PokemonCard from "../components/PokemonCard";
import { fetchPokemonList } from "../api/pokeApi";
import { COLORS } from "../theme/colors";

export default function HomeScreen({ navigation }) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPokemon = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchPokemonList(40, 0);
      setPokemon(list);
    } catch (err) {
      setError("Couldn't load Pokemon. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch the list once, when the screen first mounts.
  useEffect(() => {
    loadPokemon();
  }, [loadPokemon]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} hitSlop={12}>
          <Ionicons name="menu-outline" size={26} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Pokedex</Text>
        <View style={{ width: 26 }} />
      </View>

      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.helperText}>Loading Pokemon...</Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.centered}>
          <Ionicons name="alert-circle-outline" size={36} color={COLORS.subtext} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadPokemon} activeOpacity={0.8}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={pokemon}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PokemonCard
              name={item.name}
              image={item.image}
              number={item.id}
              onPress={() =>
                navigation.navigate("PokemonDetails", { name: item.name, id: item.id })
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  row: {
    justifyContent: "space-between",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  helperText: {
    marginTop: 10,
    fontSize: 13,
    color: COLORS.subtext,
  },
  errorText: {
    marginTop: 10,
    fontSize: 14,
    color: COLORS.subtext,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  retryText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
});
