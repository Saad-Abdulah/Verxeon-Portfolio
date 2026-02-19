'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Footer from '@/components/shared/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, Send, CheckCircle, Loader2, Calendar, Users, Globe, Clock, ArrowRight } from 'lucide-react'
import { IoMdCall } from "react-icons/io"
import { MdEmail } from "react-icons/md"

const ContactPageContent = () => {
  const searchParams = useSearchParams()
  const initialTab = (searchParams?.get('tab') === 'consultation') ? 'consultation' : 'message'
  const [activeTab, setActiveTab] = useState<'message' | 'consultation'>(initialTab)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsSubmitting(true)
      setError(null)
      
      // Send to API to save + email notifications
      const res = await fetch('/api/contact/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      if (!res.ok) throw new Error('Submit failed')
      
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: 'General Inquiry',
        message: ''
      })
      
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (err) {
      console.error('Error submitting form:', err)
      setError('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-page-background">
      
      {/* Contact Form & Info */}
      <section className="py-20 relative bg-page-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left Column - Form or Consultation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Tab Toggle */}
            <div className="flex bg-white rounded-lg p-1 my-8 max-w-lg mx-auto border border-black transition-all duration-300">
             
              <button
                onClick={() => setActiveTab('message')}
                className={`flex-1 py-2 px-4 rounded-lg font-bold text-base transition-all duration-300 whitespace-nowrap transform relative overflow-hidden ${
                  activeTab === 'message'
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <span className="relative z-10">Send a Message</span>
                {activeTab === 'message' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-50"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('consultation')}
                className={`flex-1 py-2 px-4 rounded-lg font-bold text-base transition-all duration-300 whitespace-nowrap transform relative overflow-hidden ${
                  activeTab === 'consultation'
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <span className="relative z-10">Book a Consultation</span>
                {activeTab === 'consultation' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-50"></div>
                )}
              </button>
            </div>

            {/* Message Form */}
            {activeTab === 'message' && (
              <>
                <h2 className="text-3xl font-bold text-card-primary mb-8 text-center">Send us a Message</h2>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card shadow-card rounded-lg p-8 text-center"
                  >
                    <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-card-primary mb-2">Message Sent!</h3>
                    <p className="text-card-secondary">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-card-primary mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border border-primary/20 rounded-lg text-card-primary placeholder-card-secondary focus:outline-none focus:border-primary transition-colors duration-200"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-card-primary mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border border-primary/20 rounded-lg text-card-primary placeholder-card-secondary focus:outline-none focus:border-primary transition-colors duration-200"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-card-primary mb-2">
                          Email Subject *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border border-primary/20 rounded-lg text-card-primary placeholder-card-secondary focus:outline-none focus:border-primary transition-colors duration-200"
                          placeholder="Enter your subject"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-card-primary mb-2">
                          Company/Portfolio🔗/Resume🔗
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border border-primary/20 rounded-lg text-card-primary placeholder-card-secondary focus:outline-none focus:border-primary transition-colors duration-200"
                          placeholder="Enter your company/portfolio/resume link"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-card-primary mb-2">
                        Message *
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border border-primary/20 rounded-lg text-card-primary placeholder-card-secondary focus:outline-none focus:border-primary transition-colors duration-200 resize-none pr-28"
                          placeholder="Tell us about your project or inquiry..."
                        />
                        <AnimatePresence>
                          {formData.message.trim().length > 0 && (
                            <motion.span
                              key="sig-hint"
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 0.85, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.25 }}
                              className="bg-white pointer-events-none absolute bottom-2 right-3 text-xs text-gray-500"
                            >
                              Signature will be added automatically with Name and Link
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {isSubmitting ? (
                      <div className="flex justify-center">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-strong transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                        >
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Sending...</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center mt-8">
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="group relative px-4 py-2 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl border-2 border-gray-900 hover:border-gray-800 overflow-hidden"
                        >
                          {/* Background animation effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                          
                          {/* Button content */}
                          <div className="relative z-10 flex items-center space-x-3">
                            <div className="p-1.5 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                              <Send className="h-5 w-5 group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <span className="group-hover:translate-x-1 transition-transform duration-300">Send Message</span>
                          </div>
                        </motion.button>
                      </div>
                    )}
                    {error && (
                      <p className="text-red-500 text-center mt-4">{error}</p>
                    )}
                  </form>
                )}
              </>
            )}

            {/* Consultation Section */}
            {activeTab === 'consultation' && (
             <>
             <h2 className="text-3xl font-bold text-card-primary mb-8 text-center">Book a Free Consultation</h2>
             <div className="bg-card shadow-2xl rounded-lg p-8 text-center transition-colors duration-300">
               <Calendar className="h-16 w-16 text-primary mx-auto mb-6" />
               <a
                 href="https://calendly.com/devsol-ai-tech"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl"
               >
                 <Calendar className="h-6 w-6" />
                 <span>Book Consultation</span>
               </a>
               <h3 className="text-2xl font-bold text-card-primary my-4">Free 30-Minute Consultation</h3>
               <p className="text-card-secondary text-lg leading-relaxed mb-8">
                 Schedule a free consultation to discuss your project requirements, get expert advice, 
                 and explore how our team can help bring your vision to life.
               </p>
             </div>
           </>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}

const ContactPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPageContent />
    </Suspense>
  )
}

export default ContactPage