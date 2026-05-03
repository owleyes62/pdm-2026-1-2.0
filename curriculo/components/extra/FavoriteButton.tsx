// components/extra/FavoriteButton.tsx

import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface FavoriteButtonProps {
  favorite: boolean;
  onPress: () => void;
}

export function FavoriteButton({ favorite, onPress }: FavoriteButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, favorite && styles.buttonActive]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>{favorite ? '★' : '☆'}</Text>
      <Text style={[styles.text, favorite && styles.textActive]}>
        {favorite ? 'Favorito' : 'Favoritar'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#FACC1555',
    backgroundColor: '#FACC1511',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  buttonActive: {
    backgroundColor: '#FACC1522',
    borderColor: '#FACC15',
  },
  icon: {
    color: '#FACC15',
    fontSize: 16,
    fontWeight: '900',
  },
  text: {
    color: '#FACC15',
    fontSize: 12,
    fontWeight: '800',
  },
  textActive: {
    color: '#FDE68A',
  },
});