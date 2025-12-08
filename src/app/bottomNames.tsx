import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useBottomNamesViewModel } from '../viewmodel/useBottomNamesViewModel';
import { router } from 'expo-router';

const BottomNamesScreen = () => {
  const { state, actions } = useBottomNamesViewModel();

  React.useEffect(() => {
    actions.fetchBottomNames(10); // pega os 10 nomes mais raros
  }, []);

  if (state.loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg">Carregando...</Text>
      </View>
    );
  }

  if (state.error) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-red-600 text-lg">{state.error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Nomes Menos Usados</Text>

      <FlatList
        data={state.names}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="py-3 border-b border-gray-200"
            onPress={() => router.push(`/nameDetail?nome=${item.nome}`)}
          >
            <Text className="text-lg font-semibold">{item.nome}</Text>
            <Text className="text-gray-600">
              {item.frequencia} registros
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BottomNamesScreen;
