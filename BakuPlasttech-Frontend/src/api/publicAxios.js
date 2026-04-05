import axios from 'axios';

const fallbackApiUrl = 'https://localhost:7114';
const rawApiUrl = import.meta.env.VITE_API_URL || fallbackApiUrl;
const apiBaseUrl = rawApiUrl.replace(/\/+$/, '');
const apiBasePath = `${apiBaseUrl}/api`;

const publicAxios = axios.create({
  baseURL: apiBasePath,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

export default publicAxios;
