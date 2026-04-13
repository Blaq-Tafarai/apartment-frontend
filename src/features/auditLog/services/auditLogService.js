import api from '@/utils/apiHelpers'
import { mockAuditLogs } from '../mocks/auditLogs.mock'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const simulateDelay = () =>
  new Promise(resolve => setTimeout(resolve, 300))

export const auditLogService = {
  async getAll({ page = 1, limit = 10, search = '' } = {}) {
    if (USE_MOCK) {
      await simulateDelay()

      let filtered = mockAuditLogs

      if (search) {
        filtered = filtered.filter(log =>
          [
            log.user?.name,
            log.action,
            log.entityType,
            log.notes,
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

    return api.get('/audit-logs', {
      page,
      limit,
      search,
    })
  },

  getById(id) {
    if (USE_MOCK) {
      return Promise.resolve(
        mockAuditLogs.find(log => log.id === id)
      )
    }

    return api.get(`/audit-logs/${id}`)
  },

  create(payload) {
    if (USE_MOCK) {
      return Promise.resolve({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...payload,
      })
    }

    return api.post('/audit-logs', payload)
  },

  update(id, payload) {
    if (USE_MOCK) {
      return Promise.resolve({
        id,
        ...payload,
      })
    }

    return api.put(`/audit-logs/${id}`, payload)
  },

  delete(id) {
    if (USE_MOCK) {
      return Promise.resolve({ success: true })
    }

    return api.delete(`/audit-logs/${id}`)
  },
}
