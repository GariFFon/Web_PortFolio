/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        primary: '#0A192F',
        secondary: '#172A45',
        accent: '#64FFDA',
        text: '#CCD6F6',
        textLight: '#8892B0',
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        bounce: 'bounce 1s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 4s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'text-gradient': 'text-gradient 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(100, 255, 218, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(100, 255, 218, 0.5)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'text-gradient': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
      transitionTimingFunction: {
        'bounce-in-out': 'cubic-bezier(0, 1.68, 0.58, 1)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDelay: {
        '2000': '2000ms',
        '3000': '3000ms',
        '4000': '4000ms',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(to right, transparent 0%, #64FFDA20 20%, #64FFDA30 60%, transparent 100%)',
      }
    },
  },
  plugins: [],
} 