import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Supabase configuration - provide fallbacks for build time to avoid crashing during imports
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Only warn at runtime in the browser if envs are actually missing
const isBrowser = typeof window !== 'undefined'
if (isBrowser && (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
  // eslint-disable-next-line no-console
  console.warn('Supabase env vars are missing. Some features may not work until configured.')
}

// Global singleton instances to prevent multiple client creation
declare global {
  // Use globalThis to avoid multiple instances during HMR and across modules
  // eslint-disable-next-line no-var
  var __supabaseClient: SupabaseClient | undefined
  // eslint-disable-next-line no-var
  var __supabaseAdminClient: SupabaseClient | undefined
}

// Create Supabase client for client-side operations (global singleton)
export const supabase = (() => {
  if (typeof window === 'undefined') {
    // Server-side: create new instance
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  }
  
  // Client-side: use global singleton
  const g = globalThis as any
  if (!g.__supabaseClient) {
    g.__supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  }
  return g.__supabaseClient
})()

// Create a simple admin client that uses the same anon key (global singleton)
// NOTE: In production APIs, prefer using the service role key on the server only
export const supabaseAdmin = (() => {
  if (typeof window === 'undefined') {
    // Server-side: create new instance
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  }
  
  // Client-side: use global singleton
  const g = globalThis as any
  if (!g.__supabaseAdminClient) {
    g.__supabaseAdminClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  }
  return g.__supabaseAdminClient
})()

// Collection names (Supabase tables)
export const COLLECTIONS = {
  PROJECTS: 'projects',
  SERVICES: 'services',
  TEAM_MEMBERS: 'team_members',
  BLOG_POSTS: 'blog_posts',
  CONTACT_SUBMISSIONS: 'contact_submissions',
  USERS: 'users',
  TESTIMONIALS: 'testimonials'
} as const

// Storage buckets configuration
export const BUCKETS = {
  ALL_IMAGES: 'images'
}

// Company information
export const COMPANY_INFO = {
  NAME: 'Devsol',
  EMAIL: 'hello@devsol.com',
  PHONE: '+1 (555) 123-4567',
  ADDRESS: '123 Innovation Drive, Tech City, TC 12345'
}

// Admin dashboard configuration
export const ADMIN_CONFIG = {
  TITLE: 'Devsol Admin',
  DESCRIPTION: 'Manage your website content, projects, team, and services',
  EMAIL: 'admin@devsol.com'
}

// Feature flags
export const FEATURES = {
  ADMIN_DASHBOARD: process.env.NEXT_PUBLIC_ENABLE_ADMIN_DASHBOARD === 'true',
  FILE_UPLOADS: process.env.NEXT_PUBLIC_ENABLE_FILE_UPLOADS === 'true',
  ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  MAINTENANCE_MODE: process.env.NEXT_PUBLIC_ENABLE_MAINTENANCE_MODE === 'true'
}

// Security and performance settings
export const SECURITY_CONFIG = {
  SESSION_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_SESSION_TIMEOUT || '60') * 60 * 1000,
  MAX_FILE_SIZE: parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '10') * 1024 * 1024,
  RATE_LIMIT: parseInt(process.env.NEXT_PUBLIC_RATE_LIMIT || '100')
}

// Development settings
export const DEV_CONFIG = {
  DEBUG_MODE: process.env.NEXT_PUBLIC_DEBUG_MODE === 'true',
  LOG_API_RESPONSES: process.env.NEXT_PUBLIC_LOG_API_RESPONSES === 'true'
}

// Type definitions for better type safety
interface DocumentData {
  [key: string]: unknown
}

interface User {
  id: string
  labels?: string[]
  [key: string]: unknown
}

// Helper function for timestamp
const getTimestamp = () => {
  return new Date().toISOString()
}

