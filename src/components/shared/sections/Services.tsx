"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  Zap,
  Puzzle,
  Bot,
  BarChart3,
  Megaphone,
  Search,
  Palette,
  Cloud,
  GitBranch,
  Cpu,
  Gauge, Eye,
  Wrench, BarChart
} from "lucide-react";

type Benefit = { title: string; text: React.ReactNode };
type Service = {
  key: string;
  name: string;
  color: string;
  description: React.ReactNode;
  benefits: Benefit[];
  icon: React.ComponentType<any>;
};

const SERVICES: Service[] = [
  {
    key: "edge-ai-optimization-deployment",
    name: "Edge AI Optimization & Deployment",
    icon: Cpu,
    color: "#dc2626",
    description: (
      <>
        At <strong>Verxeon</strong>, we transform{" "}
        <span style={{ color: "#000" }}>complex AI models</span> into{" "}
        <span style={{ color: "#000" }}>edge-ready solutions</span> through{" "}
        <span style={{ color: "#000" }}>quantization</span>,{" "}
        <span style={{ color: "#000" }}>pruning</span>, and{" "}
        <span style={{ color: "#000" }}>compression</span>. Our optimization
        ensures your AI runs efficiently on{" "}
        <span style={{ color: "#000" }}>resource-constrained hardware</span>{" "}
        without sacrificing{" "}
        <span style={{ color: "#000" }}>accuracy or performance</span>.
      </>
    ),
    benefits: [
      {
        title: "Model Compression",
        text: (
          <>
            Reduce model size by up to{" "}
            <span style={{ color: "#08273b" }}>90%</span> while maintaining
            accuracy.
          </>
        ),
      },
      {
        title: "Hardware Optimization",
        text: (
          <>
            Deploy on <span style={{ color: "#08273b" }}>NVIDIA Jetson</span>,{" "}
            <span style={{ color: "#08273b" }}>Raspberry Pi</span>, and
            industrial edge devices.
          </>
        ),
      },
      {
        title: "Sub-10ms Latency",
        text: (
          <>
            Achieve{" "}
            <span style={{ color: "#08273b" }}>real-time inference</span> for
            time-critical applications.
          </>
        ),
      },
      {
        title: "Framework Flexibility",
        text: (
          <>
            Support for{" "}
            <span style={{ color: "#08273b" }}>TensorFlow Lite</span>,{" "}
            <span style={{ color: "#08273b" }}>ONNX</span>, and{" "}
            <span style={{ color: "#08273b" }}>PyTorch Mobile</span>.
          </>
        ),
      },
    ],
  },
  {
    key: "industrial-iot-integration",
    name: "Industrial IoT Integration",
    icon: Puzzle,
    color: "#9333ea",
    description: (
      <>
        At <strong>Verxeon</strong>, we seamlessly integrate{" "}
        <span style={{ color: "#000" }}>Edge AI</span> with your existing{" "}
        <span style={{ color: "#000" }}>industrial systems</span>,{" "}
        <span style={{ color: "#000" }}>sensors</span>, and{" "}
        <span style={{ color: "#000" }}>operational technology</span>. Our
        solutions work with{" "}
        <span style={{ color: "#000" }}>legacy protocols</span> and modern{" "}
        <span style={{ color: "#000" }}>IoT platforms</span>, ensuring minimal
        disruption to your operations.
      </>
    ),
    benefits: [
      {
        title: "Protocol Support",
        text: (
          <>
            Compatible with <span style={{ color: "#08273b" }}>MQTT</span>,{" "}
            <span style={{ color: "#08273b" }}>OPC-UA</span>,{" "}
            <span style={{ color: "#08273b" }}>Modbus</span>, and industrial
            standards.
          </>
        ),
      },
      {
        title: "Legacy Integration",
        text: (
          <>
            Bridge <span style={{ color: "#08273b" }}>older systems</span> with
            modern Edge AI capabilities.
          </>
        ),
      },
      {
        title: "Sensor Fusion",
        text: (
          <>
            Combine data from{" "}
            <span style={{ color: "#08273b" }}>multiple sensors</span> for
            comprehensive insights.
          </>
        ),
      },
      {
        title: "Minimal Downtime",
        text: (
          <>
            <span style={{ color: "#08273b" }}>Parallel deployment</span>{" "}
            ensures continuous operations.
          </>
        ),
      },
    ],
  },
  {
    key: "predictive-maintenance-monitoring",
    name: "Predictive Maintenance & Monitoring",
    icon: Gauge,
    color: "#f97316",
    description: (
      <>
        At <strong>Verxeon</strong>, we deploy{" "}
        <span style={{ color: "#000" }}>Edge AI models</span> that predict{" "}
        <span style={{ color: "#000" }}>equipment failures</span> before they
        happen. Our <span style={{ color: "#000" }}>real-time monitoring</span>{" "}
        analyzes vibration, temperature, and operational patterns to prevent{" "}
        <span style={{ color: "#000" }}>costly downtime</span> and optimize{" "}
        <span style={{ color: "#000" }}>maintenance schedules</span>.
      </>
    ),
    benefits: [
      {
        title: "Failure Prediction",
        text: (
          <>
            Detect <span style={{ color: "#08273b" }}>anomalies</span> days or
            weeks before equipment fails.
          </>
        ),
      },
      {
        title: "Downtime Reduction",
        text: (
          <>
            Cut unplanned downtime by up to{" "}
            <span style={{ color: "#08273b" }}>45%</span> with proactive alerts.
          </>
        ),
      },
      {
        title: "Real-Time Alerts",
        text: (
          <>
            Instant <span style={{ color: "#08273b" }}>notifications</span> for
            critical conditions on edge devices.
          </>
        ),
      },
      {
        title: "Cost Savings",
        text: (
          <>
            Optimize{" "}
            <span style={{ color: "#08273b" }}>maintenance budgets</span> with
            data-driven scheduling.
          </>
        ),
      },
    ],
  },
  {
    key: "computer-vision-quality-control",
    name: "Computer Vision for Quality Control",
    icon: Eye,
    color: "#2087a1ff",
    description: (
      <>
        At <strong>Verxeon</strong>, we implement{" "}
        <span style={{ color: "#000" }}>Edge-based computer vision</span> for
        automated <span style={{ color: "#000" }}>quality inspection</span>. Our
        solutions detect{" "}
        <span style={{ color: "#000" }}>defects, anomalies</span>, and{" "}
        <span style={{ color: "#000" }}>non-conformities</span> in real-time at{" "}
        <span style={{ color: "#000" }}>production speed</span>, ensuring
        consistent quality without slowing operations.
      </>
    ),
    benefits: [
      {
        title: "Defect Detection",
        text: (
          <>
            Identify{" "}
            <span style={{ color: "#08273b" }}>microscopic defects</span> with
            99%+ accuracy.
          </>
        ),
      },
      {
        title: "Production Speed",
        text: (
          <>
            Inspect at <span style={{ color: "#08273b" }}>line speed</span>{" "}
            without bottlenecks.
          </>
        ),
      },
      {
        title: "Zero Cloud Dependency",
        text: (
          <>
            Process <span style={{ color: "#08273b" }}>images locally</span> for
            instant decisions.
          </>
        ),
      },
      {
        title: "Quality Consistency",
        text: (
          <>
            Eliminate <span style={{ color: "#08273b" }}>human error</span> and
            inspection variability.
          </>
        ),
      },
    ],
  },
  {
    key: "edge-infrastructure-devops",
    name: "Edge Infrastructure & DevOps",
    icon: GitBranch,
    color: "#2563eb",
    description: (
      <>
        At <strong>Verxeon</strong>, we build and manage{" "}
        <span style={{ color: "#000" }}>robust edge infrastructure</span> with{" "}
        <span style={{ color: "#000" }}>automated deployment pipelines</span>.
        Our <span style={{ color: "#000" }}>DevOps practices</span> ensure your{" "}
        <span style={{ color: "#000" }}>edge devices</span> stay updated,
        secure, and performant across distributed industrial environments.
      </>
    ),
    benefits: [
      {
        title: "OTA Updates",
        text: (
          <>
            Deploy <span style={{ color: "#08273b" }}>model updates</span>{" "}
            remotely across thousands of devices.
          </>
        ),
      },
      {
        title: "Device Management",
        text: (
          <>
            Centralized <span style={{ color: "#08273b" }}>monitoring</span> and
            control of edge fleet.
          </>
        ),
      },
      {
        title: "Containerization",
        text: (
          <>
            <span style={{ color: "#08273b" }}>Docker</span> and{" "}
            <span style={{ color: "#08273b" }}>Kubernetes</span> for edge
            orchestration.
          </>
        ),
      },
      {
        title: "Automated Rollback",
        text: (
          <>
            <span style={{ color: "#08273b" }}>Fail-safe deployments</span> with
            instant recovery.
          </>
        ),
      },
    ],
  },
  {
    key: "real-time-analytics-edge",
    name: "Real-Time Analytics at Edge",
    icon: BarChart,
    color: "#16a34a",
    description: (
      <>
        At <strong>Verxeon</strong>, we enable{" "}
        <span style={{ color: "#000" }}>instant data processing</span> and{" "}
        <span style={{ color: "#000" }}>analytics</span> directly on{" "}
        <span style={{ color: "#000" }}>edge devices</span>. Our solutions
        deliver <span style={{ color: "#000" }}>real-time insights</span>{" "}
        without cloud latency, empowering{" "}
        <span style={{ color: "#000" }}>immediate decision-making</span> for
        time-sensitive industrial operations.
      </>
    ),
    benefits: [
      {
        title: "Zero Latency",
        text: (
          <>
            Process and analyze data{" "}
            <span style={{ color: "#08273b" }}>locally</span> in milliseconds.
          </>
        ),
      },
      {
        title: "Bandwidth Savings",
        text: (
          <>
            Reduce cloud data transfer by up to{" "}
            <span style={{ color: "#08273b" }}>80%</span>.
          </>
        ),
      },
      {
        title: "Edge Dashboards",
        text: (
          <>
            <span style={{ color: "#08273b" }}>Local visualization</span> of
            critical metrics and KPIs.
          </>
        ),
      },
      {
        title: "Offline Operation",
        text: (
          <>
            Continue analytics even without{" "}
            <span style={{ color: "#08273b" }}>internet connectivity</span>.
          </>
        ),
      },
    ],
  },
  {
    key: "specialized-edge-solutions",
    name: "Specialized Edge Solutions",
    icon: Wrench,
    color: "#ef4444",
    description: (
      <>
        At <strong>Verxeon</strong>, we engineer{" "}
        <span style={{ color: "#000" }}>custom Edge AI solutions</span> tailored
        to your unique{" "}
        <span style={{ color: "#000" }}>industrial challenges</span>. From{" "}
        <span style={{ color: "#000" }}>energy optimization</span> to{" "}
        <span style={{ color: "#000" }}>safety monitoring</span>, we design
        end-to-end systems that address your specific{" "}
        <span style={{ color: "#000" }}>operational needs</span> with Edge
        intelligence.
      </>
    ),
    benefits: [
      {
        title: "Custom Workflows",
        text: (
          <>
            <span style={{ color: "#08273b" }}>Tailored solutions</span> for
            unique industry requirements.
          </>
        ),
      },
      {
        title: "Domain Expertise",
        text: (
          <>
            Experience across{" "}
            <span style={{ color: "#08273b" }}>manufacturing</span>,{" "}
            <span style={{ color: "#08273b" }}>logistics</span>, and{" "}
            <span style={{ color: "#08273b" }}>energy</span>.
          </>
        ),
      },
      {
        title: "End-to-End Delivery",
        text: (
          <>
            From <span style={{ color: "#08273b" }}>concept to deployment</span>{" "}
            with full support.
          </>
        ),
      },
      {
        title: "Scalable Architecture",
        text: (
          <>
            Solutions that <span style={{ color: "#08273b" }}>grow</span> with
            your business needs.
          </>
        ),
      },
    ],
  },
];

