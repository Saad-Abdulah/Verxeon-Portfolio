'use client'

import { useMemo } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

interface WhatsAppButtonProps {
  phone?: string
  defaultMessage?: string
}

const WhatsAppButton = ({
  phone,
  defaultMessage = 'Interested in Verxeon! I would like to know more about your services.'
}: WhatsAppButtonProps) => {
  const targetPhone = useMemo(() => {
    // Use the specified phone number or fallback to environment variable
    const specifiedPhone = '+92 3181685611'
    const envPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
    const chosen = (phone || specifiedPhone || envPhone || '').replace(/[^0-9]/g, '')
    return chosen
  }, [phone])

  const href = useMemo(() => {
    const text = encodeURIComponent(defaultMessage)
    if (!targetPhone) return undefined
    return `https://wa.me/${targetPhone}?text=${text}`
  }, [targetPhone, defaultMessage])

  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg shadow-lg bg-green-500 hover:bg-green-600 text-white transition-transform duration-200 hover:scale-110"
    >
      <FaWhatsapp className="w-6 h-6 sm:w-8 sm:h-8" />
    </a>
  )
}

export default WhatsAppButton 