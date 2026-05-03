// components/portfolio/SkillList.tsx

import { StyleSheet, Text, View } from 'react-native';
import type { Habilidade } from '../../types';
import { AppTag } from '../ui';

interface SkillListProps {
  habilidades: Habilidade[];
}

const CATEGORY_LABEL: Record<string, string> = {
  linguagem: '💻 Linguagens',
  framework: '⚙️ Frameworks',
  banco_dados: '🗄️ Banco de Dados',
  ferramenta: '🔧 Ferramentas',
  soft_skill: '🤝 Soft Skills',
  outro: '📦 Outros',
};

const CATEGORY_COLOR: Record<string, string> = {
  linguagem: '#38BDF8',
  framework: '#A78BFA',
  banco_dados: '#FB923C',
  ferramenta: '#22C55E',
  soft_skill: '#F472B6',
  outro: '#9CA3AF',
};

export function SkillList({ habilidades }: SkillListProps) {
  const grouped = habilidades.reduce<Record<string, Habilidade[]>>((acc, item) => {
    const category = item.categoria || 'outro';

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(item);

    return acc;
  }, {});

  return (
    <View>
      {Object.entries(grouped).map(([category, items]) => (
        <View key={category} style={styles.group}>
          <Text style={styles.groupTitle}>
            {CATEGORY_LABEL[category] || category}
          </Text>

          <View style={styles.tags}>
            {items.map((item) => (
              <AppTag
                key={item.id}
                label={
                  item.nivel
                    ? `${item.nome} · ${item.nivel}`
                    : item.nome
                }
                color={CATEGORY_COLOR[category] || '#38BDF8'}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    marginBottom: 18,
  },
  groupTitle: {
    color: '#F9FAFB',
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 10,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});