// components/portfolio/ProjectCard.tsx

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link, type Href } from 'expo-router';
import type { Projeto } from '../../types';
import { AppCard, AppTag } from '../ui';

interface ProjectCardProps {
  projeto: Projeto;
  favorite?: boolean;
  onToggleFavorite?: () => void;
  showDetailsLink?: boolean;
}

export function ProjectCard({
  projeto,
  favorite = false,
  onToggleFavorite,
  showDetailsLink = true,
}: ProjectCardProps) {
  const projectHref = `/projeto/${projeto.id}` as Href;

  return (
    <AppCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>🚀</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>{projeto.nome}</Text>

          {projeto.destaque && (
            <Text style={styles.highlight}>Projeto em destaque</Text>
          )}
        </View>

        {!!onToggleFavorite && (
          <TouchableOpacity onPress={onToggleFavorite} activeOpacity={0.8}>
            <Text style={styles.favorite}>{favorite ? '★' : '☆'}</Text>
          </TouchableOpacity>
        )}
      </View>

      {!!projeto.descricao && (
        <Text style={styles.description}>{projeto.descricao}</Text>
      )}

      {!!projeto.habilidades?.length && (
        <View style={styles.tags}>
          {projeto.habilidades.map((habilidade) => (
            <AppTag
              key={habilidade.id}
              label={habilidade.nome}
              color="#22C55E"
            />
          ))}
        </View>
      )}

      {showDetailsLink && (
        <Link href={projectHref} asChild>
          <TouchableOpacity style={styles.linkButton} activeOpacity={0.8}>
            <Text style={styles.linkText}>Ver detalhes</Text>
          </TouchableOpacity>
        </Link>
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
    backgroundColor: '#22C55E11',
    borderWidth: 1,
    borderColor: '#22C55E55',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  title: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '900',
  },
  highlight: {
    color: '#22C55E',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  favorite: {
    color: '#FACC15',
    fontSize: 26,
    fontWeight: '900',
  },
  description: {
    color: '#9CA3AF',
    fontSize: 13,
    lineHeight: 21,
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
    marginBottom: 8,
  },
  linkButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginTop: 6,
  },
  linkText: {
    color: '#020617',
    fontSize: 12,
    fontWeight: '900',
  },
});