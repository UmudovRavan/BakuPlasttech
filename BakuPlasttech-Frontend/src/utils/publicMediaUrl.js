const fallbackApiUrl = 'https://localhost:7114';
const rawApiUrl = import.meta.env.VITE_API_URL || fallbackApiUrl;
const apiBaseUrl = rawApiUrl.replace(/\/+$/, '');

export const resolvePublicMediaUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;

  if (url.startsWith('/')) {
    return `${apiBaseUrl}${url}`;
  }

  return `${apiBaseUrl}/uploads/${url}`;
};

