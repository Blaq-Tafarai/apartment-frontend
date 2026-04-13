import { mockLicenses } from '../mocks/licenses.mock';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

const simulateDelay = () =>
  new Promise(resolve => setTimeout(resolve, 300));

export const licensesService = {
  async getAll( { page = 1, limit = 10, search = '' } = {}) {
    if (USE_MOCK) {
      await simulateDelay();

      let filtered = mockLicenses;

      if (search) {
        filtered = filtered.filter(l =>
          [
            l.name,
            l.description,
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
      }
    }
  },

  getById(id) {
    if (USE_MOCK) {
      return Promise.resolve(
        mockLicenses.find(l => l.id === id)
      );
    }

    return api.get(`/licenses/${id}`);
  },

  create(payload) {
    if (USE_MOCK) {
      return Promise.resolve(payload);
    }

    return api.post('/licenses', payload);
  },

  update(id, payload) {
    if (USE_MOCK) {
      return Promise.resolve({ ...payload, id });
    }

    return api.put(`/licenses/${id}`, payload);
  },

  delete(id) {
    if (USE_MOCK) {
      return Promise.resolve();
    }

    return api.delete(`/licenses/${id}`);
  },
};

export default licensesService;
