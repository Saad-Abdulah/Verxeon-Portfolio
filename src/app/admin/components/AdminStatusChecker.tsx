'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, User, CheckCircle, XCircle, RefreshCw, LogOut } from 'lucide-react'
import { useAuthUserQuery } from '@/hooks/queries'

interface AdminStatusCheckerProps {
  onLogout: () => void
}

const AdminStatusChecker = ({ onLogout }: AdminStatusCheckerProps) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  const { data: user, isLoading: loadingQuery, refetch } = useAuthUserQuery()
  useEffect(() => {
    setLoading(loadingQuery)
    setIsAdmin(!!user)
    setEmail(user?.email || '')
  }, [user, loadingQuery])

  const handleRefresh = async () => { await refetch() }

  if (loading) {
    return (
      <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-neon-blue"></div>
          <span className="text-gray-300">Checking admin status...</span>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gray-900 rounded-lg border border-gray-800"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Shield className="h-5 w-5 text-neon-blue" />
          <span>Admin Status Checker</span>
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center space-x-2 px-3 py-2 bg-neon-blue hover:bg-neon-blue/80 rounded-lg transition-colors text-sm disabled:opacity-50"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <User className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-white font-medium">{email || 'Not signed in'}</p>
            <p className="text-gray-400 text-sm">Supabase Auth User</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {isAdmin ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
          <div>
            <p className={`font-medium ${isAdmin ? 'text-green-400' : 'text-red-400'}`}>
              {isAdmin ? 'Admin Access Granted' : 'Admin Access Denied'}
            </p>
            <p className="text-gray-400 text-sm">
              Supabase Authentication
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
        <p className="text-gray-400 text-xs">
          <Shield className="inline h-3 w-3 mr-1" />
          Admin access is managed through Supabase authentication
        </p>
      </div>
    </motion.div>
  )
}

export default AdminStatusChecker
