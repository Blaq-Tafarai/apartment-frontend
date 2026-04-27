import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createApiClient } from '../../../utils/apiHelpers'
import { useAuth } from '../../../context/AuthContext'

const ENDPOINTS = {
  list: '/api/v1/leases',
  single: (id) => `/api/v1/leases/${id}`,
  create: '/api/v1/leases',
  update: (id) => `/api/v1/leases/${id}`,
  delete: (id) => `/api/v1/leases/${id}`,
}

export const useLeases = (params = {}) => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)

  return useQuery({
    queryKey: ['leases', params],
    queryFn: () => apiClient.get(ENDPOINTS.list, params),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  })
}

export const useLease = (id) => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)

  return useQuery({
    queryKey: ['leases', id],
    queryFn: () => apiClient.get(ENDPOINTS.single(id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  })
}

export const useCreateLease = () => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => apiClient.post(ENDPOINTS.create, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leases'] })
    },
  })
}

export const useUpdateLease = () => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }) => apiClient.put(ENDPOINTS.update(id), payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leases'] })
    },
  })
}

export const useDeleteLease = () => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => apiClient.delete(ENDPOINTS.delete(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leases'] })
    },
  })
}
