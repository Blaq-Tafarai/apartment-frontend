import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { leaseService } from '../services/leaseService'

export const useLeases = params =>
  useQuery({
    queryKey: ['leases', params],
    queryFn: () => leaseService.getAll(params),
  })

export const useLease = id =>
  useQuery({
    queryKey: ['lease', id],
    queryFn: () => leaseService.getById(id),
    enabled: !!id,
  })

export const useCreateLease = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: leaseService.create,
    onSuccess: () => qc.invalidateQueries(['leases']),
  })
}

export const useUpdateLease = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...payload }) => leaseService.update(id, payload),
    onSuccess: () => qc.invalidateQueries(['leases']),
  })
}

export const useDeleteLease = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: leaseService.delete,
    onSuccess: () => qc.invalidateQueries(['leases']),
  })
}
