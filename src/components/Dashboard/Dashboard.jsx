// // "use client"
// // import { motion } from "framer-motion"
// // import { Link } from "react-router-dom"
// // import { useDispatch, useSelector } from "react-redux"
// // import { Activity, Heart, Stethoscope, TrendingUp, Plus, Calendar, FileText, Settings, User } from "lucide-react"
// // import { useAuth } from "../../hooks/useAuth.js"
// // import DoctorDashboard from "./DoctorDashboard.jsx"
// // import LoadingSpinner from "../LoadingSpinner.jsx"

// // const Dashboard = () => {
// //   const dispatch = useDispatch()
// //   const { user, isLoading } = useAuth()
// //   const { predictions, stats } = useSelector((state) => state.predictions)

// //   if (isLoading) {
// //     return <LoadingSpinner message="Loading dashboard..." />
// //   }

// //   if (!user) {
// //     return <LoadingSpinner message="Loading user data..." />
// //   }

// //   switch (user.role) {
// //     case "doctor":
// //       return <DoctorDashboard />
// //     case "user":
// //     default:
// //       return (
// //         <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20 pb-12">
// //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //             {/* Welcome Section */}
// //             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
// //               <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.fullName}!</h1>
// //                     <p className="text-gray-300">Ready to analyze your symptoms with AI-powered insights?</p>
// //                   </div>
// //                   <div className="hidden md:block">
// //                     <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
// //                       <User className="w-8 h-8 text-white" />
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>

// //             {/* Quick Actions */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: 0.1 }}
// //               className="mb-8"
// //             >
// //               <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //                 <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
// //                   <Link
// //                     to="/prediction"
// //                     className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 group"
// //                   >
// //                     <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
// //                       <Plus className="w-8 h-8 text-white" />
// //                     </div>
// //                     <h3 className="text-lg font-semibold text-white mb-2">New Analysis</h3>
// //                     <p className="text-gray-300 text-sm">Start symptom analysis</p>
// //                   </Link>
// //                 </motion.div>
// //                 <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
// //                   <Link
// //                     to="/profile"
// //                     className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300 group"
// //                   >
// //                     <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
// //                       <FileText className="w-8 h-8 text-white" />
// //                     </div>
// //                     <h3 className="text-lg font-semibold text-white mb-2">Health History</h3>
// //                     <p className="text-gray-300 text-sm">View past analyses</p>
// //                   </Link>
// //                 </motion.div>
// //                 <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
// //                   <Link
// //                     to="/appointments"
// //                     className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-300 group"
// //                   >
// //                     <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
// //                       <Calendar className="w-8 h-8 text-white" />
// //                     </div>
// //                     <h3 className="text-lg font-semibold text-white mb-2">Appointments</h3>
// //                     <p className="text-gray-300 text-sm">Manage appointments</p>
// //                   </Link>
// //                 </motion.div>
// //                 <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
// //                   <Link
// //                     to="/profile"
// //                     className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-orange-400/50 transition-all duration-300 group"
// //                   >
// //                     <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
// //                       <Settings className="w-8 h-8 text-white" />
// //                     </div>
// //                     <h3 className="text-lg font-semibold text-white mb-2">Profile Settings</h3>
// //                     <p className="text-gray-300 text-sm">Update your profile</p>
// //                   </Link>
// //                 </motion.div>
// //               </div>
// //             </motion.div>

// //             {/* Stats Overview */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: 0.2 }}
// //               className="mb-8"
// //             >
// //               <h2 className="text-2xl font-bold text-white mb-6">Health Overview</h2>
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //                 <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <p className="text-gray-300 text-sm">Total Analyses</p>
// //                       <p className="text-2xl font-bold text-cyan-400">{stats.totalPredictions || 0}</p>
// //                     </div>
// //                     <Activity className="w-8 h-8 text-cyan-400" />
// //                   </div>
// //                 </div>
// //                 <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <p className="text-gray-300 text-sm">This Month</p>
// //                       <p className="text-2xl font-bold text-green-400">{stats.thisMonthPredictions || 0}</p>
// //                     </div>
// //                     <TrendingUp className="w-8 h-8 text-green-400" />
// //                   </div>
// //                 </div>
// //                 <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <p className="text-gray-300 text-sm">Avg Confidence</p>
// //                       <p className="text-2xl font-bold text-yellow-400">{`${stats.avgConfidence || 0}%`}</p>
// //                     </div>
// //                     <Heart className="w-8 h-8 text-yellow-400" />
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>

