import api from '../../../utils/apiHelpers';
import { mockMaintenance } from '../mocks/maintenance.mock';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

const simulateDelay = () =>
  new Promise(resolve => setTimeout(resolve, 300));

export const maintenanceService = {
  async getAll( { page = 1, limit = 10, search = '' } = {}) {
    if (USE_MOCK) {
      await simulateDelay();

      let filtered = mockMaintenance;

        if (search) {
          filtered = filtered.filter(m =>
            [
              m.name,
              m.description,
              m.building?.name,
              m.apartment?.number,
            ]
              .join(' ')
              .toLowerCase()
              .includes(search.toLowerCase())
          )
        }

        const totalItems = filtered.length;
        const totalPages = Math.ceil(totalItems / limit);

        const start = (page - 1) * limit;
        const data = filtered.slice(start, start + limit);

        return {
          data,
          totalItems,
          totalPages,
          currentPage: page,
          itemsPerPage: limit,
        };
    }

    return api.get('/maintenances', {
      page,
      limit,
      search,
    });
  },

  getById(id) {
    if (USE_MOCK) {
      return Promise.resolve(
        mockMaintenance.find(m => m.id === id)
      );
    }

    return api.get(`/maintenances/${id}`);
  },

  create(payload) {
    if (USE_MOCK) {
      const newMaintenance = {
        id: Date.now(),
        ...payload,
      };
      return Promise.resolve(newMaintenance);
    }

    return api.post('/maintenances', payload);
  },

  update(id, payload) {
    if (USE_MOCK) {
      return Promise.resolve({
        id,
        ...payload,
      });
    }

    return api.put(`/maintenances/${id}`, payload);
  },

  delete(id) {
    if (USE_MOCK) {
      return Promise.resolve({ success: true });
    }

    return api.delete(`/maintenances/${id}`);
  },
}
