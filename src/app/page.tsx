import dynamic from 'next/dynamic'
import Footer from '@/components/shared/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'

//Brand Colors
// Light: #fcfdfd
// Dark: #08273b 
// Theme: #10537a
// Previous Theme: #2fa8af

// Dynamic imports for better performance e
const Hero = dynamic(() => import('@/components/shared/Hero'), { ssr: true })
const WhyChooseUs = dynamic(() => import('@/components/shared/sections/WhyChooseUs'), { ssr: true })
const Testimonials = dynamic(() => import('@/components/shared/sections/Testimonials'), { ssr: true })
//const TestimonialVideos = dynamic(() => import('@/components/shared/sections/TestimonialVideos'), { ssr: true })
//const Industries = dynamic(() => import('@/app/industries/components/industries'), { ssr: true })
const Projects = dynamic(() => import('@/app/projects/components/Projects'), { ssr: true })
const Team = dynamic(() => import('@/app/team/components/Team'), { ssr: true })
//const About = dynamic(() => import('@/app/about/components/About'), { ssr: true })
//const CTASection = dynamic(() => import('@/components/shared/sections/CTASection'), { ssr: true })
const Services = dynamic(() => import('@/components/shared/sections/Services'), { ssr: true })
const Business = dynamic(() => import('@/components/shared/sections/Business'), { ssr: true })
const Technologies = dynamic(() => import('@/components/shared/sections/Technologies'), { ssr: true })
const ContactSection = dynamic(() => import('@/app/contact/components/ContactSection'), { ssr: true })
export default function Home() {
  return (
    <main className="min-h-screen bg-page-background">

      {/* Hero Section with Video Background */}
      <Hero />

      {/* Improve Business Through Technology (above Industries) */}

      <Business />

      {/* Services/Products Section removed per request */}
      <Services />


      {/* Why Choose Us Section - moved to end */}
      <WhyChooseUs />

      {/* Industries Section */}
      {/* Hide intro heading + video on home page */}
      {/* <Industries showIntro={false} showVideo={false} showCTA={false} /> */}


      {/* Projects Section - show only first 9 with a View All button */}
      {/*<Projects showProcess={false} showTech={false} limit={9} showViewAll={true} />*/}

      {/* Team Section */}
      {/*<Team />*/}

      {/* Testimonials Section */}
      {/*<Testimonials />*/}

      {/* Testimonial Videos Section */}
      {/* <TestimonialVideos className="mt-4 mb-4" /> */}



      {/* Technologies We Master (placed just above Why Choose Verxeon) */}
      <Technologies />

      {/* Embedded Contact Section */}
      <ContactSection />

      {/* About Section */}
      {/* <About /> */}

      {/* Call to Action Section */}
      {/* <CTASection /> */}

      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </main>
  )
}
