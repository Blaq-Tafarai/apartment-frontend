import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createApiClient } from '../../../utils/apiHelpers'
import { useAuth } from '../../../context/AuthContext'
import { usersService } from '../services/usersService'

const ENDPOINTS = {
  list: '/api/v1/users',
  single: (id) => `/api/v1/users/${id}`,
  create: '/api/v1/users',
  update: (id) => `/api/v1/users/${id}`,
  delete: (id) => `/api/v1/users/${id}`,
}

export const useUsers = (params = {}) => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)

  return useQuery({
    queryKey: ['users', params],
    queryFn: () => apiClient.get(ENDPOINTS.list, params),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  })
}

export const useUser = (id) => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)

  return useQuery({
    queryKey: ['user', id],
    queryFn: () => apiClient.get(ENDPOINTS.single(id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  })
}

export const useCreateUser = () => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => apiClient.post(ENDPOINTS.create, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export const useUpdateUser = () => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }) => apiClient.put(ENDPOINTS.update(id), payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export const useDeleteUser = () => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => apiClient.delete(ENDPOINTS.delete(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

