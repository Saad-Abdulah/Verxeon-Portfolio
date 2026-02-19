'use client'

import Footer from '@/components/shared/Footer'
import { motion } from 'framer-motion'
import { ArrowLeft, Eye, ExternalLink, Code, Globe, Brain, Shield, Cloud, Loader2, Code2, Calendar, Users, Target, Award, Check, Sparkles, Building, TrendingUp, Zap, CheckCircle } from 'lucide-react'
import { AiOutlineSolution } from "react-icons/ai";
import { TiTickOutline } from "react-icons/ti";
import {
  FaIndustry,
  FaBuilding,
  FaTruck,
  FaBolt,
  FaCar,
  FaRocket,
  FaHeartbeat,
} from "react-icons/fa";
import { FaCloudArrowUp, FaBrain } from 'react-icons/fa6'


import Link from 'next/link'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { formatTextWithLineBreaks } from '@/lib/utils'

interface Industry {
  $id: string
  name: string
  longDescription: string
  category: string
  features: string[]
  color: string
  icon: any
  rating: number
  reviews: number
  price: string
  deliveryTime: string
  projects?: any[]
}

const INDUSTRIES = [
  {
    $id: "smart-manufacturing",
    name: "Smart Manufacturing",
    icon: "FaIndustry",
    longDescription:
      "We deploy Edge AI solutions that transform manufacturing operations with real-time quality control, predictive maintenance, and production optimization - bringing intelligence directly to your factory floor.",
    features: [
      "Computer Vision Quality Inspection",
      "Predictive Maintenance & Monitoring",
      "Production Line Optimization",
      "Real-Time Defect Detection",
      "Equipment Performance Analytics",
      "Energy Consumption Optimization",
      "Worker Safety Monitoring",
      "Inventory & Asset Tracking",
    ],
  },
  {
    $id: "logistics-supply-chain",
    name: "Logistics & Supply Chain",
    icon: "FaTruck",
    longDescription:
      "We enable intelligent logistics with Edge AI solutions for real-time tracking, route optimization, and warehouse automation - ensuring your supply chain operates with maximum efficiency and minimal latency.",
    features: [
      "Real-Time Asset Tracking",
      "Warehouse Automation & Robotics",
      "Route Optimization & Fleet Management",
      "Predictive Demand Forecasting",
      "Inventory Management at Edge",
      "Package Inspection & Sorting",
      "Cold Chain Monitoring",
      "Last-Mile Delivery Optimization",
    ],
  },
  {
    $id: "energy-utilities",
    name: "Energy & Utilities",
    icon: "FaBolt",
    longDescription:
      "We power energy infrastructure with Edge AI for grid monitoring, predictive maintenance, and consumption optimization - enabling utilities to operate more efficiently while reducing downtime and energy waste.",
    features: [
      "Smart Grid Monitoring",
      "Predictive Equipment Maintenance",
      "Energy Consumption Analytics",
      "Renewable Energy Optimization",
      "Power Quality Monitoring",
      "Fault Detection & Isolation",
      "Demand Response Management",
      "Infrastructure Health Monitoring",
    ],
  },
  {
    $id: "automotive-transportation",
    name: "Automotive & Transportation",
    icon: "FaCar",
    longDescription:
      "We accelerate automotive innovation with Edge AI solutions for vehicle diagnostics, fleet management, and autonomous systems - processing critical data at the edge for safety-critical, real-time decision-making.",
    features: [
      "Fleet Management & Telematics",
      "Predictive Vehicle Maintenance",
      "Real-Time Diagnostics at Edge",
      "Driver Behavior Analytics",
      "Connected Vehicle Systems",
      "Autonomous Vehicle Support",
      "Traffic Pattern Analysis",
      "Fuel Efficiency Optimization",
    ],
  },
  {
    $id: "aerospace-defense",
    name: "Aerospace & Defense",
    icon: "FaRocket",
    longDescription:
      "We deliver mission-critical Edge AI solutions for aerospace and defense applications - enabling autonomous flight systems, real-time threat detection, and predictive maintenance where latency is measured in milliseconds and failure is not an option.",
    features: [
      "Autonomous UAV & Drone Systems",
      "Real-Time Sensor Fusion & Processing",
      "Predictive Aircraft Maintenance",
      "Target Recognition & Tracking",
      "Mission-Critical Decision Systems",
      "Avionics Health Monitoring",
      "Secure Edge Computing for Defense",
      "Flight Data Analytics at Edge",
    ],
  },
  {
    $id: "smart-buildings-infrastructure",
    name: "Smart Buildings & Infrastructure",
    icon: "FaBuilding",
    longDescription:
      "We create intelligent building systems with Edge AI for HVAC optimization, security monitoring, and occupancy management - reducing operational costs while enhancing comfort, safety, and sustainability.",
    features: [
      "HVAC Optimization & Energy Management",
      "Occupancy Detection & Analytics",
      "Security & Access Control",
      "Predictive Maintenance for Building Systems",
      "Indoor Air Quality Monitoring",
      "Smart Lighting Control",
      "Fire & Safety Systems Integration",
      "Space Utilization Analytics",
    ],
  },
];

