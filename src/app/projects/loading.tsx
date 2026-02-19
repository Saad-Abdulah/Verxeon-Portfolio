'use client'

import Footer from '@/components/shared/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'

export default function ProjectsLoading() {
  return (
    <>
      <main className="min-h-screen bg-page-background pt-16">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-pulse">
              <div className="h-9 w-60 bg-card rounded-lg mx-auto mb-4" />
              <div className="h-4 w-[36rem] max-w-full bg-card rounded-lg mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white shadow-xl rounded-2xl overflow-hidden border-2 border-gray-100 animate-pulse">
                  <div className="h-48 bg-card" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 w-48 bg-card rounded" />
                    <div className="h-4 w-full bg-card rounded" />
                    <div className="h-4 w-4/5 bg-card rounded" />
                    <div className="h-10 w-40 bg-card rounded mt-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}


