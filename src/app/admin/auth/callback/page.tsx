'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const OAuthCallback = () => {
  const router = useRouter()

  useEffect(() => {
    // Redirect to admin page
    router.push('/admin')
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-blue mx-auto mb-4"></div>
        <p className="text-white text-xl">Redirecting to admin dashboard...</p>
      </div>
    </div>
  )
}

export default OAuthCallback
