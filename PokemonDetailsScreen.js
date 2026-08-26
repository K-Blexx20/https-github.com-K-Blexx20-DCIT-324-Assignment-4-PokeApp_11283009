import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TypeBadge from "../components/TypeBadge";
import { fetchPokemonDetails } from "../api/pokeApi";
import { COLORS, typeColor } from "../theme/colors";

// The tapped Pokemon's name/id arrives through route.params, set by
// HomeScreen's navigation.navigate("PokemonDetails", { name, id }) call.
export default function PokemonDetailsScreen({ route, navigation }) {
  const { name, id } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPokemonDetails(name || id);
      setDetails(data);
    } catch (err) {
      setError("Couldn't load this Pokemon's details.");
    } finally {
      setLoading(false);
    }
  }, [name, id]);

  useEffect(() => {
    loadDetails();
  }, [loadDetails]);

  const accentColor = details?.types?.[0] ? typeColor(details.types[0]) : COLORS.primary;

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={36} color={COLORS.subtext} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadDetails} activeOpacity={0.8}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 12 }}>
          <Text style={styles.backLink}>Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.hero, { backgroundColor: accentColor }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.heroNumber}>#{String(details.id).padStart(3, "0")}</Text>
        <Text style={styles.heroName}>{details.name}</Text>
        <Image source={{ uri: details.image }} style={styles.heroImage} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.typeRow}>
          {details.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{details.heightM.toFixed(1)} m</Text>
            <Text style={styles.statLabel}>Height</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{details.weightKg.toFixed(1)} kg</Text>
            <Text style={styles.statLabel}>Weight</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Base Stats</Text>
        {details.stats.map((stat) => (
          <View key={stat.name} style={styles.statLine}>
            <Text style={styles.statName}>{stat.name.replace("-", " ")}</Text>
            <View style={styles.statTrack}>
              <View
                style={[
                  styles.statFill,
                  { width: `${Math.min(100, (stat.value / 150) * 100)}%`, backgroundColor: accentColor },
                ]}
              />
            </View>
            <Text style={styles.statNumber}>{stat.value}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
    paddingHorizontal: 32,
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
  backLink: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "600",
  },
  hero: {
    paddingTop: 12,
    paddingBottom: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  backButton: {
    alignSelf: "flex-start",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  heroNumber: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    fontWeight: "600",
  },
  heroName: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    textTransform: "capitalize",
    marginBottom: 8,
  },
  heroImage: {
    width: 160,
    height: 160,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  typeRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.subtext,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
  },
  statLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statName: {
    width: 90,
    fontSize: 12,
    color: COLORS.subtext,
    textTransform: "capitalize",
  },
  statTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  statFill: {
    height: 8,
    borderRadius: 4,
  },
  statNumber: {
    width: 30,
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "right",
  },
});
