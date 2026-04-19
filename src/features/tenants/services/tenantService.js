import api from '@/utils/apiHelpers'

export const tenantService = {
  async getAll(params = {}) {
    return api.get('/api/v1/tenants', params)
  },

  async getById(id) {
    return api.get(`/api/v1/tenants/${id}`)
  },

  async create(payload) {
    return api.post('/api/v1/tenants', payload)
  },

  async update(id, payload) {
    return api.put(`/api/v1/tenants/${id}`, payload)
  },

  async delete(id) {
    return api.delete(`/api/v1/tenants/${id}`)
  },
}
