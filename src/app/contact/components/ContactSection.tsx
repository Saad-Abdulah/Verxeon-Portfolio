'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, Send, CheckCircle, Loader2, Calendar } from 'lucide-react'
import { IoMdCall } from "react-icons/io"
import { MdEmail } from "react-icons/md"
import { useMediaQuery } from 'react-responsive'

const ContactSection = () => {
  const searchParams = useSearchParams()
  const isMobile = useMediaQuery({ maxWidth: 768 })
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
      const res = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error('Submit failed')
      setIsSubmitted(true)
      setFormData({ name: '', email: '', company: '', subject: 'General Inquiry', message: '' })
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (err) {
      console.error('Error submitting form:', err)
      setError('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 relative bg-page-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex bg-white rounded-lg p-1 my-8 max-w-full sm:max-w-lg mx-auto border border-black transition-all duration-300">
            <button
              onClick={() => setActiveTab("message")}
              className={`flex-1 py-2 px-3 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 whitespace-nowrap transform relative overflow-hidden ${
                activeTab === "message"
                  ? "bg-[#08273b] text-white shadow-md"
                  : "bg-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <span className="relative z-10">Send a Message</span>
              {activeTab === "message" && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-50"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("consultation")}
              className={`flex-1 py-2 px-3 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 whitespace-nowrap transform relative overflow-hidden ${
                activeTab === "consultation"
                  ? "bg-[#08273b] text-white shadow-md"
                  : "bg-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              Book a Consultation
              {activeTab === "consultation" && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-50"></div>
              )}
            </button>
          </div>

          {activeTab === "message" && (
            <>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
                Send us a <span style={{ color: "#1a6b8f" }}>Message</span>
              </h2>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card shadow-card rounded-lg p-8 text-center"
                >
                  <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-card-primary mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-card-secondary">
                    Thank you for reaching out. We&apos;ll get back to you
                    within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-card-primary mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-800 rounded-lg text-card-primary placeholder-card-secondary focus:outline-none focus:border-primary transition-colors duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-card-primary mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-800 rounded-lg text-card-primary placeholder-card-secondary focus:outline-none focus:border-primary transition-colors duration-200"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-card-primary mb-2"
                      >
                        Email Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-800 rounded-lg text-card-primary placeholder-card-secondary focus:outline-none focus:border-primary transition-colors duration-200"
                        placeholder="Enter your subject"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-card-primary mb-2"
                      >
                        Company/Portfolio🔗/Resume🔗
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-800 rounded-lg text-card-primary placeholder-card-secondary focus:outline-none focus:border-primary transition-colors duration-200"
                        placeholder="Enter your company/portfolio/resume link"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-card-primary mb-2"
                    >
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
                        className="w-full px-4 py-3 bg-white border border-gray-800 rounded-lg text-card-primary placeholder-card-secondary focus:outline-none focus:border-primary transition-colors duration-200 resize-none pr-28 pb-14"
                        placeholder="Tell us about your project or inquiry..."
                      />
                      <button
                        type="submit"
                        className="absolute bottom-3 right-3 px-4 py-2 bg-[#08273b] text-white rounded-lg text-sm font-semibold hover:bg-[#172554] transition-colors"
                      >
                        Send Message
                      </button>
                      <AnimatePresence>
                        {formData.message.trim().length > 0 && (
                          <motion.span
                            key="sig-hint"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 0.85, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.25 }}
                            className="bg-white pointer-events-none absolute bottom-2 left-3 text-xs text-gray-500"
                          >
                            Signature will be added automatically with Name and
                            Link
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
                  ) : null}
                  {error && (
                    <p className="text-red-500 text-center mt-4">{error}</p>
                  )}
                </form>
              )}
            </>
          )}

          {activeTab === "consultation" && (
            <>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
                Book a Free{" "}
                <span style={{ color: "#1a6b8f" }}>Consultation</span>
              </h2>
              <div className="bg-card shadow-2xl rounded-lg p-8 text-center transition-colors duration-300">
                <Calendar className="h-16 w-16 text-primary mx-auto mb-6" />
                <a
                  href="https://calendly.com/devsol-ai-tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#08273b] text-white rounded-2xl font-bold text-xl hover:bg-[#172554] transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl"
                >
                  <Calendar className="h-6 w-6" />
                  <span>Book Consultation</span>
                </a>
                <h3 className="text-2xl font-bold text-card-primary my-4">
                  Free 30-Minute Consultation
                </h3>
                <p className="text-card-secondary text-lg leading-relaxed mb-8">
                  Schedule a free consultation to discuss your project
                  requirements, get expert advice, and explore how our team can
                  help bring your vision to life.
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSection 