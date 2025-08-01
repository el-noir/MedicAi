import axios from "axios"
import conf from '../conf/conf.js'
// Create axios instance with proper CORS configuration
const api = axios.create({
  baseURL: conf.backendUrl,
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

// Helper function to clean token
const cleanToken = (token) => {
  if (!token) return null
  return token.trim().replace(/^Bearer\s+/i, "")
}

// Helper function to validate JWT format (less strict)
const isValidJWT = (token) => {
  if (!token) return false
  // Just check if it has some basic structure, don't be too strict
  return token.length > 20 && token.includes(".")
}

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error("Request interceptor error:", error)
    return Promise.reject(error)
  },
)

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Handle network errors
    if (!error.response) {
      console.error("Network error:", error.message)
      return Promise.reject(new Error("Network error. Please check your connection."))
    }

    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Auth API endpoints
export const authAPI = {
  register: async (userData) => {
    const response = await api.post("/api/v1/users/register", userData)
    return response.data
  },

  login: async (credentials) => {
    const response = await api.post("/api/v1/users/login", credentials)
    return response.data
  },

  logout: async () => {
    const response = await api.post("/api/v1/users/logout")
    return response.data
  },

  verifyOTP: (data) => api.post("/api/v1/users/verify-otp", data),
  resendOTP: (data) => api.post("api/v1/users/resend-otp", data),
  getCurrentUser: async () => {
    const response = await api.get("/api/v1/users/me")
    return response.data
  },
  forgotPassword: (email) => api.post("/api/v1/users/forgot-password", { email }),
  resetPassword: (token, password) => api.post(`/api/v1/users/reset-password/${token}`, { password }),
  refreshToken: async () => {
    const response = await api.post("/api/v1/users/refresh-token")
    return response.data
  },
  updateProfile: async (userData) => {
    const response = await api.patch("/api/v1/users/update-account", userData)
    return response.data
  },

  changePassword: async (passwordData) => {
    const response = await api.post("/api/v1/users/change-password", passwordData)
    return response.data
  },
}

// Prediction API endpoints
export const predictionAPI = {
  // Save prediction (create)
  savePrediction: async (predictionData) => {
    const response = await api.post("/api/v1/predictions", predictionData)
    return response.data
  },
  // Get user predictions
  getUserPredictions: async (params = {}) => {
    const response = await api.get("/api/v1/predictions", { params })
    return response.data
  },
  // Get single prediction
  getPredictionById: async (predictionId) => {
    const response = await api.get(`/api/v1/predictions/${predictionId}`)
    return response.data
  },
  // Delete prediction
  deletePrediction: async (predictionId) => {
    const response = await api.delete(`/api/v1/predictions/${predictionId}`)
    return response.data
  },
  // Get prediction statistics
  getPredictionStats: async () => {
    const response = await api.get("/api/v1/predictions/stats")
    return response.data
  },
}

// Shared Prediction API endpoints
export const sharedPredictionAPI = {
  // Share prediction with doctor
  sharePrediction: async (shareData) => {
    const response = await api.post("/api/v1/shared-predictions/share", shareData)
    return response.data
  },
  // Get user's shared predictions
  getUserSharedPredictions: async (params = {}) => {
    const response = await api.get("/api/v1/shared-predictions/my-shares", { params })
    return response.data
  },
  // Get doctor's received predictions
  getDoctorReceivedPredictions: async (params = {}) => {
    const response = await api.get("/api/v1/shared-predictions/received", { params })
    return response.data
  },
  // View shared prediction (for doctors)
  viewSharedPrediction: async (shareCode) => {
    const response = await api.get(`/api/v1/shared-predictions/view/${shareCode}`)
    return response.data
  },
  // Respond to shared prediction (for doctors)
  respondToSharedPrediction: async (shareCode, responseData) => {
    const response = await api.post(`/api/v1/shared-predictions/respond/${shareCode}`, responseData)
    return response.data
  },
  // Revoke shared prediction access
  revokeSharedPrediction: async (shareId) => {
    const response = await api.patch(`/api/v1/shared-predictions/revoke/${shareId}`)
    return response.data
  },
}

export default api
