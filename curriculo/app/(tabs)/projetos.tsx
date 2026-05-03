// app/(tabs)/projetos.tsx

import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePortfolio } from '../../hooks/usePortfolio';
import { useFavorites } from '../../hooks/useFavorites';
import { AppCard, AppError, AppHeader, AppLoading, SectionTitle } from '../../components/ui';
import { ProjectCard } from '../../components/portfolio';
import { CurriculoDropdown } from '../../components/ui';

export default function ProjetosScreen() {
  const { data, loading, error, refetch } = usePortfolio();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  if (loading) return <AppLoading />;
  if (error) return <AppError message={error} onRetry={refetch} />;
  if (!data) return <AppLoading />;

  const favoritos = data.projetos.filter((projeto) => favorites.includes(projeto.id));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AppHeader
          title="Projetos"
          subtitle="Projetos desenvolvidos e cadastrados no back-end."
        />

        <CurriculoDropdown />
        
        <AppCard style={styles.extraCard}>
          <Text style={styles.extraTitle}>⭐ Funcionalidade extra</Text>
          <Text style={styles.extraText}>
            Toque na estrela de um projeto para salvá-lo como favorito localmente.
          </Text>
        </AppCard>

        {!!favoritos.length && (
          <>
            <SectionTitle
              icon="⭐"
              title="Favoritos"
              subtitle={`${favoritos.length} projeto(s) favoritado(s).`}
            />

            {favoritos.map((projeto) => (
              <ProjectCard
                key={`fav-${projeto.id}`}
                projeto={projeto}
                favorite={isFavorite(projeto.id)}
                onToggleFavorite={() => toggleFavorite(projeto.id)}
              />
            ))}
          </>
        )}

        <SectionTitle
          icon="🚀"
          title="Todos os projetos"
          subtitle={`${data.projetos.length} projeto(s) encontrado(s).`}
        />

        <View>
          {data.projetos.map((projeto) => (
            <ProjectCard
              key={projeto.id}
              projeto={projeto}
              favorite={isFavorite(projeto.id)}
              onToggleFavorite={() => toggleFavorite(projeto.id)}
            />
          ))}
        </View>
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
  extraCard: {
    marginBottom: 22,
  },
  extraTitle: {
    color: '#FACC15',
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 8,
  },
  extraText: {
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 21,
  },
});