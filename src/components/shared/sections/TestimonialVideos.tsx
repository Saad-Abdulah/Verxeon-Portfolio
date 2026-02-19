'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react'

interface TestimonialVideosProps {
  className?: string
}

const TestimonialVideos = ({ className = '' }: TestimonialVideosProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer to detect when video is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Auto-play when video becomes visible
          if (videoRef.current && !isPlaying) {
            setIsPlaying(true)
          }
        } else {
          setIsVisible(false)
          // Pause when video goes out of view
          if (videoRef.current && isPlaying) {
            setIsPlaying(false)
          }
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of video is visible
        rootMargin: '0px'
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleVideoLoad = () => {
    setIsLoaded(true)
  }

  // YouTube video ID from the URL
  const videoId = 'mCcosHsTKKk'
  
  // Build YouTube embed URL with parameters for max quality and autoplay
  const getYouTubeUrl = () => {
    const params = new URLSearchParams({
      autoplay: isPlaying ? '1' : '0',
      mute: isMuted ? '1' : '0',
      controls: '1',
      rel: '0',
      modestbranding: '1',
      showinfo: '0',
      iv_load_policy: '3',
      fs: '1',
      cc_load_policy: '0',
      start: '0',
      end: '',
      quality: 'hd1080', // Max quality
      vq: 'hd1080' // Alternative quality parameter
    })
    
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
  }

  return (
    <section className={`py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-card-primary mb-4">
            Client Testimonials
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear directly from our satisfied clients about their experience working with Verxeon
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Video Container */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
            <iframe
              ref={videoRef}
              src={getYouTubeUrl()}
              title="Client Testimonial Video"
              className="absolute top-0 left-0 w-full h-full rounded-2xl"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={handleVideoLoad}
            />
            
            {/* Loading Overlay */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center rounded-2xl">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p>Loading video...</p>
                </div>
              </div>
            )}

            {/* Custom Controls Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 backdrop-blur-sm rounded-lg p-3 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center space-x-3">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label="Fullscreen"
                >
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-card-primary mb-2">
              Client Success Story
            </h3>
            <p className="text-gray-600">
              Watch how we helped transform our client's business with innovative solutions and exceptional service.
            </p>
          </div>
        </motion.div>

        {/* Additional Video Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-card-primary mb-2">Auto-Play</h4>
            <p className="text-sm text-gray-600">Starts automatically when video is fully visible</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Volume2 className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-card-primary mb-2">Audio Enabled</h4>
            <p className="text-sm text-gray-600">Audio plays by default for better engagement</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Maximize className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-card-primary mb-2">Max Quality</h4>
            <p className="text-sm text-gray-600">Plays in 1080p HD quality by default</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialVideos
