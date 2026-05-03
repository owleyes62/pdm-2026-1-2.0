// components/ui/AppTag.tsx

import { StyleSheet, Text, View } from 'react-native';

interface AppTagProps {
  label: string;
  color?: string;
}

export function AppTag({ label, color = '#38BDF8' }: AppTagProps) {
  return (
    <View
      style={[
        styles.tag,
        {
          borderColor: `${color}66`,
          backgroundColor: `${color}18`,
        },
      ]}
    >
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
});