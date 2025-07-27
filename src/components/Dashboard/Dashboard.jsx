import { useAuth } from "../../hooks/useAuth.js"
import UserDashboard from "./UserDashboard.jsx"
import DoctorDashboard from "./DoctorDashboard.jsx"
import LoadingSpinner from "../LoadingSpinner"

const Dashboard = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingSpinner message="Loading dashboard..." />
  }

  if (!user) {
    return <LoadingSpinner message="Loading user data..." />
  }

  // Render appropriate dashboard based on user role
  switch (user.role) {
    case "doctor":
      return <DoctorDashboard />
    case "user":
    default:
      return <UserDashboard />
  }
}

export default Dashboard
