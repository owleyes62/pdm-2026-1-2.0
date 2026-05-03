// components/ui/SectionTitle.tsx

import { StyleSheet, Text, View } from 'react-native';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: string;
}

export function SectionTitle({ title, subtitle, icon }: SectionTitleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        {!!icon && <Text style={styles.icon}>{icon}</Text>}
        <Text style={styles.title}>{title}</Text>
      </View>

      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 18,
  },
  title: {
    color: '#F9FAFB',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },
});