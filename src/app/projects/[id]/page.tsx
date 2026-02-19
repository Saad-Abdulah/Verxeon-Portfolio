'use client'

import Footer from '@/components/shared/Footer'
import { motion } from 'framer-motion'
import { ArrowLeft, Eye, ExternalLink, Code, CheckCircle, Loader2, Code2, Calendar, Users, Award } from 'lucide-react'
import {
  Zap,
  Workflow,
  Shield,
  Gauge,
  Phone,
  Clock,
  Brain,
  ChevronDown,
  Layers,
  Image,
  Mic,
  Sparkles,
  TrendingUp,
  Database,
  MessageSquare,
  Calculator,
  Search,
  MapPin,
  BookOpen,
  Smartphone,
  ShoppingCart,
  BarChart3,
  Bell,
  Lock,
  Target,
  Settings,
  Headphones,
  Mail,
  FileText,
  CheckCircle2,
  Rocket,
  Book,
  Globe,
} from "lucide-react";
import { FaListCheck } from "react-icons/fa6";
import { useMemo } from "react";
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiSupabase,
  SiDocker,
  SiKubernetes,
  SiGraphql,
  SiRedis,
  SiVercel,
  SiAppwrite,
  SiFlutter,
  SiDart,
  SiExpress,
  SiOpenai,
  SiStripe,
  SiGooglemaps,
  SiWebpack,
  SiVite,
  SiEslint,
  SiPrettier,
  SiFramer,
  SiMaterialdesignicons,
  SiSocketdotio,
  SiCloudflare,
  SiFastapi,
  SiDjango,
  SiTensorflow,
  SiN8N,
  SiLangchain,
  SiPlotly,
  SiThreedotjs,
  SiChartdotjs,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { GiPineTree } from "react-icons/gi";

interface Project {
  $id: string;
  title: string;
  longDescription: string;
  services: string[];
  technologies: string[];
  features: string[];
  mainPicture: string;
  images: string[];
  liveUrl?: string;
  createdAt: string;
  updatedAt: string;
  client?: string;
  duration?: string;
  results?: string[];
}

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
    images: [
      "/Projects/Quill Inbox/1.webp",
      "/Projects/Quill Inbox/2.webp",
      "/Projects/Quill Inbox/3.webp",
      "/Projects/Quill Inbox/4.webp",
      "/Projects/Quill Inbox/5.webp",
      "/Projects/Quill Inbox/6.webp",
      "/Projects/Quill Inbox/7.webp",
      "/Projects/Quill Inbox/8.webp",
      "/Projects/Quill Inbox/9.webp",
    ],
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
    images: [
      "/Projects/Voice AI Agent for Meetings Scheduling/1.webp",
      "/Projects/Voice AI Agent for Meetings Scheduling/2.webp",
      "/Projects/Voice AI Agent for Meetings Scheduling/3.webp",
      "/Projects/Voice AI Agent for Meetings Scheduling/4.webp",
      "/Projects/Voice AI Agent for Meetings Scheduling/5.webp",
      "/Projects/Voice AI Agent for Meetings Scheduling/6.webp",
      "/Projects/Voice AI Agent for Meetings Scheduling/7.webp",
      "/Projects/Voice AI Agent for Meetings Scheduling/8.webp",
      "/Projects/Voice AI Agent for Meetings Scheduling/9.webp",
    ],
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
    images: [
      "/Projects/PrismAI/1.webp",
      "/Projects/PrismAI/2.webp",
      "/Projects/PrismAI/3.webp",
      "/Projects/PrismAI/4.webp",
    ],
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
    images: [
      "/Projects/LinkedIn Comments-to-Leads Automation/1.webp",
      "/Projects/LinkedIn Comments-to-Leads Automation/2.webp",
      "/Projects/LinkedIn Comments-to-Leads Automation/3.webp",
      "/Projects/LinkedIn Comments-to-Leads Automation/4.webp",
    ],
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
    mainPicture: "/Projects/ToolSparx.webp",
    images: [
      "/Projects/ToolSparx/1.webp",
      "/Projects/ToolSparx/2.webp",
      "/Projects/ToolSparx/3.webp",
      "/Projects/ToolSparx/4.webp",
      "/Projects/ToolSparx/5.webp",
      "/Projects/ToolSparx/6.webp",
    ],
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
    images: ["/Projects/Pinecone Trouble Shooting Chatbot/1.webp"],
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
    images: ["/Projects/Google Map AI Agent/1.webp"],
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
    images: [
      "/Projects/FleekRead/1.webp",
      "/Projects/FleekRead/2.webp",
      "/Projects/FleekRead/3.webp",
      "/Projects/FleekRead/4.webp",
      "/Projects/FleekRead/5.webp",
      "/Projects/FleekRead/6.webp",
      "/Projects/FleekRead/7.webp",
      "/Projects/FleekRead/8.webp",
      "/Projects/FleekRead/9.webp",
      "/Projects/FleekRead/10.webp",
    ],
    liveUrl: "https://fleekread.com",
  },
  {
    $id: "p9",
    title: "AI PDF-to-Audio Platform – Transform Books into Audiobooks",
    longDescription:
      "AI PDF-to-Audio Platform revolutionizes how people consume written content by instantly converting any PDF or book into natural, human-sounding audio narration. Designed for authors, educators, students, and audiobook enthusiasts, this platform eliminates the barrier between reading and listening, making knowledge accessible to everyone, everywhere.\n\nPowered by cutting-edge AI voice technology, the platform generates expressive, emotion-rich narration that rivals professional voice actors—without the time, cost, or complexity of traditional audiobook production. Users simply upload their PDFs and receive studio-quality audio within minutes, complete with adjustable tone, pacing, and accent options.\n\nBuilt for both individual users and enterprise integrations, the platform features a comprehensive REST API that enables developers to embed PDF-to-audio conversion directly into their own applications. Whether it's an e-learning platform, publishing house, or accessibility tool, businesses can leverage the same AI engine that powers the consumer experience.\n\nThe system's hybrid architecture supports both local GPU deployment for development and testing, plus cloud-based scalability for production workloads. With intelligent chapter-by-chapter processing, users can convert entire books without overwhelming system resources, while real-time progress tracking keeps them informed at every step.\n\nFrom subscription management and usage analytics to secure file storage and automated notifications, every aspect is designed for seamless user experience. The admin panel provides complete oversight of conversions, API usage, and system health, ensuring smooth operations at any scale.\n\nThis project showcases Verxeon's expertise in AI/ML integration, scalable cloud architecture, API design, and building production-ready platforms that solve real-world accessibility challenges while opening new revenue streams for content creators and businesses.",
    category: [
      "AI & ML",
      "Cloud Computing",
      "Web Development",
    ],
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
    images: [
      "/Projects/AI pdf to voice/1.webp",
      "/Projects/AI pdf to voice/2.webp",
      "/Projects/AI pdf to voice/3.webp",
      "/Projects/AI pdf to voice/4.webp",
      "/Projects/AI pdf to voice/5.webp",
      "/Projects/AI pdf to voice/6.webp",
      "/Projects/AI pdf to voice/7.webp",
      "/Projects/AI pdf to voice/8.webp",
      "/Projects/AI pdf to voice/9.webp",
      "/Projects/AI pdf to voice/10.webp",
      "/Projects/AI pdf to voice/11.webp",
    ],
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
    images: [
      "/Projects/HelScript/1.webp",
      "/Projects/HelScript/2.webp",
      "/Projects/HelScript/3.webp",
      "/Projects/HelScript/4.webp",
      "/Projects/HelScript/5.webp",
    ],
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
    images: [
      "/Projects/Styleoro/1.webp",
      "/Projects/Styleoro/2.webp",
      "/Projects/Styleoro/3.webp",
      "/Projects/Styleoro/4.webp",
      "/Projects/Styleoro/5.webp",
      "/Projects/Styleoro/6.webp",
    ],
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
    images: [
      "/Projects/Letzbuynsell/1.webp",
      "/Projects/Letzbuynsell/2.webp",
      "/Projects/Letzbuynsell/3.webp",
      "/Projects/Letzbuynsell/4.webp",
      "/Projects/Letzbuynsell/5.webp",
      "/Projects/Letzbuynsell/6.webp",
      "/Projects/Letzbuynsell/7.webp",
      "/Projects/Letzbuynsell/8.webp",
      "/Projects/Letzbuynsell/9.webp",
    ],
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
    images: [
      "/Projects/E‑commerce Store/1.webp",
      "/Projects/E‑commerce Store/2.webp",
      "/Projects/E‑commerce Store/3.webp",
      "/Projects/E‑commerce Store/4.webp",
    ],
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
    images: ["/Projects/Insurance Agent/1.webp"],
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
    images: [
      "/Projects/AI-Powered Chatbot with OpenAI/1.webp",
      "/Projects/AI-Powered Chatbot with OpenAI/2.webp",
      "/Projects/AI-Powered Chatbot with OpenAI/3.webp",
      "/Projects/AI-Powered Chatbot with OpenAI/4.webp",
    ],
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
    images: [
      "/Projects/FormCO/1.webp",
      "/Projects/FormCO/2.webp",
      "/Projects/FormCO/3.webp",
      "/Projects/FormCO/4.webp",
      "/Projects/FormCO/5.webp",
    ],
    liveUrl: "https://youtu.be/S2ED2RF3-PU?si=j8_OLnAAxVuiaA-J",
  },
];

