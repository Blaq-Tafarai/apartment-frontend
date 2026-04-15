import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createApiClient } from '../../../utils/apiHelpers';
import { useAuth } from '../../../context/AuthContext';

const ENDPOINTS = {
  list: '/api/v1/subscriptions',
  single: (id) => `/api/v1/subscriptions/${id}`,
  create: '/api/v1/subscriptions',
  update: (id) => `/api/v1/subscriptions/${id}`,
  delete: (id) => `/api/v1/subscriptions/${id}`,
};

export const useSubscriptions = (params = {}) => {
  const { accessToken: getAccessToken } = useAuth();
  const apiClient = createApiClient(getAccessToken);

  return useQuery({
    queryKey: ['subscriptions', params],
    queryFn: () => apiClient.get(ENDPOINTS.list, params),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useSubscription = (id) => {
  const { accessToken: getAccessToken } = useAuth();
  const apiClient = createApiClient(getAccessToken);

  return useQuery({
    queryKey: ['subscription', id],
    queryFn: () => apiClient.get(ENDPOINTS.single(id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useCreateSubscription = () => {
  const { accessToken: getAccessToken } = useAuth();
  const apiClient = createApiClient(getAccessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => apiClient.post(ENDPOINTS.create, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
  });
};

export const useUpdateSubscription = () => {
  const { accessToken: getAccessToken } = useAuth();
  const apiClient = createApiClient(getAccessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => apiClient.put(ENDPOINTS.update(id), payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
  });
};

export const useDeleteSubscription = () => {
  const { accessToken: getAccessToken } = useAuth();
  const apiClient = createApiClient(getAccessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => apiClient.delete(ENDPOINTS.delete(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
  });
};

