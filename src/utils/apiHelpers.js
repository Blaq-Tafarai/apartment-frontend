import { useAuth } from '../context/AuthContext';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// ----------------------------------
// Handle HTTP responses
// ----------------------------------

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || 'Request failed')
  }

  return response.json()
}

// ----------------------------------
// Base fetch wrapper with auth
// ----------------------------------

export const createApiClient = (getAccessToken) => ({
  get: async (endpoint) => {
    const token = getAccessToken ? getAccessToken() : null;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      credentials: 'include', // Always send cookies (refresh token)
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return handleResponse(response);
  },

  post: async (endpoint, data) => {
    const token = getAccessToken ? getAccessToken() : null;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  put: async (endpoint, data) => {
    const token = getAccessToken ? getAccessToken() : null;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  patch: async (endpoint, data) => {
    const token = getAccessToken ? getAccessToken() : null;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (endpoint) => {
    const token = getAccessToken ? getAccessToken() : null;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return handleResponse(response);
  },

  upload: async (endpoint, formData) => {
    const token = getAccessToken ? getAccessToken() : null;
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
      headers,
    });
    return handleResponse(response);
  },
});

// Default instance (can pass getAccessToken from context)
export const api = createApiClient(null);
export default api;

