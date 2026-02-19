'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const About = () => {
  return (
    <section id="ab out" className="py-20 relative overflow-hidden bg-page-background">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Verxeon Story Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Story Content - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/*  */}
              <h2 className="text-4xl font-bold mb-6 text-card-primary">
                Our Story
              </h2>
              <p className="text-lg text-card-secondary leading-relaxed mb-6">
                Verxeon began with one belief: technology should solve real problems with empathy and precision. 
                From day one, we've worked as a tight, multidisciplinary team - web engineers, AI/ML specialists, 
                and automation experts - shaping ideas into products that matter.
              </p>
              <p className="text-lg text-card-secondary leading-relaxed mb-6">
                Every project has taught us to move fast, listen deeply, and craft solutions that stand the test 
                of real-world use. We've grown from a small startup to a trusted partner for businesses looking 
                to transform their digital presence.
              </p>
              <p className="text-lg text-card-secondary leading-relaxed">
                Today, we continue to push the boundaries of what's possible, combining cutting-edge AI technology 
                with proven development methodologies to deliver solutions that drive real business value.
              </p>
            </motion.div>

            {/* Story Image - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/story.webp"
                  alt="Verxeon Story"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default About