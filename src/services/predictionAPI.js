import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1"

// Create axios instance with default config
const predictionAPI = axios.create({
  baseURL: `${API_BASE_URL}/predictions`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests
predictionAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Handle response errors
predictionAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export const predictionService = {
  // Save prediction
  savePrediction: async (predictionData) => {
    try {
      const response = await predictionAPI.post("/", predictionData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to save prediction")
    }
  },

  // Get user predictions
  getUserPredictions: async (params = {}) => {
    try {
      const response = await predictionAPI.get("/", { params })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch predictions")
    }
  },

  // Get single prediction
  getPredictionById: async (predictionId) => {
    try {
      const response = await predictionAPI.get(`/${predictionId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch prediction")
    }
  },

  // Delete prediction
  deletePrediction: async (predictionId) => {
    try {
      const response = await predictionAPI.delete(`/${predictionId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete prediction")
    }
  },

  // Get prediction statistics
  getPredictionStats: async () => {
    try {
      const response = await predictionAPI.get("/stats")
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch prediction stats")
    }
  },
}

export default predictionService
