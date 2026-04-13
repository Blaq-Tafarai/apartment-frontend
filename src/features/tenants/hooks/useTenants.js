import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { tenantService } from '../services/tenantService'

export const useTenants = (params) => {
    return useQuery({
        queryKey: ['tenants', params],
        queryFn: () => tenantService.getAll(params),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,
    })
}

export const useTenant = (id) => {
    return useQuery({
        queryKey: ['tenant', id],
        queryFn: () => tenantService.getById(id),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,
    })
}

export const useCreateTenant = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: tenantService.create,
        onSuccess: () => qc.invalidateQueries(['tenants']),
    })
}

export const useUpdateTenant = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: ({ id, payload }) => tenantService.update(id, payload),
        onSuccess: () => qc.invalidateQueries(['tenants']),
    })
}

export const useDeleteTenant = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: tenantService.delete,
        onSuccess: () => qc.invalidateQueries(['tenants']),
    })
}