const fallbackApiUrl = 'https://localhost:7114';

const rawApiUrl = import.meta.env.VITE_API_URL || fallbackApiUrl;

export const API_BASE_URL = rawApiUrl.replace(/\/+$/, '');
export const API_BASE_PATH = `${API_BASE_URL}/api`;
