import api from '../../../utils/apiHelpers'

export const licensesService = {
  // Get all licenses with optional filtering/pagination
  async getAll(params = {}) {
    return api.get('/api/v1/licenses', params)
  },

  // Get license by ID
  async getById(id) {
    return api.get(`/api/v1/licenses/${id}`)
  },

  // Create new license
  async create(licenseData) {
    return api.post('/api/v1/licenses', licenseData)
  },

  // Update license
  async update(id, data) {
    return api.put(`/api/v1/licenses/${id}`, data)
  },

  // Delete license
  async delete(id) {
    return api.delete(`/api/v1/licenses/${id}`)
  },

  // Get license statistics (for UI usage)
  async getStats(licenseId) {
    return api.get(`/api/v1/licenses/${licenseId}/stats`)
  },
}

export default licensesService
