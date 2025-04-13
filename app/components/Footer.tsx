"use client"

import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaChevronUp } from 'react-icons/fa'
import { motion } from 'framer-motion'

interface FooterProps {
  className?: string;
}

const Footer = ({ className = '' }: FooterProps) => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className={`bg-secondary/80 backdrop-blur-lg py-10 mt-10 relative z-10 border-t border-accent/10 ${className}`}>
      {/* Back to top button */}
      <motion.a 
        href="#" 
        className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-accent text-primary w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-accent/20 hover:bg-accent/90 transition-colors duration-300"
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <FaChevronUp />
      </motion.a>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-accent mb-2 relative inline-block group">
              GariFFon
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-300"></span>
            </h3>
            <p className="text-textLight max-w-md">
              Software developer passionate about creating innovative solutions and sharing knowledge with the community.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center md:items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex space-x-5 mb-4">
              {[
                { icon: <FaGithub size={22} />, href: "https://github.com/GariFFon", label: "GitHub" },
                { icon: <FaLinkedin size={22} />, href: "https://www.linkedin.com/in/gourav-dash-gariffon/", label: "LinkedIn" },
                { icon: <FaTwitter size={22} />, href: "https://twitter.com/", label: "Twitter" },
                { icon: <FaEnvelope size={22} />, href: "mailto:gaurav.dash05@gmail.com", label: "Email" }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={social.label}
                  className="text-textLight hover:text-accent transition-colors duration-300"
                  whileHover={{ 
                    y: -3, 
                    scale: 1.2,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <motion.p 
              className="text-textLight text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              © {currentYear} Gourav Dash. All rights reserved.
            </motion.p>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-accent/10 mt-8 pt-6 text-center text-textLight/60 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p>Built with Next.js, TypeScript, and Tailwind CSS. Deployed on Vercel.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 