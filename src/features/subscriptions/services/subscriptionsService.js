import api from '../../../utils/apiHelpers';

export const subscriptionsService = {
  // Get all subscriptions with optional filtering
  async getAll(params = {}) {
    return api.get('/api/v1/subscriptions', params);
  },

  // Get subscription by ID
  async getById(id) {
    return api.get(`/api/v1/subscriptions/${id}`);
  },

  // Create new subscription
  async create(subscriptionData) {
    return api.post('/api/v1/subscriptions', subscriptionData);
  },

  // Update subscription
  async update(id, data) {
    return api.put(`/api/v1/subscriptions/${id}`, data);
  },

  // Delete subscription
  async delete(id) {
    return api.delete(`/api/v1/subscriptions/${id}`);
  },
};

