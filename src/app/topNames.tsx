import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useTopNamesViewModel } from "../viewmodel/useTopNamesViewModel";
import { router } from "expo-router";

const TopNamesScreen = () => {
  const { state, actions } = useTopNamesViewModel();

  React.useEffect(() => {
    actions.fetchTopNames(10);
  }, []);

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-2">Nomes Mais Usados</Text>

      {state.loading ? (
        <Text>Carregando...</Text>
      ) : (
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
      )}
    </View>
  );
};

export default TopNamesScreen;
