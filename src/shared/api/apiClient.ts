import axios from 'axios';

// Detecta se é localhost (Web) ou IP da rede
const BASE_URL = 'http://localhost:8080'; 

// 🔥 CORREÇÃO: Adicionamos "export" aqui para outros arquivos poderem usar
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Injeta o Token JWT automaticamente
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@sparta:token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de Resposta: Trata token expirado (403/401)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      console.error("Sessão expirada ou acesso negado.");
      // Opcional: Limpar storage
      // localStorage.removeItem('@sparta:token');
    }
    return Promise.reject(error);
  }
);