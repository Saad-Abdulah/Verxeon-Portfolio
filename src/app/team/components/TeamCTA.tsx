'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const TeamCTA = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white shadow-[-3px_-2px_5px_rgba(8,12,42,0.6)] p-12 rounded-3xl">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Work With Our{" "}
              <span style={{ color: "#08273b" }}>Team</span>?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Let&apos;s discuss how our{" "}
              <span className="text-[#08273b]">experienced team</span> can help
              bring your vision to life and transform your business with{" "}
              <span className="text-[#08273b]">
                innovative technology solutions
              </span>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="bg-[#08273b] text-white border px-4 py-2 rounded-lg font-semibold flex items-center justify-center space-x-3 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Get in Touch</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              {/* <Link
                href="/projects"
                className="bg-white text-[#08273b] border border-[#08273b] px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View Our Work
              </Link> */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TeamCTA
