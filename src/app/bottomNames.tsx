import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useBottomNamesViewModel } from "../viewmodel/useBottomNamesViewModel";
import { theme } from "../theme/theme";

const PAGE_SIZE = 10;

export default function BottomNamesScreen() {
  const { state, actions } = useBottomNamesViewModel();

  React.useEffect(() => {
    actions.fetchBottomNames(PAGE_SIZE);
  }, []);

  const handleLoadMore = () => {
    actions.loadMore(PAGE_SIZE);
  };

  if (state.loading && state.names.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Ionicons
            name="hourglass-outline"
            size={40}
            color={theme.colors.primary}
          />
          <Text style={styles.loading}>
            Buscando nomes raros...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (state.error) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Ionicons
            name="alert-circle-outline"
            size={40}
            color="red"
          />
          <Text style={styles.error}>{state.error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* 🔙 Voltar */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/home")}
        >
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Mias Raros</Text>
        <Text style={styles.subtitle}>
          Um espaço para descobrir nomes brasileiros raros e diferentes, com base em informações reais.

        </Text>

        {state.names.length === 0 ? (
          /* 🔹 ESTADO VAZIO */
          <View style={styles.emptyContainer}>
            <Ionicons
              name="sparkles-outline"
              size={48}
              color={theme.colors.primary}
            />
            <Text style={styles.emptyTitle}>
              Ainda não temos nenhum nome
            </Text>
            <Text style={styles.emptyText}>
              Clique em <Text style={{ fontWeight: "bold" }}>
              Carregar mais
              </Text>{" "}
              para descobrir nomes incomuns e raros no Brasil ✨
            </Text>

            <TouchableOpacity
              style={styles.loadMoreButton}
              onPress={handleLoadMore}
              disabled={state.loading}
            >
              <Text style={styles.loadMoreText}>
                {state.loading ? "Carregando..." : "Carregar mais"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* 🔹 LISTA */
          <FlatList
            data={state.names}
            keyExtractor={(item) => item.nome}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      index % 2 === 0 ? "#FFFFFF" : "#FFF7E6",
                  },
                ]}
                onPress={() =>
                  router.push(`/nameDetail?nome=${item.nome}`)
                }
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
            ListFooterComponent={
              <TouchableOpacity
                style={styles.loadMoreButton}
                onPress={handleLoadMore}
                disabled={state.loading}
              >
                <Text style={styles.loadMoreText}>
                  {state.loading ? "Carregando..." : "Carregar mais"}
                </Text>
              </TouchableOpacity>
            }
          />
        )}
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
    borderWidth: 1,
    borderColor: "#E0E0E0",
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
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#db3026",
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  loadMoreButton: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
  },
  loadMoreText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
    emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 40,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },

  emptyText: {
    fontSize: 15,
    color: theme.colors.secondary,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },

});
