import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { useNameDetailViewModel } from '../viewmodel/useNameDetailViewModel';

const NameDetailScreen = () => {
  const { state, actions } = useNameDetailViewModel();
  const { nome } = useLocalSearchParams();

  React.useEffect(() => {
    if (nome) {
      actions.fetchNameDetail(String(nome));
    }
  }, [nome]);

  if (state.loading) {
    return (
      <View className="flex-1 p-4 bg-white">
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!state.detail) {
    return (
      <View className="flex-1 p-4 bg-white">
        <Text>Nenhum dado encontrado</Text>
      </View>
    );
  }

  const detail = state.detail;

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">
        {detail.nome}
      </Text>

      <Text className="text-lg">Sexo: {detail.sexo ?? "Não informado"}</Text>
      <Text className="text-lg">Localidade: {detail.localidade}</Text>
      <Text className="text-lg mb-4">
        Total de registros: {detail.total}
      </Text>

      <Text className="text-xl font-bold mb-2">Frequência por período:</Text>

      <FlatList
        data={detail.res}
        keyExtractor={(item) => item.periodo}
        renderItem={({ item }) => (
          <View className="py-2 border-b border-gray-200">
            <Text className="font-semibold">{item.periodo}</Text>
            <Text>Frequência: {item.frequencia}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default NameDetailScreen;
