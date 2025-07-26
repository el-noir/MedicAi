"use client"

import { createContext, useContext, useReducer, useEffect } from "react"
import { authAPI } from "../services/api"

// Auth Actions
const AUTH_ACTIONS = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
  REGISTER_START: "REGISTER_START",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: "REGISTER_FAILURE",
  VERIFY_OTP_START: "VERIFY_OTP_START",
  VERIFY_OTP_SUCCESS: "VERIFY_OTP_SUCCESS",
  VERIFY_OTP_FAILURE: "VERIFY_OTP_FAILURE",
  SET_USER: "SET_USER",
  CLEAR_ERROR: "CLEAR_ERROR",
  SET_LOADING: "SET_LOADING",
}

// Initial State
const initialState = {
  user: null,
  token: localStorage.getItem("accessToken"),
  isAuthenticated: false,
  isLoading: false,
  error: null,
  registrationData: null,
  isVerifying: false,
}

// Auth Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
    case AUTH_ACTIONS.VERIFY_OTP_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      }

    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.accessToken,
        error: null,
        registrationData: null,
        isVerifying: false,
      }

    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        registrationData: action.payload,
        error: null,
        isVerifying: true,
      }

    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
    case AUTH_ACTIONS.VERIFY_OTP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isAuthenticated: false,
        user: null,
        token: null,
      }

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...initialState,
        token: null,
      }

    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      }

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }

    default:
      return state
  }
}

// Create Context
const AuthContext = createContext()

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken")
      if (token) {
        try {
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true })
          const response = await authAPI.getCurrentUser()
          dispatch({
            type: AUTH_ACTIONS.SET_USER,
            payload: response.data.user,
          })
        } catch (error) {
          console.error("Auth check failed:", error)
          localStorage.removeItem("accessToken")
          localStorage.removeItem("refreshToken")
          dispatch({ type: AUTH_ACTIONS.LOGOUT })
        }
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START })
    try {
      const response = await authAPI.login(credentials)

      // Store tokens
      localStorage.setItem("accessToken", response.data.accessToken)
      localStorage.setItem("refreshToken", response.data.refreshToken)

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: response.data,
      })

      return { success: true, data: response.data }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed"
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: errorMessage,
      })
      return { success: false, error: errorMessage }
    }
  }

  // Register function
  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_START })
    try {
      const response = await authAPI.register(userData)
      dispatch({
        type: AUTH_ACTIONS.REGISTER_SUCCESS,
        payload: { email: userData.email, role: userData.role },
      })
      return { success: true, data: response.data }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed"
      dispatch({
        type: AUTH_ACTIONS.REGISTER_FAILURE,
        payload: errorMessage,
      })
      return { success: false, error: errorMessage }
    }
  }

  // Verify OTP function
  const verifyOTP = async (email, otp) => {
    dispatch({ type: AUTH_ACTIONS.VERIFY_OTP_START })
    try {
      const response = await authAPI.verifyOTP({ email, otp })

      // Store tokens
      localStorage.setItem("accessToken", response.data.accessToken)
      localStorage.setItem("refreshToken", response.data.refreshToken)

      dispatch({
        type: AUTH_ACTIONS.VERIFY_OTP_SUCCESS,
        payload: response.data,
      })

      return { success: true, data: response.data }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "OTP verification failed"
      dispatch({
        type: AUTH_ACTIONS.VERIFY_OTP_FAILURE,
        payload: errorMessage,
      })
      return { success: false, error: errorMessage }
    }
  }

  // Resend OTP function
  const resendOTP = async (email) => {
    try {
      await authAPI.resendOTP({ email })
      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to resend OTP"
      return { success: false, error: errorMessage }
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      dispatch({ type: AUTH_ACTIONS.LOGOUT })
    }
  }

  // Clear error function
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR })
  }

  const value = {
    ...state,
    login,
    register,
    verifyOTP,
    resendOTP,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export default AuthContext
