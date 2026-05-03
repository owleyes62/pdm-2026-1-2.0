// hooks/usePortfolio.ts

import { useCallback } from 'react';
import { portfolioService } from '../services/portfolioService';
import { useApi } from './useApi';

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
  const fetchPortfolio = useCallback(async (): Promise<PortfolioData> => {
    const [
      pessoa,
      experiencias,
      formacoes,
      habilidades,
      projetos,
      certificados,
      idiomas,
    ] = await Promise.all([
      portfolioService.getPessoa(),
      portfolioService.getExperiencias(),
      portfolioService.getFormacoes(),
      portfolioService.getHabilidades(),
      portfolioService.getProjetos(),
      portfolioService.getCertificados(),
      portfolioService.getIdiomas(),
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
  }, []);

  return useApi<PortfolioData>(fetchPortfolio);
}