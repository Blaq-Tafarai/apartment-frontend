import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { authService } from '../features/auth/services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const accessTokenRef = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Get access token for API helpers
  const getAccessToken = useCallback(() => accessTokenRef.current, []);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        // Try refresh using http-only cookie
        const refreshResponse = await authService.refresh().catch(() => null);
        
        if (refreshResponse?.accessToken) {
          accessTokenRef.current = refreshResponse.accessToken;
        }
        if (refreshResponse?.user) {
          setUser(refreshResponse.user);
          localStorage.setItem('userProfile', JSON.stringify(refreshResponse.user));
        }
        setIsAuthenticated(!!accessTokenRef.current || !!refreshResponse?.user);
      } catch (error) {
        console.error('Auth init failed:', error);
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const clearAuth = () => {
    accessTokenRef.current = null;
    localStorage.removeItem('userProfile');
    setUser(null);
    setIsAuthenticated(false);
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authService.login(email, password);
      
      if (response.accessToken) {
        accessTokenRef.current = response.accessToken;
      }
      if (response.user) {
        setUser(response.user);
        localStorage.setItem('userProfile', JSON.stringify(response.user));
      }
      setIsAuthenticated(true);
      return { success: true, user: response.user };
    } catch (error) {
      const errorMsg = error.message || 'Login failed';
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await authService.refresh();
      if (response.accessToken) {
        accessTokenRef.current = response.accessToken;
      }
      if (response.user) {
        setUser(response.user);
        localStorage.setItem('userProfile', JSON.stringify(response.user));
      }
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      clearAuth();
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      clearAuth();
    }
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    localStorage.setItem('userProfile', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    accessToken: getAccessToken,
    login,
    refreshToken,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

