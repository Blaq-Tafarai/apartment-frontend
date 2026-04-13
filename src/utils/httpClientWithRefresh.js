let isRefreshing = false
let pendingRequests = []

const processQueue = (error) => {
  pendingRequests.forEach(p => p.reject(error))
  pendingRequests = []
}

const retryQueue = () => {
  pendingRequests.forEach(p => p.resolve())
  pendingRequests = []
}

const baseFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(endpoint, {
      ...options,
      credentials: 'include',
    })

    if (response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true

        try {
          await fetch('/api/auth/refresh', {
            method: 'POST',
            credentials: 'include',
          })

          isRefreshing = false
          retryQueue()

          return fetch(endpoint, {
            ...options,
            credentials: 'include',
          })
        } catch (err) {
          isRefreshing = false
          processQueue(err)
          throw err
        }
      }

      return new Promise((resolve, reject) => {
        pendingRequests.push({
          resolve: () =>
            fetch(endpoint, {
              ...options,
              credentials: 'include',
            }).then(resolve),
          reject,
        })
      })
    }

    return response
  } catch (err) {
    throw err
  }
}
