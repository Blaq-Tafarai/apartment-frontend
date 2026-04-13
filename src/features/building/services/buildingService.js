import api from '@/utils/apiHelpers'
import { mockBuildings } from '../mocks/buildings.mock'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const simulateDelay = () =>
  new Promise(resolve => setTimeout(resolve, 300))

export const buildingService = {
  async getAll({ page = 1, limit = 10, search = '' } = {}) {
    if (USE_MOCK) {
      await simulateDelay()

      let filtered = mockBuildings

      if (search) {
        filtered = filtered.filter(b =>
          [
            b.name,
            b.address,
            b.status,
            b.description,
          ]
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      }

      const totalItems = filtered.length
      const totalPages = Math.ceil(totalItems / limit)

      const start = (page - 1) * limit
      const data = filtered.slice(start, start + limit)

      return {
        data,
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      }
    }

    return api.get('/buildings', {
      page,
      limit,
      search,
    })
  },

  getById(id) {
    if (USE_MOCK) {
      return Promise.resolve(
        mockBuildings.find(b => b.id === id)
      )
    }

    return api.get(`/buildings/${id}`)
  },

  create(payload) {
    if (USE_MOCK) {
      return Promise.resolve({
        id: Date.now(),
        ...payload,
      })
    }

    return api.post('/buildings', payload)
  },

  update(id, payload) {
    if (USE_MOCK) {
      return Promise.resolve({
        id,
        ...payload,
      })
    }

    return api.put(`/buildings/${id}`, payload)
  },

  delete(id) {
    if (USE_MOCK) {
      return Promise.resolve({ success: true })
    }

    return api.delete(`/buildings/${id}`)
  },
}
