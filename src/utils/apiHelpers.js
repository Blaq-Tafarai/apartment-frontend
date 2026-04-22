import { baseFetch } from './httpClientWithRefresh.js';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Request failed');
  }
  return response.json();
};

export const createApiClient = (getAccessToken) => ({

  get: async (endpoint, params = {}, customHeaders = {}) => {
    const token = getAccessToken ? getAccessToken() : null;
    const queryString = new URLSearchParams(params).toString();
    const url = queryString
      ? `${API_BASE_URL}${endpoint}?${queryString}`
      : `${API_BASE_URL}${endpoint}`;

    const response = await baseFetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...customHeaders,
      },
    });

    return handleResponse(response);
  },

  post: async (endpoint, data, customHeaders = {}) => {
    const token = getAccessToken ? getAccessToken() : null;

    const response = await baseFetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...customHeaders,
      },
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  put: async (endpoint, data, customHeaders = {}) => {
    const token = getAccessToken ? getAccessToken() : null;

    const response = await baseFetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...customHeaders,
      },
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  patch: async (endpoint, data, customHeaders = {}) => {
    const token = getAccessToken ? getAccessToken() : null;

    const response = await baseFetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...customHeaders,
      },
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  delete: async (endpoint, customHeaders = {}) => {
    const token = getAccessToken ? getAccessToken() : null;

    const response = await baseFetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...customHeaders,
      },
    });

    return handleResponse(response);
  },

  upload: async (endpoint, formData, customHeaders = {}) => {
    const token = getAccessToken ? getAccessToken() : null;

    const response = await baseFetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...customHeaders,
      },
    });

    return handleResponse(response);
  },
});

export const api = createApiClient(null);
export default api;