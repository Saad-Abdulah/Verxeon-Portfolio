'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, X, Save, Loader2, Upload, Image as ImageIcon, Link as LinkIcon, Copy, Globe, Calendar, FileText, Building, ExternalLink, Check } from 'lucide-react'
import { createProject, getProjects, updateDocumentById, deleteDocumentById, uploadProjectImage, getIndustries } from '@/lib/appwrite'
import { formatTextWithLineBreaks } from '@/lib/utils'

interface Project {
  $id: string
  title: string
  longDescription: string
  detailedContent?: string
  category: string
  technologies: string[]
  features: string[]
  mainPicture: string
  liveUrl?: string
  services?: string[]
  createdAt: string
  updatedAt: string
}

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

interface ProjectFormData {
  title: string
  longDescription: string
  detailedContent: string
  category: string
  customCategory: string
  technologies: string
  features: string
  mainPicture: File | null
  liveUrl: string
  orderIndex?: number
}

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [industries, setIndustries] = useState<Industry[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    longDescription: '',
    detailedContent: '',
    category: '',
    customCategory: '',
    technologies: '',
    features: '',
    mainPicture: null,
    liveUrl: '',
    orderIndex: undefined
  })
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = [
    // Top 6
    'Web Development',
    'Agents & Automation',
    'SEO and Social Media Marketing',
    'App Development',
    'AI & ML',
    'Cloud Computing',
    'Other(Enter Manually)'
  ]

  useEffect(() => {
    fetchProjects()
    fetchIndustries()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const data = await getProjects()
      setProjects(data as unknown as Project[])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchIndustries = async () => {
    try {
      console.log('Fetching industries...')
      const data = await getIndustries()
      console.log('Raw industries data:', data)
      
      // Filter only active industries and sort by order
      const activeIndustries = data
        .filter((industry: any) => industry.isActive === true)
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
      
      // Add the 6 specified industries with asterisks
      const predefinedIndustries = [
        'Web Development',
        'Agents & Automation', 
        'SEO and Social Media Marketing',
        'App Development',
        'AI & ML',
        'Cloud Computing'
      ]
      
      // Merge predefined industries with fetched ones, avoiding duplicates
      const allIndustries = [...activeIndustries]
      predefinedIndustries.forEach(name => {
        if (!allIndustries.some((ind: any) => ind.name === name)) {
          allIndustries.push({ $id: `predefined-${name}`, name: `${name} *`, isActive: true })
        }
      })
      
      console.log('All industries:', allIndustries)
      setIndustries(allIndustries)
    } catch (error) {
      console.error('Error fetching industries:', error)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title.trim()) newErrors.title = 'Project title is required'
    if (!formData.longDescription.trim()) newErrors.longDescription = 'Project description is required'
    if (!formData.category.trim()) newErrors.category = 'Category is required'
    if (!formData.technologies.trim()) newErrors.technologies = 'Technologies are required'
    if (!formData.features.trim()) newErrors.features = 'Features are required'
    // if (formData.longDescription.length > 1000) newErrors.longDescription = 'Description must be under 300 characters'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    let projectData: any = {}
    
    try {
      setUploading(true)
      setErrors({})
      
      let imageUrl = ''
      if (formData.mainPicture) {
        imageUrl = await uploadProjectImage(formData.mainPicture)
      } else if (editingProject && editingProject.mainPicture) {
        // Preserve existing image when editing and no new image is uploaded
        imageUrl = editingProject.mainPicture
      }
      
      projectData = {
        title: formData.title.trim(),
        longDescription: formData.longDescription.trim(),
        detailedContent: formData.detailedContent.trim() || undefined,
        category: formData.category === 'Other(Enter Manually)' ? formData.customCategory : formData.category,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t),
        features: formData.features.split('#').map(f => f.trim()).filter(f => f),
        mainPicture: imageUrl,
        liveUrl: formData.liveUrl.trim() || undefined,
        services: [], // Initialize empty services array as per schema
        orderIndex: formData.orderIndex !== undefined && formData.orderIndex !== null && !Number.isNaN(Number(formData.orderIndex))
          ? Number(formData.orderIndex)
          : null
      }
      
      if (editingProject) {
        await updateDocumentById('projects', editingProject.$id, projectData)
      } else {
        await createProject(projectData)
      }
      
      await fetchProjects()
      resetForm()
    } catch (error) {
      console.error('Error saving project:', error)
      console.error('Project data being saved:', projectData)
      
      // More detailed error logging
      if (error && typeof error === 'object') {
        console.error('Error details:', {
          message: (error as any).messages,
          details: (error as any).details,
          code: (error as any).code,
          hint: (error as any).hint
        })
      }
      
      alert(`Error saving project: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    const isCustomCategory = !categories.includes(project.category)
    setFormData({
      title: project.title,
      longDescription: project.longDescription,
      detailedContent: project.detailedContent || '',
      category: isCustomCategory ? 'Other(Enter Manually)' : project.category,
      customCategory: isCustomCategory ? project.category : '',
      technologies: project.technologies.join(', '),
      features: Array.isArray(project.features) ? project.features.join('#') : (project.features || ''),
      mainPicture: null,
      liveUrl: project.liveUrl || '',
      orderIndex: (project as any).orderIndex
    })
    setImagePreview(project.mainPicture || '')
    setErrors({})
    setShowForm(true)
  }

  const handleDelete = async (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDocumentById('projects', projectId)
        await fetchProjects()
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      longDescription: '',
      detailedContent: '',
      category: '',
      customCategory: '',
      technologies: '',
      features: '',
      mainPicture: null,
      liveUrl: '',
      orderIndex: undefined
    })
    setImagePreview('')
    setEditingProject(null)
    setShowForm(false)
    setErrors({})
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, mainPicture: file })
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Removed industries toggle

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Manage Projects</h2>
            <p className="text-gray-600 text-sm mt-1">Create, edit and manage your project portfolio</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{projects.length}</div>
              <div className="text-sm text-gray-500">Total Projects</div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Plus className="h-4 w-4" />
              Add Project
            </button>
          </div>
        </div>
      </div>

      {/* Project Form */}
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
                    {editingProject ? 'Edit Project' : 'Add New Project'}
                  </h3>
                  <p className="text-blue-100 mt-1">
                    {editingProject ? 'Update project information' : 'Create a new project entry'}
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
                {/* Project Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter project title"
                    required
                  />
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value, customCategory: e.target.value === 'Other(Enter Manually)' ? prev.customCategory : '' }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {formData.category === 'Other(Enter Manually)' && (
                    <input
                      type="text"
                      value={formData.customCategory}
                      onChange={(e) => setFormData(prev => ({ ...prev, customCategory: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all mt-2"
                      placeholder="Enter custom category"
                      required
                    />
                  )}
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                </div>

                {/* Industries input removed */}

                {/* Project Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    value={formData.longDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, longDescription: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Brief description of your project"
                    required
                  />
                  {errors.longDescription && <p className="text-red-500 text-xs mt-1">{errors.longDescription}</p>}
                </div>

                {/* Detailed Content */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Detailed Content
                  </label>
                  <textarea
                    value={formData.detailedContent}
                    onChange={(e) => setFormData(prev => ({ ...prev, detailedContent: e.target.value }))}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Detailed project information, features, and technical details"
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Technologies *
                  </label>
                  <textarea
                    value={formData.technologies}
                    onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="React, Node.js, MongoDB, etc."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate technologies with commas</p>
                  {errors.technologies && <p className="text-red-500 text-xs mt-1">{errors.technologies}</p>}
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Features *
                  </label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="User authentication, Real-time updates, etc."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate features with #</p>
                  {errors.features && <p className="text-red-500 text-xs mt-1">{errors.features}</p>}
                </div>

                {/* Live URL */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Live URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="https://your-project.com"
                  />
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Image
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
                      className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center gap-2"
                    >
                      <Upload className="w-5 h-5" />
                      Upload Project Image
                    </button>
                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview('')
                            setFormData(prev => ({ ...prev, mainPicture: null }))
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Index */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Order (optional)
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={formData.orderIndex ?? ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, orderIndex: e.target.value === '' ? undefined : Number(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="1, 2, 3..."
                  />
                  <p className="text-sm text-gray-500 mt-1">Lower numbers appear first. Empty means unsorted.</p>
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
                  disabled={uploading}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
                >
                  {uploading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">All Projects</h3>
          {projects.length === 0 && (
            <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200">Add Project</button>
          )}
        </div>
        {projects.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No projects found</p>
            <p className="text-sm">Get started by adding your first project</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.$id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  {project.mainPicture ? (
                    <img
                      src={project.mainPicture}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <FileText className="h-16 w-16 text-white" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                      <span className="text-xs font-medium text-gray-700">{project.category}</span>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">{project.title}</h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{formatTextWithLineBreaks(project.longDescription)}</p>
                  
                  {/* Features pills */}
                  {project.features && project.features.length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {project.features.map((feature: string, index: number) => (
                          feature && feature.trim() && (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                            >
                              {feature.trim()}
                            </span>
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.$id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectManager 