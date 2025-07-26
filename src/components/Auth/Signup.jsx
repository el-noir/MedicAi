import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  UserCheck,
  AlertCircle,
  CheckCircle,
  Stethoscope,
  GraduationCap,
  Award,
  Clock,
} from "lucide-react"
import { useAuth } from "../../context/AuthContext"

const Signup = () => {
  const [step, setStep] = useState(1) // 1: Role Selection, 2: Form, 3: OTP Verification
  const [selectedRole, setSelectedRole] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    // Doctor specific fields
    specialization: "",
    licenseNumber: "",
    experience: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [otpData, setOtpData] = useState({
    otp: "",
    email: "",
  })

  const { register, verifyOTP, resendOTP, isLoading, error, clearError, registrationData, isVerifying } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    clearError()
  }, [])

  const roleOptions = [
    {
      value: "user",
      title: "Patient",
      description: "Get AI-powered health insights and symptom analysis",
      icon: <User className="w-8 h-8" />,
      color: "from-cyan-500 to-blue-600",
    },
    {
      value: "doctor",
      title: "Healthcare Professional",
      description: "Access advanced diagnostic tools and patient management",
      icon: <UserCheck className="w-8 h-8" />,
      color: "from-green-500 to-emerald-600",
    },
  ]

  const specializations = [
    "General Medicine",
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
    "Surgery",
    "Emergency Medicine",
    "Internal Medicine",
    "Other",
  ]

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Doctor-specific validation
    if (selectedRole === "doctor") {
      if (!formData.specialization) {
        newErrors.specialization = "Specialization is required"
      }
      if (!formData.licenseNumber.trim()) {
        newErrors.licenseNumber = "License number is required"
      }
      if (!formData.experience || formData.experience < 0) {
        newErrors.experience = "Valid experience is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    setFormData((prev) => ({ ...prev, role }))
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const result = await register(formData)

    if (result.success) {
      setOtpData({ otp: "", email: formData.email })
      setStep(3)
    }
  }

  const handleOTPSubmit = async (e) => {
    e.preventDefault()

    if (!otpData.otp.trim()) {
      setErrors({ otp: "OTP is required" })
      return
    }

    const result = await verifyOTP(otpData.email, otpData.otp)

    if (result.success) {
      navigate("/dashboard")
    }
  }

  const handleResendOTP = async () => {
    const result = await resendOTP(otpData.email)
    if (result.success) {
      // Show success message
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleOTPChange = (e) => {
    const { value } = e.target
    setOtpData((prev) => ({ ...prev, otp: value }))

    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4"
          >
            <Stethoscope className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {step === 1 ? "Choose Your Role" : step === 2 ? "Create Account" : "Verify Your Email"}
          </h2>
          <p className="text-gray-300">
            {step === 1
              ? "Select how you want to use SymptomAI"
              : step === 2
                ? "Fill in your details to get started"
                : "Enter the OTP sent to your email"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Role Selection */}
          {step === 1 && (
            <motion.div
              key="role-selection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {roleOptions.map((role) => (
                <motion.button
                  key={role.value}
                  onClick={() => handleRoleSelect(role.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-left hover:border-cyan-400/50 transition-all duration-300 group"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${role.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {role.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
                  <p className="text-gray-300">{role.description}</p>
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Step 2: Registration Form */}
          {step === 2 && (
            <motion.form
              key="registration-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSubmit}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 space-y-6"
            >
              {/* Global Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-lg p-4"
                >
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-red-200 text-sm">{error}</span>
                  </div>
                </motion.div>
              )}

              {/* Role Badge */}
              <div className="flex items-center justify-between">
                <div
                  className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${
                    selectedRole === "doctor" ? "from-green-500 to-emerald-600" : "from-cyan-500 to-blue-600"
                  } rounded-full text-white text-sm font-medium`}
                >
                  {selectedRole === "doctor" ? (
                    <UserCheck className="w-4 h-4 mr-2" />
                  ) : (
                    <User className="w-4 h-4 mr-2" />
                  )}
                  {selectedRole === "doctor" ? "Healthcare Professional" : "Patient"}
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                >
                  Change Role
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors ${
                      errors.fullName ? "border-red-500" : "border-white/20"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>}
                </div>

                {/* Username */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors ${
                      errors.username ? "border-red-500" : "border-white/20"
                    }`}
                    placeholder="Choose a username"
                  />
                  {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors ${
                      errors.email ? "border-red-500" : "border-white/20"
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-12 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors ${
                        errors.password ? "border-red-500" : "border-white/20"
                      }`}
                      placeholder="Create password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-12 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors ${
                        errors.confirmPassword ? "border-red-500" : "border-white/20"
                      }`}
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Doctor-specific fields */}
              {selectedRole === "doctor" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-6 border-t border-white/10 pt-6"
                >
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Professional Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Specialization */}
                    <div>
                      <label htmlFor="specialization" className="block text-sm font-medium text-gray-300 mb-2">
                        Specialization
                      </label>
                      <select
                        id="specialization"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors ${
                          errors.specialization ? "border-red-500" : "border-white/20"
                        }`}
                      >
                        <option value="" className="bg-slate-800">
                          Select specialization
                        </option>
                        {specializations.map((spec) => (
                          <option key={spec} value={spec} className="bg-slate-800">
                            {spec}
                          </option>
                        ))}
                      </select>
                      {errors.specialization && <p className="mt-1 text-sm text-red-400">{errors.specialization}</p>}
                    </div>

                    {/* Experience */}
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">
                        Years of Experience
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          id="experience"
                          name="experience"
                          type="number"
                          min="0"
                          value={formData.experience}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors ${
                            errors.experience ? "border-red-500" : "border-white/20"
                          }`}
                          placeholder="Years of experience"
                        />
                      </div>
                      {errors.experience && <p className="mt-1 text-sm text-red-400">{errors.experience}</p>}
                    </div>
                  </div>

                  {/* License Number */}
                  <div>
                    <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-300 mb-2">
                      Medical License Number
                    </label>
                    <div className="relative">
                      <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        id="licenseNumber"
                        name="licenseNumber"
                        type="text"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors ${
                          errors.licenseNumber ? "border-red-500" : "border-white/20"
                        }`}
                        placeholder="Enter your license number"
                      />
                    </div>
                    {errors.licenseNumber && <p className="mt-1 text-sm text-red-400">{errors.licenseNumber}</p>}
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </motion.button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-gray-300">
                  Already have an account?{" "}
                  <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>
            </motion.form>
          )}

          {/* Step 3: OTP Verification */}
          {step === 3 && (
            <motion.form
              key="otp-verification"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleOTPSubmit}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 space-y-6 text-center"
            >
              {/* Success Message */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-green-200 text-sm">
                    Account created successfully! Please check your email for the verification code.
                  </span>
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-lg p-4"
                >
                  <div className="flex items-center justify-center">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-red-200 text-sm">{error}</span>
                  </div>
                </motion.div>
              )}

              <div>
                <p className="text-gray-300 mb-4">We've sent a 6-digit verification code to:</p>
                <p className="text-cyan-400 font-medium">{otpData.email}</p>
              </div>

              {/* OTP Input */}
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-2">
                  Verification Code
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  maxLength="6"
                  value={otpData.otp}
                  onChange={handleOTPChange}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white text-center text-2xl tracking-widest placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors ${
                    errors.otp ? "border-red-500" : "border-white/20"
                  }`}
                  placeholder="000000"
                />
                {errors.otp && <p className="mt-1 text-sm text-red-400">{errors.otp}</p>}
              </div>

              {/* Verify Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </>
                ) : (
                  "Verify Account"
                )}
              </motion.button>

              {/* Resend OTP */}
              <div>
                <p className="text-gray-300 text-sm mb-2">Didn't receive the code?</p>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors text-sm"
                >
                  Resend Code
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Signup