// Field mapping functions to convert between camelCase and snake_case
const toSnakeCase = (obj: any): any => {
  if (obj === null || obj === undefined) return obj
  if (Array.isArray(obj)) return obj.map(toSnakeCase)
  if (typeof obj !== 'object') return obj
  
  const result: any = {}
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
    result[snakeKey] = toSnakeCase(value)
  }
  return result
}

const toCamelCase = (obj: any): any => {
  if (obj === null || obj === undefined) return obj
  if (Array.isArray(obj)) return obj.map(toCamelCase)
  if (typeof obj !== 'object') return obj
  
  const result: any = {}
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
    result[camelKey] = toCamelCase(value)
  }
  return result
}

// Helper function to get file download URL from Supabase Storage
export const getFileDownloadURL = async (filePath: string): Promise<string> => {
  try {
    const { data } = await supabase.storage
      .from(BUCKETS.ALL_IMAGES)
      .createSignedUrl(filePath, 3600) // 1 hour expiry
    
    return data?.signedUrl || ''
  } catch (error) {
    console.error('Error getting file download URL:', error)
    return ''
  }
}

// Legacy compatibility - keeping the same function names as Appwrite
export const getFileView = async (filePath: string): Promise<string> => {
  return getFileDownloadURL(filePath)
}

// Helper function to get all documents from a table
export const getAllDocuments = async (tableName: string) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
    
    if (error) throw error
    
    return data?.map((item: any) => {
      const camelCaseItem = toCamelCase(item)
      return {
        $id: camelCaseItem.id,
        ...camelCaseItem
      }
    }) || []
  } catch (error) {
    console.error(`Error getting documents from ${tableName}:`, error)
    return []
  }
}

// Helper function to get a single document by ID
export const getDocumentById = async (tableName: string, docId: string) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', docId)
      .single()
    
    if (error) throw error
    
    const camelCaseData = toCamelCase(data)
    return {
      $id: camelCaseData.id,
      ...camelCaseData
    }
  } catch (error) {
    console.error(`Error getting document ${docId} from ${tableName}:`, error)
    return null
  }
}

// Helper function to add a new document
export const addDocument = async (tableName: string, data: any) => {
  try {
    const snakeCaseData = toSnakeCase(data)
    const { data: result, error } = await supabase
      .from(tableName)
      .insert({
        ...snakeCaseData,
        created_at: getTimestamp(),
        updated_at: getTimestamp()
      })
      .select()
      .single()
    
    if (error) throw error
    
    return result.id
  } catch (error) {
    console.error(`Error adding document to ${tableName}:`, error)
    throw error
  }
}

// Helper function to update a document
export const updateDocument = async (tableName: string, docId: string, data: any) => {
  try {
    const snakeCaseData = toSnakeCase(data)
    const { error } = await supabase
      .from(tableName)
      .update({
        ...snakeCaseData,
        updated_at: getTimestamp()
      })
      .eq('id', docId)
    
    if (error) throw error
    
    return true
  } catch (error) {
    console.error(`Error updating document ${docId} in ${tableName}:`, error)
    throw error
  }
}

// Helper function to delete a document
export const deleteDocument = async (tableName: string, docId: string) => {
  try {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', docId)
    
    if (error) throw error
    
    return true
  } catch (error) {
    console.error(`Error deleting document ${docId} from ${tableName}:`, error)
    throw error
  }
}

// Project management functions
export const createProject = async (data: {
  title: string
  longDescription: string
  category: string
  technologies: string[]
  features: string[]
  mainPicture: string
  liveUrl?: string
  // relationship fields (any of these may be provided)
  industries?: string[] // array of industry names
  industry?: string // legacy single name
  services?: string[] // array of industry ids
}) => {
  try {
    console.log('createProject - Input data:', data)
    
    const snakeCaseData = toSnakeCase(data)
    console.log('createProject - Snake case data:', snakeCaseData)
    
    const insertData = {
      ...snakeCaseData,
      created_at: getTimestamp(),
      updated_at: getTimestamp()
    }
    console.log('createProject - Final insert data:', insertData)
    
    const { data: result, error } = await supabase
      .from(COLLECTIONS.PROJECTS)
      .insert(insertData)
      .select()
      .single()
    
    if (error) {
      console.error('Supabase createProject error:', error)
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        code: error.code,
        hint: error.hint
      })
      throw error
    }
    
    console.log('createProject - Success:', result)
    return { $id: result.id }
  } catch (error) {
    console.error('Error creating project:', error)
    throw error
  }
}

