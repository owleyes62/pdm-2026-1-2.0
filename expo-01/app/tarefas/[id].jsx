import { View, Text, Button, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams } from 'expo-router';

export default function TarefaDetalhe() {
  const { id } = useLocalSearchParams();

  const handleCompartilhar = async () => {
    const url = Linking.createURL(`expo01://tarefas/${id}`);

    await Clipboard.setStringAsync(url);

    Alert.alert("Copiado!", "Link da tarefa copiado para a área de transferência.");
  };

  return (
    <View>
      <Text>ID: {id}</Text>

      <Button
        title="Compartilhar"
        onPress={handleCompartilhar}
      />
    </View>
  );
}