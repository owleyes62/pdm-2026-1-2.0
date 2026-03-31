import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Tarefa() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>ID: {id}</Text>
    </View>
  );
}