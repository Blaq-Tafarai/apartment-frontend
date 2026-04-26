import api from '@/utils/apiHelpers'

export const useAuditLogService = {
  async getAll(params = {}) {
    return api.get('/api/v1/audit-logs', params)
  },

  async getById(id) {
    return api.get(`/api/v1/audit-logs/${id}`)
  },
}
