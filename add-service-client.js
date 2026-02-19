// Simple script to add service data using Firebase client SDK
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC1BXcfU8JnvqajvpKEA_u6I9qVxepgjy0",
  authDomain: "devsol-website.firebaseapp.com",
  projectId: "devsol-website",
  storageBucket: "devsol-website.firebasestorage.app",
  messagingSenderId: "537658496952",
  appId: "1:537658496952:web:162754de8bcb6adcb7614d",
  measurementId: "G-DXZ1MP1KG7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const serviceData = {
  name: "SEO and Social Media Marketing",
  longDescription: "About This Industry\nWe help businesses increase their online visibility, attract targeted traffic, and engage with their audience through result-driven SEO and Social Media strategies.\n\nWhat We Offer\nSEO Audits & Strategy\nOn-Page & Off-Page Optimization\nKeyword Research & Analysis\nLink Building & Outreach\nLocal SEO & Google My Business Optimization\nContent Marketing & Blogging\nSocial Media Strategy & Campaigns\nSocial Media Advertising (Facebook, Instagram, LinkedIn, etc.)\nInfluencer Marketing & Brand Collaborations\nSocial Media Management & Growth\nAnalytics & Performance Reporting",
  features: [
    "SEO Audits & Strategy",
    "On-Page & Off-Page Optimization", 
    "Keyword Research & Analysis",
    "Link Building & Outreach",
    "Social Media Strategy & Campaigns",
    "Social Media Management & Growth",
    "Analytics & Performance Reporting"
  ],
  $createdAt: new Date().toISOString(),
  $updatedAt: new Date().toISOString()
};

async function addService() {
  try {
    const docRef = await addDoc(collection(db, 'services'), serviceData);
    console.log('Service added with ID:', docRef.id);
    process.exit(0);
  } catch (error) {
    console.error('Error adding service:', error);
    process.exit(1);
  }
}

addService();
