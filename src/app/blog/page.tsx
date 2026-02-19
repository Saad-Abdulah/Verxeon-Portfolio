'use client'

import Footer from '@/components/shared/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, ArrowRight, Tag, Brain, Globe, Shield, Database, TrendingUp, Code, BookOpen, Briefcase, Search, FileText } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getFileView } from '@/lib/appwrite'
import Link from 'next/link'

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

interface DefaultBlogPost {
  $id: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: string
  readTime: number
  publishDate: string
  icon: any
  color: string
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  // Fetch blog posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true)
        // For now, using mock data since we don't have a blogs collection
        const mockBlogPosts: BlogPost[] = [
          {
            $id: '1',
            title: 'Getting Started with AI Development',
            content: 'Learn the basics of AI development and how to integrate it into your projects...',
            excerpt: 'A comprehensive guide to AI development for beginners.',
            category: 'AI/ML',
            tags: ['AI', 'Machine Learning', 'Development'],
            imageUrl: '/ceo-photo.jpg',
            createdAt: '2024-01-15T10:00:00Z',
            updatedAt: '2024-01-15T10:00:00Z'
          },
          {
            $id: '2',
            title: 'Web Development Best Practices',
            content: 'Essential best practices for modern web development...',
            excerpt: 'Key practices every web developer should know.',
            category: 'Web Development',
            tags: ['Web Development', 'Best Practices', 'Frontend'],
            imageUrl: '/ceo-photo.jpg',
            createdAt: '2024-01-10T10:00:00Z',
            updatedAt: '2024-01-10T10:00:00Z'
          }
        ]
        setBlogPosts(mockBlogPosts)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
        setBlogPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  // Load image URLs for blog posts
  useEffect(() => {
    if (blogPosts && blogPosts.length > 0) {
      const loadImageUrls = async () => {
        const urls: Record<string, string> = {}
        for (const post of blogPosts) {
          if (post.imageUrl) {
            try {
              const url = await getFileView(post.imageUrl)
              urls[post.$id] = url
            } catch (error) {
              console.error(`Failed to load image for post ${post.$id}:`, error)
            }
          }
        }
        setImageUrls(urls)
      }
      loadImageUrls()
    }
  }, [blogPosts])

