// hooks/usePortfolio.ts

import { useCallback } from 'react';

import { portfolioService } from '../services/portfolioService';
import { useApi } from './useApi';
import { useCurriculo } from './useCurriculo';

import type {
  Pessoa,
  Experiencia,
  Formacao,
  Habilidade,
  Projeto,
  Certificado,
  Idioma,
} from '../types';

interface PortfolioData {
  pessoa: Pessoa;
  experiencias: Experiencia[];
  formacoes: Formacao[];
  habilidades: Habilidade[];
  projetos: Projeto[];
  certificados: Certificado[];
  idiomas: Idioma[];
}

export function usePortfolio() {
  const { selectedPessoaId } = useCurriculo();

  const fetchPortfolio = useCallback(async (): Promise<PortfolioData> => {
    if (!selectedPessoaId) {
      throw new Error('Nenhum currículo selecionado');
    }

    const [
      pessoa,
      experiencias,
      formacoes,
      habilidades,
      projetos,
      certificados,
      idiomas,
    ] = await Promise.all([
      portfolioService.getPessoa(selectedPessoaId),
      portfolioService.getExperiencias(selectedPessoaId),
      portfolioService.getFormacoes(selectedPessoaId),
      portfolioService.getHabilidades(selectedPessoaId),
      portfolioService.getProjetos(selectedPessoaId),
      portfolioService.getCertificados(selectedPessoaId),
      portfolioService.getIdiomas(selectedPessoaId),
    ]);

    return {
      pessoa,
      experiencias,
      formacoes,
      habilidades,
      projetos,
      certificados,
      idiomas,
    };
  }, [selectedPessoaId]);

  return useApi<PortfolioData>(fetchPortfolio, !!selectedPessoaId);
}