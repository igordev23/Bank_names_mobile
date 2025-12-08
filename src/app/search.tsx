import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSearchViewModel } from '../viewmodel/useSearchViewModel';

const SearchScreen = () => {
  const { state, actions } = useSearchViewModel();
  const [query, setQuery] = useState('');
  const [selectedSex, setSelectedSex] = useState<'M' | 'F' | 'A'>('A');

  const handleSearch = () => {
    actions.searchName(query, selectedSex);
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-4">Pesquisar Nome</Text>

      {/* Input */}
      <TextInput
        className="border p-2 mb-4"
        placeholder="Digite um nome"
        value={query}
        onChangeText={setQuery}
      />

      {/* Dropdown */}
      <Text className="mb-2 font-semibold">Sexo:</Text>
      <Picker
        selectedValue={selectedSex}
        onValueChange={(value) => setSelectedSex(value)}
        style={{ borderWidth: 1, borderColor: "#ccc" }}
      >
        <Picker.Item label="Ambos" value="A" />
        <Picker.Item label="Masculino" value="M" />
        <Picker.Item label="Feminino" value="F" />
      </Picker>

      {/* Botão */}
      <Button title="Pesquisar" onPress={handleSearch} />

      {/* Loading */}
      {state.loading && <Text className="mt-4">Carregando...</Text>}

      {/* Erro */}
      {state.error && (
        <Text className="mt-4 text-red-600">{state.error}</Text>
      )}

      {/* Resultado */}
      {state.result && (
        <View className="mt-6">
          <Text className="text-2xl font-bold">{state.result.nome}</Text>
          <Text>Sexo: {state.result.sexo ?? "—"}</Text>
          <Text>Localidade: {state.result.localidade}</Text>
          <Text>Total registrado: {state.result.total}</Text>

          <Text className="text-lg font-bold mt-4">Frequência por período:</Text>

          <FlatList
            data={state.result.res}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View className="flex-row justify-between border-b py-2">
                <Text>{item.periodo}</Text>
                <Text>{item.frequencia}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
