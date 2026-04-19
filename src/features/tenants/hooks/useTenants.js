import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createApiClient } from '../../../utils/apiHelpers'
import { useAuth } from '../../../context/AuthContext'

const ENDPOINTS = {
  list: '/api/v1/tenants',
  single: (id) => `/api/v1/tenants/${id}`,
  create: '/api/v1/tenants',
  update: (id) => `/api/v1/tenants/${id}`,
  delete: (id) => `/api/v1/tenants/${id}`,
}

export const useTenants = (params = {}) => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)

  return useQuery({
    queryKey: ['tenants', params],
    queryFn: () => apiClient.get(ENDPOINTS.list, params),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  })
}

export const useTenant = (id) => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)

  return useQuery({
    queryKey: ['tenant', id],
    queryFn: () => apiClient.get(ENDPOINTS.single(id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  })
}

export const useCreateTenant = () => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => apiClient.post(ENDPOINTS.create, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] })
    },
  })
}

export const useUpdateTenant = () => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }) => apiClient.put(ENDPOINTS.update(id), payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] })
    },
  })
}

export const useDeleteTenant = () => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => apiClient.delete(ENDPOINTS.delete(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] })
    },
  })
}
