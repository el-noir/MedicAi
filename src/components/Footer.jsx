import React from 'react'
import { Stethoscope } from 'lucide-react';
import {motion} from 'framer-motion'
function Footer (){
return (
      <div className="bg-black/50 border-t border-white/10 py-12 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                SymptomAI
              </span>
            </div>
            
            <div className="flex space-x-6 text-gray-400">
              <motion.a 
                href="#" 
                className="hover:text-cyan-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                Privacy
              </motion.a>
              <motion.a 
                href="#" 
                className="hover:text-cyan-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                Terms
              </motion.a>
              <motion.a 
                href="#" 
                className="hover:text-cyan-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                Support
              </motion.a>
              <motion.a 
                href="#" 
                className="hover:text-cyan-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                Contact
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2025 SymptomAI. All rights reserved. This tool is for informational purposes only and should not replace professional medical advice.</p>
          </motion.div>
        </div>
      </div>
);
}

export default Footer