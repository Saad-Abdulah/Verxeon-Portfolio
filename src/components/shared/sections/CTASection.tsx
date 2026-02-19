'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Phone, Mail, MessageCircle } from 'lucide-react'
import Link from 'next/link'

const CTASection = () => {
  return (
    <section className="py-10 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold  mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl  max-w-4xl mx-auto">
            Let's discuss how Verxeon can help you achieve your digital transformation goals. 
          </p>
          <p className="text-xl  max-w-3xl mx-auto mb-12"> 
            Get in touch with our experts today for a free consultation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-4 rounded-full font-semibold flex items-center space-x-2 hover:bg-gray-100 transition-all duration-200 shadow-lg"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-black px-8 py-4 rounded-full font-semibold flex items-center space-x-2 hover:bg-white hover:text-primary transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Get Free Consultation</span>
              </motion.button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-black font-semibold mb-2">Call Us</h3>
              <p className="text-black/80">+1 (555) 123-4567</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-black font-semibold mb-2">Email Us</h3>
              <p className="text-black/80">hello@Verxeon.com</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-black font-semibold mb-2">Live Chat</h3>
              <p className="text-black/80">Available 24/7</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
