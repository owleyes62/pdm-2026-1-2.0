// components/ui/AppCard.tsx

import type { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface AppCardProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function AppCard({ children, style }: AppCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 4,
  },
});