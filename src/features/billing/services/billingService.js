import api from '@/utils/apiHelpers'

export const billingService = {
  async getAll(params = {}) {
    return api.get('/api/v1/billings', params)
  },

  async getById(id) {
    return api.get(`/api/v1/billings/${id}`)
  },

  async create(payload) {
    return api.post('/api/v1/billings', payload)
  },

  async update(id, payload) {
    return api.put(`/api/v1/billings/${id}`, payload)
  },

  async delete(id) {
    return api.delete(`/api/v1/billings/${id}`)
  },
}
