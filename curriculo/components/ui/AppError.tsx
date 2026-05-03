// components/ui/AppError.tsx

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AppErrorProps {
  message: string;
  onRetry?: () => void;
}

export function AppError({ message, onRetry }: AppErrorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.title}>Ops, algo deu errado</Text>
      <Text style={styles.message}>{message}</Text>

      {!!onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Tentar novamente</Text>
        </TouchableOpacity>
      )}
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
  icon: {
    fontSize: 42,
    marginBottom: 12,
  },
  title: {
    color: '#F9FAFB',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    color: '#9CA3AF',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#38BDF8',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
  },
  buttonText: {
    color: '#020617',
    fontWeight: '900',
    fontSize: 13,
  },
});