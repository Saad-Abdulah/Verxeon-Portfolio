'use client'

import Footer from '@/components/shared/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'

export default function ProjectDetailLoading() {
  return (
    <>
      <main className="min-h-screen bg-page-background pt-16">
        <div className="max-w-5xl mx-auto px-4 py-12 animate-pulse">
          <div className="h-8 w-72 bg-card rounded mb-6" />
          <div className="h-64 w-full bg-card rounded-xl mb-8" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 bg-card rounded w-full" />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}


