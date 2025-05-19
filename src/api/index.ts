import axios from 'axios';

const vueMiniApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

vueMiniApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { vueMiniApi };