  const categories = [
    'All',
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

  // Realistic default blog posts with your color scheme
  const defaultBlogPosts: DefaultBlogPost[] = [
    {
      $id: 'ai-revolution-2024',
      title: 'The AI Revolution: How Machine Learning is Transforming Business in 2024',
      excerpt: 'Discover how artificial intelligence and machine learning are reshaping industries, from healthcare to finance, and learn what this means for your business strategy.',
      content: 'Artificial intelligence has evolved from a futuristic concept to a practical business tool that\'s transforming industries worldwide...',
      category: 'AI & Machine Learning',
      tags: ['AI', 'Machine Learning', 'Business Transformation', 'Technology Trends'],
      author: 'Sarah Chen',
      readTime: 8,
      publishDate: '2024-01-15',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      icon: Brain,
      color: 'from-dark to-medium'
    },
    {
      $id: 'cloud-migration-guide',
      title: 'Complete Guide to Cloud Migration: Best Practices for Enterprise Success',
      excerpt: 'Learn the essential strategies and best practices for successfully migrating your enterprise applications to the cloud while minimizing downtime and risks.',
      content: 'Cloud migration has become a critical strategic initiative for enterprises looking to modernize their infrastructure...',
      category: 'Cloud Computing',
      tags: ['Cloud Migration', 'AWS', 'Azure', 'DevOps', 'Enterprise'],
      author: 'Michael Rodriguez',
      readTime: 12,
      publishDate: '2024-01-10',
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-10T10:00:00Z',
      icon: Globe,
      color: 'from-medium to-light'
    },
    {
      $id: 'cybersecurity-2024',
      title: 'Cybersecurity Trends 2024: Protecting Your Digital Assets in an Evolving Threat Landscape',
      excerpt: 'Explore the latest cybersecurity threats, emerging defense strategies, and how to protect your organization from sophisticated cyber attacks.',
      content: 'As technology advances, so do the sophistication and frequency of cyber threats. Organizations must stay ahead...',
      category: 'Cybersecurity',
      tags: ['Cybersecurity', 'Threat Detection', 'Zero Trust', 'Compliance'],
      author: 'Emma Wilson',
      readTime: 10,
      publishDate: '2024-01-08',
      createdAt: '2024-01-08T10:00:00Z',
      updatedAt: '2024-01-08T10:00:00Z',
      icon: Shield,
      color: 'from-medium to-dark'
    },
    {
      $id: 'web-development-trends',
      title: 'Web Development Trends 2024: What\'s Next for Modern Web Applications',
      excerpt: 'From progressive web apps to serverless architecture, discover the technologies and methodologies shaping the future of web development.',
      content: 'The web development landscape is constantly evolving, with new frameworks, tools, and methodologies emerging...',
      category: 'Web Development',
      tags: ['Web Development', 'React', 'Next.js', 'PWA', 'Serverless'],
      author: 'Saad Abdullah',
      readTime: 7,
      publishDate: '2024-01-05',
      createdAt: '2024-01-05T10:00:00Z',
      updatedAt: '2024-01-05T10:00:00Z',
      icon: Code,
      color: 'from-light to-medium'
    },
    {
      $id: 'data-science-business',
      title: 'Data Science in Business: Turning Big Data into Actionable Insights',
      excerpt: 'Learn how leading companies are leveraging data science to drive decision-making, optimize operations, and gain competitive advantages.',
      content: 'In today\'s data-driven world, organizations that can effectively analyze and interpret their data have a significant advantage...',
      category: 'Data Science',
      tags: ['Data Science', 'Analytics', 'Business Intelligence', 'Machine Learning'],
      author: 'Amir Shahzad',
      readTime: 9,
      publishDate: '2024-01-03',
      createdAt: '2024-01-03T10:00:00Z',
      updatedAt: '2024-01-03T10:00:00Z',
      icon: Database,
      color: 'from-dark to-medium'
    },
    {
      $id: 'digital-transformation-case-study',
      title: 'Digital Transformation Success Story: How We Helped a Fortune 500 Company Scale',
      excerpt: 'A detailed case study showcasing how DevSol helped a major corporation achieve 300% performance improvement through digital transformation.',
      content: 'Digital transformation is more than just implementing new technology—it\'s about fundamentally changing how a business operates...',
      category: 'Case Studies',
      tags: ['Digital Transformation', 'Case Study', 'Enterprise', 'Performance'],
      author: 'Nauman Ahmed',
      readTime: 15,
      publishDate: '2023-12-28',
      createdAt: '2023-12-28T10:00:00Z',
      updatedAt: '2023-12-28T10:00:00Z',
      icon: Briefcase,
      color: 'from-medium to-light'
    }
  ]

  // Use default blog posts if none are loaded from database
  const displayPosts = blogPosts.length > 0 ? blogPosts : defaultBlogPosts

  const filteredPosts = selectedCategory === 'All' 
    ? displayPosts 
    : displayPosts.filter(post => post.category === selectedCategory)

  return (
    <>
      
      <main className="min-h-screen bg-page-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-screen flex items-center py-24 bg-page-background">
          {/* Background Elements */}
          <div className="absolute inset-0 animated-bg opacity-15"></div>
          <div className="absolute -top-10 -left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-[28rem] h-[28rem] bg-secondary/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-extrabold tracking-tight text-card-primary mb-4"
            >
              Our Blog
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-xl text-card-secondary max-w-4xl mx-auto leading-relaxed mb-8"
            >
              Insights, updates, and thought leadership from our team of technology experts. 
              Stay informed about the latest trends in AI, web development, and digital transformation.
            </motion.p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-12 relative bg-page-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['All', 'AI/ML', 'Web Development', 'Technology', 'Business', 'Industry Insights'].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === category 
                      ? 'bg-primary text-white shadow-primary' 
                      : 'bg-card border border-primary/20 text-card-secondary hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-card-secondary" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-6 py-3 bg-card border border-primary/20 rounded-full text-card-primary placeholder-card-secondary focus:outline-none focus:border-primary transition-colors duration-200"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 relative bg-page-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-card-primary mb-2">No Articles Found</h3>
                <p className="text-card-secondary mb-6">Try adjusting your search or filter criteria.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setActiveFilter('All'); }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.$id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    {/* Blog Post Card */}
                    <div className="bg-card shadow-card rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300">
                      {/* Post Image */}
                      <div className="relative h-48 overflow-hidden">
                        {post.imageUrl ? (
                          <img
                            src={imageUrls[post.$id] || ''}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <FileText className="h-16 w-16 text-white" />
                          </div>
                        )}
                        
                        {/* Post Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-2 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs text-card-secondary">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                          <span className="w-1 h-1 bg-card-secondary rounded-full"></span>
                          <span className="text-xs text-card-secondary">5 min read</span>
                        </div>

                        <h3 className="text-xl font-bold text-card-primary mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-card-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Post Tags */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 bg-card text-card-secondary text-xs rounded-full border border-primary/20"
                              >
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                                +{post.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Read More Button */}
                        <Link
                          href={`/blog/${post.$id}`}
                          className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 font-medium text-sm"
                        >
                          Read More
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative bg-page-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-card-primary mb-4">
                Stay Updated with Our Insights
              </h2>
              <p className="text-xl text-card-secondary mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest technology insights, industry updates, and expert perspectives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 bg-card border border-primary/20 rounded-full text-card-primary placeholder-card-secondary focus:outline-none focus:border-primary transition-colors duration-200"
                />
                <button className="btn-primary px-8 py-3">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default BlogPage 