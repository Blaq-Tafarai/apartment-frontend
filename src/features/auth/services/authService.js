import api, { createApiClient, API_BASE_URL } from '../../../utils/apiHelpers';

export const authService = {

  login: async (email, password) => {
    return api.post('/api/v1/auth/login', { email, password });
  },

  // ✅ Raw fetch — bypasses baseFetch interceptor entirely
  refresh: async () => {
    const response = await window.fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Refresh failed');
    }

    // ✅ Return as-is — backend already returns { success, data: { user, accessToken } }
    return response.json();
  },

  forgotPassword: async (email) => {
    return api.post('/api/v1/auth/forgot-password', { email });
  },

  register: async (email, password) => {
    return api.post('/api/v1/auth/register', { email, password });
  },

  verifyOtp: async (email, otp) => {
    return api.post('/api/v1/auth/verify-otp', { email, otp });
  },

  resetPassword: async ({ newPassword, token }) => {
    return api.post(
      '/api/v1/auth/reset-password',
      { newPassword },
      { Authorization: `Bearer ${token}` }
    );
  },

  logout: async () => {
    return api.post('/api/v1/auth/logout');
  },

  getMe: async (getAccessToken) => {
    const protectedApi = createApiClient(getAccessToken);
    return protectedApi.get('/api/v1/auth/me');
  },

  changePassword: async (currentPassword, newPassword, getAccessToken) => {
    const protectedApi = createApiClient(getAccessToken);
    return protectedApi.put('/api/v1/auth/change-password', {
      currentPassword,
      newPassword,
    });
  },
};