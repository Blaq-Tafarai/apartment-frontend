import api from '@/utils/apiHelpers'

export const usePaymentService = {
  async getAll(params = {}) {
    return api.get('/api/v1/payments', params)
  },

  async getById(id) {
    return api.get(`/api/v1/payments/${id}`)
  },

  async create(payload) {
    return api.post('/api/v1/payments', payload)
  },

  async update(id, payload) {
    return api.put(`/api/v1/payments/${id}`, payload)
  },

  async delete(id) {
    return api.delete(`/api/v1/payments/${id}`)
  },
}
