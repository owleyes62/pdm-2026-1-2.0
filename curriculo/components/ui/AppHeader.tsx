// components/ui/AppHeader.tsx

import { View, Text, StyleSheet } from 'react-native';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
}

export function AppHeader({ title, subtitle }: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>PORTFÓLIO DEV</Text>
      <Text style={styles.title}>{title}</Text>

      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  kicker: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2.5,
    marginBottom: 8,
  },
  title: {
    color: '#F9FAFB',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.7,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },
});