"use client"

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const particles: Particle[] = []
    const particleCount = 120  // Reduced from 150 to 120
    
    // Set canvas dimensions
    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    window.addEventListener('resize', handleResize)
    handleResize()
    
    // Particle class
    class Particle {
      x: number = 0
      y: number = 0
      size: number = 1
      speedX: number = 0
      speedY: number = 0
      color: string = 'rgba(100, 255, 218, 0.1)'
      alpha: number = 0.1
      pulseSpeed: number = Math.random() * 0.01 + 0.01
      maxSize: number = 0
      originalSize: number = 0
      
      constructor() {
        if (!canvas) return
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.originalSize = this.size = Math.random() * 2.5 + 0.8  // Slightly reduced from 3+1
        this.maxSize = this.originalSize * 1.8  // Reduced from 2x
        this.speedX = (Math.random() - 0.5) * 0.6
        this.speedY = (Math.random() - 0.5) * 0.6
        this.alpha = Math.random() * 0.4 + 0.15  // Slightly reduced opacity
        this.color = this.getRandomColor()
      }
      
      getRandomColor() {
        const colors = [
          'rgba(100, 255, 218, alpha)', // Teal
          'rgba(148, 130, 255, alpha)', // Purple
          'rgba(86, 124, 194, alpha)',  // Blue
          'rgba(220, 130, 240, alpha)', // Pink
        ]
        
        const color = colors[Math.floor(Math.random() * colors.length)]
        return color.replace('alpha', this.alpha.toString())
      }
      
      update() {
        if (!canvas) return
        this.x += this.speedX
        this.y += this.speedY
        
        // Pulse size effect
        this.size = this.originalSize + Math.sin(Date.now() * this.pulseSpeed) * (this.maxSize - this.originalSize)
        
        // Bounce off edges with slight randomization
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX * (0.9 + Math.random() * 0.2)
          
          // Add slight vertical movement when bouncing horizontally
          this.speedY += (Math.random() - 0.5) * 0.2
        }
        
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY * (0.9 + Math.random() * 0.2)
          
          // Add slight horizontal movement when bouncing vertically
          this.speedX += (Math.random() - 0.5) * 0.2
        }
        
        // Cap speed to prevent particles from accelerating too much
        const maxSpeed = 1.5
        this.speedX = Math.max(Math.min(this.speedX, maxSpeed), -maxSpeed)
        this.speedY = Math.max(Math.min(this.speedY, maxSpeed), -maxSpeed)
      }
      
      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
    
    // Connect particles with lines if they're close enough
    const connectParticles = () => {
      if (!ctx) return
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150) {
            const opacity = 1 - (distance / 150)
            ctx.beginPath()
            // Create a gradient line
            const gradient = ctx.createLinearGradient(
              particles[i].x, 
              particles[i].y, 
              particles[j].x, 
              particles[j].y
            )
            gradient.addColorStop(0, `rgba(100, 255, 218, ${opacity * 0.3})`)
            gradient.addColorStop(1, `rgba(148, 130, 255, ${opacity * 0.3})`)
            
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.6 * opacity
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      connectParticles()
      
      requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full -z-10 opacity-75" // Reduced from opacity-80
      />
      
      {/* Gradient orbs */}
      <div className="fixed top-1/3 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow opacity-30 -z-20"></div>
      <div className="fixed bottom-20 -right-40 w-[30rem] h-[30rem] bg-accent/20 rounded-full blur-3xl animate-pulse-slow opacity-30 -z-20 animation-delay-2000"></div>
      <div className="fixed top-2/3 right-1/4 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-pulse-slow opacity-20 -z-20 animation-delay-4000"></div>
      
      {/* Subtle grid pattern */}
      <div 
        className="fixed inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.02] -z-20 pointer-events-none"
        style={{ backgroundSize: '30px 30px' }}
      ></div>
      
      {/* Animated radial gradients */}
      <motion.div 
        className="fixed top-1/2 left-1/2 w-[100vh] h-[100vh] rounded-full blur-3xl -z-20 opacity-[0.03] pointer-events-none"
        initial={{ opacity: 0.01 }}
        animate={{ 
          opacity: [0.01, 0.03, 0.01],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ 
          background: 'radial-gradient(circle, rgba(100,255,218,1) 0%, rgba(100,255,218,0) 70%)',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      <motion.div 
        className="fixed top-1/3 left-1/4 w-[60vh] h-[60vh] rounded-full blur-3xl -z-20 opacity-[0.02] pointer-events-none"
        initial={{ opacity: 0.01 }}
        animate={{ 
          opacity: [0.01, 0.02, 0.01],
          scale: [0.9, 1.1, 0.9]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{ 
          background: 'radial-gradient(circle, rgba(148,130,255,1) 0%, rgba(148,130,255,0) 70%)',
        }}
      />
    </>
  )
}

export default AnimatedBackground