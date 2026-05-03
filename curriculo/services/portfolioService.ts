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

export const BASE_URL = 'https://musical-engine-5j4wg95r4wxf5rw-3000.app.github.dev';
export const PESSOA_ID = 12;

async function request<T>(path: string): Promise<T> {
  const url = `${BASE_URL}${path}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();

      throw new Error(
        `Erro HTTP ${response.status} ao buscar ${path}: ${text}`
      );
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
  getPessoa() {
    return request<Pessoa>(`/api/pessoas/${PESSOA_ID}`);
  },

  getExperiencias() {
    return request<Experiencia[]>(
      `/api/pessoas/${PESSOA_ID}/experiencias`
    );
  },

  getFormacoes() {
    return request<Formacao[]>(
      `/api/pessoas/${PESSOA_ID}/formacoes`
    );
  },

  getHabilidades() {
    return request<Habilidade[]>(
      `/api/pessoas/${PESSOA_ID}/habilidades`
    );
  },

  getProjetos() {
    return request<Projeto[]>(
      `/api/pessoas/${PESSOA_ID}/projetos`
    );
  },

  getCertificados() {
    return request<Certificado[]>(
      `/api/pessoas/${PESSOA_ID}/certificados`
    );
  },

  getIdiomas() {
    return request<Idioma[]>(
      `/api/pessoas/${PESSOA_ID}/idiomas`
    );
  },

  getProjetoPorId(id: number) {
    return request<Projeto>(
      `/api/pessoas/${PESSOA_ID}/projetos/${id}`
    );
  },
};