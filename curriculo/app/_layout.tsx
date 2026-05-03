// app/_layout.tsx

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { CurriculoProvider } from '../hooks/useCurriculo';

export default function RootLayout() {
  return (
    <CurriculoProvider>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#020617',
          },
        }}
      />
    </CurriculoProvider>
  );
}