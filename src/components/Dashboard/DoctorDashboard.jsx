"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  User,
  Activity,
  TrendingUp,
  Clock,
  Eye,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Stethoscope,
  Users,
  FileText,
} from "lucide-react"
import { sharedPredictionAPI } from "../../services/api.js"

const DoctorDashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const [receivedPredictions, setReceivedPredictions] = useState([])
  const [stats, setStats] = useState({
    totalReceived: 0,
    pending: 0,
    responded: 0,
    thisMonth: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (user && user.role === "doctor") {
      fetchDoctorData()
    }
  }, [user])

  const fetchDoctorData = async () => {
    try {
      setIsLoading(true)
      setError("")
      // Fetch received predictions
      const response = await sharedPredictionAPI.getDoctorReceivedPredictions({ limit: 10 })
      const predictions = response.data.data.receivedPredictions
      setReceivedPredictions(predictions)

      // Calculate stats
      const totalReceived = response.data.data.totalReceived
      const pending = predictions.filter((p) => p.status === "pending").length
      const responded = predictions.filter((p) => p.status === "responded").length
      const thisMonth = predictions.filter((p) => {
        const predDate = new Date(p.createdAt)
        const now = new Date()
        return predDate.getMonth() === now.getMonth() && predDate.getFullYear() === now.getFullYear()
      }).length

      setStats({
        totalReceived,
        pending,
        responded,
        thisMonth,
      })
    } catch (error) {
      console.error("Error fetching doctor data:", error)
      setError("Failed to load dashboard data")
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-400 bg-yellow-500/20"
      case "viewed":
        return "text-blue-400 bg-blue-500/20"
      case "responded":
        return "text-green-400 bg-green-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  const quickActions = [
    {
      title: "View All Shared Cases",
      description: "Review all shared predictions",
      icon: <FileText className="w-6 h-6" />,
      link: "/doctor/shared-predictions",
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Patient Consultations",
      description: "Manage consultations",
      icon: <Users className="w-6 h-6" />,
      link: "/doctor/consultations",
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Medical Records",
      description: "Access patient records",
      icon: <Activity className="w-6 h-6" />,
      link: "/doctor/records",
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Profile Settings",
      description: "Update your profile",
      icon: <User className="w-6 h-6" />,
      link: "/doctor/profile",
      color: "from-orange-500 to-red-600",
    },
  ]

  if (!user || user.role !== "doctor") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-300">You must be logged in as a doctor to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome, Dr. {user?.fullName}!</h1>
                <p className="text-gray-300">
                  Specialization: {user?.specialization} • Experience: {user?.experience} years
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to={action.link}
                  className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 group"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {action.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
                  <p className="text-gray-300 text-sm">{action.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Practice Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Cases</p>
                  <p className="text-2xl font-bold text-cyan-400">{isLoading ? "..." : stats.totalReceived}</p>
                </div>
                <FileText className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-400">{isLoading ? "..." : stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Responded</p>
                  <p className="text-2xl font-bold text-green-400">{isLoading ? "..." : stats.responded}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">This Month</p>
                  <p className="text-2xl font-bold text-purple-400">{isLoading ? "..." : stats.thisMonth}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Shared Predictions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Shared Cases</h2>
            <Link to="/doctor/shared-predictions" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              View All
            </Link>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
            {error ? (
              <div className="p-12 text-center">
                <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-300 mb-2">Error Loading Data</h3>
                <p className="text-red-200 mb-4">{error}</p>
                <button
                  onClick={fetchDoctorData}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : isLoading ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                <p className="text-gray-300">Loading shared cases...</p>
              </div>
            ) : receivedPredictions.length > 0 ? (
              <div className="divide-y divide-white/10">
                {receivedPredictions.map((sharedPrediction, index) => (
                  <div key={sharedPrediction._id || index} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-gray-300 text-sm">{formatDate(sharedPrediction.createdAt)}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(sharedPrediction.status)}`}>
                            {sharedPrediction.status.charAt(0).toUpperCase() + sharedPrediction.status.slice(1)}
                          </span>
                          {sharedPrediction.prediction?.flaskResponse?.emergency && (
                            <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">Emergency</span>
                          )}
                        </div>
                        <h3 className="text-white font-semibold mb-1">
                          Patient: {sharedPrediction.patient?.fullName || "Unknown"}
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Diagnosis: {sharedPrediction.prediction?.result?.prediction?.replace(/_/g, " ") || "Unknown"}
                        </p>
                        {sharedPrediction.message && (
                          <p className="text-gray-400 text-sm mt-1 italic">"{sharedPrediction.message}"</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/doctor/shared/${sharedPrediction.shareCode}`}
                          className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        {sharedPrediction.status !== "responded" && (
                          <Link
                            to={`/doctor/shared/${sharedPrediction.shareCode}`}
                            className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <Stethoscope className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-300 mb-2">No shared cases yet</h3>
                <p className="text-gray-400">Patients will share their analyses with you for review</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DoctorDashboard
