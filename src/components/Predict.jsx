import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  AlertCircle,
  CheckCircle,
  Shield,
  Clock,
  Search,
  Plus,
  Trash2,
  Download,
  Share2,
  AlertTriangle,
  Heart,
  Brain,
  Stethoscope,
  Activity,
} from "lucide-react"
import { usePredictionWithSave } from "../hooks/usePrediction"

// Symptom categories for better organization
const SYMPTOM_CATEGORIES = {
  general: { name: "General", icon: Activity, color: "bg-blue-500" },
  respiratory: { name: "Respiratory", icon: Heart, color: "bg-green-500" },
  neurological: { name: "Neurological", icon: Brain, color: "bg-purple-500" },
  cardiovascular: { name: "Cardiovascular", icon: Stethoscope, color: "bg-red-500" },
  gastrointestinal: { name: "Digestive", icon: Activity, color: "bg-orange-500" },
  musculoskeletal: { name: "Musculoskeletal", icon: Activity, color: "bg-yellow-500" },
  dermatological: { name: "Skin", icon: Activity, color: "bg-pink-500" },
  other: { name: "Other", icon: Activity, color: "bg-gray-500" },
}

const Predict = () => {
  // Use the custom hook
  const {
    symptoms,
    inputValue,
    predictions,
    isLoading,
    error,
    availableSymptoms,
    addSymptom,
    removeSymptom,
    handleInputChange,
    handleKeyDown,
    predictDisease,
    resetPrediction,
    isSaving,
  } = usePredictionWithSave()

  // Local state for UI
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [symptomCategories, setSymptomCategories] = useState({})

  // Categorize symptoms based on keywords
  const categorizeSymptoms = (symptoms) => {
    const categories = {
      respiratory: ["cough", "breathlessness", "chest_pain", "throat", "breathing"],
      neurological: ["headache", "dizziness", "confusion", "memory", "seizure", "paralysis"],
      cardiovascular: ["chest_pain", "palpitations", "heart", "blood_pressure"],
      gastrointestinal: ["nausea", "vomiting", "diarrhea", "stomach", "abdominal", "appetite"],
      musculoskeletal: ["joint_pain", "muscle", "back_pain", "stiffness"],
      dermatological: ["rash", "skin", "itching", "spots"],
      general: ["fever", "fatigue", "weakness", "weight_loss", "chills"],
    }

    const categorized = {}
    symptoms.forEach((symptom) => {
      let assigned = false
      for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some((keyword) => symptom.toLowerCase().includes(keyword))) {
          if (!categorized[category]) categorized[category] = []
          categorized[category].push(symptom)
          assigned = true
          break
        }
      }
      if (!assigned) {
        if (!categorized.other) categorized.other = []
        categorized.other.push(symptom)
      }
    })
    setSymptomCategories(categorized)
  }

  // Categorize symptoms when available symptoms change
  useEffect(() => {
    if (availableSymptoms.length > 0) {
      categorizeSymptoms(availableSymptoms)
    }
  }, [availableSymptoms])

  // Filter symptoms based on search and category
  const filteredSymptoms = useMemo(() => {
    let filtered = availableSymptoms

    if (searchTerm) {
      filtered = filtered.filter((symptom) => symptom.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (selectedCategory !== "all" && symptomCategories[selectedCategory]) {
      filtered = filtered.filter((symptom) => symptomCategories[selectedCategory].includes(symptom))
    }

    return filtered.filter((symptom) => !symptoms.includes(symptom))
  }, [availableSymptoms, searchTerm, selectedCategory, symptoms, symptomCategories])

  // Clear all symptoms
  const clearAllSymptoms = () => {
    resetPrediction()
  }

  // Export results
  const exportResults = () => {
    if (!predictions) return

    const exportData = {
      timestamp: new Date().toISOString(),
      symptoms: symptoms,
      predictions: predictions.predictions,
      emergency: predictions.emergency,
      risk_score: predictions.overall_risk_score,
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `medical-analysis-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent leading-tight">
              AI Medical{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Diagnosis
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
              Advanced symptom analysis with AI-powered preliminary diagnosis
            </p>
            <div className="max-w-2xl mx-auto bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                <span className="text-yellow-200 text-sm">
                  This tool provides preliminary analysis only. Always consult healthcare professionals for medical
                  advice.
                </span>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Symptom Input Panel */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="p-6 border-b border-white/10">
                  <h2 className="text-2xl text-cyan-400 flex items-center gap-2 font-semibold">
                    <Stethoscope className="w-6 h-6" />
                    Symptom Selection
                  </h2>
                </div>

                <div className="p-6 space-y-6">
                  {/* Search and Filter */}
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search symptoms..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedCategory === "all"
                            ? "bg-cyan-500 text-white"
                            : "bg-white/10 text-gray-300 hover:bg-white/20"
                        }`}
                      >
                        All
                      </button>
                      {Object.entries(SYMPTOM_CATEGORIES).map(([key, category]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedCategory(key)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedCategory === key
                              ? "bg-cyan-500 text-white"
                              : "bg-white/10 text-gray-300 hover:bg-white/20"
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Add Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a symptom and press Enter..."
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => inputValue.trim() && addSymptom(inputValue.trim())}
                      disabled={!inputValue.trim()}
                      className="px-4 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Available Symptoms Grid */}
                  <div className="max-h-64 overflow-y-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {filteredSymptoms.slice(0, 50).map((symptom) => (
                        <button
                          key={symptom}
                          onClick={() => addSymptom(symptom)}
                          className="flex items-center justify-start text-left px-3 py-2 bg-white/5 border border-white/20 hover:bg-white/10 rounded-lg text-white text-xs transition-colors"
                        >
                          <Plus className="w-3 h-3 mr-2 flex-shrink-0" />
                          <span className="truncate">{symptom.replace(/_/g, " ")}</span>
                        </button>
                      ))}
                    </div>
                    {filteredSymptoms.length > 50 && (
                      <p className="text-gray-400 text-sm mt-2 text-center">
                        Showing 50 of {filteredSymptoms.length} symptoms. Use search to find more.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Symptoms & Actions */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-xl text-cyan-400 font-semibold">Selected Symptoms ({symptoms.length})</h3>
                  {symptoms.length > 0 && (
                    <button
                      onClick={clearAllSymptoms}
                      className="p-2 text-red-400 border border-red-400/50 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="p-4">
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    <AnimatePresence>
                      {symptoms.map((symptom) => (
                        <motion.div
                          key={symptom}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="flex items-center justify-between bg-cyan-500/20 border border-cyan-400/50 rounded-lg px-3 py-2"
                        >
                          <span className="capitalize text-sm">{symptom.replace(/_/g, " ")}</span>
                          <button
                            onClick={() => removeSymptom(symptom)}
                            className="p-1 text-cyan-300 hover:text-white rounded transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={predictDisease}
                  disabled={isLoading || symptoms.length === 0}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {isSaving ? "Saving..." : "Analyzing..."}
                    </>
                  ) : (
                    <>
                      <Activity className="w-4 h-4 mr-2" />
                      Analyze Symptoms
                    </>
                  )}
                </button>

                {predictions && (
                  <div className="flex gap-2">
                    <button
                      onClick={exportResults}
                      className="flex-1 px-4 py-2 border border-white/20 text-white hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </button>
                    <button
                      onClick={() => navigator.share && navigator.share({ title: "Medical Analysis Results" })}
                      className="flex-1 px-4 py-2 border border-white/20 text-white hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-red-200">{error}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {predictions && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl text-cyan-400 flex items-center gap-2 font-semibold">
                      <CheckCircle className="w-6 h-6" />
                      Analysis Results
                      {isSaving && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-400 ml-2"></div>
                      )}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date().toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        {predictions.emergency ? (
                          <span className="text-red-400 font-semibold">Emergency - Seek help!</span>
                        ) : (
                          <span className="text-green-400">Non-emergency</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Emergency Alert */}
                  {predictions.emergency && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                        <div className="text-red-200">
                          <strong>Emergency Condition Detected!</strong> Please seek immediate medical attention.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Risk Score */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Overall Risk Score</span>
                      <span className="text-sm text-gray-400">
                        {predictions.overall_risk_score?.toFixed(1) || 0}/10
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((predictions.overall_risk_score || 0) * 10, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    {/* Matched Symptoms */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3 text-white">Analyzed Symptoms</h3>
                      <div className="flex flex-wrap gap-2">
                        {predictions.matched_symptoms?.map((symptom) => (
                          <span key={symptom} className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">
                            {symptom.replace(/_/g, " ")}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Predictions */}
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-white">Possible Conditions</h3>
                      <div className="space-y-4">
                        {predictions.predictions?.map((prediction, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-xl p-6"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="text-lg font-semibold text-cyan-300 capitalize">
                                {prediction.disease?.replace(/_/g, " ")}
                              </h4>
                              <div className="flex items-center gap-2">
                                <span className="px-3 py-1 border border-blue-400/50 text-blue-400 rounded-full text-sm">
                                  {(prediction.confidence * 100).toFixed(1)}% confidence
                                </span>
                                {prediction.severity_score >= 6 && (
                                  <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">
                                    High Severity
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-gray-300 mb-4 leading-relaxed">{prediction.description}</p>
                            {prediction.critical_symptoms?.length > 0 && (
                              <div className="mb-4">
                                <h5 className="font-medium mb-2 text-red-400">Critical Symptoms Present:</h5>
                                <div className="flex flex-wrap gap-1">
                                  {prediction.critical_symptoms.map((symptom, i) => (
                                    <span key={i} className="px-2 py-1 bg-red-500 text-white rounded text-xs">
                                      {symptom.replace(/_/g, " ")}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div>
                              <h5 className="font-medium mb-2 text-white">Recommended Precautions:</h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {prediction.precautions?.map((precaution, i) => (
                                  <div key={i} className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                                    <span className="text-sm text-gray-300 capitalize">{precaution}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Predict
