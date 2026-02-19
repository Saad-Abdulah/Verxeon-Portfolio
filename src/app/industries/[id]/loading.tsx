'use client'

import Footer from '@/components/shared/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'

export default function IndustryDetailLoading() {
  return (
    <>
      <main className="min-h-screen bg-page-background pt-16">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-9 w-64 bg-card rounded mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-72 bg-card rounded-xl" />
              <div className="space-y-3">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="h-4 bg-card rounded w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}


