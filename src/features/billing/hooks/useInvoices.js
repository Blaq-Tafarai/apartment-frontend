import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { billingService } from '../services/billingService'

export const useInvoices = params =>
  useQuery({
    queryKey: ['invoices', params],
    queryFn: () => billingService.getAll(params),
  })

export const useInvoice = id =>
  useQuery({
    queryKey: ['invoice', id],
    queryFn: () => billingService.getById(id),
    enabled: !!id,
  })

export const useCreateInvoice = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: billingService.create,
    onSuccess: () => qc.invalidateQueries(['invoices']),
  })
}

export const useUpdateInvoice = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...payload }) => billingService.update(id, payload),
    onSuccess: () => qc.invalidateQueries(['invoices']),
  })
}

export const useDeleteInvoice = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: id => billingService.delete(id),
    onSuccess: () => qc.invalidateQueries(['invoices']),
  })
}
