'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminAuth from '@/app/admin/components/AdminAuth'
import { supabase } from '@/lib/appwrite'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data } = await supabase.auth.getSession()
      setIsAuthenticated(!!data.session)
    } catch (error) {
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-blue mx-auto mb-4"></div>
          <p className="text-white text-xl">Verifying Admin Access...</p>
        </div>
      </div>
    )
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminAuth />
  }

  // Show admin dashboard if authenticated
  return <div className="admin-scope">{children}</div>
}
