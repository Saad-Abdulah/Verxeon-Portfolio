// Simplified TeamCard component - only name and role

'use client'

import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { getFileView } from '@/lib/appwrite'
import { LucideIcon } from 'lucide-react'
import { useState, useEffect } from 'react'

interface TeamMember {
  $id: string
  name: string
  role: string
  longBio: string
  expertise: string[]
  experience: string
  linkedin?: string
  github?: string
  profilePic: string
  createdAt: string
  updatedAt: string
}

interface TeamCardProps {
  member: TeamMember
  index: number
  roleIcon?: LucideIcon
  suppressEntrance?: boolean
}

const TeamCard = ({ member, index, roleIcon, suppressEntrance = false }: TeamCardProps) => {
  const IconComponent = roleIcon || User
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [resolvedSrc, setResolvedSrc] = useState<string>('')

  // Resolve image source: local/public path or Firebase file view
  useEffect(() => {
    const resolveImageSrc = async () => {
      const pic = member.profilePic || ''
      if (pic.startsWith('/') || pic.startsWith('http')) {
        setResolvedSrc(pic)
      } else {
        try {
          const url = await getFileView(pic)
          setResolvedSrc(url)
        } catch (error) {
          console.error('Error resolving image URL:', error)
          setResolvedSrc('')
        }
      }
    }
    
    resolveImageSrc()
  }, [member.profilePic])

  const handleImageError = () => {
    console.error('Image failed to load for team member:', member.name)
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageError(false)
    setImageLoading(false)
  }

  // Test image accessibility on component mount
  useEffect(() => {
    if (resolvedSrc) {
      const testImage = new Image()
      testImage.onload = () => {
        setImageError(false)
        setImageLoading(false)
      }
      testImage.onerror = () => {
        setImageError(true)
        setImageLoading(false)
      }
      testImage.src = resolvedSrc
    } else {
      setImageError(true)
      setImageLoading(false)
    }
  }, [resolvedSrc, member.name])

  return (
    <motion.div
      key={member.$id}
      {...(suppressEntrance
        ? {}
        : {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: index * 0.1 }
          })}
      className="group relative"
    >
      {/* Simplified Team Card */}
      <div className="bg-card rounded-lg p-3 hover:scale-[1.01] transition-all duration-300 relative overflow-hidden">
        {/* Card Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Profile Image with rectangular backdrop */}
        <div className="relative z-10 flex justify-center my-4">
          <div className="relative w-56 h-72 md:w-60 md:h-80">
            {/* Backdrop rectangle */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[86%] h-4/5 bg-card  shadow-lg shadow-strong rounded-2xl"></div>

            {/* Profile image */}
            {resolvedSrc && !imageError ? (
              <>
                {imageLoading && (
                  <div className="relative z-10 w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-2xl">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                )}
                <img
                  src={resolvedSrc}
                  alt={member.name}
                  className={`relative z-10 w-full h-full object-contain md:object-cover rounded-2xl transition-transform duration-300 group-hover:scale-[1.02] ${imageLoading ? 'hidden' : 'block'}`}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </>
            ) : (
              <div className="relative z-10 w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center rounded-2xl">
                <div className="text-center">
                  <User className="h-16 w-16 text-white mx-auto mb-2" />
                  <p className="text-white text-sm font-medium">{member.name.split(' ')[0]}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Member Information - Name first, then Role */}
        <div className="relative z-10 text-center mb-4">
          <h3 className="text-2xl md:text-3xl font-bold text-card-primary -mb-4"
          style={{
            fontFamily: 'Open Sauce, sans-serif',
            fontWeight: 600,
            fontSize: '30px',
            lineHeight: '60px',
          }}
          >
            {member.name}
          </h3>
          <p className="text-primary font-semibold text-base md:text-lg"
          style={{
            fontFamily: '"Roboto", sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '40px',
          }}
          >
            {member.role}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default TeamCard
