import api from '@/utils/apiHelpers'
import { mockReports } from '../mocks/reports.mock'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const simulateDelay = () =>
  new Promise(resolve => setTimeout(resolve, 300))

export const reportService = {
  async getAll({ page = 1, limit = 10, search = '' } = {}) {
    if (USE_MOCK) {
      await simulateDelay()

      let filtered = mockReports

      if (search) {
        filtered = filtered.filter(r =>
          [
            r.name,
            r.type,
            r.createdByUser?.name,
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

    return api.get('/reports', {
      page,
      limit,
      search,
    })
  },

  getById(id) {
    if (USE_MOCK) {
      return Promise.resolve(
        mockReports.find(r => r.id === id)
      )
    }

    return api.get(`/reports/${id}`)
  },

  create(payload) {
    if (USE_MOCK) {
      return Promise.resolve({
        id: Date.now(),
        ...payload,
      })
    }

    return api.post('/reports', payload)
  },

  update(id, payload) {
    if (USE_MOCK) {
      return Promise.resolve({
        id,
        ...payload,
      })
    }

    return api.put(`/reports/${id}`, payload)
  },

  delete(id) {
    if (USE_MOCK) {
      return Promise.resolve({ success: true })
    }

    return api.delete(`/reports/${id}`)
  },

  runReport(id) {
    if (USE_MOCK) {
      return Promise.resolve({
        success: true,
        reportId: id,
        generatedAt: new Date().toISOString(),
        downloadUrl: `/api/reports/${id}/download`,
      })
    }

    return api.post(`/reports/${id}/run`)
  },
}
