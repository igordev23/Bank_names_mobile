import React from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
const router = useRouter();

export default function SplashScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold">Bem-vindo ao Banco de Nomes</Text>
      <Button title="Entrar" onPress={() => router.replace("/home")} />
    </View>
  );
}
