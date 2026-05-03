// app/(tabs)/sobre.tsx

import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppCard, AppHeader, AppTag, SectionTitle } from '../../components/ui';

const tecnologias = [
  'React Native',
  'Expo',
  'Expo Router',
  'TypeScript',
  'Express',
  'Node.js',
  'Back-end local',
  'AsyncStorage',
];

const modulos = [
  'Navegação por abas com Expo Router',
  'Consumo de API REST',
  'Componentização de interface',
  'Tipagem com TypeScript',
  'Persistência local de favoritos',
  'Separação por services, hooks e components',
];

export default function SobreScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AppHeader
          title="Sobre o App"
          subtitle="Informações sobre tecnologias, módulos e funcionalidade extra implementada."
        />

        <SectionTitle icon="🛠️" title="Tecnologias utilizadas" />

        <AppCard style={styles.card}>
          {tecnologias.map((tech) => (
            <AppTag key={tech} label={tech} />
          ))}
        </AppCard>

        <SectionTitle icon="📦" title="Módulos do aplicativo" />

        <AppCard style={styles.card}>
          {modulos.map((modulo) => (
            <Text key={modulo} style={styles.item}>
              • {modulo}
            </Text>
          ))}
        </AppCard>

        <SectionTitle icon="⭐" title="Funcionalidade extra" />

        <AppCard style={styles.card}>
          <Text style={styles.paragraph}>
            O aplicativo implementa uma funcionalidade extra de favoritos. O usuário
            pode favoritar projetos na tela de Projetos, e essa informação fica salva
            localmente no dispositivo usando AsyncStorage.
          </Text>
        </AppCard>

        <SectionTitle icon="🌐" title="Conexão com back-end" />

        <AppCard style={styles.card}>
          <Text style={styles.paragraph}>
            Os dados do currículo são carregados a partir de uma API REST local feita
            em Node.js com Express. O app consome endpoints para pessoa, formações,
            experiências, habilidades, projetos, certificados e idiomas.
          </Text>
        </AppCard>
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
    marginBottom: 22,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 6,
  },
  paragraph: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 23,
  },
});