const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// ----------------------------------
// Handle HTTP responses
// ----------------------------------

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || 'Request failed')
  }

  return response.json()
}

// ----------------------------------
// Base fetch wrapper with cookies
// ----------------------------------

const baseFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include', // <-- SEND COOKIES
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  return handleResponse(response)
}

// ----------------------------------
// Methods
// ----------------------------------

export const get = (endpoint) =>
  baseFetch(endpoint, { method: 'GET' })

export const post = (endpoint, data) =>
  baseFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const put = (endpoint, data) =>
  baseFetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  })

export const patch = (endpoint, data) =>
  baseFetch(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })

export const del = (endpoint) =>
  baseFetch(endpoint, { method: 'DELETE' })

// ----------------------------------
// Upload (no content-type header)
// ----------------------------------

export const upload = (endpoint, formData) =>
  fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  }).then(handleResponse)

export default {
  get,
  post,
  put,
  patch,
  delete: del,
  upload,
}
