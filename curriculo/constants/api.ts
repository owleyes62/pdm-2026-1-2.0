import type { Pessoa, Experiencia, Formacao, Habilidade, Projeto, Certificado, Idioma } from '../types';

// ============================================================
// Troque pelo IP da sua máquina quando rodar no device físico
// Emulador Android → 'http://10.0.2.2:3000'
// Device na rede   → 'http://192.168.x.x:3000'
// iOS Simulator    → 'http://localhost:3000'
// ============================================================
export const BASE_URL = 'http://192.168.0.15:3000';
export const PESSOA_ID = 12; // ID do Iwerson no banco

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`Falha ao buscar: ${path}`);
  const json = await res.json();
  return json.dados as T;
}

export const api = {
  getPessoa:      () => get<Pessoa>(`/api/pessoas/${PESSOA_ID}`),
  getExperiencias:() => get<Experiencia[]>(`/api/pessoas/${PESSOA_ID}/experiencias`),
  getFormacoes:   () => get<Formacao[]>(`/api/pessoas/${PESSOA_ID}/formacoes`),
  getProjetos:    () => get<Projeto[]>(`/api/pessoas/${PESSOA_ID}/projetos`),
  getHabilidades: () => get<Habilidade[]>(`/api/pessoas/${PESSOA_ID}/habilidades`),
  getCertificados:() => get<Certificado[]>(`/api/pessoas/${PESSOA_ID}/certificados`),
  getIdiomas:     () => get<Idioma[]>(`/api/pessoas/${PESSOA_ID}/idiomas`),
};