// app/(tabs)/profissional.tsx

import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePortfolio } from '../../hooks/usePortfolio';
import { AppError, AppHeader, AppLoading, SectionTitle } from '../../components/ui';
import { ExperienceCard } from '../../components/portfolio';

export default function ProfissionalScreen() {
  const { data, loading, error, refetch } = usePortfolio();

  if (loading) return <AppLoading />;
  if (error) return <AppError message={error} onRetry={refetch} />;
  if (!data) return <AppLoading />;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AppHeader
          title="Experiência Profissional"
          subtitle="Histórico profissional, cargos, empresas e atividades realizadas."
        />

        <SectionTitle
          icon="💼"
          title="Experiências"
          subtitle={`${data.experiencias.length} experiência(s) encontrada(s).`}
        />

        {data.experiencias.map((experiencia) => (
          <ExperienceCard key={experiencia.id} experiencia={experiencia} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#020617',
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
});