"use client";

import { useState } from "react";
import {
  TrendingUp,
  Zap,
  Target,
  Rocket,
  Lightbulb,
  Users,
  Settings,
  CheckCircle,
  Headphones,
  Shield,
} from "lucide-react";

export default function Business() {
  const benefits = [
    {
      id: 1,
      icon: Zap,
      title: "Real-Time Processing",
      color: "#08273b",
      description:
        "Process data instantly at the source, eliminating cloud latency. Our edge-optimized models deliver millisecond response times for critical industrial decisions.",
      points: [
        "Sub-10ms inference times for time-critical operations",
        "Zero dependency on cloud connectivity for core functions",
        "Instant anomaly detection and predictive alerts",
      ],
    },
    {
      id: 2,
      icon: TrendingUp,
      title: "Operational Efficiency",
      color: "#ef4444",
      description:
        "Reduce downtime and optimize workflows with AI that learns from your operations. Our edge solutions identify inefficiencies and enable predictive maintenance before issues arise.",
      points: [
        "Reduce equipment downtime by up to 45%",
        "Optimize energy consumption through intelligent monitoring",
        "Automate quality control with computer vision at production speed",
      ],
    },
    {
      id: 3,
      icon: Target,
      title: "Cost Optimization",
      color: "#16a34a",
      description:
        "Slash bandwidth and infrastructure costs by processing data locally. Our model optimization techniques reduce computational requirements without sacrificing accuracy.",
      points: [
        "Cut cloud data transfer costs by up to 80%",
        "Deploy on resource-constrained hardware efficiently",
        "Minimize infrastructure overhead with edge-first architecture",
      ],
    },
    {
      id: 4,
      icon: Shield,
      title: "Enhanced Security",
      color: "#9333ea",
      description:
        "Keep sensitive industrial data on-premises and secure. Our edge deployment ensures your proprietary information never leaves your facility while maintaining full operational intelligence.",
      points: [
        "Process sensitive data locally without cloud exposure",
        "Maintain compliance with industry data regulations",
        "Reduce attack surface with distributed architecture",
      ],
    },
    {
      id: 5,
      icon: Rocket,
      title: "Scalability",
      color: "#f97316",
      description:
        "Scale your AI deployment across facilities seamlessly. Our solutions grow from pilot to production, supporting thousands of edge devices with centralized management and monitoring.",
      points: [
        "Deploy across multiple facilities with unified oversight",
        "Add new edge nodes without infrastructure overhaul",
        "Scale from prototype to enterprise-wide deployment efficiently",
      ],
    },
  ];

  const processStages = [
    {
      id: 1,
      icon: Lightbulb,
      title: "Discovery & Assessment",
      color: "#08273b",
      description:
        "We analyze your industrial environment, existing infrastructure, and operational challenges to identify optimal edge AI deployment opportunities.",
      deliverables: [
        "Industrial use case analysis",
        "Edge infrastructure assessment",
        "ROI projections and deployment roadmap",
      ],
      duration: "1-2 weeks",
    },
    {
      id: 2,
      icon: Settings,
      title: "Model Optimization",
      color: "#ef4444",
      description:
        "Our engineers optimize AI models for edge deployment through quantization, pruning, and compression - ensuring maximum performance on resource-constrained hardware.",
      deliverables: [
        "Optimized model architecture",
        "Performance benchmarking reports",
        "Hardware compatibility analysis",
      ],
      duration: "2-4 weeks",
    },
    {
      id: 3,
      icon: Users,
      title: "Edge Integration",
      color: "#16a34a",
      description:
        "We integrate edge AI seamlessly with your existing industrial systems, IoT sensors, and operational technology - ensuring minimal disruption to ongoing operations.",
      deliverables: [
        "Edge runtime deployment",
        "System integration documentation",
        "Data pipeline configuration",
      ],
      duration: "3-6 weeks",
    },
    {
      id: 4,
      icon: CheckCircle,
      title: "Deployment & Testing",
      color: "#9333ea",
      description:
        "Rigorous testing in your production environment ensures reliability under real-world conditions. We validate performance, accuracy, and failover mechanisms before full rollout.",
      deliverables: [
        "Production deployment on edge devices",
        "Performance validation reports",
        "Operator training and documentation",
      ],
      duration: "1-2 weeks",
    },
    {
      id: 5,
      icon: TrendingUp,
      title: "Monitoring & Optimization",
      color: "#f97316",
      description:
        "Continuous model performance monitoring, retraining pipelines, and optimization ensure your edge AI adapts to changing operational conditions and maintains peak accuracy.",
      deliverables: [
        "Real-time performance dashboards",
        "Model drift detection and alerts",
        "Continuous improvement recommendations",
      ],
      duration: "Ongoing",
    },
    {
      id: 6,
      icon: Headphones,
      title: "Support & Maintenance",
      color: "#2087a1ff",
      description:
        "24/7 technical support for your edge infrastructure with proactive maintenance, security updates, and rapid incident response to keep operations running smoothly.",
      deliverables: [
        "Round-the-clock incident response",
        "Regular firmware and model updates",
        "Predictive maintenance alerts",
      ],
      duration: "Ongoing",
    },
  ];

  const [expandedBenefit, setExpandedBenefit] = useState<number | null>(1);
  const [expandedStage, setExpandedStage] = useState<number | null>(1);

  const handleBenefitClick = (id: number) => {
    setExpandedBenefit(expandedBenefit === id ? id : id);
  };

  const handleStageClick = (id: number) => {
    setExpandedStage(expandedStage === id ? null : id);
  };

  return (
    <section className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transform Point of Action with{" "}
            <span style={{ color: "#1a6b8f" }}>Edge Intelligence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Deploy AI where it delivers maximum impact -{" "}
            <span className="text-[#08273b]">at the edge</span>. Our solutions
            bring <span className="text-[#08273b]">real-time intelligence</span>{" "}
            to your operations, reducing latency, cutting costs, and enabling{" "}
            <span className="text-[#08273b]">
              smarter decision-making at every point of action
            </span>
            .
          </p>
        </div>

        {/* Expandable Benefits Accordion */}
        <div className="mb-16 md:mb-24">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 text-center">
            Key Benefits
          </h3>
          <div className="flex flex-col md:flex-row gap-3 md:gap-2 lg:gap-3 md:min-h-[350px]">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              const isExpanded = expandedBenefit === benefit.id;

              return (
                <div
                  key={benefit.id}
                  onClick={() => handleBenefitClick(benefit.id)}
                  className={`
                    relative overflow-hidden rounded-2xl bg-white border-2 cursor-pointer
                    transition-all duration-500 ease-in-out
                    ${
                      isExpanded
                        ? "md:flex-[3] border-[#08273b] shadow-xl"
                        : "md:flex-[0.5] border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg"
                    }
                  `}
                >
                  <div className={`p-6 ${isExpanded ? "md:p-8" : "md:p-6"}`}>
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
                            ? "bg-[#08273b] text-white w-12 h-12 md:w-14 md:h-14"
                            : "bg-gray-100 text-gray-600 w-10 h-10 md:w-12 md:h-12"
                        }
                      `}
                        style={{
                          color: isExpanded ? "white" : benefit.color,
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
                        {benefit.title}
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
                        {benefit.description}
                      </p>
                      <ul className="space-y-2">
                        {benefit.points.map((point, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm md:text-base"
                          >
                            <CheckCircle className="w-5 h-5 text-[#08273b] flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Vertical title for collapsed state on desktop */}
                    {!isExpanded && (
                      <div className="hidden md:block absolute left-0 right-0 bottom-1/3 translate-y-full flex justify-center">
                        <p className="transform -rotate-90 whitespace-nowrap font-bold text-gray-700 text-sm lg:text-base">
                          {benefit.title}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Progress indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                    <div
                      className="h-full bg-[#08273b] transition-all duration-300"
                      style={{
                        width: `${(benefit.id / benefits.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Timeline/Process Flow */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 text-center">
            Our End-to-End Process
          </h3>

          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Connecting Line */}
            <div
              className="absolute top-12 left-0 right-0 h-1 bg-gray-200"
              style={{ zIndex: 0 }}
            >
              <div
                className="h-full bg-[#08273b] transition-all duration-300"
                style={{
                  width: `${
                    (((expandedStage ?? 1) - 1) / (processStages.length - 1)) *
                    100
                  }%`,
                }}
              />
            </div>

            <div
              className="flex justify-between relative"
              style={{ zIndex: 1 }}
            >
              {processStages.map((stage, index) => {
                const Icon = stage.icon;
                const isExpanded = expandedStage === stage.id;

                return (
                  <div
                    key={stage.id}
                    className="flex flex-col items-center"
                    style={{ flex: "1" }}
                  >
                    {/* Stage Circle */}
                    <div
                      onClick={() => handleStageClick(stage.id)}
                      className={`
                        w-24 h-24 rounded-full flex items-center justify-center cursor-pointer
                        transition-all duration-300 relative
                        ${
                          isExpanded
                            ? "bg-[#08273b] text-white shadow-lg scale-110"
                            : "bg-white border-2 border-gray-300 hover:border-[#08273b]"
                        }
                      `}
                      style={{
                        color: isExpanded ? "white" : stage.color,
                      }}
                    >
                      <Icon className="w-10 h-10" />

                      {/* Stage number badge */}
                      <div
                        className={`
                        absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center
                        text-xs font-bold
                        ${
                          isExpanded
                            ? "bg-[#08273b] text-white"
                            : "bg-gray-200 text-gray-600"
                        }
                      `}
                      >
                        {index + 1}
                      </div>
                    </div>

                    {/* Stage Title */}
                    <h4
                      className={`
                      mt-4 font-bold text-center transition-colors duration-300
                      ${isExpanded ? "text-[#08273b]" : "text-gray-700"}
                    `}
                    >
                      {stage.title}
                    </h4>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="mt-4 bg-white rounded-xl shadow-xl p-6 border-2 border-[#08273b] w-64 animate-fadeIn">
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {stage.description}
                        </p>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 text-sm mb-2">
                            Deliverables:
                          </h5>
                          <ul className="space-y-1">
                            {stage.deliverables.map((item, idx) => (
                              <li
                                key={idx}
                                className="text-xs text-gray-600 flex items-start gap-1"
                              >
                                <span className="text-[#08273b] mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-3 border-t border-gray-100">
                          <span className="text-xs font-semibold text-[#08273b]">
                            Duration: {stage.duration}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet Timeline */}
          <div className="lg:hidden space-y-4">
            {processStages.map((stage, index) => {
              const Icon = stage.icon;
              const isExpanded = expandedStage === stage.id;

              return (
                <div key={stage.id} className="relative">
                  {/* Connecting line for mobile */}
                  {index < processStages.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-full bg-gray-200">
                      {expandedStage && expandedStage > stage.id && (
                        <div
                          className="w-full bg-[#08273b] transition-all duration-500"
                          style={{ height: "100%" }}
                        />
                      )}
                    </div>
                  )}

                  <div
                    onClick={() => handleStageClick(stage.id)}
                    className={`
                      relative bg-white rounded-xl shadow-md cursor-pointer
                      transition-all duration-300 border-2
                      ${
                        isExpanded
                          ? "border-[#08273b] shadow-xl"
                          : "border-gray-200 hover:border-gray-300"
                      }
                    `}
                  >
                    <div className="p-5">
                      <div className="flex items-center gap-4 mb-3">
                        <div
                          className={`
                          w-16 h-16 rounded-full flex items-center justify-center relative
                          ${
                            isExpanded
                              ? "bg-[#08273b] text-white"
                              : "bg-gray-100"
                          }
                        `}
                          style={{
                            color: isExpanded ? "white" : stage.color,
                          }}
                        >
                          <Icon className="w-7 h-7" />
                          <div
                            className={`
                            absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center
                            text-xs font-bold
                            ${
                              isExpanded
                                ? "bg-[#08273b] text-white"
                                : "bg-gray-200 text-gray-600"
                            }
                          `}
                          >
                            {index + 1}
                          </div>
                        </div>
                        <div>
                          <h4
                            className={`font-bold ${
                              isExpanded ? "text-[#08273b]" : "text-gray-900"
                            }`}
                          >
                            {stage.title}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {stage.duration}
                          </span>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      <div
                        className={`
                        transition-all duration-300 overflow-hidden
                        ${
                          isExpanded
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }
                      `}
                      >
                        <p className="text-sm text-gray-600 leading-relaxed mb-3 mt-3">
                          {stage.description}
                        </p>

                        <div>
                          <h5 className="font-semibold text-gray-900 text-sm mb-2">
                            Deliverables:
                          </h5>
                          <ul className="space-y-1">
                            {stage.deliverables.map((item, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-gray-600 flex items-start gap-2"
                              >
                                <CheckCircle className="w-4 h-4 text-[#08273b] flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 7s linear;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
