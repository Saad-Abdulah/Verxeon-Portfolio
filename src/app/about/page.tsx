"use client";

import Footer from "@/components/shared/Footer";
import {
  Users,
  Target,
  Rocket,
  Globe,
  Eye,
  Check,
  Workflow,
  Code,
  Brain,
  Cloud,
  Layers,
  Clock,
  Award,
  Cpu,
  Factory,
  Gauge,
  Shield,

} from "lucide-react";
import { FaShieldAlt, FaHandsHelping } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

// Floating Orb Component
const FloatingOrb = ({ delay = 0, duration = 20, size = 400, color = "rgba(48, 167, 177, 0.15)", top, left }: { delay?: number; duration?: number; size?: number; color?: string; top?: string; left?: string }) => {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        top: top,
        left: left,
      }}
      animate={{
        x: [0, 100, 0],
        y: [0, -100, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// 3D Tilt Card Componentt
const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {children}
    </motion.div>
  );
};

// Typewriter Effect Component
const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, isInView]);

  return <span ref={elementRef}>{displayText}</span>;
};

const InteractiveAboutSection = () => {
  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

  return (
    <div className="relative overflow-hidden">
      {/* Who We Are Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10 pt-10"
      >
        <TiltCard>
          <div className="bg-white rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.12)] border border-gray-100 p-8 sm:p-10 lg:p-12 relative overflow-hidden group hover:shadow-[0_0_80px_rgba(164,137,108,0.2)] transition-all duration-500">
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-[#08273b]/10 to-transparent animate-pulse"></div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Who We{" "}
              <span
                style={{ color: "#1a6b8f" }}
                className="inline-block hover:scale-110 transition-transform duration-300"
              >
                <TypewriterText text="Are" delay={0.3} />
              </span>
            </motion.h2>

            <div className="space-y-5 sm:space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-700 leading-relaxed text-base sm:text-lg lg:text-xl text-justify hover:text-gray-900 transition-colors duration-300"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Verxeon is a{" "}
                <motion.span
                  className="font-bold relative inline"
                  whileHover={{ scale: 1.05, color: "#1a6b8f" }}
                  transition={{ duration: 0.2 }}
                >
                  specialized Edge AI company
                </motion.span>{" "}
                dedicated to bringing real-time intelligence to industrial
                operations. We optimize and deploy AI models directly at the
                edge - transforming how{" "}
                <motion.span
                  className="font-bold relative inline"
                  whileHover={{ scale: 1.05, color: "#1a6b8f" }}
                  transition={{ duration: 0.2 }}
                >
                  manufacturers, logistics providers, energy operators, and
                  critical infrastructure
                </motion.span>{" "}
                manage their operations in real-time.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-700 leading-relaxed text-base sm:text-lg lg:text-xl text-justify hover:text-gray-900 transition-colors duration-300"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                What sets us apart is our deep expertise in{" "}
                <motion.span
                  className="font-bold relative inline"
                  whileHover={{ scale: 1.05, color: "#1a6b8f" }}
                  transition={{ duration: 0.2 }}
                >
                  model optimization, edge deployment, and Industrial IoT
                  integration
                </motion.span>
                . At Verxeon, we don&apos;t just implement AI; we engineer it to
                thrive in resource-constrained, mission-critical environments
                where cloud latency is unacceptable and data security is
                non-negotiable.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-gray-700 leading-relaxed text-base sm:text-lg lg:text-xl text-justify hover:text-gray-900 transition-colors duration-300"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Our team brings together{" "}
                <motion.span
                  className="font-bold relative inline"
                  whileHover={{ scale: 1.05, color: "#1a6b8f" }}
                  transition={{ duration: 0.2 }}
                >
                  specialized edge AI engineers, industrial systems experts, and
                  IoT integration specialists
                </motion.span>{" "}
                who understand that real intelligence happens at the point of
                action. Every solution we deploy is guided by{" "}
                <motion.span
                  className="font-bold relative inline"
                  whileHover={{ scale: 1.05, color: "#1a6b8f" }}
                  transition={{ duration: 0.2 }}
                >
                  technical precision, industrial-grade reliability, and a
                  commitment to delivering measurable operational impact
                </motion.span>{" "}
                - from reduced downtime to enhanced quality control to
                significant cost savings.
              </motion.p>
            </div>
          </div>
        </TiltCard>
      </motion.div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center rounded-2xl">
          {/* Our Story Content - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-5 w-full"
          >
            <div>
              <motion.h3
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Our{" "}
                <span
                  style={{ color: "#1a6b8f" }}
                  className="inline-block hover:scale-110 transition-transform duration-300"
                >
                  <TypewriterText text="Story" />
                </span>
              </motion.h3>
            </div>

            <TiltCard className="w-full">
              <div className="space-y-4 sm:space-y-5 shadow-[0_0_40px_rgba(0,0,0,0.15)] rounded-2xl p-6 sm:p-8 lg:p-10 bg-white border border-gray-100 relative overflow-hidden group hover:shadow-[0_0_60px_rgba(164,137,108,0.25)] transition-all duration-500">
                {/* Animated corner accents */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#08273b]/20 to-transparent rounded-bl-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-gray-700 leading-relaxed text-base text-justify sm:text-lg lg:text-xl hover:text-gray-900 transition-colors duration-300"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Verxeon was founded to{" "}
                  <motion.span
                    className="font-bold relative inline"
                    whileHover={{ scale: 1.05, color: "#1a6b8f" }}
                    transition={{ duration: 0.2 }}
                  >
                    build world-class Edge AI expertise in Pakistan
                  </motion.span>
                  , serving industries globally.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-gray-700 leading-relaxed text-base text-justify sm:text-lg lg:text-xl hover:text-gray-900 transition-colors duration-300"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  We saw{" "}
                  <motion.span
                    className="font-bold relative inline"
                    whileHover={{ scale: 1.05, color: "#1a6b8f" }}
                    transition={{ duration: 0.2 }}
                  >
                    industries struggling to deploy AI at the edge
                  </motion.span>{" "}
                  and built Verxeon to solve{" "}
                  <motion.span
                    className="font-bold relative inline"
                    whileHover={{ scale: 1.05, color: "#1a6b8f" }}
                    transition={{ duration: 0.2 }}
                  >
                    these challenges
                  </motion.span>
                  .
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-gray-700 leading-relaxed text-base text-justify sm:text-lg lg:text-xl hover:text-gray-900 transition-colors duration-300"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  We now serve{" "}
                  <motion.span
                    className="font-bold relative inline"
                    whileHover={{ scale: 1.05, color: "#1a6b8f" }}
                    transition={{ duration: 0.2 }}
                  >
                    manufacturers and infrastructure across continents
                  </motion.span>
                  , proving{" "}
                  <motion.span
                    className="font-bold relative inline"
                    whileHover={{ scale: 1.05, color: "#1a6b8f" }}
                    transition={{ duration: 0.2 }}
                  >
                    technical excellence knows no borders
                  </motion.span>
                  .
                </motion.p>
              </div>
            </TiltCard>
          </motion.div>

          {/* Story Image - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <motion.div
              className="relative w-full h-[320px] sm:h-[360px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl group"
              whileHover={{ scale: 1.03, rotateY: 5 }}
              transition={{ duration: 0.4 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#08273b]/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Verxeon Story"
                className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center rounded-2xl">
          {/* Vision Image - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full h-full flex items-center justify-center order-2 lg:order-1"
          >
            <motion.div
              className="relative w-full h-[320px] sm:h-[360px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl group"
              whileHover={{ scale: 1.03, rotateY: -5 }}
              transition={{ duration: 0.4 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-l from-[#08273b]/20 to-[#25868e]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop"
                alt="Verxeon Vision"
                className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          </motion.div>

          {/* Vision Content - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-5 w-full order-1 lg:order-2"
          >
            <div>
              <motion.h3
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Our{" "}
                <span
                  style={{ color: "#1a6b8f" }}
                  className="inline-block hover:scale-110 transition-transform duration-300"
                >
                  <TypewriterText text="Vision" />
                </span>
              </motion.h3>
            </div>

            <TiltCard className="w-full">
              <div className="space-y-4 sm:space-y-5 shadow-[0_0_40px_rgba(0,0,0,0.15)] rounded-2xl p-6 sm:p-8 lg:p-10 bg-white border border-gray-100 relative overflow-hidden group hover:shadow-[0_0_60px_rgba(164,137,108,0.25)] transition-all duration-500">
                <motion.div
                  className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#08273b]/20 to-transparent rounded-tr-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-gray-700 leading-relaxed text-base text-justify sm:text-lg lg:text-xl hover:text-gray-900 transition-colors duration-300"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Our vision is to establish Verxeon as the{" "}
                  <motion.span
                    className="font-bold relative inline"
                    whileHover={{ scale: 1.05, color: "#1a6b8f" }}
                    transition={{ duration: 0.2 }}
                  >
                    global leader in Edge AI for industrial operations
                  </motion.span>
                  .
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-gray-700 leading-relaxed text-base text-justify sm:text-lg lg:text-xl hover:text-gray-900 transition-colors duration-300"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  We envision{" "}
                  <motion.span
                    className="font-bold relative inline"
                    whileHover={{ scale: 1.05, color: "#1a6b8f" }}
                    transition={{ duration: 0.2 }}
                  >
                    factories that predict failures, supply chains that optimize
                    in real-time, and energy systems that self-regulate
                  </motion.span>
                  .
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-gray-700 leading-relaxed text-base text-justify sm:text-lg lg:text-xl hover:text-gray-900 transition-colors duration-300"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  We're proving{" "}
                  <motion.span
                    className="font-bold relative inline"
                    whileHover={{ scale: 1.05, color: "#1a6b8f" }}
                    transition={{ duration: 0.2 }}
                  >
                    Pakistan can be a global hub for specialized AI engineering
                  </motion.span>
                  .
                </motion.p>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center rounded-2xl">
          {/* Mission Content - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-5 w-full"
          >
            <div>
              <motion.h3
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Our{" "}
                <span
                  style={{ color: "#1a6b8f" }}
                  className="inline-block hover:scale-110 transition-transform duration-300"
                >
                  <TypewriterText text="Mission" />
                </span>
              </motion.h3>
            </div>

            <TiltCard className="w-full">
              <div className="space-y-4 sm:space-y-5 shadow-[0_0_40px_rgba(0,0,0,0.15)] rounded-2xl p-6 sm:p-8 lg:p-10 bg-white border border-gray-100 relative overflow-hidden group hover:shadow-[0_0_60px_rgba(164,137,108,0.25)] transition-all duration-500">
                <motion.div
                  className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[#08273b]/20 to-transparent rounded-br-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-gray-700 leading-relaxed text-base text-justify sm:text-lg lg:text-xl hover:text-gray-900 transition-colors duration-300"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Our mission is to deliver Edge AI solutions that{" "}
                  <motion.span
                    className="font-bold relative inline"
                    whileHover={{ scale: 1.05, color: "#1a6b8f" }}
                    transition={{ duration: 0.2 }}
                  >
                    transform industrial operations through real-time
                    intelligence
                  </motion.span>
                  .
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-gray-700 leading-relaxed text-base text-justify sm:text-lg lg:text-xl hover:text-gray-900 transition-colors duration-300"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Every project ends with{" "}
                  <motion.span
                    className="font-bold relative inline"
                    whileHover={{ scale: 1.05, color: "#1a6b8f" }}
                    transition={{ duration: 0.2 }}
                  >
                    deployed solutions delivering tangible results
                  </motion.span>
                  . We engineer AI that performs{" "}
                  <motion.span
                    className="font-bold relative inline"
                    whileHover={{ scale: 1.05, color: "#1a6b8f" }}
                    transition={{ duration: 0.2 }}
                  >
                    reliably in harsh production environments
                  </motion.span>
                  .
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-gray-700 leading-relaxed text-base text-justify sm:text-lg lg:text-xl hover:text-gray-900 transition-colors duration-300"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  We build{" "}
                  <motion.span
                    className="font-bold relative inline"
                    whileHover={{ scale: 1.05, color: "#1a6b8f" }}
                    transition={{ duration: 0.2 }}
                  >
                    long-term partnerships
                  </motion.span>{" "}
                  with our clients. We measure our success by{" "}
                  <motion.span
                    className="font-bold relative inline"
                    whileHover={{ scale: 1.05, color: "#1a6b8f" }}
                    transition={{ duration: 0.2 }}
                  >
                    the downtime prevented and competitive advantages our edge
                    intelligence delivers
                  </motion.span>
                  .
                </motion.p>
              </div>
            </TiltCard>
          </motion.div>

          {/* Mission Image - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <motion.div
              className="relative w-full h-[320px] sm:h-[360px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl group"
              whileHover={{ scale: 1.03, rotateY: 5 }}
              transition={{ duration: 0.4 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#08273b]/20 to-[#25868e]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop"
                alt="Verxeon Mission"
                className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true });
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [expandedValue, setExpandedValue] = useState(1);
  const [isValuePaused, setIsValuePaused] = useState(false);
  const [expandedDiff, setExpandedDiff] = useState(1);
  const [isDiffPaused, setIsDiffPaused] = useState(false);

  const stats = [
    {
      number: 50,
      label: "Projects Completed",
      icon: Rocket,
      suffix: "+",
      startFrom: 40,
    },
    {
      number: 10,
      label: "Happy Clients",
      icon: Users,
      suffix: "+",
      startFrom: 8,
    },
    {
      number: 24,
      label: "Support Available",
      icon: Clock,
      suffix: "/7",
      startFrom: 20,
    },
    {
      number: 99.9,
      label: "Client Satisfaction",
      icon: Award,
      suffix: "%",
      startFrom: 97,
    },
  ];

  const coreValues = [
    {
      id: 1,
      icon: Users,
      title: "Client Value",
      description:
        "We strive to exceed our clients expectations and deliver measurable results that positively impact their business.",
      color: "#2563eb", // blue-600
    },
    {
      id: 2,
      icon: FaHandsHelping,
      title: "Solution Driven",
      description:
        "As a solution-driven company, we prioritize the needs and well-being of our employees, customers, and communities.",
      color: "#ef4444", // red-500
    },
    {
      id: 3,
      icon: FaShieldAlt,
      title: "Integrity",
      description:
        "We place a high value on honesty, transparency, and ethical behavior, maintaining a high level of trust with our employees and other stakeholders.",
      color: "#16a34a", // green-600
    },
    {
      id: 4,
      icon: Award,
      title: "Accountability",
      description:
        "We value taking responsibility for our actions and outcomes, and holding ourselves accountable for our performance.",
      color: "#9333ea", // purple-600
    },
    {
      id: 5,
      icon: Workflow,
      title: "Collaboration",
      description:
        "Collaboration fuels innovation and progress among us by bringing together diverse backgrounds & skill sets toward a common goal.",
      color: "#f97316", // orange-500
    },
    {
      id: 6,
      icon: Rocket,
      title: "Innovation",
      description:
        "We continuously push boundaries and embrace new technologies to create cutting-edge solutions that drive business transformation.",
      color: "#2087a1ff", // indigo-600
    },
  ];

  const differentiators = [
    {
      id: 1,
      icon: Cpu,
      title: "Edge-First Architecture",
      color: "#2563eb",
      description:
        "While others retrofit cloud models for edge, we architect AI specifically for edge deployment from the ground up. Our solutions are designed for resource constraints, real-time performance, and offline operation - ensuring your intelligence works where and when you need it most.",
    },
    {
      id: 2,
      icon: Factory,
      title: "Industrial Operations Expertise",
      color: "#ef4444",
      description:
        "We understand factory floors, not just algorithms. Our team combines AI engineering with deep knowledge of industrial protocols, operational technology, and the harsh realities of production environments - ensuring solutions that actually work in real-world conditions.",
    },
    {
      id: 3,
      icon: Gauge,
      title: "Performance-Proven Optimization",
      color: "#16a34a",
      description:
        "We don't compromise on accuracy for speed. Through advanced quantization, pruning, and compression techniques, we achieve sub-10ms inference times while maintaining 90%+ model accuracy - proven across hundreds of edge deployments in demanding industrial settings.",
    },
    {
      id: 4,
      icon: Shield,
      title: "End-to-End Edge Solutions",
      color: "#9333ea",
      description:
        "Unlike consultants who only optimize models or integrators who only deploy hardware, we deliver complete solutions - from model optimization to edge infrastructure, IoT integration to monitoring systems. One partner, full accountability, measurable results.",
    },
  ];

  useEffect(() => {
    if (isDiffPaused) return;

    const interval = setInterval(() => {
      setExpandedDiff((prev) =>
        prev >= differentiators.length ? 1 : prev + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [isDiffPaused]);

  const handleDiffClick = (id: number) => {
    setExpandedDiff(id);
    setIsDiffPaused(true);
    setTimeout(() => setIsDiffPaused(false), 7000);
  };

  useEffect(() => {
    if (isValuePaused) return;

    const interval = setInterval(() => {
      setExpandedValue((prev) => (prev >= coreValues.length ? 1 : prev + 1));
    }, 7000);

    return () => clearInterval(interval);
  }, [isValuePaused]);

  const handleValueClick = (id: number) => {
    setExpandedValue(id);
    setIsValuePaused(true);
    setTimeout(() => setIsValuePaused(false), 7000);
  };

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);

      // Set initial counts to start values
      setCounts(stats.map((stat) => stat.startFrom));

      // Start animation after a small delay
      setTimeout(() => {
        const duration = 2000; // 2 seconds for smoother animation
        const steps = 60;
        const stepDuration = duration / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
          currentStep++;

          setCounts((prevCounts) =>
            prevCounts.map((prev, index) => {
              const target = stats[index].number;
              const start = stats[index].startFrom;
              const progress = currentStep / steps;
              const currentValue = start + (target - start) * progress;

              return Math.min(currentValue, target);
            })
          );

          if (currentStep >= steps) {
            clearInterval(timer);
            // Ensure final values are exact
            setCounts(stats.map((stat) => stat.number));
          }
        }, stepDuration);
      }, 200); // Small delay to ensure smooth start
    }
  }, [isInView, hasAnimated, stats]);

  // Fallback: Start animation after component mounts if viewport detection fails
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!hasAnimated) {
        setHasAnimated(true);
        setCounts(stats.map((stat) => stat.startFrom));

        setTimeout(() => {
          const duration = 2000;
          const steps = 60;
          const stepDuration = duration / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;

            setCounts((prevCounts) =>
              prevCounts.map((prev, index) => {
                const target = stats[index].number;
                const start = stats[index].startFrom;
                const progress = currentStep / steps;
                const currentValue = start + (target - start) * progress;

                return Math.min(currentValue, target);
              })
            );

            if (currentStep >= steps) {
              clearInterval(timer);
              setCounts(stats.map((stat) => stat.number));
            }
          }, stepDuration);
        }, 200);
      }
    }, 1000); // 1 second fallback

    return () => clearTimeout(fallbackTimer);
  }, [hasAnimated, stats]);

  // Reset animation state when component unmounts
  useEffect(() => {
    return () => {
      setHasAnimated(false);
      setCounts([0, 0, 0, 0]);
    };
  }, []);

  return (
    <main className="min-h-screen bg-page-background">
      {/* Hero Section with Background */}
      <section className="relative overflow-hidden min-h-screen flex flex-col justify-between">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/About/Hand-shake.jpeg"
            alt="Verxeon Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Main Content Overlay - Single Grid Box - REVERTED TO PREVIOUS POSITION */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 pt-32 sm:pt-48 md:pt-64 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 w-[95%] sm:w-[90%] md:w-[85%] mx-auto min-h-[15vh] sm:min-h-[12vh] md:min-h-[10vh] flex flex-col justify-center"
            style={{ border: "1px solid #1a6b8f" }}
          >
            {/* About Us Header */}
            <div className="mb-2">
              <h3
                className="text-sm md:text-base font-semibold tracking-widest uppercase mb-4"
                style={{ color: "#1a6b8f" }}
              >
                ABOUT US
              </h3>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                Intelligence at the{" "}
                <span style={{ color: "#1a6b8f" }}>Edge</span>, Impact at{" "}
                <span style={{ color: "#1a6b8f" }}>Scale</span>
              </h1>
            </div>

            {/* Description */}
            <div className="mb-4">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed">
                At <span style={{ color: "#1a6b8f" }}>Verxeon</span>, we
                engineer{" "}
                <span style={{ color: "#1a6b8f" }}>
                  edge-optimized AI solutions for point of actions
                </span>
                . Our expertise in{" "}
                <span style={{ color: "#1a6b8f" }}>
                  model compression, edge deployment, and Industrial IoT
                  integration
                </span>{" "}
                enables businesses to process intelligence locally - achieving{" "}
                <span style={{ color: "#1a6b8f" }}>
                  real-time performance, enhanced security, and significant cost
                  savings
                </span>
                .
              </p>
            </div>

            {/* Get in Touch Button */}
            <div>
              <Link
                href="/contact"
                className="inline-block text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: "#1a6b8f",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1a6b8f";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#1a6b8f";
                }}
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section that scrolls over the fixed background */}
      <section className="relative z-10 bg-white min-h-screen">
        <div className="max-w-6xl flex flex-col items-center mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24">
          {/* Who We Are Section */}
          <InteractiveAboutSection />

          {/* What Makes Us Different Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-justify"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Makes Us <span style={{ color: "#1a6b8f" }}>Different</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              We don&apos;t just optimize models - we engineer{" "}
              <span className="text-[#08273b]">complete Edge AI solutions</span>{" "}
              that{" "}
              <span className="text-[#08273b]">
                integrate seamlessly with industrial operations
              </span>{" "}
              and deliver{" "}
              <span className="text-[#08273b]">
                measurable results from day one
              </span>
              .
            </p>
          </motion.div>

          {/* Differentiators Grid */}
          {/* Desktop: Split Layout, Mobile: Accordion */}
          <div className="mb-16 sm:mb-20 px-4 sm:px-0">
            {/* Mobile Accordion (hidden on lg and above) */}
            <div className="flex flex-col gap-3 lg:hidden">
              {differentiators.map((item) => {
                const Icon = item.icon;
                const isExpanded = expandedDiff === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => handleDiffClick(item.id)}
                    className={`
                      relative overflow-hidden rounded-2xl bg-white border-2 cursor-pointer
                      transition-all duration-500 ease-in-out
                      ${
                        isExpanded
                          ? "shadow-xl"
                          : "border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg"
                      }
                    `}
                    style={{
                      borderColor: isExpanded ? "#08273b" : undefined,
                    }}
                  >
                    <div className={`p-6`}>
                      {/* Header */}
                      <div
                        className={`flex items-center gap-4 ${
                          isExpanded ? "mb-4" : ""
                        }`}
                      >
                        <div
                          className={`
                            rounded-xl flex items-center justify-center transition-all duration-500
                            ${
                              isExpanded
                                ? "text-white w-12 h-12"
                                : "bg-gray-100 w-10 h-10"
                            }
                          `}
                          style={{
                            backgroundColor: isExpanded ? "#08273b" : undefined,
                            color: isExpanded ? "white" : item.color,
                          }}
                        >
                          <Icon
                            className={isExpanded ? "w-6 h-6" : "w-5 h-5"}
                          />
                        </div>
                        <h3
                          className={`
                            font-bold transition-all duration-500
                            ${
                              isExpanded
                                ? "text-lg text-gray-900"
                                : "text-base text-gray-700"
                            }
                          `}
                          style={{
                            fontFamily: "Open Sauce, sans-serif",
                            fontWeight: 600,
                          }}
                        >
                          {item.title}
                        </h3>
                      </div>

                      {/* Expanded Content */}
                      <div
                        className={`
                transition-all duration-500 overflow-hidden
                ${
                  isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }
              `}
                      >
                        <p
                          className="text-gray-700 leading-relaxed text-sm"
                          style={{ fontFamily: "Roboto, sans-serif" }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Progress indicator */}
                    {isExpanded && !isDiffPaused && (
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                        <div
                          className="h-full animate-progress"
                          style={{ backgroundColor: "#08273b" }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop Split Layout (hidden on mobile) */}
            <div className="hidden lg:flex gap-8">
              {/* Left Side - Clickable Items */}
              <div className="w-1/2 flex flex-col gap-4">
                {differentiators.map((item) => {
                  const Icon = item.icon;
                  const isExpanded = expandedDiff === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                      onClick={() => handleDiffClick(item.id)}
                      className={`
              cursor-pointer bg-white rounded-2xl p-6 border-2 transition-all duration-300
              ${
                isExpanded
                  ? "shadow-xl scale-105"
                  : "shadow-lg hover:shadow-xl hover:scale-[1.02] border-gray-200"
              }
            `}
                      style={{
                        borderColor: isExpanded ? "#08273b" : undefined,
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`
                            rounded-xl flex items-center justify-center transition-all duration-300
                            ${
                              isExpanded
                                ? "w-14 h-14 text-white"
                                : "bg-gray-100 w-12 h-12 text-[#08273b]"
                            }
                          `}
                          style={{
                            backgroundColor: isExpanded ? "#08273b" : undefined,
                            color: isExpanded ? "white" : item.color,
                          }}
                        >
                          <Icon
                            className={isExpanded ? "w-7 h-7" : "w-6 h-6"}
                          />
                        </div>
                        <h3
                          className={`
                            font-bold transition-all duration-300
                            ${
                              isExpanded
                                ? "text-xl text-[#08273b]"
                                : "text-lg text-gray-900"
                            }
                          `}
                          style={{
                            fontFamily: "Open Sauce, sans-serif",
                            fontWeight: 600,
                          }}
                        >
                          {item.title}
                        </h3>
                      </div>

                      {/* Progress indicator for active item */}
                      {isExpanded && !isDiffPaused && (
                        <div className="mt-4 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full animate-progress"
                            style={{ backgroundColor: "#08273b" }}
                          />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Right Side - Expanded Content */}
              <div className="w-1/2">
                <motion.div
                  key={expandedDiff}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl p-8 shadow-xl border-2 h-full flex flex-col justify-center"
                  style={{ borderColor: "#08273b" }}
                >
                  {(() => {
                    const item = differentiators.find(
                      (d) => d.id === expandedDiff
                    );
                    if (!item) return null;
                    const Icon = item.icon;
                    return (
                      <>
                        <div className="flex items-center gap-4 mb-6">
                          <div
                            className="w-16 h-16 rounded-xl flex items-center justify-center text-white"
                            style={{ backgroundColor: "#08273b" }}
                          >
                            <Icon className="w-8 h-8" />
                          </div>
                          <h3
                            className="text-2xl font-bold text-gray-900"
                            style={{
                              fontFamily: "Open Sauce, sans-serif",
                              fontWeight: 600,
                            }}
                          >
                            {item.title}
                          </h3>
                        </div>
                        <p
                          className="text-gray-700 leading-relaxed text-lg"
                          style={{ fontFamily: "Roboto, sans-serif" }}
                        >
                          {item.description}
                        </p>
                      </>
                    );
                  })()}
                </motion.div>
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
          `}</style>

          {/* Additional Content - removed per user request */}
        </div>
      </section>

      {/* Core Values Section - MOVED DOWN */}
      <section className="py-10 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Core Values That Drive Our Brand{" "}
              <span style={{ color: "#1a6b8f" }}>Forward</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Our values serve as a{" "}
              <span className="text-[#08273b]">guiding force</span> for the
              company&apos;s{" "}
              <span className="text-[#08273b]">
                actions, decisions, and interactions
              </span>
              .
            </p>
          </motion.div>

          {/* Expandable Core Values Accordion */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-2 lg:gap-3">
            {coreValues.map((value) => {
              const Icon = value.icon;
              const isExpanded = expandedValue === value.id;

              return (
                <div
                  key={value.id}
                  onClick={() => handleValueClick(value.id)}
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
                      !isExpanded ? "md:min-h-[200px]" : ""
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
                          color: isExpanded ? "white" : value.color,
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
                        style={{
                          fontFamily: "Open Sauce, sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {value.title}
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
                      <p
                        className="text-gray-600 leading-relaxed text-sm md:text-base"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                        }}
                      >
                        {value.description}
                      </p>
                    </div>

                    {/* Vertical title for collapsed state on desktop */}
                    {!isExpanded && (
                      <div className="hidden md:block absolute left-0 right-0 bottom-12 flex justify-center">
                        <p
                          className="transform -rotate-90 whitespace-nowrap font-bold text-gray-700 text-sm lg:text-base"
                          style={{
                            fontFamily: "Open Sauce, sans-serif",
                            fontWeight: 600,
                          }}
                        >
                          {value.title}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Progress indicator for expanded item */}
                  {isExpanded && !isValuePaused && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                      <div
                        className="h-full animate-progress"
                        style={{ backgroundColor: "#08273b" }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
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
        `}</style>
      </section>

      {/* Vision & Mission Section - removed per user request */}

      {/* Future Vision Section - removed per user request */}

      {/* Looking Ahead Section - removed per user request */}

      {/* Founder Message Section */}
      <section className="pb-20 relative bg-white">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-justify"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Message from the Founder &{" "}
              <span style={{ color: "#1a6b8f" }}>CEO</span>
            </h2>
            <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] border border-gray-100 rounded-2xl p-4 sm:p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
              <div className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
                  {/* CEO Photo - Left */}

                  {/* Message Content - Right */}
                  <div className="lg:col-span-2">
                    <blockquote
                      className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6 font-titillium"
                      style={{
                        fontFamily:
                          'var(--font-titillium), "Titillium Web", sans-serif !important',
                        fontWeight: 400,
                      }}
                    >
                      <div
                        className="font-titillium"
                        style={{
                          fontFamily:
                            'var(--font-titillium), "Titillium Web", sans-serif !important',
                        }}
                      >
                        At Verxeon, we believe Edge AI should be accessible to
                        industrial operations of every scale. We optimize models
                        for real-world conditions and integrate seamlessly
                        without disrupting operations.
                        <br />
                        Our commitment is straightforward: deliver solutions
                        that perform as promised, with measurable results. We&apos;re
                        building Verxeon to be the trusted partner for
                        mission-critical edge intelligence - proving that
                        world-class AI expertise can emerge from anywhere.
                      </div>
                    </blockquote>

                    {/* Founder credits inside the message card */}
                    <div className="mt-4 text-center">
                      <p className="text-sm sm:text-base text-[#08273b]">
                        Founder & CEO
                      </p>
                      <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                        Amir Shahzad
                      </p>
                    </div>

                    {/* <p 
                      className="text-2xl font-bold text-gray-900"
                      style={{
                        fontFamily: 'Open Sauce, sans-serif',
                        fontWeight: 600,
                      }}
                    >
                      Amir Shahzad
                    </p> */}
                  </div>
                  <div className="lg:col-span-1 flex justify-center items-center">
                    <div className="relative w-full max-w-sm lg:max-w-none">
                      <Image
                        src="/About/Amir-no-bg.png"
                        alt="Amir Shahzad - Founder & CEO"
                        width={400}
                        height={500}
                        className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto object-contain rounded-2xl shadow shadow-[#08273b] transition-all duration-300 "
                        style={{
                          // Mobile: width according to outer box with minimal margin
                          // Large devices: height according to outer box, centered vertically
                          maxHeight: "clamp(300px, 50vh, 600px)",
                          minHeight: "260px",
                        }}
                      />

                      {/* Fallback if image fails to load */}
                      <div className="hidden w-full h-64 lg:h-80 rounded-2xl flex items-center justify-center text-white text-4xl font-bold border-2 border-gray-200 shadow-2xl">
                        AS
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - removed per user request */}

      <Footer />
    </main>
  );
};

export default AboutPage;
