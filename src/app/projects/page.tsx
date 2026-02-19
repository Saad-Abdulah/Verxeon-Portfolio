'use client'

import Footer from '@/components/shared/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import Projects from '@/app/projects/components/Projects'
import { Suspense } from 'react'
import ProjectsLoading from './loading'

export default function ProjectsPage() {
  return (
    <>
      <main className="min-h-screen bg-page-background pt-16">
        <Suspense fallback={<ProjectsLoading />}>
          <Projects />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
