import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { companiesService } from '../services/companiesService'

export const useCompanies = params =>
  useQuery({
    queryKey: ['companies', params],
    queryFn: () => companiesService.getAll(params),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  })

export const useCompany = id =>
  useQuery({
    queryKey: ['company', id],
    queryFn: () => companiesService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  })

export const useCreateCompany = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: companiesService.create,
    onSuccess: () => qc.invalidateQueries(['companies']),
  })
}

export const useUpdateCompany = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }) => companiesService.update(id, payload),
    onSuccess: () => qc.invalidateQueries(['companies']),
  })
}

export const useDeleteCompany = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: companiesService.delete,
    onSuccess: () => qc.invalidateQueries(['companies']),
  })
}
