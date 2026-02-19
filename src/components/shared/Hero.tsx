'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [fadeOpacity, setFadeOpacity] = useState(1)

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current
      
      // Force video to play immediately
      const playVideo = () => {
        video.play().catch(e => {
          // Try playing again after user interaction
          document.addEventListener('click', () => {
            video.play().catch(() => {})
          }, { once: true })
        })
      }
      
      // Try to play immediately
      playVideo()
      
      // Also try when video is ready
      video.addEventListener('canplay', playVideo)
      
      video.addEventListener('error', (e) => {
        console.error('Video error:', e)
      })
      
      return () => {
        video.removeEventListener('canplay', playVideo)
        video.removeEventListener('error', () => {})
      }
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-page-background">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover transition-opacity duration-100"
          style={{ opacity: Math.max(0.95, fadeOpacity) }} // Never go below 85%
          onTimeUpdate={(e) => {
            const video = e.currentTarget;
            const fadeTime = 0.05; // Very short fade

            if (video.duration - video.currentTime < fadeTime) {
              setFadeOpacity(
                0.95 + 0.05 * ((video.duration - video.currentTime) / fadeTime)
              );
            } else if (video.currentTime < fadeTime) {
              setFadeOpacity(0.95 + 0.05 * (video.currentTime / fadeTime));
            } else {
              setFadeOpacity(1);
            }
          }}
        >
          <source src="/Home/1.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 sm:pt-24 md:pt-32">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#fcfdfd] font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6"
        >
          Own The <span className="text-[#1a6b8f]">Edge</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-[#fcfdfd] max-w-4xl mx-auto leading-relaxed mb-8"
        >
          <span style={{ color: "#1a6b8f" }}>
            Intelligence at the edge of possibility
          </span>
          . We optimize and deploy{" "}
          <span style={{ color: "#1a6b8f" }}>
            AI models at the point of action
          </span>{" "}
          - delivering real-time decision-making that&apos;s fast, efficient,
          and unstoppable.
        </motion.p>
      </div>
    </section>
  );
}

export default Hero
