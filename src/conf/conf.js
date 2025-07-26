const conf = {
  backendUrl: String(import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"),
}

// Debug log to verify configuration
console.log("Frontend config:", conf)

export default conf
