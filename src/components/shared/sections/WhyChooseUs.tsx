'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Users, Clock, Shield, Zap, Globe, Cpu, Factory, Gauge, Headphones } from 'lucide-react'

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: Cpu,
      title: "Edge AI Specialists",
      color: "#2563eb",
      description:
        "Deep expertise in model optimization and edge deployment. Our team specializes in transforming complex AI models into efficient edge-ready solutions for industrial environments.",
      points: [
        "Certified in TensorFlow Lite, ONNX, and edge frameworks",
        "Proven track record in industrial AI deployments",
        "Expertise in model quantization and pruning techniques",
      ],
    },
    {
      id: 2,
      icon: Factory,
      title: "Industrial IoT Focus",
      color: "#ef4444",
      description:
        "We understand industrial operations inside-out. Our solutions are built for the harsh realities of manufacturing floors, not just clean lab environments.",
      points: [
        "Experience across manufacturing, logistics, and energy sectors",
        "Integration with legacy industrial protocols and systems",
        "Ruggedized deployments for challenging environments",
      ],
    },
    {
      id: 3,
      icon: Gauge,
      title: "Performance Guaranteed",
      color: "#16a34a",
      description:
        "We deliver measurable improvements in latency, accuracy, and operational efficiency. Our edge solutions are benchmarked against real-world industrial requirements.",
      points: [
        "Sub-10ms inference times on edge devices",
        "90%+ model accuracy retention after optimization",
        "Proven ROI within 6-12 months of deployment",
      ],
    },
    {
      id: 4,
      icon: Shield,
      title: "On-Premise Security",
      color: "#9333ea",
      description:
        "Your data stays within your walls. Our edge-first architecture ensures sensitive industrial data never leaves your facility while maintaining full AI capabilities.",
      points: [
        "Zero cloud dependency for core operations",
        "Compliance with industrial data regulations",
        "Encrypted communication between edge nodes",
      ],
    },
    {
      id: 5,
      icon: Zap,
      title: "Rapid Deployment",
      color: "#f97316",
      description:
        "From proof-of-concept to production in weeks, not months. Our streamlined process gets your edge AI operational quickly with minimal disruption.",
      points: [
        "Pilot deployment in 4-6 weeks",
        "Parallel testing with existing systems",
        "Phased rollout minimizing operational risk",
      ],
    },
    {
      id: 6,
      icon: Headphones,
      title: "24/7 Edge Support",
      color: "#2087a1ff",
      description:
        "Round-the-clock monitoring and support for your edge infrastructure. We ensure your AI keeps running even in the most demanding industrial conditions.",
      points: [
        "Real-time edge device health monitoring",
        "Remote diagnostics and troubleshooting",
        "On-site support for critical deployments",
      ],
    },
  ];

  const [expandedFeature, setExpandedFeature] = useState<number | null>(1);

  const handleFeatureClick = (id: number) => {
    setExpandedFeature(expandedFeature === id ? id : id)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span style={{ color: "#1a6b8f" }}>Verxeon</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            We don&apos;t just deploy AI - we engineer{" "}
            <span className="text-[#08273b]">
              intelligence that thrives at the edge
            </span>
            . Our{" "}
            <span className="text-[#08273b]">industrial-grade solutions</span>{" "}
            combine deep edge AI expertise with{" "}
            <span className="text-[#08273b]">
              real-world operational understanding to deliver results
            </span>
            .
          </p>
        </motion.div>

        {/* Expandable Features Accordion */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-2 lg:gap-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            const isExpanded = expandedFeature === feature.id;

            return (
              <div
                key={feature.id}
                onClick={() => handleFeatureClick(feature.id)}
                className={`
                  relative overflow-hidden rounded-2xl bg-white border-2 cursor-pointer
                  transition-all duration-500 ease-in-out
                  ${
                    isExpanded
                      ? "md:flex-[3] shadow-xl"
                      : "md:flex-[0.5] border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg"
                  }
                `}
                style={{
                  borderColor: isExpanded ? "#08273b" : undefined,
                }}
              >
                <div
                  className={`p-6 ${isExpanded ? "md:p-8" : "md:p-6"} ${
                    !isExpanded ? "md:min-h-[300px]" : ""
                  }`}
                >
                  {/* Collapsed View */}
                  <div
                    className={`flex items-center gap-4 ${
                      isExpanded ? "md:mb-6" : ""
                    }`}
                  >
                    <div
                      className={`
                        rounded-xl flex items-center justify-center transition-all duration-500
                        ${
                          isExpanded
                            ? "text-white w-12 h-12 md:w-14 md:h-14"
                            : "bg-gray-100 w-10 h-10 md:w-12 md:h-12"
                        }
                      `}
                      style={{
                        backgroundColor: isExpanded ? "#08273b" : undefined,
                        color: isExpanded ? "white" : feature.color,
                      }}
                    >
                      <Icon
                        className={
                          isExpanded
                            ? "w-6 h-6 md:w-7 md:h-7"
                            : "w-5 h-5 md:w-6 md:h-6"
                        }
                      />
                    </div>
                    <h4
                      className={`
                        font-bold transition-all duration-500
                        ${
                          isExpanded
                            ? "text-lg md:text-xl text-gray-900"
                            : "text-base md:text-lg text-gray-700 md:hidden"
                        }
                      `}
                    >
                      {feature.title}
                    </h4>
                  </div>

                  {/* Expanded Content */}
                  <div
                    className={`
                      transition-all duration-500 overflow-hidden
                      ${
                        isExpanded
                          ? "max-h-[500px] opacity-100 mt-4"
                          : "max-h-0 opacity-0"
                      }
                    `}
                  >
                    <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
                      {feature.description}
                    </p>
                  </div>

                  {/* Vertical title for collapsed state on desktop */}
                  {!isExpanded && (
                    <div className="hidden md:block absolute left-0 right-0 bottom-1/4 translate-y-full flex justify-center">
                      <p className="transform -rotate-90 whitespace-nowrap font-bold text-gray-700 text-sm lg:text-base">
                        {feature.title}
                      </p>
                    </div>
                  )}
                </div>

                {/* Progress indicator */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                  <div
                    className="h-full bg-[#08273b] transition-all duration-300"
                    style={{
                      width: `${(feature.id / features.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>


    </section>
  );
}

export default WhyChooseUs