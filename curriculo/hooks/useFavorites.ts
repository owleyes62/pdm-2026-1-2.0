// hooks/useFavorites.ts

import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@curriculo:favoritos';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);

        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      } finally {
        setLoadingFavorites(false);
      }
    }

    loadFavorites();
  }, []);

  const saveFavorites = useCallback(async (nextFavorites: number[]) => {
    try {
      setFavorites(nextFavorites);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextFavorites));
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
    }
  }, []);

  const isFavorite = useCallback(
    (projectId: number) => {
      return favorites.includes(projectId);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (projectId: number) => {
      const nextFavorites = favorites.includes(projectId)
        ? favorites.filter((id) => id !== projectId)
        : [...favorites, projectId];

      await saveFavorites(nextFavorites);
    },
    [favorites, saveFavorites]
  );

  return {
    favorites,
    loadingFavorites,
    isFavorite,
    toggleFavorite,
  };
}