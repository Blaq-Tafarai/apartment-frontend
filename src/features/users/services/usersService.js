import api from '../../../utils/apiHelpers'

export const usersService = {
  // Get all users with optional filtering
  async getAll(params = {}) {
    return api.get('/api/v1/users', params)
  },

  // Get user by ID
  async getById(id) {
    return api.get(`/api/v1/users/${id}`)
  },

  // Create new user
  async create(userData) {
    return api.post('/api/v1/users', userData)
  },

  // Update user
  async update(id, data) {
    return api.put(`/api/v1/users/${id}`, data)
  },

  // Delete user
  async delete(id) {
    return api.delete(`/api/v1/users/${id}`)
  },

  // Get user statistics
  async getStats(userId) {
    return api.get(`/api/v1/users/${userId}/stats`)
  },
}

