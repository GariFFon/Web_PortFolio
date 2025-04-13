"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaEnvelope, FaLinkedin, FaGithub, FaDiscord, FaPaperPlane, FaTwitter } from 'react-icons/fa'

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const Contact = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Failed to send message. Please try again later.')
    }
  }

  // Card container animation variant
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Staggered item animation
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section id="contact" className="py-20 scroll-mt-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(100,255,218,0.08),transparent_70%)]"></div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 max-w-7xl"
      >
        <div className="section-heading-container">
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Info Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="contact-card hover:shadow-2xl backdrop-blur-lg hover:shadow-accent/30 h-full transform transition-all duration-500"
            whileHover={{ 
              y: -8,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <h3 className="text-2xl font-semibold text-text mb-8 bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              Contact Information
            </h3>
            
            <motion.div 
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Email */}
              <motion.div 
                variants={itemVariants}
                className="group relative"
              >
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="contact-icon animate-glow group-hover:rotate-12">
                    <FaEnvelope size={20} className="group-hover:text-white transition-colors" />
                  </div>
                  <div className="transition-transform group-hover:translate-x-2 duration-300 ease-in-out">
                    <p className="text-textLight text-sm">Email</p>
                    <a href="mailto:gaurav.dash05@gmail.com" className="text-text hover:text-accent transition-colors font-medium">
                      gaurav.dash05@gmail.com
                    </a>
                  </div>
                </div>
                <div className="absolute inset-0 bg-accent/5 scale-0 group-hover:scale-100 rounded-lg transition-transform duration-300 ease-in-out -z-0"></div>
              </motion.div>
              
              {/* LinkedIn */}
              <motion.div 
                variants={itemVariants}
                className="group relative"
              >
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="contact-icon group-hover:rotate-12">
                    <FaLinkedin size={20} className="group-hover:text-white transition-colors" />
                  </div>
                  <div className="transition-transform group-hover:translate-x-2 duration-300 ease-in-out">
                    <p className="text-textLight text-sm">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/gourav-dash-gariffon/" target="_blank" rel="noopener noreferrer" className="text-text hover:text-accent transition-colors font-medium">
                      linkedin.com/in/gourav-dash-gariffon
                    </a>
                  </div>
                </div>
                <div className="absolute inset-0 bg-accent/5 scale-0 group-hover:scale-100 rounded-lg transition-transform duration-300 ease-in-out -z-0"></div>
              </motion.div>
              
              {/* GitHub */}
              <motion.div 
                variants={itemVariants}
                className="group relative"
              >
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="contact-icon group-hover:rotate-12">
                    <FaGithub size={20} className="group-hover:text-white transition-colors" />
                  </div>
                  <div className="transition-transform group-hover:translate-x-2 duration-300 ease-in-out">
                    <p className="text-textLight text-sm">GitHub</p>
                    <a href="https://github.com/GariFFon" target="_blank" rel="noopener noreferrer" className="text-text hover:text-accent transition-colors font-medium">
                      github.com/GariFFon
                    </a>
                  </div>
                </div>
                <div className="absolute inset-0 bg-accent/5 scale-0 group-hover:scale-100 rounded-lg transition-transform duration-300 ease-in-out -z-0"></div>
              </motion.div>
              
              {/* Discord */}
              <motion.div 
                variants={itemVariants}
                className="group relative"
              >
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="contact-icon group-hover:rotate-12">
                    <FaDiscord size={20} className="group-hover:text-white transition-colors" />
                  </div>
                  <div className="transition-transform group-hover:translate-x-2 duration-300 ease-in-out">
                    <p className="text-textLight text-sm">Discord</p>
                    <a href="https://discord.com/users/gariffon" target="_blank" rel="noopener noreferrer" className="text-text hover:text-accent transition-colors font-medium">
                      gariffon
                    </a>
                  </div>
                </div>
                <div className="absolute inset-0 bg-accent/5 scale-0 group-hover:scale-100 rounded-lg transition-transform duration-300 ease-in-out -z-0"></div>
              </motion.div>
              
              {/* Twitter */}
              <motion.div 
                variants={itemVariants}
                className="group relative"
              >
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="contact-icon group-hover:rotate-12">
                    <FaTwitter size={20} className="group-hover:text-white transition-colors" />
                  </div>
                  <div className="transition-transform group-hover:translate-x-2 duration-300 ease-in-out">
                    <p className="text-textLight text-sm">Twitter</p>
                    <a href="https://twitter.com/GariFFonDash" target="_blank" rel="noopener noreferrer" className="text-text hover:text-accent transition-colors font-medium">
                      @GariFFonDash
                    </a>
                  </div>
                </div>
                <div className="absolute inset-0 bg-accent/5 scale-0 group-hover:scale-100 rounded-lg transition-transform duration-300 ease-in-out -z-0"></div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Contact Form Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="contact-card hover:shadow-2xl backdrop-blur-lg hover:shadow-accent/30 h-full transform transition-all duration-500"
            whileHover={{ 
              y: -8,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <h3 className="text-2xl font-semibold mb-8 bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              Send Me a Message
            </h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="group"
              >
                <label htmlFor="name" className="block text-textLight text-sm mb-2 font-medium group-focus-within:text-accent transition-colors">Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="contact-input"
                    placeholder="Your Name"
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-accent to-purple-400 group-focus-within:w-full transition-all duration-300 ease-in-out"></div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="group"
              >
                <label htmlFor="email" className="block text-textLight text-sm mb-2 font-medium group-focus-within:text-accent transition-colors">Email</label>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="contact-input"
                    placeholder="your.email@example.com"
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-accent to-purple-400 group-focus-within:w-full transition-all duration-300 ease-in-out"></div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="group"
              >
                <label htmlFor="subject" className="block text-textLight text-sm mb-2 font-medium group-focus-within:text-accent transition-colors">Subject</label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="contact-input"
                    placeholder="Subject"
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-accent to-purple-400 group-focus-within:w-full transition-all duration-300 ease-in-out"></div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="group"
              >
                <label htmlFor="message" className="block text-textLight text-sm mb-2 font-medium group-focus-within:text-accent transition-colors">Message</label>
                <div className="relative">
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="contact-input resize-none"
                    placeholder="Your message..."
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-accent to-purple-400 group-focus-within:w-full transition-all duration-300 ease-in-out"></div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full mt-6 bg-gradient-to-r from-accent to-purple-400 hover:from-accent hover:to-blue-400 text-primary font-semibold py-3 px-6 rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-accent/30 flex items-center justify-center gap-2 disabled:opacity-70 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </span>
                  <FaPaperPlane className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </button>
              </motion.div>
              
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-green-500/20 border border-green-500/50 text-green-300 p-4 rounded-lg text-center"
                  >
                    Your message has been sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
                
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg text-center"
                  >
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact 