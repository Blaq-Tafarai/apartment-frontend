import api, { createApiClient } from '../../../utils/apiHelpers';

export const authService = {

  login: async (email, password) => {
    return api.post('/api/v1/auth/login', { email, password });
  },

  refresh: async () => {
    return api.post('/api/v1/auth/refresh');
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
      {
        Authorization: `Bearer ${token}`
      }
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
      newPassword
    });
  }
};