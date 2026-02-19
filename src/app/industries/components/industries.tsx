'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Eye, Building, Globe, Cpu, Cloud, Smartphone, Code, TrendingUp, Users, Shield, Zap, Target } from 'lucide-react'
import {
  FaChartLine,
  FaProjectDiagram,
  FaMobileAlt,
  FaLaptopCode,
  FaBuilding,
  FaTruck,
  FaBolt,
  FaCar,
  FaRocket,
  FaIndustry,
} from "react-icons/fa";
import { FaCloudArrowUp, FaBrain } from 'react-icons/fa6'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import Image from 'next/image'

interface Industry {
  $id: string
  name: string
  longDescription: string
  category: string
  features: string[]
  color: string
  icon: any
  image: string
  rating: number
  reviews: number
  price: string
  deliveryTime: string
}

const INDUSTRIES = [
  {
    $id: "smart-manufacturing",
    name: "Smart Manufacturing",
    icon: "FaIndustry",
    image: "/Industries/smart-manufacturing.jpg",
  },
  {
    $id: "logistics-supply-chain",
    name: "Logistics & Supply Chain",
    icon: "FaTruck",
    image: "/Industries/supply-chain-representation.jpg",
  },
  {
    $id: "energy-utilities",
    name: "Energy & Utilities",
    icon: "FaBolt",
    image: "/Industries/energy-utilities_header.jpg",
  },
  {
    $id: "automotive-transportation",
    name: "Automotive & Transportation",
    icon: "FaCar",
    image: "/Industries/automotive-transportation.jpg",
  },
  {
    $id: "aerospace-defense",
    name: "Aerospace & Defense",
    icon: "FaRocket",
    image: "/Industries/aerospace-defense.jpeg",
  },
  {
    $id: "smart-buildings-infrastructure",
    name: "Smart Buildings & Infrastructure",
    icon: "FaBuilding",
    image: "/Industries/smart-buildings-infrastructure.jpg",
  },
];

const Industries = ({ showIntro = true, showVideo = true, showCTA = true }: { showIntro?: boolean; showVideo?: boolean; showCTA?: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Icon mapping function - same as admin
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      // React Icons
      FaIndustry: FaIndustry,
      FaBuilding: FaBuilding,
      FaRocket: FaRocket,
      FaCar: FaCar,
      FaBolt: FaBolt,
      FaTruck: FaTruck,
    };
    return iconMap[iconName] || Code
  }

  const industriesWithProjects = INDUSTRIES as (Industry & {
    projects?: any[];
  })[];

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
    <section className="py-20 relative bg-page-background">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        {showIntro && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Industries We <span style={{ color: "#1a6b8f" }}>Serve</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Delivering{" "}
              <span className="text-[#08273b]">Edge AI excellence</span> across
              industries where{" "}
              <span className="text-[#08273b]">real-time intelligence</span>{" "}
              drives{" "}
              <span className="text-[#08273b]">
                operational success and competitive advantage
              </span>
              .
            </p>
          </motion.div>
        )}

        {/* Industries Grid */}
        {industriesWithProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industriesWithProjects.map((industry: any, index: number) => {
              const industryImage = encodeURI(industry.image);
              const IconComponent = getIconComponent(industry.icon);

              return (
                <motion.div
                  key={industry.$id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* Industry Card with Image Background */}
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    {/* Background Image */}
                    <Image
                      src={industryImage}
                      alt={industry.name}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      {/* Top Section - Industry Name */}
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-[#08273b]/20 backdrop-blur-sm">
                            <IconComponent
                              className="h-6 w-6"
                              style={{ color: "#1a6b8f" }}
                            />
                          </div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors duration-300">
                            {industry.name}
                          </h3>
                        </div>
                      </div>

                      {/* Bottom Section - View Details Button */}
                      <div className="relative z-10 mt-auto">
                        <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0">
                          <Link
                            href={`/industries/${industry.$id}`}
                            className="inline-flex items-center space-x-2 px-3 py-1.5 backdrop-blur-sm border text-white rounded-lg text-sm font-medium transition-all duration-300"
                            style={{
                              backgroundColor: "#08273b",
                              borderColor: "#08273b",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#172554";
                              e.currentTarget.style.borderColor = "#172554";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "#08273b";
                              e.currentTarget.style.borderColor = "#08273b";
                            }}
                          >
                            <Eye className="h-4 w-4" />
                            <span>View Details</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center py-20"
          >
            <div className="bg-card shadow-card p-12 rounded-2xl">
              <div className="text-primary text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-card-primary mb-2">
                No Industries Yet
              </h3>
              <p className="text-card-secondary mb-6">
                We&apos;re working on expanding our industry expertise. Check
                back soon!
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Industries