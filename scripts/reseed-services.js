const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, deleteDoc, doc, addDoc } = require('firebase/firestore');

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
const db = getFirestore(app, "(default)");

const ordered = [
  { name: 'Web Development', longDescription: 'We build scalable and high-performing digital solutions tailored for startups and growing businesses. Our web development expertise covers everything from custom web applications to SaaS platforms, ensuring your digital presence drives real business results.', features: ['SaaS Platforms','API & Backend Systems','Custom Web Applications','Performance Optimization','Admin Dashboards & Portals','Real-time Web Apps (Chat, Tracking, etc.)'] },
  { name: 'Agents & Automation', longDescription: 'We build AI-driven agents and automation workflows to reduce manual work. Our automation solutions streamline business processes, eliminate repetitive tasks, and create intelligent systems that work around the clock to boost productivity.', features: ['Workflow Automation Tools','AI Agents for Customer Support','Integration with CRMs & ERPs','Intelligent Process Automation (IPA)','Multi-Agent Systems','Autonomous Task Scheduling'] },
  { name: 'SEO and Social Media Marketing', longDescription: 'We help businesses increase their online visibility, attract targeted traffic, and engage with their audience through result-driven SEO and Social Media strategies. Our digital marketing solutions drive organic growth and measurable business results.', features: ['SEO Audits & Strategy','On-Page & Off-Page Optimization','Keyword Research & Analysis','Link Building & Outreach','Social Media Strategy & Campaigns','Analytics & Performance Reporting'] },
  { name: 'AI & Machine Learning', longDescription: 'We create AI-powered solutions that transform data into actionable insights. Our AI and ML expertise helps businesses automate processes, enhance decision-making, and unlock the full potential of their data through cutting-edge artificial intelligence technologies.', features: ['Custom AI Models','Voice Agents + RAG','Predictive Analytics','Computer Vision Systems','NLP Chatbots & Assistants','Recommendation Engines'] },
  { name: 'Android App Development', longDescription: 'We build scalable, secure, and user-friendly Android applications tailored for businesses and startups. Our mobile development expertise ensures smooth performance across devices with modern design and seamless integrations.', features: ['Custom App Development','Modern UI/UX Design','API & Third-party Integrations','Performance Optimization','Regular Maintenance & Updates','Cloud-enabled Apps with Real-time Sync'] },
  { name: 'Cloud Computing', longDescription: 'We help businesses harness the power of cloud technologies to achieve scalability, flexibility, and cost efficiency. Our cloud computing expertise covers infrastructure setup, migration, and optimization, enabling companies to innovate faster while reducing operational complexity. From startups to enterprises, we design cloud-native systems that ensure reliability, security, and performance.', features: ['Cloud Infrastructure Setup (AWS, Azure, GCP, DigitalOcean)','Serverless Applications & Microservices','Cloud-Native SaaS Development','Cloud Data Storage & Management','Cloud Security & Compliance Solutions','Migration from On-Premise to Cloud','DevOps, CI/CD & Cloud Automation'] }
];

(async () => {
  console.log('Purging services...');
  const snap = await getDocs(collection(db, 'services'));
  await Promise.all(snap.docs.map(d => deleteDoc(doc(db, 'services', d.id))));
  console.log('Reinserting in order...');
  for (const s of ordered) {
    await addDoc(collection(db, 'services'), { ...s, $createdAt: new Date().toISOString(), $updatedAt: new Date().toISOString() });
    console.log('Added:', s.name);
  }
  console.log('Done.');
})();
