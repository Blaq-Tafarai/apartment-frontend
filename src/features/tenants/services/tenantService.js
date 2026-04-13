import api from '@/utils/apiHelpers'
import { mockTenants } from '../mocks/tenants.mock'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

console.log('USE_MOCK:', USE_MOCK)
console.log('VITE_USE_MOCK:', import.meta.env.VITE_USE_MOCK)

const simulateDelay = () =>
  new Promise(resolve => setTimeout(resolve, 300))

export const tenantService = {
  async getAll({ page = 1, limit = 10, search = '' } = {}) {
    if (USE_MOCK) {
      await simulateDelay()

      let filtered = mockTenants

      if (search) {
        filtered = filtered.filter(t =>
          [
            t.user?.name,
            t.user?.email,
            t.building?.name,
            t.apartment?.number,
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

    return api.get('/tenants', {
      page,
      limit,
      search,
    })
  },

  getById(id) {
    if (USE_MOCK) {
      return Promise.resolve(
        mockTenants.find(t => t.id === id)
      )
    }

    return api.get(`/tenants/${id}`)
  },

  create(payload) {
    if (USE_MOCK) {
      return Promise.resolve({
        id: Date.now(),
        ...payload,
      })
    }

    return api.post('/tenants', payload)
  },

  update(id, payload) {
    if (USE_MOCK) {
      return Promise.resolve({
        id,
        ...payload,
      })
    }

    return api.put(`/tenants/${id}`, payload)
  },

  delete(id) {
    if (USE_MOCK) {
      return Promise.resolve({ success: true })
    }

    return api.delete(`/tenants/${id}`)
  },
}
