import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { licensesService } from '../../licenses/services/licensesService'
import { useCompanies } from '../../companies/hooks/useCompanies'

// Re-export useCompanies for convenience
export { useCompanies }

// Licenses hooks
export const useLicenses = params =>
  useQuery({
    queryKey: ['licenses', params],
    queryFn: () => licensesService.getAll(params),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  })

export const useLicense = id =>
  useQuery({
    queryKey: ['license', id],
    queryFn: () => licensesService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  })

export const useCreateLicense = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: licensesService.create,
    onSuccess: () => qc.invalidateQueries(['licenses']),
  })
}

export const useUpdateLicense = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => licensesService.update(id, data),
    onSuccess: () => qc.invalidateQueries(['licenses']),
  })
}

export const useDeleteLicense = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: licensesService.delete,
    onSuccess: () => qc.invalidateQueries(['licenses']),
  })
}

// Superadmin specific hooks
export const useSystemStats = () =>
  useQuery({
    queryKey: ['systemStats'],
    queryFn: () => superadminService.getSystemStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  })

export const useAssignLicense = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ companyId, licenseId }) => superadminService.assignLicense(companyId, licenseId),
    onSuccess: () => {
      qc.invalidateQueries(['companies'])
      qc.invalidateQueries(['systemStats'])
    },
  })
}

export const useRevokeLicense = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (companyId) => superadminService.revokeLicense(companyId),
    onSuccess: () => {
      qc.invalidateQueries(['companies'])
      qc.invalidateQueries(['systemStats'])
    },
  })
}
