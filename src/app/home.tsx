import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme/theme";
import {showRewardedAd } from "../useCase/showRewardedAd";
import { showInterstitialAd } from "../useCase/showInterstitialAd";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Explore os nomes do Brasil</Text>
        <Text style={styles.subtitle}>Dados oficiais baseados no IBGE</Text>

        <View style={styles.cardsWrapper}>
          {/* Mais Usados */}
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              showRewardedAd(() => router.push("/topNames"))
            }
          >
            <Ionicons
              name="trending-up"
              size={38}
              color={theme.colors.primary}
            />
            <Text style={styles.cardTitle}>Mais Usados</Text>
            <Text style={styles.cardDesc}>
              Veja os nomes mais populares
            </Text>
          </TouchableOpacity>

          {/* Mais Raros */}
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              showRewardedAd(() => router.push("/bottomNames"))
            }
          >
            <Ionicons
              name="trending-down"
              size={38}
              color={theme.colors.secondary}
            />
            <Text style={styles.cardTitle}>Mais Raros</Text>
            <Text style={styles.cardDesc}>
              Descubra nomes pouco comuns
            </Text>
          </TouchableOpacity>

          {/* Pesquisar */}
          <TouchableOpacity
            style={styles.cardLarge}
            onPress={() =>
              showRewardedAd(() => router.push("/search"))
            }
          >
            <Ionicons
              name="search-circle"
              size={50}
              color={theme.colors.accent}
            />
            <Text style={styles.cardTitle}>Pesquisar Nome</Text>
            <Text style={styles.cardDesc}>
              Busque qualquer nome no Brasil
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ===========================
   ESTILOS
=========================== */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.light,
  },

  container: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 16,
    color: theme.colors.secondary,
    marginBottom: 30,
  },

  cardsWrapper: {
    gap: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  cardLarge: {
    backgroundColor: "#fff",
    padding: 26,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: theme.colors.primary,
  },

  cardDesc: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
