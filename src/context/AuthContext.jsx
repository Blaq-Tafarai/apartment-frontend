import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { queryClient } from '../queryClient';
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
  const logoutInProgressRef = useRef(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Get access token for API helpers
  const getAccessToken = useCallback(() => accessTokenRef.current, []);

  // Initialize auth state
  useEffect(() => {
const initAuth = async () => {
      if (logoutInProgressRef.current) {
        console.log('Skipping auth init due to logout in progress');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // Try refresh using http-only cookie
        const refreshResponse = await authService.refresh().catch(() => null);
        
        if (refreshResponse?.data?.accessToken) {
          accessTokenRef.current = refreshResponse.data.accessToken;
        }
        const userData = {
          ...refreshResponse?.data?.user,
          mustChangePassword: refreshResponse?.data?.mustChangePassword ?? false
        };
        if (userData) {
          setUser(userData);
          localStorage.setItem('userProfile', JSON.stringify(userData));
        }
        setIsAuthenticated(!!accessTokenRef.current || !!userData);
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
      
      if (response.data?.accessToken) {
        accessTokenRef.current = response.data.accessToken;
      }
      const userData = {
        ...response.data?.user,
        mustChangePassword: response.data?.mustChangePassword ?? false
      };
      if (userData) {
        setUser(userData);
        localStorage.setItem('userProfile', JSON.stringify(userData));
      }
      setIsAuthenticated(true);
      return { success: true, user: userData, mustChangePassword: response.data?.mustChangePassword ?? false };
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
      if (response.data?.accessToken) {
        accessTokenRef.current = response.data.accessToken;
      }
      const userData = {
        ...response.data?.user,
        mustChangePassword: response.data?.mustChangePassword ?? false
      };
      if (userData) {
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
      // Invalidate all queries
      queryClient.clear();
      queryClient.invalidateQueries();
      clearAuth();
      logoutInProgressRef.current = false;
    }
  };

  const updateUser = (userData) => {
    const updatedUser = { 
      ...user, 
      ...userData,
      mustChangePassword: userData.mustChangePassword ?? user?.mustChangePassword 
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

