'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { getTestimonials as fetchTestimonials } from '@/lib/appwrite'

interface Testimonial {
  name: string
  role: string
  testimonial: string
  profileImage: string
}

const NewTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [previousIndex, setPreviousIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [cardPositions, setCardPositions] = useState<{ [key: number]: string }>({})
  const [exitingLeftCard, setExitingLeftCard] = useState<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const rows = await fetchTestimonials()
        if (rows && rows.length) {
          setTestimonials(rows.map((r: any) => ({
            name: r.name,
            role: r.role,
            testimonial: r.content,
            profileImage: r.imageUrl || '/ceo-photo.jpg'
          })))
        } else {
          setTestimonials([
            { name: 'Happy Client', role: 'Founder', testimonial: 'Great partnership and timely delivery.', profileImage: '/ceo-photo.jpg' },
            { name: 'Product Lead', role: 'Product Lead', testimonial: 'Excellent engineering quality and communication.', profileImage: '/ceo-photo.jpg' },
            { name: 'CTO', role: 'CTO', testimonial: 'Scalable architecture and reliable execution.', profileImage: '/ceo-photo.jpg' }
          ])
        }
      } catch (e) {
        console.error('Error fetching testimonials:', e)
        setTestimonials([
          { name: 'Happy Client', role: 'Founder', testimonial: 'Great partnership and timely delivery.', profileImage: '/ceo-photo.jpg' }
        ])
      }
    }
    void load()
  }, [])

  // Track card positions for smooth transitions
  useEffect(() => {
    const onResize = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Track card positions for smooth transitions
  useEffect(() => {
    const newPositions: { [key: number]: string } = {}
    testimonials.forEach((_, index) => {
      const diff = (index - currentIndex + testimonials.length) % testimonials.length
      let position = 'hidden'
      if (diff === 0) position = 'center'
      else if (diff === 1) position = 'right'
      else if (diff === testimonials.length - 1) position = 'left'
      newPositions[index] = position
    })
    setCardPositions(newPositions)
  }, [currentIndex, testimonials.length])

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        if (isTransitioning) return
        setIsTransitioning(true)
        setCurrentIndex((prev) => {
          setPreviousIndex(prev)
          const nextIndex = (prev + 1) % (testimonials.length || 1)
          return nextIndex
        })
        setTimeout(() => setIsTransitioning(false), 800)
      }, 6000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isPaused, testimonials.length])

  const goToNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setPreviousIndex(currentIndex)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsTransitioning(false), 800)
  }

  const goToPrevious = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setPreviousIndex(currentIndex)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsTransitioning(false), 800)
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const getTransformProps = (position: string, cardIndex: number) => {
    const prevDiff = (cardIndex - previousIndex + testimonials.length) % testimonials.length
    const currentDiff = (cardIndex - currentIndex + testimonials.length) % testimonials.length
    const isExitingLeft = position === 'hidden' && prevDiff === testimonials.length - 1

    if (isExitingLeft) {
      return { x: -320, scale: 0.9, rotateY: 80, rotateX: 0, opacity: 0, zIndex: 1 }
    }

    switch (position) {
      case 'left':
        return { x: -360, scale: 1, rotateY: 50, rotateX: 0, opacity: 0.8, zIndex: 1 }
      case 'center':
        return { x: 0, scale: 1.13, rotateY: 0, rotateX: 0, opacity: 1, zIndex: 10 }
      case 'right':
        return { x: 360, scale: 1, rotateY: -50, rotateX: 0, opacity: 0.8, zIndex: 1 }
      default:
        let exitX = -1000
        let exitRotateY = 0
        if (prevDiff === 1) exitX = 1000
        else if (isExitingLeft) { exitX = -1000; exitRotateY = 80 }
        return { x: exitX, scale: 0, rotateY: exitRotateY, rotateX: 0, opacity: 0, zIndex: 0 }
    }
  }

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-left mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your success, our story - built on{" "}
            <span style={{ color: "#1a6b8f" }}>trust</span>.
          </h2>
        </div>

        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          className={`absolute ${
            isMobile ? "left-2" : "left-4"
          } top-1/2 -translate-y-1/2 p-1 z-20`}
          disabled={isTransitioning}
          aria-label="Previous"
        >
          <FaArrowLeft className="w-4 h-4 text-white sm:text-gray-800 sm:w-5 sm:h-5" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className={`absolute ${
            isMobile ? "right-2" : "right-4"
          } top-1/2 -translate-y-1/2 p-1 z-20`}
          disabled={isTransitioning}
          aria-label="Next"
        >
          <FaArrowRight className="w-4 h-4 text-white sm:text-gray-800 sm:w-5 sm:h-5" />
        </button>

        {/* Container with perspective */}
        <div
          className="flex justify-center items-center relative"
          style={{
            perspective: "1200px",
            height: "500px",
            width: "100%",
          }}
        >
          {testimonials.map((testimonial, index) => {
            const position = cardPositions[index] || "hidden";
            const transformProps = getTransformProps(position, index);
            const prevDiff =
              (index - previousIndex + testimonials.length) %
              testimonials.length;
            const isExitingLeft =
              position === "hidden" && prevDiff === testimonials.length - 1;
            if (!isMobile && position === "hidden" && !isExitingLeft)
              return null;

            const isEnteringRight =
              position === "right" &&
              prevDiff > 1 &&
              prevDiff < testimonials.length - 1;
            let initialProps: any = false;
            if (isEnteringRight) {
              initialProps = {
                x: 600,
                scale: 0.8,
                rotateY: -100,
                opacity: 0.3,
              };
            }

            return (
              <motion.div
                key={`${index}-${currentIndex}`}
                className={`absolute ${
                  isMobile ? "h-[420px] items-center" : "w-[320px] h-[380px]"
                }`}
                style={{
                  width: isMobile ? "80vw" : undefined,
                  transformOrigin: "center center",
                  originX: 0.5,
                  originY: 0.5,
                  top: "50%",
                  left: "50%",
                  marginLeft: isMobile ? "-40vw" : "-175px",
                  marginTop: "-240px",
                  transformStyle: "preserve-3d",
                  pointerEvents:
                    isMobile && position !== "center" ? "none" : undefined,
                  opacity: isMobile && position !== "center" ? 0 : undefined,
                }}
                initial={initialProps}
                animate={(() => {
                  if (!isMobile) return transformProps;
                  if (position === "center") return transformProps;
                  if (position === "left") {
                    return {
                      x: -1000,
                      scale: 1,
                      rotateY: 50,
                      rotateX: 0,
                      opacity: 0,
                      zIndex: 0,
                    };
                  }
                  return { ...transformProps, opacity: 0, zIndex: 0 };
                })()}
                transition={{
                  duration: 0.8,
                  ease: [0.4, 0.0, 0.2, 1],
                  type: "tween",
                }}
              >
                <div
                  className="w-full h-full rounded-lg shadow-lg p-6 flex flex-col"
                  style={{
                    backgroundImage: "url(/Testimonial/bg-navy-blue.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {position === "left" && (
                    <div
                      className="absolute inset-0 h-full w-full rounded-lg pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(270deg, rgba(1,31,51,0.60) 0%, rgba(1,31,51,0.45) 20%, rgba(1,31,51,0.25) 45%, rgba(1,31,51,0.10) 70%, rgba(1,31,51,0) 100%)",
                      }}
                    />
                  )}
                  {position === "right" && (
                    <div
                      className="absolute inset-0 h-full w-full rounded-lg pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(1,31,51,0.60) 0%, rgba(1,31,51,0.45) 20%, rgba(1,31,51,0.25) 45%, rgba(1,31,51,0.10) 70%, rgba(1,31,51,0) 100%)",
                      }}
                    />
                  )}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-gray-800 font-bold text-lg mr-4 overflow-hidden">
                      <img
                        src={testimonial.profileImage}
                        alt={testimonial.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-200 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white leading-relaxed">
                      {testimonial.testimonial}
                    </p>
                  </div>
                  {/* read-only public view – no actions */}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pause Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={togglePause}
            className="p-3 rounded-full bg-white hover:bg-gray-50 transition-colors"
          >
            {isPaused ? (
              <svg
                className="w-6 h-6 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            )}
          </button>
        </div>

        {/* Dots indicator – mobile shows single active dot */}
        <div className="flex justify-center -mt-4 gap-2">
          {Array.from(
            { length: testimonials.length },
            (_, i) => testimonials.length - 1 - i
          ).map((dotIndex) => {
            const totalDots = testimonials.length;
            const highlightedDots: number[] = [];
            if (!isMobile) {
              for (let i = 3; i >= 1; i--) {
                const idx = (currentIndex + i) % totalDots;
                highlightedDots.push(idx);
              }
            } else {
              highlightedDots.push(currentIndex);
            }
            const isHighlighted = highlightedDots.includes(dotIndex);
            return (
              <button
                key={dotIndex}
                onClick={() => {
                  if (isTransitioning) return;
                  setIsTransitioning(true);
                  setPreviousIndex(currentIndex);
                  setCurrentIndex(dotIndex);
                  setTimeout(() => setIsTransitioning(false), 800);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  isHighlighted ? "" : "bg-gray-300"
                }`}
                style={
                  isHighlighted ? { backgroundColor: "#08273b" } : undefined
                }
                disabled={isTransitioning}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NewTestimonials