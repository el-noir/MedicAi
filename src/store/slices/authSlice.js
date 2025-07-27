import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { authAPI } from "../../services/api.js"

// Async thunks
export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await authAPI.login(credentials)
    localStorage.setItem("accessToken", response.data.accessToken)
    localStorage.setItem("refreshToken", response.data.refreshToken)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed")
  }
})

export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await authAPI.register(userData)
    return { ...response.data, email: userData.email, role: userData.role }
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Registration failed")
  }
})

export const verifyUserOTP = createAsyncThunk("auth/verifyOTP", async ({ email, otp }, { rejectWithValue }) => {
  try {
    const response = await authAPI.verifyOTP({ email, otp })
    localStorage.setItem("accessToken", response.data.accessToken)
    localStorage.setItem("refreshToken", response.data.refreshToken)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "OTP verification failed")
  }
})

export const resendUserOTP = createAsyncThunk("auth/resendOTP", async (email, { rejectWithValue }) => {
  try {
    await authAPI.resendOTP({ email })
    return { success: true }
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to resend OTP")
  }
})

export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const response = await authAPI.getCurrentUser()
    return response.data.data
  } catch (error) {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    return rejectWithValue(error.response?.data?.message || "Failed to get user")
  }
})

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    await authAPI.logout()
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    return {}
  } catch (error) {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    return rejectWithValue(error.response?.data?.message || "Logout failed")
  }
})

const initialState = {
  user: null,
  token: localStorage.getItem("accessToken"),
  isAuthenticated: false,
  isLoading: false,
  error: null,
  registrationData: null,
  isVerifying: false,
  otpCooldown: 0,
  lastOTPSent: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setOTPCooldown: (state, action) => {
      state.otpCooldown = action.payload
      state.lastOTPSent = Date.now()
    },
    decrementOTPCooldown: (state) => {
      if (state.otpCooldown > 0) {
        state.otpCooldown -= 1
      }
    },
    resetAuth: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.registrationData = null
      state.isVerifying = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.accessToken
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
        state.user = null
        state.token = null
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.registrationData = { email: action.payload.email, role: action.payload.role }
        state.isVerifying = true
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Verify OTP
      .addCase(verifyUserOTP.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(verifyUserOTP.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.accessToken
        state.registrationData = null
        state.isVerifying = false
        state.error = null
      })
      .addCase(verifyUserOTP.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Resend OTP
      .addCase(resendUserOTP.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(resendUserOTP.fulfilled, (state) => {
        state.isLoading = false
        state.otpCooldown = 60 // 1 minute cooldown
        state.lastOTPSent = Date.now()
        state.error = null
      })
      .addCase(resendUserOTP.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
        state.user = null
        state.token = null
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.registrationData = null
        state.isVerifying = false
        state.error = null
      })
  },
})

export const { clearError, setOTPCooldown, decrementOTPCooldown, resetAuth } = authSlice.actions
export default authSlice.reducer
