// types/portfolio.ts

export interface Pessoa {
  id: number;
  nome: string;
  titulo?: string | null;
  resumo?: string | null;
  email?: string | null;
  telefone?: string | null;
  localizacao?: string | null;
  linkedin?: string | null;
  github?: string | null;
  portfolio?: string | null;
  foto_url?: string | null;
  criado_em?: string;
  atualizado_em?: string;
}

export interface Experiencia {
  id: number;
  pessoa_id: number;
  empresa: string;
  cargo: string;
  descricao?: string | null;
  data_inicio?: string | null;
  data_fim?: string | null;
  atual?: boolean;
  modalidade?: string | null;
  criado_em?: string;
  atualizado_em?: string;
}

export interface Formacao {
  id: number;
  pessoa_id: number;
  instituicao: string;
  curso: string;
  grau?: string | null;
  descricao?: string | null;
  data_inicio?: string | null;
  data_fim?: string | null;
  em_andamento?: boolean;
  criado_em?: string;
  atualizado_em?: string;
}

export interface Habilidade {
  id: number;
  pessoa_id: number;
  nome: string;
  nivel?: string | null;
  categoria?: string | null;
  criado_em?: string;
  atualizado_em?: string;
}

export interface Projeto {
  id: number;
  pessoa_id: number;
  nome: string;
  descricao?: string | null;
  url?: string | null;
  github?: string | null;
  imagem_url?: string | null;
  destaque?: boolean;
  criado_em?: string;
  atualizado_em?: string;

  // Caso sua API retorne habilidades vinculadas ao projeto
  habilidades?: Habilidade[];
}

export interface Certificado {
  id: number;
  pessoa_id: number;
  nome: string;
  emissor: string;
  data_emissao?: string | null;
  data_expiracao?: string | null;
  url?: string | null;
  credencial_id?: string | null;
  criado_em?: string;
  atualizado_em?: string;
}

export interface Idioma {
  id: number;
  pessoa_id: number;
  idioma: string;
  nivel: string;
  criado_em?: string;
  atualizado_em?: string;
}

export interface ApiResponse<T> {
  sucesso: boolean;
  dados: T;
  erro?: string;
}