const PROJECT_HIGHLIGHTS = [
  // Project 1: Quill Inbox
  {
    $id: "p1", // Quill Inbox
    highlights: [
      {
        id: 1,
        icon: Brain,
        color: "#3b82f6",

        // PROBLEM-FOCUSED LAYER
        title: "Never Miss What Matters",
        tagline:
          "Drowning in 200+ emails daily while critical messages get buried?",
        userBenefit: "Reclaim 2+ hours every day",
        description:
          "Imagine having a personal assistant who reads every email the moment it arrives, instantly understands what's urgent, what can wait, and what needs your immediate attention—then surfaces only what truly matters while keeping everything else organized in the background.",

        // SOLUTION BRIDGE
        howItWorks:
          "Our AI reads your emails like a human would—detecting tone, urgency, and intent in real-time—then automatically organizes them into smart categories and helps you respond faster than ever before.",
        keyCapabilities: [
          "Auto-sorts emails by urgency (Urgent/Important/Read Later)",
          "Detects tone and intent to understand context",
          "Surfaces critical messages instantly without manual filtering",
          "Works in real-time as emails arrive—no refresh needed",
        ],

        // TECHNICAL DEPTH
        technicalDetails: {
          approach:
            "Multi-layer NLP pipeline with sentiment analysis, intent detection, and GPT-4.1 integration for human-like email comprehension",
          technologies: [
            "OpenAI GPT-4.1 API",
            "Custom NLP Pipeline",
            "Sentiment Analysis",
            "Chrome Extension APIs",
            "TypeScript",
          ],
          architecture:
            "Client-side content scripts with background service workers for real-time processing, connected to serverless Firebase Functions for secure AI operations",
        },
      },
      {
        id: 2,
        icon: Zap,
        color: "#10b981",

        title: "Reply in Seconds, Not Minutes",
        tagline:
          "Spending 30+ minutes crafting professional responses to routine emails?",
        userBenefit: "Respond 60% faster with AI-powered replies",
        description:
          "Stop staring at blank compose windows. Get instant, context-aware email drafts that sound exactly like you—whether you need a formal business response, a friendly follow-up, or a polite decline. Just review, tweak if needed, and send.",

        howItWorks:
          "The AI analyzes the email you're replying to, understands the context and tone, then generates a complete draft that mirrors your personal writing style—all in seconds.",
        keyCapabilities: [
          "Generates complete email drafts matching your voice",
          "Adapts tone automatically (formal, casual, urgent)",
          "Provides multiple reply options to choose from",
          "Learns from your edits to improve over time",
        ],

        technicalDetails: {
          approach:
            "Context-aware generation using GPT-4.1 with custom prompt engineering and user style profiling based on historical email patterns",
          technologies: [
            "OpenAI GPT-4.1 API",
            "React",
            "Plasmo Framework",
            "Firebase Functions",
          ],
          architecture:
            "Secure API key isolation via Firebase Functions with debounced calls and intelligent caching to handle high-volume generation",
        },
      },
      {
        id: 3,
        icon: Shield,
        color: "#8b5cf6",

        title: "Your Privacy, Guaranteed",
        tagline:
          "Worried about AI tools reading your sensitive business emails?",
        userBenefit: "Enterprise-grade security with zero data retention",
        description:
          "Your emails are yours alone. Unlike cloud-based tools that store and analyze your data, Quill Inbox processes everything locally and securely—your sensitive information never leaves your control and is never stored on our servers.",

        howItWorks:
          "All AI processing happens in real-time during your active session. We don't store, analyze, or retain any of your email content. API keys are isolated in secure serverless functions, and all data stays encrypted.",
        keyCapabilities: [
          "Client-side processing—no data leaves your device",
          "Zero data retention policy—nothing stored on servers",
          "SOC 2 compliant Firebase infrastructure",
          "End-to-end encryption ready for sensitive communications",
        ],

        technicalDetails: {
          approach:
            "Privacy-first architecture with client-side content scripts, secure API key isolation, and ephemeral processing without persistent storage",
          technologies: [
            "Firebase Security Rules",
            "Firebase Functions",
            "Chrome Extension Manifest V3",
            "IndexedDB (local only)",
          ],
          architecture:
            "Serverless backend with Firebase Functions for API key management, all email processing in browser context with no external data transmission",
        },
      },
      {
        id: 4,
        icon: Rocket,
        color: "#f59e0b",

        title: "Works Seamlessly with Gmail",
        tagline:
          "Tired of jumping between multiple apps just to manage your inbox?",
        userBenefit: "Zero setup—works instantly in your existing Gmail",
        description:
          "No new interface to learn, no data migration, no workflow disruption. Quill Inbox integrates directly into your Gmail interface, working silently in the background across all your tabs and devices. Install once, forget forever.",

        howItWorks:
          "The extension plugs directly into Gmail's interface without changing how you work. It runs continuously in the background, processing emails as they arrive and syncing across all your open Gmail tabs automatically.",
        keyCapabilities: [
          "One-click Chrome extension installation",
          "Zero configuration—works immediately after install",
          "Cross-tab synchronization for multi-window workflows",
          "Non-intrusive—no UI clutter or workflow changes",
        ],

        technicalDetails: {
          approach:
            "Native Chrome extension with content script injection for DOM manipulation and background service workers for persistent processing",
          technologies: [
            "Chrome Extension APIs",
            "Plasmo Framework",
            "React",
            "WebSocket",
            "Firebase Realtime Database",
          ],
          architecture:
            "Manifest V3 compliant with service workers, content scripts for Gmail DOM access, and WebSocket for real-time cross-tab communication",
        },
      },
      {
        id: 5,
        icon: Clock,
        color: "#06b6d4",

        title: "Built for Scale, Not Slowdowns",
        tagline: "Managing thousands of emails causing lag and frustration?",
        userBenefit: "Handle 1M+ emails without performance issues",
        description:
          "Whether you receive 50 or 5,000 emails daily, Quill Inbox stays lightning-fast. Our intelligent caching and optimization ensure you never experience lag, freezing, or delays—even with massive email volumes and years of email history.",

        howItWorks:
          "Smart caching stores frequently accessed data locally, while intelligent API management prevents overload. The system processes emails efficiently in the background without impacting your browser performance.",
        keyCapabilities: [
          "Processes 1M+ emails with zero lag",
          "Instant category recall with offline caching",
          "Smart rate limiting prevents API overload",
          "Background processing won't slow down your browser",
        ],

        technicalDetails: {
          approach:
            "High-performance architecture with IndexedDB caching, debounced API calls, and optimized background processing for large-scale email management",
          technologies: [
            "IndexedDB",
            "Web Workers",
            "Debouncing",
            "Webpack",
            "Rollup",
          ],
          architecture:
            "Event-driven processing with IndexedDB for offline data persistence, debounced API calls with exponential backoff, and background service workers for non-blocking operations",
        },
      },
    ],
  },
  // Project 2: AI Receptionist System
  {
    $id: "p2",
    highlights: [
      {
        id: 1,
        icon: Phone,
        title: "Never Miss a Client Again",
        tagline:
          "Losing $10K+ monthly to missed calls during lunch breaks, after hours, and busy periods?",
        color: "#10b981",
        userBenefit: "Capture 100% of inbound opportunities 24/7",
        description:
          "Imagine having a receptionist who never sleeps, never takes breaks, and handles 100 calls simultaneously with the patience of a saint. Every caller gets immediate attention, every appointment gets booked, and you finally stop wondering how many clients slipped through the cracks because the line was busy.",

        howItWorks:
          "An AI voice agent answers your business phone instantly, understands natural conversation, and manages every call from greeting to booking—just like your best receptionist would, but without the human limitations.",

        keyCapabilities: [
          "Zero missed calls with unlimited concurrent handling—busy signals become obsolete",
          "Natural conversations that callers can't distinguish from human staff",
          "Instant response time eliminating 'on hold' frustration for customers",
          "Perfect memory of every interaction and customer preference",
        ],

        technicalDetails: {
          approach:
            "Enterprise-grade conversational AI with real-time voice processing and context-aware natural language understanding for human-like phone interactions",
          technologies: [
            "Advanced Voice AI with <300ms response latency",
            "Natural Language Processing (NLP) for intent recognition",
            "Multi-threaded concurrent call handling (100+ simultaneous)",
            "WebSocket streaming for real-time audio processing",
            "Cloud-based telephony integration (Twilio/Vapi)",
            "Conversation memory with context retention across calls",
          ],
          architecture:
            "Distributed microservices architecture with load-balanced voice processing nodes, real-time audio streaming pipelines, and conversation state management for seamless multi-turn dialogues at scale.",
        },
      },

      {
        id: 2,
        icon: Calendar,
        title: "Schedule Anything by Just Speaking",
        tagline:
          "Spending 20+ minutes per appointment juggling calendars, phone calls, and confirmation emails?",
        color: "#8b5cf6",
        userBenefit:
          "Book appointments in 30 seconds with zero manual data entry",
        description:
          "Picture scheduling appointments the way you'd ask a personal assistant: 'Book John for a consultation next Tuesday at 2pm.' That's it. The AI handles everything—checks availability, sends calendar invites, notifies your team, and even reminds everyone automatically. Booking, rescheduling, or canceling happens through simple conversation, not complex software navigation.",

        howItWorks:
          "Voice commands get translated into calendar actions instantly—the AI extracts all details from your speech (name, date, time, notes), manages your Google Calendar, and sends automatic notifications to everyone involved.",

        keyCapabilities: [
          "Voice-to-calendar in seconds—no typing, clicking, or form-filling required",
          "Intelligent rescheduling that updates all parties automatically when plans change",
          "One-command cancellations that clean up calendars and notify participants instantly",
          "Smart conflict detection preventing double-bookings before they happen",
        ],

        technicalDetails: {
          approach:
            "Voice-driven calendar orchestration with NLP-powered entity extraction, Google Calendar API synchronization, and event-driven notification system for complete meeting lifecycle automation",
          technologies: [
            "Google Calendar API with real-time sync",
            "Named Entity Recognition (NER) for detail extraction",
            "Speech-to-Intent processing with custom NLP models",
            "Event-driven notification system (webhooks)",
            "MongoDB for appointment metadata and relationships",
            "Multi-channel notification dispatch (WhatsApp, SMS, Email)",
          ],
          architecture:
            "Event-sourced system with command-query separation—voice commands trigger state changes that propagate through calendar sync, database updates, and notification queues with automatic rollback on failures.",
        },
      },

      {
        id: 3,
        icon: Users,
        title: "Everyone Gets Exactly What They Need",
        tagline:
          "Team members accessing data they shouldn't while key stakeholders miss critical information?",
        color: "#f59e0b",
        userBenefit: "Perfect information flow with zero security risks",
        description:
          "Think of it like a smart mail room that knows exactly who should see what. Bosses see everything and control the system. Team members automatically receive meetings assigned to them without digging through shared calendars. End users interact only through phone calls, keeping things simple and secure. Everyone operates in their own workspace with precisely the right access level.",

        howItWorks:
          "A three-tier permission system automatically routes information based on roles—bosses manage everything, team members handle their assigned meetings, and end users simply make phone calls without needing any system access.",

        keyCapabilities: [
          "Boss-level control with full system visibility and configuration power",
          "Auto-assignment ensures team members see only their relevant meetings",
          "End users need zero technical knowledge—just make a call and appointments happen",
          "Complete audit trail showing who did what and when for accountability",
        ],

        technicalDetails: {
          approach:
            "Hierarchical role-based access control (RBAC) with relationship mapping and automatic meeting routing based on user connections and team structures",
          technologies: [
            "JWT-based authentication with role claims",
            "MongoDB relational schemas for user hierarchies",
            "Permission middleware with route guards",
            "Relationship mapping algorithms for auto-assignment",
            "Activity logging for full audit trails",
            "Session management with token refresh",
          ],
          architecture:
            "Multi-tenant architecture with row-level security policies, relationship graphs for intelligent routing, and permission inheritance cascading from organization → boss → team member → end user levels.",
        },
      },

      {
        id: 4,
        icon: MessageSquare,
        title: "Everyone Stays in the Loop Automatically",
        tagline:
          "Playing phone tag and sending manual reminders eating up hours of your team's day?",
        color: "#ec4899",
        userBenefit:
          "Eliminate 90% of coordination calls and reminder messages",
        description:
          "Imagine every stakeholder getting exactly the right information at exactly the right moment—confirmations when appointments are booked, updates when times change, and cancellation notices when plans shift. WhatsApp messages appear instantly, video alerts grab attention for urgent matters, and nobody ever asks 'Did you get my message?' because everyone already has what they need.",

        howItWorks:
          "The moment anything happens in your calendar—a booking, change, or cancellation—the system automatically identifies who needs to know and sends them instant notifications through WhatsApp or video alerts with all relevant details.",

        keyCapabilities: [
          "Instant WhatsApp messages reaching people where they already check constantly",
          "Video alerts for high-priority notifications that demand immediate attention",
          "Multi-participant updates ensuring everyone involved gets synchronized information",
          "Smart contact handling that finds the right number for each participant automatically",
        ],

        technicalDetails: {
          approach:
            "Event-driven multi-channel notification system with WhatsApp Business API and video alert generation, triggered by calendar events with dynamic recipient resolution",
          technologies: [
            "WhatsApp Business API for instant messaging",
            "FFmpeg for video alert rendering",
            "Event-driven architecture with message queues",
            "Template engine for dynamic content generation",
            "Contact resolution algorithms from user relationships",
            "Retry logic with exponential backoff for delivery guarantee",
          ],
          architecture:
            "Pub-sub pattern with event bus—calendar changes publish events that trigger parallel notification workflows, with dead-letter queues for failed deliveries and delivery status tracking.",
        },
      },

      {
        id: 5,
        icon: Database,
        title: "Your AI Gets Smarter with Every Conversation",
        tagline:
          "Repeating the same information every time because systems don't remember context?",
        color: "#06b6d4",
        userBenefit:
          "Personalized service that improves daily without any training",
        description:
          "Like a receptionist who's been with you for years, the system remembers everything—John prefers morning appointments, Sarah always asks about parking, David needs longer consultation times. Every conversation makes the AI better at anticipating needs, understanding preferences, and providing that personal touch that makes clients feel valued. All your business data stays perfectly organized while conversation history helps the AI serve people better each time.",

        howItWorks:
          "Two specialized databases work together—one stores your business data (appointments, users, settings) while the other remembers conversation patterns and context, helping the AI understand returning callers and their preferences instantly.",

        keyCapabilities: [
          "Conversation memory that recalls previous interactions and preferences naturally",
          "Business data storage keeping appointments, profiles, and logs perfectly organized",
          "Context retention enabling the AI to pick up where previous conversations left off",
          "Continuous improvement as the system learns from every interaction without manual updates",
        ],

        technicalDetails: {
          approach:
            "Dual-database architecture combining transactional document storage with vector-based conversation memory for both structured data management and semantic context retention",
          technologies: [
            "MongoDB for transactional data (users, meetings, call logs)",
            "ChromaDB vector database for conversation embeddings",
            "Embedding models for semantic similarity search",
            "Real-time bi-directional sync across databases",
            "Document schemas with validation and indexing",
            "Vector search with cosine similarity for context retrieval",
          ],
          architecture:
            "Polyglot persistence with separate read/write patterns—MongoDB handles CRUD operations with ACID transactions while ChromaDB provides semantic search through vector embeddings, with event sourcing keeping both databases synchronized.",
        },
      },

      {
        id: 6,
        icon: TrendingUp,
        title: "Slash Overhead While Scaling Service",
        tagline:
          "Paying $5K+/month for reception staff who can still only handle one call at a time?",
        color: "#ef4444",
        userBenefit: "Save $60K+/year while handling unlimited growth",
        description:
          "Replace the entire cost of reception staff—salary, benefits, sick days, training time—with a system that costs a fraction of the price and handles more volume than a team of five. No more 'sorry, we're busy' or missed calls because everyone's at lunch. Whether you're a solo practice or scaling to multiple locations, the cost stays predictable while your capacity becomes unlimited. It's like paying for one employee but getting a team that never stops working.",

        howItWorks:
          "A single AI system replaces multiple full-time receptionists by handling unlimited simultaneous calls, never needing breaks or time off, and maintaining perfect consistency from the first day forever.",

        keyCapabilities: [
          "Eliminate $5K-$8K monthly staffing costs with predictable low-cost subscription",
          "Scale from handling 10 to 10,000 appointments without adding headcount",
          "Zero human error, no sick days, no training time or employee turnover",
          "Instant deployment across multiple locations or departments without hiring",
        ],

        technicalDetails: {
          approach:
            "Cloud-native AI infrastructure with auto-scaling capabilities, designed for high-volume concurrent processing with enterprise reliability and multi-tenant support",
          technologies: [
            "Horizontal scaling with load balancers",
            "Multi-tenant SaaS architecture",
            "Auto-scaling compute resources (AWS Lambda/EC2)",
            "Cost optimization with usage-based pricing",
            "High-availability infrastructure (99.9% uptime)",
            "CDN distribution for low-latency global access",
          ],
          architecture:
            "Serverless microservices with auto-scaling based on call volume—stateless voice processing nodes scale horizontally while persistent storage handles millions of records with predictable costs regardless of load.",
        },
      },
    ],
  },
  // Project 3: PrismAI
  {
    $id: "p3",
    highlights: [
      {
        id: 1,
        icon: Layers,
        title: "Stop Juggling Multiple AI Subscriptions",
        tagline:
          "Paying for ChatGPT Plus, Claude Pro, and DALL-E separately while switching between tabs constantly?",
        color: "#3b82f6",
        userBenefit: "Access 5+ premium AI models from one place",
        description:
          "Imagine having every AI assistant in one room instead of running between different apps. Need GPT-4 for writing? It's here. Want Claude for analysis? Same interface. Need to generate images? Don't open another tab—it's already integrated. One subscription, one interface, every model you need. Stop paying separately for tools that should work together.",

        howItWorks:
          "A unified platform connects you to multiple AI providers seamlessly—pick your preferred model from a dropdown and start chatting, with automatic switching to specialized models when you upload images or request creative content.",

        keyCapabilities: [
          "5+ AI models accessible instantly—GPT-3.5, GPT-4, Claude, Gemini, DALL-E all in one place",
          "Automatic model selection when you upload images or ask for visual tasks",
          "Single conversation history across all models for easy reference and comparison",
          "Cost optimization by using the right model for each specific task automatically",
        ],

        technicalDetails: {
          approach:
            "Multi-provider AI aggregation platform with unified API abstraction layer, intelligent model routing based on task type, and cross-model conversation management",
          technologies: [
            "OpenAI API (GPT-3.5, GPT-4, GPT-4o, DALL-E 3)",
            "Anthropic Claude API integration",
            "Google Gemini API",
            "Model router with task-based selection logic",
            "Unified response streaming across providers",
            "Provider fallback for high availability",
          ],
          architecture:
            "Adapter pattern with provider-agnostic interface—each AI service wrapped in standardized adapter, with request queuing, rate limiting, and automatic fallback to alternative models when primary service unavailable.",
        },
      },

      {
        id: 2,
        icon: Image,
        title: "Show, Don't Tell—AI That Sees",
        tagline:
          "Struggling to describe images in words when the AI could just look at them directly?",
        color: "#10b981",
        userBenefit: "Get instant answers about any image in seconds",
        description:
          "Drop a photo and ask 'What's wrong with this design?' or 'How do I fix this?' No more typing paragraphs trying to describe what you're seeing. The AI looks at your screenshot, diagram, photo, or document and understands it instantly. It's like having an expert look over your shoulder who can analyze anything visual in real-time.",

        howItWorks:
          "Drag and drop images directly into conversations or snap photos with your device camera, and GPT-4o's vision model analyzes them immediately, understanding content, text, designs, and objects to provide context-aware responses.",

        keyCapabilities: [
          "Drag-and-drop image upload with instant AI visual understanding",
          "Camera integration for capturing and analyzing photos in real-time",
          "Automatic image optimization ensuring fast upload without quality loss",
          "Multi-image analysis comparing several images in a single conversation",
        ],

        technicalDetails: {
          approach:
            "GPT-4 Vision API integration with client-side image preprocessing, base64 encoding, and multimodal prompt construction for image-text conversations",
          technologies: [
            "GPT-4o Vision API for multimodal understanding",
            "Canvas API for client-side image compression",
            "Base64 encoding for image transmission",
            "File validation (type, size, format checking)",
            "Image optimization algorithms (resize, compress)",
            "Multi-part form data for file uploads",
          ],
          architecture:
            "Multimodal request pipeline—images preprocessed client-side, compressed and encoded, then sent with text prompts to GPT-4 Vision in single API call with conversation context maintained across text and image messages.",
        },
      },

      {
        id: 3,
        icon: MessageSquare,
        title: "Conversations That Feel Alive",
        tagline:
          "Staring at loading spinners while AI takes forever to generate responses?",
        color: "#8b5cf6",
        userBenefit: "See AI thinking in real-time—no more waiting",
        description:
          "Watch responses appear word by word like you're texting with a friend who types fast. No more staring at blank screens wondering if the AI heard you. See it thinking, see it writing, and interrupt or adjust mid-response if needed. Every conversation stays saved automatically so you can revisit brilliant ideas from weeks ago without losing context.",

        howItWorks:
          "Responses stream in real-time using a typewriter effect—you see each word as the AI generates it, and all conversations auto-save to your history so you never lose important discussions or insights.",

        keyCapabilities: [
          "Live streaming responses revealing AI's thought process as it happens",
          "Persistent chat history with all conversations searchable and retrievable instantly",
          "Regenerate responses for alternative answers without retyping your question",
          "Rich markdown formatting for code, lists, and formatted text automatically rendered",
        ],

        technicalDetails: {
          approach:
            "Server-sent events (SSE) for real-time streaming, with client-side markdown rendering, conversation persistence in database, and regeneration via API call resubmission",
          technologies: [
            "Server-Sent Events (SSE) for response streaming",
            "Markdown parser with syntax highlighting (markdown-it)",
            "IndexedDB/LocalStorage for conversation persistence",
            "React streaming UI with incremental rendering",
            "WebSocket fallback for SSE-incompatible networks",
            "Code syntax highlighting (Prism.js/highlight.js)",
          ],
          architecture:
            "Event-driven streaming architecture—backend streams tokens via SSE, frontend buffers and renders incrementally, with conversation state managed in browser storage and synced to server on completion for history persistence.",
        },
      },

      {
        id: 4,
        icon: Mic,
        title: "Talk, Type, or Show—Your Choice",
        tagline:
          "Limited to typing when speaking or showing would be so much faster?",
        color: "#f59e0b",
        userBenefit: "Communicate naturally however you prefer",
        description:
          "Some moments call for typing, others for speaking into your phone, and many for just showing a picture. Switch between text, voice recording, and image uploads seamlessly based on what feels natural in the moment. Dictate long ideas while driving, snap photos of problems needing solutions, or type when precision matters—the AI adapts to however you want to communicate.",

        howItWorks:
          "Flexible input system accepts text typing, voice recordings that get transcribed automatically, or images uploaded via drag-drop or camera—all processed by the same AI with full understanding regardless of input method.",

        keyCapabilities: [
          "Voice recording with automatic transcription turning speech into text instantly",
          "File uploads with smart validation preventing errors before they happen",
          "Context-aware suggestions helping you phrase requests more effectively",
          "Seamless mode switching—type, talk, or show without changing screens",
        ],

        technicalDetails: {
          approach:
            "Multimodal input processing with Web Audio API for voice capture, automatic speech recognition (ASR), file validation, and unified message construction",
          technologies: [
            "Web Audio API for voice recording",
            "Speech-to-Text API (Whisper/Web Speech API)",
            "File input with MIME type validation",
            "Size limits and format checking (images: JPEG/PNG, audio: MP3/WAV)",
            "FormData API for multi-part uploads",
            "Prompt suggestion engine with NLP",
          ],
          architecture:
            "Input abstraction layer—voice, text, and images normalized into unified message format before AI processing, with preprocessing pipeline validating and optimizing each input type before transmission.",
        },
      },

      {
        id: 5,
        icon: Sparkles,
        title: "Interface That Gets Out of Your Way",
        tagline:
          "Fighting with clunky interfaces when you just want to focus on the conversation?",
        color: "#ec4899",
        userBenefit: "Effortless experience on any device, anytime",
        description:
          "A clean, beautiful interface that works perfectly whether you're on your laptop at home or your phone on the go. Dark mode for late-night brainstorming, keyboard shortcuts for power users, smooth animations that make everything feel responsive and alive. The design disappears into the background so you can focus entirely on your conversation with AI, not wrestling with the tool.",

        howItWorks:
          "Responsive design automatically adapts to your screen size, dark mode switches based on preference or time of day, and keyboard shortcuts let you send messages or navigate quickly without touching your mouse.",

        keyCapabilities: [
          "Full dark mode with smooth transitions—easy on eyes during long sessions",
          "Mobile responsive with touch optimization—works perfectly on phones and tablets",
          "Keyboard shortcuts (Cmd/Ctrl+Enter) for power users who hate clicking",
          "Smooth animations making every interaction feel polished and intentional",
        ],

        technicalDetails: {
          approach:
            "Mobile-first responsive design with CSS-in-JS theming, system preference detection, touch event optimization, and accessibility compliance (WCAG 2.1 AA)",
          technologies: [
            "Tailwind CSS with responsive breakpoints",
            "CSS custom properties for dynamic theming",
            "matchMedia API for system dark mode detection",
            "Touch event handlers with gesture recognition",
            "Framer Motion for smooth animations",
            "Keyboard event listeners with shortcut mapping",
          ],
          architecture:
            "Component-based UI with theme context provider, viewport-based responsive rendering, and progressive enhancement—core functionality works without JavaScript while enhanced features layer on top.",
        },
      },
    ],
  },
  // Project 4: LinkedIn Comments-to-Leads Automation
  {
    $id: "p4",
    highlights: [
      {
        id: 1,
        icon: TrendingUp,
        title: "Turn Engagement Into Revenue Automatically",
        tagline:
          "Watching hundreds of comments roll in on your viral post but having no way to capture those leads?",
        color: "#0077b5",
        userBenefit: "Convert 10X more post engagement into qualified leads",
        description:
          "Imagine every person commenting on your LinkedIn post automatically becoming a lead in your pipeline without lifting a finger. Someone comments 'interested!' and boom—they're in your system with their profile data ready for outreach. No more copying names into spreadsheets at midnight, no more lost opportunities because you couldn't keep up with notifications. Your viral moments finally translate into actual business growth.",

        howItWorks:
          "The system monitors your LinkedIn posts continuously, automatically captures every commenter's username and engagement data in real-time, and builds a comprehensive lead list while you focus on creating more great content.",

        keyCapabilities: [
          "Automatic comment scraping from any LinkedIn post without manual data entry",
          "Real-time lead capture—see your pipeline grow as comments appear",
          "Eliminate 10+ hours weekly spent on manual lead collection and data entry",
          "Never miss a hot lead because comments moved too fast to track",
        ],

        technicalDetails: {
          approach:
            "LinkedIn web scraping automation with headless browser orchestration, comment monitoring, and real-time data extraction from post engagement",
          technologies: [
            "Puppeteer/Playwright for headless browser automation",
            "LinkedIn API (unofficial) for comment extraction",
            "Rate limiting and request throttling for stealth scraping",
            "DOM parsing with CSS selectors",
            "Session management with cookie persistence",
            "Proxy rotation for IP management",
          ],
          architecture:
            "Event-driven scraping pipeline with queue-based job processing—monitors posts at intervals, extracts comment data incrementally, deduplicates entries, and streams results to storage with retry logic for failed extractions.",
        },
      },

      {
        id: 2,
        icon: Users,
        title: "Know Everything About Your Leads Instantly",
        tagline:
          "Getting just names and profile links when you need job titles, company size, and decision-maker status?",
        color: "#10b981",
        userBenefit: "Rich lead profiles for 90%+ better qualification",
        description:
          "Turn a list of names into a goldmine of intelligence. Automatically gather each commenter's job title, company, industry, location, connection count, and activity level. Know immediately if they're a CEO of a 500-person company or an intern at a startup. Stop wasting time reaching out to unqualified leads—focus your energy on the prospects who actually match your ideal customer profile.",

        howItWorks:
          "After capturing commenters, the system visits each person's LinkedIn profile in the background, extracts comprehensive professional data, and enriches your lead list with detailed information for better targeting and personalization.",

        keyCapabilities: [
          "Batch profile scraping gathering complete LinkedIn data for hundreds of leads",
          "Comprehensive data extraction—job title, company, industry, experience, education",
          "Automatic lead scoring based on profile attributes and engagement patterns",
          "Build complete prospect profiles while you sleep—wake up to qualified leads",
        ],

        technicalDetails: {
          approach:
            "Profile enrichment pipeline with parallel scraping, structured data extraction from LinkedIn profile pages, and lead scoring algorithms based on firmographic data",
          technologies: [
            "Parallel browser instances for batch processing",
            "XPath/CSS selectors for profile data extraction",
            "Named Entity Recognition (NER) for unstructured data parsing",
            "Lead scoring algorithms with weighted attributes",
            "Data normalization and standardization",
            "Profile caching to avoid re-scraping",
          ],
          architecture:
            "Worker pool pattern with concurrent profile scraping—job queue distributes profile URLs to worker threads, each running isolated browser context, with aggregated results normalized and scored before storage.",
        },
      },

      {
        id: 3,
        icon: Database,
        title: "Your Leads, Perfectly Organized and Accessible",
        tagline:
          "Scattered lead data across notes, screenshots, and memory making follow-up impossible to manage?",
        color: "#8b5cf6",
        userBenefit: "Instant access to organized, actionable lead data",
        description:
          "Every lead automatically populates into a beautiful, organized Google Sheet—no more chaos. Sort by company size, filter by industry, search by job title. Share access with your sales team so everyone sees the same up-to-date information. Export segments for targeted campaigns. Your lead database becomes a living, breathing tool that your entire team can use effectively instead of a mess nobody wants to touch.",

        howItWorks:
          "Enriched lead data flows directly into a pre-formatted Google Sheet with columns for name, title, company, industry, and more—automatically organized, deduplicated, and ready for your team to use immediately.",

        keyCapabilities: [
          "Auto-populate Google Sheets with zero manual data entry or formatting",
          "Structured organization with sortable columns and consistent data format",
          "Real-time team collaboration with shared access and simultaneous editing",
          "Export-ready data for CRM import or email campaign uploads",
        ],

        technicalDetails: {
          approach:
            "Google Sheets API integration with automated spreadsheet population, schema validation, duplicate prevention, and concurrent write handling",
          technologies: [
            "Google Sheets API v4 with service account authentication",
            "Batch write operations for performance optimization",
            "Data validation and schema enforcement",
            "Duplicate detection using unique identifiers",
            "OAuth 2.0 for user authorization",
            "Spreadsheet formatting with conditional styling",
          ],
          architecture:
            "ETL pipeline with transform-and-load pattern—scraped data transformed into standardized schema, validated against business rules, then batch-loaded to Google Sheets with upsert logic preventing duplicates and update conflicts.",
        },
      },

      {
        id: 4,
        icon: Workflow,
        title: "From Lead to Customer on Autopilot",
        tagline:
          "Leads sitting in spreadsheets gathering dust because there's no easy path to outreach?",
        color: "#f59e0b",
        userBenefit: "Automated nurture campaigns from captured leads",
        description:
          "Your freshly captured leads don't just sit there—they flow directly into your CRM and outreach tools automatically. Trigger email sequences, add to LinkedIn outreach campaigns, or sync to your sales platform without touching a single export button. The moment someone comments, they're already moving through your sales funnel. Lead generation finally connects to lead conversion seamlessly.",

        howItWorks:
          "Integration-ready data structure allows direct connection to popular CRM systems and marketing automation tools—leads captured from LinkedIn automatically appear in your sales tools ready for immediate follow-up and campaign enrollment.",

        keyCapabilities: [
          "CRM-ready data format for instant import into Salesforce, HubSpot, or Pipedrive",
          "Marketing automation integration triggering nurture sequences automatically",
          "Scalable for high-volume campaigns processing thousands of leads weekly",
          "API webhooks enabling custom workflow automation with any business tool",
        ],

        technicalDetails: {
          approach:
            "Integration middleware with webhook delivery, CRM API connectors, and standardized data mapping for multi-platform compatibility",
          technologies: [
            "Zapier/Make.com integration for no-code connections",
            "REST API webhooks for real-time lead delivery",
            "CRM API connectors (Salesforce, HubSpot, Pipedrive)",
            "OAuth 2.0 for third-party authorization",
            "Data transformation with field mapping engine",
            "Retry queues with exponential backoff",
          ],
          architecture:
            "Event-driven integration hub—lead enrichment events trigger webhook delivery to configured endpoints, with transformation middleware adapting data schemas to match target CRM requirements and dead-letter queues capturing failed deliveries.",
        },
      },
    ],
  },
  // Project 5: ToolSparx
  {
    $id: "p5",
    highlights: [
      {
        id: 1,
        icon: Brain,
        title: "Every AI Brain in One Place",
        tagline:
          "Paying for multiple AI subscriptions and still not finding the right model for each task?",
        color: "#3b82f6",
        userBenefit: "Access 5+ premium AI models without juggling accounts",
        description:
          "Stop deciding between ChatGPT, Claude, or Gemini for every task. Have a conversation with GPT-4o, then instantly switch to Claude for analysis, then try Gemini for a different perspective—all in the same thread. Compare answers across models, find which AI 'thinks' best for your specific needs, and keep everything in one searchable history. It's like having a panel of expert advisors instead of just one.",

        howItWorks:
          "A unified chatbot interface connects you to GPT-4o, Claude, Gemini, DeepSeek, and Llama simultaneously—switch models mid-conversation with a dropdown, upload files for analysis, and access your entire chat history across all AI models from one dashboard.",

        keyCapabilities: [
          "5+ leading AI models accessible instantly from a single interface",
          "Persistent chat history across all sessions and models for easy reference",
          "File upload support for document analysis by any AI model you choose",
          "Model comparison—ask the same question to multiple AIs and see different perspectives",
        ],

        technicalDetails: {
          approach:
            "Multi-provider AI aggregation with unified API abstraction, provider-agnostic message format, cross-model conversation threading, and file processing pipeline",
          technologies: [
            "OpenAI API (GPT-4o)",
            "Anthropic Claude API",
            "Google Gemini API",
            "DeepSeek and Llama model endpoints",
            "Provider adapter pattern for unified interface",
            "File parsing (PDF, DOCX, TXT) with encoding detection",
          ],
          architecture:
            "Adapter-based multi-provider system—each AI service wrapped in standardized interface with request/response normalization, conversation state managed independently from provider, and file preprocessing before submission to selected model.",
        },
      },

      {
        id: 2,
        icon: Calculator,
        title: "20+ Tools That Actually Save Time",
        tagline:
          "Opening random websites for every small calculation or task, each with annoying ads and slow load times?",
        color: "#10b981",
        userBenefit: "One-stop toolkit eliminating dozens of separate websites",
        description:
          "Need to calculate your GPA? It's here. BMI check? Done. Convert currency? Instant. Write an article with AI? Built-in. Check grammar? Already included. Stop maintaining browser bookmarks for 20 different tools and stop fighting through ads on questionable calculator websites. Everything you need for productivity, academics, and writing lives in one clean, fast, ad-free interface.",

        howItWorks:
          "A comprehensive suite of calculators, converters, and AI-powered writing tools—from age and BMI calculators to currency converters, GPA calculators, AI article writers, paraphrasers, word counters, and grammar checkers—all accessible from one navigation menu.",

        keyCapabilities: [
          "Age, BMI, Currency, GPA, and Grade calculators with instant results",
          "AI-powered Article Writer and Paraphraser for content creation",
          "Word Counter and Grammar Checker for writing refinement",
          "Bookmark-free access—no more hunting for the right tool website",
        ],

        technicalDetails: {
          approach:
            "Modular tool architecture with client-side computation for calculators, AI API integration for writing tools, and component-based UI for tool selection and execution",
          technologies: [
            "React component library with tool modules",
            "Client-side JavaScript for calculator logic",
            "AI APIs for writing and paraphrasing tools",
            "Grammar checking algorithms (LanguageTool API)",
            "Currency exchange rate API integration",
            "Local storage for tool preferences and history",
          ],
          architecture:
            "Component-based architecture with lazy loading—each tool loads as independent module on demand, calculator logic runs client-side for instant results, AI tools make API calls server-side with caching for common requests.",
        },
      },

      {
        id: 3,
        icon: Smartphone,
        title: "Works Perfectly Everywhere You Do",
        tagline:
          "Tools that break on mobile or force you to pinch-and-zoom constantly?",
        color: "#8b5cf6",
        userBenefit: "Seamless experience across phone, tablet, and desktop",
        description:
          "Pull out your phone on the bus and use the GPA calculator. Grab your tablet on the couch for an AI writing session. Sit at your desk for deep work—everything adapts perfectly to your screen. Touch-friendly buttons on mobile, keyboard shortcuts on desktop, smooth animations everywhere. No more frustrating mobile experiences that feel like afterthoughts. The interface was built mobile-first, so it actually works great on small screens.",

        howItWorks:
          "Responsive design automatically restructures the interface based on your device—stacked layouts for phones, side-by-side for tablets, full dashboard for desktops—with touch optimization for mobile and accessibility features ensuring everyone can use every tool.",

        keyCapabilities: [
          "Mobile-optimized interface with touch-friendly buttons and gesture support",
          "WCAG accessibility compliance ensuring everyone can use all tools effectively",
          "Responsive breakpoints adapting layout perfectly to any screen size",
          "Smooth transitions and animations that work on all devices without lag",
        ],

        technicalDetails: {
          approach:
            "Mobile-first responsive design with CSS Grid/Flexbox layouts, touch event handling, viewport-based rendering, and WCAG 2.1 AA accessibility compliance",
          technologies: [
            "Tailwind CSS with responsive utilities",
            "CSS Grid and Flexbox for adaptive layouts",
            "Touch event handlers with gesture detection",
            "ARIA labels and semantic HTML for accessibility",
            "matchMedia API for breakpoint detection",
            "Intersection Observer for scroll optimizations",
          ],
          architecture:
            "Progressive enhancement strategy—core functionality works on basic mobile browsers, enhanced features layer progressively based on device capabilities, with viewport-based component rendering for optimal performance across screen sizes.",
        },
      },

      {
        id: 4,
        icon: Gauge,
        title: "Lightning Fast When You Need It",
        tagline:
          "Waiting 10+ seconds for simple tools to load while ads and trackers bog everything down?",
        color: "#f59e0b",
        userBenefit: "Sub-2 second load times with zero frustration",
        description:
          "Click a tool and it appears instantly. No loading spinners for simple calculations. No timeout errors when AI processes your request. No wondering if it crashed when the response takes longer than expected. Automatic error handling catches problems before you notice them, retry logic fixes temporary issues invisibly, and request timeouts prevent you from waiting forever. Speed and reliability so consistent you forget it's even there.",

        howItWorks:
          "Optimized code splitting loads only what you need when you need it, client-side computation eliminates server delays for calculators, and robust error handling with automatic retries ensures requests complete successfully even with poor connections.",

        keyCapabilities: [
          "Sub-2 second page loads with code splitting and lazy loading optimization",
          "15-second request timeouts preventing endless waiting on stalled requests",
          "Automatic error recovery with exponential backoff retry logic",
          "Zero-latency calculator tools running entirely in your browser",
        ],

        technicalDetails: {
          approach:
            "Performance-optimized architecture with code splitting, lazy loading, client-side computation where possible, request timeout protection, and automatic retry with exponential backoff",
          technologies: [
            "Webpack code splitting with dynamic imports",
            "React.lazy for component lazy loading",
            "Service Workers for offline capability",
            "Axios with timeout and retry interceptors",
            "Exponential backoff algorithms for retries",
            "Performance monitoring (Web Vitals)",
          ],
          architecture:
            "Bundle optimization with route-based code splitting—initial bundle minimal, tool-specific code loads on demand, with service worker caching frequently used assets and retry middleware handling failed requests automatically up to 3 attempts.",
        },
      },

      {
        id: 5,
        icon: Search,
        title: "Built to Be Found by Your Audience",
        tagline:
          "Creating great tools but nobody discovers them because search engines can't see your site?",
        color: "#06b6d4",
        userBenefit: "Maximum visibility in search results organically",
        description:
          "Every page optimized to rank in Google. Rich meta tags make your links look professional when shared on social media. Structured data tells search engines exactly what your tools do. Accessibility standards ensure screen readers work perfectly. The technical foundation is built so search engines and users both love your site, bringing organic traffic without paying for ads.",

        howItWorks:
          "Comprehensive SEO implementation with proper meta tags, Open Graph markup for social sharing, structured data for rich search results, and full accessibility compliance ensuring both search engines and assistive technologies understand your content perfectly.",

        keyCapabilities: [
          "Complete meta tag optimization for search engines and social media sharing",
          "Structured data markup generating rich snippets in Google search results",
          "Full WCAG accessibility ensuring maximum reach to all potential users",
          "Performance scores optimized for Core Web Vitals improving search rankings",
        ],

        technicalDetails: {
          approach:
            "Technical SEO with comprehensive meta tags, JSON-LD structured data, semantic HTML, accessibility compliance, and performance optimization for search ranking factors",
          technologies: [
            "React Helmet for dynamic meta tag management",
            "JSON-LD structured data schemas",
            "Open Graph and Twitter Card protocols",
            "Semantic HTML5 elements",
            "ARIA attributes for accessibility",
            "Sitemap generation and robots.txt optimization",
          ],
          architecture:
            "SEO-first rendering with server-side generation for critical content, dynamic meta tag injection based on route, structured data embedded per page type, and performance optimization ensuring fast Core Web Vitals scores affecting search rankings.",
        },
      },
    ],
  },
  // Project 6: Pinecone Trouble Shooting Chatbot
  {
    $id: "p6",
    highlights: [
      {
        id: 1,
        icon: Database,
        title: "Your Entire Knowledge Base Becomes a Smart Assistant",
        tagline:
          "Employees spending hours digging through PDFs and wikis while customers wait on hold?",
        color: "#3b82f6",
        userBenefit: "Instant answers from your documentation—every time",
        description:
          "Imagine uploading your entire troubleshooting library and having an AI that actually understands it. A customer calls about error code XYZ? The chatbot instantly finds the exact resolution from your documentation and walks them through the steps. No more 'let me check the manual' delays. No more inconsistent answers from different support agents. Your documented expertise becomes instantly accessible 24/7 to anyone who asks.",

        howItWorks:
          "Upload your resolution documents, troubleshooting guides, and knowledge base articles—the system ingests them, understands their content, and retrieves precise answers when customers ask questions by finding the most relevant information from your entire document library.",

        keyCapabilities: [
          "Extract accurate information directly from your business documents automatically",
          "Step-by-step troubleshooting guidance based on proven resolution procedures",
          "Context-aware responses understanding the nuances of your specific industry",
          "Consistent answers eliminating human error and knowledge gaps across support team",
        ],

        technicalDetails: {
          approach:
            "Document-based RAG (Retrieval-Augmented Generation) with vector embeddings, semantic search across knowledge base, and LLM-powered answer synthesis from retrieved context",
          technologies: [
            "Pinecone vector database for document embeddings",
            "OpenAI Embeddings API (text-embedding-ada-002)",
            "Document parsing (PDF, DOCX, HTML extractors)",
            "Chunking strategies for optimal retrieval (500-1000 tokens)",
            "Cosine similarity search for semantic matching",
            "LLM prompting with retrieved context injection",
          ],
          architecture:
            "RAG pipeline with ingestion and retrieval phases—documents chunked and embedded during ingestion to Pinecone, user queries embedded and matched via vector similarity, top-k relevant chunks retrieved and injected into LLM prompt for grounded answer generation.",
        },
      },

      {
        id: 2,
        icon: Zap,
        title: "Launch Industry-Specific Chatbots in Minutes",
        tagline:
          "Spending months developing custom AI solutions when you just need to answer questions from your docs?",
        color: "#10b981",
        userBenefit:
          "Deploy specialized chatbots without coding or AI expertise",
        description:
          "Insurance company? Upload policy documents. Tech support? Drop in your troubleshooting guides. Healthcare clinic? Submit procedure manuals. In literally minutes, you have a functional chatbot that answers questions specific to YOUR business using YOUR documents. No developers needed, no AI training required, no complex setup. Just upload documents and start getting intelligent answers immediately.",

        howItWorks:
          "Simply upload your domain-specific documents through a simple interface—the system automatically processes them, learns from their content, and becomes instantly ready to answer questions based on that specialized knowledge without any technical configuration.",

        keyCapabilities: [
          "Fast setup requiring only document uploads—no coding or AI knowledge needed",
          "Build niche-specific chatbots for any industry in under 10 minutes",
          "Automatic content understanding without manual training or configuration",
          "Update knowledge base by simply uploading new documents as they're created",
        ],

        technicalDetails: {
          approach:
            "No-code document ingestion with automatic preprocessing, chunking optimization, batch embedding generation, and vector database population without requiring technical expertise",
          technologies: [
            "Drag-and-drop file upload with validation",
            "Automatic document format detection and parsing",
            "Batch embedding generation with progress tracking",
            "Pinecone namespace isolation for multi-tenant support",
            "Metadata tagging for document organization",
            "Web UI for non-technical document management",
          ],
          architecture:
            "Async ingestion pipeline with job queue—uploaded documents added to processing queue, background workers parse and chunk content, embeddings generated in batches, then stored in Pinecone with metadata, all tracked via progress UI without blocking user.",
        },
      },

      {
        id: 3,
        icon: MessageSquare,
        title: "Questions Get Matched to Perfect Answers",
        tagline:
          "Customers asking the same questions different ways and getting inconsistent or wrong answers?",
        color: "#8b5cf6",
        userBenefit: "Accurate answers regardless of how questions are phrased",
        description:
          "Someone asks 'My printer won't connect' and another asks 'WiFi printing broken'—both get the same perfect answer from your documentation because the AI understands meaning, not just keywords. It finds relevant information even when customers use completely different wording than your manuals. No more 'no results found' because they said 'fix' instead of 'troubleshoot.' Semantic understanding ensures the right answer finds the right question.",

        howItWorks:
          "Natural language understanding analyzes the meaning behind customer questions, searches your entire knowledge base semantically (not just keyword matching), and retrieves the most relevant document sections regardless of exact wording differences.",

        keyCapabilities: [
          "Semantic search understanding intent beyond exact keyword matches",
          "Multi-document retrieval when answers span multiple knowledge base articles",
          "Natural language query handling accepting varied phrasings of same question",
          "Relevance ranking ensuring best answers appear first automatically",
        ],

        technicalDetails: {
          approach:
            "Semantic search using vector similarity with query embedding, top-k retrieval from vector database, re-ranking with cross-encoders, and answer synthesis from multiple sources",
          technologies: [
            "Query embedding with same model as documents (consistency)",
            "Cosine similarity for vector matching in Pinecone",
            "Hybrid search combining vector and keyword search",
            "Re-ranking models (cross-encoders) for relevance refinement",
            "Multi-query expansion for comprehensive retrieval",
            "Answer synthesis with citation attribution",
          ],
          architecture:
            "Two-stage retrieval—initial vector search returns top 20 candidates via Pinecone, cross-encoder re-ranks for true relevance, top 3-5 chunks injected into LLM with instruction to synthesize coherent answer while citing sources.",
        },
      },

      {
        id: 4,
        icon: Target,
        title: "One Solution, Infinite Industries",
        tagline:
          "Needing custom AI for tech support, insurance claims, healthcare FAQs, and each costing $50K+?",
        color: "#f59e0b",
        userBenefit: "Universal chatbot that adapts to any business domain",
        description:
          "The same core system powers tech support chatbots, insurance claim assistants, healthcare information portals, retail customer service, legal document Q&A, and more. Upload manufacturing manuals for factory support or restaurant training materials for service staff—the AI adapts completely to whatever domain you feed it. One platform, unlimited applications. Stop paying for industry-specific solutions when one flexible tool does it all.",

        howItWorks:
          "Domain-agnostic architecture means the chatbot doesn't care if you're in healthcare, tech, insurance, or retail—it simply learns from whatever documents you provide and becomes an expert in that specific field automatically.",

        keyCapabilities: [
          "Industry versatility—works for tech, healthcare, insurance, retail, legal, and more",
          "Technical and non-technical domain support without changing the underlying system",
          "Scalable from small businesses to enterprises handling millions of queries",
          "Multi-language support expanding reach to global customer bases",
        ],

        technicalDetails: {
          approach:
            "Domain-agnostic RAG system with content-independent embeddings, no domain-specific training required, multi-tenant architecture, and language-agnostic processing",
          technologies: [
            "Universal text embeddings (not domain-specific)",
            "Multi-lingual embedding models supporting 100+ languages",
            "Namespace isolation in Pinecone for tenant separation",
            "Dynamic prompt engineering adapting to document types",
            "Metadata filtering for domain-specific constraints",
            "Horizontal scaling with stateless query processing",
          ],
          architecture:
            "Multi-tenant SaaS with namespace isolation—each customer's documents stored in separate Pinecone namespace, queries scoped to customer context, shared embedding and LLM infrastructure serving all tenants with per-customer rate limiting and usage tracking.",
        },
      },
    ],
  },
  // Project 7: Google Map AI Agent
  {
    $id: "p7",
    highlights: [
      {
        id: 1,
        icon: MapPin,
        color: "#ea4335",

        // LAYER 1: PROBLEM-FOCUSED
        title: "Find Your Perfect Customers, Automatically",
        tagline:
          "Spending weeks manually researching businesses only to end up with incomplete contact lists?",
        userBenefit: "Build a 500+ prospect list in under 2 hours",
        description:
          "Imagine having a research assistant who never sleeps—scouring Google Maps 24/7 to find every restaurant in Manhattan, every dentist in Austin, or every gym in your target city. Instead of clicking through hundreds of business listings one by one, you wake up to a perfectly organized spreadsheet of potential clients, complete with everything you need to reach out.",

        // LAYER 2: SOLUTION BRIDGE
        howItWorks:
          "Simply specify your target business type and location. The system automatically searches Google Maps, extracts all relevant business information, and delivers a ready-to-use prospect list.",
        keyCapabilities: [
          "Search any business niche in any geographic location worldwide",
          "Extract name, address, phone, website, ratings, and operating hours",
          "Generate comprehensive profiles with 15+ data points per business",
          "Filter by ratings, review count, and business status",
        ],

        // LAYER 3: TECHNICAL DEPTH
        technicalDetails: {
          approach:
            "Headless browser automation with intelligent rate limiting and proxy rotation to bypass detection, combined with structured data extraction using CSS selectors and XPath queries.",
          technologies: [
            "Puppeteer for browser automation",
            "Google Maps Places API integration",
            "N8N workflow orchestration",
            "Custom anti-detection mechanisms",
            "PostgreSQL for data deduplication",
            "Rate limiting with exponential backoff",
          ],
          architecture:
            "Distributed scraping architecture with worker nodes handling parallel requests, centralized queue management for job distribution, and real-time progress tracking via WebSocket connections.",
        },
      },
      {
        id: 2,
        icon: Search,
        color: "#10b981",

        title: "Turn Business Cards Into Conversations",
        tagline:
          "Have a list of business names but no way to actually contact decision-makers?",
        userBenefit: "Unlock email addresses for 70%+ of your prospects",
        description:
          "Think of it as having a detective who visits every business website, explores their contact pages, reads their 'About Us' sections, and even checks their social media—all to find that golden email address. What used to take 10 minutes per business now happens in seconds, automatically enriching your entire prospect list while you focus on crafting the perfect outreach message.",

        howItWorks:
          "For each business in your list, the system visits their website, intelligently navigates to contact pages, and extracts email addresses using pattern recognition and context analysis.",
        keyCapabilities: [
          "Automatic email discovery from websites and subpages",
          "Extract business descriptions and service offerings",
          "Identify key personnel and their roles",
          "Gather social media profiles and additional contact methods",
        ],

        technicalDetails: {
          approach:
            "Multi-stage web crawling with intelligent page prioritization, regex-based email extraction, and natural language processing to understand business context and extract relevant background information.",
          technologies: [
            "Playwright for dynamic content rendering",
            "BeautifulSoup for HTML parsing",
            "Regex pattern matching for email validation",
            "OpenAI GPT-4 for context extraction",
            "Redis caching for visited URLs",
            "Perplexity API for deep research",
          ],
          architecture:
            "Asynchronous crawling system with breadth-first traversal, priority queue for contact pages, and ML-based content classifier to identify high-value information sources.",
        },
      },
      {
        id: 3,
        icon: Database,
        color: "#8b5cf6",

        title: "Your CRM That Builds Itself",
        tagline:
          "Manually copying and pasting prospect data into spreadsheets for hours on end?",
        userBenefit: "Eliminate 100% of manual data entry",
        description:
          "Picture a magical spreadsheet that fills itself. Every business discovered, every email found, every piece of information gathered—it all flows seamlessly into your Google Sheets, organized perfectly with unique IDs so you never accidentally contact the same prospect twice. It's like having a meticulous assistant who never makes typos or forgets to update records.",

        howItWorks:
          "All collected data automatically populates into your Google Sheet in real-time, with smart deduplication that checks for existing entries before adding new ones.",
        keyCapabilities: [
          "Real-time data sync to Google Sheets",
          "Automatic unique ID generation for tracking",
          "Duplicate detection prevents redundant entries",
          "Custom column mapping for your workflow",
        ],

        technicalDetails: {
          approach:
            "Event-driven data pipeline with idempotent write operations, utilizing Google Sheets API v4 with batch updates for performance, and hash-based deduplication using business identifiers.",
          technologies: [
            "Google Sheets API v4",
            "OAuth 2.0 authentication",
            "Batch write operations (up to 100 rows)",
            "UUID generation for unique identifiers",
            "MongoDB for staging data",
            "Error handling with retry logic",
          ],
          architecture:
            "Microservices architecture with dedicated data transformation layer, message queue for write operations, and eventual consistency model with conflict resolution strategies.",
        },
      },
      {
        id: 4,
        icon: Workflow,
        color: "#f59e0b",

        title: "Set It and Forget It Lead Generation",
        tagline:
          "Manually coordinating between 5 different tools just to generate a single prospect list?",
        userBenefit: "Run your entire lead gen pipeline while you sleep",
        description:
          "It's like setting up a production line in a factory—raw data enters one end (your target criteria), and polished leads come out the other, ready for your sales team. No clicking between tabs, no copy-pasting, no babysitting the process. Schedule it to run overnight, and wake up to fresh prospects every morning.",

        howItWorks:
          "N8N orchestrates the entire workflow automatically: search Google Maps → visit websites → extract emails → enrich data → save to Google Sheets. One trigger starts everything.",
        keyCapabilities: [
          "Single-click deployment of entire workflow",
          "Scheduled automation runs (daily, weekly, or custom)",
          "Error notifications via email or Slack",
          "Progress tracking with real-time dashboards",
        ],

        technicalDetails: {
          approach:
            "N8N workflow automation with node-based orchestration, implementing error boundaries, retry mechanisms, and compensation transactions for failed operations to ensure data consistency.",
          technologies: [
            "N8N workflow automation platform",
            "REST API integrations",
            "Webhook triggers for event-driven flows",
            "Cron scheduling for periodic execution",
            "Error handling with dead letter queues",
            "Monitoring with Prometheus metrics",
          ],
          architecture:
            "DAG (Directed Acyclic Graph) workflow execution with parallel node processing, state management for resumable workflows, and distributed task queue with priority scheduling.",
        },
      },
    ],
  },
  // Project 8: FleekRead
  {
    $id: "p8",
    highlights: [
      {
        id: 1,
        icon: Brain,
        color: "#3b82f6",

        title: "Absorb Entire Books in Minutes, Not Weeks",
        tagline:
          "Have 50 unread books sitting on your shelf while your reading list keeps growing?",
        userBenefit: "10x your reading speed without missing key insights",
        description:
          "Imagine having a brilliant friend who's already read every book you're interested in—someone who can tell you the main arguments, the best quotes, and the actionable takeaways in the time it takes to drink your coffee. You still get the wisdom, the insights, and the knowledge, but without spending 8 hours per book.",

        howItWorks:
          "Upload any book and AI analyzes the entire content, breaking it into digestible chapters with summaries, key takeaways, and personalized recommendations based on your interests.",
        keyCapabilities: [
          "Complete book summaries generated in under 3 minutes",
          "Chapter-by-chapter breakdowns with main points",
          "Smart recommendations based on your reading history",
          "Extract actionable insights and practical applications",
        ],

        technicalDetails: {
          approach:
            "Multi-stage NLP pipeline using Claude AI for semantic analysis, chunked processing with sliding window context preservation, and collaborative filtering algorithms for personalized recommendations.",
          technologies: [
            "Claude AI for summarization (Sonnet 4)",
            "LangChain for document processing",
            "FAISS vector database for semantic search",
            "Collaborative filtering recommendation engine",
            "Redis for caching frequent summaries",
            "Sentence transformers for embeddings",
          ],
          architecture:
            "Serverless processing architecture with AWS Lambda handling parallel chapter analysis, S3 for document storage, and real-time streaming of summary generation via WebSocket connections.",
        },
      },
      {
        id: 2,
        icon: BookOpen,
        color: "#10b981",

        title: "Read Twice as Fast, Retain Twice as Much",
        tagline:
          "Taking hours to finish books while struggling to stay focused and remember what you read?",
        userBenefit: "Double your reading speed with 40% better retention",
        description:
          "It's like having training wheels for your brain. Whether you prefer listening while commuting, using a speed reader that guides your eyes at just the right pace, or auto-scrolling that keeps you in flow state—you're not just reading faster, you're actually absorbing more because the format matches how your brain works best.",

        howItWorks:
          "Choose your reading mode: listen to AI-narrated audiobooks, follow a highlighted speed reader that paces you, or use auto-scroll that moves at your perfect reading rhythm.",
        keyCapabilities: [
          "Audiobook streaming with 0.5x to 3x playback speeds",
          "Speed Reader highlights words in rhythm for 2x faster reading",
          "Auto-scroll with customizable speed (50-500 words per minute)",
          "Seamlessly switch modes without losing your place",
        ],

        technicalDetails: {
          approach:
            "Multi-modal content delivery with synchronized position tracking across formats, implementing RSVP (Rapid Serial Visual Presentation) for speed reading and text-to-speech synthesis with prosody control.",
          technologies: [
            "Web Speech API for text-to-speech",
            "RSVP engine with adjustable WPM",
            "React hooks for scroll synchronization",
            "IndexedDB for offline audio caching",
            "WebWorker for background audio processing",
            "CSS animations for smooth highlighting",
          ],
          architecture:
            "Progressive Web App architecture with service workers for offline functionality, synchronized state management across reading modes, and predictive prefetching for seamless mode transitions.",
        },
      },
      {
        id: 3,
        icon: Layers,
        color: "#8b5cf6",

        title: "Pick Up Exactly Where You Left Off, Anywhere",
        tagline:
          "Lost your reading progress when switching devices? Frustrated by dead internet zones killing your reading flow?",
        userBenefit: "Never lose your place, even without internet",
        description:
          "Read on your phone during your commute, continue on your tablet at lunch, and finish on your laptop at home—all without lifting a finger to sync. It's like having the same book magically appear in every room of your house, always open to the exact page you left off, even when you're on a flight with zero connectivity.",

        howItWorks:
          "Your reading position, bookmarks, and notes sync automatically across all devices in real-time. Books are downloaded for offline access, and everything syncs back up once you're connected.",
        keyCapabilities: [
          "Instant cross-device sync (phone, tablet, web, desktop)",
          "Offline-first design downloads books locally",
          "Smart bookmarks automatically highlight key passages",
          "Notes and highlights preserved across all formats",
        ],

        technicalDetails: {
          approach:
            "CRDT-based (Conflict-free Replicated Data Type) synchronization for eventual consistency, implementing operational transformation for conflict resolution and optimistic UI updates with background sync.",
          technologies: [
            "React Native for cross-platform mobile",
            "Electron for desktop application",
            "IndexedDB for offline storage (50MB+ capacity)",
            "WebSocket for real-time sync",
            "AWS AppSync for managed GraphQL sync",
            "Service Workers for background sync",
          ],
          architecture:
            "Offline-first PWA with sync engine implementing last-write-wins CRDT, conflict resolution using vector clocks, and incremental sync protocol minimizing bandwidth usage.",
        },
      },
      {
        id: 4,
        icon: Settings,
        color: "#f59e0b",

        title: "Run Your Reading Platform Like a Pro",
        tagline:
          "Manually uploading books one by one and having no idea how readers engage with your content?",
        userBenefit: "Manage 10,000+ books and users from one dashboard",
        description:
          "Think of it as mission control for your entire reading platform. See what books are trending, which chapters readers abandon, who your power users are, and what content needs attention—all in real-time. Upload content in bulk, send targeted notifications, and make data-driven decisions about what to publish next.",

        howItWorks:
          "Comprehensive admin panel lets you upload content (ePub, PDF, audio), monitor user behavior in real-time, manage your library, and send push notifications to specific user segments.",
        keyCapabilities: [
          "Bulk content upload with format auto-conversion",
          "Real-time analytics: reading time, completion rates, engagement",
          "User segmentation for targeted communication",
          "Moderation tools for reviews and community content",
        ],

        technicalDetails: {
          approach:
            "Role-based access control (RBAC) system with granular permissions, real-time analytics pipeline using event sourcing pattern, and ETL processes for content ingestion with format normalization.",
          technologies: [
            "React Admin dashboard framework",
            "Role-based JWT authentication",
            "AWS S3 for content storage",
            "ElasticSearch for full-text search",
            "Apache Kafka for event streaming",
            "Grafana for analytics visualization",
          ],
          architecture:
            "Microservices architecture with dedicated services for content management, analytics, and notifications. Event-driven design with message bus for decoupled communication and CQRS pattern for read-heavy operations.",
        },
      },
      {
        id: 5,
        icon: Gauge,
        color: "#06b6d4",

        title: "Scale to Millions Without Breaking a Sweat",
        tagline:
          "Worried your reading app will crash when it goes viral? Slow load times losing readers before they even start?",
        userBenefit:
          "Handle 1M+ simultaneous readers with <100ms response times",
        description:
          "It's like building your house on bedrock instead of sand. Whether you have 100 users or 100 million, every page loads instantly, every book streams smoothly, and every feature works flawlessly. Your infrastructure scales automatically during viral moments and optimizes costs during quiet periods—you focus on content, not servers.",

        howItWorks:
          "Cloud-native infrastructure automatically scales based on demand, distributes content globally through CDN, and optimizes database queries to maintain lightning-fast performance at any scale.",
        keyCapabilities: [
          "Auto-scaling handles traffic spikes without manual intervention",
          "Global CDN delivers content from nearest location (20+ regions)",
          "Database optimization keeps queries under 50ms",
          "99.9% uptime SLA with automated failover",
        ],

        technicalDetails: {
          approach:
            "Serverless architecture with horizontal auto-scaling, implementing edge caching strategies, database query optimization with materialized views, and connection pooling for efficient resource utilization.",
          technologies: [
            "AWS Lambda + EC2 hybrid architecture",
            "CloudFront CDN with edge locations",
            "PostgreSQL with read replicas",
            "Redis for session and query caching",
            "Kubernetes for container orchestration",
            "Prometheus + Grafana for monitoring",
          ],
          architecture:
            "Multi-region active-active deployment with global load balancing, CDN-first architecture serving 95% of requests from edge, database sharding by user geography, and circuit breaker pattern for graceful degradation.",
        },
      },
    ],
  },
  // Project 9: AI PDF-to-Audio Platform
  {
  $id: "p9", 
  highlights: [
    {
      id: 1,
      icon: Book,
      color: "#3b82f6",
      
      // PROBLEM-FOCUSED LAYER
      title: "Turn Any Book into an Audiobook",
      tagline: "Tired of spending $20-40 per audiobook or waiting months for professional narration?",
      userBenefit: "Create studio-quality audiobooks in minutes for 95% less cost",
      description: "Imagine converting your entire library into audiobooks with a single click. No voice actors, no recording studios, no technical skills required. Just upload your PDF and get back professional-quality audio narration that sounds like a real human reading to you—complete with emotion, natural pacing, and expressive tone.",
      
      // SOLUTION BRIDGE
      howItWorks: "Advanced AI analyzes your PDF text and generates human-like speech with natural rhythm, emotion, and clarity. The system processes documents chapter by chapter, creating smooth narration that you can stream instantly or download as MP3/WAV files.",
      keyCapabilities: [
        "Upload PDFs up to 500 pages (Pro) or 150 pages (Free)",
        "AI generates expressive, emotion-rich narration automatically",
        "Choose from 30+ voice types, accents, and playback speeds",
        "Preview voices before converting entire documents"
      ],
      
      // TECHNICAL DEPTH
      technicalDetails: {
        approach: "Deep learning-based voice synthesis using transformer models trained on thousands of hours of professional narration, combined with NLP for context-aware prosody and emotion detection",
        technologies: ["TensorFlow", "PyTorch", "AI Voice Synthesis", "NLP", "PyPDF2", "pdfplumber", "FFmpeg"],
        architecture: "Microservices architecture with FastAPI backend, intelligent text extraction pipeline, GPU-accelerated voice synthesis engine, and distributed task queue for parallel chapter processing"
      }
    },
    {
      id: 2,
      icon: Zap,
      color: "#10b981",
      
      title: "Lightning-Fast Conversion",
      tagline: "Frustrated waiting hours or days for audiobook production?",
      userBenefit: "Convert 100+ page books in under 5 minutes",
      description: "Stop waiting. Get your audiobook while your coffee is still hot. Our intelligent processing system breaks down your document into chapters and converts them simultaneously, delivering professional narration at speeds traditional methods can't match. Track progress in real-time and start listening the moment conversion completes.",
      
      howItWorks: "The platform automatically splits large documents into optimized chunks, processes them in parallel across multiple GPU instances, and assembles the final audio seamlessly—all while showing you real-time progress updates.",
      keyCapabilities: [
        "Process entire books chapter-by-chapter for faster results",
        "Real-time progress tracking from upload to completion",
        "Stream audio immediately or download as high-quality MP3/WAV",
        "Queue management ensures consistent performance under load"
      ],
      
      technicalDetails: {
        approach: "Distributed processing architecture with intelligent document chunking, parallel GPU-accelerated synthesis, and asynchronous task orchestration for maximum throughput",
        technologies: ["FastAPI", "Redis", "AWS Lambda", "Docker", "Kubernetes", "WebSocket"],
        architecture: "Event-driven microservices with Redis queue for task distribution, containerized workers for parallel processing, WebSocket for real-time progress updates, and S3 for scalable audio storage"
      }
    },
    {
      id: 3,
      icon: Shield,
      color: "#8b5cf6",
      
      title: "Your Content, Always Secure",
      tagline: "Worried about uploading sensitive documents or proprietary content to the cloud?",
      userBenefit: "Bank-level encryption with automatic file cleanup",
      description: "Your books and documents are protected at every step. From the moment you upload to final download, everything is encrypted end-to-end. Files are automatically deleted after conversion or when expired, ensuring your content never lingers on our servers longer than necessary.",
      
      howItWorks: "All uploads use HTTPS encryption, files are stored with AES-256 encryption at rest, and our system automatically removes old files based on your subscription plan. You control your data, and we ensure it stays private.",
      keyCapabilities: [
        "HTTPS/TLS encryption for all file transfers",
        "AES-256 encryption for stored PDFs and audio files",
        "Automatic file cleanup after conversion or expiration",
        "Token-based authentication with rate limiting"
      ],
      
      technicalDetails: {
        approach: "Multi-layer security architecture with transport encryption, at-rest encryption, secure authentication flows, and automated data lifecycle management",
        technologies: ["HTTPS/TLS", "JWT Authentication", "OAuth 2.0", "AWS S3", "PostgreSQL"],
        architecture: "Zero-trust security model with encrypted S3 buckets, JWT-based API authentication, role-based access control, automated file expiration policies, and comprehensive audit logging"
      }
    },
    {
      id: 4,
      icon: Rocket,
      color: "#f59e0b",
      
      title: "API-First for Developers",
      tagline: "Building an e-learning platform or publishing tool and need audiobook conversion?",
      userBenefit: "Integrate professional narration into your app in hours",
      description: "Why build your own voice engine when you can plug into ours? Our REST API gives developers instant access to the same AI that powers our platform. Upload PDFs programmatically, monitor conversions, retrieve audio files, and manage usage—all through simple API calls that integrate with any stack.",
      
      howItWorks: "Generate a secure API key from your dashboard, make HTTP requests to our endpoints, and receive webhook notifications when conversions complete. Full documentation, code samples, and usage analytics included.",
      keyCapabilities: [
        "RESTful API with comprehensive documentation",
        "Secure API key authentication per developer",
        "Programmatic PDF upload, status checking, and audio retrieval",
        "Usage quotas and analytics dashboard"
      ],
      
      technicalDetails: {
        approach: "RESTful API design with OpenAPI specification, webhook support for async operations, rate limiting per API key, and detailed usage analytics",
        technologies: ["FastAPI", "REST API", "JWT", "Redis", "PostgreSQL", "Stripe API"],
        architecture: "Scalable API gateway with request validation, rate limiting via Redis, async task processing with job queues, webhook callbacks for conversion events, and PostgreSQL for usage tracking"
      }
    },
    {
      id: 5,
      icon: Globe,
      color: "#06b6d4",
      
      title: "Scale from Laptop to Cloud",
      tagline: "Need flexibility to test locally before deploying to production?",
      userBenefit: "Develop on GPU laptop, deploy to cloud with one command",
      description: "Start small, scale big. Run the entire platform on your local GPU-powered laptop for development and testing without cloud costs. When you're ready, deploy to the cloud with containerized infrastructure that auto-scales based on demand—supporting everything from 10 to 10,000 conversions per day.",
      
      howItWorks: "The platform runs in two modes: local mode uses your GPU for testing without API costs, while cloud mode deploys containerized services across AWS with auto-scaling, load balancing, and 99.9% uptime guarantees.",
      keyCapabilities: [
        "Local GPU mode for cost-free development and testing",
        "Cloud mode with auto-scaling for production workloads",
        "Docker containerization for consistent deployments",
        "Monitor system health with real-time performance dashboards"
      ],
      
      technicalDetails: {
        approach: "Hybrid deployment architecture supporting both local GPU inference and distributed cloud infrastructure with container orchestration and auto-scaling",
        technologies: ["Docker", "Kubernetes", "AWS Lambda", "CloudWatch", "Prometheus", "Grafana"],
        architecture: "Containerized microservices with Kubernetes orchestration, horizontal pod autoscaling based on queue depth, CloudWatch/Prometheus metrics collection, and Grafana dashboards for real-time monitoring"
      }
    },
    {
      id: 6,
      icon: Users,
      color: "#ec4899",
      
      title: "Built for Teams and Enterprises",
      tagline: "Managing audiobook production across multiple users or clients?",
      userBenefit: "Centralized admin panel with full usage visibility",
      description: "Keep your entire operation running smoothly from one dashboard. Monitor all conversions, manage user subscriptions, track API usage across clients, and analyze performance metrics—all in real-time. Perfect for publishing houses, educational institutions, and SaaS companies serving hundreds of users.",
      
      howItWorks: "The admin panel provides complete oversight: view user accounts, monitor conversion queues, track system performance, manage subscriptions, and analyze usage patterns—all with role-based access control for team collaboration.",
      keyCapabilities: [
        "Centralized dashboard for managing users and conversions",
        "Real-time analytics for daily/monthly conversion metrics",
        "API usage monitoring with detailed logs per client",
        "Automated notifications for conversions, payments, and system events"
      ],
      
      technicalDetails: {
        approach: "Multi-tenant architecture with role-based access control, real-time analytics pipeline, and comprehensive logging for audit trails and business intelligence",
        technologies: ["React", "Next.js", "TypeScript", "PostgreSQL", "Redis", "WebSocket"],
        architecture: "Admin dashboard with real-time WebSocket updates, PostgreSQL for user/subscription management, Redis for caching analytics, automated email notifications via queued jobs, and comprehensive event logging for audit compliance"
      }
    }
  ]
},
  // Project 10: HelScript
  {
    $id: "p10",
    highlights: [
      {
        id: 1,
        icon: Mic,
        color: "#3b82f6",

        title: "Talk Naturally, See Words Instantly",
        tagline:
          "Tired of typing meeting notes while losing track of the conversation?",
        userBenefit: "Capture 10,000+ words per hour hands-free",
        description:
          "Imagine having a personal stenographer who understands you perfectly, no matter your accent or the language you're speaking. Whether you're recording a lecture, documenting a meeting, or brainstorming ideas during a walk—your words appear on screen almost before you finish saying them, in over 10 languages, without you touching a keyboard.",

        howItWorks:
          "Simply hit record and start speaking. The AI processes your speech in real-time, transcribing with punctuation and formatting while you continue talking naturally.",
        keyCapabilities: [
          "Real-time transcription with less than half-second delay",
          "Automatic language detection across 10+ languages",
          "On-device processing protects your privacy",
          "Works offline without internet connection",
        ],

        technicalDetails: {
          approach:
            "Streaming speech-to-text with chunked audio processing, leveraging OpenAI Whisper for transcription accuracy and TensorFlow Lite for on-device inference with minimal latency.",
          technologies: [
            "OpenAI Whisper API (large-v3 model)",
            "TensorFlow Lite for mobile inference",
            "WebRTC for audio capture",
            "React Native Audio Recorder",
            "SQLite for local transcript storage",
            "Voice Activity Detection (VAD)",
          ],
          architecture:
            "Hybrid architecture with on-device VAD triggering cloud-based transcription, implementing sliding window buffer (2-second chunks), duplex streaming for continuous processing, and local caching for offline replay.",
        },
      },
      {
        id: 2,
        icon: Sparkles,
        color: "#10b981",

        title: "Raw Thoughts to Polished Documents",
        tagline:
          "Spending hours cleaning up messy transcripts and adding punctuation manually?",
        userBenefit:
          "Transform rambling speech into professional text automatically",
        description:
          "It's like having an editor who listens to your rough draft and instantly transforms it into something publication-ready. Your 'ums' and 'ahs' disappear, run-on sentences get proper punctuation, key points get highlighted, and you even get a summary—all without lifting a finger. Just talk naturally, and watch AI turn your thoughts into polished content.",

        howItWorks:
          "AI analyzes your transcript as you speak, automatically adding punctuation, capitalizing proper nouns, creating paragraphs, and generating summaries with key takeaways.",
        keyCapabilities: [
          "Auto-formatting adds punctuation and capitalization",
          "AI-generated summaries extract main points",
          "Voice commands control recording ('stop', 'new paragraph')",
          "Smart paragraph breaks based on context",
        ],

        technicalDetails: {
          approach:
            "Post-processing pipeline with NLP-based text normalization, implementing transformer models for punctuation restoration, named entity recognition for capitalization, and extractive summarization using BERT.",
          technologies: [
            "GPT-4 for text enhancement",
            "BERT for summarization",
            "SpaCy for NER and sentence boundary detection",
            "Custom punctuation restoration model",
            "Regex-based filler word removal",
            "TF-IDF for key phrase extraction",
          ],
          architecture:
            "Async processing queue with progressive enhancement stages: raw transcription → filler removal → punctuation restoration → paragraph segmentation → summarization, with each stage cacheable for instant replay.",
        },
      },
      {
        id: 3,
        icon: FileText,
        color: "#8b5cf6",

        title: "Your Personal Transcript Library",
        tagline:
          "Drowning in audio files with no way to find that one brilliant idea from last month?",
        userBenefit: "Search across 100+ hours of recordings in seconds",
        description:
          "Think of it as Google for everything you've ever said. Every meeting, every lecture, every voice note—instantly searchable. Type 'marketing budget' and find every conversation where you discussed it. Need that transcript from Tuesday? It's waiting in your organized library, ready to edit, export, or share.",

        howItWorks:
          "All transcripts auto-save to your personal library, organized by date and topic. Search across everything instantly, edit with formatting tools, or export in multiple formats.",
        keyCapabilities: [
          "Playlist-style library with folders and tags",
          "Full-text search across all transcripts",
          "In-app editor with rich text formatting",
          "Export to TXT, DOCX, and PDF with one tap",
        ],

        technicalDetails: {
          approach:
            "Full-text search implementation using inverted index, SQLite FTS5 for efficient queries, and incremental indexing for real-time search updates with fuzzy matching for typo tolerance.",
          technologies: [
            "SQLite with FTS5 full-text search",
            "React Quill for WYSIWYG editing",
            "PDFKit for PDF generation",
            "Mammoth.js for DOCX export",
            "Lunr.js for client-side search",
            "IndexedDB for browser persistence",
          ],
          architecture:
            "Client-side-first architecture with local SQLite database, background indexing service for search optimization, and lazy loading with virtual scrolling for large transcript lists (10k+ items).",
        },
      },
      {
        id: 4,
        icon: Users,
        color: "#f59e0b",

        title: "Know Who Said What, When",
        tagline:
          "Listening to meeting recordings unable to tell who's speaking or find specific people's contributions?",
        userBenefit: "Automatically separate and identify every speaker",
        description:
          "Imagine your transcript looking like a movie script—each person's dialogue clearly labeled, color-coded, and searchable. Want to see everything Sarah said in the last board meeting? One click. Need to find when Tom mentioned the budget? Search his lines specifically. It's like having a court reporter who knows everyone in the room.",

        howItWorks:
          "AI detects different voices in your audio, assigns each a unique identity, and labels their dialogue throughout the transcript—perfect for meetings, interviews, and group discussions.",
        keyCapabilities: [
          "Automatic speaker separation (up to 10 speakers)",
          "Speaker-specific search and filtering",
          "Context-aware understanding (meeting vs lecture)",
          "Exportable with speaker labels intact",
        ],

        technicalDetails: {
          approach:
            "Speaker diarization using audio embedding clustering, implementing x-vectors for speaker representation, agglomerative clustering for speaker grouping, and LSTM networks for temporal speaker tracking.",
          technologies: [
            "Pyannote.audio for diarization",
            "Resemblyzer for speaker embeddings",
            "UMAP for dimensionality reduction",
            "HDBSCAN clustering algorithm",
            "Kaldi toolkit for voice processing",
            "WebRTC for audio preprocessing",
          ],
          architecture:
            "Two-stage pipeline: first pass identifies speaker changes via audio analysis, second pass assigns consistent speaker IDs using embedding similarity, with optional user labeling for personalization.",
        },
      },
      {
        id: 5,
        icon: Gauge,
        color: "#06b6d4",

        title: "Record for Hours Without Draining Your Battery",
        tagline:
          "Frustrating when transcription apps crash during important meetings or drain your phone in 30 minutes?",
        userBenefit: "2+ hour sessions using less memory than checking email",
        description:
          "It's engineered like a sports car—maximum performance with minimal fuel consumption. Record an entire conference, transcribe a 3-hour podcast, or capture a full day of interviews without your phone heating up, slowing down, or dying. Works smoothly on even budget devices, syncs across your laptop and tablet, and never loses a word.",

        howItWorks:
          "Smart audio processing breaks recordings into efficient chunks, processes them in parallel, and uses minimal RAM—keeping your device responsive while delivering instant results.",
        keyCapabilities: [
          "Less than 100MB RAM usage during active recording",
          "Sub-500ms latency from speech to text",
          "Battery-optimized for 2+ hour sessions",
          "Automatic sync across all your devices",
        ],

        technicalDetails: {
          approach:
            "Streaming architecture with circular buffer for audio capture, worker thread processing to avoid blocking UI, adaptive bitrate based on device capabilities, and delta sync for efficient cross-device updates.",
          technologies: [
            "Web Workers for parallel processing",
            "Circular buffer (5-second window)",
            "Opus codec for efficient audio compression",
            "WebSocket for real-time sync",
            "LZ4 compression for transcript storage",
            "IndexedDB with size quotas",
          ],
          architecture:
            "Multi-threaded architecture with main thread handling UI, worker thread for audio processing, separate thread for transcription API calls, and service worker for background sync with exponential backoff.",
        },
      },
    ],
  },
  // Project 11: Styleoro
  {
    $id: "p11",
    highlights: [
      {
        id: 1,
        icon: ShoppingCart,
        color: "#3b82f6",

        title: "Shop Now, Pay Securely, Get It Fast",
        tagline:
          "Frustrated by clunky checkout flows that lose your cart and make you re-enter payment info every time?",
        userBenefit: "Complete purchase in under 60 seconds",
        description:
          "It's like having your favorite boutique remember everything about you. Your cart follows you everywhere—add items on your phone during lunch, review them on your laptop at home, and checkout in seconds with saved payment info. No more hunting for products again, no more abandoned carts, just smooth shopping from browse to doorstep.",

        howItWorks:
          "Browse products with smart filters, add to cart that persists across devices, and checkout instantly with Stripe's secure one-click payment—all while tracking your order in real-time.",
        keyCapabilities: [
          "Persistent cart saved across all sessions and devices",
          "Advanced filtering by price, size, color, brand, and ratings",
          "One-click Stripe checkout with saved payment methods",
          "Real-time order tracking from warehouse to delivery",
        ],

        technicalDetails: {
          approach:
            "Headless commerce architecture with decoupled frontend and backend, implementing session management with HTTP-only cookies, cart persistence using Redis for speed, and Stripe webhook handlers for payment confirmation.",
          technologies: [
            "Stripe Payment Intents API",
            "Redis for cart persistence (7-day TTL)",
            "React Context for state management",
            "Appwrite for backend services",
            "Cloudinary for image optimization",
            "ElasticSearch for product search",
          ],
          architecture:
            "Microservices architecture with dedicated services for catalog, cart, checkout, and orders. Event-driven order processing with message queue, idempotent payment handling, and ACID transactions for inventory updates.",
        },
      },
      {
        id: 2,
        icon: Lock,
        color: "#10b981",

        title: "Sign In Once, Shop Everywhere Safely",
        tagline:
          "Creating yet another account with yet another password you'll forget?",
        userBenefit: "Login in 2 clicks with Google, no passwords to remember",
        description:
          "Think of it as your universal key to the store. Sign in with your Google account in seconds, or use email if you prefer—either way, your data stays locked down with bank-level security. Your order history, saved addresses, and payment methods are always there waiting, protected by the same tech that secures your most sensitive information.",

        howItWorks:
          "Choose Google Sign-In for instant access or create an account with email. All your data is encrypted and protected, with session tokens that automatically expire for security.",
        keyCapabilities: [
          "Google OAuth for one-click authentication",
          "Email/password with secure password hashing",
          "Automatic session management and token refresh",
          "Encrypted storage of all personal information",
        ],

        technicalDetails: {
          approach:
            "OAuth 2.0 implementation with PKCE flow for Google authentication, bcrypt password hashing with salt rounds, JWT-based session management with refresh token rotation, and HTTPS-only secure cookies.",
          technologies: [
            "Google OAuth 2.0 with PKCE",
            "Appwrite authentication service",
            "JWT with RS256 algorithm",
            "Bcrypt (10 salt rounds) for passwords",
            "HTTP-only secure cookies",
            "CSRF token protection",
          ],
          architecture:
            "Stateless authentication with JWT access tokens (15-min expiry) and refresh tokens (30-day expiry), implementing token rotation on refresh, and Redis for token blacklisting on logout.",
        },
      },
      {
        id: 3,
        icon: BarChart3,
        color: "#8b5cf6",

        title: "Run Your Store from One Control Center",
        tagline:
          "Juggling multiple tools to manage products, track orders, and understand what's actually selling?",
        userBenefit:
          "See your entire business at a glance—sales, inventory, trends",
        description:
          "Imagine having X-ray vision into your business. Which products are flying off the shelves? Which ones are gathering dust? Who are your best customers? What time of day do people buy most? It's all right there in real-time charts and graphs that actually make sense. Upload products in bulk, update inventory with a click, and watch your business grow through data you can actually use.",

        howItWorks:
          "Comprehensive dashboard shows real-time sales metrics, inventory levels, and customer behavior. Manage products, process orders, and make data-driven decisions all from one screen.",
        keyCapabilities: [
          "Real-time sales analytics with trend visualization",
          "Bulk product upload and inventory management",
          "Order processing with status updates",
          "Customer segmentation and purchase history",
        ],

        technicalDetails: {
          approach:
            "Real-time analytics pipeline with event streaming, implementing OLAP cube for multi-dimensional analysis, materialized views for dashboard queries, and ETL processes for data aggregation.",
          technologies: [
            "Chart.js for data visualization",
            "MongoDB aggregation pipeline",
            "Server-Sent Events for real-time updates",
            "CSV bulk import with validation",
            "Redis for dashboard caching",
            "Cron jobs for daily reports",
          ],
          architecture:
            "CQRS pattern separating read (analytics) and write (operations) models, with event sourcing for audit trail, pre-computed aggregations updated on each transaction, and WebSocket for live dashboard updates.",
        },
      },
      {
        id: 4,
        icon: Bell,
        color: "#f59e0b",

        title: "Keep Customers in the Loop Automatically",
        tagline:
          "Losing sales because customers don't know their favorite item is back in stock?",
        userBenefit: "Convert 3x more visitors with timely notifications",
        description:
          "It's like having a personal shopper who taps customers on the shoulder at exactly the right moment. When their order ships, they know. When that sold-out sweater is restocked, they're the first to hear. When there's a sale on items in their wishlist, boom—notification. No spamming, no guessing, just perfectly timed messages that turn browsers into buyers.",

        howItWorks:
          "Smart notification system automatically alerts customers about order updates, restocks, price drops, and personalized offers based on their browsing and purchase history.",
        keyCapabilities: [
          "Real-time order status notifications (confirmed, shipped, delivered)",
          "Stock alerts for favorited and wishlisted items",
          "Personalized promotional offers based on behavior",
          "Abandoned cart reminders with dynamic timing",
        ],

        technicalDetails: {
          approach:
            "Event-driven notification system with pub/sub architecture, implementing user preference management, notification batching to prevent spam, and delivery tracking with fallback channels (push → email → SMS).",
          technologies: [
            "Firebase Cloud Messaging (FCM)",
            "Web Push API for browser notifications",
            "Nodemailer for email notifications",
            "Bull queue for scheduled notifications",
            "MongoDB for notification preferences",
            "WebSocket for in-app notifications",
          ],
          architecture:
            "Multi-channel notification service with priority queue, user-specific frequency caps, template engine for dynamic content, and delivery confirmation tracking with retry logic for failed deliveries.",
        },
      },
      {
        id: 5,
        icon: Search,
        color: "#06b6d4",

        title: "Find Exactly What You Want, Instantly",
        tagline:
          "Scrolling endlessly through hundreds of products hoping to stumble upon what you need?",
        userBenefit: "Speak your search and see results in 0.5 seconds",
        description:
          "Imagine walking into a store where everything you might like is already on the front table. Just speak 'blue running shoes under $100' or type it—either way, you see perfect matches instantly. The more you shop, the smarter it gets, showing you items you didn't even know you wanted. It's like having a mind-reading store assistant who knows your style, budget, and preferences.",

        howItWorks:
          "Voice-enabled search understands natural language queries. AI analyzes your browsing and purchase history to recommend products you'll love, with smart filters for instant refinement.",
        keyCapabilities: [
          "Voice search with natural language understanding",
          "AI-powered recommendations improve over time",
          "Advanced filters (price, size, color, rating, brand)",
          "Visual similar product suggestions",
        ],

        technicalDetails: {
          approach:
            "Hybrid search combining keyword matching with semantic search using embeddings, collaborative filtering for recommendations, and content-based filtering using product attributes and user behavior patterns.",
          technologies: [
            "ElasticSearch for full-text search",
            "OpenAI embeddings for semantic search",
            "Web Speech API for voice input",
            "Collaborative filtering with matrix factorization",
            "Redis for search result caching",
            "TF-IDF for relevance scoring",
          ],
          architecture:
            "Multi-stage search pipeline: voice-to-text → query normalization → parallel execution (keyword + semantic) → result fusion → personalized re-ranking → caching, with <500ms total latency.",
        },
      },
    ],
  },
  // Project 11: LetzBuyNSell
  {
    $id: "p12",
    highlights: [
      {
        id: 1,
        icon: MapPin,
        color: "#3b82f6",

        title: "Find Local Deals Right Around the Corner",
        tagline:
          "Tired of buying from strangers across the country when your perfect item might be 5 minutes away?",
        userBenefit: "Meet sellers within 10 minutes of your location",
        description:
          "Imagine opening your phone and seeing every item for sale within walking distance—like having X-ray vision that shows you hidden gems in your neighborhood. That guitar you've been searching for? It's 2 blocks away. Need furniture today? Someone 5 minutes down the road is selling exactly what you need. No shipping costs, no waiting, no wondering if the seller is trustworthy—just local people, real items, instant meetups.",

        howItWorks:
          "Set your radius (1-100 km) and see live map pins showing every item nearby. Tap any pin to see the product, check the seller's profile, and message them instantly to arrange a meetup.",
        keyCapabilities: [
          "Adjustable radius search from 1 to 100 kilometers",
          "Live interactive map with real-time product pins",
          "Auto-location tagging makes your listings instantly visible",
          "Distance-sorted results show closest items first",
        ],

        technicalDetails: {
          approach:
            "Geospatial queries using GeoHash indexing for O(log n) proximity search, implementing bounding box queries with Haversine formula for accurate distance calculation, and spatial R-tree indexing for efficient range queries.",
          technologies: [
            "Google Maps JavaScript API",
            "Firebase Firestore with GeoPoint",
            "GeoHash library for spatial indexing",
            "Haversine formula for distance calculation",
            "React Native Maps for mobile",
            "Marker clustering for performance",
          ],
          architecture:
            "Geospatial database with compound indexes on location + category, implementing tile-based map rendering with lazy loading, dynamic marker clustering at zoom levels, and location-aware query optimization using user's GPS coordinates.",
        },
      },
      {
        id: 2,
        icon: MessageSquare,
        color: "#10b981",

        title: "Chat, Negotiate, Meet—All In One Place",
        tagline:
          "Exchanging endless texts trying to coordinate meetups while missing messages from other buyers?",
        userBenefit: "Close deals 5x faster with instant messaging",
        description:
          "It's like having every buyer-seller conversation organized in one inbox that actually works. Message sellers instantly, negotiate prices in real-time, share your location for meetups, and get notified the moment someone replies. No more juggling phone numbers, email threads, and text messages—everything happens in-app, secure, and lightning fast.",

        howItWorks:
          "Tap any listing to start a chat. Messages arrive instantly with push notifications. Coordinate meetup times, negotiate prices, and close deals—all without leaving the app or sharing personal contact info.",
        keyCapabilities: [
          "Real-time messaging with read receipts",
          "Push notifications for new messages and offers",
          "In-chat meetup location sharing",
          "Quick price negotiation with counter-offers",
        ],

        technicalDetails: {
          approach:
            "Real-time chat using WebSocket connections with message persistence, implementing optimistic UI updates for instant feel, message queue for offline delivery, and end-to-end encryption for privacy.",
          technologies: [
            "Socket.io for real-time messaging",
            "Firebase Cloud Messaging for push",
            "MongoDB with message indexing",
            "Redis for online user presence",
            "Message encryption (AES-256)",
            "React Native async storage for offline",
          ],
          architecture:
            "Pub/sub messaging system with room-based channels, message broker handling delivery confirmation, presence detection via heartbeat pings, and message history pagination with cursor-based navigation.",
        },
      },
      {
        id: 3,
        icon: Zap,
        color: "#8b5cf6",

        title: "List Your Item in 30 Seconds Flat",
        tagline:
          "Spending 15 minutes filling out forms just to post one item for sale?",
        userBenefit: "Snap, type, post—visible to nearby buyers instantly",
        description:
          "It's easier than posting to social media. Take a photo, add a price, write a quick description—done. Your location tags automatically, your listing appears on the map instantly, and buyers within your radius see it right away. No complicated forms, no waiting for approval, no wondering if anyone will see it. Just instant visibility to people who can actually come buy it today.",

        howItWorks:
          "Open the app, tap 'Sell', snap photos of your item, add a title and price, and hit post. GPS automatically tags your location, and your listing goes live immediately to nearby users.",
        keyCapabilities: [
          "Quick listing flow takes under 30 seconds",
          "Multi-photo upload with image compression",
          "Automatic GPS location tagging",
          "Instant visibility within your target radius",
        ],

        technicalDetails: {
          approach:
            "Streamlined upload pipeline with client-side image compression before upload, GPS coordinate extraction from device API, background upload with progress tracking, and immediate index updates for real-time visibility.",
          technologies: [
            "React Native Image Picker",
            "Sharp for image compression (80% quality)",
            "Geolocation API for coordinates",
            "Cloudinary for image CDN",
            "FormData for multipart uploads",
            "IndexedDB for draft saving",
          ],
          architecture:
            "Progressive upload architecture with image compression on client (reduces 5MB → 500KB), parallel upload of multiple images, atomic listing creation with rollback on failure, and eventual consistency for map updates.",
        },
      },
      {
        id: 4,
        icon: Award,
        color: "#f59e0b",

        title: "Trust Every Transaction with Verified Users",
        tagline:
          "Worried about getting scammed by fake sellers or unreliable buyers?",
        userBenefit: "See verified ratings before every transaction",
        description:
          "Think of it as your personal background check system. Every user has a visible rating based on real transactions. Completed a successful sale? Both parties rate each other. Sketchy behavior? One report flags the account for review. It's like having a reputation system that follows everyone, making bad actors visible and good users trustworthy. You know exactly who you're dealing with before you even start chatting.",

        howItWorks:
          "After each transaction, both parties rate their experience. User profiles display cumulative ratings, review count, and transaction history. Report suspicious accounts with one tap for admin review.",
        keyCapabilities: [
          "5-star rating system with written reviews",
          "Block suspicious users from contacting you",
          "Report accounts with automatic admin notification",
          "View seller/buyer history before engaging",
        ],

        technicalDetails: {
          approach:
            "Reputation system with weighted scoring algorithm (recent ratings weighted higher), fraud detection using behavioral pattern analysis, moderation queue with priority scoring, and account suspension triggers based on report thresholds.",
          technologies: [
            "MongoDB for user reputation scores",
            "Weighted average calculation (time-decay)",
            "Automated fraud detection algorithms",
            "Admin dashboard for moderation",
            "Push notifications for warnings",
            "Audit trail for all actions",
          ],
          architecture:
            "Trust and safety infrastructure with ML-based anomaly detection, automated flag triggers for suspicious patterns (multiple reports, low ratings), human-in-the-loop moderation for edge cases, and account suspension workflow with appeal process.",
        },
      },
      {
        id: 5,
        icon: Rocket,
        color: "#ec4899",

        title: "Boost Your Listing to the Top",
        tagline: "Your great deal buried under hundreds of other listings?",
        userBenefit: "Get 10x more views with premium placement",
        description:
          "It's like putting your item in the store window instead of the back shelf. Pay a small fee to boost your listing, and watch it appear at the top of search results, get highlighted on the map, and show up first in category browsing. Sell faster, reach more buyers, and stand out from the crowd—all for less than the cost of a coffee.",

        howItWorks:
          "Click 'Boost Listing' on any item, pay securely via Stripe, and watch your listing jump to featured placement for 7 days with premium visibility across search, map, and browse.",
        keyCapabilities: [
          "Stripe-powered premium listing payments",
          "Top placement in all search results",
          "Highlighted pins on interactive map",
          "Banner placement in category pages",
        ],

        technicalDetails: {
          approach:
            "Monetization engine with Stripe payment integration, implementing boost scoring algorithm that ranks boosted listings higher, TTL-based expiry for boost periods, and analytics tracking for ROI measurement.",
          technologies: [
            "Stripe Checkout Sessions",
            "Webhook handlers for payment confirmation",
            "MongoDB TTL indexes for auto-expiry",
            "Ranking algorithm with boost multiplier",
            "Google AdMob for banner ads",
            "Analytics tracking (impressions, clicks)",
          ],
          architecture:
            "Dual-tier listing system with boosted items in separate collection, query execution prioritizing boosted items, automatic demotion after expiry, revenue tracking dashboard, and A/B testing framework for boost effectiveness.",
        },
      },
      {
        id: 6,
        icon: Gauge,
        color: "#06b6d4",

        title: "Scale to Millions Without Slowing Down",
        tagline:
          "Worried your app will crash when your city has thousands of active listings?",
        userBenefit: "Handle 1M+ listings with instant search",
        description:
          "It's built like a race car—engineered to handle massive scale without breaking a sweat. Whether there are 100 listings or 1 million, search stays instant, maps load smoothly, and messages arrive in milliseconds. Works perfectly even on budget Android phones with limited memory. Your users get a premium experience regardless of how big your marketplace grows.",

        howItWorks:
          "Optimized database with smart indexing ensures lightning-fast queries. Firebase infrastructure auto-scales during traffic spikes. Efficient data loading means smooth performance even on older devices.",
        keyCapabilities: [
          "GeoHash indexing for sub-100ms location queries",
          "Firebase handles 1M+ concurrent users effortlessly",
          "Optimized for low-end devices (under 50MB RAM)",
          "Auto-scaling infrastructure handles viral growth",
        ],

        technicalDetails: {
          approach:
            "Horizontal scaling architecture with geo-sharding (data partitioned by region), implementing compound indexes on frequently queried fields, query result caching with Redis, and lazy loading with pagination for memory efficiency.",
          technologies: [
            "Firebase Firestore with sharding",
            "GeoHash indexing (5-character precision)",
            "Redis cache layer (5-min TTL)",
            "CDN for image delivery (Cloudflare)",
            "Virtual list rendering (React Window)",
            "Connection pooling for DB efficiency",
          ],
          architecture:
            "Multi-region deployment with geographically distributed Firestore instances, read replicas for query load distribution, write-through caching strategy, and mobile-first optimization with progressive enhancement for larger screens.",
        },
      },
    ],
  },
  // Project 13: E-commerce Store
  {
    $id: "p13",
    highlights: [
      {
        id: 1,
        icon: Lock,
        color: "#3b82f6",

        title: "Sign Up Securely, Stay Protected",
        tagline:
          "Creating accounts on sketchy websites that might leak your password?",
        userBenefit: "Bank-level security protecting your every transaction",
        description:
          "It's like having a vault guard your personal information. Forgot your password? Get an OTP code via email in seconds. Suspicious login attempt? The system blocks it automatically. Your data is encrypted, your sessions are secure, and you never have to worry about unauthorized access. Shop with confidence knowing your information is locked down tighter than Fort Knox.",

        howItWorks:
          "Create an account with email verification, login with JWT tokens that auto-expire, and reset passwords instantly via OTP sent to your email. Role-based access ensures admins and users have appropriate permissions.",
        keyCapabilities: [
          "JWT authentication with secure token management",
          "OTP-based password reset via email (SMTP)",
          "Role-based access control (user vs admin)",
          "Automatic session expiry for security",
        ],

        technicalDetails: {
          approach:
            "Stateless JWT authentication with refresh token rotation, bcrypt password hashing (12 rounds), SMTP email service for OTP delivery, and role-based middleware for route protection with token blacklisting on logout.",
          technologies: [
            "JWT with RS256 asymmetric encryption",
            "Bcrypt for password hashing (12 rounds)",
            "Nodemailer with SMTP (Gmail/SendGrid)",
            "Express middleware for route protection",
            "Redis for token blacklist",
            "Rate limiting on auth endpoints",
          ],
          architecture:
            "Stateless authentication with access tokens (15-min expiry) and refresh tokens (7-day expiry), implementing sliding session windows, HTTP-only secure cookies, CSRF protection, and audit logging for security events.",
        },
      },
      {
        id: 2,
        icon: ShoppingCart,
        color: "#10b981",

        title: "Browse, Save, Buy—Seamlessly",
        tagline:
          "Finding great products but losing track of what you wanted across multiple tabs?",
        userBenefit: "Never lose a product you loved again",
        description:
          "Imagine having a personal shopping assistant who remembers everything. Heart items you love and they wait in your wishlist. Add to cart and it stays there forever until you're ready. Browse by brand, filter by category, search for exactly what you need—and when you're ready to buy, your entire order history is there to remind you what you loved. It's shopping designed around how your brain actually works.",

        howItWorks:
          "Browse products with smart filters, save favorites to your wishlist, add to cart with quantity control, and checkout when ready. All your activity saves automatically—no more losing items or re-searching.",
        keyCapabilities: [
          "Product catalog with brand, category, and price filters",
          "Persistent wishlist and cart across sessions",
          "Quantity management with stock validation",
          "Complete order history with reorder option",
        ],

        technicalDetails: {
          approach:
            "E-commerce state management with Redux for client-side cart/wishlist persistence, MongoDB for product catalog with compound indexes, inventory management with atomic operations, and order processing with ACID transactions.",
          technologies: [
            "Redux with Redux Persist for cart state",
            "MongoDB with aggregation pipelines",
            "React Context for global state",
            "LocalStorage for offline cart access",
            "Atomic operations for inventory updates",
            "Transaction rollback on payment failure",
          ],
          architecture:
            "CQRS pattern with separate read (catalog browsing) and write (cart operations) paths, event sourcing for order lifecycle, optimistic UI updates for cart operations, and eventual consistency for inventory synchronization.",
        },
      },
      {
        id: 3,
        icon: Users,
        color: "#8b5cf6",

        title: "Your Profile, Your Way",
        tagline:
          "Manually re-entering your shipping address every single time you order something?",
        userBenefit:
          "Save unlimited addresses and switch between them instantly",
        description:
          "Think of it as your personal command center. Update your info once and it's saved everywhere. Add your home address, work address, parents' address—switch between them with one click at checkout. See every order you've ever made, track packages in real-time, and revisit past purchases when you need to reorder. It's your complete shopping history and preferences, always available, perfectly organized.",

        howItWorks:
          "Edit your profile details anytime, manage multiple shipping addresses with full CRUD operations, and access your complete order history with tracking info and delivery status.",
        keyCapabilities: [
          "Editable user profile with personal information",
          "Multiple address management (create, read, update, delete)",
          "Complete order history with detailed item breakdown",
          "Default address selection for quick checkout",
        ],

        technicalDetails: {
          approach:
            "Normalized database schema with user entity linked to addresses collection (one-to-many), implementing soft deletes for addresses, order history with embedded product snapshots, and profile updates with optimistic locking.",
          technologies: [
            "MongoDB with normalized collections",
            "Mongoose for schema validation",
            "Embedded documents for order items",
            "Soft delete flags for address removal",
            "Indexing on userId for fast queries",
            "Validation middleware for data integrity",
          ],
          architecture:
            "Microservices approach with separate user service and order service, API gateway for unified access, shared user context via JWT claims, and denormalized order documents for query performance.",
        },
      },
      {
        id: 4,
        icon: Award,
        color: "#f59e0b",

        title: "Read Real Reviews, Write Your Own",
        tagline:
          "Buying blind without knowing if products actually deliver on their promises?",
        userBenefit:
          "Make confident purchases backed by real customer experiences",
        description:
          "It's like having honest friends who've already bought everything you're considering. See what real customers loved (and didn't love), check star ratings at a glance, and read detailed reviews before you commit. After you buy, share your own experience to help others. Bad reviews get flagged, fake ones get removed, and you always see authentic feedback that helps you shop smarter.",

        howItWorks:
          "Browse any product to see average rating and all reviews. After purchasing, write your own review with star rating and detailed feedback. Edit or delete your reviews anytime, while admins moderate for quality.",
        keyCapabilities: [
          "Create, edit, and delete your own product reviews",
          "5-star rating system with average calculation",
          "Admin moderation removes fake/inappropriate reviews",
          "Verified purchase badges for authentic reviews",
        ],

        technicalDetails: {
          approach:
            "Review system with weighted average calculation, implementing verified purchaser checks, review abuse detection, content moderation queue, and real-time rating updates using MongoDB aggregation framework.",
          technologies: [
            "MongoDB aggregation for average ratings",
            "Compound indexes on productId + userId",
            "Sentiment analysis for review flagging",
            "Admin dashboard for moderation",
            "Real-time updates via WebSocket",
            "Timestamp-based sorting (helpful votes)",
          ],
          architecture:
            "Event-driven review system with rating recalculation on each review submission, denormalized rating averages stored in product documents for fast access, moderation queue with priority scoring, and audit trail for review changes.",
        },
      },
      {
        id: 5,
        icon: Settings,
        color: "#06b6d4",

        title: "Control Your Store from Mission Control",
        tagline:
          "Juggling spreadsheets, inventory counts, and order tracking across multiple systems?",
        userBenefit: "Manage your entire store from one powerful dashboard",
        description:
          "Imagine having a bird's-eye view of your entire business. Add new products in seconds, upload images in bulk, track inventory in real-time, see exactly what's selling and what's not. Process orders with status updates that customers see instantly. Create new brands and categories on the fly. It's like having a store manager, inventory clerk, and data analyst all rolled into one intuitive interface.",

        howItWorks:
          "Comprehensive admin panel handles everything: add/edit/delete products with images and inventory, manage brands and categories, update order statuses, and monitor store performance—all from one dashboard.",
        keyCapabilities: [
          "Product CRUD with multi-image upload and inventory tracking",
          "Brand and category management with hierarchies",
          "Order management with status updates (processing, shipped, delivered)",
          "Bulk operations for efficiency at scale",
        ],

        technicalDetails: {
          approach:
            "Admin panel with role-based permissions, implementing multi-step forms with validation, image upload pipeline with compression and CDN delivery, inventory management with low-stock alerts, and order workflow state machine.",
          technologies: [
            "React Admin framework",
            "Multer for file uploads",
            "Sharp for image processing",
            "Cloudinary CDN for image hosting",
            "MongoDB transactions for consistency",
            "WebSocket for real-time order updates",
          ],
          architecture:
            "Backoffice architecture with separate admin API endpoints, role-based middleware enforcing permissions, optimistic UI updates with rollback on error, batch operations for bulk updates, and event bus for cross-service notifications.",
        },
      },
      {
        id: 6,
        icon: Sparkles,
        color: "#ec4899",

        title: "Beautiful, Smooth, Delightful to Use",
        tagline: "Frustrated by ugly, clunky stores that feel stuck in 2010?",
        userBenefit: "Shopping experience that feels like magic",
        description:
          "It's not just about function—it's about feeling good while you shop. Every button responds instantly, every transition is smooth, every form validates in real-time with helpful error messages. It works perfectly on your phone, tablet, or laptop. Loading animations keep you entertained, success confirmations feel rewarding, and the whole experience just... flows. It's shopping that doesn't feel like work.",

        howItWorks:
          "Modern Material UI design system ensures visual consistency, Framer Motion adds smooth animations, React Hook Form validates inputs instantly, and responsive layout adapts perfectly to any screen size.",
        keyCapabilities: [
          "Responsive Material UI components for modern aesthetics",
          "Smooth animations via Framer Motion and Lottie",
          "Real-time form validation with clear error messages",
          "Mobile-first design that scales beautifully",
        ],

        technicalDetails: {
          approach:
            "Component-driven UI architecture with design system tokens, implementing animation orchestration with spring physics, form state management with validation schemas, and responsive design using CSS Grid and Flexbox.",
          technologies: [
            "Material UI v5 component library",
            "Framer Motion for animations",
            "Lottie for vector animations",
            "React Hook Form with Yup validation",
            "CSS-in-JS with styled-components",
            "Responsive design with breakpoints",
          ],
          architecture:
            "Atomic design methodology with reusable components, theme provider for consistent styling, lazy loading for code splitting, intersection observer for scroll animations, and performance budgets enforced via Lighthouse.",
        },
      },
    ],
  },
  // Project 14: Insurance Qualification & Follow-Up AI Agent
  {
    $id: "p14",
    highlights: [
      {
        id: 1,
        icon: MessageSquare,
        color: "#3b82f6",

        // LAYER 1: PROBLEM-FOCUSED
        title: "Stop Wasting Time on Unqualified Leads",
        tagline:
          "Spending hours calling prospects who aren't ready to buy or can't afford coverage?",
        userBenefit: "Qualify 10x more leads in the same time",
        description:
          "Imagine if every prospect call automatically gathered all the information you need—current coverage, budget constraints, life changes, future plans—without the back-and-forth. Your AI assistant asks the right questions in natural conversation, so you only talk to people ready to buy.",

        // LAYER 2: SOLUTION BRIDGE
        howItWorks:
          "The AI voice agent conducts structured qualification calls, asking targeted insurance questions and recording responses in real-time, then recaps everything with the prospect to ensure accuracy.",
        keyCapabilities: [
          "Conducts natural insurance qualification conversations with voice AI",
          "Captures coverage gaps, budget, and life changes automatically",
          "Real-time answer verification prevents miscommunication",
          "Structured data collection eliminates manual note-taking",
        ],

        // LAYER 3: TECHNICAL DEPTH
        technicalDetails: {
          approach:
            "Voice-driven conversational AI with structured data extraction and real-time validation loops",
          technologies: [
            "Natural Language Processing for intent recognition",
            "Voice synthesis with contextual awareness",
            "Real-time transcription and entity extraction",
            "Structured response validation engine",
            "Dynamic question flow based on previous answers",
          ],
          architecture:
            "Event-driven architecture processes voice input through NLP pipelines, extracts insurance-specific entities, validates responses in real-time, and stores structured qualification data for downstream processing.",
        },
      },

      {
        id: 2,
        icon: Mail,
        color: "#8b5cf6",

        // LAYER 1: PROBLEM-FOCUSED
        title: "Send Perfect Follow-Ups Without Lifting a Finger",
        tagline:
          "Losing deals because you can't personalize follow-ups fast enough?",
        userBenefit: "Convert 3x more leads with instant, tailored responses",
        description:
          "The moment a qualification call ends, your prospect receives a personalized email with exactly the insurance options they need—matched to their budget, coverage gaps, and preferences. No templates, no delays, no manual work. It's like having a marketing team that works at the speed of conversation.",

        // LAYER 2: SOLUTION BRIDGE
        howItWorks:
          "Based on qualification responses, the system automatically generates personalized emails with relevant insurance options, pricing, and next steps—including calendar links for specialist consultations.",
        keyCapabilities: [
          "Auto-generated emails match prospect's specific needs and budget",
          "Dynamic content includes policy options and pricing comparisons",
          "One-click scheduling for specialist consultations",
          "Personalization based on life changes and coverage gaps",
        ],

        // LAYER 3: TECHNICAL DEPTH
        technicalDetails: {
          approach:
            "Rule-based personalization engine with template generation and dynamic content insertion",
          technologies: [
            "Email automation API integration",
            "Dynamic template rendering engine",
            "CRM data synchronization",
            "Calendar scheduling API (Calendly/Cal.com)",
            "Personalization logic based on qualification data",
            "A/B testing framework for email optimization",
          ],
          architecture:
            "Microservice processes qualification data, applies business rules to match insurance products, generates personalized email content via templating engine, and triggers delivery through email service provider with tracking pixels for engagement analytics.",
        },
      },

      {
        id: 3,
        icon: Users,
        color: "#f59e0b",

        // LAYER 1: PROBLEM-FOCUSED
        title: "Never Let a Hot Lead Go Cold",
        tagline:
          "Prospects ready to buy right now but your specialists are all busy?",
        userBenefit: "Capture every ready-to-buy moment with instant handoffs",
        description:
          "When a prospect says 'I want to talk to someone today,' they're instantly connected to an available specialist—no hold music, no callbacks, no lost momentum. For everyone else, they're automatically added to nurture campaigns that keep them warm until they're ready. You never lose a sale to bad timing again.",

        // LAYER 2: SOLUTION BRIDGE
        howItWorks:
          "Hot leads trigger instant transfers to live specialists with full context, while cooler prospects enter automated nurture campaigns that deliver value until they're ready to buy.",
        keyCapabilities: [
          "Instant specialist routing with full conversation history",
          "Intelligent lead scoring determines hot vs. nurture",
          "Automatic CRM and campaign integration",
          "Context handoff includes budget, pain points, and urgency",
        ],

        // LAYER 3: TECHNICAL DEPTH
        technicalDetails: {
          approach:
            "Real-time routing system with lead scoring, availability management, and campaign orchestration",
          technologies: [
            "WebRTC for voice transfer with context",
            "Lead scoring algorithm (urgency, budget, timeline)",
            "CRM API integration (Salesforce, HubSpot)",
            "Marketing automation platform webhooks",
            "Queue management system for specialist availability",
            "Event-driven webhooks for campaign triggers",
          ],
          architecture:
            "Routing engine evaluates lead score and specialist availability in real-time, initiates WebRTC transfer with serialized context for hot leads, or publishes events to marketing automation platform for nurture sequences, with bidirectional CRM sync maintaining data consistency.",
        },
      },
    ],
  },
  // Project 15: AI-Powered Chatbot with OpenAI
  {
    $id: "p15",
    highlights: [
      {
        id: 1,
        icon: Brain,
        color: "#3b82f6",

        // LAYER 1: PROBLEM-FOCUSED
        title: "Get Answers That Actually Understand You",
        tagline:
          "Tired of chatbots that give robotic responses and can't handle anything beyond simple questions?",
        userBenefit: "Solve complex problems in seconds, not support tickets",
        description:
          "Ask anything—in plain English, with screenshots, or with code examples—and get intelligent responses that actually understand context. It's like having an expert who can read your mind, analyze images, and explain complex code, all in one conversation.",

        // LAYER 2: SOLUTION BRIDGE
        howItWorks:
          "Multiple AI models work together to understand text, analyze images, and provide contextual answers with proper formatting, syntax highlighting, and visual elements.",
        keyCapabilities: [
          "Analyzes images and screenshots to answer visual questions",
          "Renders code with syntax highlighting across 100+ languages",
          "Switches between AI models for optimal responses",
          "Formats answers with markdown for clarity and readability",
        ],

        // LAYER 3: TECHNICAL DEPTH
        technicalDetails: {
          approach:
            "Multi-modal AI integration with vision capabilities, markdown rendering, and dynamic model selection",
          technologies: [
            "OpenAI GPT-4 Vision API for image analysis",
            "Multi-provider AI abstraction layer",
            "Marked.js for markdown parsing and rendering",
            "Highlight.js for syntax highlighting",
            "Base64 image encoding for API transmission",
            "Streaming response handlers for real-time output",
          ],
          architecture:
            "Provider-agnostic service layer abstracts multiple AI APIs, processes multimodal inputs (text/images), streams responses through markdown parser with syntax highlighter, and renders output with client-side hydration for interactive elements.",
        },
      },

      {
        id: 2,
        icon: Lock,
        color: "#10b981",

        // LAYER 1: PROBLEM-FOCUSED
        title: "Your Conversations Stay Private and Secure",
        tagline:
          "Worried about sensitive data leaking or unauthorized access to your chat history?",
        userBenefit: "Enterprise-grade security without enterprise complexity",
        description:
          "Every conversation is encrypted and protected behind secure authentication. Role-based access ensures team members only see what they should, while you maintain complete control over who accesses what. Sleep easy knowing your data is locked down tighter than a bank vault.",

        // LAYER 2: SOLUTION BRIDGE
        howItWorks:
          "JWT authentication creates secure sessions, role-based permissions control access levels, and MongoDB encryption protects all data at rest and in transit.",
        keyCapabilities: [
          "Encrypted sessions prevent unauthorized access",
          "Role-based permissions control feature access by user type",
          "Secure API endpoints with token validation on every request",
          "MongoDB encryption protects conversation history",
        ],

        // LAYER 3: TECHNICAL DEPTH
        technicalDetails: {
          approach:
            "JWT-based authentication with role-based access control (RBAC) and encrypted data persistence",
          technologies: [
            "JSON Web Tokens (JWT) with RS256 signing",
            "bcrypt password hashing with salt rounds",
            "MongoDB with field-level encryption",
            "Express.js middleware for route protection",
            "CORS policies for origin validation",
            "Rate limiting with Redis for DDoS protection",
          ],
          architecture:
            "Authentication service issues JWT tokens upon login, middleware validates tokens on protected routes, RBAC layer checks user roles against resource permissions, and MongoDB driver encrypts sensitive fields using envelope encryption with AWS KMS or similar key management.",
        },
      },

      {
        id: 3,
        icon: MessageSquare,
        color: "#8b5cf6",

        // LAYER 1: PROBLEM-FOCUSED
        title: "Never Lose Your Train of Thought",
        tagline:
          "Switching between projects and forgetting what you were working on?",
        userBenefit: "Pick up exactly where you left off, every time",
        description:
          "Every conversation is saved automatically. Return days or weeks later and your entire chat history is waiting—complete with code snippets, images, and context. Copy any response to use in your projects, switch between AI models mid-conversation, and get notifications when long tasks finish. It's like having infinite memory.",

        // LAYER 2: SOLUTION BRIDGE
        howItWorks:
          "All conversations are persisted with full context, enabling instant recall, one-click copying of responses, model switching, and real-time notifications for completed tasks.",
        keyCapabilities: [
          "Automatic conversation history across all sessions",
          "Copy any code or response with one click",
          "Switch AI models mid-conversation without losing context",
          "Push notifications for long-running task completion",
        ],

        // LAYER 3: TECHNICAL DEPTH
        technicalDetails: {
          approach:
            "Real-time chat persistence with WebSocket notifications and client-side state management",
          technologies: [
            "MongoDB with conversation threading and indexing",
            "Socket.io for real-time bidirectional communication",
            "Clipboard API for copy-to-clipboard functionality",
            "Web Push API for browser notifications",
            "React Context for global state management",
            "IndexedDB for offline conversation caching",
          ],
          architecture:
            "WebSocket server maintains persistent connections for real-time updates, MongoDB stores threaded conversation documents with message arrays, client state manager syncs with server via Socket.io events, and service worker handles push notifications with background sync for offline resilience.",
        },
      },

      {
        id: 4,
        icon: Sparkles,
        color: "#f59e0b",

        // LAYER 1: PROBLEM-FOCUSED
        title: "Beautiful on Every Device, Every Time",
        tagline:
          "Clunky interfaces that break on mobile or hurt your eyes in dark rooms?",
        userBenefit:
          "Seamless experience whether you're at your desk or on the go",
        description:
          "Switch between light and dark mode instantly. Use it on your phone during commutes or on your desktop for deep work—the interface adapts perfectly. Smooth animations make every interaction feel delightful, not clunky. It's productivity software that actually feels good to use.",

        // LAYER 2: SOLUTION BRIDGE
        howItWorks:
          "Responsive Tailwind CSS design automatically adjusts to any screen size, while theme switching and smooth animations create a polished experience across devices.",
        keyCapabilities: [
          "Dark and light modes with instant switching (no flicker)",
          "Mobile-first design works flawlessly on phones and tablets",
          "Smooth animations and transitions for every interaction",
          "Intuitive navigation that feels natural on any device",
        ],

        // LAYER 3: TECHNICAL DEPTH
        technicalDetails: {
          approach:
            "Mobile-first responsive design with CSS-in-JS theming and hardware-accelerated animations",
          technologies: [
            "Tailwind CSS with custom design system tokens",
            "CSS variables for dynamic theme switching",
            "Framer Motion for declarative animations",
            "Responsive breakpoints (mobile, tablet, desktop, 4K)",
            "localStorage theme persistence",
            "Prefers-color-scheme media query detection",
          ],
          architecture:
            "Theme provider wraps application with CSS variable injection, Tailwind utility classes respond to breakpoints via mobile-first methodology, Framer Motion handles GPU-accelerated transforms and opacity transitions, and localStorage syncs theme preference across sessions with SSR hydration support.",
        },
      },

      {
        id: 5,
        icon: Database,
        color: "#06b6d4",

        // LAYER 1: PROBLEM-FOCUSED
        title: "Upload Anything, Find Everything",
        tagline:
          "Losing valuable conversations or struggling to find that one answer from last week?",
        userBenefit: "Access any conversation or file in under 2 seconds",
        description:
          "Upload documents, images, or code files and chat about them instantly. Need that Python solution from three weeks ago? Search and find it in seconds. Everything is organized, searchable, and recovers gracefully even if something goes wrong. It's your second brain, but better.",

        // LAYER 2: SOLUTION BRIDGE
        howItWorks:
          "File upload processing handles multiple formats, advanced search indexes all conversations and content, while error recovery ensures nothing is ever lost.",
        keyCapabilities: [
          "Upload and process documents, images, and code files",
          "Full-text search across all conversations and files",
          "Customizable settings for personalized experience",
          "Automatic error recovery and data backup",
        ],

        // LAYER 3: TECHNICAL DEPTH
        technicalDetails: {
          approach:
            "File processing pipeline with full-text search indexing, configurable settings, and fault-tolerant architecture",
          technologies: [
            "Multer for multipart file upload handling",
            "MongoDB full-text search indexes",
            "File type validation with magic number detection",
            "S3-compatible object storage for file persistence",
            "Elasticsearch for advanced search (optional)",
            "Redis for settings cache and session storage",
            "Circuit breaker pattern for error recovery",
          ],
          architecture:
            "Upload service validates files, processes through type-specific handlers, stores in object storage with CDN distribution, indexes content in MongoDB/Elasticsearch, implements retry logic with exponential backoff, and maintains Redis cache layer for fast settings retrieval with automatic cache invalidation.",
        },
      },
    ],
  },
  // Project 16: FormCO
  {
    $id: "p16",
    highlights: [
      {
        id: 1,
        icon: Target,
        color: "#3b82f6",

        // LAYER 1: PROBLEM-FOCUSED
        title: "Run Competitions Without the Chaos",
        tagline:
          "Drowning in spreadsheets, emails, and manual registration tracking for your events?",
        userBenefit:
          "Launch professional competitions in 10 minutes, not 10 days",
        description:
          "Create a competition, publish it, and watch registrations pour in—all automatically tracked and organized. Teams register themselves, payment verification happens instantly, and certificates generate automatically. It's like having an event management team working 24/7, without the payroll.",

        // LAYER 2: SOLUTION BRIDGE
        howItWorks:
          "Complete lifecycle management handles everything from event creation and registration forms to payment tracking and certificate generation, all through a single dashboard.",
        keyCapabilities: [
          "Create and publish competitions with custom registration forms",
          "Support both team and individual participation workflows",
          "Dynamic form builder with validation rules",
          "Automated certificate generation after event completion",
        ],

        // LAYER 3: TECHNICAL DEPTH
        technicalDetails: {
          approach:
            "Full-stack event management platform with dynamic form generation, payment integration, and document automation",
          technologies: [
            "Next.js 14 with App Router for SSR",
            "MongoDB with Mongoose ODM for data modeling",
            "Dynamic form builder with React Hook Form",
            "Zod schema validation for type safety",
            "PDF generation with jsPDF for certificates",
            "Image upload with Cloudinary integration",
          ],
          architecture:
            "Next.js API routes handle CRUD operations, MongoDB stores hierarchical event/competition/registration data, dynamic form renderer generates validated inputs from JSON schemas, payment webhook listeners trigger approval workflows, and PDF service generates certificates from templates with participant data injection.",
        },
      },

      {
        id: 2,
        icon: Lock,
        color: "#10b981",

        // LAYER 1: PROBLEM-FOCUSED
        title: "Everyone Gets Exactly the Access They Need",
        tagline:
          "Confused about who can create events, who can approve registrations, or who can just participate?",
        userBenefit:
          "Zero security headaches with foolproof permission management",
        description:
          "Organizations own events, organizers run competitions, and students register—each role sees exactly what they need and nothing more. Sign in with Google or create an account, and the system handles the rest. No accidental deletions, no unauthorized access, just smooth operations.",

        // LAYER 2: SOLUTION BRIDGE
        howItWorks:
          "Multi-role authentication with Google OAuth and traditional login creates secure sessions, while role-based permissions ensure organizations, organizers, and students have appropriate access levels.",
        keyCapabilities: [
          "Google OAuth and email/password authentication options",
          "Three-tier permission system (Organization, Organizer, Student)",
          "JWT session management with automatic refresh",
          "Protected routes prevent unauthorized access",
        ],

        // LAYER 3: TECHNICAL DEPTH
        technicalDetails: {
          approach:
            "NextAuth.js authentication with custom JWT strategy and role-based access control middleware",
          technologies: [
            "NextAuth.js v5 with Google OAuth provider",
            "JWT session tokens with role claims",
            "bcrypt for credential password hashing",
            "Middleware guards for protected routes",
            "MongoDB adapter for session persistence",
            "Custom authorization callbacks for role validation",
          ],
          architecture:
            "NextAuth handles OAuth flows and credential validation, issues JWT tokens with embedded role claims, middleware intercepts requests to protected routes and validates tokens, authorization layer checks user roles against resource permissions via MongoDB queries, and session store maintains user state with automatic token refresh.",
        },
      },

      {
        id: 3,
        icon: CheckCircle2,
        color: "#8b5cf6",

        // LAYER 1: PROBLEM-FOCUSED
        title: "Approvals Happen Automatically (Finally)",
        tagline:
          "Spending hours manually verifying payments, approving applications, and sending confirmation emails?",
        userBenefit: "Eliminate 90% of manual admin work instantly",
        description:
          "Payment screenshots upload, get verified, and trigger automatic approvals—all while sending confirmation emails to participants. Organizers get approved by admins with one click. Documents are checked automatically. It's like having a tireless assistant who never takes a coffee break.",

        // LAYER 2: SOLUTION BRIDGE
        howItWorks:
          "Automated approval workflows track registration status, verify payment uploads, trigger admin reviews, and send email notifications at every step without manual intervention.",
        keyCapabilities: [
          "Admin approval system for organizer applications",
          "Payment screenshot upload and verification tracking",
          "Document verification with status updates",
          "Automated email notifications via Nodemailer at each stage",
        ],

        // LAYER 3: TECHNICAL DEPTH
        technicalDetails: {
          approach:
            "State machine-based workflow automation with event-driven email notifications and document processing",
          technologies: [
            "Finite state machine for registration status",
            "Nodemailer with Gmail SMTP for transactional emails",
            "Cloudinary for payment screenshot storage",
            "MongoDB change streams for real-time triggers",
            "Bull queue for async email processing",
            "Handlebars templates for email content",
          ],
          architecture:
            "Registration state machine transitions through defined stages (pending, payment_submitted, verified, approved), MongoDB change streams detect state changes and publish events, Bull queue workers consume events to trigger Nodemailer with templated emails, Cloudinary webhooks notify document uploads, and admin dashboard provides manual override controls.",
        },
      },

      {
        id: 4,
        icon: Award,
        color: "#f59e0b",

        // LAYER 1: PROBLEM-FOCUSED
        title: "Build Trust in Your Community",
        tagline:
          "Worried about fake accounts, scammers, or unreliable participants ruining your events?",
        userBenefit:
          "Create a safe environment where only verified, trusted users participate",
        description:
          "Every user has a verified profile with ratings and reviews. Suspicious accounts? Block or report them instantly. Admins can moderate disputes and resolve issues before they escalate. It's community safety on autopilot, so you can focus on running great events, not playing security guard.",

        // LAYER 2: SOLUTION BRIDGE
        howItWorks:
          "User verification system with ratings, reviews, and reporting tools ensures safe participation, while admin moderation handles disputes and removes bad actors.",
        keyCapabilities: [
          "User verification with profile ratings and reviews",
          "Block and report features for suspicious accounts",
          "Admin dashboard for moderation and dispute resolution",
          "Automated flagging of problematic behavior patterns",
        ],

        // LAYER 3: TECHNICAL DEPTH
        technicalDetails: {
          approach:
            "Trust and safety system with user reputation scoring, moderation queue, and automated flagging",
          technologies: [
            "Rating aggregation algorithms (weighted average)",
            "Report classification with severity scoring",
            "Block list implementation with user relationship graph",
            "Admin moderation queue with priority sorting",
            "Notification system for dispute alerts",
            "Audit logging for moderation actions",
          ],
          architecture:
            "User model includes reputation score calculated from weighted ratings, report submissions create moderation tickets with ML-based severity classification, block relationships stored in adjacency list for efficient lookup, admin interface queries pending reports sorted by priority, and audit trail logs all moderation decisions for compliance and review.",
        },
      },

      {
        id: 5,
        icon: Rocket,
        color: "#ec4899",

        // LAYER 1: PROBLEM-FOCUSED
        title: "Get Your Events Seen by More People",
        tagline: "Creating great competitions but nobody knows they exist?",
        userBenefit:
          "10x your visibility with premium placement and monetization",
        description:
          "Boost your competition to the top of search results with a single click. Premium placement ensures your event gets maximum eyeballs, while integrated ads create additional revenue streams. It's like having a marketing budget without spending on marketing.",

        // LAYER 2: SOLUTION BRIDGE
        howItWorks:
          "Stripe-powered boost feature places listings at the top of search results, while AdMob integration generates revenue through strategic ad placement.",
        keyCapabilities: [
          "One-click boost feature via Stripe payment",
          "Premium placement in search results and homepage",
          "Google AdMob integration for additional revenue",
          "Analytics dashboard showing boost performance",
        ],

        // LAYER 3: TECHNICAL DEPTH
        technicalDetails: {
          approach:
            "Freemium monetization model with payment processing, search ranking algorithm, and ad network integration",
          technologies: [
            "Stripe Checkout for one-time boost payments",
            "MongoDB compound indexes for boosted listing queries",
            "Google AdMob SDK for mobile ad serving",
            "Search ranking algorithm with boost multiplier",
            "Analytics tracking with conversion pixels",
            "Webhook handlers for payment confirmation",
          ],
          architecture:
            "Stripe Checkout creates payment session, webhook confirms payment and updates listing boost status in MongoDB, search query applies boost multiplier to ranking score (recency * relevance * boost_factor), AdMob SDK loads interstitial and banner ads at strategic points, and analytics service tracks impressions and conversions via event tracking.",
        },
      },

      {
        id: 6,
        icon: Gauge,
        color: "#06b6d4",

        // LAYER 1: PROBLEM-FOCUSED
        title: "Handle Massive Scale Without Breaking a Sweat",
        tagline: "Worried your platform will crash when your event goes viral?",
        userBenefit:
          "Support millions of users on any device, even slow connections",
        description:
          "Whether you have 100 users or 1 million, the platform runs smoothly. Lightning-fast location searches, instant results even on old phones, and infrastructure that scales automatically. It's built to handle your biggest dreams without ever slowing down.",

        // LAYER 2: SOLUTION BRIDGE
        howItWorks:
          "GeoHash indexing enables sub-second location queries, Firebase infrastructure scales automatically to millions of users, and aggressive optimization ensures smooth performance on low-end devices.",
        keyCapabilities: [
          "GeoHash indexing for instant location-based searches",
          "Firebase Firestore supports 1M+ concurrent users automatically",
          "Optimized for devices with less than 50MB available RAM",
          "CDN distribution for global fast loading",
        ],

        // LAYER 3: TECHNICAL DEPTH
        technicalDetails: {
          approach:
            "Geospatial indexing with cloud-native scalable infrastructure and aggressive performance optimization",
          technologies: [
            "GeoHash algorithm for spatial indexing (9-character precision)",
            "Firebase Firestore with automatic sharding",
            "Vercel Edge Network for CDN distribution",
            "Image optimization with next/image and WebP",
            "Code splitting and lazy loading with React.lazy",
            "Service worker for offline functionality",
          ],
          architecture:
            "GeoHash converts lat/lng to string prefixes enabling range queries on single index, Firebase auto-scales read replicas and shards data across regions, Next.js generates static pages at edge locations via ISR, images serve optimized formats via Vercel Image Optimization, React lazy loads route components with Suspense boundaries, and service worker caches critical assets for offline-first experience.",
        },
      },
    ],
  },
];

