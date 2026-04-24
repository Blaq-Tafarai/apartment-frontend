import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createApiClient } from '../../../utils/apiHelpers'
import { useAuth } from '../../../context/AuthContext'

const ENDPOINTS = {
  list: '/api/v1/expenses',
  single: (id) => `/api/v1/expenses/${id}`,
  create: '/api/v1/expenses',
  update: (id) => `/api/v1/expenses/${id}`,
  delete: (id) => `/api/v1/expenses/${id}`,
}

export const useExpenses = (params = {}) => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)

  return useQuery({
    queryKey: ['expenses', params],
    queryFn: () => apiClient.get(ENDPOINTS.list, params),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  })
}

export const useExpense = (id) => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)

  return useQuery({
    queryKey: ['expenses', id],
    queryFn: () => apiClient.get(ENDPOINTS.single(id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  })
}

export const useCreateExpense = () => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => apiClient.post(ENDPOINTS.create, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    },
  })
}

export const useUpdateExpense = () => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }) => apiClient.put(ENDPOINTS.update(id), payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    },
  })
}

export const useDeleteExpense = () => {
  const { accessToken: getAccessToken } = useAuth()
  const apiClient = createApiClient(getAccessToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => apiClient.delete(ENDPOINTS.delete(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    },
  })
}
