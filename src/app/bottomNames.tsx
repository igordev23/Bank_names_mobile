import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useBottomNamesViewModel } from "../viewmodel/useBottomNamesViewModel";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme/theme";
import {showRewardedAd } from "../useCase/showRewardedAd";
export default function BottomNamesScreen() {
  const { state, actions } = useBottomNamesViewModel();

  React.useEffect(() => {
    actions.fetchBottomNames(20); // pega os 20 mais raros (fica mais legal)
  }, []);

  if (state.loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Ionicons name="hourglass-outline" size={40} color={theme.colors.primary} />
          <Text style={styles.loading}>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (state.error) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Ionicons name="alert-circle-outline" size={40} color="red" />
          <Text style={styles.error}>{state.error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* 🔙 Botão de voltar */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace("/home")}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Nomes Mais Raros</Text>
        <Text style={styles.subtitle}>
          Lista dos nomes com menor frequência no Brasil
        </Text>

        <FlatList
          data={state.names}
          keyExtractor={(item) => item.nome}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
  style={[
    styles.card,
    { backgroundColor: index % 2 === 0 ? "#fff" : "#FFF7E6" },
  ]}
  onPress={() => router.push(`/nameDetail?nome=${item.nome}`)} // Corrigido
>

              <View style={styles.cardLeft}>
                <Ionicons
                  name="sparkles-outline"
                  size={28}
                  color={theme.colors.primary}
                />
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardName}>{item.nome}</Text>
                <Text style={styles.cardFrequency}>
                  {item.frequencia} registros
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={26}
                color={theme.colors.secondary}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.light,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    fontSize: 18,
    marginTop: 10,
    color: theme.colors.primary,
  },
  error: {
    fontSize: 18,
    marginTop: 10,
    color: "red",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 6,
  },
  subtitle: {
    color: theme.colors.secondary,
    fontSize: 15,
    marginBottom: 18,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1, // Adiciona uma borda para indicar elevação
    borderColor: "#E0E0E0", // Cor tonal para representar elevação
  },

  cardLeft: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  cardContent: {
    flex: 1,
    marginLeft: 8,
  },

  cardName: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.primary,
  },

  cardFrequency: {
    color: "#555",
    marginTop: 4,
  },

  /* back button */
  backButton: {
    alignItems: "center", // Centraliza o texto horizontalmente
    justifyContent: "center", // Centraliza o texto verticalmente
    paddingVertical: 12, // Aumenta a área clicável verticalmente
    paddingHorizontal: 16, // Aumenta a área clicável horizontalmente
    borderRadius: 8, // Adiciona bordas arredondadas
    backgroundColor: "#db3026", // Cor de fundo vermelha
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
    color: "#FFFFFF", // Texto branco
    fontWeight: "600",
  },
});
