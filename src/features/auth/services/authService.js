import api from '../../../utils/apiHelpers';

export const authService = {
  login: async (email, password) => {
    try {
      // In production: return api.post('/auth/login', { email, password });
      // Mock implementation
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: email,
        role: 'admin',
        token: 'mock-jwt-token',
      };
      return Promise.resolve(mockUser);
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      // return api.post('/auth/register', userData);
      const newUser = {
        id: Date.now(),
        ...userData,
        role: 'user',
        token: 'mock-jwt-token',
      };
      return Promise.resolve(newUser);
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      // return api.post('/auth/logout');
      return Promise.resolve({ success: true });
    } catch (error) {
      throw error;
    }
  },

  forgotPassword: async (email) => {
    try {
      // return api.post('/auth/forgot-password', { email });
      return Promise.resolve({ success: true, message: 'Reset link sent' });
    } catch (error) {
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    try {
      // return api.post('/auth/reset-password', { token, password });
      return Promise.resolve({ success: true });
    } catch (error) {
      throw error;
    }
  },

  verifyToken: async (token) => {
    try {
      // return api.get(`/auth/verify/${token}`);
      return Promise.resolve({ valid: true });
    } catch (error) {
      throw error;
    }
  },
};
