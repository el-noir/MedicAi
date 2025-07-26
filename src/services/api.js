import axios from 'axios'
import conf from '../conf/conf.js'

const api = axios.create({
  baseURL: conf.backendUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          const response = await axios.post(`${conf.backendUrl}/api/v1/users/refresh-token`, {
            refreshToken
          })

          const { accessToken } = response.data
          localStorage.setItem('accessToken', accessToken)

          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return api(originalRequest)
        }
      } catch (refreshError) {

        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

// Auth API endpoints
export const authAPI = {
  register: (userData) => api.post('/api/v1/users/register', userData),
  login: (credentials) => api.post('/api/v1/users/login', credentials),
  logout: () => api.post('/api/v1/users/logout'),
  verifyOTP: (data) => api.post('/api/v1/users/verify-otp', data),
  resendOTP: (data) => api.post('/api/v1/users/resend-otp', data),
  getCurrentUser: () => api.get('/api/v1/users/me'),
  forgotPassword: (email) => api.post('/api/v1/users/forgot-password', { email }),
  resetPassword: (token, password) => api.post(`/api/v1/users/reset-password/${token}`, { password }),
  refreshToken: (refreshToken) => api.post('/api/v1/users/refresh-token', { refreshToken })
}

export default api