// //             {/* Recent Analyses */}
// //             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
// //               <div className="flex items-center justify-between mb-6">
// //                 <h2 className="text-2xl font-bold text-white">Recent Analyses</h2>
// //                 <Link to="/profile" className="text-cyan-400 hover:text-cyan-300 transition-colors">
// //                   View All
// //                 </Link>
// //               </div>
// //               <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
// //                 {predictions.length > 0 ? (
// //                   <div className="divide-y divide-white/10">
// //                     {predictions.slice(0, 3).map((prediction, index) => (
// //                       <div key={prediction._id || index} className="p-6">
// //                         <div className="flex items-center justify-between">
// //                           <div className="flex-1">
// //                             <div className="flex items-center gap-4 mb-2">
// //                               <span className="text-gray-300 text-sm">
// //                                 {new Date(prediction.timestamp).toLocaleDateString()}
// //                               </span>
// //                               <span
// //                                 className={`px-2 py-1 rounded-full text-xs ${
// //                                   prediction.result.riskLevel === "Low"
// //                                     ? "bg-green-500/20 text-green-400"
// //                                     : prediction.result.riskLevel === "Medium"
// //                                       ? "bg-yellow-500/20 text-yellow-400"
// //                                       : "bg-red-500/20 text-red-400"
// //                                 }`}
// //                               >
// //                                 {prediction.result.riskLevel} Risk
// //                               </span>
// //                               {prediction.result.confidence && (
// //                                 <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
// //                                   {(prediction.result.confidence * 100).toFixed(0)}% confidence
// //                                 </span>
// //                               )}
// //                             </div>
// //                             <h3 className="text-white font-semibold mb-1 capitalize">
// //                               {prediction.result.prediction.replace(/_/g, " ")}
// //                             </h3>
// //                             <p className="text-gray-300 text-sm">
// //                               Symptoms:{" "}
// //                               {prediction.symptoms
// //                                 .slice(0, 3)
// //                                 .map((s) => s.replace(/_/g, " "))
// //                                 .join(", ")}
// //                               {prediction.symptoms.length > 3 && ` +${prediction.symptoms.length - 3} more`}
// //                             </p>
// //                           </div>
// //                           <Stethoscope className="w-6 h-6 text-cyan-400" />
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="p-12 text-center">
// //                     <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
// //                     <h3 className="text-lg font-semibold text-gray-300 mb-2">No analyses yet</h3>
// //                     <p className="text-gray-400 mb-4">Start your first symptom analysis to see results here</p>
// //                     <Link
// //                       to="/prediction"
// //                       className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300"
// //                     >
// //                       <Plus className="w-4 h-4 mr-2" />
// //                       Start Analysis
// //                     </Link>
// //                   </div>
// //                 )}
// //               </div>
// //             </motion.div>
// //           </div>
// //         </div>
// //       )
// //   }
// // }

// // export default Dashboard

// "use client"
// import { useDispatch, useSelector } from "react-redux"
// import { useAuth } from "../../hooks/useAuth.js"
// import UserDashboard from "./UserDashboard.jsx"
// import DoctorDashboard from "./DoctorDashboard.jsx"
// import LoadingSpinner from "../LoadingSpinner.jsx"

// const Dashboard = () => {
//   const dispatch = useDispatch()
//   const { user, isLoading } = useAuth()
//   const { predictions, stats } = useSelector((state) => state.predictions)

//   if (isLoading) {
//     return <LoadingSpinner message="Loading dashboard..." />
//   }

//   if (!user) {
//     return <LoadingSpinner message="Loading user data..." />
//   }

//   // Route to appropriate dashboard based on user role
//   switch (user.role) {
//     case "doctor":
//       return <DoctorDashboard />
//     case "user":
//     default:
//       return <UserDashboard />
//   }
// }

// export default Dashboard


"use client"

import { useAuth } from "../../hooks/useAuth.js"
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
