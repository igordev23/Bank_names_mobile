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
import { theme } from "./theme";

export default function TopNamesScreen() {
  const router = useRouter();
  const { state, actions } = useTopNamesViewModel();

  React.useEffect(() => {
    actions.fetchTopNames(20);
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/home")}
        >
          <Ionicons name="arrow-back" size={22} color={theme.colors.primary} />
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: theme.colors.primary,
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
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
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
