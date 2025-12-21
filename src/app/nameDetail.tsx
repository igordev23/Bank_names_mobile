import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useNameDetailViewModel } from "../viewmodel/useNameDetailViewModel";
import { theme } from "../theme/theme";
import { BarChart } from "react-native-gifted-charts";

export default function NameDetailScreen() {
  const { state, actions } = useNameDetailViewModel();
  const { nome } = useLocalSearchParams();

  React.useEffect(() => {
    if (nome) actions.fetchNameDetail(String(nome));
  }, [nome]);

  const periodColors = [
    "#FFEDD5", // pêssego
    "#FDE68A", // amarelo pastel
    "#FECACA", // vermelho claro
    "#E9D5FF", // lilás
    "#D9F99D", // verde limão pastel
    "#BFDBFE", // azul claro único
    "#FBCFE8", // rosa pastel
    "#FED7AA", // laranja claro
    "#F5D0C5", // salmão suave
  ];

  if (state.loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.loading}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  if (state.error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.error}>{state.error}</Text>
      </SafeAreaView>
    );
  }

  if (!state.detail) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.error}>Nenhum dado encontrado</Text>
      </SafeAreaView>
    );
  }

  const detail = state.detail;
  const chartData = detail.res.map((item, index) => ({
    value: item.frequencia,
    label: item.periodoFormatado ?? item.periodo,
    frontColor: periodColors[index % periodColors.length],
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <View style={styles.container}>
          {/* 🔙 Botão de voltar */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
           
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>

          {/* Título */}
          <Text style={styles.title}>{detail.nome}</Text>

          {/* Card principal */}
          <View style={styles.infoCard}>
           

            <Text style={styles.infoText}>
              <Text style={styles.bold}>Localidade:</Text> {detail.localidade}
            </Text>

            <Text style={styles.infoText}>
              <Text style={styles.bold}>Total Registrado:</Text>{" "}
              {new Intl.NumberFormat("pt-BR").format(detail.total)}
            </Text>
          </View>

          {/* Frequências */}
          <Text style={styles.frequencyTitle}>Frequência por período:</Text>

          <View style={styles.frequencyCard}>
            <FlatList
              data={detail.res}
              keyExtractor={(_, idx) => idx.toString()}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <View
                  style={[
                    styles.frequencyRow,
                    {
                      backgroundColor:
                        periodColors[index % periodColors.length],
                    },
                  ]}
                >
                  <Text style={styles.periodText}>
                    {item.periodoFormatado ?? item.periodo}
                  </Text>

                  <Text style={styles.bold}>
                    {new Intl.NumberFormat("pt-BR").format(item.frequencia)}
                  </Text>
                </View>
              )}
            />
          </View>

          {/* Gráfico de Barras */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Distribuição por Período</Text>

            <BarChart
              data={chartData}
              barWidth={28}
              spacing={14}
              barBorderRadius={6}
              hideRules={false}
              isAnimated
            />

            {/* Legenda */}
            <View style={styles.legendContainer}>
              {chartData.map((item) => (
                <View key={item.label} style={styles.legendRow}>
                  <View
                    style={[
                      styles.colorBox,
                      { backgroundColor: item.frontColor },
                    ]}
                  />
                  <Text style={styles.legendText}>
                    {item.label}:{" "}
                    {new Intl.NumberFormat("pt-BR").format(item.value)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.light,
  },

  container: {
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
    fontSize: 16,
    color: "#FFFFFF", // Texto branco
    fontWeight: "600",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 20,
  },

  infoCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    marginBottom: 25,
  },

  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },

  bold: {
    fontWeight: "bold",
  },

  frequencyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.secondary,
    marginBottom: 10,
  },

  frequencyCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 20,
    elevation: 5,
    marginBottom: 50,
  },

  frequencyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },

  periodText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.primary,
  },

  loading: {
    marginTop: 40,
    fontSize: 18,
    textAlign: "center",
    color: theme.colors.primary,
  },

  error: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 18,
    color: "red",
  },

  chartCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    marginBottom: 25,
    alignItems: "center",
  },

  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.secondary,
    marginBottom: 15,
  },

  legendContainer: {
    marginTop: 20,
    width: "100%",
  },

  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  colorBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },

  legendText: {
    fontSize: 15,
  },
});
