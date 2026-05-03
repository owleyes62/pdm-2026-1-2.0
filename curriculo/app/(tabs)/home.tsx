// app/(tabs)/home.tsx

import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePortfolio } from '../../hooks/usePortfolio';
import { AppError, AppHeader, AppLoading, AppCard, SectionTitle } from '../../components/ui';
import { ProfileHero, SkillList, ProjectCard } from '../../components/portfolio';
import { CurriculoDropdown } from '../../components/ui';

export default function HomeScreen() {
  const { data, loading, error, refetch } = usePortfolio();

  if (loading) return <AppLoading />;
  if (error) return <AppError message={error} onRetry={refetch} />;
  if (!data) return <AppLoading />;

  const projetosDestaque = data.projetos.filter((projeto) => projeto.destaque).slice(0, 2);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AppHeader
          title="Meu Portfólio"
          subtitle="Currículo digital desenvolvido com React Native, Expo Router e back-end próprio."
        />

        <CurriculoDropdown />

        <ProfileHero pessoa={data.pessoa} />

        <View style={styles.statsRow}>
          <AppCard style={styles.statCard}>
            <Text style={styles.statValue}>{data.habilidades.length}</Text>
            <Text style={styles.statLabel}>Skills</Text>
          </AppCard>

          <AppCard style={styles.statCard}>
            <Text style={styles.statValue}>{data.projetos.length}</Text>
            <Text style={styles.statLabel}>Projetos</Text>
          </AppCard>

          <AppCard style={styles.statCard}>
            <Text style={styles.statValue}>{data.experiencias.length}</Text>
            <Text style={styles.statLabel}>Experiências</Text>
          </AppCard>
        </View>

        <SectionTitle
          icon="🧠"
          title="Principais habilidades"
          subtitle="Tecnologias e conhecimentos cadastrados no back-end."
        />

        <SkillList habilidades={data.habilidades.slice(0, 8)} />

        {!!projetosDestaque.length && (
          <>
            <SectionTitle
              icon="🚀"
              title="Projetos em destaque"
              subtitle="Alguns projetos selecionados do portfólio."
            />

            {projetosDestaque.map((projeto) => (
              <ProjectCard key={projeto.id} projeto={projeto} />
            ))}
          </>
        )}
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
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 14,
  },
  statValue: {
    color: '#38BDF8',
    fontSize: 24,
    fontWeight: '900',
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 11,
    marginTop: 4,
    fontWeight: '700',
    textAlign: 'center',
  },
});