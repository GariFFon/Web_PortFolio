import Link from 'next/link'
import { FaHome } from 'react-icons/fa'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl md:text-8xl font-bold text-accent mb-4">404</h1>
      <h2 className="text-2xl md:text-4xl font-bold text-text mb-6">Page Not Found</h2>
      <p className="text-textLight max-w-md mx-auto mb-8">
        Oops! The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <Link 
        href="/" 
        className="btn-primary inline-flex items-center"
      >
        <FaHome className="mr-2" /> Back to Home
      </Link>
    </div>
  )
} 