import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { buildingService } from '../services/buildingService'

export const useBuildings = params =>
  useQuery({
    queryKey: ['buildings', params],
    queryFn: () => buildingService.getAll(params),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  })

export const useBuilding = id =>
  useQuery({
    queryKey: ['building', id],
    queryFn: () => buildingService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  })

export const useCreateBuilding = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: buildingService.create,
    onSuccess: () => qc.invalidateQueries(['buildings']),
  })
}

export const useUpdateBuilding = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }) => buildingService.update(id, payload),
    onSuccess: () => qc.invalidateQueries(['buildings']),
  })
}

export const useDeleteBuilding = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: buildingService.delete,
    onSuccess: () => qc.invalidateQueries(['buildings']),
  })
}
