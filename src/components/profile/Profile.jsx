import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import {
  User,
  Mail,
  Calendar,
  Edit3,
  Save,
  X,
  Activity,
  TrendingUp,
  Clock,
  Trash2,
  Eye,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { fetchUserPredictions, deletePrediction } from "../../store/slices/predictionSlice"
import { authAPI } from "../../services/api"

const Profile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { predictions, totalPredictions, isLoading } = useSelector((state) => state.predictions)

  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
  })
  const [selectedPrediction, setSelectedPrediction] = useState(null)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [updateMessage, setUpdateMessage] = useState("")

  useEffect(() => {
    dispatch(fetchUserPredictions())
  }, [dispatch])

  const handleEdit = () => {
    setIsEditing(true)
    setEditData({
      fullName: user?.fullName || "",
      email: user?.email || "",
    })
  }

  const handleSave = async () => {
    setUpdateLoading(true)
    try {
      await authAPI.updateProfile(editData)
      setUpdateMessage("Profile updated successfully!")
      setIsEditing(false)
      // You might want to refresh user data here
    } catch (error) {
      setUpdateMessage("Failed to update profile")
    } finally {
      setUpdateLoading(false)
      setTimeout(() => setUpdateMessage(""), 3000)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData({
      fullName: user?.fullName || "",
      email: user?.email || "",
    })
  }

  const handleDeletePrediction = async (predictionId) => {
    if (window.confirm("Are you sure you want to delete this prediction?")) {
      dispatch(deletePrediction(predictionId))
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

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case "low":
        return "text-green-400 bg-green-500/20"
      case "medium":
        return "text-yellow-400 bg-yellow-500/20"
      case "high":
        return "text-red-400 bg-red-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-gray-300">Manage your account and view your health analysis history</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Personal Information</h2>
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={updateLoading}
                      className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {updateMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 p-3 rounded-lg flex items-center ${
                    updateMessage.includes("success")
                      ? "bg-green-500/10 border border-green-500/20"
                      : "bg-red-500/10 border border-red-500/20"
                  }`}
                >
                  {updateMessage.includes("success") ? (
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400 mr-2" />
                  )}
                  <span className={`text-sm ${updateMessage.includes("success") ? "text-green-200" : "text-red-200"}`}>
                    {updateMessage}
                  </span>
                </motion.div>
              )}

              <div className="space-y-4">
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.fullName}
                      onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-white/5 rounded-lg">
                      <User className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-white">{user?.fullName}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <div className="flex items-center p-3 bg-white/5 rounded-lg">
                    <Mail className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-white">{user?.email}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                  <div className="flex items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-white">@{user?.username}</span>
                  </div>
                </div>

                {/* Join Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Member Since</label>
                  <div className="flex items-center p-3 bg-white/5 rounded-lg">
                    <Calendar className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-white">{user?.createdAt ? formatDate(user.createdAt) : "N/A"}</span>
                  </div>
                </div>

                {/* Role Badge */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Account Type</label>
                  <div className="inline-flex items-center px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium">
                    <User className="w-4 h-4 mr-2" />
                    Patient
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Predictions History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Health Analysis History</h2>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-300">
                    Total: <span className="text-cyan-400 font-semibold">{totalPredictions}</span>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Total Analyses</p>
                      <p className="text-2xl font-bold text-cyan-400">{totalPredictions}</p>
                    </div>
                    <Activity className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">This Month</p>
                      <p className="text-2xl font-bold text-green-400">
                        {
                          predictions.filter((p) => {
                            const predDate = new Date(p.timestamp)
                            const now = new Date()
                            return (
                              predDate.getMonth() === now.getMonth() && predDate.getFullYear() === now.getFullYear()
                            )
                          }).length
                        }
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-400" />
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Avg Confidence</p>
                      <p className="text-2xl font-bold text-yellow-400">
                        {predictions.length > 0
                          ? Math.round(
                              predictions.reduce((acc, p) => acc + (p.result?.confidence || 0), 0) / predictions.length,
                            )
                          : 0}
                        %
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-400" />
                  </div>
                </div>
              </div>

              {/* Predictions List */}
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                    <p className="text-gray-300">Loading predictions...</p>
                  </div>
                ) : predictions.length > 0 ? (
                  predictions.map((prediction) => (
                    <motion.div
                      key={prediction._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-cyan-400/50 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-white font-semibold">{prediction.result?.prediction || "Analysis"}</h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(
                                prediction.result?.riskLevel,
                              )}`}
                            >
                              {prediction.result?.riskLevel || "Unknown"} Risk
                            </span>
                            {prediction.result?.confidence && (
                              <span className="text-xs text-gray-400">
                                {Math.round(prediction.result.confidence)}% confidence
                              </span>
                            )}
                          </div>
                          <p className="text-gray-300 text-sm mb-2">
                            <strong>Symptoms:</strong> {prediction.symptoms?.join(", ") || "N/A"}
                          </p>
                          <p className="text-gray-400 text-xs">{formatDate(prediction.timestamp)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedPrediction(prediction)}
                            className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePrediction(prediction._id)}
                            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">No predictions yet</h3>
                    <p className="text-gray-400 mb-4">Start analyzing your symptoms to see your history here</p>
                    <a
                      href="/prediction"
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300"
                    >
                      Start Analysis
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Prediction Detail Modal */}
        {selectedPrediction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPrediction(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-900 border border-white/10 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Analysis Details</h3>
                <button
                  onClick={() => setSelectedPrediction(null)}
                  className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Diagnosis</h4>
                  <p className="text-gray-300">{selectedPrediction.result?.prediction || "N/A"}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Symptoms</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPrediction.symptoms?.map((symptom, index) => (
                      <span key={index} className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Risk Level</h4>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(
                        selectedPrediction.result?.riskLevel,
                      )}`}
                    >
                      {selectedPrediction.result?.riskLevel || "Unknown"}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Confidence</h4>
                    <p className="text-gray-300">
                      {selectedPrediction.result?.confidence
                        ? `${Math.round(selectedPrediction.result.confidence)}%`
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {selectedPrediction.result?.recommendations && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Recommendations</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      {selectedPrediction.result.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Analysis Date</h4>
                  <p className="text-gray-300">{formatDate(selectedPrediction.timestamp)}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Profile
