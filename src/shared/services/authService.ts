import { apiClient } from '../api/apiClient'; // Importa o cliente correto
import { LoginResponseDTO } from '../types';

export const authService = {
  login: async (email: string, password: string) => {
    // 🔥 CORREÇÃO: Usamos 'apiClient' aqui, não 'api'
    const { data } = await apiClient.post<LoginResponseDTO>('/auth/login', { 
      email, 
      password 
    });
    return data;
  },

  register: async (payload: any) => {
    const { data } = await apiClient.post('/auth/register', payload);
    return data;
  }
};