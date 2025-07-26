"use client"
import { motion } from "framer-motion"
import { Shield, Users, Award, Clock, Stethoscope } from "lucide-react"

const About = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "HIPAA Compliant",
      description: "Your health data is encrypted and protected with enterprise-grade security standards.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Trusted by Professionals",
      description: "Used by over 10,000 healthcare providers worldwide for preliminary diagnosis.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "94% Accuracy Rate",
      description: "Our AI model has been trained on millions of medical cases with proven accuracy.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Instant Results",
      description: "Get preliminary diagnosis in under 30 seconds with detailed explanations.",
    },
  ]

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer",
      description: "15+ years in emergency medicine, AI healthcare pioneer",
    },
    {
      name: "Michael Rodriguez",
      role: "Lead AI Engineer",
      description: "Former Google AI researcher, specialized in medical ML",
    },
    {
      name: "Dr. James Wilson",
      role: "Clinical Advisor",
      description: "Board-certified family physician, telemedicine expert",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
            About SymptomAI
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing healthcare with AI-powered symptom analysis and preliminary diagnosis. Our mission is to
            make quality healthcare insights accessible to everyone, everywhere.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-gray-300 text-center max-w-4xl mx-auto leading-relaxed">
              We believe that everyone deserves access to quality healthcare insights. SymptomAI combines cutting-edge
              artificial intelligence with medical expertise to provide accurate, instant preliminary diagnosis that
              helps users make informed decisions about their health.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Choose SymptomAI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:border-cyan-400/50 transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-3 w-fit mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-cyan-400 font-medium mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-12">Trusted Worldwide</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-4xl font-bold text-cyan-400 mb-2">250K+</div>
              <div className="text-gray-300">Users Helped</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-4xl font-bold text-blue-400 mb-2">94%</div>
              <div className="text-gray-300">Accuracy Rate</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-4xl font-bold text-purple-400 mb-2">500+</div>
              <div className="text-gray-300">Conditions</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-4xl font-bold text-green-400 mb-2">10K+</div>
              <div className="text-gray-300">Healthcare Providers</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
