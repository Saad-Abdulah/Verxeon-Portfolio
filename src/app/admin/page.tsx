'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Users, 
  FileText, 
  Briefcase, 
  MessageSquare, 
  Settings, 
  Plus, 
  LogOut,
  Shield,
  BarChart3,
  Building
} from 'lucide-react'
import ProjectManager from '@/app/admin/components/ProjectManager'
import TeamManager from '@/app/admin/components/TeamManager'
import IndustriesManager from '@/app/admin/components/IndustriesManager'
import ContactManager from '@/app/admin/components/ContactManager'
import TestimonialsManager from '@/app/admin/components/TestimonialsManager'
import BlogManager from '@/app/admin/components/BlogManager'
import { supabase } from '@/lib/appwrite'

const AdminDashboard = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.push('/admin/auth/callback')
          return
        }
        setChecking(false)
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/admin/auth/callback')
      }
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/admin/auth/callback')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Checking authentication...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-neon-blue" />
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 admin-content">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-800 p-1 rounded-lg admin-tabs">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'projects', label: 'Projects', icon: Briefcase },
            { id: 'team', label: 'Team', icon: Users },
            { id: 'blog', label: 'Blog', icon: FileText },
            { id: 'industries', label: 'Industries', icon: Building },
            { id: 'contacts', label: 'Contacts', icon: MessageSquare },
            { id: 'testimonials', label: 'Testimonials', icon: MessageSquare }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-neon-blue text-white shadow-lg'
                    : 'text-white/90 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => setActiveTab('projects')}
              className="glass p-6 rounded-xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-300 hover:scale-105 text-left"
            >
              <Plus className="h-8 w-8 text-neon-blue mb-4" />
              <h3 className="text-lg font-semibold mb-2">Add New Project</h3>
              <p className="text-gray-400 text-sm">Create a new project entry</p>
            </motion.button>
          </div>
        )}

        {activeTab === 'projects' && <ProjectManager />}
        {activeTab === 'team' && <TeamManager />}
        {activeTab === 'blog' && <BlogManager />}
        {activeTab === 'industries' && <IndustriesManager />}
        {activeTab === 'contacts' && <ContactManager />}
        {activeTab === 'testimonials' && <TestimonialsManager />}
      </main>
    </div>
  )
}

export default AdminDashboard