const PROJECTS = [
  {
    $id: "p1",
    title: "Quill Inbox – AI-Powered Email Management Extension",
    longDescription:
      "Quill Inbox is an AI-powered Chrome extension that redefines email productivity by intelligently categorizing, prioritizing, and composing emails in real-time. Designed for professionals overwhelmed by inbox clutter, it uses advanced natural language processing and machine learning to help users achieve “Inbox Zero” effortlessly.\\n\nBuilt to integrate seamlessly with Gmail, Quill Inbox automatically detects the tone, intent, and urgency of every message, then classifies it into smart folders like Urgent, Important, or Read Later. The extension also generates context-aware email drafts and replies using OpenAI GPT-4.1, while mirroring the user’s writing style for a personalized touch.\\n\nWith real-time processing, instant smart replies, and an in-extension live chat for customer support, Quill Inbox delivers unmatched convenience. Its privacy-first architecture ensures sensitive data never leaves the user’s session, as all AI operations run securely via Firebase Functions and client-side rendering.\\n\nTechnically, Quill Inbox showcases deep Chrome extension engineering with TypeScript, Plasmo Framework, and React, backed by a serverless Firebase backend for authentication, live chat, and analytics. Optimized for large-scale usage, it supports over 1,000,000 emails without performance lag through debounced API calls, IndexedDB caching, and manifest v3 compliance.\\n\nThis project highlights Verxeon’s expertise in browser automation, AI integration, and scalable cloud architecture, merging user-centric design with real-world productivity outcomes for both individuals and enterprise teams.",
    category: [
      "AI & ML",
      "Agents & Automation",
      "Cloud Computing",
      "Web Development",
      "Digital Marketing & SEO",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Plasmo Framework",
      "Chrome Extension APIs",
      "OpenAI GPT-4.1 API",
      "Custom NLP Pipeline",
      "Sentiment Analysis",
      "Firebase Firestore",
      "Firebase Functions",
      "Firebase Authentication",
      "Firebase Security Rules",
      "Firebase Realtime Database",
      "Webpack",
      "Rollup",
      "ESLint",
      "Prettier",
      "IndexedDB",
      "WebSocket",
      "Manifest V3",
    ],
    features: [
      "AI Email Composition (context-aware professional drafts)",
      "Smart Categorization (auto-sorting by priority and intent)",
      "Instant Smart Replies (tone-based response suggestions)",
      "In-Extension Live Support Chat with typing indicators",
      "Real-Time Processing (live email analysis without refresh)",
      "Priority Inbox (AI-driven ranking of messages)",
      "Seamless Gmail Integration (zero setup required)",
      "Natural Language Understanding (sentiment + intent detection)",
      "Contextual AI Generation (personalized to user’s writing style)",
      "High-Volume Processing (1M+ emails supported efficiently)",
      "Privacy-First Architecture (secure client-side processing)",
      "Cross-Tab Sync for multi-tab Gmail sessions",
      "Real-Time Support Chat (bi-directional WebSocket messaging)",
      "Content Script Injection (non-intrusive Gmail DOM manipulation)",
      "Background Service Worker (persistent AI processing)",
      "Serverless Backend (Firebase Functions for key isolation)",
      "WebSocket Auto-Reconnect for stable support chat",
      "IndexedDB Caching (offline category recall)",
      "Debounced API Calls (smart rate limiting)",
      "Manifest V3 Compliance (future-ready Chrome extension)",
      "Save 2+ Hours Daily on email management",
      "Achieve Inbox Zero with automated prioritization",
      "60% Faster Responses via smart reply generation",
      "Reduced Cognitive Load with automatic organization",
      "Cost-Effective one-time deployment",
      "Enterprise-Grade Security (SOC 2 compliant Firebase)",
      "Scalable for 500K+ daily emails",
      "Easy Chrome Web Store Installation (1-click setup)",
      "Multi-Language Support (50+ languages, future-ready)",
      "End-to-End Encryption for sensitive data (Future Ready)",
      "Analytics Dashboard for productivity insights (Future Ready)",
      "Team Collaboration with shared templates (Future Ready)",
    ],
    mainPicture: "/Projects/Thumbnails/quill_inbox.webp",
    liveUrl: "https://quill-inbox.web.app",
  },
  {
    $id: "p2",
    title:
      "Voice AI Agent for Meetings Scheduling – Enterprise Call Automation System",
    longDescription:
      "Voice AI Agent for Meetings Scheduling is an enterprise-grade conversational AI system that automates end-to-end meeting management through natural voice interactions. Designed to replace traditional reception staff and streamline appointment workflows, this solution handles inbound and outbound calls at scale, processing 100+ simultaneous calls with zero downtime.\n\nBuilt for clinics, agencies, and service-based teams, the system leverages advanced conversational AI powered by LangChain and LangGraph to understand user intent, collect meeting details, and execute scheduling, rescheduling, and deletion operations autonomously. It integrates seamlessly with Google Calendar API for automatic calendar synchronization and MongoDB for robust data persistence.\n\nThe platform features a hierarchical user system with role-based access control: Bosses maintain full system visibility and control, Team Members receive assigned meetings through intelligent relationship mapping, and End Users interact naturally via phone to manage their appointments. Real-time WhatsApp notifications and video alerts ensure all stakeholders stay informed throughout the meeting lifecycle.\n\nTechnically, the system showcases sophisticated AI orchestration with LangChain for conversation flow management, ChromaDB for vector-based conversation memory retention, and Node.js backend architecture for high-performance call processing. The dual-database approach—MongoDB for transactional data and ChromaDB for contextual memory—enables the AI to maintain conversation continuity and improve accuracy over time.\n\nThis project demonstrates Verxeon's expertise in conversational AI, telecommunications integration, real-time communication systems, and scalable cloud architecture. Operating 24/7 with enterprise reliability, it delivers measurable cost savings by eliminating reception staff costs (averaging $5k+/month) while providing superior availability and consistency compared to human operators.",
    category: ["AI & ML", "Agents & Automation", "Cloud Computing"],
    technologies: [
      "LangChain",
      "LangGraph",
      "Node.js",
      "MongoDB",
      "ChromaDB",
      "Vector Databases",
      "Google Calendar API",
      "WhatsApp Business API",
      "Natural Language Processing (NLP)",
      "Conversational AI",
      "Voice Recognition",
      "Speech-to-Text",
      "Text-to-Speech",
      "WebSocket",
      "RESTful APIs",
      "Express.js",
      "Real-Time Communication Protocols",
      "Call Routing Systems",
      "Telephony Integration",
      "Video Alert APIs",
    ],
    features: [
      "24/7 Automated Call Handling (inbound & outbound)",
      "100+ Simultaneous Call Processing (enterprise scalability)",
      "Natural Voice Conversation AI (human-like interactions)",
      "Full Meeting Scheduling (name, date, duration, notes collection)",
      "Dynamic Meeting Rescheduling (retrieve and update by name)",
      "One-Command Meeting Deletion (database and notification sync)",
      "Google Calendar Auto-Sync (instant calendar integration)",
      "Real-Time WhatsApp Notifications (confirmations, updates, cancellations)",
      "Video Alert System (API-driven visual notifications)",
      "Hierarchical User Management (Boss, Team Members, End Users)",
      "Role-Based Access Control (permission-based system visibility)",
      "Intelligent Meeting Assignment (automatic team member routing)",
      "Conversation Memory Retention (ChromaDB vector storage)",
      "Context-Aware AI Responses (improved accuracy over time)",
      "Multi-Participant Auto-Notifications (all stakeholders informed)",
      "Complete Call Log History (MongoDB persistent storage)",
      "User/Team Profile Management (relationship mapping)",
      "Zero Downtime Operation (enterprise-grade reliability)",
      "High-Volume Appointment Handling (clinics, agencies, service teams)",
      "Decision Logic Orchestration (LangGraph conversation flow)",
      "Cost Savings: Replaces $5k+/month reception staff",
      "Zero Human Error (consistent, reliable operations)",
      "Unlimited Availability (no breaks, holidays, or sick days)",
      "Instant Meeting Storage (MongoDB transactional integrity)",
      "Dual-Database Architecture (MongoDB + ChromaDB)",
      "Scalable from Small Teams to Large Organizations",
      "Real-Time Data Synchronization (calendar, database, notifications)",
      "Enterprise-Ready Infrastructure (production-grade deployment)",
      "Multi-Channel Notifications (WhatsApp + Video Alerts)",
      "Automated Participant Management (dynamic contact handling)",
    ],
    mainPicture: "/Projects/Thumbnails/Voice_Agent_Langchain.webp",
    liveUrl: "https://youtu.be/FAxWnRjFj18",
  },
  {
    $id: "p3",
    title: "PrismAI – Advanced ChatGPT Clone",
    longDescription:
      "PrismAI is a next-generation AI chat application designed to replicate and enhance the professional ChatGPT experience. Built with modern web technologies, PrismAI delivers a clean, responsive, and feature-rich interface with advanced AI capabilities including vision analysis, image generation, voice recording, and camera integration.\\n\nBy supporting multiple AI models, PrismAI brings the power of GPT-3.5, GPT-4, GPT-4 Turbo, GPT-4o, and DALL-E 3 into a single, scalable platform optimized for both desktop and mobile experiences.\\n\nPrismAI is more than a ChatGPT clone. It’s a comprehensive AI-powered chat ecosystem designed for productivity, creativity, and seamless interaction. With built-in conversation management, multimedia support, and cross-platform responsiveness, PrismAI empowers users to work smarter and interact with AI more naturally.",
    category: ["AI & ML", "Cloud Computing", "Web Development"],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "React Icons",
      "React Markdown",
      "OpenAI API",
      "Node.js",
      "Axios",
      "Node-fetch",
      "ESLint",
      "PostCSS",
      "Autoprefixer",
      "dotenv",
      "UUID",
      "Mixpanel",
      "Remark GFM",
    ],
    features: [
      "Multi-model support: GPT-3.5 Turbo, GPT-4, GPT-4 Turbo, GPT-4o, DALL-E 3",
      "Vision analysis: Upload and analyze images with GPT-4o",
      "Image generation: Create high-quality visuals with DALL-E 3",
      "Streaming responses with typewriter effect",
      "Regenerate responses for alternative outputs",
      "Save, manage, and search conversations",
      "Persistent chat history via localStorage",
      "Auto-generated conversation titles",
      "Export chats as JSON",
      "Copy, share, like, or dislike AI responses",
      "Professional ChatGPT-inspired design",
      "Full dark mode with smooth transitions",
      "Mobile responsive with touch optimization",
      "Keyboard shortcuts (Cmd/Ctrl+Enter to send)",
      "Error boundaries and skeleton loaders for smooth UX",
      "Image upload (drag-and-drop + click-to-upload)",
      "Device camera integration for instant photos",
      "Voice recording & transcription",
      "File uploads with type/size validation",
      "Automatic image optimization and compression",
      "Auto model switching for vision/image tasks",
      "Context-aware prompt suggestions",
      "Built-in spell correction",
      "Analytics integration (Mixpanel)",
      "Graceful error handling & recovery",
    ],
    mainPicture: "/Projects/Thumbnails/prisma.webp",
    liveUrl: "https://prismagpt.vercel.app/",
  },
  {
    $id: "p4",
    title: "LinkedIn Comments-to-Leads Automation",
    longDescription:
      "This project delivers a fully automated solution to convert LinkedIn post engagement into\nqualified leads seamlessly. By integrating multiple APIs and automation workflows, we\neliminate repetitive manual tasks and create a scalable, organized, and efficient lead\ngeneration system.",
    category: ["AI & ML", "Agents & Automation"],
    technologies: [
      "Apify LinkedIn Comments Scraper API",
      "Apify LinkedIn Profile Batch Scraper API",
      "Google Sheets API",
      "n8n",
    ],
    features: [
      "Automate LinkedIn comments scraping to capture user engagement",
      "Enrich commenter profiles with detailed LinkedIn data for better lead qualification",
      "Organize the enriched data into Google Sheets for simplified management and tracking",
      "Enable seamless lead generation and CRM integration for outreach campaigns",
    ],
    mainPicture: "/Projects/Thumbnails/linkedincommentstolead.webp",
    liveUrl: "https://youtu.be/7EIIanKXWNA",
  },
  {
    $id: "p5",
    title: "ToolSparx",
    longDescription:
      "Perform accurate calculations for various purposes including financial planning, academic grading, and unit conversions.. Age Calculator · ⚖️. BMI Calculator.",
    category: [
      "AI & ML",
      "Cloud Computing",
      "Web Development",
      "App Development",
      "Digital Marketing & SEO",
    ],
    technologies: [
      "Next.js",
      "React",
      "Appwrite",
      "AI/ML API’s Integration",
      "ShadCn",
    ],
    features: [
      "AI Chatbot – Multi-model support (GPT-4o, Claude, Gemini, DeepSeek, Llama) with chat history & file uploads",
      "20+ Tools – Calculators (Age, BMI, Currency, GPA, etc.)",
      "AI Tools (Article Writer, Paraphraser), Utilities (Word Counter, Grammar Checker)",
      "Responsive UI – Mobile-first layout with smooth animations and accessibility compliance,",
      "Performance Optimized – <2s load time, 15s request timeout protection, error handling and retry mechanism,",
      "SEO Ready – Meta tags, structured data, WCAG compliance",
    ],
    mainPicture: "/Projects/Thumbnails/tollsparx.webp",
    liveUrl: "https://www.toolsparx.com/",
  },
  {
    $id: "p6",
    title: "Pinecone Trouble Shooting Chatbot",
    longDescription:
      "This chatbot retrieves answers directly from your business documents using Pinecone as a vector database. For example, it can extract troubleshooting steps like restarting a phone, updating software, or resetting network settings from a resolution document. By supplying your own domain-specific documents, the chatbot can be quickly customized to handle customer queries and provide accurate, context-aware responses.",
    category: ["AI & ML", "Agents & Automation", "Web Development"],
    technologies: ["Pinecone (Vector DB)", "AI Chatbot Framework"],
    features: [
      "Retrieve answers directly from resolution or domain-specific documents",
      "Provide step-by-step troubleshooting or guidance from knowledge base",
      "Easily customizable with your business documents",
      "Quickly build niche-specific chatbots for different industries",
    ],
    mainPicture: "/Projects/Pinecone Trouble Shooting Chatbot.webp",
    liveUrl: "https://youtu.be/CdzcIHFJZ9w",
  },
  {
    $id: "p7",
    title: "Google Map AI Agent",
    longDescription:
      "The Google Map AI Agent automates lead generation by scraping businesses from Google Maps based on niche and location. It collects essential details like name, website, address, contact info, ratings, and working hours. The system goes beyond by visiting each business’s website to extract emails and deeper background information, storing everything neatly in Google Sheets. With workflow automation inside N10, it ensures accurate mapping of leads using unique IDs, making it a reliable solution for business prospecting.",
    category: ["AI & ML", "Agents & Automation"],
    technologies: [
      "Google Maps API",
      "Google Sheets",
      "OpenAI",
      "n8n (workflow automation)",
      "Web Scraping",
    ],
    features: [
      "Lead generation from Google Maps by niche and location",
      "Scrapes company name, website, address, contact info, ratings, and hours",
      "Visits business websites to extract email and background information",
      "Stores data automatically in Google Sheets",
      "Unique ID generation for each lead to ensure correct mapping",
      "Workflow automation with N10 for smooth multi-step processes",
      "Option to integrate OpenAI or Perplexity for web research",
    ],
    mainPicture: "/Projects/Google Map AI Agent.webp",
    liveUrl: "https://youtu.be/k7cJaipT-Gs",
  },
  {
    $id: "p8",
    title: "FleekRead – AI-Powered Reading Companion",
    longDescription:
      "FleekRead is an AI-powered reading companion designed to help users read smarter, not longer. Built for readers, students, and professionals drowning in information, it transforms books and digital content into actionable insights through AI-driven summarization, speed-reading tools, and personalized recommendations.\\n\nThe app intelligently summarizes entire books in minutes, delivers chapter-level insights, and supports audiobook streaming, auto-scrolling, and speed reader modes that double reading efficiency. With cross-platform sync, readers can continue seamlessly across mobile, web, or tablet without losing progress.\\n\nAdministrators manage the entire platform through the FleekRead_Administrator dashboard, featuring book upload tools, user analytics, performance monitoring, bulk content operations, and push notification systems for engagement.\\n\nOn the backend, FleekRead is powered by a Python (FastAPI) architecture with AWS Lambda, EC2, and RDS, supporting millions of concurrent users through horizontal scaling and microservices deployment. The app uses Anthropic Claude and a custom NLP pipeline for book summarization, chapter segmentation, and personalized recommendations driven by collaborative filtering algorithms.\\n\nWith offline-first design, PWA support, and <100ms global latency, FleekRead stands out as a reliable, scalable, and intelligent reading platform that helps users retain more knowledge in less time.\\n\nThis project highlights Verxeon’s expertise in AI/ML integration, cross-platform development, and enterprise-grade AWS infrastructure that meets SOC 2 and GDPR compliance standards.",
    category: [
      "AI & ML",
      "Web Development",
      "App Development",
      "Digital Marketing & SEO",
    ],
    technologies: [
      "Flutter",
      "Dart",
      "Material Design",
      "Provider",
      "Python",
      "FastAPI",
      "AWS Lambda",
      "AWS EC2",
      "AWS S3",
      "AWS CloudFront",
      "AWS RDS (PostgreSQL)",
      "Redis",
      "Anthropic Claude",
      "Custom NLP Pipeline",
      "Collaborative Filtering",
      "Docker",
      "PostgreSQL",
      "PWA",
      "Microservices Architecture",
    ],
    features: [
      "AI-Powered Summaries with intelligent chapter breakdowns",
      "Audiobook Streaming with adjustable playback and bookmarks",
      "Speed Reader Mode for 2x faster reading via guided pacing",
      "Auto-Scrolling with customizable speed controls",
      "Personalized Recommendations using ML algorithms",
      "Cross-Platform Sync across mobile, web, and tablet",
      "Smart Bookmarks highlighting key passages automatically",
      "Content Management Dashboard for ePub, PDF, and audio",
      "User Analytics tracking reading and engagement metrics",
      "Bulk Operations for mass uploads and metadata updates",
      "Performance Monitoring for server health and bandwidth",
      "Moderation Tools for managing reviews and support tickets",
      "Push Notifications for personalized alerts and new book drops",
      "Microservices Architecture separating API, AI, and streaming layers",
      "Efficient Global Content Delivery (<100ms latency with S3 + CloudFront)",
      "Horizontal Scaling handling 1M+ concurrent users",
      "Offline-First Design with downloadable books and summaries",
      "Optimized PostgreSQL Database (<50ms query response)",
      "Progressive Web App (PWA) with native-like UX",
      "Lazy Loading for bandwidth efficiency",
      "Subscription Model for premium summaries",
      "AI Recommendations driving discovery and retention",
      "Enterprise-Grade Security (SOC 2, GDPR-ready)",
      "Scalable Infrastructure with AWS Cloud services",
      "Admin Dashboard for easy content and user management",
      "Real-Time Insights for platform health and analytics",
      "Social Reading with shared highlights and book clubs (Future Ready)",
      "Educational Mode with quiz and comprehension testing (Future Ready)",
      "Publisher API for third-party summarization (Future Ready)",
    ],
    mainPicture: "/Projects/Thumbnails/fleedread.webp",
    liveUrl: "https://fleekread.com",
  },
  {
    $id: "p9",
    title: "AI PDF-to-Audio Platform – Transform Books into Audiobooks",
    longDescription:
      "AI PDF-to-Audio Platform revolutionizes how people consume written content by instantly converting any PDF or book into natural, human-sounding audio narration. Designed for authors, educators, students, and audiobook enthusiasts, this platform eliminates the barrier between reading and listening, making knowledge accessible to everyone, everywhere.\n\nPowered by cutting-edge AI voice technology, the platform generates expressive, emotion-rich narration that rivals professional voice actors—without the time, cost, or complexity of traditional audiobook production. Users simply upload their PDFs and receive studio-quality audio within minutes, complete with adjustable tone, pacing, and accent options.\n\nBuilt for both individual users and enterprise integrations, the platform features a comprehensive REST API that enables developers to embed PDF-to-audio conversion directly into their own applications. Whether it's an e-learning platform, publishing house, or accessibility tool, businesses can leverage the same AI engine that powers the consumer experience.\n\nThe system's hybrid architecture supports both local GPU deployment for development and testing, plus cloud-based scalability for production workloads. With intelligent chapter-by-chapter processing, users can convert entire books without overwhelming system resources, while real-time progress tracking keeps them informed at every step.\n\nFrom subscription management and usage analytics to secure file storage and automated notifications, every aspect is designed for seamless user experience. The admin panel provides complete oversight of conversions, API usage, and system health, ensuring smooth operations at any scale.\n\nThis project showcases Verxeon's expertise in AI/ML integration, scalable cloud architecture, API design, and building production-ready platforms that solve real-world accessibility challenges while opening new revenue streams for content creators and businesses.",
    category: ["AI & ML", "Cloud Computing", "Web Development"],
    technologies: [
      "Python",
      "FastAPI",
      "TensorFlow",
      "PyTorch",
      "AI Voice Synthesis",
      "Natural Language Processing",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Redis",
      "AWS S3",
      "AWS Lambda",
      "Docker",
      "Kubernetes",
      "REST API",
      "WebSocket",
      "Stripe API",
      "JWT Authentication",
      "OAuth 2.0",
      "HTTPS/TLS",
      "PyPDF2",
      "pdfplumber",
      "FFmpeg",
      "MP3/WAV Encoding",
      "CloudWatch",
      "Prometheus",
      "Grafana",
    ],
    features: [
      "AI-Powered Voice Narration (human-like, expressive speech)",
      "PDF Upload & Processing (up to 30MB per file)",
      "Intelligent Chapter-by-Chapter Conversion",
      "Multiple Voice Types & Accents",
      "Adjustable Playback Speed & Tone",
      "Audio Preview Before Full Conversion",
      "Stream or Download (MP3/WAV formats)",
      "Real-Time Conversion Progress Tracking",
      "Secure Cloud Storage for PDFs & Audio",
      "User Authentication & Profile Management",
      "Email Verification & Password Reset",
      "Personal Dashboard for Managing Conversions",
      "Free Plan (5 conversions/month, 150 pages/file)",
      "Pro Plan ($39/month, 50 conversions/month, 500 pages/file)",
      "Developer REST API for External Integrations",
      "Secure API Key Authentication",
      "Usage Quota Management",
      "API Usage Analytics & Logs",
      "Admin Panel for User & System Management",
      "Automated Email & Dashboard Notifications",
      "Conversion Status Updates",
      "Subscription Management",
      "Multi-Language Support",
      "Local GPU Mode for Development/Testing",
      "Cloud Mode for Production Scalability",
      "Encrypted File Transfer & Storage",
      "Rate Limiting & Access Control",
      "Automatic File Cleanup for Expired Content",
      "Analytics Dashboard (conversions, API usage, active users)",
      "System Performance Monitoring",
      "HTTPS Encryption for All Communications",
      "Token-Based Authentication",
      "Detailed Error Logging",
      "Responsive Web Interface",
      "Help & Support Pages with FAQ",
      "API Documentation Portal",
    ],
    mainPicture: "/Projects/AI pdf to voice.webp",
    liveUrl: "https://booktovoice.vercel.app",
  },
  {
    $id: "p10",
    title: "HelScript – Real-Time Voice Transcription & AI Note-Taking",
    longDescription:
      "HelScript is a cross-platform AI-powered voice transcription and note-taking app designed for individuals, teams, and professionals who think faster than they can type. Built to overcome the lag and inaccuracy of manual transcription, it transforms real-time speech into structured, searchable, and editable documents with <500ms latency.\\n\nThe app supports 10+ languages using OpenAI Whisper API and TensorFlow Lite for on-device speech recognition, offering AI Smart Summaries, auto-formatting, and voice commands for a seamless, hands-free experience.\\n\nHelScript empowers users to capture ideas instantly, generate meeting minutes automatically, and create content through speech, while ensuring high accuracy, low memory usage, and cross-platform sync between mobile and web.\\n\nFrom students transcribing lectures to professionals dictating client meetings, HelScript enhances productivity, accessibility, and collaboration. With future-ready features like team collaboration, video transcription, calendar integration, and an AI chatbot for querying past transcripts, it stands as a complete productivity suite for voice-driven workflows.\\n\nOn the technical side, HelScript demonstrates Verxeon’s strength in AI/ML integration, real-time system architecture, and cross-platform performance optimization, powered by a scalable Python backend on AWS with serverless AI processing, CDN delivery, and containerized microservices.",
    category: ["AI & ML", "Agents & Automation", "App Development"],
    technologies: [
      "Flutter",
      "Dart",
      "Material Design",
      "Provider",
      "OpenAI Whisper API",
      "TensorFlow Lite",
      "Hugging Face Transformers",
      "Voice Activity Detection (VAD)",
      "Python",
      "FastAPI",
      "AWS Lambda",
      "PostgreSQL",
      "AWS RDS",
      "AWS S3",
      "AWS CloudFront",
      "AWS EC2",
      "Docker",
    ],
    features: [
      "Real-Time Multilingual Transcription (<500ms latency)",
      "AI Smart Summaries (auto-generate key points & action items)",
      "Auto-Formatting (punctuation, capitalization, paragraphing)",
      "Playlist-Style Library for transcript organization",
      "Editable In-App Documents with formatting tools",
      "Voice Commands (hands-free control)",
      "Searchable Archives across all transcripts",
      "Export Options (TXT, DOCX, PDF)",
      "Adaptive Audio Buffering for long recordings",
      "Context-Aware NLP for different use cases",
      "Speaker Diarization (multi-speaker detection)",
      "Low Memory Footprint (optimized for 2+ hour sessions)",
      "Cross-Platform Sync (mobile, web, tablet)",
      "Sub-500ms Transcription Latency",
      "Efficient Memory Management (<100MB RAM usage)",
      "Smart Chunking (parallel 10-sec segment processing)",
      "Automatic Language Detection",
      "Real-Time Audio Streaming (WebSocket-based)",
      "Accessibility Support (for mobility or writing challenges)",
      "Cost-Effective Alternative to paid transcription tools",
      "Lecture & Interview Transcription for students/researchers",
      "AI Study Summaries & Concept Review",
      "Team Collaboration (real-time shared editing)",
      "Video Transcription (auto captioning)",
      "Calendar Integration (Zoom/Meet auto-transcription)",
      "Analytics Dashboard (filler words, talk-time ratio)",
      "50+ Language Expansion (Whisper v3)",
      "Custom Vocabulary Training (medical/legal/tech terms)",
      "End-to-End Encryption (zero-knowledge architecture)",
      "AI Chatbot for Transcript Queries",
      "Serverless AI Processing with AWS Lambda",
      "Containerized Microservices for NLP & API layers",
      "Optimized Audio File Storage via AWS S3 Lifecycle Policies",
      "Global CDN Delivery with AWS CloudFront",
    ],
    mainPicture: "/Projects/Thumbnails/helscript.webp",
    liveUrl: null,
  },
  {
    $id: "p11",
    title: "Styleoro - E-Commerce Web App",
    longDescription:
      "Styleoro is a full-stack modern e-commerce platform designed with performance, scalability, and user experience in mind. Built with Next.js 15, Appwrite, and Tailwind CSS, it offers a complete shopping experience with a powerful admin dashboard and real-time capabilities - ideal for any clothing, fashion, or lifestyle store.",
    category: ["Web Development"],
    technologies: [
      "Next.js 15 + TypeScript",
      "Tailwind CSS + Framer Motion",
      "React Query",
      "Appwrite (DB",
      "Auth",
      "Storage",
      "Realtime)",
      "Stripe Payments",
      "Google Maps & IP Geolocation",
      "Vercel (Hosting & CI/CD)",
    ],
    features: [
      "Smart product catalog with filters and search",
      "Persistent cart saved across sessions with stock validatio",
      "Secure login via Google or email with Stripe checkout",
      "Voice-enabled and intelligent search",
      "Full order tracking from purchase to deliver",
      "yReal-time notifications for orders, stock, and promotions",
      "Reviews and ratings with admin moderation",
      "Admin control for products, categories, inventory, and orders",
      "Sales analytics and customer insights",
      "Personalized offers and targeted notifications",
    ],
    mainPicture: "/Projects/Thumbnails/styleoro.webp",
    liveUrl: "https://eccomerce-nextjs-henna.vercel.app",
  },
  {
    $id: "p12",
    title: "LetzBuyNSell – Hyper-Local E-Commerce Platform",
    longDescription:
      "LetzBuyNSell is a hyper-local e-commerce platform that connects nearby buyers and sellers through real-time, location-based listings. Instead of dealing with irrelevant or distant results, users only see what’s available within their chosen radius — making local trading simple, fast, and trustworthy.\\n\nBuilt as a mobile-first marketplace, it eliminates shipping hassles by enabling in-person exchanges within the user’s vicinity. Buyers can discover items on a live interactive map, chat directly with sellers, and schedule meetups instantly. Sellers can post listings in seconds with auto-location tagging and photo uploads, while the system automatically handles visibility, verification, and notifications.\\n\nThe platform is powered by Flutter on the frontend and Firebase on the backend, ensuring smooth cross-platform performance, real-time updates, and serverless scalability. Advanced GeoHash indexing enables high-speed geospatial queries, supporting more than 1,000,000 listings with seamless performance, even on low-end Android devices.\\n\nFor platform admins, the LetzBuyNSell Administrator Panel provides complete marketplace control — from moderating products and managing users to tracking payments, ad campaigns, and analytics through a modern, responsive dashboard.\\n\nWith built-in monetization via Stripe and Google AdMob, LetzBuyNSell is not just a technical achievement but also a scalable business model ready for regional and global rollout.",
    category: ["AI & ML", "Web Development", "App Development"],
    technologies: [
      "Flutter",
      "Dart",
      "Material Design",
      "Provider",
      "Firebase Firestore",
      "Firebase Realtime Database",
      "Firebase Authentication",
      "Firebase Cloud Messaging (FCM)",
      "Firebase Storage",
      "Firebase Security Rules",
      "Firebase Functions",
      "Stripe API",
      "Google Maps API",
      "Geofencing SDK",
      "Geocoding API",
      "Places API",
      "Google AdMob",
      "Firebase Analytics",
    ],
    features: [
      "Real-Time Radius Search with adjustable distance filters (1–100 km)",
      "Map-Based Product Discovery with live pins via Google Maps API",
      "In-App Chat for instant buyer-seller negotiations",
      "Quick Listing Creation with photo upload and auto-location tagging",
      "Instant Push Notifications for new listings and messages",
      "Verified User Profiles with ratings, blocking, and reporting",
      "Smart Filters by category, price, and condition (new/used)",
      "Boost Listing feature via Stripe-powered premium placement",
      "Cross-Platform Mobile App for iOS and Android",
      "Offline Mode with cached listings for poor network conditions",
      "User Management in admin panel with suspend/verify controls",
      "Product Moderation for spam detection and approval workflow",
      "Analytics Dashboard with user, listing, and revenue metrics",
      "Ad Campaign Manager integrated with Google AdMob",
      "Payment Logs tracking transactions, refunds, and Stripe activities",
      "Dispute Resolution tools for report and refund handling",
      "Geofence Management to define and restrict operational zones",
      "Lazy Loading and Pagination supporting 1M+ listings",
      "GeoHash Indexing for optimized location-based queries",
      "Optimized for Low-End Devices (<50MB RAM, 60fps UI)",
      "Battery-Efficient Background Tracking (<3% drain/hour)",
      "Firebase Functions for automated moderation and notifications",
      "Secure Payment Flow (PCI-compliant Stripe integration)",
      "Dynamic Product Loading and Infinite Scroll",
      "Scalable Firebase Infrastructure handling 1M+ concurrent users",
      "Ad Revenue and Premium Boost Subscription Model",
      "Serverless Architecture ensuring <100ms latency",
      "AI Moderation (Future Ready)",
      "AI Price Recommendations (Future Ready)",
      "In-App Wallet for premium credits (Future Ready)",
      "Video Listings and Social Sharing (Future Ready)",
      "Delivery and Escrow Integration (Future Ready)",
      "Gamified Seller Levels and Rewards (Future Ready)",
      "Multi-Language Support for global reach (Future Ready)",
    ],
    mainPicture: "/Projects/Thumbnails/buy-sell.webp",
    liveUrl: "https://letzbuynsell.web.app",
  },
  {
    $id: "p13",
    title: "E‑commerce Store",
    longDescription:
      "Full‑stack e‑commerce application built on the MERN stack with secure JWT auth and SMTP email flows. Users can browse products by category/brand, manage cart and wishlist, place orders, review products, and manage profiles and addresses. Admins can manage products, categories, brands, and orders. Modern, responsive UI with Redux Toolkit state, Material UI components, and smooth UX animations.",
    category: ["Web Development"],
    technologies: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JSON Web Tokens (JWT)",
      "bcryptjs",
      "Multer",
      "Nodemailer (SMTP)",
      "Cookie‑Parser",
      "CORS",
      "Morgan",
      "React",
      "React Router",
      "Redux Toolkit",
      "Axios",
      "Material UI",
      "Emotion",
      "Framer Motion",
      "Lottie",
      "React Hook Form",
    ],
    features: [
      "Authentication (JWT login/signup, OTP & password reset over email)",
      "Protected routes (user/admin)",
      "User profile management",
      "Multiple shipping addresses (CRUD)",
      "Product catalog with images, brand, category, stock",
      "Brand & Category management",
      "Product listing with pagination and sorting",
      "Product details with ratings and reviews",
      "Review create/edit/delete with average rating",
      "Wishlist add/remove and list",
      "Cart add/remove/update quantity",
      "Discounted pricing with discountPercentage",
      "Checkout and order placement",
      "User order history and details",
      "Admin dashboard for products (CRUD)",
      "Admin order management (status updates)",
      "Input validation on server",
      "Email notifications via SMTP (Nodemailer)",
      "Responsive UI with Material UI",
      "Global state with Redux Toolkit",
      "API integration with Axios",
      "Smooth animations (Framer Motion, Lottie)",
    ],
    mainPicture: "/Projects/Thumbnails/mern-ecommerce.webp",
    liveUrl: "https://www.youtube.com/watch?v=kD6DKrNhrdU",
  },
  {
    $id: "p14",
    title: "Insurance Qualification & Follow-Up AI Agent",
    longDescription:
      "This AI agent is designed to handle insurance qualification calls by asking structured questions, recording responses, and providing follow-up actions. It collects client data like current insurance status, future plans, budget, life changes, and preferences for follow-up. Based on answers, it can send tailored insurance details via email, schedule follow-up calls, or transfer directly to a specialist. It also recaps answers in real time and allows corrections from the client.",
    category: ["AI & ML", "Agents & Automation", "Web Development"],
    technologies: [
      "AI Voice Agent (YCI Agent)",
      "Call handling system (with transfer to specialist)",
      "Email sending module",
    ],
    features: [
      "Ask structured insurance-related questions (coverage, plans, budget, life changes)",
      "Recap answers with real-time correction by client",
      "Follow-up via email with tailored insurance options",
      "Option to schedule a specialist call",
      "Direct transfer to a live specialist if requested",
      "Add lead into a campaign or follow-up flow",
    ],
    mainPicture: "/Projects/Insurance Agent.webp",
    liveUrl: "https://youtu.be/PkFCCkwHYmw",
  },
  {
    $id: "p15",
    title: "AI-Powered Chatbot with OpenAI",
    longDescription:
      "This project represents a complete web solution built with modern technologies to deliver performance, scalability, and user satisfaction. The platform features a clean and responsive UI that adapts across all devices, ensuring smooth navigation and accessibility. It integrates robust backend architecture for secure data handling and efficient communication between client and server. The system includes advanced functionalities such as real-time updates, dynamic content management, and API integrations. Special focus was placed on user experience, design consistency, and code optimization. Built using React, Node.js, and Tailwind CSS, it follows best development practices and modular architecture. The result is a professional-grade web application tailored to business growth and client needs.",
    category: ["AI & ML", "Cloud Computing", "Web Development"],
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "REST APIs",
      "JWT Authentication",
    ],
    features: [
      "User Authentication",
      "Real - time Chat & Notifications",
      "Admin Dashboard",
      "Multi - Provider API Integration",
      "File Upload & Processing",
      "AI - Powered Insights",
      "Responsive Design",
      "Dark & Light Mode",
      "Secure Data Flow",
      "Role - Based Access Control",
      "Modular Architecture",
      "Error Handling & Recovery",
      "Markdown Rendering",
      "Copy-to-Clipboard",
      "Image Analysis",
      "Model Selection Panel",
      "Conversation History",
      "Code Syntax Highlighting",
      "Mobile Optimization",
      "Scalable Backend Design",
      "Smooth Animations",
      "Advanced Search Functionality",
      "Customizable Settings",
      "Cloud Deployment Ready",
    ],
    mainPicture: "/Projects/Thumbnails/chatbot.webp",
    liveUrl: "https://custoomchatboot.netlify.app/",
  },
  {
    $id: "p16",
    title:
      "FormCO - Full Events Management System | LMS | Automated Registration, Payments & Certificates",
    longDescription:
      "FormCO is a full-stack competition and event management platform built with Next.js, MongoDB, and NextAuth, designed for organizations, institutes, and students. It streamlines the entire lifecycle - from competition creation and team registration to payments, approvals, and certificate generation. With role-based access, Google/credentials login, secure file uploads, and automated email workflows, FormCO ensures efficiency, transparency, and scalability for managing hundreds of events seamlessly.",
    category: ["Agents & Automation", "Web Development"],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Headless UI",
      "React Hook Form",
      "React Hot Toast",
      "MongoDB",
      "Mongoose",
      "NextAuth",
      "Google OAuth",
      "bcrypt",
      "Nodemailer",
      "SendGrid",
      "Canvas API",
      "JWT",
      "Cloudinary",
      "S3",
      "Vercel",
      "REST API",
      "ESLint",
      "PostCSS",
      "React Icons",
    ],
    features: [
      "Event & Competition Management",
      "Automated Registration & Application Workflow",
      "Team & Individual Application Support",
      "Payment Verification & Tracking",
      "Role-Based Access (Organization, Organizer, Student)",
      "Google OAuth & Credentials Login via NextAuth",
      "Secure Authentication with JWT Sessions",
      "Dynamic Registration Forms & Validation",
      "Document & Receipt Uploads",
      "Certificate Generation (Canvas-Based)",
      "Automated Email Notifications",
      "Organization & Organizer Dashboards",
      "Real-Time Status Updates & Progress Tracking",
      "Competition Publishing & Management",
      "Student Portal with Application Tracking",
      "Team Creation & Member Management",
      "Admin Approval System for Organizers",
      "Audit-Friendly Payment Records",
      "Mobile-First, Responsive Design",
      "Tailwind CSS + Headless UI Components",
      "React Hook Form for Form Validation",
      "MongoDB Database with Mongoose Models",
      "Schema Validation & Indexing",
      "Secure File Storage (Local / Cloud)",
      "Google Sign-In Integration",
      "Role-Based Permissions & Authorization",
      "Scalability for Large Event Data",
      "Dynamic Certificate Verification",
      "Error Handling & Toast Notifications",
      "WCAG-Compliant Accessible UI",
      "Email & Verification Automation",
      "Future-Ready for External Webhooks / Queues",
      "Integration with Payment APIs (Configurable)",
      "Organized Data Models for Each Role",
      "SEO & Performance Optimized",
      "Deployed on Vercel with CI/CD",
      "Environment-Based Configuration",
      "Modular, Extensible Architecture",
    ],
    mainPicture: "/Projects/Thumbnails/events-manager.webp",
    liveUrl: "https://youtu.be/S2ED2RF3-PU?si=j8_OLnAAxVuiaA-J",
  },
];

