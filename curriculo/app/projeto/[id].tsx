// app/projeto/[id].tsx

import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';

import { usePortfolio } from '../../hooks/usePortfolio';
import { useFavorites } from '../../hooks/useFavorites';
import { AppCard, AppError, AppHeader, AppLoading, AppTag, SectionTitle } from '../../components/ui';
import { ProjectCard } from '../../components/portfolio';

export default function ProjetoDetalheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, loading, error, refetch } = usePortfolio();
  const { isFavorite, toggleFavorite } = useFavorites();

  const projeto = useMemo(() => {
    return data?.projetos.find((item) => String(item.id) === String(id));
  }, [data?.projetos, id]);

  if (loading) return <AppLoading />;
  if (error) return <AppError message={error} onRetry={refetch} />;
  if (!data) return <AppLoading />;

  if (!projeto) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <AppError message="Projeto não encontrado." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Stack.Screen options={{ title: projeto.nome }} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AppHeader
          title={projeto.nome}
          subtitle="Detalhes do projeto selecionado."
        />

        <ProjectCard
          projeto={projeto}
          favorite={isFavorite(projeto.id)}
          onToggleFavorite={() => toggleFavorite(projeto.id)}
          showDetailsLink={false}
        />

        <SectionTitle icon="📋" title="Descrição completa" />

        <AppCard style={styles.card}>
          <Text style={styles.paragraph}>
            {projeto.descricao || 'Este projeto ainda não possui descrição cadastrada.'}
          </Text>
        </AppCard>

        {!!projeto.habilidades?.length && (
          <>
            <SectionTitle icon="🧩" title="Tecnologias do projeto" />

            <AppCard style={styles.tagsCard}>
              {projeto.habilidades.map((habilidade) => (
                <AppTag key={habilidade.id} label={habilidade.nome} color="#22C55E" />
              ))}
            </AppCard>
          </>
        )}

        {!!projeto.github && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL(projeto.github!)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Abrir GitHub</Text>
          </TouchableOpacity>
        )}

        {!!projeto.url && (
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => Linking.openURL(projeto.url!)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonSecondaryText}>Abrir projeto</Text>
          </TouchableOpacity>
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
  card: {
    marginBottom: 20,
  },
  paragraph: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 23,
  },
  tagsCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#22C55E',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#020617',
    fontWeight: '900',
    fontSize: 14,
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: '#38BDF855',
    backgroundColor: '#38BDF811',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: '#38BDF8',
    fontWeight: '900',
    fontSize: 14,
  },
});