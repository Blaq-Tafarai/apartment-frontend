import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { expenseService } from '../services/expenseService'

export const useExpenses = params =>
  useQuery({
    queryKey: ['expenses', params],
    queryFn: () => expenseService.getAll(params),
  })

export const useExpense = id =>
  useQuery({
    queryKey: ['expense', id],
    queryFn: () => expenseService.getById(id),
    enabled: !!id,
  })

export const useCreateExpense = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: expenseService.create,
    onSuccess: () => qc.invalidateQueries(['expenses']),
  })
}

export const useUpdateExpense = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: expenseService.update,
    onSuccess: () => qc.invalidateQueries(['expenses']),
  })
}

export const useDeleteExpense = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: expenseService.delete,
    onSuccess: () => qc.invalidateQueries(['expenses']),
  })
}
