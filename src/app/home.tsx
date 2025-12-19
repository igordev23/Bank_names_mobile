import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { RewardedAd, RewardedAdEventType, AdEventType, TestIds } from "react-native-google-mobile-ads"; // Correção aqui
import { theme } from "../theme/theme";

/* ===========================
   CONFIGURAÇÃO DO ANÚNCIO PREMIADO
=========================== */
const adUnitId = __DEV__ ? TestIds.REWARDED : "ca-app-pub-3940256099942544/5224354917"; // Use TestIds em desenvolvimento
const rewardedAd = RewardedAd.createForAdRequest(adUnitId);

async function showRewardedAd(onFinish: () => void) {
  if (Platform.OS !== "android") {
    onFinish();
    return;
  }

  try {
    // Adiciona eventos para o anúncio
    rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
      rewardedAd.show();
    });

    rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
      console.log("Usuário ganhou recompensa:", reward);
    });

    rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
      onFinish();
    });

    // Carrega o anúncio
    rewardedAd.load();
  } catch (error) {
    console.log("Erro no anúncio premiado:", error);
    onFinish();
  }
}

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
