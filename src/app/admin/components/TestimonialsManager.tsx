"use client"

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Save, Image as ImageIcon, Loader2, Star, X, Upload, User, Quote, Award, Calendar, Edit, Eye } from 'lucide-react'
import { createTestimonial, deleteTestimonialById, getTestimonials, uploadTestimonialImage, updateDocumentById } from '@/lib/appwrite'

interface Testimonial {
  $id: string
  name: string
  role: string
  project?: string
  content: string
  imageUrl?: string
  rating?: number
  createdAt?: string
}

const StarRating = ({ value, onChange, size = 'md' }: { value: number; onChange: (n: number) => void; size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }
  
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
      {[1,2,3,4,5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-checked={value === n}
          className="p-1 hover:scale-110 transition-transform duration-200"
        >
          <Star className={`${sizeClasses[size]} ${n <= value ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300 hover:stroke-yellow-300'}`} />
        </button>
      ))}
    </div>
  )
}

const TestimonialsManager = () => {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)

  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [project, setProject] = useState('')
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(5)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { void refresh() }, [])

  const refresh = async () => {
    setLoading(true)
    try {
      const data = await getTestimonials()
      setItems(data)
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const onFile = (f?: File) => {
    if (!f) return
    if (!f.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, image: 'Please select a valid image file' }))
      return
    }
    if (f.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, image: 'Image must be under 5MB' }))
      return
    }
    setErrors(prev => ({ ...prev, image: '' }))
    setImageFile(f)
    const r = new FileReader()
    r.onload = () => setImagePreview(r.result as string)
    r.readAsDataURL(f)
  }

  const handleCreate = async () => {
    if (!validateForm()) return
    
    try {
      setSaving(true)
      let imageUrl = ''
      if (imageFile) imageUrl = await uploadTestimonialImage(imageFile)
      await createTestimonial({ name, role, project, content, imageUrl, rating })
      resetForm()
      await refresh()
    } catch (error) {
      console.error('Error creating testimonial:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleUpdate = async () => {
    if (!editingTestimonial || !validateForm()) return
    
    try {
      setSaving(true)
      let imageUrl = editingTestimonial.imageUrl || ''
      
      // Upload new image if provided
      if (imageFile) {
        imageUrl = await uploadTestimonialImage(imageFile)
      }
      
      // Update the testimonial
      await updateDocumentById('testimonials', editingTestimonial.$id, {
        name,
        role,
        project: project || undefined,
        content,
        imageUrl,
        rating
      })
      
      resetForm()
      await refresh()
    } catch (error) {
      console.error('Error updating testimonial:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setName(testimonial.name)
    setRole(testimonial.role)
    setProject(testimonial.project || '')
    setContent(testimonial.content)
    setRating(testimonial.rating || 5)
    setImageFile(null)
    setImagePreview(testimonial.imageUrl || '')
    setErrors({})
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
    await deleteTestimonialById(id)
    await refresh()
      } catch (error) {
        console.error('Error deleting testimonial:', error)
      }
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!name.trim()) newErrors.name = 'Name is required'
    if (!role.trim()) newErrors.role = 'Role is required'
    if (!content.trim()) newErrors.content = 'Quote is required'
    if (content.length > 320) newErrors.content = 'Quote must be under 320 characters'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setName('')
    setRole('')
    setProject('')
    setContent('')
    setRating(5)
    setImageFile(null)
    setImagePreview('')
    setErrors({})
    setShowForm(false)
    setEditingTestimonial(null)
  }

  const isValid = name.trim() && role.trim() && content.trim() && content.length <= 320
  const contentMax = 320

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Recently'
    try {
      return new Date(dateString).toLocaleDateString()
    } catch {
      return 'Recently'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Manage Testimonials</h2>
            <p className="text-gray-600 text-sm mt-1">Create, preview and manage client quotes displayed on your site</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{items.length}</div>
              <div className="text-sm text-gray-500">Total Testimonials</div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Plus className="h-4 w-4" />
              Add Testimonial
            </button>
          </div>
        </div>
      </div>

      {/* Testimonial Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                  </h3>
                  <p className="text-blue-100 text-sm mt-1">
                    {editingTestimonial ? 'Update the client testimonial' : 'Create a new client testimonial for your website'}
                  </p>
                </div>
                <button 
                  onClick={resetForm}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Basic Information Section */}
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Client Information
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">Basic details about the client</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Client Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Full name as it should appear"
                      />
                      <p className="text-gray-500 text-xs">Full name as it should appear on the website</p>
                      {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        {errors.name}
                      </p>}
        </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Role/Position *
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="e.g. CTO, Product Manager, CEO"
                      />
                      <p className="text-gray-500 text-xs">Client's role or position at their company</p>
                      {errors.role && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        {errors.role}
                      </p>}
        </div>
        </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Project (Optional)
                    </label>
                    <input
                      type="text"
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g. Mobile App Redesign, E-commerce Platform"
                    />
                    <p className="text-gray-500 text-xs">Project or service the testimonial is about</p>
          </div>
        </div>

                {/* Testimonial Content Section */}
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Testimonial Content
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">The client's quote and rating</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Client Quote *
                      </label>
                      <textarea
                        rows={4}
                        maxLength={contentMax}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="What did the client say about your work?"
                      />
                      <div className="flex items-center justify-between">
                        <p className="text-gray-500 text-xs">Keep it concise and specific (max {contentMax} characters)</p>
                        <span className={`text-xs ${content.length > contentMax * 0.9 ? 'text-red-500' : 'text-gray-400'}`}>
                          {content.length}/{contentMax}
                        </span>
                      </div>
                      {errors.content && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        {errors.content}
                      </p>}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Rating
                      </label>
                      <div className="flex items-center gap-4">
                        <StarRating value={rating} onChange={setRating} size="lg" />
                        <span className="text-lg font-semibold text-gray-700">{rating}/5</span>
                      </div>
                      <p className="text-gray-500 text-xs">Client's satisfaction rating</p>
                    </div>
          </div>
        </div>

                {/* Media Section */}
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      Client Photo
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">Optional client profile picture</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Upload Photo (Optional)
          </label>
                      
                      {/* Current Image Display */}
                      {imagePreview && !imageFile && (
                        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center gap-4">
                            <img
                              alt="current"
                              src={imagePreview}
                              className="h-16 w-16 rounded-full object-cover ring-2 ring-blue-200"
                            />
                            <div className="flex-1">
                              <p className="text-blue-700 font-medium text-sm">Current photo</p>
                              <p className="text-blue-600 text-xs">Upload a new image to replace this one</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Drag & Drop Area */}
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-all duration-200 cursor-pointer group"
                      >
                        <div className="space-y-4">
                          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <Upload className="h-8 w-8 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-gray-700 font-medium">
                              {editingTestimonial ? 'Upload new image' : 'Drop your image here'}
                            </p>
                            <p className="text-gray-500 text-sm">or click to browse files</p>
                          </div>
                          <p className="text-gray-400 text-xs">PNG, JPG, GIF up to 5MB (square works best)</p>
                        </div>
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => onFile(e.target.files?.[0] || undefined)}
                      />

                      {imageFile && (
                        <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                          <img
                            alt="preview"
                            src={imagePreview}
                            className="h-16 w-16 rounded-full object-cover ring-2 ring-green-200"
                          />
                          <div className="flex-1">
                            <p className="text-green-700 font-medium text-sm">{imageFile?.name}</p>
                            <p className="text-green-600 text-xs">New image ready for upload</p>
                          </div>
                          <button
                            onClick={() => { setImageFile(null); setImagePreview(editingTestimonial?.imageUrl || ''); }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}

                      {errors.image && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        {errors.image}
                      </p>}
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingTestimonial ? handleUpdate : handleCreate}
                    disabled={saving || !isValid}
                    className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {editingTestimonial ? 'Updating...' : 'Saving...'}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        {editingTestimonial ? 'Update Testimonial' : 'Save Testimonial'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonials List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">All Testimonials</h3>
          {items.length === 0 && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              Add First Testimonial
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <Quote className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No testimonials yet</h3>
            <p className="text-gray-600 mb-6">Create your first client testimonial to showcase your work</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              <Plus className="h-4 w-4" />
              Add Testimonial
          </button>
        </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((testimonial, index) => (
              <motion.div
                key={testimonial.$id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Testimonial Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      {testimonial.imageUrl ? (
                        <img
                          src={testimonial.imageUrl}
                          alt={testimonial.name}
                          className="h-16 w-16 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300"
                        />
                ) : (
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300">
                          <User className="h-8 w-8 text-blue-600" />
                        </div>
                )}
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Star className="h-3 w-3 text-white fill-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {testimonial.name}
                      </h4>
                      <p className="text-blue-600 text-sm font-medium">{testimonial.role}</p>
                      {testimonial.project && (
                        <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full mt-1">
                          {testimonial.project}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <StarRating value={testimonial.rating || 0} onChange={() => {}} size="sm" />
                    <span className="text-sm font-semibold text-gray-700">{testimonial.rating || 0}/5</span>
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-6 w-6 text-blue-200" />
                    <p className="text-gray-700 text-sm leading-relaxed pl-4 italic">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>

                {/* Testimonial Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {formatDate(testimonial.createdAt)}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(testimonial)}
                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="Edit testimonial"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.$id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Delete testimonial"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                </div>
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

export default TestimonialsManager 