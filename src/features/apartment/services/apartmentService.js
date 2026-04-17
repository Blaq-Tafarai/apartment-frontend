import api from '@/utils/apiHelpers'

export const apartmentService = {
  async getAll(params = {}) {
    return api.get('/api/v1/apartments', params)
  },

  async getById(id) {
    return api.get(`/api/v1/apartments/${id}`)
  },

  async create(payload) {
    return api.post('/api/v1/apartments', payload)
  },

  async update(id, payload) {
    return api.put(`/api/v1/apartments/${id}`, payload)
  },

  async delete(id) {
    return api.delete(`/api/v1/apartments/${id}`)
  },
}
