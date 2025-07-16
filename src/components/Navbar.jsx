import React, {useState} from 'react'
import { Stethoscope, Menu, X } from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion'
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              SymptomAI
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="hover:text-cyan-400 transition-colors">
                Home
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/about" className="hover:text-cyan-400 transition-colors">
                About
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/reviews" className="hover:text-cyan-400 transition-colors">
                Reviews
              </Link>
            </motion.div>
            <motion.button 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-6 py-2 rounded-lg font-medium transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/signup">Sign Up</Link>
            </motion.button>
          </div>

          <motion.button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-4">
              <motion.div
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link 
                  to="/" 
                  className="block hover:text-cyan-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </motion.div>
              <motion.div
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link 
                  to="/about" 
                  className="block hover:text-cyan-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </motion.div>
              <motion.div
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link 
                  to="/reviews" 
                  className="block hover:text-cyan-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reviews
                </Link>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link 
                  to="/signup"
                  className="w-full block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;