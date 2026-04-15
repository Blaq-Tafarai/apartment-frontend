import api from '../../../utils/apiHelpers'

export const companiesService = {
  // Get all companies with optional filtering
async getAll(params = {}) {
    return api.get('/api/v1/organizations', params)
  },

  // Get company by ID
  async getById(id) {
    return api.get(`/api/v1/organizations/${id}`)
  },

  // Create new company
  async create(companyData) {
    return api.post('/api/v1/organizations', companyData)
  },

  // Update company
  async update(id, data) {
    return api.put(`/api/v1/organizations/${id}`, data)
  },

  // Delete company
  async delete(id) {
    return api.delete(`/api/v1/organizations/${id}`)
  },

  // Get company statistics
  async getStats(companyId) {
    return api.get(`/api/v1/organizations/${companyId}/stats`)
  },
}
