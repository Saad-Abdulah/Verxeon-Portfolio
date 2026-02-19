
'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap, Shield, Globe, Brain, Cloud, Lock, Sparkles, Check } from 'lucide-react'

const Products = () => {
  const services = [
    {
      name: 'AI & Machine Learning',
      description: 'Leverage advanced AI models and machine learning algorithms to automate tasks, improve decision-making, and gain valuable insights from your data.',
      features: ['Custom AI Models', 'Predictive Analytics', 'Natural Language Processing'],
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      badge: 'AI-Powered'
    },
    {
      name: 'Cloud Infrastructure',
      description: 'Scalable and secure cloud solutions to power your applications, data processing, and global reach.',
      features: ['Global CDN', 'Auto-scaling', 'High Availability'],
      icon: Cloud,
      color: 'from-purple-500 to-pink-500',
      badge: 'Cloud-Native'
    },
    {
      name: 'Cybersecurity',
      description: 'Advanced security measures and AI-powered threat detection to protect your sensitive data and infrastructure.',
      features: ['Real-time Monitoring', 'Zero-day Protection', 'Compliance Ready'],
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      badge: 'Enterprise Grade'
    },
    {
      name: 'Data Analytics',
      description: 'Intelligent data management, processing, and analytics to unlock the full potential of your data and drive business growth.',
      features: ['Big Data Processing', 'Real-time Insights', 'Data Governance'],
      icon: Lock,
      color: 'from-orange-500 to-red-500',
      badge: 'Data-Driven'
    },
    {
      name: 'Web Development',
      description: 'Custom website development and AI-powered website builders to create modern, user-friendly, and SEO-optimized digital experiences.',
      features: ['Drag & Drop', 'AI Templates', 'SEO Optimization'],
      icon: Sparkles,
      color: 'from-yellow-500 to-orange-500',
      badge: 'No-Code'
    },
    {
      name: 'Global Communication',
      description: 'Seamless communication and collaboration across different languages and locations for global teams and businesses.',
      features: ['Multi-language', 'Real-time Translation', 'Global Teams'],
      icon: Globe,
      color: 'from-indigo-500 to-purple-500',
      badge: 'Global Ready'
    }
  ]

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Our Core <span className="text-primary">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive technology services designed to transform your business and drive innovation in the digital age.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 group"
            >
              {/* Badge */}
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                {service.badge}
              </div>
              
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="h-8 w-8 text-white" />
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                {service.name}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>
              
              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3 text-gray-700">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* CTA Button */}
              <button className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group-hover:scale-105 flex items-center justify-center space-x-2">
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products
