'use client'

import { motion } from 'framer-motion'
import { Users, Award, Clock } from 'lucide-react'
import { BsCrosshair } from "react-icons/bs";

import { useRef, useEffect } from 'react'

const TeamCollaboration = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current

      // Force video to play immediately
      const playVideo = () => {
        video.play().catch(e => {
          console.log('Video autoplay failed:', e)
          // Try playing again after user interaction
          document.addEventListener('click', () => {
            video.play().catch(e2 => console.log('Manual play failed:', e2))
          }, { once: true })
        })
      }

      // Try to play immediately
      playVideo()

      // Also try when video is ready
      video.addEventListener('canplay', playVideo)

      return () => {
        video.removeEventListener('canplay', playVideo)
      }
    }
  }, [])

  return (
    <section className="pb-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Collaborative <span style={{ color: "#1a6b8f" }}>Approach</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Our <span className="text-[#08273b]">cross-functional teams</span>{" "}
            combine diverse skills and perspectives to solve{" "}
            <span className="text-[#08273b]">complex challenges</span> and
            deliver <span className="text-[#08273b]">innovative solutions</span>{" "}
            that exceed client expectations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video Animation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              >
                <source src="/Team/team.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <Users className="h-8 w-8 text-[#2563eb] mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">
                  Expert Team
                </h4>
                <p className="text-sm text-gray-600">
                  Diverse professionals with specialized skills
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <BsCrosshair className="h-8 w-8 text-[#ef4444] mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">
                  Focused Goals
                </h4>
                <p className="text-sm text-gray-600">
                  Clear objectives and measurable outcomes
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <Award className="h-8 w-8 text-[#16a34a] mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">
                  Quality Results
                </h4>
                <p className="text-sm text-gray-600">
                  Consistent delivery of excellence
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <Clock className="h-8 w-8 text-[#9333ea] mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">
                  Timely Delivery
                </h4>
                <p className="text-sm text-gray-600">
                  On-time project completion
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default TeamCollaboration
