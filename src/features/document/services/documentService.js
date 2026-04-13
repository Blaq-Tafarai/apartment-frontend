import api from '@/utils/apiHelpers'
import { mockDocuments } from '../mocks/documents.mock'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const simulateDelay = () =>
  new Promise(resolve => setTimeout(resolve, 300))

export const documentService = {
  async getAll({ page = 1, limit = 10, search = '' } = {}) {
    if (USE_MOCK) {
      await simulateDelay()

      let filtered = mockDocuments

      if (search) {
        filtered = filtered.filter(d =>
          [
            d.name,
            d.type,
            d.description,
            d.tenant?.name,
            d.building?.name,
            d.apartment?.unitNumber,
            d.uploadedByUser?.name,
          ]
            .filter(Boolean)
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

    return api.get('/documents', {
      page,
      limit,
      search,
    })
  },

  getById(id) {
    if (USE_MOCK) {
      return Promise.resolve(
        mockDocuments.find(d => d.id === id)
      )
    }

    return api.get(`/documents/${id}`)
  },

  create(payload) {
    if (USE_MOCK) {
      return Promise.resolve({
        id: Date.now(),
        ...payload,
      })
    }

    return api.post('/documents', payload)
  },

  update(id, payload) {
    if (USE_MOCK) {
      return Promise.resolve({
        id,
        ...payload,
      })
    }

    return api.put(`/documents/${id}`, payload)
  },

  delete(id) {
    if (USE_MOCK) {
      return Promise.resolve({ success: true })
    }

    return api.delete(`/documents/${id}`)
  },

  download(id) {
    if (USE_MOCK) {
      const document = mockDocuments.find(d => d.id === id)
      if (document) {
        // Simulate download by returning the fileUrl
        return Promise.resolve({ url: document.fileUrl })
      }
      return Promise.reject(new Error('Document not found'))
    }

    return api.get(`/documents/${id}/download`)
  },
}
