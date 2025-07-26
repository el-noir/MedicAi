import { useState, useEffect } from 'react'
import './App.css'
import Home from './components/Home.jsx'
import conf from './conf/conf.js'

function App() {
  const [healthData, setHealthData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${conf.backendUrl}/health`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setHealthData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    checkHealth()
  }, [])

  if (loading) return <div>Loading health check...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="App">
      <h1>Health Check Status</h1>
      {healthData && (
        <div>
          <p>Success: {healthData.success.toString()}</p>
          <p>Message: {healthData.message}</p>
          <p>Timestamp: {healthData.timestamp}</p>
        </div>
      )}
      <Home />
    </div>
  )
}

export default App