const Services: React.FC = () => {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const service = SERVICES[active];
  const Icon = service.icon;

  // Auto-rotate logic
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % SERVICES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // 3D Tilt effect for main card
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 300,
    damping: 30,
  });

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl w-full md:w-3/4 mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Services We <span style={{ color: "#1a6b8f" }}>Offer</span>
        </h2>

        <div className="relative">
          {/* Left list (absolute overlay with animation) */}
          <motion.aside
            className="bg-[#08273b] text-white rounded-sm shadow-2xl p-4 lg:absolute lg:-left-4 lg:-top-6 lg:w-[300px] lg:z-10 relative"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/*<div className="absolute left-2 top-4 bottom-4">
              <div className="relative h-full flex flex-col justify-between">
                
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-600 -translate-x-1/2" />
                
                {SERVICES.map((_, idx) => (
                  <motion.div
                    key={idx}
                    className="relative z-10 flex items-center justify-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: active === idx ? 1.4 : 0.8,
                      opacity: 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`w-3 h-3 rounded-full border-2 cursor-pointer transition-all duration-300 ${
                        active === idx
                          ? "border-[#08273b] shadow-lg shadow-[#08273b]/50"
                          : "bg-[#08273b] border-gray-400 hover:border-[#08273b]"
                      }`}
                      style={{
                        backgroundColor: active === idx ? SERVICES[idx].color : "#08273b"
                      }}
                      onClick={() => setActive(idx)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            */}

            {/*hy*/}
            <motion.ul
              className="space-y-1"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.15 },
                },
              }}
            >
              {SERVICES.map((s, idx) => {
                const ServiceIcon = s.icon;
                return (
                  <motion.li
                    key={s.key}
                    className="relative"
                    variants={{
                      hidden: { opacity: 0, y: 6 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    {active === idx && (
                      <motion.span
                        layoutId="activeService"
                        className="absolute inset-y-0 left-2 lg:-right-8 right-2 bg-[#1a6b8f] rounded-sm shadow-md shadow-[#08273b] z-0"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    <button
                      className={`relative z-10 w-full text-left rounded-md px-4 py-2 text-sm md:text-md/6 transition-all flex items-center gap-2 ${
                        active === idx ? "text-white" : "hover:bg-white/10"
                      }`}
                      onClick={() => setActive(idx)}
                    >
                      <motion.div
                        animate={{
                          rotate: active === idx ? 360 : 0,
                          scale: active === idx ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.5 }}
                        style={{
                          color: active === idx ? "text-white" : s.color,
                        }}
                      >
                        <ServiceIcon className="w-4 h-4 flex-shrink-0" />
                      </motion.div>
                      <span
                        className={active === idx ? "text-white" : "text-white"}
                      >
                        {s.name}
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.aside>

          {/* Right detail with 3D tilt effect */}
          <motion.main
            ref={cardRef}
            className="bg-white rounded-sm shadow-[0_25px_70px_rgba(10,35,60,0.5)] p-6 md:p-8 lg:pl-[340px] min-h-[480px] md:min-h-[540px] lg:min-h-[510px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.25 }}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            onMouseEnter={() => setIsPaused(true)}
          >
            <div className="lg:-ml-6">
              <div className="lg:flex lg:items-center lg:gap-4">
                {/* Large animated icon */}
                <motion.div
                  key={service.key}
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.1,
                  }}
                  className="mb-4"
                >
                  <div className="inline-flex p-3 bg-gradient-to-br from-[#08273b] to-[#25868e] rounded-lg shadow-lg">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                </motion.div>

                <motion.h3
                  key={`title-${service.key}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl font-bold text-gray-900 mb-3"
                >
                  {service.name}
                </motion.h3>
              </div>

              <motion.p
                key={`desc-${service.key}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm md:text-base text-gray-600 mb-5"
              >
                {service.description}
              </motion.p>
            </div>

            <motion.h4
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg font-semibold text-gray-900 mb-3"
            >
              Business Benefits of Choosing Us
            </motion.h4>

            <motion.ul
              key={`benefits-${service.key}`}
              className="space-y-5"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.5 },
                },
              }}
            >
              {service.benefits.map((b, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <motion.span
                    className="mt-3 h-2 w-2 rounded-full inline-block"
                    style={{ background: "#08273b" }}
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-base md:text-lg">
                      {b.title}
                    </h4>
                    <p className="text-gray-600 text-sm md:text-md font-semibold">
                      {b.text}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.main>
        </div>
      </div>
    </section>
  );
};

export default Services;
