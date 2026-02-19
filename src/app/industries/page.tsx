import Footer from '@/components/shared/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import Industries from '@/app/industries/components/industries'
import { getIndustries } from '@/lib/appwrite'
import { redirect } from 'next/navigation'

export default async function IndustriesPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const queryIndustry = typeof searchParams.industry === 'string' ? searchParams.industry : undefined

  if (queryIndustry) {
    try {
      const allIndustries = await getIndustries()
      const normalize = (s: string) => (s || '')
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[^a-z0-9]/g, '')
        .trim()
      const q = normalize(decodeURIComponent(queryIndustry))
      let match = (allIndustries || []).find((i: any) => normalize(i.name || '') === q)
      if (!match) {
        match = (allIndustries || []).find((i: any) => {
          const n = normalize(i.name || '')
          return n.includes(q) || q.includes(n)
        })
      }
      if (match && match.$id) {
        redirect(`/industries/${match.$id}`)
      }
    } catch (e) {
      // If lookup fails, fall through to list view
    }
  }

  return (
    <>
      <main className="min-h-screen bg-page-background pt-16">
        <Industries />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}