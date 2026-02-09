import { apiClient } from '../api/apiClient';
import { CreateTrainingDTO } from '../types';

export const trainingService = {
  createRequest: async (data: CreateTrainingDTO) => {
    const { data: response } = await apiClient.post('/trainings', data);
    return response;
  },

  getMyTrainings: async () => {
    const { data } = await apiClient.get('/trainings/my-trainings');
    return data;
  }
};