import { useAuth } from "../../hooks/useAuth"
import UserDashboard from "./UserDashboard.jsx"
import DoctorDashboard from "./DoctorDashboard.jsx"
import LoadingSpinner from "../LoadingSpinner.jsx"

const Dashboard = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingSpinner message="Loading dashboard..." />
  }

  if (!user) {
    return <LoadingSpinner message="Loading user data..." />
  }

  switch (user.role) {
    case "doctor":
      return <DoctorDashboard />
    case "user":
    default:
      return <UserDashboard />
  }
}

export default Dashboard
