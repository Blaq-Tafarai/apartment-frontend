import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createApiClient } from '../../../utils/apiHelpers'
import { useAuth } from '../../../context/AuthContext'

const ENDPOINTS = {
  list: '/api/v1/buildings',
  single: (id) => `/api/v1/buildings/${id}`,
  create: '/api/v1/buildings',
  update: (id) => `/api/v1/buildings/${id}`,
  delete: (id) => `/api/v1/buildings/${id}`,
}

export const useBuildings = (params = {}) => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)

  return useQuery({
    queryKey: ['buildings', params],
    queryFn: () => apiClient.get(ENDPOINTS.list, params),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  })
}

export const useBuilding = (id) => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)

  return useQuery({
    queryKey: ['building', id],
    queryFn: () => apiClient.get(ENDPOINTS.single(id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  })
}

export const useCreateBuilding = () => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => apiClient.post(ENDPOINTS.create, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buildings'] })
    },
  })
}

export const useUpdateBuilding = () => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }) => apiClient.put(ENDPOINTS.update(id), payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buildings'] })
    },
  })
}

export const useDeleteBuilding = () => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => apiClient.delete(ENDPOINTS.delete(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buildings'] })
    },
  })
}
