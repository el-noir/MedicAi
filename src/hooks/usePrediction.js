"use client"

import { useState, useEffect } from "react"

export const usePrediction = () => {
  const [symptoms, setSymptoms] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [predictions, setPredictions] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [availableSymptoms, setAvailableSymptoms] = useState([])

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await fetch("http://localhost:5000/symptoms")
        if (!response.ok) throw new Error("Failed to fetch symptoms")
        const data = await response.json()
        setAvailableSymptoms(data.symptoms || data)
      } catch (err) {
        console.error("Failed to fetch symptoms:", err)
        setError("Failed to load symptoms list")
      }
    }
    fetchSymptoms()
  }, [])

  const predictDisease = async () => {
    if (symptoms.length === 0) {
      setError("Please add at least one symptom")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Prediction failed with status ${response.status}`)
      }

      const data = await response.json()
      setPredictions(data)
    } catch (err) {
      console.error("Prediction error:", err)
      setError(err.message || "Failed to get prediction")
    } finally {
      setIsLoading(false)
    }
  }

  const addSymptom = (symptom) => {
    const normalizedSymptom = symptom.trim().toLowerCase()
    if (normalizedSymptom && !symptoms.includes(normalizedSymptom)) {
      setSymptoms((prev) => [...prev, normalizedSymptom])
      setInputValue("")
    }
  }

  const removeSymptom = (symptomToRemove) => {
    setSymptoms((prev) => prev.filter((symptom) => symptom !== symptomToRemove))
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      addSymptom(inputValue.trim())
    }
  }

  const resetPrediction = () => {
    setSymptoms([])
    setPredictions(null)
    setError(null)
  }

  return {
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
  }
}