export const createTeamMember = async (data: {
  name: string
  role: string
  longBio: string
  expertise: string[]
  experience: string
  linkedin?: string
  github?: string
  email: string
  profilePic: string
}) => {
  try {
    const snakeCaseData = toSnakeCase(data)
    const { data: result, error } = await supabase
      .from(COLLECTIONS.TEAM_MEMBERS)
      .insert({
        ...snakeCaseData,
        created_at: getTimestamp(),
        updated_at: getTimestamp()
      })
      .select()
      .single()
    
    if (error) throw error
    
    return { $id: result.id }
  } catch (error) {
    console.error('Error creating team member:', error)
    throw error
  }
}

export const createBlogPost = async (data: {
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  imageUrl: string
}) => {
  try {
    const snakeCaseData = toSnakeCase(data)
    const { data: result, error } = await supabase
      .from(COLLECTIONS.BLOG_POSTS)
      .insert({
        ...snakeCaseData,
        created_at: getTimestamp(),
        updated_at: getTimestamp()
      })
      .select()
      .single()
    
    if (error) throw error
    
    return { $id: result.id }
  } catch (error) {
    console.error('Error creating blog post:', error)
    throw error
  }
}

export const updateBlogPost = async (blogId: string, data: {
  title?: string
  excerpt?: string
  content?: string
  category?: string
  tags?: string[]
  imageUrl?: string
}) => {
  try {
    const snakeCaseData = toSnakeCase(data)
    const { error } = await supabase
      .from(COLLECTIONS.BLOG_POSTS)
      .update({
        ...snakeCaseData,
        updated_at: getTimestamp()
      })
      .eq('id', blogId)
    
    if (error) throw error
    
    return { $id: blogId }
  } catch (error) {
    console.error('Error updating blog post:', error)
    throw error
  }
}

export const deleteBlogPost = async (blogId: string) => {
  try {
    const { error } = await supabase
      .from(COLLECTIONS.BLOG_POSTS)
      .delete()
      .eq('id', blogId)
    
    if (error) throw error
    
    return { $id: blogId }
  } catch (error) {
    console.error('Error deleting blog post:', error)
    throw error
  }
}

export const createService = async (data: {
  name: string
  longDescription: string
}) => {
  try {
    const snakeCaseData = toSnakeCase(data)
    const { data: result, error } = await supabase
      .from(COLLECTIONS.SERVICES)
      .insert({
        ...snakeCaseData,
        created_at: getTimestamp(),
        updated_at: getTimestamp()
      })
      .select()
      .single()
    
    if (error) throw error
    
    return { $id: result.id }
  } catch (error) {
    console.error('Error creating service:', error)
    throw error
  }
}

export const createContactSubmission = async (data: {
  name: string
  email: string
  company?: string
  subject: string
  message: string
}) => {
  try {
    const { data: result, error } = await supabase
      .from(COLLECTIONS.CONTACT_SUBMISSIONS)
      .insert({
        ...data,
        timestamp: getTimestamp(),
        status: 'new'
      })
      .select()
      .single()
    
    if (error) throw error
    
    return { $id: result.id }
  } catch (error) {
    console.error('Error creating contact submission:', error)
    throw error
  }
}

