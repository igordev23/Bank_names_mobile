import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold">Olá — explore nomes no Brasil</Text>
      <Button title="Mais Usados" onPress={() => router.push('/topNames')} />
      <Button title="Menos Usados" onPress={() => router.push('/bottomNames')} />
      <Button title="Pesquisar" onPress={() => router.push('/search')} />
    </View>
  );
};

export default HomeScreen;
