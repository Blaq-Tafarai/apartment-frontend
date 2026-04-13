import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { paymentService } from '../services/paymentService'

export const usePayments = params =>
  useQuery({
    queryKey: ['payments', params],
    queryFn: () => paymentService.getAll(params),
  })

export const usePayment = id =>
  useQuery({
    queryKey: ['payment', id],
    queryFn: () => paymentService.getById(id),
    enabled: !!id,
  })

export const useCreatePayment = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: paymentService.create,
    onSuccess: () => qc.invalidateQueries(['payments']),
  })
}

export const useUpdatePayment = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => paymentService.update(id, data),
    onSuccess: () => qc.invalidateQueries(['payments']),
  })
}

export const useDeletePayment = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: id => paymentService.delete(id),
    onSuccess: () => qc.invalidateQueries(['payments']),
  })
}