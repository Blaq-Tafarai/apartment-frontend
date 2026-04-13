import api from '@/utils/apiHelpers'
import { mockPayments } from '../mocks/payments.mock'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const simulateDelay = () =>
  new Promise(resolve => setTimeout(resolve, 300))

export const paymentService = {
  async getAll({ page = 1, limit = 10, search = '' } = {}) {
    if (USE_MOCK) {
      await simulateDelay()

      let filtered = mockPayments

      if (search) {
        filtered = filtered.filter(p =>
          [
            p.reference,
            p.tenant,
            p.status,
            p.amount,
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

    return api.get('/payments', {
      page,
      limit,
      search,
    })
  },

  getById(id) {
    if (USE_MOCK) {
      return Promise.resolve(
        mockPayments.find(p => p.id === id)
      )
    }

    return api.get(`/payments/${id}`)
  },

  create(payload) {
    if (USE_MOCK) {
      return Promise.resolve({
        id: Date.now(),
        ...payload,
      })
    }

    return api.post('/payments', payload)
  },

  update(id, payload) {
    if (USE_MOCK) {
      return Promise.resolve({
        id,
        ...payload,
      })
    }

    return api.put(`/payments/${id}`, payload)
  },

  delete(id) {
    if (USE_MOCK) {
      return Promise.resolve({ success: true })
    }

    return api.delete(`/payments/${id}`)
  },
}
