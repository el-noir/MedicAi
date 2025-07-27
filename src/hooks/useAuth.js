import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import {
  loginUser,
  registerUser,
  verifyUserOTP,
  resendUserOTP,
  getCurrentUser,
  logoutUser,
  clearError,
  decrementOTPCooldown,
} from "../store/slices/authSlice"

export const useAuth = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  // Add error handling for Redux context
  if (!auth) {
    console.error("Redux context error: auth state is not available")
    // Return default values if Redux is not available
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: "Redux store not available",
      registrationData: null,
      isVerifying: false,
      otpCooldown: 0,
      lastOTPSent: null,
      login: async () => ({ success: false, error: "Redux not available" }),
      register: async () => ({ success: false, error: "Redux not available" }),
      verifyOTP: async () => ({ success: false, error: "Redux not available" }),
      resendOTP: async () => ({ success: false, error: "Redux not available" }),
      logout: async () => {},
      clearError: () => {},
    }
  }

  // OTP cooldown timer
  useEffect(() => {
    let interval
    if (auth.otpCooldown > 0) {
      interval = setInterval(() => {
        dispatch(decrementOTPCooldown())
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [auth.otpCooldown, dispatch])

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (token && !auth.user && !auth.isLoading) {
      dispatch(getCurrentUser())
    }
  }, [dispatch, auth.user, auth.isLoading])

  const login = async (credentials) => {
    const result = await dispatch(loginUser(credentials))
    return { success: !result.error, error: result.error }
  }

  const register = async (userData) => {
    const result = await dispatch(registerUser(userData))
    return { success: !result.error, error: result.error }
  }

  const verifyOTP = async (email, otp) => {
    const result = await dispatch(verifyUserOTP({ email, otp }))
    return { success: !result.error, error: result.error }
  }

  const resendOTP = async (email) => {
    const result = await dispatch(resendUserOTP(email))
    return { success: !result.error, error: result.error }
  }

  const logout = async () => {
    await dispatch(logoutUser())
  }

  const clearAuthError = () => {
    dispatch(clearError())
  }

  return {
    ...auth,
    login,
    register,
    verifyOTP,
    resendOTP,
    logout,
    clearError: clearAuthError,
  }
}
