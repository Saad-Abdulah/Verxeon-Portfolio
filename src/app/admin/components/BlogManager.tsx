'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, X, Save, Loader2, FileText, Image, Tag, Calendar, User, Eye, Upload, Hash, Type, AlignLeft, BookOpen, Globe, Clock, TrendingUp } from 'lucide-react'
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost, uploadBlogImage, getFileView } from '@/lib/appwrite'

interface BlogPost {
  $id: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  imageUrl: string
  createdAt: string
  updatedAt: string
}

interface BlogPostFormData {
  title: string
  excerpt: string
  content: string
  category: string
  tags: string
  imageUrl: string
}

const BlogManager = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    imageUrl: ''
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = [
    'Technology Trends',
    'AI & Machine Learning',
    'Web Development',
    'Cloud Computing',
    'Cybersecurity',
    'Data Science',
    'Business Insights',
    'Industry News',
    'Tutorials',
    'Case Studies'
  ]

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      setLoading(true)
      const data = await getBlogPosts()
      setBlogPosts(data as unknown as BlogPost[])
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required'
    if (!formData.content.trim()) newErrors.content = 'Content is required'
    if (!formData.category.trim()) newErrors.category = 'Category is required'
    if (!formData.tags.trim()) newErrors.tags = 'Tags are required'
    if (formData.excerpt.length > 200) newErrors.excerpt = 'Excerpt must be under 200 characters'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      setIsSubmitting(true)
      setErrors({})
      
      let imageUrl = formData.imageUrl
      
      // Upload new image if provided
      if (imageFile) {
        console.log('Uploading new image...')
        imageUrl = await uploadBlogImage(imageFile)
        console.log('Image uploaded:', imageUrl)
      }
      
      const postData = {
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        imageUrl: imageUrl
      }
      
      console.log('Collection name: blog-posts')
      
      if (editingPost) {
        console.log('Updating existing blog post...')
        await updateBlogPost(editingPost.$id, postData)
        console.log('Blog post updated successfully!')
        setSuccessMessage('Blog post updated successfully!')
      } else {
        console.log('Creating new blog post...')
        await createBlogPost(postData)
        console.log('Blog post added successfully!')
        setSuccessMessage('Blog post added successfully!')
      }
      
      console.log('Form submission completed, resetting form...')
      resetForm()
      await fetchBlogPosts()
      console.log('Blog posts refreshed')
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error saving blog post:', error)
      alert(`Error saving blog post: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSubmitting(false)
      console.log('Form submission finished')
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags.join(', '),
      imageUrl: post.imageUrl
    })
    setImageFile(null)
    setImagePreview(post.imageUrl || '')
    setErrors({})
    setShowForm(true)
  }

  const handleDelete = async (postId: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlogPost(postId)
        await fetchBlogPosts()
      } catch (error) {
        console.error('Error deleting blog post:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      imageUrl: ''
    })
    setImageFile(null)
    setImagePreview('')
    setEditingPost(null)
    setShowForm(false)
    setErrors({})
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const uploadImage = async (file: File): Promise<string> => {
    try {
      console.log('Starting image upload for blog post...')
      console.log('File details:', { name: file.name, size: file.size, type: file.type })
      
      const imageUrl = await uploadBlogImage(file)
      console.log('Image upload completed:', imageUrl)
      return imageUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Manage Blog Posts</h2>
            <p className="text-gray-600 text-sm mt-1">Create, edit and manage your blog content</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{blogPosts.length}</div>
              <div className="text-sm text-gray-500">Total Posts</div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Plus className="h-4 w-4" />
              Add Blog Post
            </button>
          </div>
        </div>
      </div>

      {/* Blog Post Form */}
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
                    {editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}
                  </h3>
                  <p className="text-blue-100 text-sm mt-1">
                    {editingPost ? 'Update your blog post content' : 'Create a new blog post for your website'}
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

            {/* Success Message */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-6 mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">{successMessage}</span>
              </motion.div>
            )}

            {/* Form Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information Section */}
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Basic Information
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">Essential details about your blog post</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Post Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter an engaging title"
                      />
                      {errors.title && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        {errors.title}
                      </p>}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      {errors.category && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        {errors.category}
                      </p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Excerpt *
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={3}
                      maxLength={200}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Brief summary of your blog post (max 200 characters)"
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 text-xs">Keep it concise and engaging</p>
                      <span className={`text-xs ${formData.excerpt.length > 180 ? 'text-red-500' : 'text-gray-400'}`}>
                        {formData.excerpt.length}/200
                      </span>
                    </div>
                    {errors.excerpt && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.excerpt}
                    </p>}
                  </div>
                </div>

                {/* Content Section */}
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Blog Content
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">Write your full blog post content</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Full Content *
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={12}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Write your full blog post content here..."
                    />
                    {errors.content && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.content}
                    </p>}
                  </div>
                </div>

                {/* Tags Section */}
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      Tags & SEO
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">Add relevant tags for better discoverability</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Tags *
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="AI, Technology, Innovation, Web Development"
                    />
                    <p className="text-gray-500 text-xs">Separate multiple tags with commas</p>
                    {errors.tags && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.tags}
                    </p>}
                  </div>
                </div>

                {/* Featured Image Section */}
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      Featured Image
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">Add an eye-catching featured image</p>
                  </div>

                  <div className="space-y-4">
                    {/* Current Image Display */}
                    {imagePreview && !imageFile && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-4">
                          <img
                            alt="current"
                            src={imagePreview}
                            className="h-20 w-32 rounded-lg object-cover ring-2 ring-blue-200"
                          />
                          <div className="flex-1">
                            <p className="text-blue-700 font-medium text-sm">Current featured image</p>
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
                            {editingPost ? 'Upload new image' : 'Drop your image here'}
                          </p>
                          <p className="text-gray-500 text-sm">or click to browse files</p>
                        </div>
                        <p className="text-gray-400 text-xs">PNG, JPG, GIF up to 5MB (16:9 ratio recommended)</p>
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
                          className="h-20 w-32 rounded-lg object-cover ring-2 ring-green-200"
                        />
                        <div className="flex-1">
                          <p className="text-green-700 font-medium text-sm">{imageFile?.name}</p>
                          <p className="text-green-600 text-xs">New image ready for upload</p>
                        </div>
                        <button
                          onClick={() => { setImageFile(null); setImagePreview(editingPost?.imageUrl || ''); }}
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

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {editingPost ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        {editingPost ? 'Update Blog Post' : 'Create Blog Post'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog Posts List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">All Blog Posts</h3>
          {blogPosts.length === 0 && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              Add First Post
            </button>
          )}
        </div>
        
        {blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No blog posts yet</h3>
            <p className="text-gray-600 mb-6">Create your first blog post to start sharing your content</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              <Plus className="h-4 w-4" />
              Add Blog Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.$id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Post Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      {post.imageUrl ? (
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="h-16 w-24 rounded-lg object-cover ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300"
                        />
                      ) : (
                        <div className="h-16 w-24 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300">
                          <FileText className="h-8 w-8 text-blue-600" />
                        </div>
                      )}
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <BookOpen className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-blue-600 text-sm font-medium">{post.category}</p>
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div className="mb-4">
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Post Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.createdAt)}
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`/blog/${post.$id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200"
                        title="View Post"
                      >
                        <Eye className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="Edit Post"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.$id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Delete Post"
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

export default BlogManager 