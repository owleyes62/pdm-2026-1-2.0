// components/portfolio/ProfileHero.tsx

import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import type { Pessoa } from '../../types';
import { AppCard } from '../ui';

interface ProfileHeroProps {
  pessoa: Pessoa;
}

export function ProfileHero({ pessoa }: ProfileHeroProps) {
  function openUrl(url?: string | null) {
    if (!url) return;
    Linking.openURL(url);
  }

  function openEmail(email?: string | null) {
    if (!email) return;
    Linking.openURL(`mailto:${email}`);
  }

  return (
    <AppCard style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {(pessoa.nome || 'DEV')
            .split(' ')
            .slice(0, 2)
            .map((name) => name[0])
            .join('')
            .toUpperCase()}
        </Text>
      </View>

      <Text style={styles.name}>{pessoa.nome}</Text>

      {!!pessoa.titulo && <Text style={styles.title}>{pessoa.titulo}</Text>}

      {!!pessoa.localizacao && (
        <Text style={styles.location}>📍 {pessoa.localizacao}</Text>
      )}

      {!!pessoa.resumo && <Text style={styles.summary}>{pessoa.resumo}</Text>}

      <View style={styles.actions}>
        {!!pessoa.linkedin && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => openUrl(pessoa.linkedin)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>LinkedIn</Text>
          </TouchableOpacity>
        )}

        {!!pessoa.github && (
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => openUrl(pessoa.github)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonSecondaryText}>GitHub</Text>
          </TouchableOpacity>
        )}

        {!!pessoa.email && (
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => openEmail(pessoa.email)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonSecondaryText}>E-mail</Text>
          </TouchableOpacity>
        )}
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#0F172A',
    borderWidth: 2,
    borderColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#38BDF8',
    fontSize: 28,
    fontWeight: '900',
  },
  name: {
    color: '#F9FAFB',
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  title: {
    color: '#9CA3AF',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
    textAlign: 'center',
  },
  location: {
    color: '#CBD5E1',
    fontSize: 13,
    marginTop: 10,
  },
  summary: {
    color: '#9CA3AF',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 16,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#38BDF8',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  buttonText: {
    color: '#020617',
    fontWeight: '900',
    fontSize: 13,
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: '#38BDF855',
    backgroundColor: '#38BDF811',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  buttonSecondaryText: {
    color: '#38BDF8',
    fontWeight: '800',
    fontSize: 13,
  },
});