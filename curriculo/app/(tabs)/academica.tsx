// app/(tabs)/academica.tsx

import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePortfolio } from '../../hooks/usePortfolio';
import { AppError, AppHeader, AppLoading, SectionTitle } from '../../components/ui';
import { EducationCard } from '../../components/portfolio';

export default function AcademicaScreen() {
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
          title="Experiência Acadêmica"
          subtitle="Formações, cursos e trajetória acadêmica carregados pelo back-end."
        />

        <SectionTitle
          icon="🎓"
          title="Formações"
          subtitle={`${data.formacoes.length} formação(ões) encontrada(s).`}
        />

        {data.formacoes.map((formacao) => (
          <EducationCard key={formacao.id} formacao={formacao} />
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