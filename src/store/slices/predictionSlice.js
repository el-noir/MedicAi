import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { predictionAPI } from "../../services/api"

// Async thunks
export const submitPrediction = createAsyncThunk(
  "predictions/submitPrediction",
  async (predictionData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState()
      const response = await predictionAPI.predict(predictionData)

      // If user is authenticated, save the prediction
      if (auth.isAuthenticated) {
        await predictionAPI.savePrediction({
          ...predictionData,
          result: response.data,
          timestamp: new Date().toISOString(),
        })
      }

      return {
        ...response.data,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        symptoms: predictionData.symptoms,
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Prediction failed")
    }
  },
)

export const fetchUserPredictions = createAsyncThunk(
  "predictions/fetchUserPredictions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await predictionAPI.getUserPredictions()
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

const initialState = {
  predictions: [],
  currentPrediction: null,
  isLoading: false,
  error: null,
  totalPredictions: 0,
  recentPredictions: [],
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
    setCurrentPrediction: (state, action) => {
      state.currentPrediction = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit Prediction
      .addCase(submitPrediction.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(submitPrediction.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentPrediction = action.payload
        state.predictions.unshift(action.payload)
        state.recentPredictions = state.predictions.slice(0, 5)
        state.totalPredictions = state.predictions.length
        state.error = null
      })
      .addCase(submitPrediction.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch User Predictions
      .addCase(fetchUserPredictions.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserPredictions.fulfilled, (state, action) => {
        state.isLoading = false
        state.predictions = action.payload
        state.recentPredictions = action.payload.slice(0, 5)
        state.totalPredictions = action.payload.length
        state.error = null
      })
      .addCase(fetchUserPredictions.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Delete Prediction
      .addCase(deletePrediction.fulfilled, (state, action) => {
        state.predictions = state.predictions.filter((p) => p.id !== action.payload)
        state.recentPredictions = state.predictions.slice(0, 5)
        state.totalPredictions = state.predictions.length
      })
  },
})

export const { clearError, clearCurrentPrediction, setCurrentPrediction } = predictionSlice.actions
export default predictionSlice.reducer
