import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { reportService } from '../services/reportService'

export const useReports = ({ page, limit, search, type, status, schedule }) =>
  useQuery({
    queryKey: ['reports', { page, limit, search, type, status, schedule }],
    queryFn: () => reportService.getAll({ page, limit, search, type, status, schedule }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  })

export const useReport = id =>
  useQuery({
    queryKey: ['report', id],
    queryFn: () => reportService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  })

export const useCreateReport = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: reportService.create,
    onSuccess: () => qc.invalidateQueries(['reports']),
  })
}

export const useRunReport = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: reportService.runReport,
    onSuccess: () => qc.invalidateQueries(['reports']),
  })
}
