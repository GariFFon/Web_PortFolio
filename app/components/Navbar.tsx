"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Update active section based on scroll position
      const sections = ['about', 'competitive-programming', 'projects', 'timeline', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navItems = ['about', 'competitive-programming', 'projects', 'timeline', 'contact']

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      }
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        staggerDirection: 1,
        when: "beforeChildren",
      }
    }
  }

  const mobileItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  }

  return (
    <div className="w-full flex justify-center">
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          duration: 0.8 
        }}
        onHoverStart={() => setHovering(true)}
        onHoverEnd={() => setHovering(false)}
        className={`${scrolled ? 'bg-primary/40' : 'bg-primary/25'} 
          backdrop-blur-xl fixed w-[95%] sm:w-[90%] lg:w-[85%] top-4 z-50 py-3 sm:py-4 px-4 sm:px-6 transition-all duration-500
          ${hovering ? 'shadow-[0_15px_40px_-10px_rgba(100,255,218,0.4)]' : 'shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)]'} 
          border border-accent/20 max-w-6xl rounded-xl floating-navbar translate-y-0
          hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 ease-in-out animate-float`}
      >
        <div className="flex justify-between items-center w-full">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-accent font-bold text-xl sm:text-2xl md:text-3xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="relative group">
              <span className="relative z-10">GariFFon</span>
              <motion.span 
                className="absolute -bottom-1 -left-2 -right-2 h-[6px] bg-accent/10 rounded-md"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6 }}
                whileHover={{ 
                  scaleX: 1.1, 
                  backgroundColor: "rgba(100,255,218,0.3)",
                  transition: { duration: 0.3 }
                }}
              ></motion.span>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden md:flex items-center space-x-6 lg:space-x-8"
          >
            {navItems.map((item, index) => (
              <motion.div 
                key={item}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  delay: 0.3 + index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }}
              >
                <Link 
                  href={`#${item}`} 
                  className={`nav-item relative group overflow-hidden ${activeSection === item ? 'text-accent' : 'text-textLight'}`}
                  onClick={() => setActiveSection(item)}
                >
                  <span className="relative z-10 hover:text-accent transition-colors duration-300">
                    {item === 'timeline' ? 'Experience' : 
                     item === 'competitive-programming' ? 'CP' : 
                     item.charAt(0).toUpperCase() + item.slice(1)}
                  </span>
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-accent"
                    initial={{ width: activeSection === item ? '100%' : '0%' }}
                    animate={{ width: activeSection === item ? '100%' : '0%' }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                  <span className="absolute top-0 left-0 w-full h-full bg-accent/5 scale-0 group-hover:scale-100 rounded-md transition-transform duration-300 -z-10"></span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center space-x-3 sm:space-x-4"
          >
            {[
              { href: "https://github.com/GariFFon", icon: <FaGithub size={20} className="sm:text-xl" /> },
              { href: "https://www.linkedin.com/in/gourav-dash-gariffon/", icon: <FaLinkedin size={20} className="sm:text-xl" /> },
              { href: "https://twitter.com/", icon: <FaTwitter size={20} className="sm:text-xl" /> }
            ].map((social, index) => (
              <motion.a 
                key={index}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-textLight hover:text-accent transition-colors duration-300"
                whileHover={{ 
                  y: -3, 
                  scale: 1.2,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.7 + index * 0.1,
                  duration: 0.5
                }}
              >
                {social.icon}
              </motion.a>
            ))}

            {/* Mobile Menu Toggle */}
            <motion.button
              className="block md:hidden text-textLight hover:text-accent p-1.5 rounded-full hover:bg-accent/10 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </motion.button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed top-[72px] left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] z-40 bg-primary/70 backdrop-blur-2xl border border-accent/20 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] overflow-hidden md:hidden rounded-xl max-w-6xl"
          >
            <div className="py-4 px-6 flex flex-col space-y-3">
              {navItems.map((item, index) => (
                <motion.div
                  key={item}
                  variants={mobileItemVariants}
                  className="py-2"
                >
                  <Link
                    href={`#${item}`}
                    className={`block text-lg ${activeSection === item ? 'text-accent' : 'text-textLight'} relative group overflow-hidden`}
                    onClick={() => {
                      setActiveSection(item)
                      setMobileMenuOpen(false)
                    }}
                  >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-accent">
                      {item === 'timeline' ? 'Experience' : 
                       item === 'competitive-programming' ? 'CP' : 
                       item.charAt(0).toUpperCase() + item.slice(1)}
                    </span>
                    <motion.span 
                      className="absolute -bottom-1 left-0 h-0.5 bg-accent"
                      initial={{ width: activeSection === item ? '100%' : '0%' }}
                      animate={{ width: activeSection === item ? '100%' : '0%' }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    ></motion.span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar