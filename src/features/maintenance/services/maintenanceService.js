import api from '../../../utils/apiHelpers';

export const maintenanceService = {
  // Get all maintenance requests with optional filtering
  async getAll(params = {}) {
    return api.get('/api/v1/maintenances', params);
  },

  // Get maintenance request by ID
  async getById(id) {
    return api.get(`/api/v1/maintenances/${id}`);
  },

  // Create new maintenance request
  async create(maintenanceData) {
    return api.post('/api/v1/maintenances', maintenanceData);
  },

  // Update maintenance request
  async update(id, data) {
    return api.put(`/api/v1/maintenances/${id}`, data);
  },

  // Delete maintenance request
  async delete(id) {
    return api.delete(`/api/v1/maintenances/${id}`);
  },
};