const TECH_MAPPING: Record<
  string,
  { icon: React.ReactNode; category: string; color: string }
> = {
  // Frontend Frameworks & Libraries
  React: { icon: <SiReact />, category: "Frontend Library", color: "#61DAFB" },
  "Next.js": {
    icon: <SiNextdotjs />,
    category: "Frontend Framework",
    color: "#000000",
  },
  Flutter: {
    icon: <SiFlutter />,
    category: "Mobile Framework",
    color: "#02569B",
  },
  "Tailwind CSS": {
    icon: <SiTailwindcss />,
    category: "CSS Framework",
    color: "#06B6D4",
  },
  "Material UI": {
    icon: <SiMaterialdesignicons />,
    category: "UI Library",
    color: "#007FFF",
  },
  "Framer Motion": {
    icon: <SiFramer />,
    category: "Animation Library",
    color: "#0055FF",
  },
  ShadCn: { icon: <SiReact />, category: "UI Components", color: "#000000" },
  "Headless UI": {
    icon: <SiReact />,
    category: "UI Components",
    color: "#66E3FF",
  },

  // Languages
  TypeScript: {
    icon: <SiTypescript />,
    category: "Programming Language",
    color: "#3178C6",
  },
  JavaScript: {
    icon: <SiJavascript />,
    category: "Programming Language",
    color: "#F7DF1E",
  },
  Python: {
    icon: <SiPython />,
    category: "Programming Language",
    color: "#3776AB",
  },
  Dart: {
    icon: <SiDart />,
    category: "Programming Language",
    color: "#0175C2",
  },

  // Backend & Runtime
  "Node.js": {
    icon: <SiNodedotjs />,
    category: "Backend Runtime",
    color: "#339933",
  },
  "Express.js": {
    icon: <SiExpress />,
    category: "Backend Framework",
    color: "#000000",
  },
  FastAPI: {
    icon: <SiFastapi />,
    category: "Backend Framework",
    color: "#009688",
  },
  Django: {
    icon: <SiDjango />,
    category: "Backend Framework",
    color: "#092E20",
  },

  // Databases
  MongoDB: {
    icon: <SiMongodb />,
    category: "NoSQL Database",
    color: "#47A248",
  },
  PostgreSQL: {
    icon: <SiPostgresql />,
    category: "SQL Database",
    color: "#336791",
  },
  "Firebase Firestore": {
    icon: <SiFirebase />,
    category: "NoSQL Database",
    color: "#FFCA28",
  },
  Firebase: {
    icon: <SiFirebase />,
    category: "Backend Platform",
    color: "#FFCA28",
  },
  Appwrite: {
    icon: <SiAppwrite />,
    category: "Backend Platform",
    color: "#FD366E",
  },
  Supabase: {
    icon: <SiSupabase />,
    category: "Backend Platform",
    color: "#3ECF8E",
  },
  Redis: { icon: <SiRedis />, category: "Cache Database", color: "#DC382D" },
  Pinecone: {
    icon: <GiPineTree />,
    category: "Vector Database",
    color: "#2E7D32",
  },
  Mongoose: { icon: <SiMongodb />, category: "ODM Library", color: "#880000" },

  // Cloud & DevOps
  AWS: { icon: <FaAws />, category: "Cloud Platform", color: "#FF9900" },
  "AWS Lambda": { icon: <FaAws />, category: "Serverless", color: "#FF9900" },
  "AWS EC2": { icon: <FaAws />, category: "Cloud Compute", color: "#FF9900" },
  "AWS S3": { icon: <FaAws />, category: "Cloud Storage", color: "#569A31" },
  "AWS RDS": { icon: <FaAws />, category: "Cloud Database", color: "#527FFF" },
  "AWS RDS (PostgreSQL)": {
    icon: <FaAws />,
    category: "Cloud Database",
    color: "#527FFF",
  },
  "AWS CloudFront": { icon: <FaAws />, category: "CDN", color: "#8C4FFF" },
  Docker: {
    icon: <SiDocker />,
    category: "Containerization",
    color: "#2496ED",
  },
  Kubernetes: {
    icon: <SiKubernetes />,
    category: "Orchestration",
    color: "#326CE5",
  },
  Vercel: {
    icon: <SiVercel />,
    category: "Hosting Platform",
    color: "#000000",
  },
  Cloudflare: {
    icon: <SiCloudflare />,
    category: "Edge Network",
    color: "#F38020",
  },

  // AI & ML
  "OpenAI API": {
    icon: <SiOpenai />,
    category: "AI Service",
    color: "#412991",
  },
  "OpenAI Whisper API": {
    icon: <SiOpenai />,
    category: "AI Service",
    color: "#412991",
  },
  "OpenAI GPT-4.1 API": {
    icon: <SiOpenai />,
    category: "AI Model",
    color: "#412991",
  },
  "Anthropic Claude": {
    icon: <SiOpenai />,
    category: "AI Model",
    color: "#181818",
  },
  "TensorFlow Lite": {
    icon: <SiTensorflow />,
    category: "ML Framework",
    color: "#FF6F00",
  },
  LangChain: {
    icon: <SiLangchain />,
    category: "AI Framework",
    color: "#1C3C3C",
  },
  "Custom NLP Pipeline": {
    icon: <SiPython />,
    category: "AI/ML",
    color: "#3776AB",
  },
  "Hugging Face Transformers": {
    icon: <SiPython />,
    category: "AI/ML",
    color: "#3776AB",
  },

  // Automation & Integration
  n8n: { icon: <SiN8N />, category: "Automation", color: "#EF4444" },
  "Stripe API": {
    icon: <SiStripe />,
    category: "Payment Gateway",
    color: "#635BFF",
  },
  "Google Maps API": {
    icon: <SiGooglemaps />,
    category: "Maps Service",
    color: "#4285F4",
  },

  // Build Tools & Dev Tools
  Webpack: { icon: <SiWebpack />, category: "Build Tool", color: "#8DD6F9" },
  Vite: { icon: <SiVite />, category: "Build Tool", color: "#646CFF" },
  Rollup: { icon: <SiJavascript />, category: "Build Tool", color: "#EC4A3F" },
  ESLint: { icon: <SiEslint />, category: "Code Quality", color: "#4B32C3" },
  Prettier: {
    icon: <SiPrettier />,
    category: "Code Formatter",
    color: "#F7B93E",
  },

  // APIs & Communication
  GraphQL: { icon: <SiGraphql />, category: "API", color: "#E10098" },
  "REST APIs": { icon: <SiNodedotjs />, category: "API", color: "#339933" },
  WebSocket: {
    icon: <SiSocketdotio />,
    category: "Real-time Protocol",
    color: "#010101",
  },
  "Socket.io": {
    icon: <SiSocketdotio />,
    category: "Real-time Library",
    color: "#010101",
  },

  // Data Visualization
  Recharts: {
    icon: <SiReact />,
    category: "Charting Library",
    color: "#8884D8",
  },
  "Chart.js": {
    icon: <SiChartdotjs />,
    category: "Charting Library",
    color: "#FF6384",
  },
  Plotly: {
    icon: <SiPlotly />,
    category: "Data Visualization",
    color: "#3F4F75",
  },
  "Three.js": {
    icon: <SiThreedotjs />,
    category: "3D Graphics",
    color: "#000000",
  },

  // Authentication & Security
  NextAuth: {
    icon: <SiNextdotjs />,
    category: "Authentication",
    color: "#000000",
  },
  JWT: { icon: <SiNodedotjs />, category: "Authentication", color: "#000000" },
  "Firebase Authentication": {
    icon: <SiFirebase />,
    category: "Authentication",
    color: "#FFCA28",
  },
  bcrypt: { icon: <SiNodedotjs />, category: "Security", color: "#339933" },
};

