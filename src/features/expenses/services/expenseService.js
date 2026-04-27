import api from '@/utils/apiHelpers'

export const useExpenseService = {
  async getAll(params = {}) {
    return api.get('/api/v1/expenses', params)
  },

  async getById(id) {
    return api.get(`/api/v1/expenses/${id}`)
  },

  async create(payload) {
    return api.post('/api/v1/expenses', payload)
  },

  async update(id, payload) {
    return api.put(`/api/v1/expenses/${id}`, payload)
  },

  async delete(id) {
    return api.delete(`/api/v1/expenses/${id}`)
  },
}
