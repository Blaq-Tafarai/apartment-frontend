import api from '../../../utils/apiHelpers'

export const buildingService = {
  async getAll(params = {}) {
    return api.get('/api/v1/buildings', params)
  },

  async getById(id) {
    return api.get(`/api/v1/buildings/${id}`)
  },

  async create(payload) {
    return api.post('/api/v1/buildings', payload)
  },

  async update(id, payload) {
    return api.put(`/api/v1/buildings/${id}`, payload)
  },

  async delete(id) {
    return api.delete(`/api/v1/buildings/${id}`)
  },
}

