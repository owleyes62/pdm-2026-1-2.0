// app/(tabs)/_layout.tsx

import { Text } from 'react-native';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // joga a tab bar para o topo
        tabBarPosition: 'top',

        tabBarActiveTintColor: '#38BDF8',
        tabBarInactiveTintColor: '#64748B',

        tabBarStyle: {
          backgroundColor: '#020617',
          borderBottomColor: '#1E293B',
          borderBottomWidth: 1,
          borderTopWidth: 0,
          height: 62,
          paddingTop: 8,
          paddingBottom: 6,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },

        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabIcon icon="🏠" color={color} />,
        }}
      />

      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color }) => <TabIcon icon="ℹ️" color={color} />,
        }}
      />

      <Tabs.Screen
        name="academica"
        options={{
          title: 'Acadêmica',
          tabBarIcon: ({ color }) => <TabIcon icon="🎓" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profissional"
        options={{
          title: 'Experiência',
          tabBarIcon: ({ color }) => <TabIcon icon="💼" color={color} />,
        }}
      />

      <Tabs.Screen
        name="projetos"
        options={{
          title: 'Projetos',
          tabBarIcon: ({ color }) => <TabIcon icon="🚀" color={color} />,
        }}
      />
    </Tabs>
  );
}

function TabIcon({ icon, color }: { icon: string; color: string }) {
  return <Text style={{ color, fontSize: 17 }}>{icon}</Text>;
}