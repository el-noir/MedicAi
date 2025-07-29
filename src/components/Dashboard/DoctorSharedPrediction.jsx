
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  User,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Send,
  MessageSquare,
  Stethoscope,
  Clock,
  Shield,
  AlertCircle,
} from "lucide-react"
import { sharedPredictionAPI } from "../../services/api"

const DoctorSharedPrediction = () => {
  const { shareCode } = useParams()
  const navigate = useNavigate()

  const [sharedPrediction, setSharedPrediction] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isResponding, setIsResponding] = useState(false)
  const [responseData, setResponseData] = useState({
    message: "",
    recommendations: [""],
    followUpRequired: false,
  })
  const [responseError, setResponseError] = useState("")
  const [responseSuccess, setResponseSuccess] = useState(false)

  useEffect(() => {
    if (shareCode) {
      fetchSharedPrediction()
    } else {
      setError("Invalid share code")
      setIsLoading(false)
    }
  }, [shareCode])

  const fetchSharedPrediction = async () => {
    try {
      setIsLoading(true)
      setError("")
      const response = await sharedPredictionAPI.viewSharedPrediction(shareCode)
      setSharedPrediction(response.data.data)
    } catch (error) {
      console.error("Error fetching shared prediction:", error)
      if (error.response?.status === 404) {
        setError("Shared prediction not found or access denied")
      } else if (error.response?.status === 401) {
        setError("You must be logged in as a doctor to view this")
      } else {
        setError(error.response?.data?.message || "Failed to load shared prediction")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddRecommendation = () => {
    setResponseData({
      ...responseData,
      recommendations: [...responseData.recommendations, ""],
    })
  }

  const handleRemoveRecommendation = (index) => {
    const newRecommendations = responseData.recommendations.filter((_, i) => i !== index)
    setResponseData({
      ...responseData,
      recommendations: newRecommendations.length > 0 ? newRecommendations : [""],
    })
  }

  const handleRecommendationChange = (index, value) => {
    const newRecommendations = [...responseData.recommendations]
    newRecommendations[index] = value
    setResponseData({
      ...responseData,
      recommendations: newRecommendations,
    })
  }

  const handleSubmitResponse = async (e) => {
    e.preventDefault()

    if (!responseData.message.trim()) {
      setResponseError("Response message is required")
      return
    }

    setIsResponding(true)
    setResponseError("")

    try {
      const filteredRecommendations = responseData.recommendations.filter((rec) => rec.trim() !== "")

      await sharedPredictionAPI.respondToSharedPrediction(shareCode, {
        message: responseData.message.trim(),
        recommendations: filteredRecommendations,
        followUpRequired: responseData.followUpRequired,
      })

      setResponseSuccess(true)
      // Refresh the shared prediction to show the response
      await fetchSharedPrediction()
    } catch (error) {
      console.error("Error submitting response:", error)
      setResponseError(error.response?.data?.message || "Failed to submit response")
    } finally {
      setIsResponding(false)
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading shared analysis...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Access Error</h2>
            <p className="text-red-200 mb-6">{error}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={() => navigate("/doctor/dashboard")}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!sharedPrediction) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <p className="text-white text-lg">No prediction data found</p>
        </div>
      </div>
    )
  }

  const prediction = sharedPrediction.prediction
  const patient = sharedPrediction.patient

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Shared Medical Analysis</h1>
              <p className="text-gray-300">Review and respond to patient's analysis</p>
            </div>
          </div>

          {/* Status Banner */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    sharedPrediction.status === "pending"
                      ? "bg-yellow-400"
                      : sharedPrediction.status === "viewed"
                        ? "bg-blue-400"
                        : "bg-green-400"
                  }`}
                ></div>
                <span className="text-white font-medium">
                  Status: {sharedPrediction.status.charAt(0).toUpperCase() + sharedPrediction.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Shared: {formatDate(sharedPrediction.createdAt)}
                </div>
                {sharedPrediction.viewedAt && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Viewed: {formatDate(sharedPrediction.viewedAt)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                Patient Information
              </h2>

              <div className="space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <p className="text-white font-semibold">{patient?.fullName || "N/A"}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <p className="text-white">{patient?.email || "N/A"}</p>
                </div>

                {sharedPrediction.message && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Patient's Message</label>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                      <p className="text-blue-200 italic">"{sharedPrediction.message}"</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Analysis Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Stethoscope className="w-5 h-5" />
                Medical Analysis
              </h2>

              {/* Emergency Alert */}
              {prediction?.flaskResponse?.emergency && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                    <div className="text-red-200">
                      <strong>Emergency Condition Detected!</strong> This patient may require immediate attention.
                    </div>
                  </div>
                </div>
              )}

              {/* Risk Score */}
              {prediction?.flaskResponse?.overall_risk_score && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-white">Overall Risk Score</span>
                    <span className="text-sm text-gray-400">
                      {prediction.flaskResponse.overall_risk_score.toFixed(1)}/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(prediction.flaskResponse.overall_risk_score * 10, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Primary Diagnosis */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Primary Diagnosis</h3>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-cyan-400 font-semibold capitalize">
                        {prediction?.result?.prediction?.replace(/_/g, " ") || "Unknown"}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(
                            prediction?.result?.riskLevel,
                          )}`}
                        >
                          {prediction?.result?.riskLevel || "Unknown"} Risk
                        </span>
                        {prediction?.result?.confidence && (
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                            {Math.round(prediction.result.confidence * 100)}% confidence
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Symptoms */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Reported Symptoms</h3>
                  <div className="flex flex-wrap gap-2">
                    {prediction?.symptoms?.map((symptom, index) => (
                      <span key={index} className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
                        {symptom.replace(/_/g, " ")}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Recommendations */}
                {prediction?.result?.recommendations && prediction.result.recommendations.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">AI-Generated Precautions</h3>
                    <div className="bg-white/5 rounded-lg p-4">
                      <ul className="space-y-2">
                        {prediction.result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-300">
                            <CheckCircle className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                            <span className="capitalize">{rec.replace(/_/g, " ")}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Analysis Timestamp */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Analysis Date</h3>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(prediction?.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Response Section */}
            {sharedPrediction.status !== "responded" ? (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Your Professional Response
                </h2>

                {responseSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6"
                  >
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-green-200">Response sent successfully!</span>
                    </div>
                  </motion.div>
                )}

                {responseError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6"
                  >
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-red-200">{responseError}</span>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmitResponse} className="space-y-6">
                  {/* Response Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Professional Assessment <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={responseData.message}
                      onChange={(e) => setResponseData({ ...responseData, message: e.target.value })}
                      placeholder="Provide your professional assessment and recommendations..."
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                      required
                    />
                  </div>

                  {/* Recommendations */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Specific Recommendations</label>
                    <div className="space-y-2">
                      {responseData.recommendations.map((rec, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={rec}
                            onChange={(e) => handleRecommendationChange(index, e.target.value)}
                            placeholder={`Recommendation ${index + 1}`}
                            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          />
                          {responseData.recommendations.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveRecommendation(index)}
                              className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={handleAddRecommendation}
                        className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                      >
                        + Add another recommendation
                      </button>
                    </div>
                  </div>

                  {/* Follow-up Required */}
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={responseData.followUpRequired}
                        onChange={(e) => setResponseData({ ...responseData, followUpRequired: e.target.checked })}
                        className="w-4 h-4 text-cyan-500 bg-white/10 border-white/20 rounded focus:ring-cyan-500 focus:ring-2"
                      />
                      <span className="text-gray-300">Follow-up appointment required</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="flex-1 px-4 py-3 border border-white/20 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isResponding}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                    >
                      {isResponding ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending Response...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Response
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              // Show existing response
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Your Response (Sent)
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Professional Assessment</h3>
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-gray-300">{sharedPrediction.doctorResponse?.message}</p>
                    </div>
                  </div>

                  {sharedPrediction.doctorResponse?.recommendations &&
                    sharedPrediction.doctorResponse.recommendations.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Your Recommendations</h3>
                        <div className="bg-white/5 rounded-lg p-4">
                          <ul className="space-y-2">
                            {sharedPrediction.doctorResponse.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2 text-gray-300">
                                <CheckCircle className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-4">
                      {sharedPrediction.doctorResponse?.followUpRequired && (
                        <div className="flex items-center gap-1">
                          <Shield className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400">Follow-up Required</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Responded: {formatDate(sharedPrediction.doctorResponse?.respondedAt)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DoctorSharedPrediction
