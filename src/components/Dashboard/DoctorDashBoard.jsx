import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Users, Calendar, FileText, TrendingUp, Clock, AlertCircle, CheckCircle, UserCheck, Stethoscope } from 'lucide-react'
import { useAuth } from "../../hooks/useAuth"

const DoctorDashboard = () => {
  const { user } = useAuth()

  const quickActions = [
    {
      title: "Patient Analysis",
      description: "Analyze patient symptoms",
      icon: <Stethoscope className="w-6 h-6" />,
      link: "/prediction",
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Patient Records",
      description: "View patient history",
      icon: <FileText className="w-6 h-6" />,
      link: "/patients",
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Appointments",
      description: "Manage appointments",
      icon: <Calendar className="w-6 h-6" />,
      link: "/appointments",
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Analytics",
      description: "View practice analytics",
      icon: <TrendingUp className="w-6 h-6" />,
      link: "/analytics",
      color: "from-orange-500 to-red-600",
    },
  ]

  const todayStats = [
    { label: "Patients Today", value: "8", icon: <Users className="w-6 h-6" />, color: "text-cyan-400" },
    { label: "Pending Reviews", value: "3", icon: <Clock className="w-6 h-6" />, color: "text-yellow-400" },
    { label: "Completed", value: "12", icon: <CheckCircle className="w-6 h-6" />, color: "text-green-400" },
    { label: "Urgent Cases", value: "1", icon: <AlertCircle className="w-6 h-6" />, color: "text-red-400" },
  ]

  const recentPatients = [
    {
      name: "John Smith",
      age: 34,
      symptoms: ["chest_pain", "shortness_of_breath"],
      diagnosis: "Anxiety Disorder",
      risk: "Medium",
      time: "2 hours ago",
    },
    {
      name: "Sarah Johnson",
      age: 28,
      symptoms: ["headache", "nausea", "dizziness"],
      diagnosis: "Migraine",
      risk: "Low",
      time: "4 hours ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome, Dr. {user?.fullName}</h1>
                <p className="text-gray-300">
                  {user?.specialization} • {user?.experience} years experience
                </p>
                <p className="text-sm text-gray-400 mt-1">License: {user?.licenseNumber}</p>
              </div>
              <div className="hidden md:block">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Today's Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Today's Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {todayStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <div className={stat.color}>{stat.icon}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to={action.link}
                  className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300 group"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {action.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
                  <p className="text-gray-300 text-sm">{action.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Patient Analyses */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Patient Analyses</h2>
            <Link to="/patients" className="text-green-400 hover:text-green-300 transition-colors">
              View All Patients
            </Link>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
            {recentPatients.length > 0 ? (
              <div className="divide-y divide-white/10">
                {recentPatients.map((patient, index) => (
                  <div key={index} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-white font-semibold">{patient.name}</h3>
                          <span className="text-gray-400 text-sm">Age {patient.age}</span>
                          <span className="text-gray-400 text-sm">{patient.time}</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              patient.risk === "Low"
                                ? "bg-green-500/20 text-green-400"
                                : patient.risk === "Medium"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {patient.risk} Risk
                          </span>
                        </div>
                        <p className="text-cyan-300 font-medium mb-1">{patient.diagnosis}</p>
                        <p className="text-gray-300 text-sm">Symptoms: {patient.symptoms.join(", ")}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                          <FileText className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
                          <Calendar className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-300 mb-2">No recent patients</h3>
                <p className="text-gray-400 mb-4">Patient analyses will appear here</p>
                <Link
                  to="/prediction"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-all duration-300"
                >
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Start Analysis
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DoctorDashboard
