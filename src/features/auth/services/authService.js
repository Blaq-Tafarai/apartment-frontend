import api from '../../../utils/apiHelpers';

export const authService = {
  login: async (email, password) => {
    // Auth endpoints use cookies only, no Bearer
    return api.post('/api/v1/auth/login', { email, password });
  },

  refresh: async () => {
    // Public refresh using http-only cookie only
    return api.post('/api/v1/auth/refresh');
  },

  forgotPassword: async (email) => {
    return api.post('/api/v1/auth/forgot-password', { email });
  },

  register: async (email, password) => {
    return api.post('/api/v1/auth/register', { email, password });
  },



  verifyOtp: async (otp) => {
    return api.post('/api/v1/auth/verify-otp', { otp });
  },

resetPassword: async (password) => {
    return api.post('/api/v1/auth/reset-password', { password });
  },

  logout: async () => {
    return api.post('/api/v1/auth/logout');
  },

  getMe: async () => {
    return api.get('/api/v1/auth/me');
  }
};

