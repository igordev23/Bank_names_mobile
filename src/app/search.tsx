import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSearchViewModel } from "../viewmodel/useSearchViewModel";
import { theme } from "../theme/theme";
import PieChart from "react-native-expo-pie-chart";
import { BarChart } from "react-native-gifted-charts";
import { Colors } from "react-native/Libraries/NewAppScreen";




export default function SearchScreen() {
  const router = useRouter();
  const { state, actions } = useSearchViewModel();
  const [query, setQuery] = useState("");
  const [selectedSex, setSelectedSex] = useState<"M" | "F" | "A">("A");

  const handleSearch = () => {
    if (!query.trim()) return;
    actions.searchName(query, selectedSex);
  };


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
  const chartData = state.result
    ? [...state.result.res]
      .sort((a, b) => a.frequencia - b.frequencia)
      .map((item, index) => ({
        key: item.periodoFormatado ?? item.periodo,
        count: item.frequencia <= 0 ? 1 : item.frequencia, // garante mínimo
        color: periodColors[index % periodColors.length],
      }))
    : [];


  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const barData = chartData.map((item, index) => ({
    value: item.count,
    label: item.key,
    color: periodColors[index % periodColors.length],
  }));


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>

          {/* 🔙 Botão de voltar */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.replace("/home")}>
           
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>

          {/* Títulos */}
          <Text style={styles.title}>Pesquisar Nome</Text>
          <Text style={styles.subtitle}>
            Consulta com base nos dados do IBGE
          </Text>

          {/* Card do formulário */}
          <View style={styles.searchCard}>
            <Text style={styles.label}>Nome:</Text>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-circle-outline"
                size={22}
                color={theme.colors.primary}
              />
              <TextInput
                style={styles.input}
                placeholder="Digite um nome"
                placeholderTextColor="#777"
                value={query}
                onChangeText={setQuery}
              />
            </View>

            <Text style={styles.label}>Sexo:</Text>

            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedSex}
                onValueChange={(v) => setSelectedSex(v)}
              >
                <Picker.Item label="Ambos" value="A" />
                <Picker.Item label="Masculino" value="M" />
                <Picker.Item label="Feminino" value="F" />
              </Picker>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSearch}>
              <Ionicons name="search" size={20} color="#fff" />
              <Text style={styles.buttonText}>Pesquisar</Text>
            </TouchableOpacity>
          </View>

          {/* Loading */}
          {state.loading && <Text style={styles.loading}>Carregando...</Text>}

          {/* Erro */}
          {state.error && <Text style={styles.error}>{state.error}</Text>}

          {/* Resultado */}
          {state.result && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>{state.result.nome}</Text>

              <Text style={styles.resultText}>
                <Text style={styles.bold}>Sexo:</Text>{" "}
                {state.result.sexo ?? "—"}
              </Text>

              <Text style={styles.resultText}>
                <Text style={styles.bold}>Localidade:</Text>{" "}
                {state.result.localidade}
              </Text>

              <Text style={styles.resultText}>
                <Text style={styles.bold}>Total Registrado:</Text>{" "}
                {new Intl.NumberFormat("pt-BR").format(state.result.total)}
              </Text>

              <Text style={styles.frequencyTitle}>
                Frequência por período:
              </Text>

              {/* Lista sem scroll — rola junto com a página */}
              <FlatList
                data={state.result.res}
                keyExtractor={(_, i) => i.toString()}
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

            </View>)}
          {/* 📊 Gráfico de Colunas */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Distribuição por Período</Text>

            <BarChart
              data={chartData.map((item, index) => ({
                value: item.count,
                label: item.key,
                frontColor: periodColors[index % periodColors.length],
                color: periodColors[index % periodColors.length],

                // 👉 Agora está correto
                onPress: () => setSelectedIndex(index),
              }))}
              barWidth={28}
              spacing={14}
              barBorderRadius={6}
              hideRules={false}
              isAnimated
            />

            {/* Legenda fixa */}
            <View style={styles.legendContainer}>
              {chartData.map((item) => (
                <View key={item.key} style={styles.legendRow}>
                  <View style={[styles.colorBox, { backgroundColor: item.color }]} />
                  <Text style={styles.legendText}>
                    {item.key}: {new Intl.NumberFormat("pt-BR").format(item.count)}
                  </Text>
                </View>
              ))}
            </View>

            {/* 🎈 BALÃO LATERAL */}
            {selectedIndex !== null && (
              <View
                style={{
                  position: "absolute",
                  top: 50,
                  left: 140,
                  backgroundColor: "white",
                  padding: 10,
                  borderRadius: 10,
                  elevation: 5,
                  shadowColor: "#000",
                  shadowOpacity: 0.2,
                  shadowRadius: 6,
                  maxWidth: 150,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: barData[selectedIndex].color,
                  }}
                >
                  {barData[selectedIndex].label}
                </Text>

                <Text>
                  {new Intl.NumberFormat("pt-BR").format(
                    barData[selectedIndex].value
                  )}
                </Text>
              </View>
            )}
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

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.primary,
  },

  subtitle: {
    fontSize: 15,
    color: theme.colors.secondary,
    marginBottom: 25,
  },

  searchCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    marginBottom: 25,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
    color: theme.colors.primary,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },

  pickerWrapper: {
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    marginBottom: 20,
  },

  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 8,
    fontWeight: "bold",
  },

  loading: {
    marginTop: 20,
    fontSize: 18,
    color: theme.colors.primary,
  },

  error: {
    marginTop: 20,
    color: "red",
    fontSize: 16,
  },

  resultCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    elevation: 4,
    marginBottom: 40,
  },

  resultTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 10,
  },

  resultText: {
    fontSize: 16,
    marginBottom: 4,
  },

  bold: {
    fontWeight: "bold",
  },

  frequencyTitle: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.secondary,
    marginBottom: 10,
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
