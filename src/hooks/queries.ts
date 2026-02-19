'use client'

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import {
  getProjects,
  getTeamMembers,
  getBlogPosts,
  getIndustries,
  getIndustriesWithProjects,
  getTestimonials,
  supabase
} from '@/lib/appwrite'

// Projects
export function useProjectsQuery(limit?: number, options?: UseQueryOptions<any[], Error>) {
  return useQuery<any[], Error>({
    queryKey: ['projects', limit ?? 'all'],
    queryFn: () => getProjects(limit),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    ...options,
  })
}

// Team
export function useTeamQuery(limit?: number, options?: UseQueryOptions<any[], Error>) {
  return useQuery<any[], Error>({
    queryKey: ['team', limit ?? 'all'],
    queryFn: () => getTeamMembers(limit),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    ...options,
  })
}

// Blogs
export function useBlogsQuery(limit?: number, options?: UseQueryOptions<any[], Error>) {
  return useQuery<any[], Error>({
    queryKey: ['blogs', limit ?? 'all'],
    queryFn: () => getBlogPosts(limit),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    ...options,
  })
}

// Industries
export function useIndustriesQuery(limit?: number, options?: UseQueryOptions<any[], Error>) {
  return useQuery<any[], Error>({
    queryKey: ['industries', limit ?? 'all'],
    queryFn: () => getIndustries(limit),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    ...options,
  })
}

export function useIndustriesWithProjectsQuery(limit?: number, options?: UseQueryOptions<any[], Error>) {
  return useQuery<any[], Error>({
    queryKey: ['industries-with-projects', limit ?? 'all'],
    queryFn: () => getIndustriesWithProjects(limit),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    ...options,
  })
}

// Testimonials
export function useTestimonialsQuery(options?: UseQueryOptions<any[], Error>) {
  return useQuery<any[], Error>({
    queryKey: ['testimonials'],
    queryFn: getTestimonials,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    ...options,
  })
}

// Auth user (admin)
export function useAuthUserQuery(options?: UseQueryOptions<any | null, Error>) {
  return useQuery<any | null, Error>({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) throw error
      return data.user
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    ...options,
  })
}


