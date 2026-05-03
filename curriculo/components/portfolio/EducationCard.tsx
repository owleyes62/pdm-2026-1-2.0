// components/portfolio/EducationCard.tsx

import { StyleSheet, Text, View } from 'react-native';
import type { Formacao } from '../../types';
import { AppCard } from '../ui';
import { formatDateRange } from '../../utils/formatDate';

interface EducationCardProps {
  formacao: Formacao;
}

export function EducationCard({ formacao }: EducationCardProps) {
  return (
    <AppCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>🎓</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.course}>{formacao.curso}</Text>
          <Text style={styles.institution}>{formacao.instituicao}</Text>
        </View>
      </View>

      {!!formacao.grau && <Text style={styles.degree}>{formacao.grau}</Text>}

      <Text style={styles.period}>
        {formatDateRange(
          formacao.data_inicio,
          formacao.data_fim,
          formacao.em_andamento
        )}
      </Text>

      {!!formacao.descricao && (
        <Text style={styles.description}>{formacao.descricao}</Text>
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
    backgroundColor: '#A78BFA11',
    borderWidth: 1,
    borderColor: '#A78BFA55',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  course: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '900',
  },
  institution: {
    color: '#A78BFA',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  degree: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  period: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 8,
  },
  description: {
    color: '#9CA3AF',
    fontSize: 13,
    lineHeight: 21,
  },
});