const getFallbackTech = (name: string) => ({
  icon: <SiJavascript />,
  category: 'Technology',
  color: '#6B7280'
});

const ProjectDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageOrientations, setImageOrientations] = useState<
    ("landscape" | "portrait")[]
  >([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (params.id) {
      const projectData = PROJECTS.find(
        (proj) => proj.$id === params.id
      );
      if (!projectData) {
        setError("Project not found");
      } else {
        setProject(projectData as unknown as Project);
      }
      setLoading(false);
    }
  }, [params.id]);

  // Auto-play carousel
  useEffect(() => {
    if (!project?.images || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const orientations = imageOrientations;
        let next = prev + 1;
        
        // Skip to next if current is portrait and next is also portrait (show them together)
        if (orientations[prev] === 'portrait' && orientations[next] === 'portrait') {
          next = prev + 2;
        }
        
        // Reset to 0 if we've reached the end
        if (next >= project.images.length) {
          return 0;
        }
        
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [project?.images, isAutoPlaying, imageOrientations]);
  
  if (loading) {
    return (
      <main className="min-h-screen bg-page-background">
        <div className="pt-32 pb-20 text-center">
          <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto mb-4" />
          <p className="text-card-secondary">Loading project...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !project) {
    return (
      <main className="min-h-screen bg-page-background">
        <div className="pt-32 pb-20 text-center">
          <div className="bg-card shadow-card p-12 rounded-3xl border border-primary/20 max-w-2xl mx-auto">
            <Code className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-card-primary mb-2">Project Not Found</h2>
            <p className="text-card-secondary mb-6">
              {error || 'The project you are looking for could not be found.'}
            </p>
            <Link
              href="/projects"
              className="btn-primary px-6 py-3"
            >
              Back to Projects
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
              href="/projects"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors text-sm md:text-base"
            >
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
              <span>Back to Projects</span>
            </Link>
          </motion.div>

          {/* Project Details */}
          <div className="space-y-8">
            {/* 1. Project Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-card-primary">
                {project.title}
              </h1>
              {/* Services Display */}
              {project.services && project.services.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service: any, index) => {
                    const serviceId =
                      typeof service === "string" ? service : service.$id;
                    const serviceName =
                      typeof service === "string"
                        ? service
                        : service.name || serviceId;
                    return (
                      <Link
                        key={index}
                        href={`/industries/${serviceId}`}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-300"
                      >
                        <ExternalLink className="h-3 w-3 opacity-60" />
                        {serviceName}
                      </Link>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {/* 2. Project Images Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {project.images && project.images.length > 0 ? (
                <div className="relative group">
                  {/* Image Display Area */}
                  <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                    <div className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center">
                      {(() => {
                        const currentOrientation =
                          imageOrientations[currentImageIndex];
                        const nextOrientation =
                          imageOrientations[currentImageIndex + 1];
                        const showDouble =
                          currentOrientation === "portrait" &&
                          nextOrientation === "portrait";

                        return showDouble ? (
                          // Two portrait images side by side
                          <div className="flex gap-4 w-full h-full p-4">
                            <div className="flex-1 relative">
                              <img
                                src={project.images[currentImageIndex]}
                                alt={`${project.title} - Image ${
                                  currentImageIndex + 1
                                }`}
                                className="w-full h-[400px] md:h-[500px] object-contain rounded-xl shadow-lg image-transition"
                              />
                            </div>
                            <div className="flex-1 relative">
                              <img
                                src={project.images[currentImageIndex + 1]}
                                alt={`${project.title} - Image ${
                                  currentImageIndex + 2
                                }`}
                                className="w-full h-[400px] md:h-[500px] object-contain rounded-xl shadow-lg image-transition"
                              />
                            </div>
                          </div>
                        ) : (
                          // Single image (landscape or solo portrait)
                          <img
                            src={project.images[currentImageIndex]}
                            alt={`${project.title} - Image ${
                              currentImageIndex + 1
                            }`}
                            className="w-full h-[400px] md:h-[500px] object-contain rounded-2xl image-transition"
                          />
                        );
                      })()}
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  {/* Navigation Arrows */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={() => {
                          setCurrentImageIndex((prev) => {
                            if (prev === 0) return project.images.length - 1;
                            const prevOrientation = imageOrientations[prev - 1];
                            const beforePrevOrientation =
                              imageOrientations[prev - 2];
                            // If previous two are portrait, skip back by 2
                            if (
                              prevOrientation === "portrait" &&
                              beforePrevOrientation === "portrait"
                            ) {
                              return Math.max(0, prev - 2);
                            }
                            return prev - 1;
                          });
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
                        aria-label="Previous image"
                      >
                        <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-[#08273b]" />
                      </button>
                      <button
                        onClick={() => {
                          setCurrentImageIndex((prev) => {
                            const currentOrientation = imageOrientations[prev];
                            const nextOrientation = imageOrientations[prev + 1];
                            let next = prev + 1;

                            // If current and next are both portrait, skip ahead by 2
                            if (
                              currentOrientation === "portrait" &&
                              nextOrientation === "portrait"
                            ) {
                              next = prev + 2;
                            }

                            if (next >= project.images.length) return 0;
                            return next;
                          });
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
                        aria-label="Next image"
                      >
                        <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-[#08273b] rotate-180" />
                      </button>
                    </>
                  )}

                  {/* Dots Navigation */}
                  {project.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {project.images.map((_, index) => {
                        // Skip dot if this image is the second of a portrait pair
                        const prevOrientation = imageOrientations[index - 1];
                        const currentOrientation = imageOrientations[index];
                        if (
                          index > 0 &&
                          prevOrientation === "portrait" &&
                          currentOrientation === "portrait"
                        ) {
                          return null;
                        }

                        const isActive = currentImageIndex === index;
                        return (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`transition-all duration-300 rounded-full ${
                              isActive
                                ? "w-8 h-2 bg-[#08273b]"
                                : "w-2 h-2 bg-white/60 hover:bg-white/80"
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-80 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 flex items-center justify-center">
                  <Code className="h-20 w-20 text-primary/40" />
                </div>
              )}
            </motion.div>

            {/* 3. Project Overview - Expandable Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-[#08273b] mb-6">
                Project Overview
              </h3>

              <ProjectDescriptionAccordion projectId={project.$id} />
            </motion.div>

            {/* 4. Key Features */}
            {project.features && project.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-[#08273b] flex items-center space-x-3">
                  <FaListCheck className="h-5 w-5 text-[#1a6b8f]" />
                  <span>Key Features</span>
                </h3>
                <div className="space-y-2">
                  {project.features.map((feature, index) => (
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

            {/* 5. Tech Stack - Marquee Style */}
            {project.technologies && project.technologies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-[#08273b] flex items-center space-x-3">
                  <Code2 className="h-5 w-5 text-[#1a6b8f]" />
                  <span>Technologies Used</span>
                </h3>

                {/* Create two rows from technologies */}
                {(() => {
                  const mappedTechs = project.technologies.map((tech) => ({
                    name: tech,
                    ...(TECH_MAPPING[tech] || getFallbackTech(tech)),
                  }));

                  const midPoint = Math.ceil(mappedTechs.length / 2);
                  const row1 = [
                    ...mappedTechs.slice(0, midPoint),
                    ...mappedTechs.slice(0, midPoint),
                    ...mappedTechs.slice(0, midPoint),
                  ];
                  const row2 = [
                    ...mappedTechs.slice(midPoint),
                    ...mappedTechs.slice(midPoint),
                    ...mappedTechs.slice(midPoint),
                  ];

                  return (
                    <div className="space-y-8">
                      {/* Desktop/Tablet: horizontal marquee */}
                      <div className="hidden sm:block space-y-8">
                        {/* Top row: right -> left */}
                        <div className="relative overflow-hidden">
                          <div className="marquee-track marquee-top flex gap-6">
                            {row1.map((tech, index) => (
                              <div
                                key={`${tech.name}-${index}`}
                                className="flex-none w-28 text-center group"
                              >
                                <div
                                  className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
                                  style={{ color: tech.color }}
                                >
                                  {tech.icon}
                                </div>
                                <h4 className="font-semibold text-card-primary mb-0.5 text-sm">
                                  {tech.name}
                                </h4>
                                <p className="text-[10px] text-[#1a6b8f]">
                                  {tech.category}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bottom row: left -> right (if there are technologies) */}
                        {row2.length > 0 && (
                          <div className="relative overflow-hidden">
                            <div
                              className="marquee-track marquee-bottom marquee-reverse flex gap-6"
                              style={{ transform: "translateX(-25%)" }}
                            >
                              {row2.map((tech, index) => (
                                <div
                                  key={`${tech.name}-bottom-${index}`}
                                  className="flex-none w-28 text-center group"
                                >
                                  <div
                                    className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
                                    style={{ color: tech.color }}
                                  >
                                    {tech.icon}
                                  </div>
                                  <h4 className="font-semibold text-card-primary mb-0.5 text-sm">
                                    {tech.name}
                                  </h4>
                                  <p className="text-[10px] text-[#1a6b8f]">
                                    {tech.category}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Mobile: vertical marquee */}
                      <div className="block sm:hidden">
                        <div className="grid grid-cols-2 gap-4">
                          {/* Left column: bottom -> top */}
                          <div className="relative overflow-hidden">
                            <div
                              className="marquee-track-vertical flex flex-col gap-4"
                              style={{ maxHeight: "70vh" }}
                            >
                              {row1.map((tech, index) => (
                                <div
                                  key={`m-left-${tech.name}-${index}`}
                                  className="flex-none w-full text-center group"
                                >
                                  <div
                                    className="w-14 h-14 mx-auto mb-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center text-xl"
                                    style={{ color: tech.color }}
                                  >
                                    {tech.icon}
                                  </div>
                                  <h4 className="font-semibold text-card-primary mb-0.5 text-xs">
                                    {tech.name}
                                  </h4>
                                  <p className="text-[9px] text-[#1a6b8f]">
                                    {tech.category}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Right column: top -> bottom (if there are technologies) */}
                          {row2.length > 0 && (
                            <div className="relative overflow-hidden">
                              <div
                                className="marquee-track-vertical marquee-reverse offset-third flex flex-col gap-4"
                                style={{
                                  transform: "translateY(-33.3333%)",
                                  maxHeight: "70vh",
                                }}
                              >
                                {row2.map((tech, index) => (
                                  <div
                                    key={`m-right-${tech.name}-${index}`}
                                    className="flex-none w-full text-center group"
                                  >
                                    <div
                                      className="w-14 h-14 mx-auto mb-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center text-xl"
                                      style={{ color: tech.color }}
                                    >
                                      {tech.icon}
                                    </div>
                                    <h4 className="font-semibold text-card-primary mb-0.5 text-xs">
                                      {tech.name}
                                    </h4>
                                    <p className="text-[9px] text-[#1a6b8f]">
                                      {tech.category}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}

            {/* 6. CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-[#08273b] text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Eye className="h-4 w-4" />
                  <span>View Live Demo</span>
                </a>
              )}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-card border border-[#08273b] text-[#08273b] rounded-lg font-medium hover:bg-primary/5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 shadow-md"
              >
                Start Similar Project
              </Link>
            </motion.div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.client && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="bg-card shadow-card p-4 rounded-xl border border-primary/10"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-card-primary">
                      Client
                    </span>
                  </div>
                  <p className="text-card-secondary text-sm">
                    {project.client}
                  </p>
                </motion.div>
              )}

              {project.duration && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="bg-card shadow-card p-4 rounded-xl border border-primary/10"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-4 w-4 text-secondary" />
                    <span className="text-sm font-medium text-card-primary">
                      Duration
                    </span>
                  </div>
                  <p className="text-card-secondary text-sm">
                    {project.duration}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-card-primary flex items-center space-x-3">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Key Results</span>
                </h3>
                <div className="space-y-2">
                  {project.results.map((result, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-card-secondary text-sm">
                        {result}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .image-transition {
          animation: fadeIn 0.5s ease-in-out;
        }
          
        @keyframes marquee-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-vertical {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.3333%);
          }
        }

        @keyframes marquee-vertical-reverse {
          0% {
            transform: translateY(-33.3333%);
          }
          100% {
            transform: translateY(-66.6666%);
          }
        }

        .marquee-track {
          animation-duration: 40s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        .marquee-top {
          animation-name: marquee-horizontal;
        }

        .marquee-bottom {
          animation-name: marquee-horizontal;
          animation-direction: reverse;
        }

        .marquee-track-vertical {
          animation: marquee-vertical 40s linear infinite;
        }

        .marquee-track-vertical.marquee-reverse {
          animation: marquee-vertical-reverse 40s linear infinite;
        }

        .marquee-track:hover,
        .marquee-track-vertical:hover {
          animation-play-state: paused;
        }
      `}</style>
      <Footer />
    </main>
  );
}

const ProjectDescriptionAccordion = ({ projectId }: { projectId: string }) => {
  const [expandedHighlight, setExpandedHighlight] = useState(1);
  const [showTechnical, setShowTechnical] = useState<{
    [key: number]: boolean;
  }>({});

  const projectHighlights = useMemo(() => {
    const project = PROJECT_HIGHLIGHTS.find((p) => p.$id === projectId);
    return project?.highlights || [];
  }, [projectId]);

  const handleHighlightClick = (id: number) => {
    setExpandedHighlight(id);
  };

  const toggleTechnical = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTechnical((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (projectHighlights.length === 0) {
    return (
      <p className="text-card-secondary text-center">
        No highlights available for this project.
      </p>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-2 lg:gap-3 md:min-h-[450px]">
      {projectHighlights.map((highlight) => {
        const Icon = highlight.icon;
        const isExpanded = expandedHighlight === highlight.id;
        const showTech = showTechnical[highlight.id] || false;

        return (
          <div
            key={highlight.id}
            onClick={() => handleHighlightClick(highlight.id)}
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
              {/* Header */}
              <div
                className={`flex items-center gap-4 ${
                  isExpanded ? "md:mb-4" : ""
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
                  style={{ color: isExpanded ? "white" : highlight.color }}
                >
                  <Icon
                    className={
                      isExpanded
                        ? "w-6 h-6 md:w-7 md:h-7"
                        : "w-5 h-5 md:w-6 md:h-6"
                    }
                  />
                </div>
                <div className="flex-1">
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
                    {highlight.title}
                  </h4>
                  {isExpanded && (
                    <p className="text-xs md:text-sm text-[#08273b] font-medium mt-1 opacity-90">
                      {highlight.tagline}
                    </p>
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              <div
                className={`
                  transition-all duration-500
                  ${
                    isExpanded
                      ? "opacity-100 mt-4"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }
                `}
              >
                {/* User Benefit Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#08273b]/10 to-[#1a6b8f]/10 px-3 py-1.5 rounded-full mb-4">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-[#08273b] flex-shrink-0" />
                    <span className="text-xs md:text-sm font-semibold text-[#08273b]">
                      {highlight.userBenefit}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
                  {highlight.description}
                </p>

                {/* How It Works */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
                  <h5 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#08273b]" />
                    How It Works
                  </h5>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {highlight.howItWorks}
                  </p>
                </div>

                {/* Key Capabilities */}
                <ul className="space-y-2 mb-4">
                  {highlight.keyCapabilities.map((capability, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm md:text-base"
                    >
                      <div className="w-1.5 h-1.5 bg-[#08273b] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{capability}</span>
                    </li>
                  ))}
                </ul>

                {/* Technical Details (Expandable) */}
                {highlight.technicalDetails && (
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <button
                      onClick={(e) => toggleTechnical(highlight.id, e)}
                      className="flex items-center justify-between w-full text-left group"
                    >
                      <span className="flex items-center gap-2 text-sm font-semibold text-[#08273b]">
                        <Code2 className="w-4 h-4" />
                        Technical Architecture
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                          showTech ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`
                        transition-all duration-300
                        ${
                          showTech
                            ? "opacity-100 mt-3"
                            : "max-h-0 opacity-0 overflow-hidden"
                        }
                      `}
                    >
                      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-4 space-y-3">
                        {/* Approach */}
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                            Engineering Approach
                          </p>
                          <p className="text-sm text-gray-200 leading-relaxed">
                            {highlight.technicalDetails.approach}
                          </p>
                        </div>

                        {/* Technologies */}
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                            Tech Stack
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {highlight.technicalDetails.technologies.map(
                              (tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-gray-700/50 text-gray-200 rounded text-xs font-mono border border-gray-600"
                                >
                                  {tech}
                                </span>
                              )
                            )}
                          </div>
                        </div>

                        {/* Architecture */}
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                            System Architecture
                          </p>
                          <p className="text-sm text-gray-200 leading-relaxed">
                            {highlight.technicalDetails.architecture}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Vertical title for collapsed state on desktop */}
              {!isExpanded && (
                <div className="hidden md:block absolute left-0 right-0 bottom-1/4 translate-y-full flex justify-center">
                  <p className="transform -rotate-90 whitespace-nowrap font-bold text-gray-700 text-sm lg:text-base">
                    {highlight.title}
                  </p>
                </div>
              )}
            </div>

            {/* Progress indicator */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
              <div
                className="h-full bg-[#08273b] transition-all duration-300"
                style={{
                  width: `${(highlight.id / projectHighlights.length) * 100}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectDetailPage 