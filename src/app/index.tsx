import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme/theme";

const router = useRouter();

export default function SplashScreen() {
  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.title}>Banco de Nomes</Text>

        <Text style={styles.subtitle}>
          Dados baseados no IBGE (até 2010).{"\n"}Pode conter imprecisões.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/home")}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.light,
    padding: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 20,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: theme.colors.secondary,
    marginBottom: 40,
    textAlign: "center",
    lineHeight: 22,
  },

  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
