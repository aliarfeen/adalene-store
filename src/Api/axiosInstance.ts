import axios, { type AxiosInstance } from 'axios';

// Setting up base URL
const API_BASE_URL: string = import.meta.env.VITE_MOCK_API_BASE_URL; 

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;