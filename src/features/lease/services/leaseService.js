import api from '@/utils/apiHelpers'

export const leaseService = {
  async getAll(params = {}) {
    return api.get('/api/v1/leases', params)
  },

  async getById(id) {
    return api.get(`/api/v1/leases/${id}`)
  },

  async create(payload) {
    return api.post('/api/v1/leases', payload)
  },

  async update(id, payload) {
    return api.put(`/api/v1/leases/${id}`, payload)
  },

  async delete(id) {
    return api.delete(`/api/v1/leases/${id}`)
  },
}
