import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { predictionAPI } from "../../services/api.js"

// Async thunks
export const savePrediction = createAsyncThunk(
  "predictions/savePrediction",
  async (predictionData, { rejectWithValue }) => {
    try {
      const response = await predictionAPI.savePrediction(predictionData)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to save prediction")
    }
  },
)

export const fetchUserPredictions = createAsyncThunk(
  "predictions/fetchUserPredictions",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await predictionAPI.getUserPredictions(params)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch predictions")
    }
  },
)

export const deletePrediction = createAsyncThunk(
  "predictions/deletePrediction",
  async (predictionId, { rejectWithValue }) => {
    try {
      await predictionAPI.deletePrediction(predictionId)
      return predictionId
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete prediction")
    }
  },
)

export const fetchPredictionStats = createAsyncThunk(
  "predictions/fetchPredictionStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await predictionAPI.getPredictionStats()
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch prediction stats")
    }
  },
)

const initialState = {
  predictions: [],
  currentPrediction: null,
  stats: {
    totalPredictions: 0,
    thisMonthPredictions: 0,
    avgConfidence: 0,
    riskDistribution: [],
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  },
  isLoading: false,
  isSaving: false,
  error: null,
}

const predictionSlice = createSlice({
  name: "predictions",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentPrediction: (state) => {
      state.currentPrediction = null
    },
    resetPredictions: (state) => {
      state.predictions = []
      state.currentPrediction = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Save prediction
      .addCase(savePrediction.pending, (state) => {
        state.isSaving = true
        state.error = null
      })
      .addCase(savePrediction.fulfilled, (state, action) => {
        state.isSaving = false
        state.currentPrediction = action.payload
        state.predictions.unshift(action.payload)
        state.stats.totalPredictions += 1
      })
      .addCase(savePrediction.rejected, (state, action) => {
        state.isSaving = false
        state.error = action.payload
      })

      // Fetch user predictions
      .addCase(fetchUserPredictions.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserPredictions.fulfilled, (state, action) => {
        state.isLoading = false
        state.predictions = action.payload.predictions
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          hasNextPage: action.payload.hasNextPage,
          hasPrevPage: action.payload.hasPrevPage,
        }
        state.stats.totalPredictions = action.payload.totalPredictions
      })
      .addCase(fetchUserPredictions.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Delete prediction
      .addCase(deletePrediction.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePrediction.fulfilled, (state, action) => {
        state.isLoading = false
        state.predictions = state.predictions.filter((prediction) => prediction._id !== action.payload)
        state.stats.totalPredictions = Math.max(0, state.stats.totalPredictions - 1)
      })
      .addCase(deletePrediction.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Fetch prediction stats
      .addCase(fetchPredictionStats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchPredictionStats.fulfilled, (state, action) => {
        state.isLoading = false
        state.stats = action.payload
      })
      .addCase(fetchPredictionStats.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearError, clearCurrentPrediction, resetPredictions } = predictionSlice.actions
export default predictionSlice.reducer
