// src/api/axiosInstance.ts

import axios, { type AxiosInstance } from 'axios';

// Set the base URL for your MockAPI project
const API_BASE_URL: string = import.meta.env.VITE_MOCK_API_BASE_URL; 

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;