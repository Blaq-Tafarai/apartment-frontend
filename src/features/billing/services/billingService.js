import api from '@/utils/apiHelpers'
import { mockInvoices } from '../mocks/invoices.mock'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const simulateDelay = () =>
  new Promise(resolve => setTimeout(resolve, 300))

export const billingService = {
  async getAll({ page = 1, limit = 10, search = '' } = {}) {
    if (USE_MOCK) {
      await simulateDelay()

      let filtered = mockInvoices

      if (search) {
        filtered = filtered.filter(i =>
          [
            i.invoiceNumber,
            i.tenant,
            i.status,
            i.amount,
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

    return api.get('/billing/invoices', {
      page,
      limit,
      search,
    })
  },

  getById(id) {
    if (USE_MOCK) {
      return Promise.resolve(
        mockInvoices.find(i => i.id === id)
      )
    }

    return api.get(`/billing/invoices/${id}`)
  },

  create(payload) {
    if (USE_MOCK) {
      return Promise.resolve({
        id: Date.now(),
        ...payload,
      })
    }

    return api.post('/billing/invoices', payload)
  },

  update(id, payload) {
    if (USE_MOCK) {
      return Promise.resolve({
        id,
        ...payload,
      })
    }

    return api.put(`/billing/invoices/${id}`, payload)
  },

  delete(id) {
    if (USE_MOCK) {
      return Promise.resolve({ success: true })
    }

    return api.delete(`/billing/invoices/${id}`)
  },
}
