import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useTopNamesViewModel } from "../viewmodel/useTopNamesViewModel";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme/theme";

export default function TopNamesScreen() {
  const router = useRouter();
  const { state, actions } = useTopNamesViewModel();

  React.useEffect(() => {
    actions.fetchTopNames(20); // Busca os 20 nomes mais usados
  }, []);

  if (state.loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loading}>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (state.error) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loading}>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* 🔙 Botão de voltar */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/home")}
        >
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>🔥 Nomes Mais Usados</Text>
        <Text style={styles.subtitle}>Os nomes mais populares no Brasil</Text>

        <FlatList
          data={state.names}
          keyExtractor={(item) => item.nome}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.card,
                { backgroundColor: index % 2 === 0 ? "#fff" : "#F0F9FF" },
              ]}
              onPress={() => router.push(`/nameDetail?nome=${item.nome}`)}
            >
              {/* Número do ranking */}
              <View style={styles.rankContainer}>
                <Text style={styles.rankText}>{index + 1}</Text>
              </View>

              <View style={styles.cardLeft}>
                <Ionicons
                  name="flame-outline"
                  size={28}
                  color={theme.colors.primary}
                />
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardName}>{item.nome}</Text>
                <Text style={styles.cardFrequency}>
                  {item.frequencia.toLocaleString("pt-BR")} registros
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
    marginLeft: 8,
    fontSize: 16,
    color: "white",
    fontWeight: "600",
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

  rankContainer: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  rankText: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primary,
  },

  cardLeft: {
    width: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  cardContent: {
    flex: 1,
    marginLeft: 8,
  },

  cardName: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.primary,
  },

  cardFrequency: {
    color: "#555",
    marginTop: 4,
  },
});
