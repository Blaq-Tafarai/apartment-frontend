import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createApiClient } from '../../../utils/apiHelpers';
import { useAuth } from '../../../context/AuthContext';

const ENDPOINTS = {
  list: '/api/v1/maintenances',
  single: (id) => `/api/v1/maintenances/${id}`,
  create: '/api/v1/maintenances',
  update: (id) => `/api/v1/maintenances/${id}`,
  delete: (id) => `/api/v1/maintenances/${id}`,
};

export const useMaintenances = (params = {}) => {
  const { accessToken: getAccessToken } = useAuth();
  const apiClient = createApiClient(getAccessToken);

  return useQuery({
    queryKey: ['maintenances', params],
    queryFn: () => apiClient.get(ENDPOINTS.list, params),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useMaintenance = (id) => {
  const { accessToken: getAccessToken } = useAuth();
  const apiClient = createApiClient(getAccessToken);

  return useQuery({
    queryKey: ['maintenances', id],
    queryFn: () => apiClient.get(ENDPOINTS.single(id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useCreateMaintenance = () => {
  const { accessToken: getAccessToken } = useAuth();
  const apiClient = createApiClient(getAccessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => apiClient.post(ENDPOINTS.create, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenances'] });
    },
  });
};

export const useUpdateMaintenance = () => {
  const { accessToken: getAccessToken } = useAuth();
  const apiClient = createApiClient(getAccessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => apiClient.put(ENDPOINTS.update(id), payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenances'] });
    },
  });
};

export const useDeleteMaintenance = () => {
  const { accessToken: getAccessToken } = useAuth();
  const apiClient = createApiClient(getAccessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => apiClient.delete(ENDPOINTS.delete(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenances'] });
    },
  });
};

