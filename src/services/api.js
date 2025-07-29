import axios from "axios"
import conf from "../conf/conf"

// Create axios instance with proper CORS configuration
const api = axios.create({
  baseURL: conf.backendUrl,
  withCredentials: true,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refreshToken = localStorage.getItem("refreshToken")
        if (refreshToken) {
          const response = await axios.post(
            `${conf.backendUrl}/api/v1/users/refresh-token`,
            { refreshToken },
            { withCredentials: true },
          )
          const { accessToken } = response.data.data
          localStorage.setItem("accessToken", accessToken)
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError)
        // Refresh failed, redirect to login
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

// Auth API endpoints
export const authAPI = {
  register: (userData) => api.post("/api/v1/users/register", userData),
  login: (credentials) => api.post("/api/v1/users/login", credentials),
  logout: () => api.post("/api/v1/users/logout"),
  verifyOTP: (data) => api.post("/api/v1/users/verify-otp", data),
  resendOTP: (data) => api.post("/api/v1/users/resend-otp", data),
  getCurrentUser: () => api.get("/api/v1/users/me"),
  forgotPassword: (email) => api.post("/api/v1/users/forgot-password", { email }),
  resetPassword: (token, password) => api.post(`/api/v1/users/reset-password/${token}`, { password }),
  refreshToken: (refreshToken) => api.post("/api/v1/users/refresh-token", { refreshToken }),
  updateProfile: (data) => api.put("/api/v1/users/profile", data),
}

// Prediction API endpoints
export const predictionAPI = {
  // Save prediction (create)
  savePrediction: (data) => api.post("/api/v1/predictions", data),
  // Get user predictions
  getUserPredictions: (params = {}) => api.get("/api/v1/predictions", { params }),
  // Get single prediction
  getPredictionById: (id) => api.get(`/api/v1/predictions/${id}`),
  // Delete prediction
  deletePrediction: (id) => api.delete(`/api/v1/predictions/${id}`),
  // Get prediction statistics
  getPredictionStats: () => api.get("/api/v1/predictions/stats"),
}

// Shared Prediction API endpoints
export const sharedPredictionAPI = {
  // Share prediction with doctor
  sharePrediction: (data) => api.post("/api/v1/shared-predictions/share", data),
  // Get user's shared predictions
  getUserSharedPredictions: (params = {}) => api.get("/api/v1/shared-predictions/my-shares", { params }),
  // Get doctor's received predictions
  getDoctorReceivedPredictions: (params = {}) => api.get("/api/v1/shared-predictions/received", { params }),
  // View shared prediction (for doctors)
  viewSharedPrediction: (shareCode) => api.get(`/api/v1/shared-predictions/view/${shareCode}`),
  // Respond to shared prediction (for doctors)
  respondToSharedPrediction: (shareCode, data) => api.post(`/api/v1/shared-predictions/respond/${shareCode}`, data),
  // Revoke shared prediction access
  revokeSharedPrediction: (shareId) => api.patch(`/api/v1/shared-predictions/revoke/${shareId}`),
}

export default api
