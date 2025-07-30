import { useState } from "react"
import { motion } from "framer-motion"
import { X, Share2, Mail, MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react"
import { sharedPredictionAPI } from "../../services/api.js"

const SharePredictionModal = ({ prediction, isOpen, onClose, onSuccess }) => {
  const [doctorEmail, setDoctorEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!doctorEmail.trim()) {
      setError("Doctor's email is required")
      return
    }

    if (!/\S+@\S+\.\S+/.test(doctorEmail)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      await sharedPredictionAPI.sharePrediction({
        predictionId: prediction._id,
        doctorEmail: doctorEmail.trim(),
        message: message.trim(),
      })

      setSuccess(true)
      setTimeout(() => {
        onSuccess?.()
        handleClose()
      }, 2000)
    } catch (error) {
      setError(error.response?.data?.message || "Failed to share prediction")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setDoctorEmail("")
    setMessage("")
    setError("")
    setSuccess(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-900 border border-white/10 rounded-xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {success ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Shared Successfully!</h3>
            <p className="text-gray-300">
              The doctor will receive an email notification and can now view your analysis.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Share Analysis</h3>
              </div>
              <button
                onClick={handleClose}
                className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Prediction Summary */}
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <h4 className="text-white font-semibold mb-2">Analysis to Share:</h4>
              <p className="text-cyan-400 font-medium">{prediction?.result?.prediction || "Analysis"}</p>
              <p className="text-gray-300 text-sm mt-1">{new Date(prediction?.timestamp).toLocaleDateString()}</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4"
              >
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-red-200 text-sm">{error}</span>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Doctor's Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    value={doctorEmail}
                    onChange={(e) => setDoctorEmail(e.target.value)}
                    placeholder="doctor@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message to Doctor (Optional)</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add any additional context or questions for the doctor..."
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-3 border border-white/20 text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sharing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Share Analysis
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

export default SharePredictionModal
