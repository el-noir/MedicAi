import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Activity, Heart, Stethoscope, TrendingUp, Plus, Calendar, FileText, Settings, User } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"

const UserDashboard = () => {
  const { user } = useAuth()

  const quickActions = [
    {
      title: "New Analysis",
      description: "Start symptom analysis",
      icon: <Plus className="w-6 h-6" />,
      link: "/prediction",
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Health History",
      description: "View past analyses",
      icon: <FileText className="w-6 h-6" />,
      link: "/profile",
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
      title: "Profile Settings",
      description: "Update your profile",
      icon: <Settings className="w-6 h-6" />,
      link: "/profile",
      color: "from-orange-500 to-red-600",
    },
  ]

  const recentAnalyses = [
    {
      date: "2024-01-15",
      symptoms: ["headache", "fever", "fatigue"],
      result: "Common Cold",
      risk: "Low",
    },
    {
      date: "2024-01-10",
      symptoms: ["chest_pain", "shortness_of_breath"],
      result: "Anxiety",
      risk: "Medium",
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
                <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.fullName}!</h1>
                <p className="text-gray-300">Ready to analyze your symptoms with AI-powered insights?</p>
              </div>
              <div className="hidden md:block">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to={action.link}
                  className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 group"
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

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Health Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Analyses</p>
                  <p className="text-2xl font-bold text-cyan-400">12</p>
                </div>
                <Activity className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">This Month</p>
                  <p className="text-2xl font-bold text-green-400">3</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Avg Risk Score</p>
                  <p className="text-2xl font-bold text-yellow-400">2.4/10</p>
                </div>
                <Heart className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Analyses */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Analyses</h2>
            <Link to="/profile" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              View All
            </Link>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
            {recentAnalyses.length > 0 ? (
              <div className="divide-y divide-white/10">
                {recentAnalyses.map((analysis, index) => (
                  <div key={index} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-gray-300 text-sm">{analysis.date}</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              analysis.risk === "Low"
                                ? "bg-green-500/20 text-green-400"
                                : analysis.risk === "Medium"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {analysis.risk} Risk
                          </span>
                        </div>
                        <h3 className="text-white font-semibold mb-1">{analysis.result}</h3>
                        <p className="text-gray-300 text-sm">Symptoms: {analysis.symptoms.join(", ")}</p>
                      </div>
                      <Stethoscope className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-300 mb-2">No analyses yet</h3>
                <p className="text-gray-400 mb-4">Start your first symptom analysis to see results here</p>
                <Link
                  to="/prediction"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
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

export default UserDashboard
