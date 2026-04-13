import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apartmentService } from '../services/apartmentService'

export const useApartments = params =>
  useQuery({
    queryKey: ['apartments', params],
    queryFn: () => apartmentService.getAll(params),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  })

export const useApartment = id =>
  useQuery({
    queryKey: ['apartment', id],
    queryFn: () => apartmentService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  })

export const useCreateApartment = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: apartmentService.create,
    onSuccess: () => qc.invalidateQueries(['apartments']),
  })
}

export const useUpdateApartment = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }) => apartmentService.update(id, payload),
    onSuccess: () => qc.invalidateQueries(['apartments']),
  })
}

export const useDeleteApartment = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: apartmentService.delete,
    onSuccess: () => qc.invalidateQueries(['apartments']),  
})
}
