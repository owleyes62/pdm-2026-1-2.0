// components/portfolio/ExperienceCard.tsx

import { StyleSheet, Text, View } from 'react-native';
import type { Experiencia } from '../../types';
import { AppCard } from '../ui';
import { formatDateRange } from '../../utils/formatDate';

interface ExperienceCardProps {
  experiencia: Experiencia;
}

export function ExperienceCard({ experiencia }: ExperienceCardProps) {
  return (
    <AppCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>💼</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.role}>{experiencia.cargo}</Text>
          <Text style={styles.company}>{experiencia.empresa}</Text>
        </View>
      </View>

      <Text style={styles.period}>
        {formatDateRange(
          experiencia.data_inicio,
          experiencia.data_fim,
          experiencia.atual
        )}
      </Text>

      {!!experiencia.modalidade && (
        <Text style={styles.mode}>{experiencia.modalidade}</Text>
      )}

      {!!experiencia.descricao && (
        <Text style={styles.description}>{experiencia.descricao}</Text>
      )}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 14,
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#38BDF811',
    borderWidth: 1,
    borderColor: '#38BDF855',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  role: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '900',
  },
  company: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  period: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 8,
  },
  mode: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    color: '#9CA3AF',
    fontSize: 13,
    lineHeight: 21,
  },
});