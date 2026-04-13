import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { documentService } from '../services/documentService'

export const useDocuments = params =>
  useQuery({
    queryKey: ['documents', params],
    queryFn: () => documentService.getAll(params),
  })

export const useDocument = id =>
  useQuery({
    queryKey: ['document', id],
    queryFn: () => documentService.getById(id),
    enabled: !!id,
  })

export const useCreateDocument = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: documentService.create,
    onSuccess: () => qc.invalidateQueries(['documents']),
  })
}

export const useUpdateDocument = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }) => documentService.update(id, payload),
    onSuccess: () => qc.invalidateQueries(['documents']),
  })
}

export const useDeleteDocument = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: documentService.delete,
    onSuccess: () => qc.invalidateQueries(['documents']),
  })
}

export const useDownloadDocument = () => {
  return useMutation({
    mutationFn: documentService.download,
  })
}
