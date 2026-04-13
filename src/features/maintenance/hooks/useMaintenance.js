import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { maintenanceService } from '../services/maintenanceService'

export const useMaintenance = params =>
  useQuery({
    queryKey: ['maintenance', params],
    queryFn: () => maintenanceService.getAll(params),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  })

export const useMaintenanceItem = id =>
  useQuery({
    queryKey: ['maintenance', id],
    queryFn: () => maintenanceService.getById(id),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  })

export const useCreateMaintenance = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: maintenanceService.create,
    onSuccess: () => qc.invalidateQueries(['maintenance']),
  })
}

export const useUpdateMaintenance = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }) => maintenanceService.update(id, payload),
    onSuccess: () => qc.invalidateQueries(['maintenance']),
  })
}

export const useDeleteMaintenance = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: maintenanceService.delete,
    onSuccess: () => {
      qc.invalidateQueries(['maintenance']) 
},
  })
}
