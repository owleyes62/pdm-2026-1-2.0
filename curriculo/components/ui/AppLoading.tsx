// components/ui/AppLoading.tsx

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface AppLoadingProps {
  message?: string;
}

export function AppLoading({ message = 'Carregando dados...' }: AppLoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#38BDF8" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  text: {
    color: '#9CA3AF',
    marginTop: 14,
    fontSize: 14,
  },
});