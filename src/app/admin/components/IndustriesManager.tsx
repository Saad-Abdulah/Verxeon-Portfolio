'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, X, Save, Loader2, Upload, Image as ImageIcon, Building, Globe, Cpu, Cloud, Smartphone, Code, TrendingUp, Users, Shield, Zap, Target, CheckCircle, AlertCircle } from 'lucide-react'
import { FaChartLine, FaProjectDiagram, FaMobileAlt, FaLaptopCode } from 'react-icons/fa'
import { FaCloudArrowUp, FaBrain } from 'react-icons/fa6'
import { createIndustry, getIndustries, updateDocumentById, deleteDocumentById, uploadIndustryImage } from '@/lib/appwrite'

interface Industry {
  $id: string
  name: string
  description: string
  longDescription: string
  icon: string
  imageUrl?: string
  features: string[]
  technologies: string[]
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface IndustryFormData {
  name: string
  description: string
  longDescription: string
  icon: string
  imageUrl: string
  features: string
  technologies: string
  order: number
  isActive: boolean
}

// Icon options: React Icons first (requested), then existing lucide icons
const iconOptions = [
  // React Icons (preferred)
  { value: 'FaChartLine', label: 'SEO & SMM', icon: FaChartLine },
  { value: 'FaProjectDiagram', label: 'Agents & Automation', icon: FaProjectDiagram },
  { value: 'FaCloudArrowUp', label: 'Cloud Computing', icon: FaCloudArrowUp },
  { value: 'FaBrain', label: 'AI / ML', icon: FaBrain },
  { value: 'FaMobileAlt', label: 'App Development', icon: FaMobileAlt },
  { value: 'FaLaptopCode', label: 'Web Development', icon: FaLaptopCode },

  // Existing lucide-react icons
  { value: 'Building', label: 'Building', icon: Building },
  { value: 'Globe', label: 'Globe', icon: Globe },
  { value: 'Cpu', label: 'CPU', icon: Cpu },
  { value: 'Cloud', label: 'Cloud', icon: Cloud },
  { value: 'Smartphone', label: 'Smartphone', icon: Smartphone },
  { value: 'Code', label: 'Code', icon: Code },
  { value: 'TrendingUp', label: 'Trending Up', icon: TrendingUp },
  { value: 'Users', label: 'Users', icon: Users },
  { value: 'Shield', label: 'Shield', icon: Shield },
  { value: 'Zap', label: 'Zap', icon: Zap },
  { value: 'Target', label: 'Target', icon: Target }
]

const IndustriesManager = () => {
  const [industries, setIndustries] = useState<Industry[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState<IndustryFormData>({
    name: '',
    description: '',
    longDescription: '',
    icon: 'Code',
    imageUrl: '',
    features: '',
    technologies: '',
    order: 0,
    isActive: true
  })

  // Load industries on component mount
  useEffect(() => {
    loadIndustries()
  }, [])

  const loadIndustries = async () => {
    try {
      setLoading(true)
      const data = await getIndustries()
      setIndustries(data)
    } catch (error) {
      console.error('Error loading industries:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      longDescription: '',
      icon: 'Code',
      imageUrl: '',
      features: '',
      technologies: '',
      order: 0,
      isActive: true
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (industry: Industry) => {
    setFormData({
      name: industry.name,
      description: industry.description,
      longDescription: industry.longDescription || '',
      icon: industry.icon || 'Code',
      imageUrl: industry.imageUrl || '',
      features: Array.isArray(industry.features) ? industry.features.join(', ') : '',
      technologies: Array.isArray(industry.technologies) ? industry.technologies.join(', ') : '',
      order: industry.order,
      isActive: industry.isActive
    })
    setEditingId(industry.$id)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    try {
      setLoading(true)
      
      // Convert comma-separated strings to arrays
      const featuresArray = formData.features
        .split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0)
      
      const technologiesArray = formData.technologies
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0)

      const industryData: any = {
        name: formData.name.trim(),
        longDescription: formData.longDescription.trim(),
        icon: formData.icon,
        // Write both fields so either schema works (order or order_index)
        order: formData.order,
        orderIndex: formData.order,
        isActive: formData.isActive
      }

      // Optional fields: only include if provided and your schema supports them
      if (formData.imageUrl) industryData.imageUrl = formData.imageUrl
      if (featuresArray.length) industryData.features = featuresArray
      if (technologiesArray.length) industryData.technologies = technologiesArray

      if (editingId) {
        await updateDocumentById('services', editingId, industryData)
      } else {
        await createIndustry(industryData)
      }

      await loadIndustries()
      resetForm()
    } catch (error) {
      console.error('Error saving industry:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this industry?')) return

    try {
      setLoading(true)
      await deleteDocumentById('services', id)
      await loadIndustries()
    } catch (error) {
      console.error('Error deleting industry:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const imageUrl = await uploadIndustryImage(file)
      setFormData(prev => ({ ...prev, imageUrl }))
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      setLoading(true)
      await updateDocumentById('services', id, { isActive: !currentStatus })
      await loadIndustries()
    } catch (error) {
      console.error('Error updating industry status:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleActivateAll = async () => {
    if (!confirm('Are you sure you want to activate all industries?')) return

    try {
      setLoading(true)
      const inactiveIndustries = industries.filter(industry => !industry.isActive)
      
      for (const industry of inactiveIndustries) {
        await updateDocumentById('services', industry.$id, { isActive: true })
      }
      
      await loadIndustries()
    } catch (error) {
      console.error('Error activating all industries:', error)
    } finally {
      setLoading(false)
    }
  }

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(option => option.value === iconName)
    return iconOption ? iconOption.icon : Building
  }

  const activeIndustriesCount = industries.filter(industry => industry.isActive).length
  const inactiveIndustriesCount = industries.filter(industry => !industry.isActive).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Industries Management</h2>
          <p className="text-gray-400 mt-1">Manage your industry categories and services</p>
        </div>
        <div className="flex items-center gap-3">
          {inactiveIndustriesCount > 0 && (
            <button
              onClick={handleActivateAll}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Activate All ({inactiveIndustriesCount})
            </button>
          )}
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-neon-blue hover:bg-neon-blue/80 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Industry
          </button>
        </div>
      </div>

      {/* Status Summary */}
      <div className="glass p-4 rounded-xl border border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-white font-medium">{activeIndustriesCount} Active</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <span className="text-white font-medium">{inactiveIndustriesCount} Inactive</span>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Total: {industries.length} Industries
          </div>
        </div>
      </div>

      {/* Industry Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {editingId ? 'Edit Industry' : 'Add New Industry'}
                  </h3>
                  <p className="text-blue-100 mt-1">
                    {editingId ? 'Update industry information' : 'Create a new industry category'}
                  </p>
                </div>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Industry Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Industry Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., Web Development"
                    required
                  />
                </div>

                {/* Description */}
                

                {/* Order */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="0"
                  />
                </div>

                {/* Long Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    value={formData.longDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, longDescription: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Detailed description of the industry and its benefits"
                    required
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Key Features
                  </label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Feature 1, Feature 2, Feature 3"
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate features with commas</p>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Technologies
                  </label>
                  <textarea
                    value={formData.technologies}
                    onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Technology 1, Technology 2, Technology 3"
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate technologies with commas</p>
                </div>

                {/* Icon Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Icon
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {iconOptions.map((option) => {
                      const IconComponent = option.icon
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, icon: option.value }))}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.icon === option.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <IconComponent className="w-6 h-6 mx-auto" />
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Industry Image
                  </label>
                  <div className="space-y-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center gap-2"
                    >
                      {uploading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Upload className="w-5 h-5" />
                      )}
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </button>
                    {formData.imageUrl && (
                      <div className="relative">
                        <img
                          src={formData.imageUrl}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Active Status */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">Active Industry</span>
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  {editingId ? 'Update Industry' : 'Create Industry'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Industries List */}
      <div className="glass p-6 rounded-xl border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">All Industries</h3>
          {industries.length === 0 && (
            <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-neon-blue rounded-lg hover:bg-neon-blue/80 transition-all duration-200">Add Industry</button>
          )}
        </div>
        {industries.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <Building className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No industries found</p>
            <p className="text-sm">Get started by adding your first industry category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => {
              const IconComponent = getIconComponent(industry.icon)
              return (
                <motion.div
                  key={industry.$id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Industry Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{industry.name}</h4>
                          <p className="text-sm text-gray-500">Order: {industry.order}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleActive(industry.$id, industry.isActive)}
                          className={`p-2 rounded-lg transition-all ${
                            industry.isActive 
                              ? 'text-green-600 hover:bg-green-50' 
                              : 'text-yellow-600 hover:bg-yellow-50'
                          }`}
                          title={industry.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {industry.isActive ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <AlertCircle className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleEdit(industry)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(industry.$id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{industry.description}</p>
                  </div>

                  {/* Industry Content */}
                  <div className="p-6">
                    {/* Features */}
                    {industry.features && industry.features.length > 0 && (
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Key Features</h5>
                        <div className="flex flex-wrap gap-2">
                          {industry.features.slice(0, 3).map((feature, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                          {industry.features.length > 3 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              +{industry.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Technologies */}
                    {industry.technologies && industry.technologies.length > 0 && (
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Technologies</h5>
                        <div className="flex flex-wrap gap-2">
                          {industry.technologies.slice(0, 3).map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {industry.technologies.length > 3 && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                              +{industry.technologies.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Status */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        industry.isActive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {industry.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default IndustriesManager 