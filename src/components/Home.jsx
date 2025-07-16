import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Stethoscope, Brain, Shield, Clock, Users, Star, ArrowRight,X, CheckCircle, AlertCircle, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { div } from 'framer-motion/client';

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({ users: 0, accuracy: 0, diseases: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const featuresRef = useRef(null);

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Emergency Medicine Physician",
      content: "This tool has revolutionized my preliminary assessments. It's incredibly accurate and saves valuable time.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Patient",
      content: "Found out about my condition early thanks to this detector. The interface is intuitive and reassuring.",
      rating: 5
    },
    {
      name: "Dr. James Wilson",
      role: "Family Medicine",
      content: "An excellent screening tool that helps me prioritize patient care and identify urgent cases quickly.",
      rating: 5
    }
  ];

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze symptoms with 94% accuracy rate"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Instant Results",
      description: "Get preliminary diagnosis in under 30 seconds with detailed explanations"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "HIPAA Compliant",
      description: "Your health data is encrypted and protected with enterprise-grade security"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Trusted by Professionals",
      description: "Used by over 10,000 healthcare providers worldwide"
    }
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  // Animate stats on mount
  useEffect(() => {
    const animateValue = (start, end, duration, key) => {
      const startTime = performance.now();
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(start + (end - start) * progress);
        setAnimatedStats(prev => ({ ...prev, [key]: value }));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    };

    animateValue(0, 250000, 2000, 'users');
    animateValue(0, 94, 2000, 'accuracy');
    animateValue(0, 500, 2000, 'diseases');
  }, []);

  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
      <div>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div 
              className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Activity className="w-4 h-4 mr-2 text-green-400" />
              <span className="text-sm">Trusted by 10,000+ Healthcare Professionals</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Instant Symptom
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Analysis
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Get accurate, AI-powered health insights in seconds. Our advanced system analyzes your symptoms and provides preliminary diagnosis with 94% accuracy.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button 
              
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to='/prediction' className='flex items-center'>
                                Start Free Analysis
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.button>
              
              <motion.button 
                className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z"/>
                </svg>
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  {animatedStats.users.toLocaleString()}+
                </div>
                <div className="text-gray-400">Users Helped</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {animatedStats.accuracy}%
                </div>
                <div className="text-gray-400">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  {animatedStats.diseases}+
                </div>
                <div className="text-gray-400">Conditions Detected</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black/30 w-full" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">MedicAI</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Cutting-edge technology meets healthcare expertise to deliver unparalleled diagnostic accuracy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-3 w-fit mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get your diagnosis in three easy steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-xl font-bold mb-4">Describe Symptoms</h3>
              <p className="text-gray-300">Tell us about your symptoms in natural language or use our guided questionnaire</p>
            </motion.div>
            
            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-xl font-bold mb-4">AI Analysis</h3>
              <p className="text-gray-300">Our advanced AI processes your symptoms against our medical database</p>
            </motion.div>
            
            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-xl font-bold mb-4">Get Results</h3>
              <p className="text-gray-300">Receive detailed analysis with recommendations and next steps</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-black/30 w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Users Say</span>
            </h2>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl text-gray-200 mb-8 italic">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              
              <div className="text-lg font-semibold text-cyan-400">
                {testimonials[currentTestimonial].name}
              </div>
              <div className="text-gray-400">
                {testimonials[currentTestimonial].role}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial ? 'bg-cyan-400' : 'bg-gray-600'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Get <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Started?</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join thousands of users who trust SymptomAI for accurate, instant health insights
          </motion.p>
          
          <motion.button 
            className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-12 py-4 rounded-xl font-semibold text-xl transition-all duration-300 flex items-center mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Free Analysis
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.div 
            className="flex items-center justify-center mt-8 space-x-6 text-sm text-gray-400"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              Free to use
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2 text-blue-400" />
              HIPAA compliant
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-purple-400" />
              Results in 30 seconds
            </div>
          </motion.div>
        </div>
      </section>

     
    </div>
  );
}