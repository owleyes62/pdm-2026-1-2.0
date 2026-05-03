// hooks/useApi.ts

import { useEffect, useState, useCallback } from 'react';

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useApi<T>(
  fetcher: () => Promise<T>,
  autoLoad = true
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(autoLoad);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      console.error('Erro no useApi:', err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro ao carregar dados');
      }
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    if (autoLoad) {
      load();
    }
  }, [autoLoad, load]);

  return {
    data,
    loading,
    error,
    refetch: load,
  };
}