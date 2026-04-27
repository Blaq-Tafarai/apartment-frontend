// httpClientWithRefresh.js

import { authService } from '../features/auth/services/authService.js';

let isRefreshing = false;
let pendingRequests = [];
let refreshFailedThisSession = false;
let isInitialized = false;
let currentAccessToken = null;

export const setAccessToken = (token) => {
  currentAccessToken = token;
};

export const getAccessToken = () => currentAccessToken;

const processQueue = (error) => {
  pendingRequests.forEach((p) => p.reject(error));
  pendingRequests = [];
};

const retryQueue = () => {
  pendingRequests.forEach((p) => p.resolve());
  pendingRequests = [];
};

const isRecentlyLoggedOut = () => {
  const loggedOutAt = localStorage.getItem('loggedOutAt');
  return loggedOutAt && Date.now() - parseInt(loggedOutAt) < 5 * 60 * 1000;
};

const redirectToLogin = () => {
  if (!window.location.pathname.includes('/login')) {
    window.location.href = '/login';
  }
};

export const setInitialized = () => {
  isInitialized = true;
};

export const resetRefreshState = () => {
  refreshFailedThisSession = false;
  isRefreshing = false;
  isInitialized = true;
  pendingRequests = [];
};

export const baseFetch = async (endpoint, options = {}) => {
  const response = await window.fetch(endpoint, {
    ...options,
    credentials: 'include',
  });

  if (response.status !== 401) {
    return response;
  }

  // ✅ Don't attempt refresh while initAuth is still running
  // initAuth handles its own refresh — let it finish first
  if (!isInitialized) {
    return response;
  }

  if (refreshFailedThisSession) {
    redirectToLogin();
    return response;
  }

  if (isRecentlyLoggedOut()) {
    redirectToLogin();
    return response;
  }

  // ✅ Prevent infinite refresh loops: if we already refreshed for this request, stop
  if (options._refreshAttempted) {
    refreshFailedThisSession = true;
    redirectToLogin();
    return response;
  }

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      pendingRequests.push({
        resolve: () =>
          baseFetch(endpoint, options).then(resolve).catch(reject),
        reject,
      });
    });
  }

  isRefreshing = true;

  try {
    const refreshResponse = await authService.refresh();

    // ✅ Store the new access token so retried requests can use it
    if (refreshResponse?.data?.accessToken) {
      setAccessToken(refreshResponse.data.accessToken);
    }

    isRefreshing = false;
    retryQueue();
    return baseFetch(endpoint, { ...options, _refreshAttempted: true });
  } catch (refreshError) {
    isRefreshing = false;
    refreshFailedThisSession = true;
    processQueue(refreshError);
    redirectToLogin();
    return response;
  }
};
