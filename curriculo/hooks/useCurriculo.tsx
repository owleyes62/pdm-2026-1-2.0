// hooks/useCurriculo.tsx

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { portfolioService } from '../services/portfolioService';
import type { Pessoa } from '../types';

interface CurriculoContextValue {
  pessoas: Pessoa[];
  selectedPessoaId: number | null;
  selectedPessoa: Pessoa | null;
  loadingPessoas: boolean;
  errorPessoas: string | null;
  setSelectedPessoaId: (id: number) => void;
  refetchPessoas: () => Promise<void>;
}

const CurriculoContext = createContext<CurriculoContextValue | null>(null);

interface CurriculoProviderProps {
  children: ReactNode;
}

export function CurriculoProvider({ children }: CurriculoProviderProps) {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [selectedPessoaId, setSelectedPessoaId] = useState<number | null>(null);
  const [loadingPessoas, setLoadingPessoas] = useState(true);
  const [errorPessoas, setErrorPessoas] = useState<string | null>(null);

  async function loadPessoas() {
    setLoadingPessoas(true);
    setErrorPessoas(null);

    try {
      const result = await portfolioService.getPessoas();

      setPessoas(result);

      if (result.length > 0) {
        setSelectedPessoaId((currentId) => currentId ?? result[0].id);
      }
    } catch (error) {
      console.error('Erro ao carregar currículos:', error);

      if (error instanceof Error) {
        setErrorPessoas(error.message);
      } else {
        setErrorPessoas('Erro ao carregar currículos');
      }
    } finally {
      setLoadingPessoas(false);
    }
  }

  useEffect(() => {
    loadPessoas();
  }, []);

  const selectedPessoa = useMemo(() => {
    return pessoas.find((pessoa) => pessoa.id === selectedPessoaId) ?? null;
  }, [pessoas, selectedPessoaId]);

  return (
    <CurriculoContext.Provider
      value={{
        pessoas,
        selectedPessoaId,
        selectedPessoa,
        loadingPessoas,
        errorPessoas,
        setSelectedPessoaId,
        refetchPessoas: loadPessoas,
      }}
    >
      {children}
    </CurriculoContext.Provider>
  );
}

export function useCurriculo() {
  const context = useContext(CurriculoContext);

  if (!context) {
    throw new Error('useCurriculo deve ser usado dentro de CurriculoProvider');
  }

  return context;
}