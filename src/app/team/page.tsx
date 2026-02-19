import Footer from '@/components/shared/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import dynamic from 'next/dynamic'

const Team = dynamic(() => import('@/app/team/components/Team'), { ssr: true })
const TeamCollaboration = dynamic(() => import('@/app/team/components/TeamCollaboration'), { ssr: true })
const TeamCTA = dynamic(() => import('@/app/team/components/TeamCTA'), { ssr: true })

export default function TeamPage() {
  return (
    <>
      <main className="min-h-screen bg-white pt-16">
        <Team />
        <TeamCollaboration />
        <TeamCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
