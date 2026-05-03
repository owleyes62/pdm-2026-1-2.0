// services/portfolioService.ts

import type {
  ApiResponse,
  Pessoa,
  Experiencia,
  Formacao,
  Habilidade,
  Projeto,
  Certificado,
  Idioma,
} from '../types';

export const BASE_URL = 'https://curriculo-one-omega.vercel.app';

async function request<T>(path: string): Promise<T> {
  const url = `${BASE_URL}${path}`;

  try {
    console.log('FETCH URL:', url);

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Erro HTTP ${response.status} ao buscar ${path}: ${text}`);
    }

    const json = (await response.json()) as ApiResponse<T>;

    if (!json.sucesso) {
      throw new Error(json.erro || `Erro ao buscar ${path}`);
    }

    return json.dados;
  } catch (error) {
    console.error('Erro na requisição:', url, error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Erro desconhecido ao buscar dados da API');
  }
}

export const portfolioService = {
  getPessoas() {
    return request<Pessoa[]>('/api/pessoas');
  },

  getPessoa(pessoaId: number) {
    return request<Pessoa>(`/api/pessoas/${pessoaId}`);
  },

  getExperiencias(pessoaId: number) {
    return request<Experiencia[]>(`/api/pessoas/${pessoaId}/experiencias`);
  },

  getFormacoes(pessoaId: number) {
    return request<Formacao[]>(`/api/pessoas/${pessoaId}/formacoes`);
  },

  getHabilidades(pessoaId: number) {
    return request<Habilidade[]>(`/api/pessoas/${pessoaId}/habilidades`);
  },

  getProjetos(pessoaId: number) {
    return request<Projeto[]>(`/api/pessoas/${pessoaId}/projetos`);
  },

  getCertificados(pessoaId: number) {
    return request<Certificado[]>(`/api/pessoas/${pessoaId}/certificados`);
  },

  getIdiomas(pessoaId: number) {
    return request<Idioma[]>(`/api/pessoas/${pessoaId}/idiomas`);
  },

  getProjetoPorId(pessoaId: number, projetoId: number) {
    return request<Projeto>(`/api/pessoas/${pessoaId}/projetos/${projetoId}`);
  },
};