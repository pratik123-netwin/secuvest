import axios from 'axios';
import { CONFIG } from '../constants/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  timeout: CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token on Unauthorized
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
      // The authSlice dispatch will be handled either by the navigation wrapper
      // or by the components when api call fails.
    }
    return Promise.reject(error);
  }
);

export default api;