// Data retrieval functions
export const getProjects = async (limitCount?: number) => {
  try {
    let query = supabase
      .from(COLLECTIONS.PROJECTS)
      .select('*')
      // Order by explicit order_index first (ascending), then by created_at (newest)
      .order('order_index', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false })
    
    if (limitCount) {
      query = query.limit(limitCount)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    
    return data?.map((item: any) => {
      const camelCaseItem = toCamelCase(item)
      return {
        $id: camelCaseItem.id,
        ...camelCaseItem
      }
    }) || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export const getTeamMembers = async (limitCount?: number) => {
  try {
    let query = supabase
      .from(COLLECTIONS.TEAM_MEMBERS)
      .select('*')
      .order('created_at', { ascending: false })
    
    if (limitCount) {
      query = query.limit(limitCount)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    
    return data?.map((item: any) => {
      const camelCaseItem = toCamelCase(item)
      return {
        $id: camelCaseItem.id,
        ...camelCaseItem
      }
    }) || []
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

export const getBlogPosts = async (limitCount?: number) => {
  try {
    let query = supabase
      .from(COLLECTIONS.BLOG_POSTS)
      .select('*')
      .order('created_at', { ascending: false })
    
    if (limitCount) {
      query = query.limit(limitCount)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    
    return data?.map((item: any) => {
      const camelCaseItem = toCamelCase(item)
      return {
        $id: camelCaseItem.id,
        ...camelCaseItem
      }
    }) || []
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export const getIndustries = async (limitCount?: number) => {
  try {
    let query = supabase
      .from(COLLECTIONS.SERVICES)
      .select('*')
      .order('order', { ascending: true })
      .order('created_at', { ascending: false })
    
    if (limitCount) {
      query = query.limit(limitCount)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    
    return data?.map((item: any) => {
      const camelCaseItem = toCamelCase(item)
      const normalizedOrder = (camelCaseItem.order ?? camelCaseItem.orderIndex ?? 0) as number
      return {
        $id: camelCaseItem.id,
        ...camelCaseItem,
        order: normalizedOrder
      }
    }) || []
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

export const getIndustriesWithProjects = async (limitCount?: number) => {
  try {
    const services = await getIndustries(limitCount)
    
    // For each industry, fetch related projects using multiple matching strategies
    const industriesWithProjects = await Promise.all(
      services.map(async (industry: any) => {
        try {
          // Use category field instead of industry field
          const { data: byCategory, error: categoryError } = await supabase
            .from(COLLECTIONS.PROJECTS)
            .select('*')
            .eq('category', industry.name)
          if (categoryError) throw categoryError

          // Optional: if services array exists, try contains; ignore errors
          let byService: any[] = []
          try {
            const res = await supabase
              .from(COLLECTIONS.PROJECTS)
              .select('*')
              .contains('services', [industry.$id])
            byService = res.data || []
          } catch {}

          // Optional: if industries array exists, try contains; ignore errors
          let byIndustryNames: any[] = []
          try {
            const res2 = await supabase
              .from(COLLECTIONS.PROJECTS)
              .select('*')
              .contains('industries', [industry.name])
            byIndustryNames = res2.data || []
          } catch {}

          // Merge unique projects
          const combined = [...(byService || []), ...(byIndustryNames || []), ...(byCategory || [])]
          const uniqueById: Record<string, any> = {}
          for (const item of combined) {
            uniqueById[item.id || item.$id || item.uuid || JSON.stringify(item)] = item
          }

          const relatedProjects = Object.values(uniqueById).map((item: any) => {
            const camelCaseItem = toCamelCase(item)
            return {
              $id: camelCaseItem.id,
              ...camelCaseItem
            }
          })

          return {
            ...industry,
            projects: relatedProjects, // alias for consumers expecting 'projects'
            relatedProjects
          }
        } catch (error) {
          console.error(`Error fetching projects for industry ${industry.$id}:`, error)
          return {
            ...industry,
            projects: [],
            relatedProjects: []
          }
        }
      })
    )
    
    return industriesWithProjects
  } catch (error) {
    console.error('Error fetching industries with projects:', error)
    return []
  }
}

export const getContactSubmissions = async (limitCount?: number) => {
  try {
    let query = supabase
      .from(COLLECTIONS.CONTACT_SUBMISSIONS)
      .select('*')
      .order('timestamp', { ascending: false })
    
    if (limitCount) {
      query = query.limit(limitCount)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    
    return data?.map((item: any) => {
      const camelCaseItem = toCamelCase(item)
      return {
        $id: camelCaseItem.id,
        ...camelCaseItem
      }
    }) || []
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    return []
  }
}

// Get dashboard statistics
export const getDashboardStats = async () => {
  try {
    const [projects, team, blogs, contacts, services] = await Promise.all([
      getProjects(),
      getTeamMembers(),
      getBlogPosts(),
      getContactSubmissions(),
      getIndustries()
    ])

    return {
      projects: projects.length,
      team: team.length,
      blogs: blogs.length,
      contacts: contacts.length,
      services: services.length
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return {
      projects: 0,
      team: 0,
      blogs: 0,
      contacts: 0,
      services: 0
    }
  }
}

// Activity interface for type safety
interface Activity {
  type: 'project' | 'team' | 'blog' | 'contact'
  action: 'added' | 'updated' | 'published' | 'received'
  title: string
  timestamp: string
  id: string
}

// Get recent activity
export const getRecentActivity = async (limitCount = 5): Promise<Activity[]> => {
  try {
    const [projects, team, blogs, contacts] = await Promise.all([
      getProjects(limitCount),
      getTeamMembers(limitCount),
      getBlogPosts(limitCount),
      getContactSubmissions(limitCount)
    ])

    const activities: Activity[] = []

    // Add recent projects
    projects.slice(0, 3).forEach((project: any) => {
      activities.push({
        type: 'project',
        action: 'added',
        title: project.title,
        timestamp: project.createdAt,
        id: project.$id
      })
    })

    // Add recent team members
    team.slice(0, 2).forEach((member: any) => {
      activities.push({
        type: 'team',
        action: 'added',
        title: member.name,
        timestamp: member.createdAt,
        id: member.$id
      })
    })

    // Add recent blog posts
    blogs.slice(0, 2).forEach((blog: any) => {
      activities.push({
        type: 'blog',
        action: 'published',
        title: blog.title,
        timestamp: blog.createdAt,
        id: blog.$id
      })
    })

    // Add recent contact submissions
    contacts.slice(0, 2).forEach((contact: any) => {
      activities.push({
        type: 'contact',
        action: 'received',
        title: `${contact.name} - ${contact.subject}`,
        timestamp: contact.timestamp,
        id: contact.$id
      })
    })

    // Sort by timestamp and return limited results
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limitCount)
  } catch (error) {
    console.error('Error fetching recent activity:', error)
    return []
  }
}

// CRUD operations
export const updateDocumentById = async (tableName: string, documentId: string, data: DocumentData) => {
  try {
    const snakeCaseData = toSnakeCase(data)
    console.log('updateDocumentById - tableName:', tableName)
    console.log('updateDocumentById - documentId:', documentId)
    console.log('updateDocumentById - original data:', data)
    console.log('updateDocumentById - snakeCaseData:', snakeCaseData)
    
    const { error } = await supabase
      .from(tableName)
      .update({
        ...snakeCaseData,
        updated_at: getTimestamp()
      })
      .eq('id', documentId)
    
    if (error) {
      console.error('Supabase update error:', error)
      throw error
    }
    
    console.log('updateDocumentById - success')
    return { $id: documentId }
  } catch (error) {
    console.error('Error updating document:', error)
    throw error
  }
}


export const updateContactSubmission = async (documentId: string, data: DocumentData) => {
  try {
    const snakeCaseData = toSnakeCase(data)
    const { error } = await supabase
      .from('contact_submissions')
      .update(snakeCaseData) // No updated_at for contact_submissions
      .eq('id', documentId)
    
    if (error) throw error
    
    return { $id: documentId }
  } catch (error) {
    console.error('Error updating contact submission:', error)
    throw error
  }
}
export const deleteDocumentById = async (tableName: string, documentId: string) => {
  try {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', documentId)
    
    if (error) throw error
    
    return { $id: documentId }
  } catch (error) {
    console.error('Error deleting document:', error)
    throw error
  }
}

export const getDocument = async (tableName: string, documentId: string) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', documentId)
      .single()
    
    if (error) throw error
    
    const camelCaseData = toCamelCase(data)
    return {
      $id: camelCaseData.id,
      ...camelCaseData
    }
  } catch (error) {
    console.error('Error fetching document:', error)
    throw error
  }
}

// Helper function to sanitize filename
const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace special characters with underscore
    .replace(/_+/g, '_') // Replace multiple underscores with single
    .replace(/^_|_$/g, '') // Remove leading/trailing underscores
    .toLowerCase()
}

// Image upload functions
export const uploadProjectImage = async (file: File): Promise<string> => {
  try {
    console.log('Starting project image upload...')
    console.log('File details:', { name: file.name, size: file.size, type: file.type })
    
    const sanitizedName = sanitizeFilename(file.name)
    const filename = `project_${Date.now()}_${sanitizedName}`
    const filePath = `projects/${filename}`
    
    console.log('Generated filename:', filename)
    console.log('File path:', filePath)
    
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKETS.ALL_IMAGES)
      .upload(filePath, file)
    
    if (error) throw error
    
    console.log('File upload successful:', data)
    
    // Get public URL
    const { data: urlData } = await supabase.storage
      .from(BUCKETS.ALL_IMAGES)
      .getPublicUrl(filePath)
    
    return urlData.publicUrl
  } catch (error) {
    console.error('Error uploading project image:', error)
    throw error
  }
}

export const uploadTeamPhoto = async (file: File): Promise<string> => {
  try {
    const sanitizedName = sanitizeFilename(file.name)
    const filename = `team_${Date.now()}_${sanitizedName}`
    const filePath = `team/${filename}`
    
    const { data, error } = await supabase.storage
      .from(BUCKETS.ALL_IMAGES)
      .upload(filePath, file)
    
    if (error) throw error
    const { data: urlData } = await supabase.storage
      .from(BUCKETS.ALL_IMAGES)
      .getPublicUrl(filePath)
    return urlData.publicUrl
  } catch (error) {
    console.error('Error uploading team photo:', error)
    throw error
  }
}

export const uploadTestimonialImage = async (file: File): Promise<string> => {
  try {
    const sanitizedName = sanitizeFilename(file.name)
    const filename = `testimonial_${Date.now()}_${sanitizedName}`
    const filePath = `testimonials/${filename}`
    const { error } = await supabase.storage
      .from(BUCKETS.ALL_IMAGES)
      .upload(filePath, file)
    if (error) throw error
    const { data: urlData } = await supabase.storage
      .from(BUCKETS.ALL_IMAGES)
      .getPublicUrl(filePath)
    return urlData.publicUrl
  } catch (error) {
    console.error('Error uploading testimonial image:', error)
    throw error
  }
}

export const uploadBlogImage = async (file: File): Promise<string> => {
  try {
    const sanitizedName = sanitizeFilename(file.name)
    const filename = `blog_${Date.now()}_${sanitizedName}`
    const filePath = `blog/${filename}`
    
    const { data, error } = await supabase.storage
      .from(BUCKETS.ALL_IMAGES)
      .upload(filePath, file)
    
    if (error) throw error
    
    const { data: urlData } = await supabase.storage
      .from(BUCKETS.ALL_IMAGES)
      .getPublicUrl(filePath)
    
    return urlData.publicUrl
  } catch (error) {
    console.error('Error uploading blog image:', error)
    throw error
  }
}

export const deleteProjectImage = async (filePath: string): Promise<void> => {
  try {
    const { error } = await supabase.storage
      .from(BUCKETS.ALL_IMAGES)
      .remove([filePath])
    
    if (error) throw error
  } catch (error) {
    console.error('Error deleting project image:', error)
    // Don't throw error here as it's not critical for project deletion
  }
}

export const deleteTeamPhoto = async (filePath: string): Promise<void> => {
  try {
    const { error } = await supabase.storage
      .from(BUCKETS.ALL_IMAGES)
      .remove([filePath])
    
    if (error) throw error
  } catch (error) {
    console.error('Error deleting team photo:', error)
    throw error
  }
}

export const deleteBlogImage = async (filePath: string): Promise<void> => {
  try {
    const { error } = await supabase.storage
      .from(BUCKETS.ALL_IMAGES)
      .remove([filePath])
    
    if (error) throw error
  } catch (error) {
    console.error('Error deleting blog image:', error)
    throw error
  }
}

export const getTestimonials = async (): Promise<any[]> => {
  const { data, error } = await supabase
    .from(COLLECTIONS.TESTIMONIALS)
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data || []).map((row: any) => ({ $id: row.id, ...toCamelCase(row) }))
}

export const createTestimonial = async (payload: {
  name: string
  role: string
  project?: string
  content: string
  imageUrl?: string
  rating?: number
}): Promise<any> => {
  const { data, error } = await supabase
    .from(COLLECTIONS.TESTIMONIALS)
    .insert([{ ...toSnakeCase(payload) }])
    .select('*')
    .single()
  if (error) throw error
  const row = toCamelCase(data)
  return { $id: row.id, ...row }
}

export const deleteTestimonialById = async (id: string) => {
  const { error } = await supabase
    .from(COLLECTIONS.TESTIMONIALS)
    .delete()
    .eq('id', id)
  if (error) throw error
}

export const updateTestimonialById = async (id: string, updates: Partial<{ name: string; role: string; project?: string; content: string; imageUrl?: string; rating?: number }>) => {
  const { data, error } = await supabase
    .from(COLLECTIONS.TESTIMONIALS)
    .update({ ...toSnakeCase(updates) })
    .eq('id', id)
    .select('*')
    .single()
  if (error) throw error
  const row = toCamelCase(data)
  return { $id: row.id, ...row }
}

// Legacy compatibility exports
export const databases = {
  createDocument: addDocument,
  updateDocument: updateDocumentById,
  deleteDocument: deleteDocumentById,
  getDocument: getDocument,
  listDocuments: getAllDocuments
}

export const account = {
  get: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },
  createOAuth2Session: async (provider: string) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as any,
      options: {
        redirectTo: `${window.location.origin}/admin/auth/callback`
      }
    })
    if (error) throw error
    return data
  },
  deleteSession: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },
  listSessions: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session ? [session] : []
  }
}

export default supabase

// Industry management functions
export const createIndustry = async (data: {
  name: string
  description: string
  longDescription: string
  icon: string
  imageUrl?: string
  features: string[]
  technologies: string[]
  order: number
  isActive: boolean
}) => {
  try {
    const snakeCaseData = toSnakeCase(data)
    const { data: result, error } = await supabase
      .from(COLLECTIONS.SERVICES)
      .insert({
        ...snakeCaseData,
        created_at: getTimestamp(),
        updated_at: getTimestamp()
      })
      .select()
      .single()
    
    if (error) throw error
    
    return { $id: result.id }
  } catch (error) {
    console.error('Error creating industry:', error)
    throw error
  }
}

export const uploadIndustryImage = async (file: File) => {
  try {
    const sanitizedName = sanitizeFilename(file.name)
    const fileExt = sanitizedName.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `industries/${fileName}`
    
    const { data, error } = await supabase.storage
      .from(BUCKETS.ALL_IMAGES)
      .upload(filePath, file)
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKETS.ALL_IMAGES)
      .getPublicUrl(filePath)
    
    return publicUrl
  } catch (error) {
    console.error('Error uploading industry image:', error)
    throw error
  }
}
