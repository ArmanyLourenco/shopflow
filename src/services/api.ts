import axios from 'axios';

export const TOKEN_KEY = 'shopflow_access_token';
export const api = axios.create({ baseURL: 'https://dummyjson.com', timeout: 12000, headers: { 'Content-Type': 'application/json' } });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
api.interceptors.response.use((response) => response, (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') return Promise.reject(new Error('A solicitação demorou demais. Tente novamente.'));
    if (!error.response) return Promise.reject(new Error('Não foi possível conectar à API. Verifique sua internet.'));
    const message = typeof error.response.data?.message === 'string' ? error.response.data.message : 'Ocorreu um erro ao comunicar com o servidor.';
    return Promise.reject(new Error(message));
  }
  return Promise.reject(error);
});
export function readableError(error: unknown): string { return error instanceof Error ? error.message : 'Ocorreu um erro inesperado.'; }
