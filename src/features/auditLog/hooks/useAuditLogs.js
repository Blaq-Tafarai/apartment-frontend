import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { auditLogService } from '../services/auditLogService'

export const useAuditLogs = params =>
  useQuery({
    queryKey: ['auditLogs', params],
    queryFn: () => auditLogService.getAll(params),
  })

export const useAuditLog = id =>
  useQuery({
    queryKey: ['auditLog', id],
    queryFn: () => auditLogService.getById(id),
    enabled: !!id,
  })

export const useCreateAuditLog = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: auditLogService.create,
    onSuccess: () => qc.invalidateQueries(['auditLogs']),
  })
}

export const useUpdateAuditLog = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => auditLogService.update(id, data),
    onSuccess: () => qc.invalidateQueries(['auditLogs']),
  })
}

export const useDeleteAuditLog = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: id => auditLogService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries(['auditLogs'])
      qc.invalidateQueries(['auditLog', id])
},
  })
}
