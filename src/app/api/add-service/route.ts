import { NextResponse } from 'next/server'
import { addDocument, COLLECTIONS } from '@/lib/appwrite'

export async function POST() {
  try {
    const serviceData = {
      name: "SEO and Social Media Marketing",
      long_description: "About This Industry\nWe help businesses increase their online visibility, attract targeted traffic, and engage with their audience through result-driven SEO and Social Media strategies.\n\nWhat We Offer\nSEO Audits & Strategy\nOn-Page & Off-Page Optimization\nKeyword Research & Analysis\nLink Building & Outreach\nLocal SEO & Google My Business Optimization\nContent Marketing & Blogging\nSocial Media Strategy & Campaigns\nSocial Media Advertising (Facebook, Instagram, LinkedIn, etc.)\nInfluencer Marketing & Brand Collaborations\nSocial Media Management & Growth\nAnalytics & Performance Reporting",
      features: [
        "SEO Audits & Strategy",
        "On-Page & Off-Page Optimization", 
        "Keyword Research & Analysis",
        "Link Building & Outreach",
        "Social Media Strategy & Campaigns",
        "Social Media Management & Growth",
        "Analytics & Performance Reporting"
      ]
    };

    const docId = await addDocument(COLLECTIONS.SERVICES, serviceData);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Service added successfully',
      id: docId 
    });
  } catch (error) {
    console.error('Error adding service:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to add service' 
    }, { status: 500 });
  }
}
