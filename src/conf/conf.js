const conf = {
  backendUrl: String(import.meta.env.VITE_BACKEND_URL || "https://medicaibackend-production.up.railway.app"),
}

// Debug log to verify configuration
console.log("Frontend config:", conf)

export default conf
