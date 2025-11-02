"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { FaCode, FaTrophy, FaMedal, FaCalendarAlt, FaExternalLinkAlt, FaInfoCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { SiLeetcode, SiCodeforces, SiCodechef } from 'react-icons/si'

type Platform = {
  name: string
  icon: React.ElementType
  color: string
  url: string
  profileUrl: string
  stats: {
    rating?: string | number
    rank?: string
    solved?: number
    badges?: string[]
    streak?: number
    contests?: number
  }
}

const PlatformCard = ({ platform }: { platform: Platform }) => {
  const [expanded, setExpanded] = useState(false)
  const cardRef = React.useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const statItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.div 
      ref={cardRef}
      className="backdrop-blur-md bg-primary/10 p-6 rounded-xl relative overflow-hidden group border border-accent/10 hover:border-accent/30"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ 
        y: -5, 
        boxShadow: '0 10px 25px -5px rgba(100, 255, 218, 0.15)',
        transition: { duration: 0.3 }
      }}
    >
      {/* Platform color bar with animation */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-1"
        style={{ backgroundColor: platform.color }}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.5, delay: 0.2 }}
      ></motion.div>
      
      <div className="flex items-center mb-4">
        <motion.div 
          className="mr-3 text-3xl"
          style={{ color: platform.color }}
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <platform.icon />
        </motion.div>
        <h3 className="text-xl font-bold text-text">{platform.name}</h3>
        <motion.a 
          href={platform.profileUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="ml-auto text-textLight hover:text-accent transition-colors duration-300 flex items-center gap-1 bg-primary/30 px-2 py-1 rounded-md text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Profile</span>
          <FaExternalLinkAlt size={12} />
        </motion.a>
      </div>
      
      <motion.div 
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {platform.stats.rating && (
          <motion.div 
            className="flex items-center text-textLight group"
            variants={statItemVariants}
          >
            <div className="mr-2 p-1.5 rounded-md bg-primary/20 text-yellow-400 group-hover:bg-yellow-400/10 transition-colors duration-300">
              <FaTrophy className="w-4 h-4" />
            </div>
            <span>Rating: <span className="text-text font-medium">{platform.stats.rating}</span></span>
          </motion.div>
        )}
        
        {platform.stats.rank && (
          <motion.div 
            className="flex items-center text-textLight group"
            variants={statItemVariants}
          >
            <div className="mr-2 p-1.5 rounded-md bg-primary/20 text-accent group-hover:bg-accent/10 transition-colors duration-300">
              <FaMedal className="w-4 h-4" />
            </div>
            <span>Rank: <span className="text-text font-medium">{platform.stats.rank}</span></span>
          </motion.div>
        )}
        
        {platform.stats.solved && (
          <motion.div 
            className="flex items-center text-textLight group"
            variants={statItemVariants}
          >
            <div className="mr-2 p-1.5 rounded-md bg-primary/20 text-green-400 group-hover:bg-green-400/10 transition-colors duration-300">
              <FaCode className="w-4 h-4" />
            </div>
            <span>Problems Solved: <span className="text-text font-medium">{platform.stats.solved}</span></span>
          </motion.div>
        )}
        
        {platform.stats.streak && (
          <motion.div 
            className="flex items-center text-textLight group"
            variants={statItemVariants}
          >
            <div className="mr-2 p-1.5 rounded-md bg-primary/20 text-blue-400 group-hover:bg-blue-400/10 transition-colors duration-300">
              <FaCalendarAlt className="w-4 h-4" />
            </div>
            <span>Active Streak: <span className="text-text font-medium">{platform.stats.streak} days</span></span>
          </motion.div>
        )}
        
        {platform.stats.contests && (
          <motion.div 
            className="flex items-center text-textLight group"
            variants={statItemVariants}
          >
            <div className="mr-2 p-1.5 rounded-md bg-primary/20 text-purple-400 group-hover:bg-purple-400/10 transition-colors duration-300">
              <FaTrophy className="w-4 h-4" />
            </div>
            <span>Contests: <span className="text-text font-medium">{platform.stats.contests}</span></span>
          </motion.div>
        )}
      </motion.div>
      
      {platform.stats.badges && platform.stats.badges.length > 0 && (
        <>
          <div className="mt-4 mb-2 flex justify-between items-center">
            <h4 className="text-sm text-textLight">Achievements</h4>
            <motion.button
              className="text-accent/80 hover:text-accent p-1 rounded-full bg-primary/20 hover:bg-primary/40 transition-colors duration-300"
              onClick={() => setExpanded(!expanded)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {expanded ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
            </motion.button>
          </div>
          
          <AnimatePresence>
            {expanded && (
              <motion.div 
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {platform.stats.badges.map((badge, index) => (
                  <motion.span 
                    key={index} 
                    className="text-xs bg-accent/10 text-accent px-3 py-1.5 rounded-full border border-accent/20 hover:bg-accent/20 transition-colors duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {badge}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  )
}

const CompetitiveProgramming = () => {
  const sectionRef = React.useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState('platforms')
  
  const platforms: Platform[] = [
    {
      name: "LeetCode",
      icon: SiLeetcode,
      color: "#FFA116",
      url: "https://leetcode.com",
      profileUrl: "https://leetcode.com/u/GariFFon05/",
      stats: {
        rating: 1674,
        rank: "Top 15%",
        solved: 483,
        badges: ["100 Day Streak", "50 Day Streak", ]
      }
    },
    {
      name: "CodeForces",
      icon: SiCodeforces,
      color: "#1F8ACB",
      url: "https://codeforces.com",
      profileUrl: "https://codeforces.com/profile/Gourav_Dash",
      stats: {
        rating: 1010,
        rank: "Pupil",
        contests: 8,
        solved: 94
      }
    },
    {
      name: "CodeChef",
      icon: SiCodechef,
      color: "#5B4638",
      url: "https://www.codechef.com",
      profileUrl: "https://www.codechef.com/users/gariffon05",
      stats: {
        rating: 1271,
        rank: "2★",
        contests: 1,
        solved: 7
      }
    }
  ]
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }
  
  const statItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  }
  
  return (
    <section id="competitive-programming" ref={sectionRef} className="py-20 scroll-mt-20 relative">
      {/* Animated background elements */}
      <motion.div 
        className="absolute -right-32 top-40 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -z-10"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      <motion.div 
        className="absolute -left-32 bottom-20 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] -z-10"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      ></motion.div>
      
      <div className="section-heading-container">
        <motion.h2 
          className="section-heading relative inline-block"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          Competitive Programming
        </motion.h2>
      </div>
      
      <motion.p 
        className="text-textLight mb-10 max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        My journey in the world of algorithms, data structures, and problem-solving competitions.
        Check out my profiles on various competitive programming platforms.
      </motion.p>
      
      {/* Tab Navigation */}
      <div className="mb-10 flex justify-center">
        <div className="bg-primary/20 backdrop-blur-md p-1 rounded-lg flex space-x-1">
          <motion.button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === 'platforms' ? 'bg-accent text-primary' : 'text-textLight hover:text-text'}`}
            onClick={() => setActiveTab('platforms')}
            whileHover={{ scale: activeTab !== 'platforms' ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
          >
            Platforms
          </motion.button>
          <motion.button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === 'journey' ? 'bg-accent text-primary' : 'text-textLight hover:text-text'}`}
            onClick={() => setActiveTab('journey')}
            whileHover={{ scale: activeTab !== 'journey' ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
          >
            My Journey
          </motion.button>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {activeTab === 'platforms' && (
          <motion.div 
            key="platforms"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
          >
            {platforms.map((platform) => (
              <PlatformCard key={platform.name} platform={platform} />
            ))}
          </motion.div>
        )}
        
        {activeTab === 'journey' && (
          <motion.div 
            key="journey"
            className="backdrop-blur-md bg-primary/10 border border-accent/10 p-8 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
          >
            <motion.h3 
              className="text-2xl font-bold text-text mb-4 flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FaInfoCircle className="text-accent" />
              My Competitive Programming Journey
            </motion.h3>
            
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p 
                className="text-textLight leading-relaxed"
                variants={statItemVariants}
              >
                I started my competitive programming journey in 2024, focusing on algorithmic problem-solving and data structure optimization.
                Over the years, I've participated in numerous online contests and improved my ranking across various platforms.
              </motion.p>
              
              <motion.p 
                className="text-textLight leading-relaxed"
                variants={statItemVariants}
              >
                My approach to competitive programming combines analytical thinking with creative problem-solving techniques.
                I enjoy tackling complex algorithmic challenges, especially those involving dynamic programming, graph algorithms, and mathematical optimization.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-3 mt-6"
                variants={statItemVariants}
              >
                <motion.span 
                  className="bg-primary/30 text-accent px-3 py-1.5 rounded-full border border-accent/20 text-sm hover:bg-accent/10 transition-colors duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  Dynamic Programming
                </motion.span>
                <motion.span 
                  className="bg-primary/30 text-accent px-3 py-1.5 rounded-full border border-accent/20 text-sm hover:bg-accent/10 transition-colors duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  Graph Algorithms
                </motion.span>
                <motion.span 
                  className="bg-primary/30 text-accent px-3 py-1.5 rounded-full border border-accent/20 text-sm hover:bg-accent/10 transition-colors duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  Binary Search
                </motion.span>
                <motion.span 
                  className="bg-primary/30 text-accent px-3 py-1.5 rounded-full border border-accent/20 text-sm hover:bg-accent/10 transition-colors duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  Greedy Algorithms
                </motion.span>
                <motion.span 
                  className="bg-primary/30 text-accent px-3 py-1.5 rounded-full border border-accent/20 text-sm hover:bg-accent/10 transition-colors duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  Data Structures
                </motion.span>
                <motion.span 
                  className="bg-primary/30 text-accent px-3 py-1.5 rounded-full border border-accent/20 text-sm hover:bg-accent/10 transition-colors duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  Mathematical Optimization
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default CompetitiveProgramming