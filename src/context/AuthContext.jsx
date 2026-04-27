import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { queryClient } from '../queryClient';
import { authService } from '../features/auth/services/authService';
import { resetRefreshState, setInitialized, setAccessToken } from '../utils/httpClientWithRefresh';

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
  const logoutInProgressRef = useRef(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const getAccessToken = useCallback(() => accessTokenRef.current, []);

  const clearAuth = () => {
    accessTokenRef.current = null;
    setAccessToken(null);
    localStorage.removeItem('userProfile');
    localStorage.removeItem('loggedOutAt');
    setUser(null);
    setIsAuthenticated(false);
  };

  const authInitializedRef = useRef(false);

  useEffect(() => {
    // ✅ Prevents StrictMode double-invoke in development
    if (authInitializedRef.current) return;
    authInitializedRef.current = true;

    const initAuth = async () => {
      if (window.location.pathname.includes('/login')) {
        setInitialized();
        setLoading(false);
        return;
      }

      if (logoutInProgressRef.current) {
        setInitialized();
        setLoading(false);
        return;
      }

      const loggedOutAt = localStorage.getItem('loggedOutAt');
      if (loggedOutAt && Date.now() - parseInt(loggedOutAt) < 5 * 60 * 1000) {
        clearAuth();
        setInitialized();
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const refreshResponse = await authService.refresh();

        if (refreshResponse?.data?.accessToken) {
          accessTokenRef.current = refreshResponse.data.accessToken;
          setAccessToken(refreshResponse.data.accessToken);
        }

        const rawUser = refreshResponse?.data?.user;
        if (rawUser) {
          const userData = {
            ...rawUser,
            mustChangePassword: refreshResponse?.data?.mustChangePassword ?? false,
          };
          setUser(userData);
          localStorage.setItem('userProfile', JSON.stringify(userData));
        }

        setIsAuthenticated(!!accessTokenRef.current && !!rawUser);
      } catch (error) {
        console.error('Auth init failed:', error);
        clearAuth();
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      } finally {
        setInitialized();
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      localStorage.removeItem('loggedOutAt');
      resetRefreshState();
      setLoading(true);
      const response = await authService.login(email, password);

      if (response.data?.accessToken) {
        accessTokenRef.current = response.data.accessToken;
        setAccessToken(response.data.accessToken);
      }

      const rawUser = response.data?.user;
      if (rawUser) {
        const userData = {
          ...rawUser,
          mustChangePassword: response.data?.mustChangePassword ?? false,
        };
        setUser(userData);
        localStorage.setItem('userProfile', JSON.stringify(userData));
      }

      setIsAuthenticated(true);
      return {
        success: true,
        user: rawUser,
        mustChangePassword: response.data?.mustChangePassword ?? false,
      };
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await authService.refresh();

      if (response?.data?.accessToken) {
        accessTokenRef.current = response.data.accessToken;
        setAccessToken(response.data.accessToken);
      }

      const rawUser = response?.data?.user;
      if (rawUser) {
        const userData = {
          ...rawUser,
          mustChangePassword: response?.data?.mustChangePassword ?? false,
        };
        setUser(userData);
        localStorage.setItem('userProfile', JSON.stringify(userData));
      }

      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      clearAuth();
      throw error;
    }
  };

  const logout = async () => {
    logoutInProgressRef.current = true;
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      queryClient.clear();
      queryClient.invalidateQueries();
      clearAuth();
      localStorage.setItem('loggedOutAt', Date.now().toString());
      logoutInProgressRef.current = false;
    }
  };

  const updateUser = (userData) => {
    const updatedUser = {
      ...user,
      ...userData,
      mustChangePassword: userData.mustChangePassword ?? user?.mustChangePassword,
    };
    localStorage.setItem('userProfile', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    mustChangePassword: user?.mustChangePassword,
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