const IndustryDetailPage = () => {
  const params = useParams()
  const router = useRouter()
  const [industry, setIndustry] = useState<Industry | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const allProjects = PROJECTS;

  // Icon mapping function - same as admin
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      // React Icons
      FaIndustry: FaIndustry,
      FaBuilding: FaBuilding,
      FaRocket: FaRocket,
      FaCar: FaCar,
      FaBolt: FaBolt,
      FaTruck: FaTruck,
      // Lucide icons
      Building: Building,
      Globe: Globe,
      Code: Code,
      Cloud: Cloud,
      Smartphone: Code, // fallback
      TrendingUp: TrendingUp,
      Users: Users,
      Shield: Shield,
      Zap: Zap,
      Target: Target,
    };
    return iconMap[iconName] || Code
  }

  useEffect(() => {
    if (params.id) {
      const industryData = INDUSTRIES.find(
        (ind) => ind.$id === params.id
      );
      if (!industryData) {
        setError("Industry not found");
      } else {
        setIndustry(industryData as unknown as Industry);
      }
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-page-background">
        <div className="pt-32 pb-20 text-center">
          <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto mb-4" />
          <p className="text-card-secondary">Loading industry...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !industry) {
    return (
      <main className="min-h-screen bg-page-background">
        <div className="pt-32 pb-20 text-center">
          <div className="bg-card shadow-card p-12 rounded-3xl border border-primary/20 max-w-2xl mx-auto">
            <Code className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-card-primary mb-2">Industry Not Found</h2>
            <p className="text-card-secondary mb-6">
              {error || 'The industry you are looking for could not be found.'}
            </p>
            <Link
              href="/industries"
              className="btn-primary px-6 py-3"
            >
              Back to Industries
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-page-background">
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-8"
          >
            <Link
              href="/industries"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors text-sm md:text-base"
            >
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
              <span>Back to Industries</span>
            </Link>
          </motion.div>

          {/* Industry Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side - Industry Info */}
            <div className="space-y-8 order-2 lg:order-1">
              {/* Industry Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {(() => {
                      const IconComponent = getIconComponent(industry.icon);
                      return (
                        <IconComponent className="h-6 w-6 text-[#1a6b8f]" />
                      );
                    })()}
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-card-primary">
                      {industry.name}
                    </h1>
                  </div>
                </div>
              </motion.div>

              {/* Industry Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-card-primary">
                  About This Industry
                </h3>
                <p className="text-card-secondary text-base leading-relaxed">
                  {formatTextWithLineBreaks(industry.longDescription)}
                </p>
              </motion.div>

              {/* Industry Details Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {industry.deliveryTime && (
                  <div className="bg-card shadow-card p-4 rounded-xl border border-primary/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-card-primary">
                        Delivery Time
                      </span>
                    </div>
                    <p className="text-card-secondary text-sm">
                      {industry.deliveryTime}
                    </p>
                  </div>
                )}

                {industry.price && (
                  <div className="bg-card shadow-card p-4 rounded-xl border border-primary/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-card-primary">
                        Starting Price
                      </span>
                    </div>
                    <p className="text-card-secondary text-sm">
                      {industry.price}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Features */}
              {industry.features && industry.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold text-card-primary flex items-center space-x-3">
                    <AiOutlineSolution className="h-5 w-5 -mr-2 text-[#1a6b8f]" />
                    <span>What We Offer</span>
                  </h3>
                  <div className="space-y-2">
                    {industry.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <CheckCircle className="h-5 w-5 -mr-2 text-[#08273b]" />
                        <span className="text-card-secondary text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-4 py-2 bg-[#08273b] text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg"
                >
                  Start Your Project
                </Link>
                {/* <Link
                  href="/projects"
                  className="inline-flex items-center justify-center px-4 py-2 bg-card border border-[#08273b] text-[#08273b] rounded-lg font-medium hover:bg-primary/5 hover:border-dark hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                >
                  View All Projects
                </Link> */}
              </motion.div>
            </div>

            {/* Right Side - Related Projects */}
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="sticky top-8"
              >
                {(() => {
                  const related = allProjects.filter(
                    (p: any) => p.category.includes(industry.name)
                  );
                  return related.length > 0 ? (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-card-primary">
                        Related Projects
                      </h3>
                      <div className="space-y-4">
                        {related
                          .slice(0, 3)
                          .map((project: any, index: number) => (
                            <div
                              key={project.$id}
                              className="bg-card shadow-card rounded-xl p-4 border border-primary/10 hover:shadow-lg transition-all duration-300"
                            >
                              {/* Project Image */}
                              <div className="mb-3 w-full aspect-[1920/1528] relative bg-gray-100 rounded-lg overflow-hidden">
                                {project.mainPicture ? (
                                  <Image
                                    src={project.mainPicture}
                                    alt={project.title}
                                    fill
                                    className="object-contain rounded-lg"
                                    sizes="(min-width: 1024px) 33vw, 100vw"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                                    <Code className="h-8 w-8 text-primary/40" />
                                  </div>
                                )}
                              </div>

                              {/* Project Info */}
                              <h4 className="text-lg font-semibold text-card-primary mb-2 line-clamp-2">
                                {project.title}
                              </h4>
                              <p className="text-card-secondary text-sm line-clamp-3 mb-3">
                                {formatTextWithLineBreaks(
                                  project.longDescription
                                )}
                              </p>

                              {/* Project Actions */}
                              <div className="flex gap-2">
                                <Link
                                  href={`/projects/${project.$id}`}
                                  className="px-3 py-2 bg-[#08273b] text-white rounded-lg text-sm font-medium hover:bg-[#172554] transition-colors duration-300"
                                >
                                  View Details
                                </Link>
                                {project.liveUrl && (
                                  <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-2 bg-card border border-[#08273b] text-[#08273b] rounded-lg text-sm font-medium hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20 hover:border-dark transition-colors duration-300"
                                  >
                                    Live Demo
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>

                      {related.length > 3 && (
                        <div className="text-center">
                          <Link
                            href="/projects"
                            className="inline-flex items-center px-6 py-3 bg-card border border-[#08273b] text-[#08273b] rounded-lg font-medium hover:bg-primary/5 hover:border-dark hover:shadow-lg hover:shadow-primary/20 hover:border-dark transition-all duration-300"
                          >
                            View All Projects
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-card shadow-card rounded-2xl border border-primary/20 p-8 text-center">
                      <div className="text-4xl mb-4">🚀</div>
                      <h3 className="text-lg font-semibold text-card-primary mb-2">
                        No Projects Yet
                      </h3>
                      <p className="text-card-secondary text-sm mb-4">
                        Be the first to start a project in {industry.name}{" "}
                        industry!
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center px-3 py-2 bg-[#08273b] text-white rounded-lg font-medium hover:bg-[#172554] transition-all duration-300 shadow-lg"
                      >
                        Start Your Project
                      </Link>
                    </div>
                  );
                })()}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default IndustryDetailPage